"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Scroll-triggered entrance, used on every band of the page.
 *
 * This is deliberately the only JS-driven motion here: the diagrams animate in
 * CSS and the accordion animates in Radix. It earns its place because CSS alone
 * cannot tell when an element enters the viewport.
 *
 * Keeping it in one client component means the section files stay server
 * components — none of the (large) inline SVG markup ships as client JS.
 *
 * The page is calm and editorial, so the movement stays small: 16px, 500ms, once.
 *
 * REDUCED MOTION — read before changing any of this. Motion server-renders the
 * `initial` styles, so the HTML always ships `opacity:0;transform:translateY(16px)`;
 * the server cannot know the user's motion preference. That means the reduced
 * path must still *actively animate to the visible state* (just instantly) in
 * order to clear those inline styles. Suppressing the animation instead — via
 * `initial={false}`, an `undefined` `whileInView`, or swapping in a plain
 * element — leaves the SSR opacity in place and the content never appears.
 */

const EASE = [0.22, 0.61, 0.36, 1] as const;
const DISTANCE = 16;
const DURATION = 0.5;
const STAGGER = 0.08;
/** Start the entrance slightly before the element is fully on screen. */
const VIEWPORT = { once: true, margin: "-80px" } as const;

const VISIBLE = { opacity: 1, y: 0 } as const;

type Tag = "div" | "section" | "ol" | "li" | "header" | "footer";

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: Tag;
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduced ? VISIBLE : { opacity: 0, y: DISTANCE }}
      whileInView={VISIBLE}
      viewport={VIEWPORT}
      transition={
        reduced ? { duration: 0 } : { duration: DURATION, ease: EASE, delay }
      }
    >
      {children}
    </Component>
  );
}

const group = (reduced: boolean): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: reduced ? 0 : STAGGER } },
});

const item = (reduced: boolean): Variants => ({
  hidden: reduced ? VISIBLE : { opacity: 0, y: DISTANCE },
  shown: {
    ...VISIBLE,
    transition: reduced ? { duration: 0 } : { duration: DURATION, ease: EASE },
  },
});

/** Staggers its `RevealItem` descendants as the group scrolls into view. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const reduced = useReducedMotion() ?? false;
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={group(reduced)}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const reduced = useReducedMotion() ?? false;
  const Component = motion[as];

  return (
    <Component className={className} variants={item(reduced)}>
      {children}
    </Component>
  );
}
