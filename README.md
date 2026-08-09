# CreativeOS — marketing site

Next.js implementation of the CreativeOS marketing site, ported from the
Claude Design project [Marketing website for CreativeOS][design].

[design]: https://claude.ai/design/p/cea94ec2-f426-45a4-b7d7-0961cf86d4a2

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, RSC) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`) |
| Components | shadcn/ui — `radix-nova` style, Radix primitives, Lucide icons |
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
- **Wide diagrams scroll horizontally** below ~720px rather than shrinking to
  illegibility. The source had no mobile treatment for them.

## Not yet built

- `/product` and `/pilot`. The header, footer and every CTA already link to
  them; both routes 404 until their Design Canvas pages are ported.
- The **production canvas** screenshot in section 03. The source's `<image-slot>`
  ships empty, so a placeholder renders instead — pass `src` to
  `ProductionCanvas` in `src/components/sections/workflow.tsx` once a capture
  exists.
