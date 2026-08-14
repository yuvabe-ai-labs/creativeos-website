"use client";

import { useState } from "react";

import {
  DEFAULT_GLOW_LAYERS,
  WorkflowCapsuleLoop,
} from "@/components/diagrams/workflow-capsule-loop";

/*
  TEMPORARY — glow tuning panel for the capsule's bounce light. Currently
  unwired (workflow.tsx renders the plain loop); swap it in as the loop's
  wrapper to tune live. Sliders start at the shipped defaults; once new
  values are chosen, bake them into `TONES` / `DEFAULT_GLOW_LAYERS` / the
  `cosstageGlow*` keyframes, unwire again — and delete this file when the
  glow is final.
*/

function Knob({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-2 whitespace-nowrap">
      <span className="w-[92px] text-white/60">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-[110px] accent-yellow"
      />
      <span className="w-[38px] text-right tabular-nums text-white/85">{value}</span>
    </label>
  );
}

export function CapsuleLoopTuner() {
  const [travel, setTravel] = useState(0.95);
  const [heightX, setHeightX] = useState(1);
  const [tailX, setTailX] = useState(1);
  const [blur, setBlur] = useState(20);
  const [bulb, setBulb] = useState(0.09);
  const [bulbR, setBulbR] = useState(1);

  const layers = DEFAULT_GLOW_LAYERS.map((l) => ({
    ...l,
    w: Math.round(l.w * heightX * 10) / 10,
    behind: Math.round(l.behind * tailX * 10) / 10,
  }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-x-7 gap-y-3 rounded-[10px] border border-white/10 bg-white/[.04] px-5 py-3.5 text-[11px] leading-none">
        <span className="font-semibold tracking-[0.14em] text-yellow/80">
          TEMP · GLOW TUNING
        </span>
        <Knob label="Comet opacity" value={travel} min={0} max={1} step={0.01} onChange={setTravel} />
        <Knob label="Comet height ×" value={heightX} min={0.4} max={2.5} step={0.05} onChange={setHeightX} />
        <Knob label="Tail length ×" value={tailX} min={0.4} max={3} step={0.05} onChange={setTailX} />
        <Knob label="Blur" value={blur} min={0} max={20} step={0.5} onChange={setBlur} />
        <Knob label="Bulb glow" value={bulb} min={0} max={0.6} step={0.01} onChange={setBulb} />
        <Knob label="Bulb radius ×" value={bulbR} min={0.4} max={2.5} step={0.05} onChange={setBulbR} />
      </div>
      <WorkflowCapsuleLoop tone="dark" glow={{ travel, blur, bulb, bulbRadius: bulbR, layers }} />
    </div>
  );
}
