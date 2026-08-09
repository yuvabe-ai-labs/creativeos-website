"use client";

import { useId, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * TODO(pilot-submit): this form does not submit anywhere yet.
 *
 * `handleSubmit` below fakes a network round-trip and flips to the success
 * state. Nothing is sent, stored, validated server-side, or emailed — an
 * application filled in today is lost the moment the tab closes.
 *
 * To make it real:
 *   1. Add a server action (or `app/api/pilot/route.ts`) that accepts the
 *      payload, and call it from `handleSubmit` instead of the setTimeout.
 *   2. Validate on the server as well as in the browser — the `required`
 *      attributes here are a convenience, not a control.
 *   3. Add spam protection (honeypot, rate limit, or a captcha) before this is
 *      linked from anywhere public-facing at volume.
 *   4. Deliver it somewhere durable — email to studios@yuvabe.com, a CRM, or a
 *      table — and surface a real error state when delivery fails. The UI
 *      currently has no failure path at all.
 *   5. This collects names, work emails and commercial details, so cover it in
 *      the Privacy Policy's "What we collect" section before it goes live.
 * ------------------------------------------------------------------------- */

const FIELD =
  "w-full rounded-xl border border-line-strong bg-canvas px-3.5 py-[11px] text-[15px] leading-[22px] text-ink placeholder:text-ink-faint";

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
        Application received
      </h2>
      <p className="mt-2.5 mb-0 text-[15px] leading-[22px] text-ink-soft">
        We read every application ourselves. If the fit looks right we will come
        back with what we would need next — a sample workflow and a nominated
        brand. Acceptance is confirmed only after that conversation.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-7 text-[14px] leading-none font-medium text-purple underline underline-offset-4 hover:text-purple-deep"
      >
        Submit another application
      </button>
    </div>
  );
}

export function PilotForm() {
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    // TODO(pilot-submit): replace with a real server action. See note above.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("done");
  }

  return (
    <div className="rounded-[16px] border border-line bg-white p-9 shadow-[0_6px_16px_rgba(11,15,25,0.08)]">
      {status === "done" ? (
        <Success onReset={() => setStatus("idle")} />
      ) : (
        <>
          <h2 className="mt-0 mb-1.5 text-[20px] leading-7 font-semibold tracking-[-0.01em] text-ink">
            Apply for a pilot
          </h2>
          <p className="mt-0 mb-7 text-[15px] leading-[22px] text-ink-soft">
            Around three minutes. Fields marked optional can be left blank.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
              <Field label="Full name">
                <input name="fullName" type="text" required className={FIELD} />
              </Field>
              <Field label="Work email">
                <input name="email" type="email" required className={FIELD} />
              </Field>
              <Field label="Agency name">
                <input name="agency" type="text" required className={FIELD} />
              </Field>
              <Field label="Role">
                <input name="role" type="text" required className={FIELD} />
              </Field>
            </div>

            <Field label="Agency website">
              <input
                name="website"
                type="url"
                required
                placeholder="https://"
                className={FIELD}
              />
            </Field>

            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-3">
              <Field label="Active D2C clients">
                <input
                  name="clients"
                  type="number"
                  min={0}
                  required
                  className={FIELD}
                />
              </Field>
              <Field label="Reels / month">
                <input
                  name="reelsPerMonth"
                  type="number"
                  min={0}
                  required
                  className={FIELD}
                />
              </Field>
              <Field label="Static posts / month">
                <input
                  name="postsPerMonth"
                  type="number"
                  min={0}
                  required
                  className={FIELD}
                />
              </Field>
            </div>

            <Field label="Current production tools">
              <input
                name="tools"
                type="text"
                required
                placeholder="ChatGPT, Midjourney, OpenArt…"
                className={FIELD}
              />
            </Field>

            <Field label="Biggest production bottleneck">
              <textarea
                name="bottleneck"
                rows={3}
                required
                className={cn(FIELD, "resize-y")}
              />
            </Field>

            <Field label="Preferred pilot brand or category">
              <input
                name="pilotBrand"
                type="text"
                required
                className={FIELD}
              />
            </Field>

            <fieldset className="flex flex-col gap-[18px] border-0 border-t border-line p-0 pt-[18px]">
              <legend className="sr-only">Optional details</legend>
              <div
                aria-hidden="true"
                className="text-[12px] leading-[1.4] font-medium tracking-[0.18em] text-ink-faint uppercase"
              >
                Optional
              </div>
              <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
                <Field label="Generations per approved asset">
                  <input
                    name="generationsPerAsset"
                    type="number"
                    min={0}
                    className={FIELD}
                  />
                </Field>
                <Field label="Creative team size">
                  <input
                    name="teamSize"
                    type="number"
                    min={0}
                    className={FIELD}
                  />
                </Field>
              </div>
              <Field label="Link to sample work">
                <input
                  name="sampleWork"
                  type="url"
                  placeholder="https://"
                  className={FIELD}
                />
              </Field>
              <Field label="Additional notes">
                <textarea
                  name="notes"
                  rows={3}
                  className={cn(FIELD, "resize-y")}
                />
              </Field>
            </fieldset>

            <button
              id={formId}
              type="submit"
              disabled={status === "submitting"}
              className="mt-1.5 inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-[26px] py-[15px] text-[15px] leading-none font-medium text-white transition-colors hover:bg-purple-deep disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? "Submitting…" : "Submit application"}
              {status === "submitting" ? null : (
                <ArrowUpRight className="size-4" aria-hidden="true" />
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
