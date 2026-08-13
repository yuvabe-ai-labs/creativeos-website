/**
 * Context set once, then three reels in parallel: the inputs run in on a
 * single leg and the node fans straight out to all three outputs at the same
 * moment. The counterpart to the serpentine in `context-repeat-snake`, on the
 * same 12s cycle so the two cards can be read against each other.
 *
 * The viewBox is a crop of a taller source drawing, which is why the geometry
 * starts at y=325 rather than 0. Ported from the Design Canvas source; see
 * design-reference/.
 */
export function ContextSetOnce() {
  return (
    <svg viewBox="0 325 680 215" className="block h-auto w-full" aria-hidden="true">
      <rect x="124" y="400" width="168" height="72" rx="12" fill="rgba(88,41,199,.06)" />
      <text x="208" y="496" textAnchor="middle" style={{ fontWeight: "500", fontSize: "15px", letterSpacing: "1px" }} fill="#9688c0">INPUTS × 1</text>
      <text x="120" y="415" textAnchor="end" style={{ fontWeight: "500", fontSize: "14px" }} fill="#6b7280">Brand context</text>
      <text x="120" y="441" textAnchor="end" style={{ fontWeight: "500", fontSize: "14px" }} fill="#6b7280">Market</text>
      <text x="120" y="467" textAnchor="end" style={{ fontWeight: "500", fontSize: "14px" }} fill="#6b7280">Visual aesthetics</text>

      <path d="M130,410 C190,410 230,436 282,436" fill="none" stroke="#c3c9d4" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      <line x1="130" y1="436" x2="282" y2="436" stroke="#c3c9d4" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      <path d="M130,462 C190,462 230,436 282,436" fill="none" stroke="#c3c9d4" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      <path d="M130,410 C190,410 230,436 282,436" fill="none" stroke="#5829c7" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="14 900" style={{ animation: "cosraceS 12s linear infinite", animationDelay: "0s" }} />
      <line x1="130" y1="436" x2="282" y2="436" fill="none" stroke="#5829c7" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="14 900" style={{ animation: "cosraceS 12s linear infinite", animationDelay: "0s" }} />
      <path d="M130,462 C190,462 230,436 282,436" fill="none" stroke="#5829c7" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="14 900" style={{ animation: "cosraceS 12s linear infinite", animationDelay: "0s" }} />

      <path d="M320,436 C400,436 420,364 500,364" fill="none" stroke="#c3c9d4" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      <line x1="320" y1="436" x2="500" y2="436" stroke="#c3c9d4" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      <path d="M320,436 C400,436 420,508 500,508" fill="none" stroke="#c3c9d4" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
      <path d="M320,436 C400,436 420,364 500,364" fill="none" stroke="#5829c7" strokeWidth="5" strokeLinecap="round" strokeDasharray="14 900" style={{ animation: "cosraceB 12s linear infinite" }} />
      <line x1="320" y1="436" x2="500" y2="436" fill="none" stroke="#5829c7" strokeWidth="5" strokeLinecap="round" strokeDasharray="14 900" style={{ animation: "cosraceP 12s linear infinite" }} />
      <path d="M320,436 C400,436 420,508 500,508" fill="none" stroke="#5829c7" strokeWidth="5" strokeLinecap="round" strokeDasharray="14 900" style={{ animation: "cosraceB 12s linear infinite" }} />

      <circle cx="300" cy="436" r="10" fill="#5829c7" />
      <circle cx="300" cy="436" r="17" fill="none" stroke="rgba(88,41,199,.35)" strokeWidth="2" />
      <circle cx="300" cy="436" r="17" fill="none" stroke="rgba(88,41,199,.5)" strokeWidth="2" style={{ transformBox: "fill-box", transformOrigin: "center", animation: "cosringD 12s linear infinite" }} />

      <rect x="510" y="340" width="118" height="48" rx="10" fill="rgba(88,41,199,.04)" stroke="#c3c9d4" strokeWidth="2" style={{ animation: "cosflashL 12s linear infinite" }} />
      <text x="569" y="370" textAnchor="middle" style={{ fontWeight: "500", fontSize: "18px" }} fill="#374151">Reel 1</text>
      <g style={{ animation: "costick1 12s linear infinite" }}>
        <circle cx="628" cy="340" r="11" fill="#16a34a" />
        <path d="M622.5,340 L626.5,344 L634,335.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="510" y="412" width="118" height="48" rx="10" fill="rgba(88,41,199,.04)" stroke="#c3c9d4" strokeWidth="2" style={{ animation: "cosflashL 12s linear infinite" }} />
      <text x="569" y="442" textAnchor="middle" style={{ fontWeight: "500", fontSize: "18px" }} fill="#374151">Reel 2</text>
      <g style={{ animation: "costick1 12s linear infinite" }}>
        <circle cx="628" cy="412" r="11" fill="#16a34a" />
        <path d="M622.5,412 L626.5,416 L634,407.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="510" y="484" width="118" height="48" rx="10" fill="rgba(88,41,199,.04)" stroke="#c3c9d4" strokeWidth="2" style={{ animation: "cosflashL 12s linear infinite" }} />
      <text x="569" y="514" textAnchor="middle" style={{ fontWeight: "500", fontSize: "18px" }} fill="#374151">Reel 3</text>
      <g style={{ animation: "costick1 12s linear infinite" }}>
        <circle cx="628" cy="484" r="11" fill="#16a34a" />
        <path d="M622.5,484 L626.5,488 L634,479.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
