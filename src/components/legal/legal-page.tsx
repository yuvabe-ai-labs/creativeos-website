import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SITE } from "@/lib/site";

export type TocEntry = { id: string; label: string };

/**
 * Shell for the Privacy Policy and Terms.
 *
 * These two pages must stay publicly reachable with no login wall — Meta App
 * Review fetches them anonymously, and a redirect to a sign-in screen is a
 * rejection. Do not put them behind middleware, auth, or a `noindex`.
 */
export function LegalPage({
  title,
  summary,
  toc,
  children,
}: {
  title: string;
  summary: string;
  toc: TocEntry[];
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="w-full">
        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-[1240px] px-8 pt-20 pb-14">
            <Reveal>
              <div className="text-[12px] leading-[1.4] font-medium tracking-[0.22em] text-ink-soft uppercase">
                Legal
              </div>
              <h1 className="font-display mt-6 mb-0 max-w-[20ch] text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.06] font-semibold tracking-[-0.025em] text-ink">
                {title}
              </h1>
              <p className="mt-6 mb-0 max-w-[62ch] text-[18px] leading-[28px] text-ink-muted text-pretty">
                {summary}
              </p>
              <p className="mt-6 mb-0 text-[14px] leading-[21px] text-ink-faint">
                Last updated {SITE.legalLastUpdated} · {SITE.product} is
                operated by {SITE.legalEntity}, {SITE.address}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-b border-line">
          <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-8 py-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <nav
              aria-label="On this page"
              className="top-28 h-max lg:sticky lg:block"
            >
              <div className="mb-4 text-[12px] leading-none font-medium tracking-[0.22em] text-ink-faint uppercase">
                On this page
              </div>
              <ol className="flex list-none flex-col gap-2.5 p-0">
                {toc.map((entry, i) => (
                  <li key={entry.id} className="flex gap-2.5">
                    <span className="text-[13px] leading-5 text-ink-faint tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link
                      href={`#${entry.id}`}
                      className="text-[13px] leading-5 text-ink-muted hover:text-purple"
                    >
                      {entry.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="legal-prose">{children}</article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
