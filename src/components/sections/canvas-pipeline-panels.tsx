"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/*
  The Plan / Create / Compound expanding panels, ported from the Design Canvas
  draft (design-reference/.../CreativeOS Pipeline.dc.html), running dark in
  the site's own night dress: the workflow band's night-glass cards
  (#1a1237 on bg-night) with the v4 three-beats type treatment — black scrim,
  white verbs, yellow stats.

  Hovering a panel grows it to 2.1x the width of its neighbours. Every panel
  keeps `flex-basis: 0%`, so width is distributed purely by grow ratio and the
  whole row re-balances by animating one number. The number + verb up top ride
  along by animating their font-size on the same curve.

  Each panel's ground is a product capture (public/assets/help-videos) that
  sits still on its first frame and plays only while its panel is hovered —
  the same `hovered` state that drives the expansion, so the panel that
  grows is the one that moves. Paused, not reset, on leave; skipped
  entirely under reduced motion.

  The captures are light product UI on a dark page, so the panels run a
  tone flip: idle, the video is ghosted to 15% into the night card and the
  type is white; the hovered panel brings its video up to full brightness
  and inverts to ink-on-light (the light Pipeline draft's palette). The
  bottom text block swaps colour instantly — the `textShown` fade has it
  hidden while the flip happens.
*/

/** Matches the flex-grow transition; the text fade waits it out (see below). */
const GROW_MS = 550;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const PANELS: Array<{
  number: string;
  verb: string;
  title: string;
  copy: string;
  video: string;
  stats?: Array<{ value: string; label: string }>;
}> = [
  {
    number: "01",
    verb: "Plan",
    title: "The script becomes the plan",
    copy: "Paste a finished script — it parses into asset-ready shots, with brand context already attached.",
    video: "/assets/help-videos/create-a-reel/01-paste-script.mp4",
  },
  {
    number: "02",
    verb: "Create",
    title: "Posts and stills, reviewed early",
    copy: "Shots fan into stills and static posts — a review checkpoint catches errors before video, where fixes are cheap.",
    video: "/assets/help-videos/create-a-reel/04-generate-image.mp4",
  },
  {
    number: "03",
    verb: "Compound",
    title: "Reels ship, learning stays",
    copy: "Every attempt and approval is captured — reel 2 starts where reel 1 ended.",
    video: "/assets/help-videos/create-a-reel/06-generate-clip.mp4",
    stats: [
      { value: "75%", label: " less time" },
      { value: "2x", label: " lower cost" },
      { value: "4x", label: " faster" },
    ],
  },
];

export function CanvasPipelinePanels() {
  /** 1-indexed hovered panel; 0 = resting, all three equal. */
  const [hovered, setHovered] = useState(0);
  const [textShown, setTextShown] = useState(true);
  const timer = useRef<number | undefined>(undefined);
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  const reduced = useReducedMotion();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // The hovered panel's capture plays; the rest hold their frame. Paused,
  // not reset, so re-hovering resumes. play() rejects if a pause interrupts
  // the load — harmless, swallow it.
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (hovered === i + 1 && !reduced) v.play().catch(() => {});
      else v.pause();
    });
  }, [hovered, reduced]);

  const setHov = (i: number) => {
    if (i === hovered) return;
    if (reduced) {
      // No resize animation to hide from — keep the text up throughout.
      setHovered(i);
      return;
    }
    // Text over a resizing container must not visibly reflow: fade it out for
    // the duration of the flex transition, bring it back once layout settles.
    window.clearTimeout(timer.current);
    setHovered(i);
    setTextShown(false);
    timer.current = window.setTimeout(() => setTextShown(true), GROW_MS + 20);
  };

  return (
    <div className="mt-16 flex flex-col gap-5 lg:flex-row lg:items-stretch">
      {PANELS.map((panel, index) => {
        const i = index + 1;
        const active = hovered === i;
        // Resting: all three verbs mid-size. One hovered: it grows, the others
        // step down so the row's top line keeps a clear focal point.
        const verbSize = active
          ? "clamp(30px, 4vw, 58px)"
          : hovered === 0
            ? "clamp(24px, 2.6vw, 38px)"
            : "clamp(20px, 2.1vw, 30px)";

        return (
          <div
            key={panel.verb}
            tabIndex={0}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(0)}
            onFocus={() => setHov(i)}
            onBlur={() => setHov(0)}
            className="relative min-h-[420px] min-w-0 overflow-hidden rounded-[24px] border border-white/10 bg-[#1a1237] shadow-[0_24px_70px_rgba(0,0,0,.35)] outline-none focus-visible:ring-2 focus-visible:ring-lavender lg:min-h-[660px]"
            style={{
              flex: `${active ? 2.1 : 1} 1 0%`,
              transition: reduced ? undefined : `flex-grow ${GROW_MS}ms ${EASE}`,
            }}
          >
            <video
              ref={(el) => {
                videos.current[index] = el;
              }}
              src={panel.video}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
              style={{
                opacity: active ? 1 : 0.15,
                transition: reduced ? undefined : `opacity ${GROW_MS}ms ${EASE}`,
              }}
            />
            {/* The canvas surface: the site's dot grid over the ghosted
                video while the panel is dark, gone when the real canvas
                comes up bright. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.07)_1px,transparent_1px)] bg-[size:26px_26px]"
              style={{
                opacity: active ? 0 : 1,
                transition: reduced ? undefined : `opacity ${GROW_MS}ms ${EASE}`,
              }}
            />
            {/* Cross-fading scrims: night while idle, the light draft's
                canvas wash when the video is up — each keeps its half of the
                tone flip legible. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.55)_0%,rgba(0,0,0,0)_30%,rgba(0,0,0,0)_56%,rgba(0,0,0,.74)_100%)]"
              style={{
                opacity: active ? 0 : 1,
                transition: reduced ? undefined : `opacity ${GROW_MS}ms ${EASE}`,
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(252,252,253,.92)_0%,rgba(252,252,253,0)_30%,rgba(252,252,253,0)_58%,rgba(252,252,253,.94)_100%)]"
              style={{
                opacity: active ? 1 : 0,
                transition: reduced ? undefined : `opacity ${GROW_MS}ms ${EASE}`,
              }}
            />

            <div className="pointer-events-none absolute top-8 right-9 left-9 flex items-baseline gap-3.5 whitespace-nowrap">
              <span
                className={`font-display font-medium tracking-[-0.02em] ${active ? "text-purple/[.28]" : "text-white/[.32]"}`}
                style={{
                  fontSize: verbSize,
                  transition: reduced
                    ? undefined
                    : `font-size ${GROW_MS}ms ${EASE}, color ${GROW_MS}ms ${EASE}`,
                }}
              >
                {panel.number}
              </span>
              <span
                className={`font-display font-medium tracking-[-0.02em] ${active ? "text-ink" : "text-white"}`}
                style={{
                  fontSize: verbSize,
                  transition: reduced
                    ? undefined
                    : `font-size ${GROW_MS}ms ${EASE}, color ${GROW_MS}ms ${EASE}`,
                }}
              >
                {panel.verb}
              </span>
            </div>

            {/* Fixed-height block. Idle, content flows from its top so every
                panel's title sits on the same line. Hovered, the emphasis is
                the video: copy and stats drop out and the lone title sinks
                to the bottom edge — the swap happens behind the text fade. */}
            <div
              className={`pointer-events-none absolute right-9 bottom-[30px] left-9 flex h-[170px] flex-col transition-opacity duration-[220ms] ease-out ${active ? "justify-end" : "justify-start"}`}
              style={{ opacity: textShown ? 1 : 0 }}
            >
              <div
                className={`text-[22px] leading-[1.3] font-semibold ${active ? "text-ink" : "text-white"}`}
              >
                {panel.title}
              </div>
              <p
                className={`m-0 mt-2 text-[16px] leading-[1.55] text-pretty ${active ? "hidden" : "text-white/75"}`}
              >
                {panel.copy}
              </p>
              {panel.stats ? (
                <div className={`mt-4 flex-wrap gap-[26px] ${active ? "hidden" : "flex"}`}>
                  {panel.stats.map((stat) => (
                    <div key={stat.value} className="whitespace-nowrap">
                      <span
                        className={`font-display text-[24px] font-semibold ${active ? "text-purple" : "text-yellow"}`}
                      >
                        {stat.value}
                      </span>
                      <span
                        className={`text-[14px] leading-[1.3] ${active ? "text-ink-soft" : "text-white/65"}`}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
