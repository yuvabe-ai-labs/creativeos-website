/**
 * The submission payload, shared by the form, the API route and the Apps
 * Script that writes the Sheet row. Validation lives here rather than in the
 * route handler so the client and server agree on the rules by construction.
 *
 * Hand-rolled rather than zod: six fields do not justify a dependency.
 */

export const PLANS = ["Creator", "Studio", "Custom", "Still deciding"] as const;

export type Plan = (typeof PLANS)[number];

export type Submission = {
  plan: Plan;
  fullName: string;
  email: string;
  agency: string;
  website: string;
  message: string;
};

/**
 * Name of the hidden decoy input. A bot that fills every field trips it; the
 * API then returns success and drops the submission, so the bot learns nothing.
 */
export const HONEYPOT_FIELD = "company_website";

/** Per-field character ceilings, enforced server-side. */
const LIMITS: Record<keyof Submission, number> = {
  plan: 40,
  fullName: 200,
  email: 200,
  agency: 200,
  website: 200,
  message: 2000,
};

/** Deliberately loose. Real validation of an address is delivery, not a regex. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Maps the `?plan=` query value onto a select option. Anything unrecognised —
 * including an absent parameter — falls back to "Still deciding" rather than
 * guessing on the visitor's behalf.
 */
export function planFromQuery(value: string | undefined): Plan {
  const match = PLANS.find(
    (plan) => plan.toLowerCase() === value?.toLowerCase(),
  );
  return match ?? "Still deciding";
}

/**
 * Accepts what a visitor types. Someone entering "acme.com" means
 * "https://acme.com" and should not be rejected for it.
 */
function normaliseWebsite(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export type ParseResult =
  | { ok: true; data: Submission }
  | { ok: false; error: string };

const LABELS: Record<keyof Submission, string> = {
  plan: "plan of interest",
  fullName: "full name",
  email: "work email",
  agency: "agency",
  website: "website",
  message: "message",
};

export function parseSubmission(input: unknown): ParseResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "That submission could not be read." };
  }

  const raw = input as Record<string, unknown>;

  const read = (key: keyof Submission): string =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";

  const fields: Record<keyof Submission, string> = {
    plan: read("plan"),
    fullName: read("fullName"),
    email: read("email"),
    agency: read("agency"),
    website: read("website"),
    message: read("message"),
  };

  for (const key of Object.keys(fields) as (keyof Submission)[]) {
    if (!fields[key]) {
      return { ok: false, error: `Please fill in your ${LABELS[key]}.` };
    }
    if (fields[key].length > LIMITS[key]) {
      return { ok: false, error: `Your ${LABELS[key]} is too long.` };
    }
  }

  if (!EMAIL.test(fields.email)) {
    return { ok: false, error: "That work email does not look right." };
  }

  const plan = PLANS.find((option) => option === fields.plan);
  if (!plan) {
    return { ok: false, error: "Please choose a plan of interest." };
  }

  return {
    ok: true,
    data: {
      plan,
      fullName: fields.fullName,
      email: fields.email,
      agency: fields.agency,
      website: normaliseWebsite(fields.website),
      message: fields.message,
    },
  };
}
