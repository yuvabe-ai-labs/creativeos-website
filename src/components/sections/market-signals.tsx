import { SignalLens } from "@/components/diagrams/signal-lens";
import { Reveal } from "@/components/motion/reveal";
import {
  ScrollHint,
  Section,
  SectionHeading,
  SectionLede,
} from "@/components/site/section";

export function MarketSignals() {
  return (
    <Section
      id="market"
      index="02"
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
          {/*
            The lens draws straight on the washed canvas — no panel.

            Its labels are set to render at ~14px against a 1080-unit viewBox,
            so it cannot simply shrink to a phone: under ~720px the type stops
            being readable and it scrolls sideways instead. Two things make
            that scroll honest rather than a silent crop — the strip runs
            edge-to-edge (negative margins cancel the section gutter, so the
            diagram visibly continues past the screen instead of stopping at a
            padding line), and a hint sits under it. The hint is hidden by a
            container query the moment the section is wide enough to show the
            whole lens, so it never lies.
          */}
          <div className="mt-9 @container sm:mt-11">
            <div
              data-signal-flow
              className="-mx-5 overflow-x-auto px-5 [-webkit-overflow-scrolling:touch] sm:-mx-8 sm:px-8"
            >
              <div className="min-w-[720px]">
                <SignalLens />
              </div>
            </div>
            <ScrollHint className="@min-[720px]:hidden">
              Scroll to follow the signals through
            </ScrollHint>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
