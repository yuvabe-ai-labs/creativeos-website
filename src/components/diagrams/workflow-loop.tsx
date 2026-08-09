/**
 * Create/learn capsule: steps 01-04 across the top, 05-06 returning underneath.
 *
 * Ported verbatim from the Design Canvas source; see design-reference/.
 */
export function WorkflowLoop() {
  return (
    <svg
    viewBox="0 0 1080 420"
    className="block h-auto w-full" aria-hidden="true">
    <path d="M161,230 A74,74 0 0 1 235,156 L845,156 A74,74 0 0 1 919,230 Z" fill="rgba(150,136,192,.12)" />
    <path d="M161,230 A74,74 0 0 0 235,304 L845,304 A74,74 0 0 0 919,230 Z" fill="rgba(88,41,199,.07)" />
    <line x1="161" y1="230" x2="919" y2="230" stroke="#fff" strokeWidth="5" />
    <text x="540" y="203" textAnchor="middle" style={{ fontWeight: "600", fontSize: "21px", fontFamily: "var(--font-clash-display), sans-serif", letterSpacing: ".08em" }} fill="rgba(88,41,199,.20)">CREATE</text>
    <text x="540" y="277" textAnchor="middle" style={{ fontWeight: "600", fontSize: "21px", fontFamily: "var(--font-clash-display), sans-serif", letterSpacing: ".08em" }} fill="rgba(88,41,199,.20)">LEARN</text>
    <path d="M235,140 L845,140 A90,90 0 0 1 845,320 L235,320 A90,90 0 0 1 235,140 Z" fill="none" stroke="#5829c7" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="6 8" style={{ animation: "cosray 6s linear infinite" }} />
    <circle cx="250" cy="140" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="450" cy="140" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="650" cy="140" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="845" cy="140" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="660" cy="320" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="400" cy="320" r="9" fill="#5829c7" /><circle cx="400" cy="320" r="15" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    <text x="250" y="46" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#4c24ab">01</text>
    <text x="250" y="68" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11.5px", letterSpacing: ".8px" }} fill="#9ca3af">BEGIN WITH</text>
    <text x="250" y="86" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11.5px", letterSpacing: ".8px" }} fill="#9ca3af">EXISTING CONTEXT</text>
    <line x1="250" y1="98" x2="250" y2="124" stroke="#c3c9d4" strokeWidth="1.4" />
    <text x="450" y="46" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#4c24ab">02</text>
    <text x="450" y="68" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11.5px", letterSpacing: ".8px" }} fill="#9ca3af">ADD A</text>
    <text x="450" y="86" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11.5px", letterSpacing: ".8px" }} fill="#9ca3af">MARKET SIGNAL</text>
    <line x1="450" y1="98" x2="450" y2="124" stroke="#c3c9d4" strokeWidth="1.4" />
    <text x="650" y="46" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#4c24ab">03</text>
    <text x="650" y="68" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11.5px", letterSpacing: ".8px" }} fill="#9ca3af">EXPLORE CREATIVE</text>
    <text x="650" y="86" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11.5px", letterSpacing: ".8px" }} fill="#9ca3af">DIRECTIONS</text>
    <line x1="650" y1="98" x2="650" y2="124" stroke="#c3c9d4" strokeWidth="1.4" />
    <text x="845" y="46" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#4c24ab">04</text>
    <text x="845" y="68" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11.5px", letterSpacing: ".8px" }} fill="#9ca3af">PRODUCE</text>
    <text x="845" y="86" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11.5px", letterSpacing: ".8px" }} fill="#9ca3af">THE ASSET</text>
    <line x1="845" y1="98" x2="845" y2="124" stroke="#c3c9d4" strokeWidth="1.4" />
    <text x="660" y="366" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#4c24ab">05</text>
    <text x="660" y="388" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11.5px", letterSpacing: ".8px" }} fill="#9ca3af">REVIEW AND REFINE</text>
    <text x="400" y="366" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#4c24ab">06</text>
    <text x="400" y="388" textAnchor="middle" style={{ fontWeight: "600", fontSize: "11.5px", letterSpacing: ".8px" }} fill="#9ca3af">REUSE WHAT WAS LEARNED</text>
    </svg>
  );
}
