import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading, SectionLede } from "@/components/site/section";

/*
  Section 01 as "The String": the Weave-pattern organic scatter, telling the
  context argument. Seven context chips — each with a reference thumbnail —
  hang on the left; one purple comet strings them together into the asset at
  the centre; three amber dots then fan out to named deliverables that light
  up as they land. Set once, inherited by every asset — said in one 9s loop.

  HTML overlays and the SVG underlay share one coordinate system: the SVG is
  1200x680 with preserveAspectRatio="none", and every HTML element is placed
  at (x/1200, y/680) percentages with a centre translate — so the drawn paths
  meet the chips and cards at any container width.
*/

const CHIPS: Array<{
  label: string;
  /** Reference thumbnail beside the pill. */
  thumb?: string;
  /** Renders a typeset Mender brand-book tile instead of a photo. */
  wordmark?: boolean;
  /** Rendered thumb edge in px — varied, comparable to the deliverables. */
  size?: number;
  x: number;
  y: number;
  /** Seconds into the 9s cycle; drives the ring pulse via negative delay. */
  arrival: number;
  /** Perspective scale around the anchor; also drives opacity. */
  depth: number;
  /** Renders the pill on the left of the thumb — for chips whose right side is crowded. */
  labelFirst?: boolean;
}> = [
  // Arrivals are nearest-point arc-length fractions of the thread scaled to
  // its 2.24s travel (32% of the 7s cycle) — computed, not eyeballed, so the
  // pulse lands as the dot passes. `depth` is the perspective: nearer units
  // render larger and fully opaque, farther ones smaller and fainter. It
  // scales around the anchor, so the thread stays in sync.
  // Steps alternate sides of the S: units left of the path carry their label
  // on the left (thumb kissing the line), units right of it the reverse.
  { label: "Explain the brand", wordmark: true, size: 96, x: 200, y: 110, arrival: 0.05, depth: 1.05, labelFirst: true },
  { label: "Tone of voice", thumb: "/assets/hero/placeholder-14.jpg", size: 72, x: 450, y: 190, arrival: 0.47, depth: 0.82 },
  { label: "Product details", thumb: "/assets/hero/placeholder-11.jpg", size: 112, x: 170, y: 290, arrival: 1.06, depth: 1.12, labelFirst: true },
  { label: "Mood + lighting", thumb: "/assets/hero/placeholder-17.jpg", size: 80, x: 385, y: 370, arrival: 0.76, depth: 0.88 },
  { label: "Colors + refs", thumb: "/assets/hero/placeholder-18.jpg", size: 104, x: 200, y: 470, arrival: 1.3, depth: 1.0, labelFirst: true },
  { label: "Market trends", thumb: "/assets/hero/placeholder-15.jpg", size: 88, x: 450, y: 545, arrival: 1.84, depth: 0.94 },
  { label: "Compliance check", thumb: "/assets/hero/placeholder-16.jpg", size: 76, x: 260, y: 620, arrival: 1.53, depth: 0.88, labelFirst: true },
];

/* The three named deliverables on the right. */
const OUTPUTS: Array<{
  src: string;
  alt: string;
  caption: string;
  x: number;
  y: number;
  w: number;
  ratio: string;
}> = [
  {
    src: "/assets/hero/placeholder-02.jpg",
    alt: "Summer look reel crop",
    caption: "Summer look · Reel",
    x: 1010,
    y: 140,
    w: 110,
    ratio: "9 / 16",
  },
  {
    src: "/assets/hero/placeholder-12.jpg",
    alt: "Launch post crop",
    caption: "Launch post · 1:1",
    x: 1050,
    y: 350,
    w: 130,
    ratio: "1 / 1",
  },
  {
    src: "/assets/hero/placeholder-13.jpg",
    alt: "Restock story crop",
    caption: "Restock story · 4:5",
    x: 1010,
    y: 555,
    w: 120,
    ratio: "4 / 5",
  },
];

