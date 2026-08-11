# CreativeOS diagram system

The visual language for every diagram on the CreativeOS site and deck, and the
specification for each diagram already built.

**Read Part 1 before drawing anything new.** It is what makes a new diagram look
like it belongs. Part 2 documents what exists, so you can copy a diagram without
reverse-engineering it.

Every value here was extracted from the shipped components in
`src/components/diagrams/`, not from intent. Where the code and this document
disagree, the code is wrong — fix it.

**Companion document:** [PRD](./PRD.md)

---

# Part 1 — Design guidelines

## 1.1 What a diagram is for

A CreativeOS diagram shows a **mechanism**, not a quantity. It answers "how does
this work" or "what changes", never "how much". None of these are charts of real
data, and none should be drawn to imply they are.

Every diagram states exactly one idea. If you cannot write that idea as one
sentence, the diagram is doing too much — split it.

The consistent narrative shape across the whole system is:

> **many scattered inputs → one boundary → one clean output**

The hero converges rays into a node. Section 01 contrasts repeated setup against
context-set-once. Section 05 refracts signals through a lens into one direction.
They are the same sentence drawn three ways, which is why the site feels
coherent.

## 1.2 Canvas and scale

Diagrams are authored in a fixed `viewBox` and scaled to fit. Use one of these
three canvases — do not invent a new width.

| Canvas | `viewBox` | Use |
| :--- | :--- | :--- |
| **Inline glyph** | `0 0 280 120` | Sits beside a paragraph in a feature grid |
| **Section** | `0 0 1080 <340–420>` | Full-width diagram inside a bordered frame |
| **Slide** | `0 0 1560 560` | Sales deck, 1920px stage |

Height varies with content; width does not. The section canvas is 1080 units
wide because it renders at roughly 1140px inside the 1240px measure — close
enough to 1:1 that a unit reads as a pixel.

> **This is why type sizes look small in the source.** A `fontSize: "12px"` in a
> 1080-unit canvas renders at about 12.7 CSS px. Never "fix" these numbers by
> eye — check the rendered size instead.

**Responsive rule.** Section and slide diagrams do not shrink below legibility.
Wrap them in a horizontally scrolling container with a `min-width` (720px for
section, 860px for the capsule loop) rather than letting the type collapse.

```tsx
<DiagramFrame className="overflow-x-auto px-4 py-7">
  <div className="min-w-[720px]">
    <YourDiagram />
  </div>
</DiagramFrame>
```

## 1.3 Colour

Colour carries meaning here. **Nothing is coloured for decoration.** Every hue
below has one job, and using it for anything else breaks the reading.

### Semantic roles

| Role | Value | Meaning | Where |
| :--- | :--- | :--- | :--- |
| **Accent** | `#5829c7` | The CreativeOS path. Anything working, active, resolved. | Active strokes, filled nodes |
| **Accent deep** | `#4c24ab` | Emphasised label — a step number, a positive outcome | `<text>` only |
| **Halo** | `rgba(88,41,199,.28)` | Ring around a terminal node | Stroke, width 2 |
| **Accent wash** | `rgba(88,41,199,.06–.12)` | Region fill behind an accent zone | Large shapes |
| **Track** | `#aab1bf` | The old way. Inactive, repeated, pre-CreativeOS. | Dashed journey paths |
| **Guide** | `#c3c9d4` | Structural scaffolding — drop-lines, axes | Thin lines |
| **Rule** | `#d5d9e0` | The faintest structure, below guide | Static beam tracks |
| **Node fill** | `#fff` | Interior of an unfilled marker | Circle fill |
| **Label** | `#6b7280` | Sentence-case labels | `<text>` |
| **Label micro** | `#9ca3af` | UPPERCASE micro-labels, and glyph icon strokes | `<text>`, icon paths |
| **Lavender** | `#9688c0` | Secondary accent — signal comets before resolution | Strokes, gradients |
| **Error** | `#f04e28` | A flaw, a rejection, a wasted cycle | Fill and stroke |
| **Error deep** | `#8a2e18` | Label attached to an error | `<text>` |
| **Amber** | `#e3a900` / `#ffca2d` | **Deck only.** The CREATE half of the capsule loop. | Stroke, fill |

### The one rule that matters

> **Grey is the problem. Purple is the solution.**

