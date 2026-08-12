import Link from "next/link";

import { CtaLink } from "@/components/site/cta-link";

/*
  Hrefs are root-relative (`/#workflow`, not `#workflow`) so the links resolve
  from /pilot, /privacy and /terms as well as from the homepage. A bare hash
  resolves against the current route and silently scrolls nowhere.
*/
const NAV = [
  { label: "How it works", href: "/#workflow" },
  { label: "Pricing", href: "/#pricing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/92 backdrop-blur-[10px]">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-8">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <span className="block size-2.5 rounded-[3px] bg-purple" />
          <span className="font-display text-[19px] leading-none font-medium tracking-[-0.02em]">
            CreativeOS
          </span>
        </Link>

        <nav className="flex items-center gap-[30px]">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hidden text-[14px] leading-none font-medium text-ink-muted hover:text-ink sm:inline"
            >
              {item.label}
            </Link>
          ))}
          <CtaLink href="/pilot" size="compact">
            Apply for a Pilot
          </CtaLink>
        </nav>
      </div>
    </header>
  );
}
