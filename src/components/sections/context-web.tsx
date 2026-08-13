import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading, SectionLede } from "@/components/site/section";

/*
  Section 01 as "The String": the Weave-pattern organic scatter, telling the
  context argument. Six context chips (the deck's vocabulary) hang on the left;
  one lavender comet strings them together into the asset at the centre; three
  amber dots then fan out to output crops that light up as they land. Set once,
  inherited by every asset — said in one 9s loop.

  HTML overlays and the SVG underlay share one coordinate system: the SVG is
  1200x640 with preserveAspectRatio="none", and every HTML element is placed
  at (x/1200, y/640) percentages with a centre translate — so the drawn paths
  meet the chips and cards at any container width.
*/

const CHIPS = [
  // Arrival times (seconds into the 9s cycle) drive the ring pulses; the
  // negative delay is (cycle - arrival), per the note on cosChipPulse.
  { label: "Explain the brand", x: 170, y: 140, arrival: 0.2 },
  { label: "Tone of voice", x: 330, y: 225, arrival: 1.0 },
  { label: "Product details", x: 150, y: 330, arrival: 1.9 },
  { label: "Mood + lighting", x: 300, y: 430, arrival: 2.8 },
  { label: "Colors + refs", x: 180, y: 530, arrival: 3.7 },
  { label: "Compliance check", x: 360, y: 565, arrival: 4.4 },
];

const OUTPUTS = [
  {
    src: "/assets/hero/placeholder-02.jpg",
    alt: "Reel crop",
    caption: "Reel · 9:16",
    x: 1000,
    y: 150,
    w: 110,
    ratio: "9 / 16",
  },
  {
    src: "/assets/hero/placeholder-12.jpg",
    alt: "Post crop",
    caption: "Post · 1:1",
    x: 1040,
    y: 330,
    w: 130,
    ratio: "1 / 1",
  },
  {
    src: "/assets/hero/placeholder-13.jpg",
    alt: "Story crop",
    caption: "Story · 4:5",
    x: 1000,
    y: 520,
    w: 120,
    ratio: "4 / 5",
  },
];

/* One thread through every chip anchor into the centre card's left edge. */
const THREAD =
  "M170,140 C260,155 315,180 330,225 C348,278 225,290 150,330 C95,362 235,395 300,430 C355,460 245,495 180,530 C150,546 275,558 360,565 C440,571 462,430 482,345";

/* From the centre card's right edge to each output card's left edge. */
const FANS = [
  "M718,318 C820,285 890,215 942,162",
  "M718,330 C810,330 890,330 972,330",
  "M718,342 C820,375 890,450 942,505",
];

const pct = (x: number, y: number) => ({
  left: `${(x / 1200) * 100}%`,
  top: `${(y / 640) * 100}%`,
});

export function ContextWeb() {
  return (
    <Section
      id="context"
      index="01"
      eyebrow="The hidden cost of AI production"
      className="bg-white [background-image:radial-gradient(48%_40%_at_12%_0%,rgba(150,136,192,.14),transparent),radial-gradient(rgba(148,163,184,.2)_1px,transparent_1px)] [background-size:auto,26px_26px]"
    >
      <div>
        <Reveal>
          <SectionHeading className="max-w-[22ch]">
            String the context together once.
          </SectionHeading>
          <SectionLede>
            Brand, tone, product, lighting, compliance — connected on the canvas
            once, then inherited by every asset that follows.
          </SectionLede>
        </Reveal>

        {/* The canvas. */}
        <Reveal delay={0.08}>
          <div data-signal-flow className="relative mt-14 hidden h-[640px] md:block">
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 1200 640"
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
                style={{ animation: "coswebTrail 9s linear infinite" }}
              />
              <path
                d={THREAD}
                pathLength={100}
                stroke="#5829c7"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="4 100"
                style={{ animation: "coswebDot 9s linear infinite" }}
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
                    style={{ animation: "coswebFanTrail 9s linear infinite" }}
                  />
                  <path
                    d={d}
                    pathLength={100}
                    stroke="#e3a900"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="5 100"
                    style={{ animation: "coswebFan 9s linear infinite" }}
                  />
                </g>
              ))}
            </svg>

            {/* Context chips. */}
            {CHIPS.map((chip) => (
              <span
                key={chip.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-[13px] leading-none font-medium whitespace-nowrap text-ink-muted ring-1 ring-line shadow-[0_2px_10px_rgba(11,15,25,.07)]"
                style={{
                  ...pct(chip.x, chip.y),
                  animation: "coswebChip 9s linear infinite",
                  animationDelay: `-${9 - chip.arrival}s`,
                }}
              >
                {chip.label}
              </span>
            ))}

            {/* The asset being made. */}
            <div
              className="absolute size-[230px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] shadow-[0_24px_60px_rgba(11,15,25,.18)] ring-1 ring-black/5"
              style={pct(600, 330)}
            >
              <Image
                src="/assets/hero/placeholder-11.jpg"
                alt="The asset on the canvas"
                fill
                sizes="230px"
                className="object-cover"
              />
            </div>

            {/* The assets that inherit it. */}
            {OUTPUTS.map((out) => (
              <div
                key={out.caption}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  ...pct(out.x, out.y),
                  width: out.w,
                  animation: "coswebFlash 9s linear infinite",
                }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-[14px] shadow-[0_16px_40px_rgba(11,15,25,.16)] ring-1 ring-black/5"
                  style={{ aspectRatio: out.ratio }}
                >
                  <Image
                    src={out.src}
                    alt={out.alt}
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-2 text-center text-[11px] leading-none font-medium tracking-[0.14em] text-ink-soft uppercase">
                  {out.caption}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* The same story stacked, for phones: chips, asset, crops. */}
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
