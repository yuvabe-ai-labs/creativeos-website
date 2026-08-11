import {
  HeroSignalFlow,
  HeroSignalFlowPortrait,
} from "@/components/diagrams/hero-signal-flow";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaLink } from "@/components/site/cta-link";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-line bg-white"
      style={{
        backgroundImage: [
          "radial-gradient(60% 52% at 86% 16%, rgba(150,136,192,.24) 0%, rgba(150,136,192,0) 100%)",
          "radial-gradient(48% 42% at 8% 88%, rgba(255,202,45,.16) 0%, rgba(255,202,45,0) 100%)",
          "radial-gradient(40% 36% at 40% 4%, rgba(148,219,228,.16) 0%, rgba(148,219,228,0) 100%)",
        ].join(","),
      }}
    >
      {/* Dot grid, masked so it only surfaces under the right-hand visual. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage:
            "linear-gradient(90deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 45%,#000 80%)",
          maskImage:
            "linear-gradient(90deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 45%,#000 80%)",
        }}
      />

      <div className="relative z-[2] mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-16 px-8 pt-[104px] pb-[110px] hero:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        {/* Above the fold, so this reads as a page-load entrance rather than a
            scroll reveal — same wrapper, it simply fires immediately. */}
        <RevealGroup>
          <RevealItem className="mb-[26px] text-[12px] leading-[1.4] font-medium tracking-[0.22em] text-ink-soft uppercase">
            Built for high-volume D2C agencies
          </RevealItem>

          <RevealItem>
            <h1 className="font-display m-0 max-w-[17ch] text-[clamp(2.5rem,4.6vw,4.1rem)] leading-[1.04] font-normal tracking-[-0.03em] text-ink">
              Produce D2C content at the speed of the{" "}
              <span
                className="inline-block pb-[0.04em]"
                style={{
                  backgroundImage: "linear-gradient(#5829c7,#5829c7)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% .12em",
                  backgroundPosition: "0 90%",
                }}
              >
                market
              </span>
              .
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="mt-[26px] mb-0 max-w-[52ch] text-[18px] leading-[28px] text-ink-muted text-pretty">
              Reels and static posts for D2C brands — produced with your brand
              context, your market, and your past work already in place. Fewer
              retries. Lower cost.
            </p>
          </RevealItem>

          <RevealItem className="mt-8 flex flex-wrap gap-3">
            <CtaLink href="/pilot">Pilot CreativeOS with One Brand</CtaLink>
            <CtaLink href="#workflow" tone="outline" withArrow={false}>
              See How It Works
            </CtaLink>
          </RevealItem>

          <RevealItem className="mt-7">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-[9px]">
              <span className="size-1.5 rounded-full bg-purple" />
              <span className="text-[13px] leading-[1.4] font-medium text-ink-muted">
                Up to 4x faster production
              </span>
            </div>
          </RevealItem>
        </RevealGroup>

        {/* Portrait — the canonical drawing, and what most readers see. */}
        <Reveal
          delay={0.2}
          className="w-full max-w-[420px] justify-self-center hero:hidden"
        >
          <div data-signal-flow className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(148,163,184,.28) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />
            <HeroSignalFlowPortrait />
          </div>
          <div className="mt-3 text-center text-[10px] leading-[1.5] font-semibold tracking-[1.4px] text-ink-faint">
            EVERYTHING THE AGENCY KNOWS, IN EVERY ASSET
          </div>
        </Reveal>

        {/* Wide — the enhancement, from 1081px up. */}
        <Reveal
          delay={0.2}
          className="relative hidden min-h-[560px] w-full max-w-[560px] justify-self-end hero:block"
        >
          <div data-signal-flow className="absolute inset-0 overflow-visible">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(148,163,184,.28) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
            />

            <HeroSignalFlow />

            {/* Output node: a solid dot with a ripple expanding out of it. */}
            <div className="absolute top-1/2 right-11 w-[110px] -translate-y-[55px]">
              <div className="relative flex h-[110px] items-center justify-center">
                <span
                  className="absolute size-[26px] rounded-full border-[0.5px] border-purple/45"
                  style={{
                    animation: "cosripple 3.2s ease-out infinite",
                    animationDelay: "1.6s",
                  }}
                />
                <span
                  className="relative size-[26px] rounded-full bg-purple shadow-[0_0_18px_rgba(88,41,199,0.5)]"
                  style={{
                    animation: "cospulse 3.2s ease-out infinite",
                    animationDelay: "1.6s",
                  }}
                />
              </div>
            </div>

            <div className="absolute bottom-6 left-[34px] text-[10px] leading-[1.5] font-semibold tracking-[1.4px] text-ink-faint">
              EVERYTHING THE AGENCY KNOWS, IN EVERY ASSET
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
