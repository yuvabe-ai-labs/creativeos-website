import { CheckpointLanes } from "@/components/diagrams/checkpoint-lanes";
import {
  DiagramFrame,
  Section,
  SectionHeading,
  SectionLede,
} from "@/components/site/section";

const STATS = [
  { value: "2x", label: "reduction in production cost" },
  { value: "75%", label: "less production time" },
];

const PILLS = [
  "Catch product errors early",
  "Protect video credits",
  "Senior oversight at the right stage",
  "Corrections stay visible to the team",
];

export function ReviewCheckpoint() {
  return (
    <Section index="04" eyebrow="Catch errors while they are cheap" className="bg-white">
      <div>
        <SectionHeading className="max-w-[22ch]">
          Catch mistakes early, before they get expensive.
        </SectionHeading>
        <SectionLede>
          The same mistake costs a few credits in an image — and a full batch in
          video. CreativeOS adds a senior review checkpoint before any video is
          generated.
        </SectionLede>

        <DiagramFrame className="mt-11 overflow-x-auto px-4 pt-[26px] pb-1.5">
          <div className="min-w-[720px]">
            <CheckpointLanes />
          </div>
        </DiagramFrame>

        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {STATS.map((stat) => (
            <div key={stat.value} className="border-t-2 border-purple pt-[18px]">
              <div className="font-display text-[44px] leading-none font-semibold tracking-[-0.02em] text-ink">
                {stat.value}
              </div>
              <p className="mt-2 mb-0 text-[15px] leading-[23px] text-ink-soft">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {PILLS.map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center rounded-full border border-line bg-surface px-[15px] py-[9px] text-[13px] leading-[1.4] font-medium text-ink-muted"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
