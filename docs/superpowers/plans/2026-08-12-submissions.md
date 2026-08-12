# Form Submissions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the pilot form deliver — six mandatory fields posting to a Next route handler that forwards to a Google Apps Script webhook, which appends a Sheet row and emails a notification.

**Architecture:** `PilotForm` (client) → `POST /api/submissions` (server, holds the secret) → Apps Script web app → Google Sheet + `MailApp`. Validation is shared through `src/lib/submissions.ts`, imported by both the route handler and the form, so the two cannot drift.

**Tech Stack:** Next.js 16.3 App Router route handlers, React 19.2, Tailwind v4, Google Apps Script. **No new npm dependencies.**

## Global Constraints

- **Add no dependencies.** No zod, no resend, no googleapis, no mongodb. `pnpm-lock.yaml` must not change.
- **No test runner exists.** Scripts are `dev`, `build`, `start`, `lint`. Verification per task is `pnpm lint` then `pnpm build`, plus the stated manual check.
- **The secret never reaches the browser.** `SHEETS_WEBHOOK_SECRET` and `SHEETS_WEBHOOK_URL` are read only inside `src/app/api/submissions/route.ts`. Never prefix either with `NEXT_PUBLIC_`.
- **Exactly six fields, all required:** `fullName`, `email`, `agency`, `website`, `plan`, `message`. Every other field in the current form is deleted, not commented out.
- **Plan values, verbatim:** `Creator`, `Studio`, `Custom`, `Still deciding`.
- **Honeypot field name:** `company_website`. A non-empty value returns HTTP 200 with no row written.
- **Tailwind tokens only** — `ink`, `ink-muted`, `ink-soft`, `ink-faint`, `purple`, `purple-deep`, `line`, `line-strong`, `canvas`, `surface`. No raw hex.
- **Notification recipient** is `SITE.contactEmail` = `studios@yuvabe.com`, set as a constant in the Apps Script.

---

### Task 1: Shared types and validation

**Files:**
- Create: `src/lib/submissions.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `PLANS`, `type Plan`, `type Submission`, `HONEYPOT_FIELD`, `planFromQuery(value?: string): Plan`, `parseSubmission(input: unknown): ParseResult`.

- [ ] **Step 1: Create `src/lib/submissions.ts`**

```ts
/**
 * The submission payload, shared by the form, the API route and the Apps
 * Script that writes the Sheet row. Validation lives here rather than in the
 * route handler so the client and server agree on the rules by construction.
 *
 * Hand-rolled rather than zod: six fields do not justify a dependency.
 */

export const PLANS = ["Creator", "Studio", "Custom", "Still deciding"] as const;

export type Plan = (typeof PLANS)[number];

export type Submission = {
  plan: Plan;
  fullName: string;
  email: string;
  agency: string;
  website: string;
  message: string;
};

/**
 * Name of the hidden decoy input. A bot that fills every field trips it; the
 * API then returns success and drops the submission, so the bot learns nothing.
 */
export const HONEYPOT_FIELD = "company_website";

/** Per-field character ceilings, enforced server-side. */
const LIMITS: Record<keyof Submission, number> = {
  plan: 40,
  fullName: 200,
  email: 200,
  agency: 200,
  website: 200,
  message: 2000,
};

/** Deliberately loose. Real validation of an address is delivery, not a regex. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Maps the `?plan=` query value onto a select option. Anything unrecognised —
 * including an absent parameter — falls back to "Still deciding" rather than
 * guessing on the visitor's behalf.
 */
export function planFromQuery(value: string | undefined): Plan {
  const match = PLANS.find((plan) => plan.toLowerCase() === value?.toLowerCase());
  return match ?? "Still deciding";
}

/**
 * Accepts what a visitor types. Someone entering "acme.com" means
 * "https://acme.com" and should not be rejected for it.
 */
