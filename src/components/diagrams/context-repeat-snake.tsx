import {
  CONTEXT_STEPS,
  ChipHead,
  RowCaption,
  stepFor,
} from "@/components/diagrams/context-steps";

/**
 * Re-setup as a serpentine: one dot walks three rows of the same four context
 * chips, and only reaches a finished reel at the end of each row. The chips
 * are named in the legend above, not on the path — see `context-steps`.
 *
 * The return legs between rows are empty by design — that stretch where the dot
 * is moving and nothing happens is the re-setup cost, stated as time. The track
 * under them is drawn lighter than the chip runs so they read as travel rather
 * than work.
 *
 * Ported from the Design Canvas source; see design-reference/.
 */

/** The cycle this card loops on. The other card's is 3.5s. */
const CYCLE = "12s";
const CYCLE_S = 12;

/**
 * When the dot reaches each chip, as a percentage of the cycle — row by row,
 * left to right. Derived from distance along the path: the straights are 506
 * and 442 units, each U-turn ~115, and the dot covers 2954 units per cycle.
 *
 * These drive two things that have to agree: the per-chip `cosdKF*` latch, and
 * the negative delay that places the shared pulse on the same instant.
 *
 * The first entry of rows 2 and 3 is the U-turn's leftmost extent — that chip
 * sits at x=160 while the row itself starts at x=174, so the dot sweeps past it
 * inside the turn rather than along the straight.
 */
const CHIP_ARRIVAL = [
  1.693, 4.739, 7.786, 10.833,
  37.925, 42.443, 45.489, 48.536,
  75.629, 80.146, 83.193, 86.239,
] as const;

/** The boustrophedon route — left to right, U-turn, right to left, and again. */
const SNAKE =
  "M110,60 H616 C672,60 672,120 616,120 H174 C118,120 118,180 174,180 H616 C672,180 672,240 616,240 H174 C118,240 118,300 174,300 H616";

/** The stretches where the dot is passing chips and delivering a reel. */
const WORK_LEGS = ["M110,60 H616", "M174,180 H616", "M174,300 H616"] as const;

/**
 * The two return legs, carrying the dot all the way back to the left edge to
 * start over. Drawn lighter, because nothing happens along them — at full
 * weight they read as part of the work rather than the price of repeating it.
 */
const CONNECTOR_LEGS = [
  "M616,60 C672,60 672,120 616,120 H174 C118,120 118,180 174,180",
  "M616,180 C672,180 672,240 616,240 H174 C118,240 118,300 174,300",
] as const;

/**
 * One finished reel per row, centred on that row's path. Box dimensions, type
 * sizes and tick radius match `context-set-once` so the two cards in section 01
 * read as one drawing split in half.
 */
const REELS = [
  { label: "Reel 1", y: 36, flashDelay: "-2.28s", tick: "costickS1" },
  { label: "Reel 2", y: 156, flashDelay: "2.25s", tick: "costickS2" },
  { label: "Reel 3", y: 276, flashDelay: "6.77s", tick: "costickS3" },
] as const;

/**
 * The same four x on every row — the repetition is the whole point.
 *
 * Four rather than five: the dots are representational, standing for context
 * being set rather than itemising it, so a fifth bought clutter and no meaning.
 */
const CHIP_X = [160, 250, 340, 430] as const;
const ROW_Y = [60, 180, 300] as const;

/**
 * The trail, split leg by leg and interleaved in the order the dot travels
 * them. Rows draw in the context gradient, returns in grey.
 *
 * That grey is the argument: the dot crosses a return leg and gains nothing,
 * so the next row has to rebuild its blend from the first chip. Splitting the
 * trail per leg is what makes that expressible — a single path can only be one
 * colour treatment along its whole length.
 */
const TRAIL_LEGS = [
  { d: WORK_LEGS[0], work: true, anim: "cosTrailRow1" },
  { d: CONNECTOR_LEGS[0], work: false, anim: "cosTrailRet1" },
  { d: WORK_LEGS[1], work: true, anim: "cosTrailRow2" },
  { d: CONNECTOR_LEGS[1], work: false, anim: "cosTrailRet2" },
  { d: WORK_LEGS[2], work: true, anim: "cosTrailRow3" },
] as const;

