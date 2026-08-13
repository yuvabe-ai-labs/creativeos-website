/**
 * The five context inputs, as 24-unit line glyphs plus their labels.
 *
 * Both section 01 cards label the same five chips, so the drawings share one
 * set. The glyphs are stroke-only on a 24x24 grid — the lucide convention the
 * rest of the site uses — and scale down in place rather than at a fixed pixel
 * size, so they stay in the diagram's coordinate system and shrink with it.
 */

export type ChipGlyphName = "brand" | "lighting" | "tone" | "compliance" | "trends";

const GLYPHS: Record<ChipGlyphName, React.ReactNode> = {
  brand: (
    <>
      <path d="M4 4h9l7 7-9 9-7-7z" />
      <circle cx="8.5" cy="8.5" r="1.3" />
    </>
  ),
  lighting: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </>
  ),
  tone: <path d="M3 5h18v12H9l-6 5z" />,
  compliance: (
    <>
      <path d="M12 2.5 20 6v6c0 5-8 8-8 8s-8-3-8-8V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-4.5" />
    </>
  ),
  trends: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
};

const GLYPH_SIZE = 22;
const GLYPH_GAP = 6;
const FONT_SIZE = 17;
/** Gilroy Medium averages ~0.52em per character; close enough to centre on. */
const CHAR_WIDTH = FONT_SIZE * 0.52;
/** Baseline offset that puts the text's optical centre on the glyph's. */
const BASELINE = 6;

/** Draws `name` centred on (x, y) at `size` diagram units. */
function ChipGlyph({
  name,
  x,
  y,
  color,
  size = GLYPH_SIZE,
}: {
  name: ChipGlyphName;
  x: number;
  y: number;
  color: string;
  size?: number;
}) {
  return (
    <g
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {GLYPHS[name]}
    </g>
  );
}

/**
 * Glyph and label on one line, together centred on `x`.
 *
 * Stacking the two costs 40 units of height, which the serpentine card cannot
 * spare below its path — its return leg runs 55 units under the chips. Inline
 * costs 22, so both halves of the above/below alternation get the same
 * clearance and the type can grow. SVG cannot measure text, so the group is
 * centred on an estimate; a few units of drift is invisible at this size.
 */
export function ChipLabel({
  name,
  text,
  x,
  y,
  color,
}: {
  name: ChipGlyphName;
  text: string;
  x: number;
  /** Vertical centre of the row. */
  y: number;
  color: string;
}) {
  const width = GLYPH_SIZE + GLYPH_GAP + text.length * CHAR_WIDTH;
  const left = x - width / 2;

  return (
    <g>
      <ChipGlyph name={name} x={left + GLYPH_SIZE / 2} y={y} color={color} />
      <text
        x={left + GLYPH_SIZE + GLYPH_GAP}
        y={y + BASELINE}
        style={{ fontWeight: "500", fontSize: `${FONT_SIZE}px` }}
        fill={color}
      >
        {text}
      </text>
    </g>
  );
}
