import * as React from "react";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * One half of a "today vs. CreativeOS" comparison — sections 01, 02 and 03.
 *
 * All three make the same argument in the same shape: a labelled dot, an
 * animated diagram that fills the remaining height, an optional figure, and a
 * one-line caption. The chrome lives here and each section supplies only its
 * diagram and copy.
 *
 * There is deliberately no boxed variant. An earlier version panelled 02 and 03
 * while 01 ran bare, which meant the page made the same argument three times in
 * two different visual languages. Unboxed also gives every drawing the column's
 * full width, which the small labels need.
 *
 * The card *is* the `RevealItem`, so it stays a direct grid child: an extra
 * wrapper would break `items-stretch` and drop the two captions out of line.
 */
export function ComparisonCard({
  title,
  tone,
  caption,
  stat,
  children,
}: {
  title: string;
  /** `today` is the muted control; `creativeos` is the purple treatment. */
  tone: "today" | "creativeos";
  caption: string;
  /**
   * A figure the drawing earns, shown under it. Section 01's whole claim is a
   * difference in cost, and that difference otherwise lives only in the
   * animation's duration — invisible in a screenshot, a deck, or to anyone who
   * scrolls past. This states it in a form that survives a still image.
   */
  stat?: { value: string; label: string };
  children: React.ReactNode;
}) {
  const isProduct = tone === "creativeos";

  return (
    <RevealItem className="flex flex-col">
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

      {stat ? (
        <div className="mt-4 flex items-baseline justify-center gap-2 border-t border-line pt-3.5">
          <span
            className={cn(
              "font-display text-[26px] leading-none font-semibold tracking-[-0.02em]",
              isProduct ? "text-purple" : "text-ink",
            )}
          >
            {stat.value}
          </span>
          <span className="text-[14px] leading-none text-ink-soft">{stat.label}</span>
        </div>
      ) : null}

      <p
        className={cn(
          "mb-0 text-center text-[14px] leading-[21px] text-ink-soft",
          stat ? "mt-2" : "mt-4",
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
      {/* A chip rather than bare type: at 11px between two full-height rules,
          the word was reading as a stray label. The ring gives the rule a
          deliberate break, and the purple marks it as ours rather than as
          incidental furniture. No tracking — it fights optical centring in a
          circle this small. */}
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-white text-[11px] leading-none font-semibold text-purple">
        VS
      </span>
      <span className="h-px w-full flex-1 bg-line md:h-auto md:w-px" />
    </div>
  );
}

/**
 * The two-up grid, with the `VS` rule always between the halves. Stacks below
 * `md`, where the rule turns horizontal and does the same job.
 *
 * Without card edges, the rule is what tells the eye where one side ends and
 * the other begins — so it is not optional. It is also the thing that names the
 * relationship: two drawings side by side are a comparison only if something
 * says so.
 */
export function ComparisonGrid({ children }: { children: React.ReactNode }) {
  const halves = React.Children.toArray(children);

  return (
    <RevealGroup className="mt-11 grid grid-cols-1 items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-8">
      {halves.length === 2
        ? [halves[0], <VersusDivider key="vs" />, halves[1]]
        : children}
    </RevealGroup>
  );
}
