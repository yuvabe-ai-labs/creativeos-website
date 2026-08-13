import { ContextRepeatSnake } from "@/components/diagrams/context-repeat-snake";
import { ContextSetOnce } from "@/components/diagrams/context-set-once";
import { Reveal } from "@/components/motion/reveal";
import { ComparisonCard, ComparisonGrid } from "@/components/site/comparison-card";
import { Section, SectionHeading, SectionLede } from "@/components/site/section";

export function ContextCost() {
  return (
    <Section index="01" eyebrow="The hidden cost of AI production" className="bg-white">
      <div>
        <Reveal>
          <SectionHeading className="max-w-[20ch]">
            Every new creative still starts from scratch.
          </SectionHeading>
          <SectionLede>
            Dozens of assets later, the knowledge still sits in chats, drives, and
            dashboards. Every new asset rebuilds the same context.
          </SectionLede>
        </Reveal>

        <ComparisonGrid divider>
          <ComparisonCard
            bare
            tone="today"
            title="Today — set context for every reel"
            stat={{ value: "3×", label: "context setup, for 3 reels" }}
            caption="Context needs to be set every time for a new asset."
          >
            <ContextRepeatSnake />
          </ComparisonCard>

          <ComparisonCard
            bare
            tone="creativeos"
            title="CreativeOS — set once, run parallel"
            stat={{ value: "1×", label: "context setup, for 3 reels" }}
            caption="Inputs set once — all three reels generate in parallel, a fraction of the time."
          >
            <ContextSetOnce />
          </ComparisonCard>
        </ComparisonGrid>
      </div>
    </Section>
  );
}
