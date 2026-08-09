import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The page is a stack of numbered, rule-separated bands sharing one 1240px
 * measure. `Section` owns that chrome so each section file is only its content.
 */
export function Section({
  id,
  index,
  eyebrow,
  className,
  children,
}: {
  id?: string;
  /** Two-digit counter shown in purple before the eyebrow, e.g. "01". */
  index?: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("border-b border-line", className)}>
      <div className="mx-auto flex max-w-[1240px] flex-col gap-7 px-8 py-24">
        {eyebrow ? (
          <Reveal className="flex items-baseline gap-4">
            {index ? (
              <div className="text-[12px] leading-none font-medium tracking-[0.22em] text-purple">
                {index}
              </div>
            ) : null}
            <div className="text-[12px] leading-[1.4] font-medium tracking-[0.22em] text-ink-soft uppercase">
              {eyebrow}
            </div>
          </Reveal>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/** Section headline. `Clash Display` at a viewport-fluid size, per the source. */
export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display m-0 text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.06] font-semibold tracking-[-0.025em]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** Supporting paragraph under a section heading. */
export function SectionLede({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-6 mb-0 max-w-[62ch] text-[18px] leading-[28px] text-ink-muted text-pretty",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** The white, hairline-bordered panel every diagram sits inside. */
export function DiagramFrame({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-line bg-white shadow-[0_8px_20px_rgba(11,15,25,0.06)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
