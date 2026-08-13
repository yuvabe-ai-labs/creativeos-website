/**
 * Market signals refracted through brand context into one creative direction.
 *
 * Type follows the same rules as the other diagrams: the five signals are items,
 * so they are sentence case in `#6b7280`; MARKET SIGNALS, BRAND CONTEXT and ONE
 * SHARP DIRECTION are group headings, so they keep the caps the site uses for
 * CREATIVEOS and the capsule's stage names.
 *
 * Sizes are set so labels RENDER at ~14px, as they do in every other diagram.
 * That is not the same as sharing a font-size: this viewBox is 1080 wide in a
 * frame the others meet at 600-1560, so its units are a different size on
 * screen. Its labels were 11px here, which came out visibly smaller than
 * everything else on the page — and in `#b6bcc7`, a grey that exists nowhere
 * in the palette.
 *
 * Ported from the Design Canvas source; see design-reference/.
 */
export function SignalLens() {
  return (
    <svg
    viewBox="0 0 1080 360"
    className="block h-auto w-full" aria-hidden="true">
    <defs>
    <radialGradient id="cosLensGlow" cx="50%" cy="50%" r="50%">
    <stop offset="0" stopColor="#5829c7" stopOpacity=".16" />
    <stop offset="1" stopColor="#5829c7" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="cosLensFill" x1="0" y1="70" x2="0" y2="290" gradientUnits="userSpaceOnUse">
    <stop offset="0" stopColor="#ffffff" stopOpacity=".92" />
    <stop offset=".5" stopColor="#e9e4f6" stopOpacity=".85" />
    <stop offset="1" stopColor="#ffffff" stopOpacity=".92" />
    </linearGradient>
    <linearGradient id="cosBeam" x1="560" y1="0" x2="880" y2="0" gradientUnits="userSpaceOnUse">
    <stop offset="0" stopColor="#9688c0" />
    <stop offset="1" stopColor="#5829c7" />
    </linearGradient>
    </defs>
    <text x="128" y="28" style={{ fontWeight: "600", fontSize: "13px", letterSpacing: "1px" }} fill="#6b7280">MARKET SIGNALS</text>
    <text x="226" y="60" textAnchor="end" style={{ fontWeight: "500", fontSize: "13px" }} fill="#6b7280">Trending format</text>
    <text x="226" y="123" textAnchor="end" style={{ fontWeight: "500", fontSize: "13px" }} fill="#6b7280">Competitor pattern</text>
    <text x="226" y="186" textAnchor="end" style={{ fontWeight: "500", fontSize: "13px" }} fill="#6b7280">Seasonal moment</text>
    <text x="226" y="249" textAnchor="end" style={{ fontWeight: "500", fontSize: "13px" }} fill="#6b7280">Audience shift</text>
    <text x="226" y="312" textAnchor="end" style={{ fontWeight: "500", fontSize: "13px" }} fill="#6b7280">Past performance</text>
    
    <path d="M240,56 C380,56 460,130.4 534,160.16" fill="none" stroke="#c3c9d4" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M240,56 C380,56 460,130.4 534,160.16" fill="none" stroke="#9688c0" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="6 130" style={{ animation: "cosray 3.6s linear infinite", animationDelay: "0s" }} />
    <path d="M240,119 C380,119 460,155.6 534,170.24" fill="none" stroke="#c3c9d4" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M240,119 C380,119 460,155.6 534,170.24" fill="none" stroke="#9688c0" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="6 130" style={{ animation: "cosray 3.6s linear infinite", animationDelay: "0.7s" }} />
    <path d="M240,182 C380,182 460,180.8 534,180.32" fill="none" stroke="#c3c9d4" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M240,182 C380,182 460,180.8 534,180.32" fill="none" stroke="#9688c0" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="6 130" style={{ animation: "cosray 3.6s linear infinite", animationDelay: "1.4s" }} />
    <path d="M240,245 C380,245 460,206 534,190.4" fill="none" stroke="#c3c9d4" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M240,245 C380,245 460,206 534,190.4" fill="none" stroke="#9688c0" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="6 130" style={{ animation: "cosray 3.6s linear infinite", animationDelay: "2.1s" }} />
    <path d="M240,308 C380,308 460,231.2 534,200.48" fill="none" stroke="#c3c9d4" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M240,308 C380,308 460,231.2 534,200.48" fill="none" stroke="#9688c0" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="6 130" style={{ animation: "cosray 3.6s linear infinite", animationDelay: "2.8s" }} />
    
    <circle cx="240" cy="56" r="4.5" fill="#fff" stroke="#c3c9d4" strokeWidth="1.8" />
    <circle cx="240" cy="119" r="4.5" fill="#fff" stroke="#c3c9d4" strokeWidth="1.8" />
    <circle cx="240" cy="182" r="4.5" fill="#fff" stroke="#c3c9d4" strokeWidth="1.8" />
    <circle cx="240" cy="245" r="4.5" fill="#fff" stroke="#c3c9d4" strokeWidth="1.8" />
    <circle cx="240" cy="308" r="4.5" fill="#fff" stroke="#c3c9d4" strokeWidth="1.8" />
    
    <ellipse cx="560" cy="180" rx="90" ry="150" fill="url(#cosLensGlow)" />
    <ellipse cx="560" cy="180" rx="32" ry="110" fill="url(#cosLensFill)" stroke="#5829c7" strokeWidth="2" />
    <path d="M548,112 C540,150 540,210 548,248" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="3" strokeLinecap="round" opacity=".8" />
    <ellipse cx="560" cy="180" rx="32" ry="110" fill="rgba(88,41,199,.06)" style={{ animation: "cosglow 4s ease-in-out infinite", transformOrigin: "560px 180px" }} />
    <path d="M534,160.2 L588,180" stroke="rgba(88,41,199,.35)" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M534,170.2 L588,180" stroke="rgba(88,41,199,.35)" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M534,180.3 L588,180" stroke="rgba(88,41,199,.35)" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M534,190.4 L588,180" stroke="rgba(88,41,199,.35)" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M534,200.5 L588,180" stroke="rgba(88,41,199,.35)" strokeWidth="1.4" strokeLinecap="round" />
    <text x="560" y="30" textAnchor="middle" style={{ fontWeight: "600", fontSize: "13px", letterSpacing: "1px" }} fill="#4c24ab">BRAND CONTEXT</text>
    <path d="M584,180 C700,180 780,180 858,180" fill="none" stroke="url(#cosBeam)" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M584,180 C700,180 780,180 858,180" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="10 70" style={{ animation: "cosbeam 2.4s linear infinite" }} opacity=".9" />
    <circle cx="872" cy="180" r="9" fill="#5829c7" />
    <circle cx="872" cy="180" r="16" fill="none" stroke="rgba(88,41,199,.30)" strokeWidth="2" style={{ animation: "cosglow 3s ease-in-out infinite", transformOrigin: "872px 180px" }} />
    <text x="872" y="140" textAnchor="middle" style={{ fontWeight: "600", fontSize: "13px", letterSpacing: "1px" }} fill="#4c24ab">ONE SHARP DIRECTION</text>
    <text x="872" y="226" textAnchor="middle" style={{ fontWeight: "500", fontSize: "13px", letterSpacing: "1px" }} fill="#9688c0">fits the brand and the moment</text>
    </svg>
  );
}