A reader who understands nothing else will still read the diagram correctly if
grey means "how it works today" and purple means "how it works with CreativeOS".
Never draw a CreativeOS path in grey or a legacy path in purple.

### Dark mode

The site diagrams are light-mode only. The deck has dark slides on `#140f2b`,
where the mapping changes: tracks become `rgba(255,255,255,.2–.45)` and the
accent becomes yellow `#ffca2d`. Do not mix the two vocabularies in one diagram.

## 1.4 Stroke weight

A five-step scale. Weight encodes importance, so pick by role, not by eye.

| Weight | Role |
| :--- | :--- |
| `1` – `1.2` | Background texture — the faint converging tracks in the hero, gradient hairlines |
| `1.4` – `1.6` | Structure — guide lines, drop-lines, glyph detail |
| `1.8` | Lucide icon strokes inside a diagram |
| `2` | Marker outlines, connector stubs, halo rings |
| `2.2` | The inactive journey path (always paired with a dash) |
| `2.4` – `2.6` | **The active accent path.** The thickest ordinary line. |
| `3`+ | Special: white dividers over a filled region, deck stage markers |

The active path is always **thicker than** the inactive path it is compared
against — `2.4` against `2.2`. The difference is deliberately small; weight
should whisper, colour should speak.

## 1.5 Dash vocabulary

Dash patterns are a language. There are three kinds, and mixing them muddles the
meaning.

**Structure** — scaffolding that is not a path.

