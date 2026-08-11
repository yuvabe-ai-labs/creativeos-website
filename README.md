# CreativeOS — marketing site

Next.js implementation of the CreativeOS marketing site, ported from the
Claude Design project [Marketing website for CreativeOS][design].

[design]: https://claude.ai/design/p/cea94ec2-f426-45a4-b7d7-0961cf86d4a2

## Documentation

- **[PRD](./docs/PRD.md)** — what the site is for, who it is for, what each page
  has to do, and the known gaps.
- **[Diagram system](./docs/diagram-system.md)** — the visual language every
  diagram follows (colour roles, stroke scale, dash vocabulary, type, node
  scale, motion) plus a specification for each of the ten diagrams. **Read Part 1
  before drawing a new one.**

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, RSC) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) |
| Components | shadcn/ui — `radix-nova` style, Radix primitives, Lucide icons |
| Motion | `motion` (Framer Motion's current package) — scroll reveals only |
| Fonts | Clash Display + Gilroy, self-hosted via `next/font/local` |
| Package manager | pnpm |

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

## Layout

```
src/
  app/
    globals.css          design tokens, signal-flow keyframes, shadcn token bridge
    layout.tsx           font loading + document metadata
    page.tsx             composes the nine sections
  components/
    diagrams/            the six large SVG diagrams + four capability glyphs
    motion/              the scroll-reveal wrappers (the only client components)
    sections/            one file per numbered band of the page
    site/                header, footer, CTA link, section shell
    ui/                  shadcn registry components (do not hand-edit)
  fonts/                 Clash Display (woff2) + Gilroy (ttf)
design-reference/        read-only export of the Design Canvas project
```

`design-reference/` is the visual source of truth. It is excluded from ESLint,
and its `uploads/` folder is gitignored (large screenshots).

## Design tokens

The palette, type scale and keyframes live in `src/app/globals.css` under
`@theme`. Tailwind utilities (`text-ink-soft`, `bg-purple`, `border-line`) and
the inline SVG diagrams draw on the same values, so a colour change is one edit.

The `signal-flow` animation — comet dots travelling converging bezier paths into
a pulsing node — is the site's signature motif. Its anatomy is documented in
`design-reference/Marketing website for CreativeOS/CLAUDE.md`. Two rules matter:

- A comet's `stroke-dashoffset` travel must equal its dash period, or the loop
  visibly snaps.
- The per-path `animation-delay` stagger is the effect. Do not normalise it.

Diagrams carrying motion are marked `data-signal-flow`, which
`prefers-reduced-motion: reduce` uses to switch them off.

## Motion

There are three separate animation systems, and they do not overlap:

| What | How | Where |
|---|---|---|
| Diagram motion (comets, pulses, the capsule loop) | CSS `@keyframes` | `globals.css` |
| Accordion open/close | Radix + `tw-animate-css` | `ui/accordion.tsx` |
| Scroll reveals | `motion` (Framer Motion) | `motion/reveal.tsx` |

Scroll reveal is the only thing Framer Motion does here, because it is the only
one of the three that CSS cannot express — it needs to know when an element
enters the viewport. Everything else was already correct in CSS and was left
alone. `Reveal` / `RevealGroup` / `RevealItem` are the only client components on
the page, which keeps the large inline SVG markup out of the client bundle.

**One trap worth knowing.** Motion server-renders its `initial` styles, so the
HTML always ships `opacity:0;transform:translateY(16px)` — the server cannot
know the visitor's motion preference. The reduced-motion path therefore has to
*animate to the visible state instantly* rather than skip the animation. Setting
`initial={false}`, leaving `whileInView` undefined, or rendering a plain element
instead all leave that SSR opacity in place and the content never appears.
`motion/reveal.tsx` carries this as a comment; please keep it there.

## Notes on the port

- **SVG diagrams are ported verbatim.** They were converted from the source
  markup mechanically rather than redrawn. They cannot be extracted to `.svg`
  files: their `<text>` labels need Gilroy, and an SVG loaded through `<img>`
  can't reach the host document's `@font-face` rules.
- **`font:` shorthands were split into `fontWeight`/`fontSize`.** `next/font`
  generates a hashed family name, so a literal `font-family:'Gilroy'` inside the
  SVGs would have silently fallen back to system sans. Family now inherits.
- **The FAQ uses a Radix accordion, not `<details>`.** This adds a chevron the
  source did not have — the source suppressed the native disclosure marker, but
  a custom accordion with no affordance at all is worse. This is the one
  deliberate visual deviation.
- **Wide diagrams scroll horizontally** below ~720px (~860px for the capsule
  loop) rather than shrinking to illegibility. The source had no mobile
  treatment for them.
- **Section 03 comes from the Sales Deck, not the home page.** "Work compounds
  instead of restarting." and its create/learn capsule loop are slide 03 of
  `CreativeOS Sales Deck.dc.html`, used in place of the home page's original
  "One connected workflow for reels and static posts." band.

## Not yet built

- `/product` and `/pilot`. The header, footer and every CTA already link to
  them; both routes 404 until their Design Canvas pages are ported.
- The **production canvas** screenshot in section 03. The source's `<image-slot>`
  ships empty, so a placeholder renders instead — pass `src` to
  `ProductionCanvas` in `src/components/sections/workflow.tsx` once a capture
  exists.
