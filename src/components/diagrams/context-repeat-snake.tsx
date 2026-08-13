/**
 * Re-setup as a serpentine: one dot walks three rows of the same five context
 * chips, and only reaches a finished reel at the end of each row. The chips
 * latch purple as it passes, so by the end of the cycle the viewer has watched
 * the identical setup happen three times over.
 *
 * Ported from the Design Canvas source; see design-reference/.
 */

/** The boustrophedon route — left to right, drop, right to left, drop, again. */
const SNAKE =
  "M110,60 H616 C672,60 672,120 616,120 H174 C118,120 118,180 174,180 H616 C672,180 672,240 616,240 H174 C118,240 118,300 174,300 H616";

/**
 * One finished reel per row, centred on that row's path. Box dimensions, type
 * sizes and tick radius are the same as `context-set-once` so the two cards in
 * section 01 read as one drawing split in half — see the viewBox note below.
 */
const REELS = [
  { label: "Reel 1", y: 36, flashDelay: "-2.28s", tick: "costickS1" },
  { label: "Reel 2", y: 156, flashDelay: "2.25s", tick: "costickS2" },
  { label: "Reel 3", y: 276, flashDelay: "6.77s", tick: "costickS3" },
] as const;

/** Five context chips per row, at the same five x positions every time. */
const CHIP_X = [150, 220, 290, 360, 430] as const;
const ROW_Y = [60, 180, 300] as const;

/** Only the first row is labelled — the point is that rows 2 and 3 repeat it. */
const CHIP_LABELS = [
  { x: 150, y: 44, text: "Brand" },
  { x: 220, y: 30, text: "Lighting" },
  { x: 290, y: 44, text: "Tone" },
  { x: 360, y: 30, text: "Compliance" },
  { x: 430, y: 44, text: "Trends" },
] as const;

export function ContextRepeatSnake() {
  return (
    // A 680-unit-wide viewBox, matching `context-set-once`. Both cards are the
    // same rendered width, so equal viewBox widths mean one SVG unit is one CSS
    // pixel in both — and a 14px label is the same 14px in either card. The x
    // origin centres this drawing's 519 units of content in that width.
    <svg viewBox="28 12 680 336" className="block h-auto w-full" aria-hidden="true">
      <path d={SNAKE} fill="none" stroke="#c3c9d4" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      <path
        d={SNAKE}
        fill="none"
        stroke="#6b7280"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray="14 2940"
        style={{ animation: "cossnake 12s linear infinite" }}
      />

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
            style={{ animation: "cosflashG 12s linear infinite", animationDelay: reel.flashDelay }}
          />
          <text x="557" y={reel.y + 30} textAnchor="middle" style={{ fontWeight: "500", fontSize: "18px" }} fill="#374151">
            {reel.label}
          </text>
          {/* Tick sits on the box's top-right corner, as in the other card. */}
          <g style={{ animation: `${reel.tick} 12s linear infinite` }}>
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

      {CHIP_LABELS.map((label) => (
        <text key={label.text} x={label.x} y={label.y} textAnchor="middle" style={{ fontWeight: "500", fontSize: "14px" }} fill="#9ca3af">
          {label.text}
        </text>
      ))}

      {ROW_Y.map((cy, row) =>
        CHIP_X.map((cx, col) => (
          <circle
            key={`${cy}-${cx}`}
            cx={cx}
            cy={cy}
            r="5.5"
            fill="#fff"
            stroke="#5829c7"
            strokeWidth="2"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              animation: `cosdKF${row * CHIP_X.length + col} 12s linear infinite`,
            }}
          />
        )),
      )}

      {/* Row caption, playing the part `INPUTS × 1` plays in the other card —
          so it takes that card's 15px / 1px-tracked treatment, in grey. */}
      <text x="290" y="208" textAnchor="middle" style={{ fontWeight: "500", fontSize: "15px", letterSpacing: "1px" }} fill="#9ca3af">Context set again</text>
      <text x="290" y="328" textAnchor="middle" style={{ fontWeight: "500", fontSize: "15px", letterSpacing: "1px" }} fill="#9ca3af">Context set again</text>
    </svg>
  );
}
