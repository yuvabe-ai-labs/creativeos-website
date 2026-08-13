# CreativeOS website — Product Requirements

**Status:** live
**Owner:** Yuvabe Studios
**Repository:** `yuvabe-ai-labs/creativeos-website`
**Last reviewed against the code:** 13 August 2026

**Companion documents**
- [Diagram system](./diagram-system.md) — the visual language and per-diagram specs
- [Submissions design](./2026-08-12-submissions-design.md) · [plan](./2026-08-12-submissions.md)
- [Pricing section design](./2026-08-12-pricing-section-design.md) · [plan](./2026-08-12-pricing-section.md)

---

## 1. What this is

The public marketing site for **CreativeOS**, a market-connected creative
production system for high-volume D2C agencies, built by Yuvabe Studios.

CreativeOS itself is a canvas-based workspace where a designer produces the
reels and static posts a brand needs — bringing brand context, a script,
references and market signals into one place, generating prompts, images and
video from them, and keeping every attempt and approval attached to the asset
that shipped. It can publish approved assets to a connected Instagram Business
account.

This website is not the product. It is four things:

1. The argument for the product
2. The price list
3. The front door to the pilot programme
4. The legal surface the Instagram integration requires

---

## 2. Why it exists

**1. Convert qualified agencies into pilot conversations.** The commercial goal.
Every path through the site ends at the same form, including both priced plans —
there is no self-signup and no checkout.

**2. Explain a category that has no name yet.** CreativeOS is not an image
generator and not a chat tool, and a prospect will default to assuming it is one
of those. The site's harder job is showing that the expensive part of AI
production is not generation — it is the setup, the tool-switching and the
context reconstruction that surround every generation.

**3. Make the price public.** Publishing real numbers disqualifies the wrong
readers before they cost anyone a call, and signals that this is a product
rather than a bespoke engagement.

**4. Satisfy Meta App Review.** The Instagram publishing integration cannot ship
without a publicly reachable Privacy Policy and Terms. A hard dependency — see §7.

---

## 3. Who it is for

**Primary — agency principal or production lead.** Runs a team producing
recurring content for several D2C clients. Feels the cost of retries and
repeated briefing in hours and in credits. Can approve a pilot. Sceptical of AI
tooling claims, having already tried several.

**Secondary — senior designer or creative director.** Will be asked "is this
real?" by the principal. Cares whether the tool takes control away from them.
Sections 02 and 03, and the FAQ, speak to this reader.

**Tertiary — Meta App Review.** Not a customer, but a reader with veto power
over the product's publishing capability. Arrives at `/privacy` and `/terms`
anonymously, and rejects anything behind a login.

---

## 4. Objectives and measures

| Objective | Measure |
| :--- | :--- |
| Generate qualified pilot conversations | Submissions landing in the sheet, filtered against the "who this fits" criteria |
| Communicate the category | Scroll depth past section 03; qualitative — do submissions describe the right problem in their own words? |
| Qualify on price before the call | Ratio of Creator / Studio / Custom / Still deciding in the plan field |
| Unblock the Instagram integration | Meta App Review approval on first submission |

**Not an objective: traffic volume.** This is a small, high-intent audience. No
part of the site should be optimised for reach at the cost of precision.

---

## 5. Structure

### 5.1 Home — `/`

One scrolling argument. The order *is* the argument — problem, then mechanism,
then proof, then price, then objections.

| # | Section | Headline | Job |
| :-- | :--- | :--- | :--- |
| — | Hero | Produce D2C content at the speed of the market. | Position, and offer the pilot |
| 01 | The hidden cost of AI production | Every new creative still starts from scratch. | Name the problem: setup repeated per asset |
| 02 | Any edit means jumping between platforms | One canvas, not five tools. | Name the second problem: tool sprawl |
| 03 | Catch errors while they are cheap | Catch mistakes early, before they get expensive. | The economic argument; carries the 2x / 75% figures |
| 04 | How it works | Work compounds instead of restarting. | The mechanism — the create/learn loop |
| 05 | Connected to what is changing | Turn market signals into brand-relevant creative directions. | The differentiator |
| 06 | Pilot CreativeOS with one D2C brand | Measure the production difference on your own workflow. | The offer, as concrete steps |
| 07 | Plans and pricing | Priced by the volume you actually produce. | Qualify on budget |
| 08 | Questions | — | Handle objections, including by saying "no" |
| — | Closing CTA | Your next D2C creative should not start from zero. | Convert |

**Tone rules.** Declarative sentences, no superlatives, and where a claim has a
limit, state the limit — the FAQ answers "Does it guarantee better-performing
content?" with "No." With this audience that honesty converts.

### 5.2 Pricing — section 07

| Plan | Price | CTA |
| :--- | :--- | :--- |
| Creator | ₹5,599 / month | `/pilot?plan=creator` |
| Studio | ₹14,199 / month | `/pilot?plan=studio` |
| Custom | Let's talk | `/pilot?plan=custom` |

INR, excluding tax; annual billing saves 10%. **There is no checkout.** Both
priced plans lead to the same application form with the plan preselected, so
pricing qualifies without committing either side.

