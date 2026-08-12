"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";

import { HONEYPOT_FIELD, PLANS, type Plan } from "@/lib/submissions";
import { cn } from "@/lib/utils";

/*
  The form is the one element on the site that is an instrument rather than
  chrome, so it is drawn tighter than its surroundings: 4px radii against the
  page's 16px, 11px tracked caps for labels, and a deliberate focus state.
  Labels follow the diagram system's micro-label rule (11px / 600 / uppercase),
  which is the vocabulary the section eyebrows already speak.
*/

const FIELD =
  "w-full rounded-[4px] border border-line-strong bg-surface px-3 py-[9px] text-[14px] leading-[21px] text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-ink-faint focus:border-purple focus:shadow-[0_0_0_3px_rgba(88,41,199,0.10)]";

const CARD =
  "rounded-[8px] border border-line bg-white p-7 shadow-[0_2px_10px_rgba(11,15,25,0.06)]";

const LABEL =
  "text-[11px] leading-none font-semibold tracking-[0.1em] text-ink-soft uppercase";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-[7px]", className)}>
      <span className={LABEL}>{label}</span>
      {children}
    </label>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <div aria-live="polite">
      <div className="flex size-9 items-center justify-center rounded-full bg-[#eaf6d8] text-[#335c12]">
        <Check className="size-[18px]" strokeWidth={2.4} aria-hidden="true" />
      </div>
      <h2 className="font-display mt-4 mb-0 text-[19px] leading-7 font-semibold tracking-[-0.015em] text-ink">
        Message received
      </h2>
      <p className="mt-2 mb-0 text-[14px] leading-[21px] text-ink-soft">
        We read every enquiry ourselves and reply with fit and next steps.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-[13px] leading-none font-medium text-purple underline underline-offset-4 hover:text-purple-deep"
      >
        Send another
      </button>
    </div>
  );
}

export function PilotForm({ defaultPlan }: { defaultPlan: Plan }) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "error" | "done"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Captured before the first await: React nulls currentTarget once the
    // handler returns, so reading it afterwards throws.
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        setError(result?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("done");
    } catch {
      // The form is uncontrolled, so everything typed survives this.
      setError(
        "Could not reach the server. Check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className={CARD}>
        <Success onReset={() => setStatus("idle")} />
      </div>
    );
  }

  return (
    <div className={CARD}>
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <h2 className="font-display m-0 text-[19px] leading-none font-semibold tracking-[-0.015em] text-ink">
          Talk to us
        </h2>
        <span className="text-[11px] leading-none font-semibold tracking-[0.1em] text-ink-faint uppercase">
          Under a minute
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-[14px]">
        <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
          <Field label="Full name">
            <input name="fullName" type="text" required className={FIELD} />
          </Field>
          <Field label="Work email">
            <input name="email" type="email" required className={FIELD} />
          </Field>
          <Field label="Agency">
            <input name="agency" type="text" required className={FIELD} />
          </Field>
          <Field label="Website">
            {/*
              Deliberately type="text": type="url" rejects "acme.com", and the
              server prepends the scheme anyway.
            */}
            <input
              name="website"
              type="text"
              required
              placeholder="acme.com"
              className={FIELD}
            />
          </Field>
        </div>

        <Field label="Plan of interest">
          {/*
            appearance-none plus our own chevron: the native arrow sits hard
            against the edge and renders differently on every platform.
          */}
          <span className="relative block">
            <select
              name="plan"
              required
              defaultValue={defaultPlan}
              className={cn(FIELD, "appearance-none pr-10")}
            >
              {PLANS.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-soft"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </span>
        </Field>

        <Field label="How can we help?">
          <textarea
            name="message"
            rows={3}
            required
            placeholder="What you produce today, and what you are trying to fix."
            className={cn(FIELD, "resize-y")}
          />
        </Field>

        {/*
          Honeypot. Off-screen rather than hidden: some bots skip display:none
          inputs, and this one needs to be filled for the trap to spring.
        */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label>
            Company website
            <input
              name={HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {status === "error" && error ? (
          <p
            aria-live="polite"
            className="m-0 rounded-[4px] border border-flame/25 bg-flame/[0.06] px-3 py-2.5 text-[13px] leading-[19px] text-flame-deep"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-purple px-6 py-[13px] text-[14px] leading-none font-medium tracking-[0.01em] text-white transition-colors duration-150 hover:bg-purple-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send"}
          {status === "submitting" ? null : (
            <ArrowUpRight className="size-4" aria-hidden="true" />
          )}
        </button>

        <p className="m-0 text-center text-[12px] leading-[18px] text-ink-faint">
          We never add you to a mailing list.
        </p>
      </form>
    </div>
  );
}
