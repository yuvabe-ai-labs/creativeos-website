# Form submissions → Google Sheet + email — design

**Date:** 2026-08-12
**Scope:** Make the pilot form actually deliver. One short form serves both pilot applications and pricing enquiries, posting to a Next.js route handler that forwards to a Google Apps Script webhook, which appends a row to a Sheet and emails a notification.

## Why

`src/components/pilot/pilot-form.tsx` carries a TODO documenting that its submit is a
`setTimeout` that delivers nothing — an application filled in today is lost when the tab closes.
The pricing section added a `mailto:` custom tier, which works but produces no record.

## Decisions

| Question | Decision |
|---|---|
| Where submissions go | A Google Sheet, via an Apps Script web app. |
| How the Sheet is reached | Next route handler → Apps Script webhook. Not browser → Apps Script. |
| Notification email | Sent by the Apps Script itself via `MailApp`. No Resend, no SMTP. |
| Database | None. Considered MongoDB Atlas, deferred — the Sheet is enough at this volume. |
| Admin route | None. The Sheet *is* the protected view; Google owns the auth. |
| Number of forms | One, at `/pilot`. The pricing cards deep-link into it with the plan preselected. |
| Fields | Six, all mandatory. The previous optional block is deleted. |
| `/pilot` layout | The form moves into the hero's empty right column, above the fold. |
| Spam protection | Honeypot field only. |
| New dependencies | **None.** |

### Why no `/admin` and no username/password

The original request was a protected route behind a simple username and password. A Google Sheet
delivers that and more — Google handles authentication, and the Sheet already has search, sort,
filter, CSV export and per-person sharing. Hand-rolled credential checking on a marketing site is
a liability with no compensating benefit here.

### Why the request is proxied through a Next route handler

Posting from the browser straight to the Apps Script URL would be fewer moving parts, and is wrong
for three reasons:

1. The shared secret would ship to every visitor in the client bundle.
2. Apps Script web apps answer with a **302 redirect to `script.googleusercontent.com`**. A JSON
   `fetch` from a browser triggers a CORS preflight that Apps Script does not answer, so the
   request fails in the browser even though the script runs fine. Server-to-server has no CORS.
3. Replacing the Sheet with a database later becomes a one-file change, invisible to the form.

### Why a honeypot and not a rate limiter

An in-memory counter on Vercel is per-instance and dies with the instance, so it gives the
appearance of protection without the substance. The honeypot stops naive bots, which is the
realistic threat for a form of this profile. If real abuse appears, the answer is Cloudflare
Turnstile, not a `Map`.

## The form

Six fields, every one required. The previous eleven optional and qualifying fields
(role, active clients, reels per month, static posts per month, current tools, biggest bottleneck,
preferred pilot brand, generations per asset, team size, sample work, notes) are **removed**.

| Field | Name | Notes |
|---|---|---|
| Full name | `fullName` | ≤ 200 chars |
| Work email | `email` | ≤ 200 chars, must contain a plausible address |
| Agency | `agency` | ≤ 200 chars |
| Website | `website` | ≤ 200 chars. Input is plain text; the server prepends `https://` when no scheme is present, so a visitor typing `acme.com` is not rejected. |
| Plan of interest | `plan` | Select. One of `Creator`, `Studio`, `Custom`, `Still deciding`. |
| How can we help? | `message` | Textarea, ≤ 2000 chars. Replaces the eleven qualifying questions — a serious applicant volunteers detail here. |

Plus a hidden honeypot input named `company_website`, visually removed and `tabIndex={-1}` with
`autoComplete="off"`. If it arrives non-empty the API returns `200` and discards the submission,
so a bot cannot tell it was caught.

### Plan preselection

`/pilot` reads `?plan=` and passes it to the form as `defaultPlan`.

| Query value | Selected |
|---|---|
| `creator` | Creator |
| `studio` | Studio |
| `custom` | Custom |
| absent or anything else | Still deciding |

Read in the **server** page component, not via `useSearchParams()` — the hook would need a
`<Suspense>` boundary to avoid a static-generation error. In Next 16 `searchParams` is a Promise
and must be awaited, which makes `/pilot` dynamic rather than prerendered. Acceptable for a form page.

The three pricing cards change from their current targets to `/pilot?plan=creator`,
`/pilot?plan=studio` and `/pilot?plan=custom`. The `CONTACT_HREF` mailto constant in
`pricing.tsx` is deleted.

## `/pilot` layout

The form is the point of the page, and today it sits below the fold while the hero wastes its
entire right half on nothing. Shrinking the form to six fields makes it short enough to live in
the hero itself.

**Now**

```
┌──────────────────────────────┬──────────────┐
│ PILOT PROGRAMME              │              │
│ Pilot CreativeOS with one    │   (empty)    │
│ active D2C brand.            │              │
└──────────────────────────────┴──────────────┘
├─────────────────────────────────────────────┤
│ What we measure together   │  ┌───────────┐ │   ← form starts here,
│ [10-cell grid]             │  │   FORM    │ │     below the fold
│ Who this fits              │  └───────────┘ │
```

**After**

```
┌──────────────────────────────┬──────────────┐
│ PILOT PROGRAMME              │ ┌──────────┐ │
│ Pilot CreativeOS with one    │ │   FORM   │ │   ← above the fold
│ active D2C brand.            │ │          │ │
│ One brand. One workflow…     │ └──────────┘ │
└──────────────────────────────┴──────────────┘
├─────────────────────────────────────────────┤
│ What we measure       │  Who this fits      │   ← supporting detail
```

