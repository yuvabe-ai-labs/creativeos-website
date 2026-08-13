import { SignalLens } from "@/components/diagrams/signal-lens";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading, SectionLede } from "@/components/site/section";

export function MarketSignals() {
  return (
    <Section id="market" index="04" eyebrow="Connected to what is changing" className="bg-white">
      <div>
        <Reveal>
          <SectionHeading className="max-w-[22ch]">
            Turn market signals into brand-relevant creative directions.
          </SectionHeading>
          <SectionLede>
            From &ldquo;this format is trending&rdquo; to &ldquo;here is how it
            works for this brand.&rdquo;
          </SectionLede>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            data-signal-flow
            className="panel mt-11 overflow-x-auto px-4 pt-5 pb-2"
            style={{
              backgroundImage:
                "linear-gradient(135deg,#ffffff 0%,#fcfcfd 60%,#f7f5fc 100%)",
            }}
          >
            <div className="min-w-[720px]">
              <SignalLens />
            </div>
          </div>

          <p className="mt-6 mb-0 text-[14px] leading-[21px] text-ink-soft">
            Every signal keeps its source and date. Directions are informed by
            signals — not promised winners.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
