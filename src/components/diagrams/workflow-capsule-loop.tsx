/**
 * The create/learn capsule loop, from slide 03 of the CreativeOS Sales Deck.
 *
 * A single lit dot runs the capsule perimeter on a 12s cycle while a trailing
 * stroke draws in behind it. Both take their stroke from `cosLoopInk`, a
 * vertical gradient across the capsule: the top run is amber for CREATE, the
 * bottom purple for LEARN, and the end caps are where one becomes the other —
 * so the dot changes colour as it rounds them rather than switching.
 *
 * The dot never stops. It runs the full 12s cycle without a hold, and the reset
 * happens underneath it: from 88% the trail and every latched marker fade back
 * to the start state, finishing at 99% — a beat before the dot comes round to
 * the beginning. The loop is one continuous revolution with no pause between
 * passes, and the dot appears to outrun its own trail as it dissolves behind.
 *
 * Each marker also throws an expanding ring as the dot reaches it, the same
 * pulse the chips use in section 01.
 *
 * The stage arrival times are derived from the path geometry, so do not round
 * them. They appear twice: as `animation-delay` on the ring pulses (a short
 * event, so a delay keeps it in phase) and baked into `cosstage1`-`cosstage6`
 * for the fills (a latch has to run to an absolute 100%, which a delay cannot
 * express — see the note in globals.css). The dark tone swaps to the
 * `cosstage1d`-`cosstage6d` twins, whose resting state is a night marker.
 *
 * Geometry ported verbatim from the Design Canvas source; see
 * design-reference/. Colours are toned: `light` matches the source, `dark`
 * restates every value for the night ground.
 */
const TONES = {
  light: {
    guide: "#c3c9d4",
    gradTop: "#e3a900",
    gradMid: "#9688c0",
    gradBot: "#5829c7",
    cloudY: ["rgba(255,202,45,.38)", "rgba(255,202,45,.10)", "rgba(255,202,45,0)"],
    cloudP: ["rgba(88,41,199,.26)", "rgba(88,41,199,.08)", "rgba(88,41,199,0)"],
    divider: "#fff",
    create: "var(--color-amber-deep)",
    createOpacity: 0.8,
    learn: "var(--color-purple)",
    learnOpacity: 0.55,
    marker: "#fff",
    markerEdge: "#aab1bf",
    ringY: "rgba(227,169,0,.55)",
    ringP: "rgba(88,41,199,.5)",
    num: "#5829c7",
    label: "#6b7280",
    tick: "#c3c9d4",
    glowTravel: 0.68,
    glowY: "rgba(227,169,0,.45)",
    glowP: "rgba(88,41,199,.4)",
    stage: (n: number) => `cosstage${n}`,
  },
  dark: {
    guide: "rgba(255,255,255,.16)",
    gradTop: "#ffca2d",
    gradMid: "#9688c0",
    gradBot: "#7343e3",
    cloudY: ["rgba(255,202,45,.20)", "rgba(255,202,45,.06)", "rgba(255,202,45,0)"],
    cloudP: ["rgba(115,67,227,.30)", "rgba(115,67,227,.10)", "rgba(115,67,227,0)"],
    divider: "rgba(255,255,255,.25)",
    create: "#ffca2d",
    createOpacity: 0.85,
    learn: "#9688c0",
    learnOpacity: 0.75,
    marker: "#1a1237",
    markerEdge: "rgba(255,255,255,.35)",
    ringY: "rgba(255,202,45,.55)",
    ringP: "rgba(150,136,192,.6)",
    num: "#9688c0",
    label: "rgba(255,255,255,.6)",
    tick: "rgba(255,255,255,.18)",
    glowTravel: 0.95,
    glowY: "rgba(255,202,45,.5)",
    glowP: "rgba(150,136,192,.55)",
    stage: (n: number) => `cosstage${n}d`,
  },
} as const;

/* The comet's taper, widest at the dot: a short wide core, a mid layer, a
   long thin tail. `ahead` extends forward from the dot's BACK edge — the dot
   dash is 18 long, so the core's 21 puts the glow's nose ~3 units (~2px
   rendered) past the dot, reading as the comet's head pushing forward.
   `behind` trails; `o` scales the tone's `glowTravel`. Exported for the
   temporary tuning panel; widths are the hand-tuned values from that panel —
   a narrow band (x0.33 of the first cut) under a heavy 20-blur at high
   opacity, so the comet reads as bright haze, not a stroke. */
export const DEFAULT_GLOW_LAYERS = [
  { w: 11.2, ahead: 21, behind: 50, o: 1 },
  { w: 7.3, ahead: 12, behind: 110, o: 0.7 },
  { w: 4, ahead: 6, behind: 190, o: 0.5 },
];

