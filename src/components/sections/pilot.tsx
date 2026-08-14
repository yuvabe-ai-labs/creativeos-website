import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaLink } from "@/components/site/cta-link";
import { Section, SectionHeading } from "@/components/site/section";

const STEPS = [
  "Select one active D2C client.",
  "Import its brand and product context.",
  "Choose a recurring reel or static-post workflow.",
  "Produce a defined batch of assets.",
  "Compare time, attempts, cost, and review cycles with your current process.",
  "Review the findings together.",
];

export function Pilot() {
  return (
    <Section index="05" eyebrow="Pilot CreativeOS with one D2C brand" className="bg-white">
      <div>
        <Reveal>
          <SectionHeading className="max-w-[22ch]">
            Measure the production difference on your own workflow.
          </SectionHeading>
        </Reveal>

        {/*
          The source lays these out column-major (1-2-3 left, 4-5-6 right). Keeping
          the list in reading order and flowing the grid by column preserves both
          the visual and a sane tab/screen-reader sequence.
        */}
        <RevealGroup
          as="ol"
          className="mt-10 grid list-none grid-cols-1 grid-rows-6 gap-x-12 gap-y-6 p-0 md:grid-flow-col md:grid-cols-2 md:grid-rows-3"
        >
          {STEPS.map((step, i) => (
            <RevealItem key={step} as="li" className="flex items-start gap-4">
              <span className="flex size-[30px] flex-none items-center justify-center rounded-full border border-line-strong bg-white text-[12px] leading-none font-semibold text-ink-muted">
                {i + 1}
              </span>
              <p className="mt-1 mb-0 text-[15px] leading-[23px] text-ink-muted">
                {step}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.08} className="mt-8 flex flex-wrap items-center gap-4">
          <CtaLink href="/pilot">Start with a Pilot</CtaLink>
          <span className="text-[15px] leading-[22px] text-ink-soft">
            Best suited to agencies producing recurring reels and static posts
            for D2C clients.
          </span>
        </Reveal>
      </div>
    </Section>
  );
}
