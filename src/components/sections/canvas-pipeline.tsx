import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading, SectionLede } from "@/components/site/section";
import { CanvasPipelinePanels } from "@/components/sections/canvas-pipeline-panels";

/*
  Section 04, redone to the `CreativeOS Pipeline` draft in design-reference/:
  the today-vs-CreativeOS comparison cards (`ToolSprawl`, now retired from the
  page) gave way to three hover-expanding panels that walk the pipeline the
  cards only argued. Runs dark on the site's night ground — same staging as
  the workflow band, not v4's near-black — and the claim stays as the
  headline.
*/
export function CanvasPipeline() {
  return (
    <Section
      id="pipeline"
      index="04"
      eyebrow="Any edit means jumping between platforms"
      tone="dark"
    >
      <div>
        <Reveal>
          <SectionHeading className="max-w-[24ch] text-white">
            One canvas, not five tools.
          </SectionHeading>
          <SectionLede className="text-white/55">
            Script, posts, and reels live on the same canvas — every fix
            happens where the context already is.
          </SectionLede>
        </Reveal>

        <Reveal delay={0.08}>
          <CanvasPipelinePanels />
        </Reveal>
      </div>
    </Section>
  );
}