### 5.3 Pilot — `/pilot`

The form shares the hero rather than sitting below the fold, with "who this
fits" beside it so a reader can disqualify themselves in seconds. Six fields:
plan, full name, work email, agency, website, message.

**It submits for real.** `POST /api/submissions` validates server-side, then
forwards to a Google Apps Script webhook that appends a row to a private sheet
and emails the team. Protected by a honeypot field; a bot that fills it gets a
success response and the submission is dropped, so it learns nothing.

Validation is deliberately forgiving: `acme.com` is accepted and normalised to
`https://acme.com` rather than rejected.

### 5.4 Privacy Policy — `/privacy` and Terms — `/terms`

Written for two readers at once: a customer's legal team and a Meta reviewer.
The Privacy Policy gives Meta Platform Data its own section — each permission
with its justification, what is stored, explicit non-uses, and a working
deletion route — and separately covers what the pilot form collects.

---

## 6. Design principles

**The diagrams carry the argument.** Prose alone makes workflow claims feel
abstract, so each numbered band pairs one claim with one diagram showing the
mechanism. The diagrams are primary content, not decoration — which is why they
have their own specification. See [Diagram system](./diagram-system.md).

**Mobile first.** Most of this site is read on a phone. Because the diagrams
carry the argument, a diagram that only works at 1140px is an argument most
readers never get. Diagrams are drawn portrait first and widened by rotating
their axis, never by scaling down.

**Calm over energetic.** A sceptical, senior audience. Restrained typography,
generous whitespace, hairline rules, one accent colour, slow small motion.
Anything that reads as a growth-hack landing page undermines the argument.

**Honest visual claims.** Charts show relative shape, not fabricated data. The
2x and 75% figures come from Yuvabe's own production workflows and are described
as such.

**Skimmable.** A reader who only reads the numbered eyebrows and headlines
should still get the argument.

---

## 7. Constraints

**Meta App Review (hard).** `/privacy` and `/terms` must stay publicly reachable
with no login wall, no auth redirect and no `noindex`. Both are static
prerendered routes. Password-protecting the site — even temporarily — fails
review.

**Legal accuracy.** The policy documents make factual representations about data
handling. They remain drafts pending legal review, and several specifics
(governing law, retention windows, security claims) are stated assumptions. They
must be verified before the Meta submission, and the product must behave as they
describe.

**Submissions depend on environment.** `SHEETS_WEBHOOK_URL` and
`SHEETS_WEBHOOK_SECRET` must be set in the deployment environment or the form
fails at runtime. The Apps Script lives at [`docs/submissions.gs`](./submissions.gs).

**Design fidelity.** Ported from the Design Canvas sources in
`design-reference/`, which remain the visual source of truth.

**Fonts.** Clash Display and Gilroy are self-hosted. Gilroy is commercial —
confirm the licence covers web embedding at production traffic.

---

## 8. Known gaps

| Gap | Impact | Notes |
| :--- | :--- | :--- |
| Most diagrams have no portrait variant | **High** — the diagrams carry the argument, so on a phone the argument is degraded | Hero and the four glyphs are done. The comparison charts, capsule loop, checkpoint lanes and signal lens still scroll sideways. Specified per-diagram in the [diagram system](./diagram-system.md). |
| No analytics | Medium — nothing measures §4 | No funnel visibility from arrival to submission. |
| `production-system.tsx` is unreferenced | Low — dead code | Superseded by `tool-sprawl.tsx` as section 02. Delete or reinstate. |
| No submission rate limit | Low | The honeypot stops naive bots; nothing stops a determined one. |
| `/product` route does not exist | Low — no longer linked | Nav and footer were repaired; the designed page remains unported. |
| Production canvas screenshot missing | Low | Placeholder in section 04; the source `<image-slot>` shipped empty. |

---

## 9. Technical summary

Next.js 16 (App Router, Turbopack, RSC), Tailwind CSS v4 with CSS-first `@theme`
tokens, shadcn/ui on Radix, Lucide icons, Motion (Framer Motion) for scroll
reveals only. pnpm.

All pages are statically prerendered; the only dynamic surface is
`POST /api/submissions`. Client components are limited to the scroll-reveal
wrappers, the FAQ accordion and the pilot form — which keeps the large inline
SVG diagram markup out of the client bundle.

```
pnpm install
pnpm dev
pnpm build
```

Verifying at phone width: Chrome's `--window-size` does **not** reliably set the
CSS viewport in headless mode, so a phone-width screenshot can show a desktop
layout cropped to a narrow image. Measure with CDP
`Emulation.setDeviceMetricsOverride` instead.

---

## 10. Open questions

1. Should submissions also reach a CRM, or is the sheet plus email enough?
2. Is `creativeos.yuvabe.com` the production domain? `src/lib/site.ts` assumes it.
3. Who signs off the legal documents, and by when relative to the Meta submission?
4. Analytics: wanted, and under what consent model given EU readers?
5. Do the published prices need a currency switch for non-INR markets?
6. Should `design-reference/` ship in the production repo, or move to its own?