/** Live overrides for the bounce light — only the temporary tuning panel
    passes this; every field falls back to the shipped value. */
export type CapsuleGlow = {
  /** Base opacity of the travelling comet (defaults per tone). */
  travel?: number;
  /** feGaussianBlur stdDeviation softening the comet (default 20). */
  blur?: number;
  /** Held bulb-glow opacity (default 0.09, via --cos-glow-bulb). */
  bulb?: number;
  /** Radius multiplier for the arrival pools (default 1 = 176x83). */
  bulbRadius?: number;
  layers?: typeof DEFAULT_GLOW_LAYERS;
};

const STEPS = [
  { x: 360, y: 205, ring: "ringY", delay: "0.1s", stage: 1, num: "01", label: "Begin with context", top: true },
  { x: 640, y: 205, ring: "ringY", delay: "1.45s", stage: 2, num: "02", label: "Add a market signal", top: true },
  { x: 920, y: 205, ring: "ringY", delay: "2.8s", stage: 3, num: "03", label: "Explore directions", top: true },
  { x: 1200, y: 205, ring: "ringY", delay: "4.15s", stage: 4, num: "04", label: "Produce the asset", top: true },
  { x: 960, y: 435, ring: "ringP", delay: "7.23s", stage: 5, num: "05", label: "Review and refine", top: false },
  { x: 580, y: 435, ring: "ringP", delay: "9.07s", stage: 6, num: "06", label: "Reuse what was learned", top: false },
] as const;

