/**
 * Converging input rays feeding a central node that emits one output beam.
 * The staggered `animation-delay` per comet path is what reads as "many signals,
 * one asset" — do not normalise the delays.
 *
 * Ported verbatim from the Design Canvas source; see design-reference/.
 */
export function HeroSignalFlow() {
  return (
    <svg viewBox="-50 0 610 560" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}>
    <text x="55" y="100" textAnchor="end" style={{ fontWeight: "500", fontSize: "12.5px", letterSpacing: ".4px" }} fill="#1f2937">Brand context</text>
    <circle cx="73" cy="96" r="3.5" fill="#9ca3af" />
    <text x="55" y="162" textAnchor="end" style={{ fontWeight: "500", fontSize: "12.5px", letterSpacing: ".4px" }} fill="#1f2937">Tone + claims</text>
    <circle cx="73" cy="158" r="3.5" fill="#9ca3af" />
    <text x="55" y="224" textAnchor="end" style={{ fontWeight: "500", fontSize: "12.5px", letterSpacing: ".4px" }} fill="#1f2937">Market trend</text>
    <circle cx="73" cy="220" r="3.5" fill="#9ca3af" />
    <text x="55" y="286" textAnchor="end" style={{ fontWeight: "500", fontSize: "12.5px", letterSpacing: ".4px" }} fill="#1f2937">Past generations</text>
    <circle cx="73" cy="282" r="3.5" fill="#9ca3af" />
    <text x="55" y="348" textAnchor="end" style={{ fontWeight: "500", fontSize: "12.5px", letterSpacing: ".4px" }} fill="#1f2937">References</text>
    <circle cx="73" cy="344" r="3.5" fill="#9ca3af" />
    <text x="55" y="410" textAnchor="end" style={{ fontWeight: "500", fontSize: "12.5px", letterSpacing: ".4px" }} fill="#1f2937">Corrections</text>
    <circle cx="73" cy="406" r="3.5" fill="#9ca3af" />
    <text x="55" y="472" textAnchor="end" style={{ fontWeight: "500", fontSize: "12.5px", letterSpacing: ".4px" }} fill="#1f2937">Review decisions</text>
    <circle cx="73" cy="468" r="3.5" fill="#9ca3af" />
    
    <circle cx="300" cy="255" r="1.6" fill="rgba(75,85,99,.14)" />
    <path d="M101,38 C196,38 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,38 C196,38 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray 6.2s linear infinite", animationDelay: "3.17s" }} />
    <path d="M101,50 C196,50 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,68 C196,68 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,90 C196,90 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,112 C196,112 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,112 C196,112 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray 6.2s linear infinite", animationDelay: "6.65s" }} />
    <path d="M101,134 C196,134 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,156 C196,156 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,178 C196,178 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,200 C196,200 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,200 C196,200 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray 6.2s linear infinite", animationDelay: "10.13s" }} />
    <path d="M101,222 C196,222 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,244 C196,244 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,266 C196,266 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,288 C196,288 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,288 C196,288 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray 6.2s linear infinite", animationDelay: "13.61s" }} />
    <path d="M101,310 C196,310 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,332 C196,332 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,354 C196,354 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,376 C196,376 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,376 C196,376 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray 6.2s linear infinite", animationDelay: "17.09s" }} />
    <path d="M101,398 C196,398 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,420 C196,420 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,442 C196,442 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,464 C196,464 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,464 C196,464 262,280 320,280" fill="none" stroke="rgba(88,41,199,.18)" strokeWidth="1" strokeDasharray="4 220" style={{ animation: "cosray 6.2s linear infinite", animationDelay: "20.57s" }} />
    <path d="M101,486 C196,486 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,508 C196,508 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M101,524 C196,524 262,280 320,280" fill="none" stroke="rgba(75,85,99,.05)" strokeWidth="1" />
    <path d="M95,44 C190,44 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,44 C190,44 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray 5.4s linear infinite", animationDelay: "1.72s" }} />
    <path d="M95,62 C190,62 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,84 C190,84 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,106 C190,106 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,106 C190,106 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray 5.4s linear infinite", animationDelay: "3.58s" }} />
    <path d="M95,128 C190,128 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,150 C190,150 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,172 C190,172 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,172 C190,172 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray 5.4s linear infinite", animationDelay: "5.44s" }} />
    <path d="M95,194 C190,194 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,216 C190,216 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,238 C190,238 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,238 C190,238 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray 5.4s linear infinite", animationDelay: "7.30s" }} />
    <path d="M95,260 C190,260 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,296 C190,296 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,318 C190,318 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,318 C190,318 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray 5.4s linear infinite", animationDelay: "9.16s" }} />
    <path d="M95,340 C190,340 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,362 C190,362 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,384 C190,384 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,384 C190,384 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray 5.4s linear infinite", animationDelay: "11.02s" }} />
    <path d="M95,406 C190,406 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,428 C190,428 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,450 C190,450 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,450 C190,450 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray 5.4s linear infinite", animationDelay: "12.88s" }} />
    <path d="M95,472 C190,472 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,496 C190,496 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,518 C190,518 262,280 320,280" fill="none" stroke="rgba(75,85,99,.08)" strokeWidth="1" />
    <path d="M95,518 C190,518 262,280 320,280" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="1.1" strokeDasharray="5 200" style={{ animation: "cosray 5.4s linear infinite", animationDelay: "14.74s" }} />
    <path d="M91,52 C186,52 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,52 C186,52 262,280 320,280" fill="none" stroke="rgba(88,41,199,.4)" strokeWidth="1.2" strokeDasharray="5 200" style={{ animation: "cosray 4.6s linear infinite", animationDelay: "0.00s" }} />
    <path d="M91,74 C186,74 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,118 C186,118 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,140 C186,140 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,140 C186,140 262,280 320,280" fill="none" stroke="rgba(88,41,199,.4)" strokeWidth="1.2" strokeDasharray="5 200" style={{ animation: "cosray 4.6s linear infinite", animationDelay: "1.65s" }} />
    <path d="M91,184 C186,184 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,206 C186,206 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,250 C186,250 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,250 C186,250 262,280 320,280" fill="none" stroke="rgba(88,41,199,.4)" strokeWidth="1.2" strokeDasharray="5 200" style={{ animation: "cosray 4.6s linear infinite", animationDelay: "3.30s" }} />
    <path d="M91,272 C186,272 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,316 C186,316 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,338 C186,338 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,338 C186,338 262,280 320,280" fill="none" stroke="rgba(88,41,199,.4)" strokeWidth="1.2" strokeDasharray="5 200" style={{ animation: "cosray 4.6s linear infinite", animationDelay: "4.95s" }} />
    <path d="M91,382 C186,382 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,404 C186,404 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,448 C186,448 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,448 C186,448 262,280 320,280" fill="none" stroke="rgba(88,41,199,.4)" strokeWidth="1.2" strokeDasharray="5 200" style={{ animation: "cosray 4.6s linear infinite", animationDelay: "6.60s" }} />
    <path d="M91,490 C186,490 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <path d="M91,512 C186,512 262,280 320,280" fill="none" stroke="rgba(75,85,99,.12)" strokeWidth="1.1" />
    <circle cx="87" cy="52" r="2" fill="#d1d5db" />
    <circle cx="87" cy="74" r="2" fill="#d1d5db" />
    <circle cx="87" cy="118" r="2" fill="#d1d5db" />
    <circle cx="87" cy="140" r="2" fill="#d1d5db" />
    <circle cx="87" cy="184" r="2" fill="#d1d5db" />
    <circle cx="87" cy="206" r="2" fill="#d1d5db" />
    <circle cx="87" cy="250" r="2" fill="#d1d5db" />
    <circle cx="87" cy="272" r="2" fill="#d1d5db" />
    <circle cx="87" cy="316" r="2" fill="#d1d5db" />
    <circle cx="87" cy="338" r="2" fill="#d1d5db" />
    <circle cx="87" cy="382" r="2" fill="#d1d5db" />
    <circle cx="87" cy="404" r="2" fill="#d1d5db" />
    <circle cx="87" cy="448" r="2" fill="#d1d5db" />
    <circle cx="87" cy="490" r="2" fill="#d1d5db" />
    <circle cx="87" cy="512" r="2" fill="#d1d5db" />
    <path d="M83,96 C180,96 260,280 320,280" fill="none" stroke="#8b93a3" strokeWidth="1.6" />
    <path d="M83,96 C180,96 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray 3.2s linear infinite", animationDelay: "0.00s" }} />
    <path d="M83,158 C180,158 260,280 320,280" fill="none" stroke="#8b93a3" strokeWidth="1.6" />
    <path d="M83,158 C180,158 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray 3.2s linear infinite", animationDelay: "0.40s" }} />
    <path d="M83,220 C180,220 260,280 320,280" fill="none" stroke="#8b93a3" strokeWidth="1.6" />
    <path d="M83,220 C180,220 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray 3.2s linear infinite", animationDelay: "0.80s" }} />
    <path d="M83,282 C180,282 260,280 320,280" fill="none" stroke="#8b93a3" strokeWidth="1.6" />
    <path d="M83,282 C180,282 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray 3.2s linear infinite", animationDelay: "1.20s" }} />
    <path d="M83,344 C180,344 260,280 320,280" fill="none" stroke="#8b93a3" strokeWidth="1.6" />
    <path d="M83,344 C180,344 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray 3.2s linear infinite", animationDelay: "1.60s" }} />
    <path d="M83,406 C180,406 260,280 320,280" fill="none" stroke="#8b93a3" strokeWidth="1.6" />
    <path d="M83,406 C180,406 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray 3.2s linear infinite", animationDelay: "2.00s" }} />
    <path d="M83,468 C180,468 260,280 320,280" fill="none" stroke="#8b93a3" strokeWidth="1.6" />
    <path d="M83,468 C180,468 260,280 320,280" fill="none" stroke="rgba(88,41,199,.8)" strokeWidth="1.6" strokeDasharray="7 160" style={{ animation: "cosray 3.2s linear infinite", animationDelay: "2.40s" }} />
    
    <circle cx="332" cy="280" r="22" fill="#5829c7" />
    <circle cx="332" cy="280" r="30" fill="none" stroke="rgba(88,41,199,.3)" strokeWidth="1.5" style={{ animation: "cosglow 3s ease-in-out infinite", transformOrigin: "332px 280px" }} />
    <path d="M8 5v14l11-7z" transform="translate(325,271)" fill="#140f2b" style={{ display: "none" }} />
    <g transform="translate(324,272)"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg></g>
    <line x1="362" y1="280" x2="448" y2="280" stroke="#d5d9e0" strokeWidth="1.6" />
    <line x1="362" y1="280" x2="448" y2="280" stroke="#5829c7" strokeWidth="2" strokeDasharray="7 60" style={{ animation: "cosbeam 3.2s linear infinite" }} />
    </svg>
  );
}
