"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fits a fixed-size design into whatever width it is given, by scaling it.
 *
 * Section 01's canvas is drawn in one coordinate system that HTML and SVG
 * share: the SVG's viewBox units and the chips' literal px are the same units,
 * which is the only reason the drawn paths meet the chips they connect. Letting
 * the box reflow breaks that agreement — the SVG stretches, the px do not —
 * so the board keeps its authored size and this shrinks the whole thing.
 *
 * WHY THIS IS JAVASCRIPT. It reads as a job for container queries:
 *
 *     .board { scale: calc(100cqw / 1200); }   // silently does nothing
 *
 * That is a CSS type error. Dividing a length by a number gives a length, and
 * `scale` takes a number, so the declaration is dropped — no console warning,
 * no build error, the board just renders at 1:1 and overflows. The form that
 * does compute is `calc(100cqw / 1200px)` — length over length, which resolves
 * to a ratio — but length-over-length division is a recent addition and not
 * safe to rely on for every visitor. A ResizeObserver is boring and works
 * everywhere.
 *
 * The scale is capped at 1: a container wider than the design leaves it at
 * native size rather than magnifying it.
 */
export function ScaleToFit({
  width,
  height,
  className,
  children,
}: {
  /** The design's authored width, in the units its contents are written in. */
  width: number;
  /** Its authored height, used to reserve the right space once scaled. */
  height: number;
  className?: string;
  children: React.ReactNode;
}) {
  const outer = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  /*
    The first measurement happens in a ref callback rather than in the effect
    below, because a ref is attached during commit — before the browser paints.
    Measuring in the effect instead would paint one frame at scale 1, with the
    board at its full authored width, and the section would visibly snap.
  */
  const measure = (el: HTMLDivElement | null) => {
    outer.current = el;
    if (el && el.clientWidth > 0) {
      setScale(Math.min(1, el.clientWidth / width));
    }
  };

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      // borderBoxSize is not populated by every engine that ships RO; the
      // rect is, and this element has no border or padding of its own.
      const w = entry.contentRect.width;
      if (w > 0) setScale(Math.min(1, w / width));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    // The outer box is what gets measured, so it must be free to be its
    // natural width — the scaled board is taken out of flow inside it, and the
    // height is reserved here rather than by the content. `overflow-hidden`
    // covers the server-rendered frame, where scale is still 1.
    <div
      ref={measure}
      className={className}
      style={{ height: height * scale, overflow: "hidden" }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
