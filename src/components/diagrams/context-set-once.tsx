import {
  CONTEXT_STEPS,
  ChipHead,
  RowCaption,
  stepFor,
} from "@/components/diagrams/context-steps";

/**
 * Context set once, then three reels off the same row.
 *
 * This is `context-repeat-snake` with the return trips removed, and that is
 * the point: same viewBox, same chip colours, same reel rows, same dot speed. The
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
const CHIP_ARRIVAL = [4.644, 13.933, 23.222, 32.511] as const;

/**
 * Five evenly spaced stops at an 80-unit pitch: four chips, then the junction.
 * The junction is part of the rhythm rather than an extra mark crowded onto
 * the end of the row.
 */
const CHIP_X = [150, 230, 310, 390] as const;
const JUNCTION_X = 470;
const ROW_Y = 60;

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
    <svg viewBox="91 0 600 342" className="block h-auto w-full" aria-hidden="true">
      {/* Tracks: the row, then the three routes out of the junction. */}
      <g fill="none" stroke="#c3c9d4" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round">
        <path d="M110,60 H470" />
        {REELS.map((reel) => (
          <path key={reel.label} d={reel.route} />
        ))}
      </g>

      <defs>
        {/* Same device as the serpentine's: stops on the chip positions, so the
            row draws in each colour as it is collected and blends between. */}
        <linearGradient id="cosCtxRowP" gradientUnits="userSpaceOnUse" x1="110" y1="0" x2="470" y2="0">
          {CONTEXT_STEPS.map((step, i) => (
            <stop
              key={step.key}
              offset={`${(((CHIP_X[i] ?? 390) - 110) / 360) * 100}%`}
              stopColor={step.color}
            />
          ))}
        </linearGradient>
      </defs>

      {/* Trails, drawn in behind the dots. `pathLength` renormalises each to
          100 dash units, so one keyframe per phase covers the row and all
          three arms despite their different lengths.

          Like the serpentine's, these persist until the loop restarts. Unlike
          it, there is no grey stretch anywhere: the row keeps its blend all
          the way to the junction and the arms carry it out. */}
      <path
        d="M110,60 H470"
        pathLength="100"
        fill="none"
        stroke="url(#cosCtxRowP)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="100 100"
        opacity={0}
        style={{ animation: `cosrowTrail ${CYCLE} linear infinite` }}
      />
      {REELS.map((reel) => (
        <path
          key={`${reel.label}-trail`}
          d={reel.route}
          pathLength="100"
          fill="none"
          stroke="#5829c7"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="100 100"
          opacity={0}
          style={{ animation: `cosfanTrail ${CYCLE} linear infinite` }}
        />
      ))}

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

      {CHIP_X.map((cx, i) => (
        <g key={cx}>
          <ChipHead step={stepFor(i)} x={cx} />
          {/* Shared pulse keyframe, placed on this chip's moment by a negative
              delay of (cycle - arrival). */}
          <circle
            cx={cx}
            cy={ROW_Y}
            r="5.5"
            fill="none"
            stroke={stepFor(i).color}
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
            stroke={stepFor(i).color}
            strokeWidth="2"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              animation: `cosdKP${i} ${CYCLE} linear infinite`,
            }}
          />
        </g>
      ))}

      {/* The junction — context assembled once, and the moment the whole card
          is about. Deliberately larger than the chips: this is the product
          idea, not another input. */}
      <circle cx={JUNCTION_X} cy={ROW_Y} r="8.5" fill="#5829c7" />
      <circle cx={JUNCTION_X} cy={ROW_Y} r="15" fill="none" stroke="rgba(88,41,199,.35)" strokeWidth="2" />
      <circle
        cx={JUNCTION_X}
        cy={ROW_Y}
        r="15"
        fill="none"
        stroke="rgba(88,41,199,.5)"
        strokeWidth="2"
        style={{ transformBox: "fill-box", transformOrigin: "center", animation: `cosringP ${CYCLE} linear infinite` }}
      />

      {/* Sits 32 units under the path, level with the other card's first-row
          caption — the two say "Context set once" at the same height, and only
          that card goes on to say it twice more. */}
      <RowCaption x={290} y={92} text="Context set once" color="#9688c0" />

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
