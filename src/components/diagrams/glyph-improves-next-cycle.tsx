/**
 * Step function climbing across successive campaigns.
 *
 * Ported verbatim from the Design Canvas source; see design-reference/.
 */
export function GlyphImprovesNextCycle() {
  return (
    <svg
    viewBox="0 0 280 120"
    className="block h-auto w-full" aria-hidden="true">
    <path d="M30,96 L86,96 L86,68 L142,68 L142,44 L198,44 L198,24 L254,24" fill="none" stroke="#5829c7" strokeWidth="2" />
    <path d="M30,96 L86,96 M86,96 L86,96" fill="none" />
    <circle cx="86" cy="96" r="4.5" fill="#fff" stroke="#5829c7" strokeWidth="1.8" />
    <circle cx="142" cy="68" r="4.5" fill="#fff" stroke="#5829c7" strokeWidth="1.8" />
    <circle cx="198" cy="44" r="4.5" fill="#fff" stroke="#5829c7" strokeWidth="1.8" />
    <circle cx="254" cy="24" r="7" fill="#5829c7" />
    <text x="58" y="110" textAnchor="middle" style={{ fontWeight: "500", fontSize: "8.5px", letterSpacing: ".6px" }} fill="#9ca3af">CAMPAIGN 1</text>
    <text x="114" y="82" textAnchor="middle" style={{ fontWeight: "500", fontSize: "8.5px", letterSpacing: ".6px" }} fill="#9ca3af">CAMPAIGN 2</text>
    <text x="170" y="58" textAnchor="middle" style={{ fontWeight: "500", fontSize: "8.5px", letterSpacing: ".6px" }} fill="#9ca3af">CAMPAIGN 3</text>
    </svg>
  );
}
