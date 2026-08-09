import { ContextCost } from "@/components/sections/context-cost";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { MarketSignals } from "@/components/sections/market-signals";
import { Pilot } from "@/components/sections/pilot";
import { ProductionSystem } from "@/components/sections/production-system";
import { ReviewCheckpoint } from "@/components/sections/review-checkpoint";
import { Workflow } from "@/components/sections/workflow";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full">
        <Hero />
        <ContextCost />
        <ProductionSystem />
        <Workflow />
        <ReviewCheckpoint />
        <MarketSignals />
        <Pilot />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
