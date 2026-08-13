/**
 * Five generation tools wired into a pentagon: every fix travels the whole
 * perimeter. The red dot hops one edge at a time on a 6s cycle, so the route
 * reads as a chore rather than a flow.
 *
 * Ported from the Design Canvas source; see design-reference/.
 */

/** The five points of the pentagon, in the order the dot visits them. */
const TOOLS = [
  { name: "ChatGPT", cx: 400, cy: 85, logo: "logo-chatgpt", x: 360, y: 62, w: 80, h: 45, label: { x: 400, y: 30, anchor: "middle" } },
  { name: "Gemini", cx: 555, cy: 190, logo: "logo-gemini", x: 533, y: 168, w: 44, h: 44, label: { x: 612, y: 196, anchor: "start" } },
  { name: "Kling", cx: 495, cy: 360, logo: "logo-kling", x: 471, y: 336, w: 48, h: 48, label: { x: 495, y: 430, anchor: "middle" } },
  { name: "Canva", cx: 305, cy: 360, logo: "logo-canva", x: 283, y: 338, w: 44, h: 44, label: { x: 305, y: 430, anchor: "middle" } },
  { name: "Open art", cx: 245, cy: 190, logo: "logo-openart", x: 221, y: 177, w: 48, h: 27, label: { x: 188, y: 196, anchor: "end" } },
] as const;

/** The star route the dot runs — each leg lights 1.2s after the last. */
const LEGS = [
  { x1: 400, y1: 85, x2: 495, y2: 360 },
  { x1: 495, y1: 360, x2: 245, y2: 190 },
  { x1: 245, y1: 190, x2: 555, y2: 190 },
  { x1: 555, y1: 190, x2: 305, y2: 360 },
  { x1: 305, y1: 360, x2: 400, y2: 85 },
] as const;

export function ToolSprawlPentagon() {
  return (
    <svg viewBox="0 0 800 470" className="block h-auto w-full" aria-hidden="true">
      <g fill="none" stroke="#c3c9d4" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 14">
        {LEGS.map((leg, i) => (
          <line key={i} x1={leg.x1} y1={leg.y1} x2={leg.x2} y2={leg.y2} />
        ))}
      </g>
      <g fill="none" stroke="#f04e28" strokeWidth="5" strokeLinecap="round">
        {LEGS.map((leg, i) => (
          <line
            key={i}
            x1={leg.x1}
            y1={leg.y1}
            x2={leg.x2}
            y2={leg.y2}
            strokeDasharray="14 900"
            style={{ animation: "cosloopT 6s linear infinite", animationDelay: `${i * 1.2}s` }}
          />
        ))}
      </g>
      {TOOLS.map((tool) => (
        <g key={tool.name}>
          <circle cx={tool.cx} cy={tool.cy} r="40" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
          <image href={`/assets/${tool.logo}.png`} x={tool.x} y={tool.y} width={tool.w} height={tool.h} preserveAspectRatio="xMidYMid meet" />
          <text
            x={tool.label.x}
            y={tool.label.y}
            textAnchor={tool.label.anchor}
            style={{ fontWeight: "600", fontSize: "20px" }}
            fill="#374151"
          >
            {tool.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
