import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { PilotForm } from "@/components/pilot/pilot-form";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SITE } from "@/lib/site";
import { planFromQuery } from "@/lib/submissions";

export const metadata: Metadata = {
  title: `Start with a pilot | ${SITE.product}`,
  description:
    "Pilot CreativeOS with one active D2C brand. One recurring workflow, measured against how you produce today — findings shared either way.",
  alternates: { canonical: "/pilot" },
};

const FIT = [
  "Produces recurring content for D2C brands",
  "Has measurable content volume",
  "Uses multiple generation tools today",
  "Can nominate one pilot brand",
  "Has a real production workflow available for comparison",
  "Has a senior reviewer who can evaluate output quality",
];

export default async function PilotPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { plan } = await searchParams;
  const defaultPlan = planFromQuery(typeof plan === "string" ? plan : undefined);

  return (
    <>
      <SiteHeader />
      <main className="w-full">
        {/*
          The form is the point of this page, so it shares the hero rather than
          sitting below the fold. Below `lg` everything stacks in source order,
          which puts the form directly after the headline.
        */}
        <section className="border-b border-line bg-white">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-12 px-8 pt-16 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <Reveal>
              <div className="mb-6 text-[12px] leading-[1.4] font-medium tracking-[0.22em] text-ink-soft uppercase">
                Pilot programme
              </div>
              <h1 className="font-display m-0 max-w-[20ch] text-[clamp(2.3rem,4.4vw,3.8rem)] leading-[1.05] font-normal tracking-[-0.03em] text-ink">
                Pilot CreativeOS with one active D2C brand.
              </h1>
              <p className="mt-[26px] mb-0 max-w-[52ch] text-[18px] leading-[28px] text-ink-muted text-pretty">
                One brand. One recurring workflow. Measured against how you
                produce today — findings shared either way.
              </p>

              <h2 className="mt-10 mb-4 text-[16px] leading-none font-semibold tracking-[-0.01em] text-ink">
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

              <p className="mt-8 mb-0 max-w-[52ch] text-[14px] leading-[21px] text-ink-soft">
                Applying commits you to nothing. We reply with fit and next
                steps.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <PilotForm defaultPlan={defaultPlan} />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
