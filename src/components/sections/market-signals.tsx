import { SignalLens } from "@/components/diagrams/signal-lens";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading, SectionLede } from "@/components/site/section";

export function MarketSignals() {
  return (
    <Section
      id="market"
      index="04"
      eyebrow="Connected to what is changing"
      className="bg-white [background-image:radial-gradient(60%_52%_at_86%_16%,rgba(150,136,192,.24),transparent),radial-gradient(48%_42%_at_8%_88%,rgba(255,202,45,.16),transparent),radial-gradient(rgba(148,163,184,.2)_1px,transparent_1px)] [background-size:auto,auto,26px_26px]"
    >
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
          {/* The lens draws straight on the washed canvas — no panel. */}
          <div data-signal-flow className="mt-11 overflow-x-auto">
            <div className="min-w-[720px]">
              <SignalLens />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
