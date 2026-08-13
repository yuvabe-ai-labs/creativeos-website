import { ChipLabel, type ChipGlyphName } from "@/components/diagrams/chip-glyphs";

/**
 * Re-setup as a serpentine: one dot walks three rows of the same five context
 * chips, and only reaches a finished reel at the end of each row.
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
 */
const CHIP_ARRIVAL = [
  1.35, 3.72, 6.09, 8.46, 10.83,
  37.93, 41.43, 43.8, 46.17, 48.54,
  75.63, 79.13, 81.5, 83.87, 86.24,
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

/** The same five x on every row — the repetition is the whole point. */
const CHIP_X = [150, 220, 290, 360, 430] as const;
const ROW_Y = [60, 180, 300] as const;

/**
 * Only the first row is labelled — the point is that rows 2 and 3 repeat it.
 *
 * "Compliance" is wider than the chip pitch, so the labels cannot all sit on
 * one line. Alternating them above and below the path solves that with room to
 * spare — neighbours are never on the same side, so each has two pitches of
 * width — and leaves room for a glyph on each.
 */
const CHIP_LABELS = [
  { x: 150, glyph: "brand", side: "above", text: "Brand" },
  { x: 220, glyph: "lighting", side: "below", text: "Lighting" },
  { x: 290, glyph: "tone", side: "above", text: "Tone" },
  { x: 360, glyph: "compliance", side: "below", text: "Compliance" },
  { x: 430, glyph: "trends", side: "above", text: "Trends" },
] as const satisfies readonly {
  x: number;
  glyph: ChipGlyphName;
  side: "above" | "below";
  text: string;
}[];

/**
 * Vertical centre of each label row, either side of the path at y=60. Both sit
 * ~11 units clear of the chips, and the lower one clears the return leg at
 * y=120 by 21.
 */
export const LABEL_ROW_Y = { above: 32, below: 88 } as const;

export function ContextRepeatSnake() {
  return (
    // A 600-unit-wide viewBox, matching `context-set-once`. Equal viewBox widths
    // in equal columns mean one SVG unit is the same size in both, so a 17px
    // label is the same 17px in either. 600 rather than a looser frame because
    // the tighter the crop, the larger everything renders in the same column —
    // which is most of what makes these labels readable.
    <svg viewBox="91 8 600 348" className="block h-auto w-full" aria-hidden="true">
      <g fill="none" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round">
        {CONNECTOR_LEGS.map((d) => (
          <path key={d} d={d} stroke="#e5e7eb" />
        ))}
        {WORK_LEGS.map((d) => (
          <path key={d} d={d} stroke="#c3c9d4" />
        ))}
      </g>
      <path
        d={SNAKE}
        fill="none"
        stroke="#6b7280"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="14 2940"
        style={{ animation: `cossnake ${CYCLE} linear infinite` }}
      />

      {CHIP_LABELS.map((label) => (
        <ChipLabel
          key={label.text}
          name={label.glyph}
          text={label.text}
          x={label.x}
          y={LABEL_ROW_Y[label.side]}
          color="#9ca3af"
        />
      ))}

      {ROW_Y.map((cy, row) =>
        CHIP_X.map((cx, col) => {
          const i = row * CHIP_X.length + col;
          return (
            <g key={`${cy}-${cx}`}>
              {/* The pulse rides a shared keyframe, placed on this chip's moment
                  by a negative delay of (cycle - arrival). */}
              <circle
                cx={cx}
                cy={cy}
                r="5.5"
                fill="none"
                stroke="#5829c7"
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
                stroke="#5829c7"
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

      {/* Row caption, playing the part `Context set once` plays in the other
          card — same 15px / 1px-tracked treatment, in grey. */}
      <text x="290" y="208" textAnchor="middle" style={{ fontWeight: "500", fontSize: "15px", letterSpacing: "1px" }} fill="#9ca3af">Context set again</text>
      <text x="290" y="328" textAnchor="middle" style={{ fontWeight: "500", fontSize: "15px", letterSpacing: "1px" }} fill="#9ca3af">Context set again</text>
    </svg>
  );
}
