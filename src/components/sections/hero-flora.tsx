import Image from "next/image";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaLink } from "@/components/site/cta-link";

/*
  The Flora-pattern hero: a dark stage where the work is the colour.

  Ground is the night token with the light hero's three aurora washes re-tuned
  for dark; scattered output cards orbit a centered headline. Every image is a
  placeholder (public/assets/hero/placeholder-*) awaiting real CreativeOS
  output — swap the files, keep the frames.

  Positions are percentages of the hero, not a grid: the scatter *is* the
  layout. Two cards clip the viewport edge on purpose — the canvas reads as
  continuing past the frame.
*/
const CARDS: Array<{
  src: string;
  alt: string;
  pos: React.CSSProperties;
  ratio: string;
  /** Staggered entrance order; also seeds the float phase. */
  delay: number;
  float: string;
  /** Cards that survive below md — the scatter thins on a phone. */
  mobile?: boolean;
  watermark?: boolean;
}> = [
  {
    src: "/assets/hero/placeholder-02.jpg",
    alt: "Campaign fashion still",
    pos: { left: "-2%", top: "7%", width: "clamp(120px, 15vw, 230px)" },
    ratio: "3 / 4",
    delay: 0.15,
    float: "9s",
    mobile: true,
  },
  {
    src: "/assets/hero/placeholder-11.jpg",
    alt: "Amber dropper bottle still",
    pos: { left: "31%", top: "4%", width: "clamp(100px, 10.5vw, 165px)" },
    ratio: "3 / 4",
    delay: 0.24,
    float: "7.5s",
  },
  {
    src: "/assets/hero/placeholder-05.jpg",
    alt: "Beauty close-up",
    pos: { right: "-2%", top: "5%", width: "clamp(150px, 23vw, 350px)" },
    ratio: "16 / 10",
    delay: 0.33,
    float: "10s",
    mobile: true,
    watermark: true,
  },
  {
    src: "/assets/hero/placeholder-06.jpg",
    alt: "Portrait still",
    pos: { left: "9%", top: "41%", width: "clamp(90px, 10vw, 160px)" },
    ratio: "3 / 4",
    delay: 0.42,
    float: "8s",
  },
  {
    src: "/assets/hero/placeholder-09.jpg",
    alt: "Skincare product still",
    pos: { left: "0%", bottom: "6%", width: "clamp(110px, 12vw, 190px)" },
    ratio: "3 / 4",
    delay: 0.51,
    float: "8.5s",
  },
  {
    src: "/assets/hero/placeholder-12.jpg",
    alt: "Cream jar campaign still",
    pos: { right: "3%", top: "48%", width: "clamp(100px, 11vw, 180px)" },
    ratio: "3 / 4",
    delay: 0.6,
    float: "7s",
  },
  {
    src: "/assets/hero/placeholder-13.jpg",
    alt: "Haircare range still",
    pos: { right: "8%", bottom: "5%", width: "clamp(120px, 15vw, 240px)" },
    ratio: "4 / 3",
    delay: 0.69,
    float: "9.5s",
    mobile: true,
  },
  {
    src: "/assets/hero/placeholder-14.jpg",
    alt: "Bottle product still",
    pos: { left: "15%", bottom: "-9%", width: "clamp(80px, 9vw, 140px)" },
    ratio: "3 / 4",
    delay: 0.78,
    float: "8s",
  },
];

