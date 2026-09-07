"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

/*
  The phone-width nav.

  There are only two links, so this is a disclosure rather than a drawer: the
  header stays one 64px bar and the sheet drops from its underside on the same
  ground, hairline-separated. No overlay, no scroll lock, no focus trap — the
  sheet is two links tall and the page behind it is not obscured. The CTA is
  deliberately absent here — it never leaves the bar above, so repeating it
  would only push the two links it exists to reveal further down.

  Hash links close it by navigating; the browser handles the scroll (see the
  note in site-header.tsx), so there is nothing to intercept — the click
  handler only has to put the sheet away.
*/
export function SiteNavToggle({
  items,
  dark,
}: {
  items: ReadonlyArray<{ label: string; href: string }>;
  dark: boolean;
}) {
  const [open, setOpen] = useState(false);

  // A rotation to landscape can cross the `sm` breakpoint with the sheet up,
  // which would leave it stranded under a nav that is now inline.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 640px)");
    const close = () => setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="site-nav-sheet"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "-mr-2 inline-flex size-11 items-center justify-center rounded-lg transition-colors sm:hidden",
          dark
            ? "text-white/70 hover:bg-white/10 hover:text-white"
            : "text-ink-muted hover:bg-surface hover:text-ink",
        )}
      >
        {open ? (
          <X className="size-5" strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <Menu className="size-5" strokeWidth={1.8} aria-hidden="true" />
        )}
      </button>

      <div
        id="site-nav-sheet"
        hidden={!open}
        className={cn(
          // Opaque, not the header's translucent ground: the sheet drops over
          // the hero's photo scatter, and at 95% the images read straight
          // through the link text.
          "absolute top-full right-0 left-0 border-b sm:hidden",
          dark ? "border-white/10 bg-night" : "border-line bg-canvas",
        )}
      >
        <nav className="mx-auto flex max-w-[1240px] flex-col px-5 py-1">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex min-h-12 items-center text-[15px] font-medium",
                dark
                  ? "text-white/75 hover:text-white"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
