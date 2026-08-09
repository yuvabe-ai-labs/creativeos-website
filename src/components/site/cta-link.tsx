import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  /** `solid` is the purple primary action; `outline` is the paired secondary. */
  tone?: "solid" | "outline";
  /** `compact` is the smaller variant used in the sticky header. */
  size?: "default" | "compact";
  withArrow?: boolean;
  className?: string;
};

const TONE = {
  solid: "bg-purple text-white hover:bg-purple-deep",
  outline: "border-line-strong bg-white text-ink hover:bg-surface",
} as const;

const SIZE = {
  default: "gap-2 px-[26px] py-[15px] text-[15px]",
  compact: "gap-[7px] px-[18px] py-[10px] text-[14px]",
} as const;

/**
 * The design's call-to-action treatment: a link that reads as a button, with an
 * optional outbound arrow. Built on shadcn's Button so focus rings, disabled
 * handling and the press affordance stay consistent with the rest of the kit.
 */
export function CtaLink({
  href,
  children,
  tone = "solid",
  size = "default",
  withArrow = true,
  className,
}: CtaLinkProps) {
  const isExternal = /^(https?:|mailto:)/.test(href);
  const Anchor = isExternal ? "a" : Link;

  return (
    <Button
      asChild
      variant={tone === "solid" ? "default" : "outline"}
      className={cn(
        "h-auto rounded-lg font-medium leading-none whitespace-nowrap",
        TONE[tone],
        SIZE[size],
        className,
      )}
    >
      <Anchor href={href}>
        {children}
        {withArrow ? (
          <ArrowUpRight
            className={size === "compact" ? "size-[15px]" : "size-4"}
            aria-hidden="true"
          />
        ) : null}
      </Anchor>
    </Button>
  );
}
