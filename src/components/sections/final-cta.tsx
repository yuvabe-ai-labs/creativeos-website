import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/site/cta-link";

export function FinalCta() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-[1240px] px-5 pt-20 pb-24 sm:px-8 sm:pt-28 sm:pb-30">
        <Reveal className="max-w-[780px]">
          <h2 className="font-display m-0 text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.06] font-semibold tracking-[-0.025em]">
            Your next D2C creative should not start from zero.
          </h2>
          <p className="mt-5 mb-0 text-[17px] leading-[26px] text-ink-muted text-pretty sm:mt-[22px] sm:text-[18px] sm:leading-[28px]">
            Pilot with one brand. Measure time, retries, and cost against your
            current process.
          </p>

          <div className="mt-[34px] flex flex-wrap gap-3">
            <CtaLink href="/pilot">Start with a Pilot</CtaLink>
            <CtaLink href="/pilot" tone="outline" withArrow={false}>
              Book a Product Walkthrough
            </CtaLink>
          </div>

          <p className="mt-6 mb-0 text-[14px] leading-[21px] text-ink-soft">
            For high-volume D2C agencies producing recurring reels and static
            posts.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