export function HeroFlora() {
  return (
    <section
      className="relative flex min-h-[94svh] flex-col overflow-hidden bg-night"
      style={{
        backgroundImage: [
          // The light hero's washes, inverted for the stage: same hues, glow tuning.
          "radial-gradient(52% 44% at 82% 12%, rgba(88,41,199,.34) 0%, rgba(88,41,199,0) 100%)",
          "radial-gradient(44% 38% at 10% 86%, rgba(255,202,45,.13) 0%, rgba(255,202,45,0) 100%)",
          "radial-gradient(38% 34% at 38% 0%, rgba(148,219,228,.12) 0%, rgba(148,219,228,0) 100%)",
          "radial-gradient(60% 52% at 50% 118%, rgba(150,136,192,.18) 0%, rgba(150,136,192,0) 100%)",
        ].join(","),
      }}
    >
      {/* The canvas: a faint dot grid over the whole stage, vignetted so the
          corners fall away and the centre reads as the lit part of the table. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage:
            "radial-gradient(90% 80% at 50% 45%, #000 40%, transparent 100%)",
          maskImage:
            "radial-gradient(90% 80% at 50% 45%, #000 40%, transparent 100%)",
        }}
      />

      {/* The signature, kept minimal per the deck: the signal rays survive as
          four faint comet lines drifting toward the centre of the stage. */}
      <svg
        data-signal-flow
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {[
          { d: "M-40 180 C 360 260, 520 380, 700 420", delay: "0s" },
          { d: "M1480 140 C 1120 240, 940 360, 760 410", delay: "-2.1s" },
          { d: "M-40 760 C 340 680, 540 560, 700 480", delay: "-4.2s" },
          { d: "M1480 780 C 1140 700, 930 570, 760 490", delay: "-6.3s" },
        ].map((ray) => (
          <g key={ray.d}>
            <path d={ray.d} stroke="rgba(150,136,192,.13)" strokeWidth="1" />
            <path
              d={ray.d}
              pathLength={300}
              stroke="rgba(255,255,255,.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="6 300"
              style={{
                animation: "cosraytall 8.4s linear infinite",
                animationDelay: ray.delay,
              }}
            />
          </g>
        ))}
      </svg>

      {/* The scatter. Entrance and float live on separate elements so the two
          transforms never fight. */}
      <div data-hero-cards className="absolute inset-0">
        {CARDS.map((card) => (
          <div
            key={card.src}
            className={card.mobile ? "absolute" : "absolute hidden md:block"}
            style={{
              ...card.pos,
              aspectRatio: card.ratio,
              animation: `cosheroin .9s cubic-bezier(.2,.7,.2,1) ${card.delay}s both`,
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[18px] shadow-[0_24px_70px_rgba(0,0,0,.5)] ring-1 ring-white/10"
              style={{
                animation: `cosfloat ${card.float} ease-in-out infinite`,
                animationDelay: `-${card.delay * 4}s`,
              }}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(max-width: 768px) 32vw, 24vw"
                className="object-cover"
                priority={card.mobile}
              />
              {card.watermark ? (
                <span className="absolute top-3 left-4 text-[10px] leading-none font-medium tracking-[0.22em] text-white/75 uppercase">
                  Made in CreativeOS
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* The centered argument. */}
      <div className="relative z-[2] mx-auto flex w-full max-w-[860px] flex-1 flex-col items-center justify-center px-6 pt-[140px] pb-16 text-center">
        <RevealGroup>
          <RevealItem className="mb-6 text-[12px] leading-[1.4] font-medium tracking-[0.24em] text-lavender uppercase">
            Built for high-volume D2C agencies
          </RevealItem>

          <RevealItem>
            <h1 className="font-display m-0 text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.04] font-normal tracking-[-0.03em] text-balance text-white">
              Produce D2C content at the speed of the{" "}
              <span className="whitespace-nowrap">
                <span
                  className="inline-block pb-[0.04em]"
                  style={{
                    backgroundImage: "linear-gradient(#ffca2d,#ffca2d)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% .12em",
                    backgroundPosition: "0 90%",
                  }}
                >
                  market
                </span>
                .
              </span>
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="mx-auto mt-6 mb-0 max-w-[46ch] text-[17px] leading-[27px] text-pretty text-white/64">
              Reels and static posts for D2C brands — produced with your brand
              context, your market, and your past work already in place.
            </p>
          </RevealItem>

          <RevealItem className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <CtaLink
              href="/pilot"
              withArrow={false}
              className="rounded-full bg-yellow px-7 py-[15px] text-ink hover:bg-[#ffd75c]"
            >
              Pilot CreativeOS with One Brand
            </CtaLink>
            <CtaLink
              href="#workflow"
              tone="outline"
              withArrow={false}
              className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10"
            >
              See How It Works
            </CtaLink>
          </RevealItem>
        </RevealGroup>
      </div>

      {/* The floor of the stage: the hero diagram's caption, carried over. */}
      <div className="relative z-[2] mx-auto w-full max-w-[1240px] px-8 pb-12">
        <p className="m-0 text-center text-[12px] leading-[1.9] font-medium tracking-[0.24em] text-white/50 uppercase">
          Everything the agency knows,
          <br />
          in every asset.
        </p>
      </div>
    </section>
  );
}