export function ContextRepeatSnake() {
  return (
    // A 600-unit-wide viewBox, matching `context-set-once`. Equal viewBox
    // widths in equal columns mean one SVG unit is the same size in both, so
    // the two drawings share a scale without either being measured against the
    // other. The top of the box holds the first row's labels and glyphs.
    <svg viewBox="91 0 600 342" className="block h-auto w-full" aria-hidden="true">
      <g fill="none" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round">
        {CONNECTOR_LEGS.map((d) => (
          <path key={d} d={d} stroke="#e5e7eb" />
        ))}
        {WORK_LEGS.map((d) => (
          <path key={d} d={d} stroke="#c3c9d4" />
        ))}
      </g>
      <defs>
        {/* Stops land on the chip x positions, so the trail is that chip's hue
            as it passes and blends on the way to the next — context mixing as
            it is collected. Rows 2 and 3 span 174-616, a subset of this. */}
        <linearGradient id="cosCtxRow" gradientUnits="userSpaceOnUse" x1="110" y1="0" x2="616" y2="0">
          {CONTEXT_STEPS.map((step, i) => (
            <stop
              key={step.key}
              offset={`${(((CHIP_X[i] ?? 430) - 110) / 506) * 100}%`}
              stopColor={step.color}
            />
          ))}
        </linearGradient>
      </defs>

      {/* The trail the dot leaves behind, one path per leg. `pathLength`
          renormalises each to 100 dash units so the reveal keyframes are
          windows in time rather than lengths.

          Each leg persists once drawn and clears only when the loop restarts.
          Rows carry the context gradient; the return legs are grey — the dot
          travels them and picks up nothing, so the colour is lost between
          reels and the next row starts its blend again from the first chip. */}
      {TRAIL_LEGS.map((legTrail) => (
        <path
          key={legTrail.anim}
          d={legTrail.d}
          pathLength="100"
          fill="none"
          stroke={legTrail.work ? "url(#cosCtxRow)" : "#9ca3af"}
          strokeWidth={legTrail.work ? 3.5 : 2.5}
          strokeLinecap="round"
          strokeDasharray="100 100"
          opacity={0}
          style={{ animation: `${legTrail.anim} ${CYCLE} linear infinite` }}
        />
      ))}
      <path
        d={SNAKE}
        fill="none"
        stroke="#6b7280"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="14 2940"
        style={{ animation: `cossnake ${CYCLE} linear infinite` }}
      />

      {ROW_Y.map((cy, row) =>
        CHIP_X.map((cx, col) => {
          const i = row * CHIP_X.length + col;
          return (
            <g key={`${cy}-${cx}`}>
              {/* Only the first row is labelled — rows 2 and 3 are the same
                  four steps again, and repeating the names is the clutter. */}
              {row === 0 ? <ChipHead step={stepFor(col)} x={cx} /> : null}
              {/* The pulse rides a shared keyframe, placed on this chip's moment
                  by a negative delay of (cycle - arrival). */}
              <circle
                cx={cx}
                cy={cy}
                r="5.5"
                fill="none"
                stroke={stepFor(col).color}
                strokeWidth="2"
                opacity={0}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: `cosChipPulse ${CYCLE} linear infinite`,
                  animationDelay: `${-(CYCLE_S * (1 - CHIP_ARRIVAL[i] / 100)).toFixed(3)}s`,
                }}
              />
              <circle
                cx={cx}
                cy={cy}
                r="5.5"
                fill="#fff"
                stroke={stepFor(col).color}
                strokeWidth="2"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: `cosdKF${i} ${CYCLE} linear infinite`,
                }}
              />
            </g>
          );
        }),
      )}

      {REELS.map((reel) => (
        <g key={reel.label}>
          {/* Opaque base under the flashing rect so the path never shows through. */}
          <rect x="498" y={reel.y} width="118" height="48" rx="10" fill="#fff" />
          <rect
            x="498"
            y={reel.y}
            width="118"
            height="48"
            rx="10"
            fill="#fcfcfd"
            stroke="#c3c9d4"
            strokeWidth="2"
            style={{ animation: `cosflashG ${CYCLE} linear infinite`, animationDelay: reel.flashDelay }}
          />
          <text x="557" y={reel.y + 30} textAnchor="middle" style={{ fontWeight: "500", fontSize: "18px" }} fill="#374151">
            {reel.label}
          </text>
          {/* Tick sits on the box's top-right corner, as in the other card. */}
          <g style={{ animation: `${reel.tick} ${CYCLE} linear infinite` }}>
            <circle cx="616" cy={reel.y} r="11" fill="#16a34a" />
            <path
              d={`M610.5,${reel.y} L614.5,${reel.y + 4} L622,${reel.y - 4.5}`}
              fill="none"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      ))}

      {/* Row captions, each 32 units under its own path, with the four context
          colours stacked beside them. Reading down they are the argument: set
          once, then again, then again — where the card opposite stops after
          the first. */}
      <RowCaption x={290} y={92} text="Context set once" color="#9ca3af" />
      <RowCaption x={290} y={212} text="Context set again" color="#9ca3af" />
      <RowCaption x={290} y={332} text="Context set again" color="#9ca3af" />
    </svg>
  );
}