/* The bloom: ten gradient frames across the output field that only surface
   once the deliverables are visible — the run widening past what's shown —
   then reset with the loop. Small delays scatter the arrival. */
const BLOOM: Array<{
  x: number;
  y: number;
  w: number;
  ratio: string;
  blur: number;
  delay: number;
  border: string;
}> = [
  // around the Reel
  { x: 1105, y: 75, w: 60, ratio: "3 / 4", blur: 1, delay: 0, border: "rgba(88,41,199,.45)" },
  { x: 1130, y: 190, w: 48, ratio: "1 / 1", blur: 1.5, delay: 0.08, border: "rgba(150,136,192,.55)" },
  { x: 920, y: 120, w: 40, ratio: "9 / 16", blur: 2, delay: 0.15, border: "rgba(88,41,199,.4)" },
  // around the Post
  { x: 950, y: 290, w: 54, ratio: "1 / 1", blur: 1, delay: 0.03, border: "rgba(88,41,199,.45)" },
  { x: 1150, y: 320, w: 66, ratio: "4 / 5", blur: 0.5, delay: 0.12, border: "rgba(88,41,199,.5)" },
  { x: 1145, y: 425, w: 44, ratio: "1 / 1", blur: 2, delay: 0.1, border: "rgba(150,136,192,.55)" },
  { x: 945, y: 415, w: 38, ratio: "3 / 4", blur: 2.5, delay: 0.1, border: "rgba(150,136,192,.5)" },
  // around the Story
  { x: 925, y: 545, w: 52, ratio: "4 / 5", blur: 1, delay: 0.03, border: "rgba(88,41,199,.45)" },
  { x: 1110, y: 500, w: 62, ratio: "1 / 1", blur: 0.8, delay: 0.18, border: "rgba(88,41,199,.5)" },
  { x: 1105, y: 625, w: 46, ratio: "3 / 4", blur: 1.8, delay: 0.22, border: "rgba(150,136,192,.55)" },
];

/* A softened S — four shallow bends past the alternating steps, entering the
   card from below. Short on purpose: the dot clears it in ~2.2s. */
const THREAD =
  "M200,145 C350,175 450,205 460,235 C470,300 240,300 205,360 C175,430 220,505 300,545 C400,590 500,620 620,458";

/* From the centre card's right edge to each deliverable's left edge. */
const FANS = [
  "M750,318 C850,282 922,208 952,158",
  "M750,340 C845,344 908,348 982,350",
  "M750,362 C850,398 922,482 948,548",
];

const pct = (x: number, y: number) => ({
  left: `${(x / 1200) * 100}%`,
  top: `${(y / 680) * 100}%`,
});

