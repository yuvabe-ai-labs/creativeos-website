import { CtaLink } from "@/components/site/cta-link";

export function FinalCta() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-[1240px] px-8 pt-28 pb-30">
        <div className="max-w-[780px]">
          <h2 className="font-display m-0 text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.06] font-semibold tracking-[-0.025em]">
            Your next D2C creative should not start from zero.
          </h2>
          <p className="mt-[22px] mb-0 text-[18px] leading-[28px] text-ink-muted text-pretty">
            Pilot with one brand. Measure time, retries, and cost against your
            current process.
          </p>

          <div className="mt-[34px] flex flex-wrap gap-3">
            <CtaLink href="/pilot">Apply for a Pilot</CtaLink>
            <CtaLink
              href="mailto:studios@yuvabe.com?subject=CreativeOS%20product%20walkthrough"
              tone="outline"
              withArrow={false}
            >
              Book a Product Walkthrough
            </CtaLink>
          </div>

          <p className="mt-6 mb-0 text-[14px] leading-[21px] text-ink-soft">
            For high-volume D2C agencies producing recurring reels and static
            posts.
          </p>
        </div>
      </div>
    </section>
  );
}
