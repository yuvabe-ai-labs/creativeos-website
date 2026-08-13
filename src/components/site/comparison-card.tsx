import * as React from "react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The side-by-side "today vs. CreativeOS" card used by sections 01 to 03.
 *
 * All three make the same argument in the same shape — a labelled dot, an
 * animated diagram that fills the remaining height, and a one-line caption —
 * so the chrome lives here and each section supplies only its diagram and copy.
 * The card *is* the `RevealItem`, so it stays a direct grid child: an extra
 * wrapper would break `items-stretch` and drop the two captions out of line.
 */
export function ComparisonCard({
  title,
  tone,
  caption,
  bare = false,
  children,
}: {
  title: string;
  /** `today` is the muted control; `creativeos` is the purple treatment. */
  tone: "today" | "creativeos";
  caption: string;
  /**
   * Drops the panel — no border, fill, shadow or inset — so the drawing gets
   * the column's full width. Section 01's diagrams carry small labels that need
   * every pixel; 02 and 03 are shapes and logos that read fine boxed.
   */
  bare?: boolean;
  children: React.ReactNode;
}) {
  const isProduct = tone === "creativeos";

  return (
    <RevealItem
      className={cn(
        "flex flex-col",
        !bare &&
          "rounded-[16px] border border-line bg-white px-6 pt-[22px] pb-[18px] shadow-[0_8px_20px_rgba(11,15,25,0.06)]",
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn("size-2 rounded-full", isProduct ? "bg-purple" : "bg-ink-faint")}
        />
        <span
          className={cn(
            "text-[16px] leading-[1.3] font-semibold",
            isProduct ? "text-purple-deep" : "text-ink-muted",
          )}
        >
          {title}
        </span>
      </div>

      {/* The drawings carry their own labels right up to their top edge, so a
          diagram that fills its slot needs explicit room under the title. */}
      <div data-signal-flow className="flex flex-1 items-center pt-8">
        {children}
      </div>

      <p
        className={cn(
          "mt-2 mb-0 text-center text-[14px] leading-[21px] text-ink-soft",
          bare && "mt-4",
        )}
      >
        {caption}
      </p>
    </RevealItem>
  );
}

/**
 * A hairline with a `VS` marker, sitting between the two halves. Vertical on
 * the two-up layout, horizontal once the grid stacks — the rules use `flex-1`
 * in whichever direction the flex container is running, so one element covers
 * both cases.
 */
function VersusDivider() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-center gap-4 md:h-full md:flex-col"
    >
      <span className="h-px w-full flex-1 bg-line md:h-auto md:w-px" />
      <span className="shrink-0 text-[11px] leading-none font-semibold tracking-[0.16em] text-ink-faint">
        VS
      </span>
      <span className="h-px w-full flex-1 bg-line md:h-auto md:w-px" />
    </div>
  );
}

/**
 * The two-up grid the cards sit in. Stacks below `md`.
 *
 * `divider` adds the `VS` rule between them, which the bare (unboxed) layout
 * needs — without card edges there is otherwise nothing telling the eye where
 * one side ends and the other begins.
 */
export function ComparisonGrid({
  children,
  divider = false,
}: {
  children: React.ReactNode;
  divider?: boolean;
}) {
  const halves = React.Children.toArray(children);

  return (
    <RevealGroup
      className={cn(
        "mt-11 grid grid-cols-1 items-stretch gap-6",
        divider
          ? "md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-8"
          : "md:grid-cols-2",
      )}
    >
      {divider && halves.length === 2
        ? [halves[0], <VersusDivider key="vs" />, halves[1]]
        : children}
    </RevealGroup>
  );
}
