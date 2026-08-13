# Project notes

## Named effect: "signal-flow"
The signature animation used across the CreativeOS site and sales deck. When the user says "signal-flow" (or "the pulse effect"), apply this:

**Anatomy** — an SVG diagram where:
1. **Input rays**: thin curved bezier paths converging into a central node. Static track lines at low opacity; on top, comet dots = same path with `stroke-dasharray="12 200"` (dash gap ≥ path length), `stroke-linecap="round"`, stroke-width 4–4.5, animated with a keyframe whose `stroke-dashoffset` travel EXACTLY equals the dash period (e.g. 12+200=212 → `to{stroke-dashoffset:-212}`) so the loop never snaps. Stagger with `animation-delay`.
2. **Central node**: solid filled circle + static outer ring at ~35% accent opacity.
3. **Pulse**: every cycle the node emits an expanding ring — circle with `transform-box:fill-box;transform-origin:center`, keyframe scale .7→2.1 with opacity fade (see `cosring`).
4. **Output burst**: comet dots travel from node to target boxes at the SAME pace as input dots (~212px per 3.6s; on a 6s cycle travel over 0→60%), keyframe `cosburst`.
5. **Target flash**: destination rects light up for a moment when dots arrive (`cosflash`, timed to the burst arrival %, fill+stroke swap to accent).

**Color modes**
- Dark mode (bg `#140f2b`): tracks `rgba(255,255,255,.2–.45)`, comets/pulse/flash in yellow `#ffca2d` (`rgba(255,202,45,.9)`).
- Light mode (bg `#fcfcfd`/white): tracks `#c3c9d4` dashed (`stroke-dasharray="2 14"`), comets in purple `#5829c7`; feedback/error comets in red `#f04e28`. Flash accent uses purple at ~10–15% fill.

**Canonical keyframes** (in `CreativeOS Sales Deck.dc.html` helmet): `cosray`/`cosrayA`/`cosrayB` (continuous comets), `cosburst` (paced output burst), `cosflash` (target light-up), `cosring` (node pulse), `cosloopS`/`cosloopR`/`cosloopT` (sequenced one-dot-at-a-time hops in the light-mode diagrams).

**Reference implementations**: Sales Deck slide 5 "Product" (dark, full effect), slides 3–4 comparison cards (light mode, sequenced hops); site hero in `CreativeOS Home.dc.html` (dark converging rays).
