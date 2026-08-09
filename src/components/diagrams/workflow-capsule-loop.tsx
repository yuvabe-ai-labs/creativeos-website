/**
 * The create/learn capsule loop, from slide 03 of the CreativeOS Sales Deck.
 *
 * A single lit dot runs the capsule perimeter on a 12s cycle while a trailing
 * stroke fills in behind it; each stage marker flashes as the dot reaches it.
 * The colour shifts amber on the CREATE half and purple on the LEARN half via
 * `cosloopC`. The stage `animation-delay` values are the dot's arrival times —
 * they are derived from the path geometry, so do not round them.
 *
 * Ported verbatim from the Design Canvas source; see design-reference/.
 */
export function WorkflowCapsuleLoop() {
  return (
    <svg
      viewBox="0 0 1560 560"
      className="block h-auto w-full" aria-hidden="true">
    <path d="M355,190 A130,130 0 0 1 485,320 A130,130 0 0 1 355,450 L1205,450 A130,130 0 0 1 1075,320 A130,130 0 0 1 1205,190 Z" fill="none" opacity="0" />
    <path d="M340,205 L1220,205 A115,115 0 0 1 1220,435 L340,435 A115,115 0 0 1 340,205 Z" fill="none" stroke="#c3c9d4" strokeWidth="2.4" strokeDasharray="2 14" strokeLinecap="round" />
    <path d="M340,205 L1220,205 A115,115 0 0 1 1220,435 L340,435 A115,115 0 0 1 340,205 Z" fill="none" stroke="#e3a900" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="2483 2483" opacity="0" style={{ animation: "cosloopTrail 12s linear infinite,cosloopC 12s linear infinite" }} />
    <path d="M340,205 L1220,205 A115,115 0 0 1 1220,435 L340,435 A115,115 0 0 1 340,205 Z" fill="none" stroke="#e3a900" strokeWidth="6" strokeLinecap="round" strokeDasharray="18 2470" style={{ animation: "cosloopW 12s linear infinite,cosloopC 12s linear infinite" }} />
    <defs>
    <linearGradient id="cosLobeTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(150,136,192,.28)" /><stop offset="100%" stopColor="rgba(150,136,192,.06)" /></linearGradient>
    <linearGradient id="cosLobeBot" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="rgba(88,41,199,.22)" /><stop offset="100%" stopColor="rgba(88,41,199,.04)" /></linearGradient>
    </defs>
    <defs>
    <radialGradient id="cosCloudY" cx="35%" cy="18%" r="75%"><stop offset="0%" stopColor="rgba(255,202,45,.38)" /><stop offset="55%" stopColor="rgba(255,202,45,.10)" /><stop offset="100%" stopColor="rgba(255,202,45,0)" /></radialGradient>
    <radialGradient id="cosCloudP" cx="68%" cy="85%" r="80%"><stop offset="0%" stopColor="rgba(88,41,199,.26)" /><stop offset="55%" stopColor="rgba(88,41,199,.08)" /><stop offset="100%" stopColor="rgba(88,41,199,0)" /></radialGradient>
    </defs>
    <path d="M250,320 A85,85 0 0 1 335,235 L1225,235 A85,85 0 0 1 1310,320 A85,85 0 0 1 1225,405 L335,405 A85,85 0 0 1 250,320 Z" fill="url(#cosCloudY)" />
    <path d="M250,320 A85,85 0 0 1 335,235 L1225,235 A85,85 0 0 1 1310,320 A85,85 0 0 1 1225,405 L335,405 A85,85 0 0 1 250,320 Z" fill="url(#cosCloudP)" />
    <line x1="290" y1="320" x2="1270" y2="320" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    
    <text x="780" y="291" textAnchor="middle" style={{ fontWeight: "600", fontSize: "38px", fontFamily: "var(--font-clash-display), sans-serif", letterSpacing: ".18em" }} fill="rgba(176,132,0,.75)">CREATE</text>
    <text x="780" y="376" textAnchor="middle" style={{ fontWeight: "600", fontSize: "38px", fontFamily: "var(--font-clash-display), sans-serif", letterSpacing: ".18em" }} fill="rgba(88,41,199,.55)">LEARN</text>
    <circle cx="360" cy="205" r="16" fill="none" stroke="rgba(227,169,0,.55)" strokeWidth="1.6" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageW 12s linear infinite", animationDelay: "0.1s" }} /><circle cx="360" cy="205" r="13" fill="#fff" stroke="#aab1bf" strokeWidth="3.4" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageFY 12s linear infinite", animationDelay: "0.1s" }} />
    <circle cx="640" cy="205" r="16" fill="none" stroke="rgba(227,169,0,.55)" strokeWidth="1.6" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageW 12s linear infinite", animationDelay: "1.45s" }} /><circle cx="640" cy="205" r="13" fill="#fff" stroke="#aab1bf" strokeWidth="3.4" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageFY 12s linear infinite", animationDelay: "1.45s" }} />
    <circle cx="920" cy="205" r="16" fill="none" stroke="rgba(227,169,0,.55)" strokeWidth="1.6" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageW 12s linear infinite", animationDelay: "2.8s" }} /><circle cx="920" cy="205" r="13" fill="#fff" stroke="#aab1bf" strokeWidth="3.4" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageFY 12s linear infinite", animationDelay: "2.8s" }} />
    <circle cx="1200" cy="205" r="16" fill="none" stroke="rgba(227,169,0,.55)" strokeWidth="1.6" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageW 12s linear infinite", animationDelay: "4.15s" }} /><circle cx="1200" cy="205" r="13" fill="#fff" stroke="#aab1bf" strokeWidth="3.4" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageFY 12s linear infinite", animationDelay: "4.15s" }} />
    <circle cx="960" cy="435" r="16" fill="none" stroke="rgba(88,41,199,.5)" strokeWidth="1.6" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageW 12s linear infinite", animationDelay: "7.23s" }} /><circle cx="960" cy="435" r="13" fill="#fff" stroke="#aab1bf" strokeWidth="3.4" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageF 12s linear infinite", animationDelay: "7.23s" }} />
    <circle cx="580" cy="435" r="16" fill="none" stroke="rgba(88,41,199,.5)" strokeWidth="1.6" opacity="0" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageW 12s linear infinite", animationDelay: "9.07s" }} /><circle cx="580" cy="435" r="13" fill="#fff" stroke="#aab1bf" strokeWidth="3.4" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosstageF 12s linear infinite", animationDelay: "9.07s" }} />
    <text x="360" y="92" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1.4px" }} fill="#4c24ab">01</text>
    <text x="360" y="124" textAnchor="middle" style={{ fontWeight: "600", fontSize: "19px", letterSpacing: "1px" }} fill="#6b7280">BEGIN WITH CONTEXT</text>
    <line x1="360" y1="142" x2="360" y2="184" stroke="#c3c9d4" strokeWidth="2" />
    <text x="640" y="92" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1.4px" }} fill="#4c24ab">02</text>
    <text x="640" y="124" textAnchor="middle" style={{ fontWeight: "600", fontSize: "19px", letterSpacing: "1px" }} fill="#6b7280">ADD A MARKET SIGNAL</text>
    <line x1="640" y1="142" x2="640" y2="184" stroke="#c3c9d4" strokeWidth="2" />
    <text x="920" y="92" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1.4px" }} fill="#4c24ab">03</text>
    <text x="920" y="124" textAnchor="middle" style={{ fontWeight: "600", fontSize: "19px", letterSpacing: "1px" }} fill="#6b7280">EXPLORE DIRECTIONS</text>
    <line x1="920" y1="142" x2="920" y2="184" stroke="#c3c9d4" strokeWidth="2" />
    <text x="1200" y="92" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1.4px" }} fill="#4c24ab">04</text>
    <text x="1200" y="124" textAnchor="middle" style={{ fontWeight: "600", fontSize: "19px", letterSpacing: "1px" }} fill="#6b7280">PRODUCE THE ASSET</text>
    <line x1="1200" y1="142" x2="1200" y2="184" stroke="#c3c9d4" strokeWidth="2" />
    <text x="960" y="500" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1.4px" }} fill="#4c24ab">05</text>
    <text x="960" y="532" textAnchor="middle" style={{ fontWeight: "600", fontSize: "19px", letterSpacing: "1px" }} fill="#6b7280">REVIEW AND REFINE</text>
    <text x="580" y="500" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1.4px" }} fill="#4c24ab">06</text>
    <text x="580" y="532" textAnchor="middle" style={{ fontWeight: "600", fontSize: "19px", letterSpacing: "1px" }} fill="#6b7280">REUSE WHAT WAS LEARNED</text>
    </svg>
  );
}
