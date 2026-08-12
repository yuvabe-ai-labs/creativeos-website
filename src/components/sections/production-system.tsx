import { GlyphImprovesNextCycle } from "@/components/diagrams/glyph-improves-next-cycle";
import { GlyphOrganisedLikeAgency } from "@/components/diagrams/glyph-organised-like-agency";
import { GlyphPreservesJourney } from "@/components/diagrams/glyph-preserves-journey";
import { GlyphStartsWithContext } from "@/components/diagrams/glyph-starts-with-context";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Section, SectionHeading, SectionLede } from "@/components/site/section";

const CAPABILITIES = [
  {
    title: "Starts with context",
    body: "Every generation begins from accumulated brand and production knowledge, not a blank prompt.",
    Glyph: GlyphStartsWithContext,
  },
  {
    title: "Organised like your agency",
    body: "Work lives under brands, campaigns, and assets — not scattered chats.",
    Glyph: GlyphOrganisedLikeAgency,
  },
  {
    title: "Preserves the journey",
    body: "Every attempt, edit, and approval stays attached to the asset that shipped.",
    Glyph: GlyphPreservesJourney,
  },
  {
    title: "Improves the next cycle",
    body: "Approved prompts, references, and settings carry into the next campaign.",
    Glyph: GlyphImprovesNextCycle,
  },
];

export function ProductionSystem() {
  return (
    <Section id="system" index="02" eyebrow="Not another AI generator">
      <div>
        <Reveal>
          <SectionHeading className="max-w-[22ch]">
            A production system that remembers how your agency works.
          </SectionHeading>
          <SectionLede>
            A chat remembers a conversation. CreativeOS remembers how your
            agency produces work for the brand.
          </SectionLede>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-x-16 gap-y-14 md:grid-cols-2">
          {CAPABILITIES.map(({ title, body, Glyph }) => (
            <RevealItem key={title} className="flex flex-col gap-4">
              <Glyph />
              <div className="px-2">
                <div className="text-[17px] leading-6 font-semibold text-ink">
                  {title}
                </div>
                <p className="mt-2 mb-0 text-[15px] leading-[23px] text-ink-soft text-pretty">
                  {body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
