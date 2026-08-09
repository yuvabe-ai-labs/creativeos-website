import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { PilotForm } from "@/components/pilot/pilot-form";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Apply for a pilot | ${SITE.product}`,
  description:
    "Pilot CreativeOS with one active D2C brand. One recurring workflow, measured against how you produce today — findings shared either way.",
  alternates: { canonical: "/pilot" },
};

const MEASURES = [
  "Baseline production time",
  "CreativeOS production time",
  "Time to first review-ready version",
  "Number of generation attempts",
  "Estimated generation cost",
  "Number of brand corrections",
  "Number of tools used",
  "Number of review cycles",
  "User satisfaction",
  "Quality rating by a senior reviewer",
];

const FIT = [
  "Produces recurring content for D2C brands",
  "Has measurable content volume",
  "Uses multiple generation tools today",
  "Can nominate one pilot brand",
  "Has a real production workflow available for comparison",
  "Has a senior reviewer who can evaluate output quality",
];

export default function PilotPage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full">
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-[1240px] px-8 pt-20 pb-16">
            <Reveal>
              <div className="mb-6 text-[12px] leading-[1.4] font-medium tracking-[0.22em] text-ink-soft uppercase">
                Pilot programme
              </div>
              <h1 className="font-display m-0 max-w-[20ch] text-[clamp(2.3rem,4.4vw,3.8rem)] leading-[1.05] font-normal tracking-[-0.03em] text-ink">
                Pilot CreativeOS with one active D2C brand.
              </h1>
              <p className="mt-[26px] mb-0 max-w-[58ch] text-[18px] leading-[28px] text-ink-muted text-pretty">
                One brand. One recurring workflow. Measured against how you
                produce today — findings shared either way.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-16 px-8 py-[72px] lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <h2 className="font-display mt-0 mb-7 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.1] font-semibold tracking-[-0.022em]">
                What we measure together
              </h2>
              {/* 1px gap over a grey backdrop draws the hairline grid. */}
              <ul className="grid list-none grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-line bg-line p-0 sm:grid-cols-2">
                {MEASURES.map((measure) => (
                  <li
                    key={measure}
                    className="bg-white px-[22px] py-[18px] text-[15px] leading-[22px] text-ink-muted"
                  >
                    {measure}
                  </li>
                ))}
              </ul>

              <h2 className="font-display mt-12 mb-6 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.1] font-semibold tracking-[-0.022em]">
                Who this fits
              </h2>
              <ul className="flex list-none flex-col gap-3 p-0">
                {FIT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[7px] size-1.5 flex-none rounded-[2px] bg-purple" />
                    <span className="text-[15px] leading-[23px] text-ink-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 mb-0 max-w-[52ch] text-[14px] leading-[21px] text-ink-soft">
                Applying commits you to nothing. We reply with fit and next
                steps.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <PilotForm />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