function normaliseWebsite(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export type ParseResult =
  | { ok: true; data: Submission }
  | { ok: false; error: string };

export function parseSubmission(input: unknown): ParseResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "That submission could not be read." };
  }

  const raw = input as Record<string, unknown>;

  const read = (key: keyof Submission): string =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";

  const fields = {
    plan: read("plan"),
    fullName: read("fullName"),
    email: read("email"),
    agency: read("agency"),
    website: read("website"),
    message: read("message"),
  };

  const LABELS: Record<keyof Submission, string> = {
    plan: "plan of interest",
    fullName: "full name",
    email: "work email",
    agency: "agency",
    website: "website",
    message: "message",
  };

  for (const key of Object.keys(fields) as (keyof Submission)[]) {
    if (!fields[key]) {
      return { ok: false, error: `Please fill in your ${LABELS[key]}.` };
    }
    if (fields[key].length > LIMITS[key]) {
      return { ok: false, error: `Your ${LABELS[key]} is too long.` };
    }
  }

  if (!EMAIL.test(fields.email)) {
    return { ok: false, error: "That work email does not look right." };
  }

  const plan = PLANS.find((option) => option === fields.plan);
  if (!plan) {
    return { ok: false, error: "Please choose a plan of interest." };
  }

  return {
    ok: true,
    data: {
      plan,
      fullName: fields.fullName,
      email: fields.email,
      agency: fields.agency,
      website: normaliseWebsite(fields.website),
      message: fields.message,
    },
  };
}
```

- [ ] **Step 2: Verify**

Run: `pnpm lint`
Expected: no errors.

Run: `pnpm build`
Expected: compiles. The module is unreferenced so far; that is fine.

- [ ] **Step 3: Commit**

```bash
git add src/lib/submissions.ts
git commit -m "Add the shared submission type and validator"
```

---

### Task 2: The API route

**Files:**
- Create: `src/app/api/submissions/route.ts`
- Create: `.env.example`

**Interfaces:**
- Consumes: `parseSubmission`, `HONEYPOT_FIELD` from `@/lib/submissions`.
- Produces: `POST /api/submissions`, accepting the `Submission` shape plus `company_website`, returning `{ ok: true }` or `{ ok: false, error: string }`.

- [ ] **Step 1: Create `src/app/api/submissions/route.ts`**

```ts
import { NextResponse } from "next/server";

import { HONEYPOT_FIELD, parseSubmission } from "@/lib/submissions";

/**
 * Receives a pilot application or pricing enquiry and forwards it to the Apps
 * Script web app bound to the submissions Sheet.
 *
 * The browser posts here rather than at Apps Script directly for three reasons:
 *
 *   1. The shared secret stays server-side. A browser POST would ship it to
 *      every visitor in the network tab.
 *   2. Apps Script web apps answer with a 302 to script.googleusercontent.com.
 *      A JSON fetch from a browser triggers a CORS preflight that Apps Script
 *      never answers, so the request fails even though the script ran. There is
 *      no CORS between two servers.
 *   3. Replacing the Sheet with a database later is a change to this file only.
 *
 * Next returns 405 for undeclared methods, so only POST is defined here.
 */

