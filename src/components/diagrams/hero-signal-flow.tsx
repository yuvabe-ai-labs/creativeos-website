/**
 * Everything the agency knows converges into every asset.
 *
 * Two drawings of one idea. `HeroSignalFlowPortrait` is the canonical one — it
 * is what most readers see. `HeroSignalFlow` is the wide enhancement, shown at
 * the `hero:` breakpoint (1081px) and up.
 *
 * See docs/diagram-system.md §2.1.
 */

/**
 * Five inputs, split into two columns that converge from either side.
 *
 * Was seven. "References" said the same thing as "Past generations" and
 * "Corrections" the same as "Review decisions", so the list read longer than
 * it was. Five distinct ones fan wider and carry larger type in the same box.
 */
const LEFT_INPUTS = [
  { label: "Brand context", y: 34 },
  { label: "Market trend", y: 92 },
  { label: "Review decisions", y: 150 },
];

const RIGHT_INPUTS = [
  { label: "Tone + claims", y: 56 },
  { label: "Past generations", y: 128 },
];

const NODE = { x: 195, y: 336 };

/** x of the anchor dots each column's rays leave from. */
const LEFT_DOT = 128;
const RIGHT_DOT = 262;

/**
 * Bezier from an anchor dot down into the node.
 *
 * The first control point carries the ray outward before it turns, which is
 * what opens the fan; holding the second control point away from the node's
 * vertical keeps the rays apart until late, so they read as many separate
 * signals rather than one rope.
 */
function rayFrom(x: number, y: number) {
  const outward = x < NODE.x ? -18 : 18;
  const midY = y + (NODE.y - y) * 0.55;
  const midX = x + (NODE.x - x) * 0.35;
  return `M${x},${y} C${x + outward},${y + 24} ${midX},${midY} ${NODE.x},${NODE.y}`;
}

/**
 * Portrait signal flow — the canonical drawing.
 *
 * The wide version fans rays in from the left; here they converge from both
 * sides and downward, which is the direction the reader is already scrolling.
 * Only two of the five rays carry a comet: at this size simultaneous dots on
 * every ray read as flicker rather than flow (§1.9).
 */
