import { ContextOnceChart } from "@/components/diagrams/context-once-chart";
import { ContextRebuiltChart } from "@/components/diagrams/context-rebuilt-chart";
import { Reveal } from "@/components/motion/reveal";
import {
  DiagramFrame,
  Section,
  SectionHeading,
  SectionLede,
} from "@/components/site/section";

/** Frosted pill floating over a chart, positioned as a share of chart height. */
function ChartCaption({ top, children }: { top: string; children: React.ReactNode }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/45 px-[22px] py-2.5 text-[15px] leading-[1.4] font-medium whitespace-nowrap text-ink-muted backdrop-blur-[10px]"
      style={{ top }}
    >
      {children}
    </div>
  );
}

function LegendItem({
  marker,
  className,
  children,
}: {
  marker?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      {marker}
      {children}
    </span>
  );
}

export function ContextCost() {
  return (
    <Section index="01" eyebrow="The hidden cost of AI production" className="bg-white">
      <Reveal>
        <SectionHeading className="max-w-[20ch]">
          Every new creative still starts from scratch.
        </SectionHeading>
        <SectionLede>
          Dozens of assets later, the knowledge still sits in chats, drives, and
          dashboards. Every new asset rebuilds the same context.
        </SectionLede>
      </Reveal>

      <Reveal delay={0.08}>
        <DiagramFrame className="mt-2 overflow-x-auto px-4 pt-[30px] pb-2">
          <div className="min-w-[720px]">
          <div className="relative">
            <ContextRebuiltChart />
            <ChartCaption top="70%">
              The same context, rebuilt for every single asset
            </ChartCaption>
          </div>

          <div className="flex items-center gap-4 px-[22px] py-[34px]">
            <span className="h-px flex-1 bg-line" />
            <span className="inline-flex items-center rounded-full border border-line bg-canvas px-4 py-2 text-[12px] leading-none font-semibold tracking-[0.14em] text-ink-soft">
              VS · WITH CREATIVEOS
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="relative">
            <ContextOnceChart />
            <ChartCaption top="86%">
              Context set once — every asset starts at the work
            </ChartCaption>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2.5 border-t border-line px-[22px] pt-3.5 pb-[18px] text-[14px] leading-[21px] text-ink-soft">
            <LegendItem
              marker={
                <span className="size-[9px] rounded-full border-2 border-steel bg-white" />
              }
            >
              Setup repeated for every asset
            </LegendItem>
            <LegendItem marker={<span className="size-[9px] rounded-full bg-purple" />}>
              The actual creative work
            </LegendItem>
            <LegendItem className="text-ink-faint">
              Set up once — every new asset starts at the work
            </LegendItem>
          </div>
          </div>
        </DiagramFrame>
      </Reveal>
    </Section>
  );
}
