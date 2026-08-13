import { CanvasLoop } from "@/components/diagrams/canvas-loop";
import { ToolSprawlPentagon } from "@/components/diagrams/tool-sprawl-pentagon";
import { Reveal } from "@/components/motion/reveal";
import { ComparisonCard, ComparisonGrid } from "@/components/site/comparison-card";
import { Section, SectionHeading, SectionLede } from "@/components/site/section";

export function ToolSprawl() {
  return (
    <Section
      id="tools"
      index="02"
      eyebrow="Any edit means jumping between platforms"
      className="bg-white"
    >
      <div>
        <Reveal>
          <SectionHeading className="max-w-[20ch]">
            One asset, five tools.
          </SectionHeading>
          <SectionLede>
            Script in one tool, images in another, video in a third. Every fix
            means re-briefing the brand from zero — on CreativeOS the whole
            pipeline lives on one canvas.
          </SectionLede>
        </Reveal>

        <ComparisonGrid>
          <ComparisonCard
            tone="today"
            title="Today — five tools"
            caption="Every fix bounces back across every platform — re-brief, re-upload, regenerate."
          >
            <ToolSprawlPentagon />
          </ComparisonCard>

          <ComparisonCard
            tone="creativeos"
            title="With CreativeOS"
            caption="An error found in review goes straight back — fixed on the same canvas, context intact."
          >
            <CanvasLoop />
          </ComparisonCard>
        </ComparisonGrid>
      </div>
    </Section>
  );
}
