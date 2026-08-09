/**
 * Attempts and edits trailing into an approved output.
 *
 * Ported verbatim from the Design Canvas source; see design-reference/.
 */
export function GlyphPreservesJourney() {
  return (
    <svg
    viewBox="0 0 280 120"
    className="block h-auto w-full" aria-hidden="true">
    <path d="M24,60 C70,48 120,72 170,60 C200,53 226,56 248,60" fill="none" stroke="#aab1bf" strokeWidth="1.8" strokeDasharray="3 6" />
    <circle cx="24" cy="60" r="5" fill="#fff" stroke="#aab1bf" strokeWidth="1.8" />
    <circle cx="80" cy="55" r="5" fill="#fff" stroke="#aab1bf" strokeWidth="1.8" />
    <circle cx="140" cy="64" r="5" fill="#fff" stroke="#aab1bf" strokeWidth="1.8" />
    <circle cx="196" cy="57" r="5" fill="#fff" stroke="#aab1bf" strokeWidth="1.8" />
    <circle cx="248" cy="60" r="8" fill="#5829c7" />
    <circle cx="248" cy="60" r="14" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    <text x="24" y="82" textAnchor="middle" style={{ fontWeight: "500", fontSize: "8.5px", letterSpacing: ".6px" }} fill="#9ca3af">ATTEMPT 1</text>
    <text x="140" y="86" textAnchor="middle" style={{ fontWeight: "500", fontSize: "8.5px", letterSpacing: ".6px" }} fill="#9ca3af">EDITS</text>
    <text x="248" y="86" textAnchor="middle" style={{ fontWeight: "600", fontSize: "8.5px", letterSpacing: ".6px" }} fill="#4c24ab">APPROVED</text>
    </svg>
  );
}
