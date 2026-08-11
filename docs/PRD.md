# CreativeOS website — Product Requirements

**Status:** live, first release
**Owner:** Yuvabe Studios
**Repository:** `yuvabe-ai-labs/creativeos-website`
**Companion document:** [Diagram system](./diagram-system.md) — the visual language and per-diagram specifications

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

This website is not the product. It is the argument for the product, plus the
front door to the pilot programme and the legal surface the Instagram
integration requires.

---

## 2. Why it exists

Three jobs, in priority order.

**1. Convert qualified agencies into pilot applications.** The commercial goal.
The site has to make a reader recognise their own workflow in the problem
described, believe the mechanism is real, and apply.

**2. Explain a category that does not have a name yet.** CreativeOS is not an
image generator and not a chat tool, and prospects will default to assuming it
is one of those. The site's harder job is category education: showing that the
expensive part of AI production is not generation, it is the setup and context
reconstruction that happens around every generation.

**3. Satisfy Meta App Review.** The Instagram publishing integration cannot ship
without a publicly reachable Privacy Policy and Terms of Service. This is a hard
dependency, not a nice-to-have — see §7.

---

## 3. Who it is for

**Primary — agency principal or production lead.** Runs a team producing
recurring content for several D2C clients. Feels the cost of retries and
repeated briefing directly, in hours and in credits. Has authority to approve a
pilot. Skeptical of AI tooling claims because they have already tried several.

**Secondary — senior designer or creative director.** Will be asked "is this
real?" by the principal. Cares whether the tool takes control away from them.
Section 02 and the FAQ speak to this reader specifically.

**Tertiary — Meta App Review.** Not a customer, but a reader with veto power
over the product's publishing capability. Reaches `/privacy` and `/terms`
anonymously and rejects anything behind a login.

---

## 4. Objectives and success measures

| Objective | Measure |
| :--- | :--- |
| Generate qualified pilot applications | Applications submitted via `/pilot`, filtered for the "who this fits" criteria |
| Communicate the category | Scroll depth to section 03+; time on page; qualitative — do applications describe the right problem in their own words? |
| Unblock the Instagram integration | Meta App Review approval on first submission |
| Establish credibility | Direct traffic and referrals from existing Yuvabe relationships converting to applications |

**Explicitly not an objective:** traffic volume. This is a small, high-intent
audience. A hundred right readers beats ten thousand wrong ones, and no part of
the site should be optimised for reach at the cost of precision.

---

## 5. Content and structure

### 5.1 Home — `/`

A single scrolling argument in nine bands. The order is the argument; do not
reorder without rewriting.

| # | Band | Job |
| :-- | :--- | :--- |
| — | **Hero** | Position the product in one line and offer the pilot. The signal-flow diagram shows many inputs converging into one asset. |
| 01 | **The hidden cost of AI production** | Name the problem. Two stacked charts contrast setup-repeated-per-asset against context-set-once. This is the band that has to land. |
| 02 | **Not another AI generator** | Pre-empt the miscategorisation. Four capabilities, each with a glyph. |
| 03 | **How it works** | Show the loop. "Work compounds instead of restarting" with the create/learn capsule. Sourced from Sales Deck slide 03, not the original home page band. |
| 04 | **Catch errors while they are cheap** | The economic argument. A mistake costs credits in an image and a batch in video. Carries the 2x / 75% figures. |
| 05 | **Connected to what is changing** | Market signals refracted through brand context into one direction. |
| 06 | **Pilot with one D2C brand** | The offer, as six concrete steps. |
| 07 | **Questions** | Eight FAQs, several of which deliberately say "no" — no performance guarantee, no model replacement, no finished reels. |
| — | **Closing CTA** | Apply, or book a walkthrough. |

**Tone rules.** Declarative sentences. No superlatives. Where a claim has a
limit, state the limit — the FAQ answers "Does it guarantee better-performing
content?" with "No." That honesty is a conversion asset with this audience, not
a liability.

### 5.2 Pilot — `/pilot`

The application. Left column sets expectations: the ten things measured during a
pilot, and six "who this fits" criteria that let a reader disqualify themselves
before spending three minutes. Right column is the form.

