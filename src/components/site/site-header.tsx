import Link from "next/link";

import { CtaLink } from "@/components/site/cta-link";
import { cn } from "@/lib/utils";

/*
  Hrefs are root-relative (`/#workflow`, not `#workflow`) so the links resolve
  from /pilot, /privacy and /terms as well as from the homepage. A bare hash
  resolves against the current route and silently scrolls nowhere.
*/
const NAV = [
  { label: "How it works", href: "/#workflow" },
  { label: "Pricing", href: "/#pricing" },
];

type SiteHeaderProps = {
  /** `dark` sits the header on the night hero; `light` is the default chrome. */
  tone?: "light" | "dark";
};

export function SiteHeader({ tone = "light" }: SiteHeaderProps) {
  const dark = tone === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-[10px]",
        dark ? "border-white/10 bg-night/85" : "border-line bg-canvas/92",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-8">
        <Link href="/" className={dark ? "text-white" : "text-ink"}>
          <span className="font-display text-[19px] leading-none font-medium tracking-[-0.02em]">
            Creative
            <span
              className={
                dark
                  ? "text-[#7343e3] [text-shadow:0_0_16px_rgba(115,67,227,.6)]"
                  : "text-purple"
              }
            >
              OS
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-[30px]">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "hidden text-[14px] leading-none font-medium sm:inline",
                dark
                  ? "text-white/65 hover:text-white"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <CtaLink
            href="/pilot"
            size="compact"
            className={cn(dark && "rounded-full bg-yellow text-ink hover:bg-[#ffd75c]")}
          >
            Start with a Pilot
          </CtaLink>
        </nav>
      </div>
    </header>
  );
}
