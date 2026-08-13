/**
 * The context a reel needs before anyone can produce it — the shared subject of
 * both section 01 diagrams.
 *
 * The dots on those paths are representational: they stand for context being
 * set, not for a literal inventory. So the names live out here in a legend and
 * the diagrams carry colour alone, which is what let the labels come off the
 * paths and the drawings breathe.
 *
 * COLOUR ORDER IS FIXED and validated as a categorical palette on the light
 * surface (magenta → amber → blue → purple): worst adjacent pair ΔE 18.2 under
 * deuteranopia, well clear of the 8 target. Re-run the check before reordering
 * or substituting — adjacent pairs are what the eye compares, and an earlier
 * darker amber collided with the flame red at ΔE 0.9. The amber sits below 3:1
 * against white, which is legal only because this legend labels every colour;
 * do not use these hues unlabelled.
 */

export type ContextStep = {
  key: string;
  label: string;
  color: string;
  glyph: React.ReactNode;
};

export const CONTEXT_STEPS: readonly ContextStep[] = [
  {
    key: "brand",
    label: "Brand",
    color: "#b5379b",
    glyph: (
      <>
        <path d="M4 4h9l7 7-9 9-7-7z" />
        <circle cx="8.5" cy="8.5" r="1.3" />
      </>
    ),
  },
  {
    key: "lighting",
    label: "Lighting",
    color: "#e3a900",
    glyph: (
      <>
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
      </>
    ),
  },
  {
    key: "tone",
    label: "Tone",
    color: "#2b8fb8",
    glyph: <path d="M3 5h18v12H9l-6 5z" />,
  },
  {
    key: "trends",
    label: "Trends",
    color: "#5829c7",
    glyph: (
      <>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </>
    ),
  },
];

/**
 * Reads the palette in path order, wrapping — so chip `i` of any row takes
 * `CONTEXT_STEPS[i % length]` and the two cards stay in step with each other.
 */
export function stepFor(i: number): ContextStep {
  return CONTEXT_STEPS[i % CONTEXT_STEPS.length];
}

/**
 * A step's glyph drawn inside a diagram, centred on (x, y) in that diagram's
 * units. Used on the first row of each card only: once is enough to tie the
 * colours to the legend, and repeating them down the serpentine's other rows
 * is exactly the clutter the legend was meant to remove.
 */
export function ChipGlyph({
  step,
  x,
  y,
  size = 18,
}: {
  step: ContextStep;
  x: number;
  y: number;
  size?: number;
}) {
  return (
    <g
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}
      fill="none"
      stroke={step.color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {step.glyph}
    </g>
  );
}

const CLUSTER_R = 5;
/**
 * Centres 7.5 apart at radius 5 — a 2.5-unit overlap, enough to read as one
 * stack while each hue stays its own disc. Tighter than this and the four
 * colours smear into a single mark at the size these captions render.
 */
const CLUSTER_PITCH = 7.5;
const CLUSTER_GAP = 9;
const CAPTION_SIZE = 15;
/** 15px Gilroy at 1px tracking; good enough to centre a caption on. */
const CAPTION_CHAR = 8.8;

/**
 * A row caption with the four context colours stacked beside it — the whole
 * context, in miniature, saying what got set.
 *
 * SVG cannot measure text, so the group is centred on an estimate. Discs carry
 * a white ring because they overlap: without it the cluster reads as one blob.
 */
export function RowCaption({
  x,
  y,
  text,
  color,
}: {
  /** Centre of the finished group, cluster and text together. */
  x: number;
  /** Text baseline. */
  y: number;
  text: string;
  color: string;
}) {
  const clusterWidth =
    (CONTEXT_STEPS.length - 1) * CLUSTER_PITCH + CLUSTER_R * 2;
  const width = clusterWidth + CLUSTER_GAP + text.length * CAPTION_CHAR;
  const left = x - width / 2;

  return (
    <g>
      {CONTEXT_STEPS.map((step, i) => (
        <circle
          key={step.key}
          cx={left + CLUSTER_R + i * CLUSTER_PITCH}
          cy={y - 5}
          r={CLUSTER_R}
          fill={step.color}
          stroke="#fff"
          strokeWidth="1.6"
        />
      ))}
      <text
        x={left + clusterWidth + CLUSTER_GAP}
        y={y}
        style={{ fontWeight: "500", fontSize: `${CAPTION_SIZE}px`, letterSpacing: "1px" }}
        fill={color}
      >
        {text}
      </text>
    </g>
  );
}

/**
 * The legend. Sits once above both cards rather than twice inside them: the
 * names are the same on either side, and repeating them was most of the
 * clutter the diagrams were carrying.
 */
export function ContextLegend() {
  return (
    <ul className="m-0 flex list-none flex-wrap items-center gap-x-7 gap-y-3 p-0">
      {CONTEXT_STEPS.map((step) => (
        <li key={step.key} className="inline-flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="size-[18px] shrink-0"
            fill="none"
            stroke={step.color}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {step.glyph}
          </svg>
          <span className="text-[15px] leading-none text-ink-soft">{step.label}</span>
        </li>
      ))}
    </ul>
  );
}
