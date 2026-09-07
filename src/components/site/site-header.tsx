import Link from "next/link";

import { CtaLink } from "@/components/site/cta-link";
import { SiteNavToggle } from "@/components/site/site-nav-toggle";
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
        // `relative` anchors the phone nav sheet, which drops from the bar's
        // underside rather than covering the page.
        "relative sticky top-0 z-40 border-b backdrop-blur-[10px]",
        dark ? "border-white/10 bg-night/85" : "border-line bg-canvas/92",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 sm:h-[72px] sm:gap-6 sm:px-8">
        <Link href="/" className={dark ? "text-white" : "text-ink"}>
          <span className="font-display text-[17px] leading-none font-medium tracking-[-0.02em] sm:text-[19px]">
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

        <nav className="flex items-center gap-5 sm:gap-[30px]">
          {/* Hash links are native <a>s — the client router is unreliable at
              scrolling to same-page fragments; the browser always lands. */}
          {NAV.map((item) => {
            const Anchor = item.href.includes("#") ? "a" : Link;
            return (
              <Anchor
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
              </Anchor>
            );
          })}
          {/*
            The CTA stays in the bar at every width — it is the page's one
            persistent conversion point — but at 320px a wordmark, a labelled
            button and a menu control do not all fit at full size. So below
            `sm` it drops the arrow, tightens its padding and shortens its
            label, which is what buys the menu control its room.
          */}
          <CtaLink
            href="/pilot"
            size="compact"
            className={cn(
              "px-3 py-2.5 text-[13px] max-sm:gap-0 max-sm:[&>svg]:hidden sm:px-[18px] sm:py-[10px] sm:text-[14px]",
              dark && "rounded-full bg-yellow text-ink hover:bg-[#ffd75c]",
            )}
          >
            <span className="sm:hidden">Start a Pilot</span>
            <span className="hidden sm:inline">Start with a Pilot</span>
          </CtaLink>
          <SiteNavToggle items={NAV} dark={dark} />
        </nav>
      </div>
    </header>
  );
}