export function WorkflowCapsuleLoop({
  tone = "light",
  glow,
}: {
  tone?: "light" | "dark";
  glow?: CapsuleGlow;
}) {
  const t = TONES[tone];
  const glowTravel = glow?.travel ?? t.glowTravel;
  const glowLayers = glow?.layers ?? DEFAULT_GLOW_LAYERS;
  const capsule =
    "M340,205 L1220,205 A115,115 0 0 1 1220,435 L340,435 A115,115 0 0 1 340,205 Z";

  return (
    <svg
      viewBox="0 0 1560 560"
      className="block h-auto w-full"
      aria-hidden="true"
      style={{ "--cos-glow-bulb": glow?.bulb } as React.CSSProperties}
    >
      <path d="M355,190 A130,130 0 0 1 485,320 A130,130 0 0 1 355,450 L1205,450 A130,130 0 0 1 1075,320 A130,130 0 0 1 1205,190 Z" fill="none" opacity="0" />
      <path d={capsule} fill="none" stroke={t.guide} strokeWidth="2.4" strokeDasharray="2 14" strokeLinecap="round" />
      <defs>
        {/* Amber at the top run (y=205), purple at the bottom (y=435). The blend
            lands entirely in the end caps, which is exactly where CREATE turns
            into LEARN — a lavender midpoint keeps the two from meeting in a muddy
            brown, which is what a direct amber-to-purple ramp gives you. */}
        <linearGradient id="cosLoopInk" gradientUnits="userSpaceOnUse" x1="0" y1="205" x2="0" y2="435">
          <stop offset="0%" stopColor={t.gradTop} />
          <stop offset="50%" stopColor={t.gradMid} />
          <stop offset="100%" stopColor={t.gradBot} />
        </linearGradient>
        <radialGradient id="cosCloudY" cx="35%" cy="18%" r="75%">
          <stop offset="0%" stopColor={t.cloudY[0]} />
          <stop offset="55%" stopColor={t.cloudY[1]} />
          <stop offset="100%" stopColor={t.cloudY[2]} />
        </radialGradient>
        <radialGradient id="cosCloudP" cx="68%" cy="85%" r="80%">
          <stop offset="0%" stopColor={t.cloudP[0]} />
          <stop offset="55%" stopColor={t.cloudP[1]} />
          <stop offset="100%" stopColor={t.cloudP[2]} />
        </radialGradient>
        {/* Bounce light. The travelling comet is blurred dashes; the arrival
            pools are radial gradients — inherently soft, so only the dashes
            need the filter. */}
        {/* The region must outgrow the default -10%: the capsule's bbox is
            only ~230 tall, so 10% (~23 units) walls in a 20-blur (~60-unit
            spread) and slices the haze off at the capsule's outer edge. */}
        <filter id="cosGlowBlur" x="-10%" y="-45%" width="120%" height="190%">
          <feGaussianBlur stdDeviation={glow?.blur ?? 20} />
        </filter>
        <radialGradient id="cosStageGlowY">
          <stop offset="0%" stopColor={t.glowY} />
          <stop offset="100%" stopColor="rgba(255,202,45,0)" />
        </radialGradient>
        <radialGradient id="cosStageGlowP">
          <stop offset="0%" stopColor={t.glowP} />
          <stop offset="100%" stopColor="rgba(88,41,199,0)" />
        </radialGradient>
      </defs>
      <path d={capsule} fill="none" stroke="url(#cosLoopInk)" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="2483 2483" opacity="0.85" style={{ animation: "cosloopDraw 12s linear infinite,cosloopTrail 12s linear infinite" }} />
      <path d={capsule} fill="none" stroke="url(#cosLoopInk)" strokeWidth="6" strokeLinecap="round" strokeDasharray="18 2470" style={{ animation: "cosloopW 12s linear infinite" }} />
      <path d="M250,320 A85,85 0 0 1 335,235 L1225,235 A85,85 0 0 1 1310,320 A85,85 0 0 1 1225,405 L335,405 A85,85 0 0 1 250,320 Z" fill="url(#cosCloudY)" />
      <path d="M250,320 A85,85 0 0 1 335,235 L1225,235 A85,85 0 0 1 1310,320 A85,85 0 0 1 1225,405 L335,405 A85,85 0 0 1 250,320 Z" fill="url(#cosCloudP)" />
      {/* The travelling bounce light, shaped like a comet: three dashes on
          the dot's own `cosloopW` clock (same animation = same phase, always;
          keeping the phase in a separate keyframe is what drifted before). A
          stroke cannot taper, so the taper is stacked: a short wide core
          under the dot, a mid layer trailing further, a long thin tail — the
          blur melts the steps together. Each dash pattern is
          `ahead gap behind 0.01`: `ahead` sits under the dot, `behind` trails
          it. The closing gap is 0.01, NOT 0 — browsers drop zero-length
          segments and spec-duplicate the then-odd list into a doubled period
          with a rogue capsule-length dash. Every pattern sums to the dot's
          2488 exactly, so nothing drifts. Butt caps, because a round cap
          renders short dashes as fat discs. */}
      {glowLayers.map((l) => (
        <path key={l.w} d={capsule} fill="none" stroke="url(#cosLoopInk)" strokeWidth={l.w} strokeLinecap="butt" strokeDasharray={`${l.ahead} ${2487.99 - l.ahead - l.behind} ${l.behind} 0.01`} opacity={glowTravel * l.o} filter="url(#cosGlowBlur)" style={{ animation: "cosloopW 12s linear infinite" }} />
      ))}
      {/* The arrival bounce light: one soft pool per marker, just inside the
          capsule. Eases on to a steady bulb-glow as the dot arrives — no
          pop — holds while the marker is latched, and fades with the 88%
          reset. Uses the baked-percentage `cosstageGlow1`-`6` keyframes, not
          a delay (same reasoning as the marker fills; see globals.css). */}
      {STEPS.map((s) => (
        <ellipse key={s.num} cx={s.x} cy={s.top ? 232 : 408} rx={176 * (glow?.bulbRadius ?? 1)} ry={83 * (glow?.bulbRadius ?? 1)} fill={`url(#cosStageGlow${s.ring === "ringY" ? "Y" : "P"})`} opacity="0" style={{ animation: `cosstageGlow${s.stage} 12s linear infinite` }} />
      ))}
      <line x1="290" y1="320" x2="1270" y2="320" stroke={t.divider} strokeWidth="3" strokeLinecap="round" />

      <text x="780" y="291" textAnchor="middle" style={{ fontWeight: "600", fontSize: "38px", fontFamily: "var(--font-clash-display), sans-serif", letterSpacing: ".18em" }} fill={t.create} opacity={t.createOpacity}>CREATE</text>
      <text x="780" y="376" textAnchor="middle" style={{ fontWeight: "600", fontSize: "38px", fontFamily: "var(--font-clash-display), sans-serif", letterSpacing: ".18em" }} fill={t.learn} opacity={t.learnOpacity}>LEARN</text>

      {STEPS.map((s) => (
        <g key={s.num}>
          <circle cx={s.x} cy={s.y} r="16" fill="none" stroke={t[s.ring]} strokeWidth="1.6" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageW 12s linear infinite", animationDelay: s.delay }} />
          <circle cx={s.x} cy={s.y} r="13" fill={t.marker} stroke={t.markerEdge} strokeWidth="3.4" style={{ transformBox: "fill-box", transformOrigin: "center", animation: `${t.stage(s.stage)} 12s linear infinite` }} />
          <text x={s.x} y={s.top ? 92 : 500} textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1.4px" }} fill={t.num}>{s.num}</text>
          <text x={s.x} y={s.top ? 124 : 532} textAnchor="middle" style={{ fontWeight: "500", fontSize: "19px" }} fill={t.label}>{s.label}</text>
          {s.top ? (
            <line x1={s.x} y1="142" x2={s.x} y2="184" stroke={t.tick} strokeWidth="2" />
          ) : null}
        </g>
      ))}
    </svg>
  );
}
