"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import { HONEYPOT_FIELD, PLANS, type Plan } from "@/lib/submissions";
import { cn } from "@/lib/utils";

/*
  The form is deliberately squarer than the rest of the page: cards and
  diagram frames sit at 16px, inputs here at 4px. Soft radii read as marketing
  chrome, and this is the one place on the site that is an instrument.
*/
const FIELD =
  "w-full rounded-[4px] border border-line-strong bg-canvas px-3.5 py-[11px] text-[15px] leading-[22px] text-ink placeholder:text-ink-faint";

const CARD =
  "rounded-[8px] border border-line bg-white p-9 shadow-[0_2px_10px_rgba(11,15,25,0.06)]";

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
      <span className="text-[13px] leading-[1.4] font-medium text-ink-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <div aria-live="polite">
      <div className="flex size-11 items-center justify-center rounded-full bg-[#eaf6d8] text-[#335c12]">
        <Check className="size-5" strokeWidth={2.4} aria-hidden="true" />
      </div>
      <h2 className="mt-5 mb-0 text-[20px] leading-7 font-semibold tracking-[-0.01em] text-ink">
        Message received
      </h2>
      <p className="mt-2.5 mb-0 text-[15px] leading-[22px] text-ink-soft">
        We read every enquiry ourselves and reply with fit and next steps. If
        you are applying for a pilot, we will come back with what we need — a
        sample workflow and a nominated brand.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-7 text-[14px] leading-none font-medium text-purple underline underline-offset-4 hover:text-purple-deep"
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
      <h2 className="mt-0 mb-1.5 text-[20px] leading-7 font-semibold tracking-[-0.01em] text-ink">
        Talk to us
      </h2>
      <p className="mt-0 mb-7 text-[15px] leading-[22px] text-ink-soft">
        Under a minute. We reply with fit and next steps.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
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
          <select
            name="plan"
            required
            defaultValue={defaultPlan}
            className={FIELD}
          >
            {PLANS.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </Field>

        <Field label="How can we help?">
          <textarea
            name="message"
            rows={4}
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
            className="m-0 rounded-[4px] border border-[#f3c9bd] bg-[#fdf1ee] px-3.5 py-3 text-[14px] leading-[21px] text-[#8a2e18]"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-1.5 inline-flex items-center justify-center gap-2 rounded-[4px] bg-purple px-[26px] py-[15px] text-[15px] leading-none font-medium text-white transition-colors hover:bg-purple-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send"}
          {status === "submitting" ? null : (
            <ArrowUpRight className="size-4" aria-hidden="true" />
          )}
        </button>
      </form>
    </div>
  );
}
