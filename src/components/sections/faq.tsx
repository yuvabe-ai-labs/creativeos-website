import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/site/section";

const QUESTIONS = [
  {
    q: "Is this an image or video generator?",
    a: "CreativeOS is the production layer around generation. It brings brand context, references, market signals, prompts, controls, attempts, and approvals into one connected workflow.",
  },
  {
    q: "Does CreativeOS replace our existing models?",
    a: "Not necessarily. It can coordinate the models used by the agency while preserving the production context around their outputs.",
  },
  {
    q: "Does it automatically create finished reels?",
    a: "The initial product focuses on producing the prompts, images, frames, and video clips required for reels. Final timeline editing, audio syncing, and reel assembly remain in your existing editing software.",
  },
  {
    q: "How does it learn from our work?",
    a: "It captures reusable production information such as prompts, controls, references, edits, approved attempts, and rejected directions. This is not foundation-model training.",
  },
  {
    q: "How is it connected to market trends?",
    a: "CreativeOS brings current D2C category, format, competitor, and cultural signals into creative planning. Each signal carries its source and freshness.",
  },
  {
    q: "Does it guarantee better-performing content?",
    a: "No. Market and production context can improve relevance and reduce production waste, but campaign performance depends on media, audience, offer, creative quality, and other factors.",
  },
  {
    q: "Is one client's information isolated from another?",
    a: "Each client has a separate brand workspace and context boundary. Stronger security claims will be published once the underlying controls are implemented.",
  },
  {
    q: "Will designers lose control?",
    a: "No. Designers select directions, references, controls, edits, and approved outputs. CreativeOS reduces repeated setup and context reconstruction.",
  },
];

export function Faq() {
  return (
    <Section index="07" eyebrow="Questions">
      {/*
        The source used independent <details> elements, so each row opens on its
        own — `type="multiple"` reproduces that. The 1px gap over a grey backdrop
        is what draws the hairline dividers.
      */}
      <Reveal>
        <Accordion
          type="multiple"
          className="gap-px overflow-hidden rounded-[16px] border border-line bg-line"
        >
          {QUESTIONS.map(({ q, a }) => (
            <AccordionItem key={q} value={q} className="border-b-0 bg-white not-last:border-b-0">
              <AccordionTrigger className="rounded-none px-[26px] py-[22px] text-[16px] leading-6 font-semibold text-ink hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="max-w-[70ch] px-[26px] pt-0 pb-[22px] text-[15px] leading-[23px] text-ink-soft">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
