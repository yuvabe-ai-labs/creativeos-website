/**
 * Single source of truth for the identity and contact details quoted in the
 * legal pages. These strings appear verbatim in the Privacy Policy and Terms,
 * and are the ones Meta's App Review checks against the app's listing — keep
 * them accurate and change them in one place.
 */
export const SITE = {
  product: "CreativeOS",
  legalEntity: "Yuvabe Studios",
  address: "Auroville, Tamil Nadu 605101, India",
  jurisdiction: "India",
  courts: "the courts of Puducherry, India",
  contactEmail: "info@yuvabe.com",
  privacyEmail: "info@yuvabe.com",
  url: "https://creativeos.yuvabe.com",
  /**
   * Shown as "Last updated" on both legal pages. Update whenever the substance
   * of either document changes — not on cosmetic edits.
   */
  legalLastUpdated: "12 August 2026",
} as const;

/**
 * The Meta permissions CreativeOS requests, and the reason for each.
 *
 * App Review compares the justification you submit against what your Privacy
 * Policy says you do. Keep this list identical to the permissions actually
 * requested in the Meta App Dashboard: listing one you do not use, or omitting
 * one you do, is a common rejection reason.
 */
export const META_PERMISSIONS = [
  {
    name: "instagram_basic",
    use: "Read the connected Instagram Business account's ID, username, profile picture and account type, so the workspace can show you which account you are publishing to.",
  },
  {
    name: "instagram_content_publish",
    use: "Publish the reels and static posts you have reviewed and approved inside CreativeOS to your connected Instagram Business account.",
  },
  {
    name: "pages_show_list",
    use: "List the Facebook Pages you manage, so you can select the one linked to the Instagram Business account you want to connect.",
  },
  {
    name: "pages_read_engagement",
    use: "Confirm that you hold a publishing role on the selected Page, which Meta requires before content can be published to its linked Instagram account.",
  },
] as const;
