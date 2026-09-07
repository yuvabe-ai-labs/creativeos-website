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
  tone = "light",
  className,
  children,
}: {
  id?: string;
  /** Two-digit counter shown in purple before the eyebrow, e.g. "01". */
  index?: string;
  eyebrow?: string;
  /** `dark` puts the band on the night ground with light-on-dark chrome. */
  tone?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
}) {
  const dark = tone === "dark";

  return (
    <section
      id={id}
      className={cn(
        // scroll-mt keeps anchored sections from landing under the sticky
        // header — it must track the header's own responsive height (h-16,
        // then 72px from `sm`), or every /#hash lands 8px short on a phone.
        "scroll-mt-16 border-b sm:scroll-mt-[72px]",
        dark ? "border-white/10 bg-night" : "border-line",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-7 px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        {eyebrow ? (
          <Reveal className="flex items-baseline gap-3 sm:gap-4">
            {index ? (
              <div
                className={cn(
                  "text-[12px] leading-none font-medium tracking-[0.22em]",
                  dark ? "text-lavender" : "text-purple",
                )}
              >
                {index}
              </div>
            ) : null}
            <div
              className={cn(
                "text-[12px] leading-[1.4] font-medium tracking-[0.22em] uppercase",
                dark ? "text-white/50" : "text-ink-soft",
              )}
            >
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
        "mt-5 mb-0 max-w-[62ch] text-[17px] leading-[26px] text-ink-muted text-pretty sm:mt-6 sm:text-[18px] sm:leading-[28px]",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * The affordance under a diagram that is too wide to fit and scrolls sideways.
 *
 * Two diagrams on the page have a floor width below which their type stops
 * being legible, so on a phone they scroll rather than shrink. A scroll
 * container gives no signal that it has more inside it, and a diagram that
 * quietly ends at the screen edge just looks broken — this says it does not.
 *
 * The caller passes the container query that hides it (`@min-[720px]:hidden`
 * and so on, matching the diagram's own min-width) so it disappears exactly
 * when there is nothing left to scroll to. Tailwind needs those literal in
 * source, which is why the variant is a prop rather than a number.
 */
export function ScrollHint({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "m-0 mt-3 flex items-center gap-2 text-[12px] leading-none font-medium tracking-[0.14em] uppercase",
        tone === "dark" ? "text-white/40" : "text-ink-faint",
        className,
      )}
    >
      {children}
      <span aria-hidden="true">→</span>
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
        "panel",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
