import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { WorkflowCapsuleLoop } from "@/components/diagrams/workflow-capsule-loop";
import { Reveal } from "@/components/motion/reveal";
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
      eyebrow="How it works"
      className="bg-[linear-gradient(to_right,rgba(148,163,184,.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.025)_1px,transparent_1px)] bg-[length:72px_72px]"
    >
      <div>
        <Reveal>
          <SectionHeading className="max-w-[22ch]">
            Work compounds instead of restarting.
          </SectionHeading>
        </Reveal>

        {/*
          The capsule loop from Sales Deck slide 03. Its viewBox is 1560x560 and
          the stage labels sit at 19-20px, so it needs real width to stay legible
          — below ~860px the frame scrolls rather than shrinking the type.
        */}
        <Reveal delay={0.08}>
          <DiagramFrame
            data-signal-flow
            className="mt-[52px] overflow-x-auto px-4 py-9"
          >
            <div className="min-w-[860px]">
              <WorkflowCapsuleLoop />
            </div>
          </DiagramFrame>
        </Reveal>

        <Reveal delay={0.08}>
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
        </Reveal>
      </div>
    </Section>
  );
}
