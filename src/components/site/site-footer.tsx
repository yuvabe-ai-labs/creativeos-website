import Image from "next/image";
import Link from "next/link";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Pricing", href: "/#pricing" },
      { label: "Reels", href: "/#workflow" },
      { label: "Static posts", href: "/#workflow" },
      { label: "Market intelligence", href: "/#market" },
      { label: "Production learning", href: "/#system" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Yuvabe Studios", href: "https://yuvabe.com" },
      { label: "Pilot programme", href: "/pilot" },
      { label: "Contact", href: `mailto:${SITE.contactEmail}` },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      // Meta App Review looks for a reachable deletion route from the policy;
      // this shortcut points at the section that documents it.
      { label: "Data deletion", href: "/privacy#deletion" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-night bg-[linear-gradient(180deg,#1a1237_0%,#0f0c22_100%)]">
      <RevealGroup className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-8 pt-16 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <RevealItem>
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="block size-2.5 rounded-[3px] bg-purple" />
            <span className="font-display text-[19px] leading-none font-medium tracking-[-0.02em] text-white">
              CreativeOS
            </span>
          </div>
          <p className="mt-0 mb-6 max-w-[34ch] text-[14px] leading-[21px] text-white/55">
            A market-connected creative production system for high-volume D2C
            agencies.
          </p>
          {/* The source mark is dark-on-transparent; invert it for the night footer. */}
          <Image
            src="/assets/yuvabe-logo.png"
            alt="Yuvabe Studios"
            width={171}
            height={28}
            className="block h-7 w-auto opacity-80 [filter:invert(1)_brightness(2)]"
          />
        </RevealItem>

        {COLUMNS.map((column) => (
          <RevealItem key={column.heading} className="flex flex-col gap-3">
            <div className="mb-1 text-[12px] leading-none font-medium tracking-[0.22em] text-white/40 uppercase">
              {column.heading}
            </div>
            {column.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] leading-none text-white/75 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mx-auto max-w-[1240px] px-8 pb-10">
        <div className="border-t border-white/10 pt-6 text-[13px] leading-none text-white/40">
          © 2026 Yuvabe Studios. Auroville, India.
        </div>
      </div>
    </footer>
  );
}