export function ContextWeb() {
  return (
    <Section
      id="context"
      index="01"
      eyebrow="The hidden cost of AI production"
      className="bg-white [background-image:radial-gradient(60%_52%_at_86%_16%,rgba(150,136,192,.24),transparent),radial-gradient(48%_42%_at_8%_88%,rgba(255,202,45,.16),transparent),radial-gradient(rgba(148,163,184,.2)_1px,transparent_1px)] [background-size:auto,auto,26px_26px]"
    >
      <div>
        <Reveal>
          <SectionHeading className="max-w-[22ch]">
            String the context together once.
          </SectionHeading>
          <SectionLede>
            Brand, tone, product, lighting, market — connected on the canvas
            once, then inherited by every asset that follows.
          </SectionLede>
        </Reveal>

        {/* The canvas. */}
        <Reveal delay={0.08}>
          <div data-signal-flow className="relative mt-14 hidden h-[680px] md:block">
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 1200 680"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Static geometry, barely there. */}
              {[THREAD, ...FANS].map((d) => (
                <path key={d} d={d} stroke="rgba(17,24,39,.08)" strokeWidth="1" />
              ))}

              {/* The string: trail drawn in behind the dot. */}
              <path
                d={THREAD}
                pathLength={100}
                stroke="rgba(88,41,199,.35)"
                strokeWidth="1.5"
                strokeDasharray="100 100"
                style={{ animation: "coswebTrail 7s linear infinite" }}
              />
              <path
                d={THREAD}
                pathLength={100}
                stroke="#5829c7"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="4 100"
                style={{ animation: "coswebDot 7s linear infinite" }}
              />

              {/* The fan: three amber dots leaving together — the reuse. */}
              {FANS.map((d) => (
                <g key={d}>
                  <path
                    d={d}
                    pathLength={100}
                    stroke="rgba(227,169,0,.4)"
                    strokeWidth="1.5"
                    strokeDasharray="100 100"
                    style={{ animation: "coswebFanTrail 7s linear infinite" }}
                  />
                  <path
                    d={d}
                    pathLength={100}
                    stroke="#e3a900"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="5 100"
                    style={{ animation: "coswebFan 7s linear infinite" }}
                  />
                </g>
              ))}
            </svg>

            {/* Context chips, each with its reference beside it. */}
            {CHIPS.map((chip) => (
              <div
                key={chip.label}
                className={
                  chip.labelFirst
                    ? "absolute flex flex-row-reverse items-center gap-2.5"
                    : "absolute flex items-center gap-2.5"
                }
                style={{
                  ...pct(chip.x, chip.y),
                  transform: `translate(-50%, -50%) scale(${chip.depth})`,
                  opacity: Math.min(1, 0.25 + 0.72 * chip.depth),
                }}
              >
                {chip.wordmark ? (
                  <span
                    className="flex shrink-0 flex-col items-center justify-center gap-1.5 rounded-[12px] bg-[#f6f1e7] shadow-[0_8px_24px_rgba(11,15,25,.14)] ring-1 ring-black/5"
                    style={{ width: chip.size, height: chip.size }}
                  >
                    <span className="font-display text-[20px] leading-none font-semibold tracking-[-0.02em] text-ink">
                      Mender
                    </span>
                    <span className="text-[6.5px] leading-none font-medium tracking-[0.3em] text-ink-soft uppercase">
                      Brand book
                    </span>
                  </span>
                ) : null}
                {chip.thumb ? (
                  <span
                    className="relative block shrink-0 overflow-hidden rounded-[12px] shadow-[0_8px_24px_rgba(11,15,25,.14)] ring-1 ring-black/5"
                    style={{ width: chip.size, height: chip.size }}
                  >
                    <Image
                      src={chip.thumb}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </span>
                ) : null}
                <span
                  className="rounded-full bg-white px-4 py-2 text-[13px] leading-none font-medium whitespace-nowrap text-ink-muted ring-1 ring-line shadow-[0_2px_10px_rgba(11,15,25,.07)]"
                  style={{
                    animation: "coswebChip 7s linear infinite",
                    animationDelay: `-${7 - chip.arrival}s`,
                  }}
                >
                  {chip.label}
                </span>
              </div>
            ))}

            {/* The asset being made: a skeleton that shimmers while the string
                gathers context, the image resolving like a finished generation,
                and three beam rings pulsing out as it lands. */}
            <div
              className="absolute size-[220px] -translate-x-1/2 -translate-y-1/2"
              style={pct(640, 340)}
            >
              {[
                { color: "rgba(88,41,199,.5)", delay: "0s" },
                { color: "rgba(227,169,0,.5)", delay: "0.12s" },
                { color: "rgba(150,136,192,.45)", delay: "0.24s" },
              ].map((beam) => (
                <span
                  key={beam.delay}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[18px] border-2"
                  style={{
                    borderColor: beam.color,
                    animation: "coswebBeam 7s linear infinite",
                    animationDelay: beam.delay,
                  }}
                />
              ))}
              <div className="relative h-full w-full rounded-[18px] border-2 border-dashed border-purple/35">
                {/* Skeleton: the grey fill and its sweep exist only for the
                    ~1s shimmer window after the dot arrives. */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-[2px] overflow-hidden rounded-[18px] bg-[#eceef3]"
                  style={{ animation: "coswebShimmerGate 7s linear infinite" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg, transparent 30%, rgba(255,255,255,.85) 50%, transparent 70%)",
                      backgroundSize: "200% 100%",
                      animation: "coswebShimmer 1.1s linear infinite",
                    }}
                  />
                </div>
                <div
                  className="absolute -inset-[2px] overflow-hidden rounded-[18px] border-2 border-purple/50 shadow-[0_24px_60px_rgba(11,15,25,.18)]"
                  style={{ animation: "coswebImg 7s linear infinite" }}
                >
                  <Image
                    src="/assets/hero/placeholder-11.jpg"
                    alt="The asset on the canvas"
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* The bloom: the run widening once the deliverables exist. */}
            {BLOOM.map((b) => (
              <span
                key={`${b.x},${b.y}`}
                aria-hidden="true"
                className="absolute rounded-[10px] border-2"
                style={{
                  ...pct(b.x, b.y),
                  width: b.w,
                  aspectRatio: b.ratio,
                  transform: "translate(-50%, -50%)",
                  borderColor: b.border,
                  backgroundImage:
                    "linear-gradient(135deg, rgba(88,41,199,.22), rgba(150,136,192,.08))",
                  filter: `blur(${b.blur}px)`,
                  animation: "coswebEcho 7s linear infinite",
                  animationDelay: `${b.delay}s`,
                }}
              />
            ))}

            {/* The deliverables that inherit it: dashed destination frames
                until the fan dots land, then the asset and its name fade in. */}
            {OUTPUTS.map((out) => (
              <div
                key={out.caption}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ ...pct(out.x, out.y), width: out.w }}
              >
                <div
                  className="relative w-full rounded-[14px] border-2 border-dashed border-purple/35"
                  style={{ aspectRatio: out.ratio }}
                >
                  <div
                    className="absolute -inset-[2px] overflow-hidden rounded-[14px] border-2 border-purple/50 shadow-[0_16px_40px_rgba(11,15,25,.16)]"
                    style={{ animation: "coswebFlash 7s linear infinite" }}
                  >
                    <Image
                      src={out.src}
                      alt={out.alt}
                      fill
                      sizes="140px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div
                  className="mt-2 text-center text-[11px] leading-none font-medium tracking-[0.14em] whitespace-nowrap text-ink-soft uppercase"
                  style={{ animation: "coswebFlash 7s linear infinite" }}
                >
                  {out.caption}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* The same story stacked, for phones: chips, asset, deliverables. */}
        <Reveal delay={0.08}>
          <div className="mt-12 md:hidden">
            <div className="flex flex-wrap justify-center gap-2.5">
              {CHIPS.map((chip) => (
                <span
                  key={chip.label}
                  className="rounded-full bg-white px-3.5 py-2 text-[12px] leading-none font-medium text-ink-muted ring-1 ring-line shadow-[0_2px_10px_rgba(11,15,25,.07)]"
                >
                  {chip.label}
                </span>
              ))}
            </div>
            <div className="relative mx-auto mt-8 aspect-square w-full max-w-[300px] overflow-hidden rounded-[18px] shadow-[0_24px_60px_rgba(11,15,25,.18)] ring-1 ring-black/5">
              <Image
                src="/assets/hero/placeholder-11.jpg"
                alt="The asset on the canvas"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
            <div className="mt-8 flex items-start justify-center gap-4">
              {OUTPUTS.map((out) => (
                <div key={out.caption} className="w-[96px]">
                  <div
                    className="relative w-full overflow-hidden rounded-[12px] shadow-[0_10px_28px_rgba(11,15,25,.14)] ring-1 ring-black/5"
                    style={{ aspectRatio: out.ratio }}
                  >
                    <Image
                      src={out.src}
                      alt={out.alt}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-2 text-center text-[10px] leading-none font-medium tracking-[0.14em] text-ink-soft uppercase">
                    {out.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
