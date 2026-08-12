import { NextResponse } from "next/server";

import { SITE } from "@/lib/site";
import { HONEYPOT_FIELD, parseSubmission } from "@/lib/submissions";

/**
 * Receives a pilot application or pricing enquiry and forwards it to the Apps
 * Script web app bound to the submissions Sheet.
 *
 * The browser posts here rather than at Apps Script directly for three reasons:
 *
 *   1. The shared secret stays server-side. A browser POST would ship it to
 *      every visitor in the network tab.
 *   2. Apps Script web apps answer with a 302 to script.googleusercontent.com.
 *      A JSON fetch from a browser triggers a CORS preflight that Apps Script
 *      never answers, so the request fails even though the script ran. There is
 *      no CORS between two servers.
 *   3. Replacing the Sheet with a database later is a change to this file only.
 *
 * Next returns 405 for undeclared methods, so only POST is defined here.
 */

const MAX_BODY_BYTES = 16 * 1024;

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  const raw = await request.text();

  if (raw.length > MAX_BODY_BYTES) {
    return fail(400, "That submission is too large.");
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "That submission could not be read.");
  }

  // Honeypot: report success so a bot cannot tell it was caught, write nothing.
  const decoy = (body as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
  if (typeof decoy === "string" && decoy.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseSubmission(body);
  if (!parsed.ok) {
    return fail(400, parsed.error);
  }

  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;

  if (!url || !secret) {
    console.error(
      "[submissions] SHEETS_WEBHOOK_URL or SHEETS_WEBHOOK_SECRET is not set",
    );
    return fail(
      500,
      "This form is not configured yet. Please email us instead.",
    );
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret, ...parsed.data }),
      // Apps Script always redirects to googleusercontent.com to serve the
      // response body. Without following it we would only ever see the 302.
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Apps Script responded ${response.status}`);
    }

    const result = (await response.json().catch(() => null)) as {
      ok?: boolean;
      error?: string;
    } | null;

    if (!result?.ok) {
      throw new Error(result?.error ?? "Apps Script reported a failure");
    }
  } catch (error) {
    console.error("[submissions] delivery failed", error);
    return fail(
      502,
      `We could not deliver your message just now. Please try again, or email ${SITE.contactEmail}.`,
    );
  }

  return NextResponse.json({ ok: true });
}
