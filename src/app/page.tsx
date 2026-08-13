import { ContextWeb } from "@/components/sections/context-web";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { HeroFlora } from "@/components/sections/hero-flora";
import { MarketSignals } from "@/components/sections/market-signals";
import { Pilot } from "@/components/sections/pilot";
import { Pricing } from "@/components/sections/pricing";
import { ReviewCheckpoint } from "@/components/sections/review-checkpoint";
import { ToolSprawl } from "@/components/sections/tool-sprawl";
import { Workflow } from "@/components/sections/workflow";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/**
 * Section order follows `CreativeOS Home v2` in design-reference/: the three
 * problem bands (01 cost of re-setup, 02 tool sprawl, 03 late errors) land
 * before the product answer (04 workflow, 05 market signals). Pricing is
 * site-only — the deck has never carried it — and sits after the pilot ask.
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader tone="dark" />
      <main className="w-full">
        <HeroFlora />
        <ContextWeb />
        <ToolSprawl />
        <ReviewCheckpoint />
        <Workflow />
        <MarketSignals />
        <Pilot />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
