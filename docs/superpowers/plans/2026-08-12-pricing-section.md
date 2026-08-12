# Pricing Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a three-tier pricing section to the CreativeOS homepage, link it from the header, and remove every link to the non-existent `/product` route.

**Architecture:** One new server component, `src/components/sections/pricing.tsx`, holding its plan data as a local const and rendering three cards inside the existing `Section` / `DiagramFrame` / `CtaLink` / `Reveal` primitives. No new dependencies, no client state, no backend — the custom tier is a `mailto:` link. Three small edits repoint the header and footer.

**Tech Stack:** Next.js 16.3 (App Router, RSC), React 19.2, Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`), `motion` v13 for scroll reveals, `lucide-react` icons, pnpm 10.29.

## Global Constraints

- **No test runner exists.** `package.json` scripts are `dev`, `build`, `start`, `lint` only. The verification gate for every task is `pnpm lint` then `pnpm build` (Next's build performs the TypeScript check). Do not add a test framework — that is out of scope.
- **Sections stay server components.** Only `src/components/motion/reveal.tsx` is `"use client"`. Do not add `"use client"` to `pricing.tsx`; doing so ships the whole section as client JS for no benefit.
- **Currency is INR only.** The reference deck's USD figures (`$59`, `$149`, `$379`) must not appear anywhere.
- **Reel counts are for 15-second Smart Renders:** Creator **6**, Studio **16**. These are double the source deck's 30–35 second figures (3 and 8). The Custom tier states no numeric volumes.
- **Exact prices:** Creator `₹5,599`, Studio `₹14,199`. Custom has no price; it reads `Let's talk`.
- **Contact address comes from `SITE.contactEmail`** in `src/lib/site.ts` (currently `studios@yuvabe.com`). Do not hardcode the address.
- **Tailwind colour tokens** are `ink`, `ink-muted`, `ink-soft`, `ink-faint`, `purple`, `purple-deep`, `lavender`, `line`, `line-strong`, `canvas`, `surface`, `night`. Use these, not raw hex.
- **`RevealItem`'s `as` prop accepts only** `"div" | "section" | "ol" | "li" | "header" | "footer"` — there is no `"ul"`. Plain `<ul>` elements are fine; just don't pass `as="ul"`.

---

### Task 1: The pricing section component

**Files:**
- Create: `src/components/sections/pricing.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/sections/faq.tsx:47`

**Interfaces:**
- Consumes: `Section`, `SectionHeading`, `SectionLede`, `DiagramFrame` from `@/components/site/section`; `CtaLink` from `@/components/site/cta-link`; `Reveal`, `RevealGroup`, `RevealItem` from `@/components/motion/reveal`; `SITE` from `@/lib/site`; `cn` from `@/lib/utils`.
- Produces: `export function Pricing()` — no props. Renders a `<Section id="pricing" index="07">`.

- [ ] **Step 1: Create `src/components/sections/pricing.tsx`**

```tsx
import { Check } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaLink } from "@/components/site/cta-link";
import {
  DiagramFrame,
  Section,
  SectionHeading,
  SectionLede,
} from "@/components/site/section";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Reel allowances assume the 15-second Smart Render length. The source package
 * deck quoted 30–35 second reels at half these counts; halving the length
 * doubles what a month's credits buy, so Creator went 3 → 6 and Studio 8 → 16.
 *
 * Nothing in the product sells a subscription yet — there is no checkout, no
 * billing and no signup — so both priced plans lead to the pilot application
 * rather than a purchase flow that does not exist. Revisit these CTAs when
 * billing lands.
 */
type Plan = {
  name: string;
  positioning: string;
  price: string;
  /** Omitted on the custom plan, which quotes no recurring figure. */
  cadence?: string;
  features: readonly string[];
  cta: { label: string; href: string };
  /** Draws the purple border and the "Most popular" flag. Exactly one plan. */
  featured?: boolean;
};

/**
 * `CtaLink` renders a plain <a> for `mailto:` hrefs — `next/link` would try to
 * client-side route it. The prefilled subject is what makes an unstructured
 * mailto usable: replies arrive already labelled.
 */
const CONTACT_HREF = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(
  "CreativeOS — custom plan enquiry",
)}`;

