import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The side-by-side "today vs. CreativeOS" card used by sections 02 and 03.
 *
 * Both sections make the same argument in the same shape — a labelled dot, an
 * animated diagram that fills the remaining height, and a one-line caption —
 * so the chrome lives here and each section supplies only its diagram and copy.
 * The card *is* the `RevealItem`, so it stays a direct grid child: an extra
 * wrapper would break `items-stretch` and drop the two captions out of line.
 */
export function ComparisonCard({
  title,
  tone,
  caption,
  children,
}: {
  title: string;
  /** `today` is the muted control; `creativeos` is the purple treatment. */
  tone: "today" | "creativeos";
  caption: string;
  children: React.ReactNode;
}) {
  const isProduct = tone === "creativeos";

  return (
    <RevealItem className="flex flex-col rounded-[16px] border border-line bg-white px-6 pt-[22px] pb-[18px] shadow-[0_8px_20px_rgba(11,15,25,0.06)]">
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

      <div data-signal-flow className="flex flex-1 items-center">
        {children}
      </div>

      <p className="mt-2 mb-0 text-center text-[14px] leading-[21px] text-ink-soft">
        {caption}
      </p>
    </RevealItem>
  );
}

/** The two-up grid the cards sit in. Stacks below `md`. */
export function ComparisonGrid({ children }: { children: React.ReactNode }) {
  return (
    <RevealGroup className="mt-11 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
      {children}
    </RevealGroup>
  );
}