Concretely, in `src/app/pilot/page.tsx`:

- The hero section becomes `grid lg:grid-cols-[1.05fr_1fr] items-start gap-16`, with the eyebrow,
  `<h1>` and lede in the left cell and `<PilotForm />` in the right. Vertical padding drops from
  `pt-20 pb-16` to roughly `pt-16 pb-20` so the form clears the fold on a laptop.
- The second section keeps "What we measure together" and "Who this fits" but lays them out as
  `lg:grid-cols-2` side by side, since the right column is now free.
- Below `lg`, everything stacks in source order: heading, lede, **form**, then the supporting
  detail. The form stays the first thing a phone reader reaches after the headline.

The `Reveal` wrappers stay as they are — the form keeps its `delay={0.08}` so it arrives just
after the headline rather than simultaneously.

## API contract

`POST /api/submissions`, JSON body, same origin.

**Request:** `{ fullName, email, agency, website, plan, message, company_website }`

**Responses:**

| Status | Body | When |
|---|---|---|
| 200 | `{ ok: true }` | Delivered — or honeypot tripped. |
| 400 | `{ ok: false, error }` | Validation failed. `error` is a single human-readable sentence. |
| 500 | `{ ok: false, error }` | `SHEETS_WEBHOOK_URL` or `SHEETS_WEBHOOK_SECRET` missing. |
| 502 | `{ ok: false, error }` | Apps Script unreachable or returned a failure. |
| 405 | `{ ok: false, error }` | Any method other than POST. |

Requests with a body over 16 KB are rejected with 400 before parsing.

Validation lives in `src/lib/submissions.ts` as `parseSubmission(input: unknown)`, returning
`{ ok: true, data: Submission }` or `{ ok: false, error: string }`. Hand-rolled — adding zod for
six fields is not worth a dependency. The client re-uses the exported `PLANS` and field metadata so
the two cannot drift.

## Apps Script

Checked into `docs/apps-script/submissions.gs` so it is versioned rather than living only inside a
Google tab. It:

1. Parses the POST body and compares `secret` against a constant at the top of the script.
2. Appends a row to the sheet named `Submissions`, creating it with a header row if absent.
3. Sends a notification with `MailApp.sendEmail`, `replyTo` set to the submitter's address so
   replying from the inbox reaches them directly.
4. Returns `{ ok: true }` as JSON. Any failure returns `{ ok: false, error }` and is logged.

Sheet columns: `Timestamp · Plan · Full name · Work email · Agency · Website · Message`.

Email subject: `CreativeOS — <plan> enquiry from <agency>`.

**Deployment settings that matter:** Deploy → New deployment → Web app → *Execute as: Me* →
*Who has access: **Anyone***. "Anyone" is required for a Vercel function to reach it, since the
function cannot present a Google identity. The shared secret is what actually guards the endpoint,
so it must be long and random. Redeploying after editing the script produces a **new** URL unless
you deploy as a new version of the existing deployment — a common cause of submissions silently
stopping.

`MailApp` quota on Google Workspace is 1,500 recipients/day, far above this form's volume.

## Environment

Documented in a new `.env.example`, committed. `.gitignore` already covers `.env*`.

| Variable | Value |
|---|---|
| `SHEETS_WEBHOOK_URL` | The Apps Script `/exec` URL. |
| `SHEETS_WEBHOOK_SECRET` | A long random string, identical to the constant in the script. |

Both must also be set in the Vercel project's environment settings for production.

## Privacy policy

Storing and emailing names, work emails and commercial details makes the current policy
inaccurate, and Meta App Review reads it. Two edits to `src/app/privacy/page.tsx`:

1. A new `<h3>Pilot applications and enquiries</h3>` under §2 "What we collect", after "Account
   information": states that the form collects name, work email, agency, website, plan of interest
   and message; that it is stored in a Google Sheet and emailed to the team; and that it is used
   only to respond to the enquiry.
2. A new bullet in §7 "Retention": enquiry records kept for up to 24 months, then deleted, and
   removable sooner on request via the existing §8 deletion route.

## Error handling

The form currently has no failure path at all. It gains a `status` of
`"idle" | "submitting" | "error" | "done"`. On error it shows the message returned by the API in an
`aria-live` region, keeps every value the visitor typed, and re-enables the submit button. A
network rejection surfaces as a generic "Could not reach the server" rather than an unhandled
promise.

## Out of scope

- Any database. MongoDB is deferred, and the storage call is isolated to one module so it can be
  added without touching the form.
- An `/admin` route, sessions or credentials.
- Resend, SMTP or any third-party mail vendor.
- A CAPTCHA.
- Autoresponder mail to the person submitting.

## Verification

- `pnpm lint` clean and `pnpm build` succeeds.
- Submitting the form with the env vars set appends a row to the Sheet and delivers an email whose
  reply-to is the submitter.
- Submitting with a missing required field returns 400 and the form shows the error without losing
  the typed values.
- Submitting with `company_website` filled returns 200 and appends **no** row.
- With `SHEETS_WEBHOOK_URL` unset, the API returns 500 and the form shows an error rather than a
  false success.
- `/pilot?plan=studio` loads with Studio preselected; `/pilot` alone shows "Still deciding".
- No `mailto:` remains in `pricing.tsx`.
- On a 1440×900 laptop, the form's submit button is visible without scrolling, or close to it.
- Below `lg`, the form appears immediately after the hero copy and before "What we measure".