const MAX_BODY_BYTES = 16 * 1024;

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  const raw = await request.text();

  if (raw.length > MAX_BODY_BYTES) {
    return fail(400, "That submission is too large.");
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "That submission could not be read.");
  }

  // Honeypot: report success so a bot cannot tell it was caught, write nothing.
  const decoy = (body as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
  if (typeof decoy === "string" && decoy.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseSubmission(body);
  if (!parsed.ok) {
    return fail(400, parsed.error);
  }

  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;

  if (!url || !secret) {
    console.error(
      "[submissions] SHEETS_WEBHOOK_URL or SHEETS_WEBHOOK_SECRET is not set",
    );
    return fail(500, "This form is not configured yet. Please email us instead.");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret, ...parsed.data }),
      // Apps Script always redirects to googleusercontent.com to serve the
      // response body. Without following it we would only ever see the 302.
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Apps Script responded ${response.status}`);
    }

    const result = (await response.json().catch(() => null)) as {
      ok?: boolean;
      error?: string;
    } | null;

    if (!result?.ok) {
      throw new Error(result?.error ?? "Apps Script reported a failure");
    }
  } catch (error) {
    console.error("[submissions] delivery failed", error);
    return fail(
      502,
      "We could not deliver your message just now. Please try again, or email studios@yuvabe.com.",
    );
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Create `.env.example`**

```bash
# The Apps Script web app bound to the submissions Google Sheet.
# Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone.
# Copy the /exec URL here. See docs/apps-script/submissions.gs.
SHEETS_WEBHOOK_URL=

# A long random string. Must match the SECRET constant inside the Apps Script.
# Generate one with:  node -e "console.log(crypto.randomUUID()+crypto.randomUUID())"
SHEETS_WEBHOOK_SECRET=
```

`.gitignore` already covers `.env*`, and `.env.example` is matched by that pattern —
add it with `git add -f`.

- [ ] **Step 3: Verify**

Run: `pnpm lint`
Expected: no errors.

Run: `pnpm build`
Expected: compiles, and the route list includes `ƒ /api/submissions`.

- [ ] **Step 4: Verify the unconfigured path returns 500, not a false success**

Run `pnpm dev` with no `.env.local`, then:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/submissions \
  -H "content-type: application/json" \
  -d '{"plan":"Studio","fullName":"A","email":"a@b.co","agency":"A","website":"a.co","message":"hi"}'
```

Expected: `500`.

Then check validation and the honeypot:

```bash
curl -s -X POST http://localhost:3000/api/submissions \
  -H "content-type: application/json" -d '{"plan":"Studio"}'
# Expected: {"ok":false,"error":"Please fill in your full name."}

curl -s -X POST http://localhost:3000/api/submissions \
  -H "content-type: application/json" -d '{"company_website":"x"}'
# Expected: {"ok":true}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/api/submissions/route.ts
git add -f .env.example
git commit -m "Add the submissions API route"
```

---

### Task 3: The Apps Script

**Files:**
- Create: `docs/apps-script/submissions.gs`

**Interfaces:**
- Consumes: the JSON body sent by Task 2 — `{ secret, plan, fullName, email, agency, website, message }`.
- Produces: `{ ok: true }` or `{ ok: false, error }` as JSON; a Sheet row; a notification email.

- [ ] **Step 1: Create `docs/apps-script/submissions.gs`**

```js
/**
 * CreativeOS website — submissions endpoint.
 *
 * Bound to the submissions Google Sheet. Receives a POST from the site's
 * /api/submissions route, appends a row, and emails a notification.
 *
 * SETUP
 *   1. Open the Sheet → Extensions → Apps Script.
 *   2. Replace the default Code.gs contents with this file.
 *   3. Set SECRET below to a long random string.
 *   4. Deploy → New deployment → Web app
 *        Execute as:      Me
 *        Who has access:  Anyone      <- required; a Vercel function cannot
 *                                        present a Google identity. The SECRET
 *                                        is what actually guards this URL.
 *   5. Copy the /exec URL into SHEETS_WEBHOOK_URL, and the same SECRET into
 *      SHEETS_WEBHOOK_SECRET, in .env.local and in the Vercel project.
 *
 * WHEN YOU EDIT THIS SCRIPT
 *   Deploy → Manage deployments → edit the existing deployment → New version.
 *   Creating a *new* deployment issues a NEW URL, and the old one keeps serving
 *   the old code. That is the usual reason submissions silently stop arriving.
 */

const SECRET = 'REPLACE_WITH_THE_SAME_VALUE_AS_SHEETS_WEBHOOK_SECRET';
const NOTIFY_TO = 'studios@yuvabe.com';
const SHEET_NAME = 'Submissions';
const HEADERS = [
  'Timestamp',
  'Plan',
  'Full name',
  'Work email',
  'Agency',
  'Website',
  'Message',
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (body.secret !== SECRET) {
      return reply({ ok: false, error: 'unauthorised' });
    }

    sheet().appendRow([
      new Date(),
      body.plan,
      body.fullName,
      body.email,
      body.agency,
      body.website,
      body.message,
    ]);

    notify(body);

    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: String(err) });
  }
}

/** The target sheet, created with a frozen header row on first use. */
function sheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let target = book.getSheetByName(SHEET_NAME);

  if (!target) {
    target = book.insertSheet(SHEET_NAME);
    target.appendRow(HEADERS);
    target.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    target.setFrozenRows(1);
  }

  return target;
}

/**
 * replyTo is the submitter, so hitting Reply in the inbox reaches them
 * directly instead of the account that owns this script.
 */
function notify(body) {
  MailApp.sendEmail({
    to: NOTIFY_TO,
    replyTo: body.email,
    subject: 'CreativeOS — ' + body.plan + ' enquiry from ' + body.agency,
    body: [
      'Plan of interest: ' + body.plan,
      '',
      'Name:    ' + body.fullName,
      'Email:   ' + body.email,
      'Agency:  ' + body.agency,
      'Website: ' + body.website,
      '',
      'Message:',
      body.message,
    ].join('\n'),
  });
}

function reply(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

- [ ] **Step 2: Commit**

`.gs` is not linted or compiled by this project, so there is nothing to run.

```bash
git add docs/apps-script/submissions.gs
git commit -m "Add the Apps Script that writes the submissions sheet"
```

---

### Task 4: Rebuild the form

**Files:**
- Modify: `src/components/pilot/pilot-form.tsx` (full rewrite)

**Interfaces:**
- Consumes: `PLANS`, `type Plan`, `HONEYPOT_FIELD` from `@/lib/submissions`; `POST /api/submissions` from Task 2.
- Produces: `PilotForm({ defaultPlan }: { defaultPlan: Plan })` — note this is a **new required prop**; Task 5 supplies it.

- [ ] **Step 1: Replace the entire contents of `src/components/pilot/pilot-form.tsx`**

The TODO block at the top of the old file is resolved by this task and must go with it.

```tsx
"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import { HONEYPOT_FIELD, PLANS, type Plan } from "@/lib/submissions";
import { cn } from "@/lib/utils";

const FIELD =
  "w-full rounded-xl border border-line-strong bg-canvas px-3.5 py-[11px] text-[15px] leading-[22px] text-ink placeholder:text-ink-faint";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-[7px]", className)}>
      <span className="text-[13px] leading-[1.4] font-medium text-ink-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <div aria-live="polite">
      <div className="flex size-11 items-center justify-center rounded-full bg-[#eaf6d8] text-[#335c12]">
        <Check className="size-5" strokeWidth={2.4} aria-hidden="true" />
      </div>
      <h2 className="mt-5 mb-0 text-[20px] leading-7 font-semibold tracking-[-0.01em] text-ink">
        Message received
      </h2>
      <p className="mt-2.5 mb-0 text-[15px] leading-[22px] text-ink-soft">
        We read every enquiry ourselves and reply with fit and next steps. If
        you are applying for a pilot, we will come back with what we need — a
        sample workflow and a nominated brand.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-7 text-[14px] leading-none font-medium text-purple underline underline-offset-4 hover:text-purple-deep"
      >
        Send another
      </button>
    </div>
  );
}