Required: name, work email, agency, role, website, active D2C clients,
reels/month, static posts/month, current tools, biggest bottleneck, preferred
pilot brand. Optional: generations per approved asset, team size, sample work,
notes.

> **Current limitation.** The form does not submit anywhere. It fakes a
> round-trip and shows a success state. See §8.

### 5.3 Privacy Policy — `/privacy`

Covers workspace data and, in a dedicated section, Meta Platform Data: each
permission requested with its justification, what is stored, explicit
non-uses, and a working deletion route. Written for two readers at once — a
customer's legal team and a Meta reviewer.

### 5.4 Terms & Conditions — `/terms`

Service description, acceptable use, ownership, generated-output review
responsibility, and a dedicated Instagram/Meta section.

### 5.5 Not yet built

`/product` — linked from the header and footer, currently 404s. The designed
page exists as `CreativeOS Product.dc.html` in the design reference.

---

## 6. Design principles

**The diagrams carry the argument.** This site explains a workflow problem, and
prose alone makes workflow claims feel abstract. Each numbered band pairs one
claim with one diagram that shows the mechanism. The diagrams are the primary
content, not decoration — which is why they have their own specification
document. See [Diagram system](./diagram-system.md).

**Calm over energetic.** The audience is skeptical and senior. Restrained
typography, generous whitespace, hairline rules, one accent colour. Motion is
slow and small. Anything that reads as a growth-hack landing page undermines
the argument.

**Honest visual claims.** Charts show relative shape, not fabricated data. The
2x and 75% figures come from Yuvabe's own production workflows and are described
as such.

**Every band is skimmable.** A reader who only reads the numbered eyebrows and
headlines should still get the argument.

---

## 7. Constraints

**Meta App Review (hard).** `/privacy` and `/terms` must be publicly reachable
with no login wall, no redirect to auth, and no `noindex`. Both are static
prerendered routes. Putting the site behind a password — even temporarily — will
fail review.

**Legal accuracy.** The policy documents make factual representations about data
handling. They are drafts pending legal review, and several specifics are
stated assumptions. They must be verified before the Meta submission, and the
product must actually behave as they describe.

**Design fidelity.** The site is ported from Design Canvas source files in
`design-reference/`, which remain the visual source of truth. Diagrams were
converted mechanically rather than redrawn.

**Fonts.** Clash Display and Gilroy are self-hosted. Gilroy is a commercial
typeface; confirm the licence covers web embedding at production traffic.

---

## 8. Known gaps

| Gap | Impact | Notes |
| :--- | :--- | :--- |
| Pilot form does not submit | **High** — applications are silently lost | No server action, no validation, no spam protection, and no error path at all. Tagged `TODO(pilot-submit)`. |
| `/product` route missing | Medium — header and footer links 404 | Design exists, not ported. |
| Applicant data not in Privacy Policy | Medium — the form collects names, work emails and commercial detail | Must be covered before the form goes live. |
| Production canvas screenshot missing | Low | Placeholder in section 03; the source `<image-slot>` shipped empty. |
| No analytics | Low | Nothing currently measures the objectives in §4. |

---

## 9. Technical summary

Next.js 16 (App Router, Turbopack, React Server Components), Tailwind CSS v4
with CSS-first `@theme` tokens, shadcn/ui on Radix primitives, Lucide icons,
Motion (Framer Motion) for scroll reveals only. pnpm.

All routes are statically prerendered. The only client components are the scroll
reveal wrappers, the FAQ accordion and the pilot form — which keeps the large
inline SVG diagram markup out of the client bundle.

```
pnpm install
pnpm dev
pnpm build
```

---

## 10. Open questions

1. Where should pilot applications land — email, a CRM, or a database?
2. Is `creativeos.yuvabe.com` the production domain? `src/lib/site.ts` assumes it.
3. Who signs off the legal documents, and by when relative to the Meta submission?
4. Should `design-reference/` ship in the production repo, or move to a separate design repo?
5. Is analytics wanted, and if so under what consent model given the EU-reader possibility?