const PLANS: readonly Plan[] = [
  {
    name: "Creator",
    positioning: "Create consistently.",
    price: "₹5,599",
    cadence: "/ month",
    features: [
      "25 static posts / month",
      "6 reels / month (15 sec, Smart Render)",
      "20,000 generation credits",
      "1 brand workspace",
      "1 user",
      "Brand memory and the self-learning agent",
      "Basic asset library and usage analytics",
      "Email support",
    ],
    cta: { label: "Start with a pilot", href: "/pilot" },
  },
  {
    name: "Studio",
    positioning: "Scale a content team.",
    price: "₹14,199",
    cadence: "/ month",
    featured: true,
    features: [
      "60 static posts / month",
      "16 reels / month (15 sec, Smart Render)",
      "52,000 generation credits",
      "4 brand workspaces",
      "5 users",
      "Everything in Creator, plus the approval workflow",
      "Shared asset library and team usage analytics",
      "Priority support",
    ],
    cta: { label: "Start with a pilot", href: "/pilot" },
  },
  {
    name: "Custom",
    positioning: "Run multiple client brands.",
    price: "Let's talk",
    features: [
      "Tailored static-post volume",
      "Tailored reel volume",
      "Tailored generation credits",
      "From 10 brand workspaces",
      "From 15 users",
      "Everything in Studio, plus advanced approval workflow",
      "Per-brand and per-user analytics and credit controls",
      "Priority support and onboarding",
    ],
    cta: { label: "Talk to us", href: CONTACT_HREF },
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <RevealItem className="h-full">
      <DiagramFrame
        className={cn(
          "flex h-full flex-col p-7",
          plan.featured &&
            "border-purple shadow-[0_10px_28px_rgba(88,41,199,0.14)]",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display m-0 text-[20px] leading-none font-semibold tracking-[-0.01em] text-ink">
            {plan.name}
          </h3>
          {plan.featured ? (
            <span className="rounded-full bg-purple/10 px-2.5 py-1 text-[11px] leading-none font-medium tracking-[0.12em] text-purple uppercase">
              Most popular
            </span>
          ) : null}
        </div>

        <p className="mt-2 mb-0 text-[14px] leading-[21px] text-ink-soft">
          {plan.positioning}
        </p>

        <div className="mt-6 flex items-baseline gap-1.5">
          <span className="font-display text-[34px] leading-none font-semibold tracking-[-0.03em] text-ink">
            {plan.price}
          </span>
          {plan.cadence ? (
            <span className="text-[14px] leading-none text-ink-soft">
              {plan.cadence}
            </span>
          ) : null}
        </div>

        <CtaLink
          href={plan.cta.href}
          tone={plan.featured ? "solid" : "outline"}
          className="mt-6 w-full justify-center"
        >
          {plan.cta.label}
        </CtaLink>

        <ul className="mt-7 flex list-none flex-col gap-3 border-t border-line p-0 pt-7">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check
                className="mt-[3px] size-4 flex-none text-purple"
                strokeWidth={2.4}
                aria-hidden="true"
              />
              <span className="text-[14px] leading-[21px] text-ink-muted">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </DiagramFrame>
    </RevealItem>
  );
}

export function Pricing() {
  return (
    /*
      No `bg-white` here, unlike its neighbours: the cards are white, and a
      white band would erase them.
    */
    <Section id="pricing" index="07" eyebrow="Plans and pricing">
      <div>
        <Reveal>
          <SectionHeading className="max-w-[20ch]">
            Priced by the volume you actually produce.
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.06}>
          <SectionLede>
            Every plan includes brand memory, the self-learning agent and the
            full brief → concept → storyboard → assets workflow. The tiers
            differ in how much you ship, and in how many brands and people you
            ship it for.
          </SectionLede>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </RevealGroup>

        <Reveal delay={0.08}>
          <p className="mt-8 mb-0 text-[14px] leading-[21px] text-ink-soft">
            Annual billing saves 10%. Prices are in INR and exclude applicable
            taxes.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Mount it in `src/app/page.tsx`**

Add the import alongside the others (they are alphabetical by module path):

```tsx
import { Pricing } from "@/components/sections/pricing";
```

And place it between `<Pilot />` and `<Faq />`:

```tsx
        <Pilot />
        <Pricing />
        <Faq />
```

- [ ] **Step 3: Renumber the FAQ section**

In `src/components/sections/faq.tsx:47`, change `index="07"` to `index="08"`. Pricing now owns `07`.

```tsx
    <Section index="08" eyebrow="Questions">
```

- [ ] **Step 4: Verify lint and types**

Run: `pnpm lint`
Expected: no errors.

Run: `pnpm build`
Expected: compiles, type checks pass, `/` listed in the route output.

- [ ] **Step 5: Verify visually**

Run: `pnpm dev`, open `http://localhost:3000/#pricing`.
Expected: three cards, Studio bordered purple with the "Most popular" flag; prices read `₹5,599`, `₹14,199`, `Let's talk`; cards stack to one column when the window is narrowed below 768px; clicking "Talk to us" opens a mail client addressed to `studios@yuvabe.com`.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/pricing.tsx src/app/page.tsx src/components/sections/faq.tsx
git commit -m "Add the pricing section to the homepage"
```

---

### Task 2: Header navigation

**Files:**
- Modify: `src/components/site/site-header.tsx:5-9`

**Interfaces:**
- Consumes: the `id="pricing"` anchor produced by Task 1.
- Produces: nothing other components read.

- [ ] **Step 1: Rewrite the `NAV` array**

Replace lines 5–9 of `src/components/site/site-header.tsx` with:

```tsx
/*
  Hrefs are root-relative (`/#workflow`, not `#workflow`) so the links resolve
  from /pilot, /privacy and /terms as well as from the homepage. A bare hash
  resolves against the current route and silently scrolls nowhere.
*/
const NAV = [
  { label: "How it works", href: "/#workflow" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Pilot", href: "/pilot" },
];
```

The removed `{ label: "Product", href: "/product" }` pointed at a route that does not exist in `src/app/` — it returned a 404.

- [ ] **Step 2: Verify lint and types**

Run: `pnpm lint`
Expected: no errors.

Run: `pnpm build`
Expected: compiles.

- [ ] **Step 3: Verify the links resolve**

Run: `pnpm dev`. From `http://localhost:3000/pilot`, click "Pricing" in the header.
Expected: navigates to the homepage and scrolls to the pricing band. Repeat for "How it works". Confirm no "Product" item remains.

- [ ] **Step 4: Commit**

```bash
git add src/components/site/site-header.tsx
git commit -m "Swap the dead Product nav link for Pricing"
```

---

### Task 3: Footer links and the anchors they need

**Files:**
- Modify: `src/components/site/site-footer.tsx:6-16`
- Modify: `src/components/sections/market-signals.tsx:7`
- Modify: `src/components/sections/production-system.tsx:33`

**Interfaces:**
- Consumes: `id="pricing"` from Task 1.
- Produces: `id="market"` on the market-signals band and `id="system"` on the production-system band.

- [ ] **Step 1: Give the two target sections ids**

In `src/components/sections/market-signals.tsx:7`, add `id="market"`:

```tsx
    <Section id="market" index="05" eyebrow="Connected to what is changing" className="bg-white">
```

In `src/components/sections/production-system.tsx:33`, add `id="system"`:

```tsx
    <Section id="system" index="02" eyebrow="Not another AI generator">
```

`Section` already accepts and forwards an `id` prop (`src/components/site/section.tsx:9,23`), so nothing else changes.

- [ ] **Step 2: Repoint the footer's Product column**

Replace the first entry of the `COLUMNS` array in `src/components/site/site-footer.tsx` (lines 7–16) with:

```tsx
  {
    heading: "Product",
    links: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Reels", href: "/#workflow" },
      { label: "Static posts", href: "/#workflow" },
      { label: "Market intelligence", href: "/#market" },
      { label: "Production learning", href: "/#system" },
    ],
  },
```

Three of these previously pointed at `/product`, `/product#market` and `/product#learning` — all 404s, since no `/product` route exists.

- [ ] **Step 3: Confirm no `/product` reference survives**

Run: `grep -rn "/product" src/`
Expected: no output.

- [ ] **Step 4: Verify lint and types**

Run: `pnpm lint`
Expected: no errors.

Run: `pnpm build`
Expected: compiles.

- [ ] **Step 5: Verify the footer links resolve**

Run: `pnpm dev`. Click each of the five Product-column links from `/privacy`.
Expected: each lands on the homepage and scrolls to the matching band. None 404.

- [ ] **Step 6: Commit**

```bash
git add src/components/site/site-footer.tsx src/components/sections/market-signals.tsx src/components/sections/production-system.tsx
git commit -m "Repair the footer links that pointed at the missing /product route"
```

---

## Self-review notes

- Spec coverage: pricing section (Task 1), nav link added and Product removed (Task 2), footer repair and section ids (Task 3), `mailto:` custom tier (Task 1), INR-only prices (Task 1 constants), annual-billing line (Task 1), FAQ renumber (Task 1). No spec requirement is unassigned.
- The spec's "no `/pricing` route", "no billing flow" and "pilot form untouched" exclusions are respected: no task touches `src/app/` beyond `page.tsx`, and none touches `pilot-form.tsx`.
- Type consistency: `Plan` is defined once in Task 1 and used only there. `CONTACT_HREF`, `PLANS`, `PlanCard` and `Pricing` are all local to `pricing.tsx`; only `Pricing` is exported, and `page.tsx` imports exactly that name.
