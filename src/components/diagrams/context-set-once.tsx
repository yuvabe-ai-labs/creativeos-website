import { ChipLabel, type ChipGlyphName } from "@/components/diagrams/chip-glyphs";
import { LABEL_ROW_Y } from "@/components/diagrams/context-repeat-snake";

/**
 * Context set once, then three reels off the same row.
 *
 * This is `context-repeat-snake` with the return trips removed, and that is
 * the point: same viewBox, same glyphs, same reel rows, same dot speed. The
 * only difference is that the dot runs the row once and fans out, instead of
 * walking it three times.
 *
 * It also runs on its own 3.5s loop rather than the serpentine's 12s one. There
 * is nothing left to draw after ~2.6s, so waiting for the other card to finish
 * would just be dead air — and looping three-to-four times per serpentine pass
 * says "a fraction of the time" better than any label could.
 *
 * Ported from the Design Canvas source; see design-reference/.
 */

/** The cycle this card loops on. The serpentine's is 12s. */
const CYCLE = "3.5s";
const CYCLE_S = 3.5;

/**
 * When the dot reaches each chip, as a percentage of the cycle. The row is 360
 * units and `cosrowP` covers it by 41.8%, so this is just distance scaled — the
 * same derivation the serpentine uses, at that card's speed.
 */
const CHIP_ARRIVAL = [4.64, 12.08, 19.51, 26.94, 34.37] as const;

/**
 * Six evenly spaced stops at a 64-unit pitch: five chips, then the junction.
 * The junction is part of the rhythm rather than an extra mark crowded onto
 * the end of the row.
 */
const CHIP_X = [150, 214, 278, 342, 406] as const;
const JUNCTION_X = 470;
const ROW_Y = 60;

/** Same glyphs and the same above/below alternation as the other card. */
const CHIP_LABELS = [
  { x: 150, glyph: "brand", side: "above", text: "Brand" },
  { x: 214, glyph: "lighting", side: "below", text: "Lighting" },
  { x: 278, glyph: "tone", side: "above", text: "Tone" },
  { x: 342, glyph: "compliance", side: "below", text: "Compliance" },
  { x: 406, glyph: "trends", side: "above", text: "Trends" },
] as const satisfies readonly {
  x: number;
  glyph: ChipGlyphName;
  side: "above" | "below";
  text: string;
}[];

/**
 * Reel rows sit at the same y as the other card's, so the eye can compare them
 * line for line. They sit further right than that card's, which is what leaves
 * 80 units between junction and box for the fan to curve in.
 *
 * `route` carries the dot from the junction; the track under it is the same
 * shape. Both curves use horizontal tangents at each end — the house style for
 * a branch in these diagrams — and their control points sit at different x
 * (516 vs 498) so the two arcs separate immediately instead of running as one
 * thick line down to Reel 2 before splitting.
 */
const REELS = [
  { label: "Reel 1", y: 36, route: "M470,60 H550", comet: "cosfanA" },
  { label: "Reel 2", y: 156, route: "M470,60 C516,60 516,180 550,180", comet: "cosfanB" },
  { label: "Reel 3", y: 276, route: "M470,60 C498,60 498,300 550,300", comet: "cosfanC" },
] as const;

export function ContextSetOnce() {
  return (
    <svg viewBox="91 8 600 348" className="block h-auto w-full" aria-hidden="true">
      {/* Tracks: the row, then the three routes out of the junction. */}
      <g fill="none" stroke="#c3c9d4" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round">
        <path d="M110,60 H470" />
        {REELS.map((reel) => (
          <path key={reel.label} d={reel.route} />
        ))}
      </g>

      {/* One pass along the row… */}
      <path
        d="M110,60 H470"
        fill="none"
        stroke="#5829c7"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="14 900"
        style={{ animation: `cosrowP ${CYCLE} linear infinite` }}
      />
      {/* …then all three branches at once. */}
      {REELS.map((reel) => (
        <path
          key={reel.label}
          d={reel.route}
          fill="none"
          stroke="#5829c7"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="14 900"
          style={{ animation: `${reel.comet} ${CYCLE} linear infinite` }}
        />
      ))}

      {CHIP_LABELS.map((label) => (
        <ChipLabel
          key={label.text}
          name={label.glyph}
          text={label.text}
          x={label.x}
          y={LABEL_ROW_Y[label.side]}
          color="#6b7280"
        />
      ))}
      {CHIP_X.map((cx, i) => (
        <g key={cx}>
          {/* Shared pulse keyframe, placed on this chip's moment by a negative
              delay of (cycle - arrival). */}
          <circle
            cx={cx}
            cy={ROW_Y}
            r="5.5"
            fill="none"
            stroke="#5829c7"
            strokeWidth="2"
            opacity={0}
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              animation: `cosChipPulseP ${CYCLE} linear infinite`,
              animationDelay: `${-(CYCLE_S * (1 - CHIP_ARRIVAL[i] / 100)).toFixed(3)}s`,
            }}
          />
          <circle
            cx={cx}
            cy={ROW_Y}
            r="5.5"
            fill="#fff"
            stroke="#5829c7"
            strokeWidth="2"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              animation: `cosdKP${i} ${CYCLE} linear infinite`,
            }}
          />
        </g>
      ))}

      {/* The junction — context assembled, pulsing as the row's dot lands. Kept
          near chip scale so it reads as a branch, not a second subject. */}
      <circle cx={JUNCTION_X} cy={ROW_Y} r="7" fill="#5829c7" />
      <circle cx={JUNCTION_X} cy={ROW_Y} r="12" fill="none" stroke="rgba(88,41,199,.35)" strokeWidth="2" />
      <circle
        cx={JUNCTION_X}
        cy={ROW_Y}
        r="12"
        fill="none"
        stroke="rgba(88,41,199,.5)"
        strokeWidth="2"
        style={{ transformBox: "fill-box", transformOrigin: "center", animation: `cosringP ${CYCLE} linear infinite` }}
      />

      {/* Mirrors "Context set again" on the other card, in the product's colour.
          Clears the below-path labels, which reach y=99. */}
      <text x="290" y="140" textAnchor="middle" style={{ fontWeight: "500", fontSize: "15px", letterSpacing: "1px" }} fill="#9688c0">Context set once</text>

      {REELS.map((reel) => (
        <g key={reel.label}>
          <rect
            x="550"
            y={reel.y}
            width="118"
            height="48"
            rx="10"
            fill="rgba(88,41,199,.04)"
            stroke="#c3c9d4"
            strokeWidth="2"
            style={{ animation: `cosflashP ${CYCLE} linear infinite` }}
          />
          <text x="609" y={reel.y + 30} textAnchor="middle" style={{ fontWeight: "500", fontSize: "18px" }} fill="#374151">
            {reel.label}
          </text>
          <g style={{ animation: `costickP ${CYCLE} linear infinite` }}>
            <circle cx="668" cy={reel.y} r="11" fill="#16a34a" />
            <path
              d={`M662.5,${reel.y} L666.5,${reel.y + 4} L674,${reel.y - 4.5}`}
              fill="none"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      ))}
    </svg>
  );
}