export function PilotForm({ defaultPlan }: { defaultPlan: Plan }) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "error" | "done"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Captured before the first await: React nulls currentTarget once the
    // handler returns, so reading it afterwards throws.
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        setError(result?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("done");
    } catch {
      // The form is uncontrolled, so everything typed survives this.
      setError(
        "Could not reach the server. Check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[16px] border border-line bg-white p-9 shadow-[0_6px_16px_rgba(11,15,25,0.08)]">
        <Success onReset={() => setStatus("idle")} />
      </div>
    );
  }

  return (
    <div className="rounded-[16px] border border-line bg-white p-9 shadow-[0_6px_16px_rgba(11,15,25,0.08)]">
      <h2 className="mt-0 mb-1.5 text-[20px] leading-7 font-semibold tracking-[-0.01em] text-ink">
        Talk to us
      </h2>
      <p className="mt-0 mb-7 text-[15px] leading-[22px] text-ink-soft">
        Under a minute. We reply with fit and next steps.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          <Field label="Full name">
            <input name="fullName" type="text" required className={FIELD} />
          </Field>
          <Field label="Work email">
            <input name="email" type="email" required className={FIELD} />
          </Field>
          <Field label="Agency">
            <input name="agency" type="text" required className={FIELD} />
          </Field>
          <Field label="Website">
            {/* Deliberately type="text": type="url" rejects "acme.com", and the
                server prepends the scheme anyway. */}
            <input
              name="website"
              type="text"
              required
              placeholder="acme.com"
              className={FIELD}
            />
          </Field>
        </div>

        <Field label="Plan of interest">
          <select
            name="plan"
            required
            defaultValue={defaultPlan}
            className={FIELD}
          >
            {PLANS.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </Field>

        <Field label="How can we help?">
          <textarea
            name="message"
            rows={4}
            required
            placeholder="What you produce today, and what you are trying to fix."
            className={cn(FIELD, "resize-y")}
          />
        </Field>

        {/* Honeypot. Off-screen rather than hidden: some bots skip
            display:none inputs, and this one needs to be filled. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label>
            Company website
            <input
              name={HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {status === "error" && error ? (
          <p
            aria-live="polite"
            className="m-0 rounded-xl border border-[#f3c9bd] bg-[#fdf1ee] px-3.5 py-3 text-[14px] leading-[21px] text-[#8a2e18]"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-1.5 inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-[26px] py-[15px] text-[15px] leading-none font-medium text-white transition-colors hover:bg-purple-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send"}
          {status === "submitting" ? null : (
            <ArrowUpRight className="size-4" aria-hidden="true" />
          )}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm lint`
Expected: no errors.

Run: `pnpm build`
Expected: **fails** — `src/app/pilot/page.tsx` renders `<PilotForm />` without the now-required `defaultPlan` prop. Task 5 fixes it. Do not commit until then.

- [ ] **Step 3: Proceed directly to Task 5**

This task and the next are committed together, because the tree does not build between them.

---

### Task 5: Rework the `/pilot` page

**Files:**
- Modify: `src/app/pilot/page.tsx`

**Interfaces:**
- Consumes: `planFromQuery` from `@/lib/submissions`; `PilotForm` from Task 4.
- Produces: nothing other modules read.

- [ ] **Step 1: Import `planFromQuery`**

Add to the imports in `src/app/pilot/page.tsx`:

```tsx
import { planFromQuery } from "@/lib/submissions";
```

- [ ] **Step 2: Make the page async and read `searchParams`**

Replace the `export default function PilotPage() {` line and everything through the closing
`</>` with the following. In Next 16 `searchParams` is a Promise and must be awaited; that makes
this route dynamic rather than prerendered, which is correct for a form page.

```tsx
export default async function PilotPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { plan } = await searchParams;
  const defaultPlan = planFromQuery(typeof plan === "string" ? plan : undefined);

  return (
    <>
      <SiteHeader />
      <main className="w-full">
        {/*
          The form is the point of this page, so it shares the hero rather than
          sitting below the fold. Below `lg` everything stacks in source order,
          which puts the form directly after the headline.
        */}
        <section className="border-b border-line bg-white">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-12 px-8 pt-16 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <Reveal>
              <div className="mb-6 text-[12px] leading-[1.4] font-medium tracking-[0.22em] text-ink-soft uppercase">
                Pilot programme
              </div>
              <h1 className="font-display m-0 max-w-[20ch] text-[clamp(2.3rem,4.4vw,3.8rem)] leading-[1.05] font-normal tracking-[-0.03em] text-ink">
                Pilot CreativeOS with one active D2C brand.
              </h1>
              <p className="mt-[26px] mb-0 max-w-[52ch] text-[18px] leading-[28px] text-ink-muted text-pretty">
                One brand. One recurring workflow. Measured against how you
                produce today — findings shared either way.
              </p>
              <p className="mt-7 mb-0 max-w-[52ch] text-[14px] leading-[21px] text-ink-soft">
                Applying commits you to nothing. We reply with fit and next
                steps.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <PilotForm defaultPlan={defaultPlan} />
            </Reveal>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-12 px-8 py-[72px] lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="font-display mt-0 mb-7 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.1] font-semibold tracking-[-0.022em]">
                What we measure together
              </h2>
              {/* 1px gap over a grey backdrop draws the hairline grid. */}
              <ul className="grid list-none grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-line bg-line p-0 sm:grid-cols-2">
                {MEASURES.map((measure) => (
                  <li
                    key={measure}
                    className="bg-white px-[22px] py-[18px] text-[15px] leading-[22px] text-ink-muted"
                  >
                    {measure}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="font-display mt-0 mb-6 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.1] font-semibold tracking-[-0.022em]">
                Who this fits
              </h2>
              <ul className="flex list-none flex-col gap-3 p-0">
                {FIT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[7px] size-1.5 flex-none rounded-[2px] bg-purple" />
                    <span className="text-[15px] leading-[23px] text-ink-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
```

The "Applying commits you to nothing" line moved from the second section into the hero, beside
the form where it does its job.

- [ ] **Step 3: Verify**

Run: `pnpm lint`
Expected: no errors.

Run: `pnpm build`
Expected: compiles. `/pilot` now appears as `ƒ` (dynamic) rather than `○` (static) in the route
list — expected, because it reads `searchParams`.

- [ ] **Step 4: Verify in the browser**

Run `pnpm dev` and open `http://localhost:3000/pilot?plan=studio`.
Expected: the form sits beside the headline in the hero with "Studio" preselected. Open
`/pilot` with no query: "Still deciding". Narrow the window below 1024px: the form drops
directly under the headline, above "What we measure together".

- [ ] **Step 5: Commit**

```bash
git add src/components/pilot/pilot-form.tsx src/app/pilot/page.tsx
git commit -m "Rebuild the pilot form as six fields and move it into the hero"
```

---

### Task 6: Point the pricing cards at the form

**Files:**
- Modify: `src/components/sections/pricing.tsx`

**Interfaces:**
- Consumes: the `?plan=` handling from Task 5.
- Produces: nothing.

- [ ] **Step 1: Delete `CONTACT_HREF` and the `SITE` import**

Remove this import line from `src/components/sections/pricing.tsx`:

```tsx
import { SITE } from "@/lib/site";
```

and delete the whole `CONTACT_HREF` declaration with its docblock:

```tsx
/**
 * `CtaLink` renders a plain <a> for `mailto:` hrefs — `next/link` would try to
 * client-side route it. The prefilled subject is what makes an unstructured
 * mailto usable: replies arrive already labelled.
 */
const CONTACT_HREF = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(
  "CreativeOS — custom plan enquiry",
)}`;
```

Leaving the import in place is a lint error, so both must go together.

- [ ] **Step 2: Repoint the three CTAs**

In the `PLANS` array, change each `cta.href`:

| Plan | From | To |
|---|---|---|
| Creator | `"/pilot"` | `"/pilot?plan=creator"` |
| Studio | `"/pilot"` | `"/pilot?plan=studio"` |
| Custom | `CONTACT_HREF` | `"/pilot?plan=custom"` |

The Custom card's label stays `"Talk to us"`; only its destination changes.

- [ ] **Step 3: Verify**

Run: `pnpm lint`
Expected: no errors — in particular, no unused-import warning for `SITE`.

Run: `pnpm build`
Expected: compiles.

Run: `grep -n "mailto" src/components/sections/pricing.tsx`
Expected: no output.

- [ ] **Step 4: Verify in the browser**

Run `pnpm dev`, open `/#pricing`, click each card's button.
Expected: all three land on `/pilot` with Creator, Studio and Custom preselected respectively.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/pricing.tsx
git commit -m "Point the pricing CTAs at the form with the plan preselected"
```

---

### Task 7: Privacy policy

**Files:**
- Modify: `src/app/privacy/page.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing.

- [ ] **Step 1: Add a collection subsection**

In `src/app/privacy/page.tsx`, immediately after the "Account information" `<h3>` block and
before `<h3>Content you put into the workspace</h3>`, insert:

```tsx
      <h3>Pilot applications and enquiries</h3>
      <p>
        When you submit the form on our pilot page we collect your name, work
        email address, agency, agency website, the plan you are interested in,
        and whatever you write in the message field. We use it only to reply to
        you and to assess fit for the pilot programme. It is stored in a private
        Google Sheet and emailed to our team. We do not use it for marketing
        lists, and we do not sell or share it.
      </p>
```

- [ ] **Step 2: Add a retention bullet**

In the `<h2 id="retention">7. Retention</h2>` list, add as the **first** `<li>`, before the
"Workspace content" bullet:

```tsx
        <li>
          <strong>Pilot applications and enquiries</strong> — kept for up to 24
          months so we can pick a conversation back up, then deleted. Ask us
          sooner and we will remove it.
        </li>
```

- [ ] **Step 3: Verify**

Run: `pnpm lint`
Expected: no errors.

Run: `pnpm build`
Expected: compiles.

Open `http://localhost:3000/privacy` and confirm both additions render and that the "What we
collect" sidebar link still scrolls correctly.

- [ ] **Step 4: Commit**

```bash
git add src/app/privacy/page.tsx
git commit -m "Cover pilot applications in the privacy policy"
```

---

## Setup the user must do before this works in production

Neither task below is a code change; the build passes without them, but submissions return 500.

1. Create a Google Sheet, open Extensions → Apps Script, paste
   `docs/apps-script/submissions.gs`, set `SECRET`, then Deploy → New deployment → Web app with
   *Execute as: Me* and *Who has access: Anyone*. Authorise when prompted.
2. Put the `/exec` URL in `SHEETS_WEBHOOK_URL` and the same secret in `SHEETS_WEBHOOK_SECRET`,
   both in a local `.env.local` and in the Vercel project's environment variables.

## Self-review notes

- Spec coverage: shared validation (T1), API route and env (T2), Apps Script with sheet and mail
  (T3), six-field form with error state and honeypot (T4), hero layout and `?plan=` (T5), pricing
  CTAs and mailto removal (T6), privacy policy (T7). Every spec requirement maps to a task.
- Tasks 4 and 5 deliberately share a commit: adding a required prop to `PilotForm` breaks the
  build until its only caller is updated, so splitting them would leave a non-building commit.
- Type consistency: `Plan`, `Submission`, `PLANS`, `HONEYPOT_FIELD`, `planFromQuery` and
  `parseSubmission` are defined once in Task 1 and used with those exact names in Tasks 2, 4 and 5.
  The field names `fullName`, `email`, `agency`, `website`, `plan`, `message` are identical across
  the form inputs, the validator, the route payload and the Apps Script row.
- No task adds a dependency; `pnpm-lock.yaml` is untouched throughout.
