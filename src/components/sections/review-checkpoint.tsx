import { CheckpointNone } from "@/components/diagrams/checkpoint-none";
import { CheckpointReview } from "@/components/diagrams/checkpoint-review";
import { Reveal } from "@/components/motion/reveal";
import { ComparisonCard, ComparisonGrid } from "@/components/site/comparison-card";
import { Section, SectionHeading, SectionLede } from "@/components/site/section";

export function ReviewCheckpoint() {
  return (
    <Section index="03" eyebrow="Catch errors while they are cheap" className="bg-white">
      <div>
        <Reveal>
          <SectionHeading className="max-w-[22ch]">
            Catch mistakes early, before they get expensive.
          </SectionHeading>
          <SectionLede>
            The same mistake costs a few credits in an image — and a full batch
            in video. CreativeOS adds a senior review checkpoint before any video
            is generated.
          </SectionLede>
        </Reveal>

        <ComparisonGrid>
          <ComparisonCard
            tone="today"
            title="Today — no checkpoint"
            caption="A flawed image slips through — errors caught later are 4x more expensive."
          >
            <CheckpointNone />
          </ComparisonCard>

          <ComparisonCard
            tone="creativeos"
            title="With CreativeOS"
            caption="Review sits before video — the error is fixed once, at the image."
          >
            <CheckpointReview />
          </ComparisonCard>
        </ComparisonGrid>
      </div>
    </Section>
  );
}
