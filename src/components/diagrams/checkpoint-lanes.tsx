/**
 * Image -> senior review -> video, with and without the review checkpoint.
 *
 * Ported verbatim from the Design Canvas source; see design-reference/.
 */
export function CheckpointLanes() {
  return (
    <svg
    viewBox="0 0 1080 380"
    className="block h-auto w-full" aria-hidden="true">
    <text x="320" y="34" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">IMAGE</text>
    <line x1="320" y1="44" x2="320" y2="356" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <text x="600" y="34" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">SENIOR REVIEW</text>
    <line x1="600" y1="44" x2="600" y2="356" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <text x="880" y="34" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">VIDEO</text>
    <line x1="880" y1="44" x2="880" y2="356" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    
    <text x="46" y="118" style={{ fontWeight: "500", fontSize: "13px" }} fill="#8a2e18">Without a</text>
    <text x="46" y="136" style={{ fontWeight: "500", fontSize: "13px" }} fill="#8a2e18">checkpoint</text>
    <path d="M160,130 C220,122 270,136 320,130 C420,120 500,138 600,130 C700,122 780,138 828,132" fill="none" stroke="#aab1bf" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 8" />
    <circle cx="320" cy="130" r="7" fill="#f04e28" />
    <text x="320" y="106" textAnchor="middle" style={{ fontWeight: "500", fontSize: "11px" }} fill="#8a2e18">flaw slips through</text>
    <circle cx="600" cy="130" r="6" fill="#fff" stroke="#c3c9d4" strokeWidth="2" strokeDasharray="2 3" />
    <text x="600" y="158" textAnchor="middle" style={{ fontWeight: "500", fontSize: "11px" }} fill="#9ca3af">no review</text>
    <circle cx="880" cy="130" r="26" fill="rgba(240,78,40,.12)" stroke="#f04e28" strokeWidth="2" />
    <path d="M870,120 L890,140 M890,120 L870,140" stroke="#f04e28" strokeWidth="2.4" strokeLinecap="round" />
    <text x="880" y="86" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11px" }} fill="#8a2e18">4 videos rejected</text>
    <path d="M880,160 C880,208 560,190 330,150" fill="none" stroke="#f04e28" strokeWidth="1.6" strokeDasharray="4 6" opacity=".6" />
    <path d="M342,157 L328,149 L344,143" fill="none" stroke="#f04e28" strokeWidth="1.6" opacity=".6" strokeLinecap="round" strokeLinejoin="round" />
    <text x="620" y="212" textAnchor="middle" style={{ fontWeight: "500", fontSize: "11px" }} fill="#b45309" opacity=".9">fix the image, regenerate everything</text>
    
    <line x1="60" y1="248" x2="1020" y2="248" stroke="#e5e7eb" strokeWidth="1" />
    
    <text x="46" y="296" style={{ fontWeight: "500", fontSize: "13px" }} fill="#4c24ab">With</text>
    <text x="46" y="314" style={{ fontWeight: "500", fontSize: "13px" }} fill="#4c24ab">CreativeOS</text>
    <path d="M160,308 C220,300 270,314 320,308 C420,298 500,316 600,308" fill="none" stroke="#aab1bf" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 8" />
    <circle cx="320" cy="308" r="7" fill="#f04e28" />
    <text x="320" y="284" textAnchor="middle" style={{ fontWeight: "500", fontSize: "11px" }} fill="#6b7280">same flaw</text>
    <circle cx="600" cy="308" r="13" fill="#5829c7" />
    <circle cx="600" cy="308" r="20" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    <path d="M594,308 L599,313 L607,303" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="600" y="344" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11px" }} fill="#4c24ab">caught + corrected here</text>
    <path d="M620,304 C700,296 780,312 866,308" fill="none" stroke="#5829c7" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="880" cy="308" r="9" fill="#5829c7" />
    <circle cx="880" cy="308" r="15" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    <text x="880" y="284" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11px" }} fill="#4c24ab">1 approved video</text>
    </svg>
  );
}
