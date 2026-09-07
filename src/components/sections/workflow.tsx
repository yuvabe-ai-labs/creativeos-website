import { WorkflowCapsuleLoop } from "@/components/diagrams/workflow-capsule-loop";
import { Reveal } from "@/components/motion/reveal";
import { ScrollHint, Section, SectionHeading } from "@/components/site/section";

const DEMO_VIDEO_SRC =
  "https://storage.googleapis.com/creativeos-assets/demo-assets/Demo(comp).mp4";

/**
 * Stand-in for the source's `<image-slot>`, which ships empty in the Design
 * Canvas file — the canvas screenshot was never dropped into it. Now filled
 * with a screen-capture demo of the production canvas.
 */
function ProductionCanvas() {
  return (
    // Aspect-ratio rather than a fixed height: the capture is a wide screen
    // recording, and `object-cover` in a 560px-tall box on a phone crops it to
    // a vertical sliver of the canvas. It keeps the fixed height from `lg`,
    // where 560px and the column width are already close to 16:9.
    <div className="relative aspect-[16/10] bg-[#120d26] lg:aspect-auto lg:h-[560px]">
      <video
        src={DEMO_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        controls
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/*
  The section runs dark: the loop draws directly on the night canvas — no
  panel — the same staging as the hero, with the dot grid vignetted behind
  the capsule and one purple wash off the top-right corner.
*/
export function Workflow() {
  return (
    <Section
      id="workflow"
      index="03"
      eyebrow="How it works"
      tone="dark"
      className="[background-image:radial-gradient(52%_44%_at_84%_0%,rgba(88,41,199,.28),transparent),radial-gradient(rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:auto,26px_26px]"
    >
      <div>
        <Reveal>
          <SectionHeading className="max-w-[22ch] text-white">
            Work compounds instead of restarting.
          </SectionHeading>
        </Reveal>

        {/*
          The capsule loop from Sales Deck slide 03, straight on the canvas. Its
          viewBox is 1560x560 and the stage labels sit at 19-20px, so it needs
          real width to stay legible — below ~860px it scrolls sideways rather
          than shrinking the type. The strip is pulled out to the screen edges
          on the way, so the loop visibly continues past the viewport instead
          of stopping dead at the gutter.
        */}
        <Reveal delay={0.08}>
          <div className="mt-10 @container sm:mt-[52px]">
            <div
              data-signal-flow
              className="-mx-5 overflow-x-auto px-5 [-webkit-overflow-scrolling:touch] sm:-mx-8 sm:px-8"
            >
              <div className="min-w-[860px] px-4 py-6">
                <WorkflowCapsuleLoop tone="dark" />
              </div>
            </div>
            {/* Hidden by container query the moment the whole loop fits, so it
                only ever appears when there really is more to the right. */}
            <ScrollHint tone="dark" className="@min-[860px]:hidden">
              Scroll to follow the full loop
            </ScrollHint>
          </div>
        </Reveal>

        {/* The one framed thing in the band: the window awaiting the real
            canvas capture, drawn as night glass rather than the light panel. */}
        <Reveal delay={0.08}>
          <div className="mt-9 overflow-hidden rounded-[16px] bg-[#1a1237] shadow-[0_24px_70px_rgba(0,0,0,.35)] ring-1 ring-white/10">
            <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-3.5">
              <span className="size-[9px] rounded-full bg-white/15" />
              <span className="size-[9px] rounded-full bg-white/15" />
              <span className="size-[9px] rounded-full bg-white/15" />
              <span className="ml-2 text-[12px] leading-none text-white/40">
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
