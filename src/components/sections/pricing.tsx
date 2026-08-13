import { Check } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaLink } from "@/components/site/cta-link";
import {
  DiagramFrame,
  Section,
  SectionHeading,
} from "@/components/site/section";
import { cn } from "@/lib/utils";

/**
 * Reel allowances assume the 15-second Smart Render length. The source package
 * deck quoted 30–35 second reels at half these counts; halving the length
 * doubles what a month's credits buy, so Creator went 3 → 6 and Studio 8 → 16.
 *
 * Nothing in the product sells a subscription yet — there is no checkout, no
 * billing and no signup — so both priced plans lead to the pilot application
 * rather than a purchase flow that does not exist. Revisit these CTAs when
 * billing lands.
 */
type Plan = {
  name: string;
  positioning: string;
  price: string;
  /** Omitted on the custom plan, which quotes no recurring figure. */
  cadence?: string;
  features: readonly string[];
  cta: { label: string; href: string };
  /** Draws the purple border and the "Most popular" flag. Exactly one plan. */
  featured?: boolean;
};

const PLANS: readonly Plan[] = [
  {
    name: "Creator",
    positioning: "Create consistently.",
    price: "₹5,599",
    cadence: "/ month",
    features: [
      "25 static posts / month",
      "6 reels / month (15 sec, Smart Render)",
      "20,000 generation credits",
      "1 brand workspace",
      "1 user",
      "Brand memory and the self-learning agent",
      "Basic asset library and usage analytics",
      "Email support",
    ],
    cta: { label: "Start with a pilot", href: "/pilot?plan=creator" },
  },
  {
    name: "Studio",
    positioning: "Scale a content team.",
    price: "₹14,199",
    cadence: "/ month",
    featured: true,
    features: [
      "60 static posts / month",
      "16 reels / month (15 sec, Smart Render)",
      "52,000 generation credits",
      "4 brand workspaces",
      "5 users",
      "Everything in Creator, plus the approval workflow",
      "Shared asset library and team usage analytics",
      "Priority support",
    ],
    cta: { label: "Start with a pilot", href: "/pilot?plan=studio" },
  },
  {
    name: "Custom",
    positioning: "Run multiple client brands.",
    price: "Let's talk",
    features: [
      "Tailored static-post volume",
      "Tailored reel volume",
      "Tailored generation credits",
      "From 10 brand workspaces",
      "From 15 users",
      "Everything in Studio, plus advanced approval workflow",
      "Per-brand and per-user analytics and credit controls",
      "Priority support and onboarding",
    ],
    cta: { label: "Talk to us", href: "/pilot?plan=custom" },
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <RevealItem className="h-full">
      <DiagramFrame
        className={cn(
          "flex h-full flex-col p-7",
          // The featured plan stands out by border colour alone. A drop shadow
          // lifted it off the page harder than anything else on the site, which
          // read as a different design language rather than emphasis.
          plan.featured && "border-purple",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display m-0 text-[20px] leading-none font-semibold tracking-[-0.01em] text-ink">
            {plan.name}
          </h3>
          {plan.featured ? (
            <span className="rounded-full bg-purple/10 px-2.5 py-1 text-[11px] leading-none font-medium tracking-[0.12em] text-purple uppercase">
              Most popular
            </span>
          ) : null}
        </div>

        <p className="mt-2 mb-0 text-[14px] leading-[21px] text-ink-soft">
          {plan.positioning}
        </p>

        <div className="mt-6 flex items-baseline gap-1.5">
          <span className="font-display text-[34px] leading-none font-semibold tracking-[-0.03em] text-ink">
            {plan.price}
          </span>
          {plan.cadence ? (
            <span className="text-[14px] leading-none text-ink-soft">
              {plan.cadence}
            </span>
          ) : null}
        </div>

        <CtaLink
          href={plan.cta.href}
          tone={plan.featured ? "solid" : "outline"}
          className="mt-6 w-full justify-center"
        >
          {plan.cta.label}
        </CtaLink>

        <ul className="mt-7 flex list-none flex-col gap-3 border-t border-line p-0 pt-7">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check
                className="mt-[3px] size-4 flex-none text-purple"
                strokeWidth={2.4}
                aria-hidden="true"
              />
              <span className="text-[14px] leading-[21px] text-ink-muted">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </DiagramFrame>
    </RevealItem>
  );
}

export function Pricing() {
  return (
    /*
      No `bg-white` here, unlike its neighbours: the cards are white, and a
      white band would erase them.
    */
    <Section id="pricing" index="07" eyebrow="Plans and pricing">
      <div>
        <Reveal>
          <SectionHeading className="max-w-[20ch]">
            Priced by the volume you actually produce.
          </SectionHeading>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </RevealGroup>

        <Reveal delay={0.08}>
          <p className="mt-8 mb-0 text-[14px] leading-[21px] text-ink-soft">
            Annual billing saves 10%. Prices are in INR and exclude applicable
            taxes.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
