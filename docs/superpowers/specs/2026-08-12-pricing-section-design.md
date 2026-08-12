# Pricing section — design

**Date:** 2026-08-12
**Scope:** Add a pricing section to the homepage, add a nav link to it, remove the dead `/product` nav link, and repair the footer links that pointed at the same missing route.

## Why

The site quotes no prices anywhere. Package pricing exists in a reference table (`Creative_OS_Be…` deck) but has never reached the website. Separately, the header and footer link to `/product`, a route that does not exist in `src/app/` — those links 404 today.

## Decisions

| Question | Decision |
|---|---|
| Where does pricing live | A section in the homepage stack, anchored `#pricing`. Not a separate route. |
| Third tier | "Custom" — no price, `mailto:` the studio. |
| How the custom tier emails | Plain `mailto:` link. No backend, no form, no email provider. |
| Currency | INR only. The reference deck's USD figures are dropped. |
| Annual billing | A static line of copy under the grid. No toggle. |
| Paid-tier CTA | "Start with a pilot" → `/pilot`. |

### Why `mailto:` and not a form

There is no backend in this repo — no `src/app/api/`, no server actions. The pilot form at
`src/components/pilot/pilot-form.tsx` carries a TODO documenting that its submit is a fake
`setTimeout` that delivers nothing. Adding a real contact endpoint means an email provider, an
API key, spam protection and a failure state in the UI — all out of proportion to one button.
`mailto:` works on deploy and cannot silently drop a lead.

`CtaLink` already detects `mailto:` and renders a plain `<a>` instead of `next/link`
(`src/components/site/cta-link.tsx:41`), so this needs no new component.

### Why the paid CTAs go to `/pilot`

There is no checkout, billing, or signup in the product. A "Subscribe" or "Get started" button
would have nowhere to lead. The prices are real; the route to paying them is the pilot
conversation. The button says what actually happens.

## Plan data

Derived from the reference table, with reels recalculated for a **15-second** Smart Render length
instead of the deck's 30–35 seconds — halving the length doubles the monthly reel count. The
Custom tier's volumes are not restated as numbers, so the doubling does not apply to it.

### Creator — ₹5,599 / month

Positioning: *Create consistently.*

1. 25 static posts / month
2. 6 reels / month (15 sec, Smart Render)
3. 20,000 generation credits
4. 1 brand workspace
5. 1 user
6. Brand memory and the self-learning agent
7. Basic asset library, basic usage analytics
8. Email support

### Studio — ₹14,199 / month — flagged "Most popular"

Positioning: *Scale a content team.*

1. 60 static posts / month
2. 16 reels / month (15 sec, Smart Render)
3. 52,000 generation credits
4. 4 brand workspaces
5. 5 users
6. Everything in Creator, plus the approval workflow
7. Shared asset library, team usage analytics
8. Priority support

### Custom — "Let's talk"

Positioning: *Run multiple client brands.*

1. Tailored static-post volume
2. Tailored reel volume
3. Tailored generation credits
4. From 10 brand workspaces
5. From 15 users
6. Everything in Studio, plus advanced approval workflow
7. Per-brand and per-user analytics and credit controls
8. Priority support and onboarding

Reel counts changed from the source deck: Creator 3 → **6**, Studio 8 → **16**.

## Components

### New — `src/components/sections/pricing.tsx`

A server component. No state: the currency and annual-billing decisions removed the only reasons
it would have needed any.

- Plan data as a `PLANS` const at the top of the file. This matches every other section in the
  codebase (`STEPS` in `pilot.tsx`, `NAV` in `site-header.tsx`, `COLUMNS` in `site-footer.tsx`)
  rather than introducing a `lib/` module for content used in exactly one place.
- Wrapped in `<Section id="pricing" index="07" eyebrow="Plans and pricing">`.
- **No `bg-white` on the Section.** The cards are white; a white section erases them. This breaks
  no rule — sections 04, 05 and 06 are all `bg-white`, so the stack does not strictly alternate.
- Cards reuse the exported `DiagramFrame` from `src/components/site/section.tsx:84` — the white,
  hairline-bordered, soft-shadowed panel. The alternative is duplicating its class string.
- Grid: one column, `md:grid-cols-3`. Mobile-first, consistent with the recent diagram-system pass.
- Studio card carries a purple border and a "Most popular" badge.
- Feature rows use the lucide `Check` icon, as the pilot form's success state already does.
- Reveal animations via the existing `RevealGroup` / `RevealItem`.

Heading: *"Priced by the volume you actually produce."*

Below the grid, one muted line: *"Annual billing saves 10%. Prices are in INR and exclude
applicable taxes."*

### Changed — `src/app/page.tsx`

Insert `<Pricing />` between `<Pilot />` and `<Faq />`. Narrative order: prove the problem, show
the system, offer the pilot, then price, then answer objections.

### Changed — `src/components/sections/faq.tsx`

`index="07"` → `index="08"`.

### Changed — `src/components/site/site-header.tsx`

- Remove `{ label: "Product", href: "/product" }` — dead route.
- Add `{ label: "Pricing", href: "/#pricing" }`.
- Fix `{ label: "How it works", href: "#workflow" }` → `"/#workflow"`. The bare hash resolves
  against the current route, so on `/pilot` or `/privacy` the link scrolls nowhere.

Nav links stay `hidden sm:inline`, so Pricing is desktop-only like its neighbours. Not changed here.

### Changed — `src/components/site/site-footer.tsx`

The Product column's five links include three pointing at the missing `/product` route. Repair:

| Label | Was | Becomes |
|---|---|---|
| Product | `/product` | *replaced by* **Pricing** → `/#pricing` |
| Reels | `/#workflow` | unchanged |
| Static posts | `/#workflow` | unchanged |
| Market intelligence | `/product#market` | `/#market` |
| Production learning | `/product#learning` | `/#system` |

### Changed — `market-signals.tsx`, `production-system.tsx`

Add `id="market"` and `id="system"` respectively, so the two repaired footer links resolve.
`Section` already accepts an `id` prop; this is one attribute each.

## Out of scope

- Any billing, checkout or subscription flow.
- A `/pricing` route.
- Making the pilot form actually submit (its own TODO, unchanged by this work).
- A `/product` page to justify the links being removed.

## Verification

- `pnpm build` succeeds and `pnpm lint` is clean.
- Every link in the header and footer resolves — no `/product` reference remains anywhere in `src/`.
- `#pricing` scrolls correctly from the homepage and from `/pilot`.
- The custom tier's button opens a mail client addressed to `SITE.contactEmail` with a subject.
- The three cards stack to one column below `md` without overflow.
