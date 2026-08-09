import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { WorkflowLoop } from "@/components/diagrams/workflow-loop";
import { DiagramFrame, Section, SectionHeading } from "@/components/site/section";

/**
 * Stand-in for the source's `<image-slot>`, which ships empty in the Design
 * Canvas file — the canvas screenshot was never dropped into it. Pass `src` once
 * a real capture exists and the placeholder disappears.
 */
function ProductionCanvas({ src }: { src?: string }) {
  return (
    <div className="relative h-[560px] bg-surface">
      {src ? (
        <Image src={src} alt="The CreativeOS production canvas" fill className="object-cover" />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-ink-faint">
          <ImageIcon className="size-8" strokeWidth={1.4} aria-hidden="true" />
          <p className="m-0 text-[14px] leading-[21px]">
            A wide crop of the CreativeOS canvas goes here.
          </p>
        </div>
      )}
    </div>
  );
}

export function Workflow() {
  return (
    <Section
      id="workflow"
      index="03"
      eyebrow="From signal to approved asset"
      className="bg-[linear-gradient(to_right,rgba(148,163,184,.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.025)_1px,transparent_1px)] bg-[length:72px_72px]"
    >
      <div>
        <SectionHeading className="max-w-[22ch]">
          One connected workflow for reels and static posts.
        </SectionHeading>

        <DiagramFrame className="mt-[52px] overflow-x-auto px-4 py-7">
          <div className="min-w-[720px]">
            <WorkflowLoop />
          </div>
        </DiagramFrame>

        <div className="mt-9 overflow-hidden rounded-[16px] border border-line bg-white shadow-[0_6px_16px_rgba(11,15,25,0.08)]">
          <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
            <span className="size-[9px] rounded-full bg-line" />
            <span className="size-[9px] rounded-full bg-line" />
            <span className="size-[9px] rounded-full bg-line" />
            <span className="ml-2 text-[12px] leading-none text-ink-faint">
              The production canvas
            </span>
          </div>
          <ProductionCanvas />
        </div>
      </div>
    </Section>
  );
}