export function HeroSignalFlowPortrait() {
  return (
    <svg
      viewBox="-35 0 460 460"
      className="block h-auto w-full"
      aria-hidden="true"
    >
      {/* One depth layer only. Enough to imply volume, not enough to fog the labels. */}
      {[28, 64, 100, 136, 172].map((y, i) => (
        <path
          key={`bg-l-${i}`}
          d={rayFrom(LEFT_DOT - 16, y)}
          fill="none"
          stroke="rgba(75,85,99,.10)"
          strokeWidth="1"
        />
      ))}
      {[28, 64, 100, 136].map((y, i) => (
        <path
          key={`bg-r-${i}`}
          d={rayFrom(RIGHT_DOT + 16, y)}
          fill="none"
          stroke="rgba(75,85,99,.10)"
          strokeWidth="1"
        />
      ))}

      {/* Foreground rays. Comets on the first, third and fifth only. */}
      {[...LEFT_INPUTS, ...RIGHT_INPUTS].map((input, i) => {
        const isLeft = i < LEFT_INPUTS.length;
        const d = rayFrom(isLeft ? LEFT_DOT : RIGHT_DOT, input.y);
        const comet = i % 3 === 0;
        return (
          <g key={input.label}>
            <path d={d} fill="none" stroke="url(#cosHeroRay)" strokeWidth="1.4" />
            {comet ? (
              <path
                d={d}
                fill="none"
                stroke="rgba(88,41,199,.8)"
                strokeWidth="1.6"
                strokeDasharray="6 300"
                style={{
                  animation: "cosraytall 3.6s linear infinite",
                  animationDelay: `${(i / 3) * 1.2}s`,
                }}
              />
            ) : null}
          </g>
        );
      })}

      {/* Labels, each with its anchor dot on the ray it names. */}
      {LEFT_INPUTS.map((input) => (
        <g key={input.label}>
          <text
            x={LEFT_DOT - 12}
            y={input.y + 4}
            textAnchor="end"
            style={{ fontWeight: "500", fontSize: "16px" }}
            fill="#6b7280"
          >
            {input.label}
          </text>
          <circle cx={LEFT_DOT} cy={input.y} r="3" fill="#9ca3af" />
        </g>
      ))}
      {RIGHT_INPUTS.map((input) => (
        <g key={input.label}>
          <text
            x={RIGHT_DOT + 12}
            y={input.y + 4}
            style={{ fontWeight: "500", fontSize: "16px" }}
            fill="#6b7280"
          >
            {input.label}
          </text>
          <circle cx={RIGHT_DOT} cy={input.y} r="3" fill="#9ca3af" />
        </g>
      ))}

      {/* The node. Arrow points down, because here the flow travels down. */}
      <circle cx={NODE.x} cy={NODE.y} r="18" fill="url(#cosHeroNodeP)" />
      <circle
        cx={NODE.x}
        cy={NODE.y}
        r="25"
        fill="none"
        stroke="rgba(88,41,199,.3)"
        strokeWidth="1.5"
        style={{
          animation: "cosglow 3s ease-in-out infinite",
          transformOrigin: `${NODE.x}px ${NODE.y}px`,
        }}
      />
      <path
        d={`M${NODE.x},${NODE.y - 8} L${NODE.x},${NODE.y + 8} M${NODE.x - 7},${NODE.y + 1} L${NODE.x},${NODE.y + 8} L${NODE.x + 7},${NODE.y + 1}`}
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Output beam, straight down into the pulsing result. */}
      <line
        x1={NODE.x}
        y1="362"
        x2={NODE.x}
        y2="414"
        stroke="#c3c9d4"
        strokeWidth="1.6"
      />
      <line
        x1={NODE.x}
        y1="362"
        x2={NODE.x}
        y2="414"
        stroke="url(#cosHeroBeamP)"
        strokeWidth="2"
        strokeDasharray="8 82"
        style={{ animation: "cosbeam 3.2s linear infinite" }}
      />
      <circle
        cx={NODE.x}
        cy="430"
        r="13"
        fill="none"
        stroke="rgba(88,41,199,.45)"
        strokeWidth="0.5"
        style={{
          animation: "cosripplesm 3.2s ease-out infinite",
          animationDelay: "1.85s",
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      />
      <circle
        cx={NODE.x}
        cy="430"
        r="13"
        fill="url(#cosHeroNodeP)"
        style={{
          animation: "cospulse 3.2s ease-out infinite",
          animationDelay: "1.85s",
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      />
    </svg>
  );
}

/**
 * Wide signal flow — the enhancement.
 *
 * The extra width buys three depth layers of rays, which read as "more than you
 * can count". The staggered `animation-delay` per comet is what makes it read as
 * many signals arriving into one asset; do not normalise the delays.
 *
 * Ported verbatim from the Design Canvas source; see design-reference/.
 */
export function HeroSignalFlow() {
  return (
    <svg viewBox="-114 0 674 560" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}>
    <defs>
      {/* Same gradient idea as the portrait, on this drawing's axis: the fan
          runs left to right, so the ramp does too. */}
      <linearGradient id="cosHeroRay" gradientUnits="userSpaceOnUse" x1="83" y1="0" x2="332" y2="0">
        <stop offset="0%" stopColor="#a99cd0" />
        <stop offset="100%" stopColor="#5829c7" />
      </linearGradient>
      <linearGradient id="cosHeroNode" gradientUnits="userSpaceOnUse" x1="310" y1="258" x2="354" y2="302">
        <stop offset="0%" stopColor="#7343e3" />
        <stop offset="100%" stopColor="#4c24ab" />
      </linearGradient>
      <linearGradient id="cosHeroBeam" gradientUnits="userSpaceOnUse" x1="362" y1="0" x2="504" y2="0">
        <stop offset="0%" stopColor="#9688c0" />
        <stop offset="100%" stopColor="#5829c7" />
      </linearGradient>
    </defs>
    <text x="55" y="68" textAnchor="end" style={{ fontWeight: "500", fontSize: "20px" }} fill="#6b7280">Brand context</text>
    <circle cx="73" cy="64" r="3.5" fill="#9ca3af" />
    <text x="55" y="176" textAnchor="end" style={{ fontWeight: "500", fontSize: "20px" }} fill="#6b7280">Tone + claims</text>
    <circle cx="73" cy="172" r="3.5" fill="#9ca3af" />
    <text x="55" y="284" textAnchor="end" style={{ fontWeight: "500", fontSize: "20px" }} fill="#6b7280">Market trend</text>
    <circle cx="73" cy="280" r="3.5" fill="#9ca3af" />
    <text x="55" y="392" textAnchor="end" style={{ fontWeight: "500", fontSize: "20px" }} fill="#6b7280">Past generations</text>
    <circle cx="73" cy="388" r="3.5" fill="#9ca3af" />
    <text x="55" y="500" textAnchor="end" style={{ fontWeight: "500", fontSize: "20px" }} fill="#6b7280">Review decisions</text>
    <circle cx="73" cy="496" r="3.5" fill="#9ca3af" />
    
    <circle cx="300" cy="255" r="1.6" fill="rgba(75,85,99,.14)" />
    <path d="M101,38 C196,38 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,38 C196,38 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray224 6.2s linear infinite", animationDelay: "3.17s" }} />
    <path d="M101,50 C196,50 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,68 C196,68 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,90 C196,90 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,112 C196,112 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,112 C196,112 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray224 6.2s linear infinite", animationDelay: "6.65s" }} />
    <path d="M101,134 C196,134 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,156 C196,156 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,178 C196,178 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,200 C196,200 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,200 C196,200 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray224 6.2s linear infinite", animationDelay: "10.13s" }} />
    <path d="M101,222 C196,222 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,244 C196,244 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,266 C196,266 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,288 C196,288 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,288 C196,288 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray224 6.2s linear infinite", animationDelay: "13.61s" }} />
    <path d="M101,310 C196,310 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,332 C196,332 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,354 C196,354 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,376 C196,376 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,376 C196,376 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray224 6.2s linear infinite", animationDelay: "17.09s" }} />
    <path d="M101,398 C196,398 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,420 C196,420 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,442 C196,442 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,464 C196,464 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,464 C196,464 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray224 6.2s linear infinite", animationDelay: "20.57s" }} />
    <path d="M101,486 C196,486 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,508 C196,508 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,524 C196,524 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M95,44 C190,44 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,44 C190,44 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray205 5.4s linear infinite", animationDelay: "1.72s" }} />
    <path d="M95,62 C190,62 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,84 C190,84 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,106 C190,106 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,106 C190,106 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray205 5.4s linear infinite", animationDelay: "3.58s" }} />
    <path d="M95,128 C190,128 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,150 C190,150 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,172 C190,172 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,172 C190,172 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray205 5.4s linear infinite", animationDelay: "5.44s" }} />
    <path d="M95,194 C190,194 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,216 C190,216 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,238 C190,238 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,238 C190,238 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray205 5.4s linear infinite", animationDelay: "7.30s" }} />
    <path d="M95,260 C190,260 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,296 C190,296 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,318 C190,318 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,318 C190,318 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray205 5.4s linear infinite", animationDelay: "9.16s" }} />
    <path d="M95,340 C190,340 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,362 C190,362 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,384 C190,384 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,384 C190,384 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray205 5.4s linear infinite", animationDelay: "11.02s" }} />
    <path d="M95,406 C190,406 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,428 C190,428 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,450 C190,450 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,450 C190,450 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray205 5.4s linear infinite", animationDelay: "12.88s" }} />
    <path d="M95,472 C190,472 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,496 C190,496 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,518 C190,518 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,518 C190,518 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray205 5.4s linear infinite", animationDelay: "14.74s" }} />
    <path d="M91,52 C186,52 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,52 C186,52 262,280 320,280" fill="none" stroke="rgba(88,41,199,.4)" strokeWidth="1.2" strokeDasharray="5 200" style={{ animation: "cosray205 4.6s linear infinite", animationDelay: "0.00s" }} />
    <path d="M91,74 C186,74 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,118 C186,118 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,140 C186,140 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,140 C186,140 262,280 320,280" fill="none" stroke="rgba(88,41,199,.4)" strokeWidth="1.2" strokeDasharray="5 200" style={{ animation: "cosray205 4.6s linear infinite", animationDelay: "1.65s" }} />
    <path d="M91,184 C186,184 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,206 C186,206 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,250 C186,250 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,250 C186,250 262,280 320,280" fill="none" stroke="rgba(88,41,199,.4)" strokeWidth="1.2" strokeDasharray="5 200" style={{ animation: "cosray205 4.6s linear infinite", animationDelay: "3.30s" }} />
    <path d="M91,272 C186,272 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,316 C186,316 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,338 C186,338 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,338 C186,338 262,280 320,280" fill="none" stroke="rgba(88,41,199,.4)" strokeWidth="1.2" strokeDasharray="5 200" style={{ animation: "cosray205 4.6s linear infinite", animationDelay: "4.95s" }} />
    <path d="M91,382 C186,382 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,404 C186,404 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,448 C186,448 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,448 C186,448 262,280 320,280" fill="none" stroke="rgba(88,41,199,.4)" strokeWidth="1.2" strokeDasharray="5 200" style={{ animation: "cosray205 4.6s linear infinite", animationDelay: "6.60s" }} />
    <path d="M91,490 C186,490 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,512 C186,512 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <circle cx="87" cy="52" r="2" fill="#d1d5db" />
    <circle cx="87" cy="74" r="2" fill="#d1d5db" />
    <circle cx="87" cy="118" r="2" fill="#d1d5db" />
    <circle cx="87" cy="140" r="2" fill="#d1d5db" />
    <circle cx="87" cy="184" r="2" fill="#d1d5db" />
    <circle cx="87" cy="206" r="2" fill="#d1d5db" />
    <circle cx="87" cy="250" r="2" fill="#d1d5db" />
    <circle cx="87" cy="272" r="2" fill="#d1d5db" />
    <circle cx="87" cy="316" r="2" fill="#d1d5db" />
    <circle cx="87" cy="338" r="2" fill="#d1d5db" />
    <circle cx="87" cy="382" r="2" fill="#d1d5db" />
    <circle cx="87" cy="404" r="2" fill="#d1d5db" />
    <circle cx="87" cy="448" r="2" fill="#d1d5db" />
    <circle cx="87" cy="490" r="2" fill="#d1d5db" />
    <circle cx="87" cy="512" r="2" fill="#d1d5db" />
    <path d="M83,64 C180,64 260,280 320,280" fill="none" stroke="url(#cosHeroRay)" strokeWidth="1.6" />
    <path d="M83,64 C180,64 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray167 3.2s linear infinite", animationDelay: "0.00s" }} />
    <path d="M83,172 C180,172 260,280 320,280" fill="none" stroke="url(#cosHeroRay)" strokeWidth="1.6" />
    <path d="M83,172 C180,172 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray167 3.2s linear infinite", animationDelay: "0.64s" }} />
    <path d="M83,280 C180,280 260,280 320,280" fill="none" stroke="url(#cosHeroRay)" strokeWidth="1.6" />
    <path d="M83,280 C180,280 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray167 3.2s linear infinite", animationDelay: "1.28s" }} />
    <path d="M83,388 C180,388 260,280 320,280" fill="none" stroke="url(#cosHeroRay)" strokeWidth="1.6" />
    <path d="M83,388 C180,388 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray167 3.2s linear infinite", animationDelay: "1.92s" }} />
    <path d="M83,496 C180,496 260,280 320,280" fill="none" stroke="url(#cosHeroRay)" strokeWidth="1.6" />
    <path d="M83,496 C180,496 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray167 3.2s linear infinite", animationDelay: "2.56s" }} />
    
    <circle cx="332" cy="280" r="22" fill="url(#cosHeroNode)" />
    <circle cx="332" cy="280" r="30" fill="none" stroke="rgba(88,41,199,.3)" strokeWidth="1.5" style={{ animation: "cosglow 3s ease-in-out infinite", transformOrigin: "332px 280px" }} />
    <path d="M8 5v14l11-7z" transform="translate(325,271)" fill="#140f2b" style={{ display: "none" }} />
    <g transform="translate(324,272)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg></g>
    <line x1="362" y1="280" x2="504" y2="280" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="362" y1="280" x2="504" y2="280" stroke="url(#cosHeroBeam)" strokeWidth="2" strokeDasharray="7 83" style={{ animation: "cosbeam 3.2s linear infinite" }} />
    </svg>
  );
}