| Pattern | Use |
| :--- | :--- |
| `2 7` | Vertical drop-line from a label to the path below. The workhorse. |
| `2 14` | Light-mode background track (per the deck's signal-flow convention) |
| `3 5` | Dashed inner ring on a nucleus |

**Journey** — a route someone actually travels.

| Pattern | Use |
| :--- | :--- |
| `3 8` / `3 6` | The inactive route — repeated setup, the old way |
| *(solid)* | The active route. **Never dash an accent path.** |

**Comet** — an animated dot travelling a path.

The dash is the dot; the gap must exceed the path length so only one dot is
visible at a time. Written as `<dot> <gap>`:

| Pattern | Context |
| :--- | :--- |
| `4 220`, `5 200` | Hero background rays |
| `7 160` | Hero foreground rays |
| `6 130` | Signal lens input rays |
| `7 60`, `10 70` | Short output beams |

> **The rule that makes comets not stutter.** The keyframe's
> `stroke-dashoffset` travel must equal the dash period exactly. For
> `stroke-dasharray="7 160"`, the period is 167, so the animation must end at
> `-167` — not `-160`, not `-170`. Any other value makes the loop visibly snap.

## 1.6 Typography

Two families, two weights, one narrow size range. That constraint is most of why
the diagrams look like a set.

| | |
| :--- | :--- |
| **Family** | Gilroy for labels; Clash Display only for large display words inside a diagram (`CREATE` / `LEARN`) |
| **Weight** | `500` for sentence-case labels, `600` for UPPERCASE micro-labels. **Nothing else** — no 400, no 700. |
| **Size (section canvas)** | `11`–`13px`. Micro-labels 11–12, data labels 13. |
| **Size (glyph canvas)** | `8.5`–`10px` |
| **Size (slide canvas)** | `19`–`20px` labels, `38px` display |
| **Tracking** | `0.6`–`1.4px` on UPPERCASE. Wider text needs more. Never track sentence case. |
| **Case** | UPPERCASE for stage and category labels; sentence case for data-row labels |

### Do not set `font-family` inside SVG

Set `fontWeight` and `fontSize` and let the family **inherit** from the page.

```tsx
// Correct — inherits Gilroy from <body>
<text style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} />

// Wrong — next/font hashes the family name, so this silently falls back
<text style={{ font: "600 12px 'Gilroy', sans-serif" }} />
```

`next/font` generates a hashed family name at build time. A literal `'Gilroy'`
will not match it and every label will quietly render in system sans. For Clash
Display, use the CSS variable: `fontFamily: "var(--font-clash-display), sans-serif"`.

## 1.7 Node scale

Circles are the system's nouns. Radius encodes rank.

| Radius | Meaning |
| :--- | :--- |
| `2` – `3.5` | Anchor dot at the end of a background ray |
| `4` – `5` | Minor stage marker |
| `6` | **Journey marker.** White fill, `2`-weight outline. Grey outline = inactive, purple = active. |
| `7` | Error dot — solid `#f04e28` |
| `9` + `15` halo | **The terminal node.** Solid `#5829c7` at r9, plus an unfilled `rgba(88,41,199,.28)` ring at r15, weight 2. |
| `13` + `20` halo | Emphasised checkpoint |
| `22` + `30` halo | Hero central node |

> **The r9 + r15 halo pair is the system's signature.** It means "this is the
> output — the thing the whole diagram was travelling toward." It appears in
> five diagrams. Use it for terminal states only; using it mid-path destroys its
> meaning.

## 1.8 Motion

Motion shows flow direction. It is never required to understand the diagram —
every diagram must read correctly as a still image.

| Keyframe | Does | Typical duration |
| :--- | :--- | :--- |
| `cosray` | Comet dot along a path | 3.2–6.2s |
| `cosbeam` | Short output beam | 2.4–3.2s |
| `cosglow` | Node ring breathing, opacity `.45→.85` + scale `1→1.06` | 3–4s |
| `cosripple` | Expanding ring emitted from a node, scale `1→24` | 3.2s |
| `cospulse` | Node scale bump `1→1.35→1` | 3.2s |
| `cosloopW` / `cosloopTrail` / `cosloopC` | Capsule loop: dot, trail, colour shift | 12s |
| `cosstageW` / `cosstageFY` / `cosstageF` | Stage marker flash on arrival | 12s |

**Stagger is the effect.** Ray delays are derived from path geometry so dots
arrive in sequence. Normalising them to a single value destroys the "many
signals, one asset" reading. Never round these.

**Reduced motion is mandatory.** Mark any animated diagram's container
`data-signal-flow`; global CSS disables the animations under
`prefers-reduced-motion: reduce`.

```tsx
<div data-signal-flow>
  <YourDiagram />
</div>
```

## 1.9 Mobile

> **Status:** specified here, **not yet built.** What currently ships is the
> horizontal-scroll fallback from §1.2. That is a stopgap, not a design — a
> reader on a phone gets a diagram they must drag sideways to read, and the hero
> diagram is hidden from them entirely. Treat this section as the spec to
> implement, not a description of the site today.

### The principle

Every diagram in this system reads **left → right**: inputs, then a boundary,
then one output. A phone is a tall, narrow, vertically-scrolling surface.

> **Rotate the narrative axis; do not scale the canvas.**
> Desktop reads left → right. Mobile reads top → bottom.

Shrinking a 1080-unit diagram to 390 units makes 12px type render at 4px. Every
attempt to fix that by enlarging the type breaks the layout, because the
proportions were drawn for a wide canvas. The only treatment that survives
contact with a phone is a redraw on a portrait canvas.

### Canvases

| Canvas | `viewBox` | Renders at |
| :--- | :--- | :--- |
| **Mobile portrait** | `0 0 390 <320–620>` | ~390px — effectively 1:1 |
| **Inline glyph** | `0 0 280 120` | Unchanged — already works on mobile |

The 1080 section canvas renders at ~1140px and the 390 mobile canvas at ~390px.
Both are close enough to 1:1 that **font sizes port between them unchanged** —
11–13px stays 11–13px. This is the single most useful property of the system;
do not break it by picking a mobile canvas width far from the viewport width.

### Breakpoints

| Range | Treatment |
| :--- | :--- |
| `< 768px` | Mobile portrait variant |
| `768px – 1080px` | Section canvas, horizontal scroll permitted |
| `≥ 1080px` | Full desktop |

### The density budget

A mobile variant carries **at most 40% of the desktop element count**. This is a
hard budget, not a guideline — the failure mode is a faithful portrait redraw
that is still far too busy.

**Must survive**

- The single idea from the diagram's docblock
- The grey-versus-purple contrast
- The terminal node (r9 + r15 halo)
- Every label that names a stage

**Cut first, in this order**

1. Decorative depth layers and gradient hairlines — they read as texture at
   desktop size and as noise at phone size
2. Repeated lanes — two conveys "every asset" as well as four
3. Intermediate stage markers — keep the first, the last, and the transition
4. Secondary descriptive captions, which the adjacent prose already carries

### Type on mobile

| | |
| :--- | :--- |
| **Floor** | **11px rendered. Never smaller.** Below this, labels are decoration. |
| Micro-labels | 11px / weight 600 / UPPERCASE |
| Data labels | 12–13px / weight 500 |
| Display words | 20–24px (down from 38px on the slide canvas) |

If a mobile variant cannot fit its labels at 11px, it has too many elements —
go back to the density budget. **Do not shrink the type.**

Right-aligned label columns do not work at 390 units; there is no room for a
label gutter beside a diagram. Move labels **above** the element they name.

### Choosing a treatment

Three strategies. Pick by what the diagram is doing, not by what is easiest.

| Strategy | Use when | Example |
| :--- | :--- | :--- |
| **Rotate** | The diagram is a sequence or a convergence | Hero, signal lens, checkpoint lanes |
| **Reduce** | The structure already works vertically, there is just too much of it | The comparison charts — same drawing, fewer lanes |
| **Stack** | The diagram is a side-by-side comparison | Checkpoint lanes: two lanes become two stacked blocks |

**Scrolling is not on this list.** It remains acceptable only between 768px and
1080px, where the desktop diagram is merely cramped rather than illegible.

### Implementation

Author the mobile variant as a **separate exported component** in the same file,
and switch with CSS so both are server-rendered:

```tsx
export function SignalLens() { /* 1080 canvas */ }
export function SignalLensMobile() { /* 390 canvas */ }
```

```tsx
<div data-signal-flow>
  <div className="hidden md:block"><SignalLens /></div>
  <div className="md:hidden"><SignalLensMobile /></div>
</div>
```

**Why CSS and not a media-query hook.** These pages are statically prerendered.
A JS hook cannot know the viewport during SSR, so it renders the wrong variant
and swaps after hydration — a visible flash on every diagram. The cost of the
CSS approach is that both markups ship. Accept it, and spend the budget by
keeping the mobile variant genuinely small — which the density budget already
requires.

### Motion on mobile

Halve the number of animated elements. A phone renders these at a fraction of
the area, and a dozen simultaneous comets read as flicker rather than flow.
Keep one animated path per input group and the terminal node's pulse. All the
§1.8 rules still apply, including `data-signal-flow` on the wrapper.

## 1.10 Accessibility

- Every diagram carries `aria-hidden="true"`. It is decorative in the accessibility
  tree, and the adjacent prose must carry the same argument.
- **If a diagram states something the prose does not, the page has a bug.**
- Do not rely on colour alone: the inactive path is dashed *and* grey; the active
  path is solid *and* purple.
- Never put an interactive control inside a diagram.

## 1.11 Checklist for a new diagram

1. One sentence describing the single idea. Written down.
2. Canvas from §1.2 — no new widths.
3. Grey for the problem, purple for the solution.
4. Stroke weights from the §1.4 scale.
5. Dashes from the §1.5 vocabulary, correct category.
6. Type at weight 500/600 only, family inherited, not set.
7. Terminal node uses r9 + r15 halo.
8. Comet dash periods match their keyframe travel exactly.
9. Reads correctly with animation off.
10. `aria-hidden="true"`, and the prose says the same thing.
11. **A mobile variant exists** — §1.9. Axis rotated, inside the density budget,
    no label under 11px, at most half the animated elements.

---

# Part 2 — The diagrams

Ten components in `src/components/diagrams/`. Each is ported verbatim from the
Design Canvas source and is safe to copy wholesale.

---

## 2.1 `HeroSignalFlow`

**Idea:** everything the agency knows converges into every asset.

| | |
| :--- | :--- |
| **File** | `hero-signal-flow.tsx` |
| **Canvas** | `-50 0 610 560` — negative x leaves room for right-aligned labels |
| **Used** | Home hero, right column, hidden below 1080px |
| **Animated** | Yes — `cosray`, `cosglow`, plus CSS `cosripple`/`cospulse` on sibling elements |

**Anatomy, back to front**

1. **Seven labels**, right-aligned at `x=55`, weight 500, 12.5px, `#1f2937`, each with a `r3.5` `#9ca3af` anchor dot at `x=73`. Brand context, Tone + claims, Market trend, Past generations, References, Corrections, Review decisions.
2. **Three depth layers of bezier rays**, all converging on `(320,280)`. Counts
   below are `<path>` elements; a ray that carries a comet is drawn twice, once
   as a static track and once as the animated dash on top.
   - Far: 30 paths from `x=101`, `rgba(75,85,99,.05)`, weight 1. Comets `4 220`, 6.2s.
   - Mid: 30 paths from `x=95`, `rgba(75,85,99,.08)`, weight 1. Comets `5 200`, 5.4s.
   - Near: 20 paths from `x=91`, `rgba(75,85,99,.12)`, weight 1.1. Comets `5 200`, 4.6s.
3. **Seven foreground rays** from `x=83` (14 paths — each is a track plus a
   comet), solid `#8b93a3` weight 1.6, comets `rgba(88,41,199,.8)` `7 160`,
   3.2s, staggered 0.4s apart. These are the ones that align with the labels.
4. **Central node** at `(332,280)`: solid `#5829c7` r22, `cosglow` ring r30, white arrow glyph.
5. **Output beam** to `x=448`: static `#d5d9e0` weight 1.6 under an animated `#5829c7` `7 60` `cosbeam`.
6. **Output node** (sibling HTML, not SVG): 26px purple dot with `cospulse`, plus a `cosripple` ring, both delayed 1.6s so the pulse lands as the beam arrives.

> The three depth layers are the whole trick. They read as "more than you can
> count" without any single ray being noticeable. Do not thin them out.

**Mobile — `0 0 390 460`, strategy: rotate.** The most important variant to
build, because mobile currently gets no hero visual at all.

- Rotate the convergence to run **downward**. Seven labels become a two-column
  grid across the top at 11px/600 UPPERCASE, each with its anchor dot beneath.
- Keep **one** depth layer, not three, at `rgba(75,85,99,.10)` weight 1 — enough
  to imply volume without turning the middle of the canvas grey.
- Seven foreground rays curve from the label dots down to a node at `(195,320)`,
  radius 18 with a 24 ring. Animate **three** of the seven, not all seven.
- Output beam runs vertically from the node to a pulsing dot at `(195,410)`.
- Drop the "EVERYTHING THE AGENCY KNOWS" caption — at this width it competes
  with the labels, and the hero paragraph already says it.

---

## 2.2 `ContextRebuiltChart`

**Idea:** every asset repeats the same setup before any real work starts.

| | |
| :--- | :--- |
| **File** | `context-rebuilt-chart.tsx` |
| **Canvas** | `0 0 1080 340` |
| **Used** | Home section 01, upper chart |
| **Animated** | No |

**Anatomy**

- **21 gradient hairlines** filling the field, `url(#cosFade)` — `#cbc3df` at .22 opacity to `#9688c0` at .5. Texture only.
- **Seven setup stages** across the top, alternating y so labels do not collide: EXPLAIN THE BRAND, TONE OF VOICE, PRODUCT DETAILS, MOOD + LIGHTING, COLORS + REFS, COMPLIANCE CHECK, then **ACTUAL WORK** in `rgba(76,36,171,.8)`. Each is a Lucide icon at `scale(0.86)`, a 600/12px label, a `1.6` stub and a `2 7` drop-line to the baseline.
- **Four asset lanes** — Post 1, Reel 1, Post 2, Reel 2 — each a wavy `#aab1bf` `2.2` path dashed `3 8`, passing through six `r6` white markers with grey outlines, then turning solid `#5829c7` `2.4` for the final segment into an `r9`+`r15` terminal node.
- **Caption pill** at 70% height, frosted white, "The same context, rebuilt for every single asset".

> The point is the ratio: six grey markers to one purple segment, four times
> over. Adding lanes strengthens it; shortening the grey run destroys it.

**Mobile — `0 0 390 480`, strategy: rotate + reduce.**

- Stages run **down the left edge** as seven rows, 11px/600 UPPERCASE,
  left-aligned at `x=12`, each with a horizontal `2 7` guide across the canvas.
  Vertical drop-lines become horizontal rules.
- **Two lanes, not four** — one Post, one Reel — as vertical paths descending
  through the seven stage rows, `#aab1bf` `2.2` dashed `3 8`, turning solid
  `#5829c7` `2.4` for the final segment into an `r9` + `r15` node at the bottom.
- Drop the 21 gradient hairlines entirely. At this size they fog the labels.
- Caption moves **below** the diagram as ordinary prose, not an overlaid pill —
  a frosted pill over a 390px canvas covers the thing it is describing.

---

## 2.3 `ContextOnceChart`

**Idea:** set the context once and every asset starts at the work.

| | |
| :--- | :--- |
| **File** | `context-once-chart.tsx` |
| **Canvas** | `0 0 1080 340` |
| **Used** | Home section 01, lower chart — directly compared with 2.2 |
| **Animated** | No |

Deliberately **the same drawing** as 2.2 with three changes. The comparison only
works because everything else is held identical.

1. The seven stage labels are unchanged except the last, now **WORK STARTS HERE**.
2. Four lanes collapse into **one lane labelled "Once"**, drawn solid `#5829c7` `2.4` with purple-outlined `r6` markers.
3. After the final stage the single path **fans out into four** terminal nodes at y = 140, 186, 232, 278, each `r9` + `r15`.

Caption sits lower, at 86%.

> Keep the two charts on one shared x-grid. If a stage moves in one, move it in
> the other, or the reader loses the comparison.

**Mobile — `0 0 390 480`, strategy: rotate + reduce.** Mirrors 2.2's mobile
variant exactly, with the same three changes as the desktop pair: last stage
becomes WORK STARTS HERE, the two lanes collapse to **one** solid purple lane,
and after the final stage it fans out into **three** terminal nodes rather than
four — three fits the width without crowding and reads identically.

> The two mobile charts must stay on **one shared y-grid**, exactly as the
> desktop pair share an x-grid. Rotating the axis rotates this constraint too.

---

## 2.4–2.7 Capability glyphs

Four inline glyphs on the `0 0 280 120` canvas, in the section 02 feature grid.
Small, quiet, no animation, no halo nodes. Type at 8.5–10px.

| Component | Idea | Anatomy |
| :--- | :--- | :--- |
| **`GlyphStartsWithContext`** | Generation begins from accumulated knowledge | `r34` accent-wash nucleus with a dashed `3 5` inner ring, label BRAND, two dashed `3 6` paths to white rounded rects, each terminating in an `r4` purple dot |
| **`GlyphOrganisedLikeAgency`** | Work lives under brands, campaigns, assets | BRAND pill at top, orthogonal `1.4` connectors down to two CAMPAIGN rects, each bracketing to two `r4.5` purple asset dots |
| **`GlyphPreservesJourney`** | Every attempt stays attached to what shipped | Dashed `3 6` `#aab1bf` path through four white `r5` markers labelled ATTEMPT 1 → EDITS, ending in an `r8` + `r14` halo node labelled APPROVED |
| **`GlyphImprovesNextCycle`** | Learning carries into the next campaign | Purple step function climbing left to right across CAMPAIGN 1–3, white `r4.5` markers at each riser, solid `r7` node at the summit |

> These are the only diagrams where the accent appears without a grey
> counterpart — at this size a two-state comparison does not read.

**Mobile — no variant needed.** The 280-unit canvas renders at ~330px inside a
single-column grid, close to its authored size. Nothing to rotate and nothing to
cut.

> This is worth noticing: the glyphs needed no mobile work because they were
> authored near phone width in the first place. That is the argument for the
> 390-unit mobile canvas in §1.9 — draw at the size it will be read.

---

## 2.8 `WorkflowCapsuleLoop`

**Idea:** production is a loop, not a line; the second project is easier than the first.

| | |
| :--- | :--- |
| **File** | `workflow-capsule-loop.tsx` |
| **Canvas** | `0 0 1560 560` — the slide canvas |
| **Used** | Home section 03 |
| **Animated** | Yes — 12s cycle |
| **Source** | Sales Deck slide 03, not the original home page band |

**Anatomy**

- **Capsule outline**, a rounded rect with 115-unit ends, `#c3c9d4` `2.4` dashed `2 14`.
- **Two gradient lobes** on an 85-unit inset capsule: `url(#cosCloudY)` amber from top-left, `url(#cosCloudP)` purple from bottom-right, split by a white `3` divider through the centre.
- **CREATE** and **LEARN** in Clash Display 600/38px, tracking `.18em`, at 75% and 55% opacity of amber and purple.
- **The travelling dot**: the capsule path drawn twice more — `cosloopTrail` fills a stroke in behind it, `cosloopW` carries an `18 2470` dash around it, and `cosloopC` shifts both from `#e3a900` to `#5829c7` at the 40–45% mark, exactly where the loop crosses from CREATE into LEARN.
- **Six stage markers**, `r13` white with `3.4` grey outlines: 01–04 along the top (x = 360, 640, 920, 1200), 05 and 06 along the bottom (x = 960, 580). Each has a `cosstageW` expanding ring and a `cosstageFY` (amber) or `cosstageF` (purple) fill flash.
- **Labels** at 600/20px (`#4c24ab` numerals) and 600/19px (`#6b7280` names).

> **The delays are geometry.** `0.1s`, `1.45s`, `2.8s`, `4.15s`, `7.23s`,
> `9.07s` are the dot's actual arrival times at each marker on the 12s cycle.
> Change the duration or the path and every one must be recomputed, or markers
> will flash at the wrong moment.

Bottom labels run **right to left** (05 at x960, 06 at x580) because the return
leg travels backwards. That is correct, not a mistake.

**Mobile — `0 0 390 620`, strategy: rotate.** The capsule stands **upright** — a
tall stadium roughly 210 units wide by 520 tall, centred.

- The two lobes split **horizontally** rather than vertically, so CREATE occupies
  the upper half and LEARN the lower, with the white divider running across. Both
  words stay horizontal at 22px — **never rotate the type to fit a vertical
  capsule**; rotated words at 11–22px are unreadable on a phone.
- Stages 01–04 descend the **right** edge, 05–06 ascend the **left**, which
  preserves the clockwise reading of the desktop version.
- Labels move **outside** the capsule, right-aligned for the left column and
  left-aligned for the right, at 11px/600. Numerals stay `#4c24ab`.
- Markers shrink from `r13` to `r9` with `2.4` outlines.
- Keep the full 12s cycle and all six stage flashes — this diagram's whole idea
  is the loop, so its motion is load-bearing rather than decorative. **Recompute
  the six delays** for the new path length; the desktop values will be wrong.

---

## 2.9 `CheckpointLanes`

**Idea:** the same flaw costs a few credits in an image and a whole batch in video.

| | |
| :--- | :--- |
| **File** | `checkpoint-lanes.tsx` |
| **Canvas** | `0 0 1080 380` |
| **Used** | Home section 04 |
| **Animated** | No |

**Anatomy** — three labelled columns (IMAGE at x320, SENIOR REVIEW at x600, VIDEO
at x880), each with a `2 7` drop-line, and two lanes divided by an `#e5e7eb` rule
at y248.

**Upper lane — "Without a checkpoint"** (`#8a2e18`)
- Dashed `3 8` `#aab1bf` path straight through.
- `r7` `#f04e28` dot at IMAGE, "flaw slips through".
- Hollow dashed `2 3` marker at review, "no review".
- At VIDEO: `r26` error-wash circle with a `2.4` cross, "4 videos rejected".
- A dashed `4 6` error-coloured **return arc** curving back to the image stage, labelled "fix the image, regenerate everything" — the loop is the cost.

**Lower lane — "With CreativeOS"** (`#4c24ab`)
- Same dashed grey path, same `r7` error dot, labelled "same flaw" in neutral grey.
- At review: solid `r13` purple node with an `r20` halo and a white check, "caught + corrected here".
- Onward: solid `#5829c7` `2.4` to an `r9` + `r15` node, "1 approved video".

> Both lanes must start with an identical error dot. The argument is that the
> mistake is the same and only the checkpoint differs.

**Mobile — `0 0 390 560`, strategy: rotate + stack.**

- The three columns become **three rows** — IMAGE, SENIOR REVIEW, VIDEO — as
  11px/600 labels with horizontal `2 7` guides.
- The two lanes become **two vertical tracks side by side**, "Without" on the
  left at `x=120` and "With CreativeOS" on the right at `x=270`, each labelled
  at the top rather than the side. Both descend through the same three rows, so
  the reader compares across at each stage.
- The error dot sits at the IMAGE row in **both** tracks, unchanged — this is
  the one element that must not be cut.
- The return arc becomes a short curve looping from the VIDEO row back up to
  IMAGE on the left track only, keeping its `4 6` dash and error colour. Its
  caption moves below the diagram.
- Terminal nodes shrink to `r8` + `r13`.

> The stacked layout is stronger here than the desktop one: two vertical tracks
> put the outcomes side by side at the same eye level, so the contrast lands in
> a single glance.

---

## 2.10 `SignalLens`

**Idea:** market signals become useful only after passing through brand context.

| | |
| :--- | :--- |
| **File** | `signal-lens.tsx` |
| **Canvas** | `0 0 1080 360` |
| **Used** | Home section 05 |
| **Animated** | Yes — `cosray`, `cosglow` |

**Anatomy, left to right**

1. **Five signal labels**, right-aligned, 600/11px `#b6bcc7`, evenly spaced 63 units apart: TRENDING FORMAT, COMPETITOR PATTERN, SEASONAL MOMENT, AUDIENCE SHIFT, PAST PERFORMANCE. Each with an `r4.5` white marker. A sixth label in the same colour, MARKET SIGNALS, sits above them as a column heading.
2. **Five converging rays** to the lens face, static `#d5d9e0` `1.6` under animated `#9688c0` `1.8` comets, dashed `6 130`, 3.6s, staggered 0.7s.
3. **The lens** at `(560,180)`: an `rx90 ry150` radial glow, an `rx32 ry110` body filled with a vertical white→`#e9e4f6`→white gradient and stroked `#5829c7` `2`, a white highlight arc at 80% opacity, and a `cosglow` overlay. Labelled BRAND CONTEXT.
4. **Refraction lines** — five short `rgba(88,41,199,.35)` strokes converging from the lens face to a single point at `(588,180)`. This is the moment the diagram exists for.
5. **Output beam** to `x=858` on a `#9688c0`→`#5829c7` gradient at `2.6`, with a white `10 70` `cosbeam` highlight running along it.
6. **Terminal node** at `(872,180)`, `r9` + `cosglow` `r16` halo, labelled ONE SHARP DIRECTION above and "fits the brand and the moment" below.

> Five in, one out. Keep the count asymmetric — equal counts would imply
> filtering rather than synthesis.

**Mobile — `0 0 390 520`, strategy: rotate.**

- Five signal labels form a **two-column grid across the top** (three left, two
  right) at 11px/600, each with an `r4` marker below it. The desktop's
  right-aligned gutter has no room to exist at 390 units.
- Five rays converge **downward** into the lens. Animate **two**, not five.
- The lens **turns 90°** into a horizontal ellipse at `(195,300)`, `rx110 ry32`,
  keeping its gradient fill, `2` purple stroke and highlight arc. BRAND CONTEXT
  labels it from directly above.
- Refraction lines converge downward from the lens underside to a point at
  `(195,340)`.
- Vertical output beam to a terminal node at `(195,460)`, `r9` + `r16` halo,
  ONE SHARP DIRECTION above it and the supporting line below.

> Rotating the lens is what makes this work. A vertical lens on a narrow canvas
> leaves no width for the rays to fan across, and the refraction — the point of
> the whole diagram — collapses into a single line.

---

## Adding a diagram

1. Draw it in the Design Canvas project so the source stays canonical.
2. Convert mechanically rather than retyping — `stroke-width` → `strokeWidth`,
   `style="…"` → style objects, and split every `font:` shorthand per §1.6.
3. Drop it in `src/components/diagrams/` as a named export, with a docblock
   stating the single idea and anything a future editor could break.
4. **Draw the mobile variant in the same pass**, per §1.9, and export it from the
   same file as `<Name>Mobile`. Doing it later means re-deriving the geometry
   from scratch, and in practice means it never happens.
5. If it animates, wrap it in `data-signal-flow` and add the keyframes to
   `globals.css`.
6. Add a section to Part 2 above, including its mobile treatment.

---

## Build status

| Diagram | Desktop | Mobile |
| :--- | :--- | :--- |
| `HeroSignalFlow` | Shipped | **Spec only** — currently hidden below 1080px |
| `ContextRebuiltChart` | Shipped | **Spec only** — scrolls |
| `ContextOnceChart` | Shipped | **Spec only** — scrolls |
| The four glyphs | Shipped | Shipped — no variant needed |
| `WorkflowCapsuleLoop` | Shipped | **Spec only** — scrolls |
| `CheckpointLanes` | Shipped | **Spec only** — scrolls |
| `SignalLens` | Shipped | **Spec only** — scrolls |
