/**
 * Four asset lanes, each repeating the full setup before any real work starts.
 *
 * Ported verbatim from the Design Canvas source; see design-reference/.
 */
export function ContextRebuiltChart() {
  return (
    <svg
    viewBox="0 0 1080 340"
    className="block h-auto w-full" aria-hidden="true">
    <defs>
    <linearGradient id="cosFade" x1="60" y1="116" x2="1020" y2="336" gradientUnits="userSpaceOnUse">
    <stop offset="0" stopColor="#cbc3df" stopOpacity=".22" />
    <stop offset="1" stopColor="#9688c0" stopOpacity=".5" />
    </linearGradient>
    </defs>
    <path d="M60,116.0 C240,102 420,116.014 600,106 S 960,116.012 1020,110" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,126.6 C240,112.6 420,126.614 600,116.6 S 960,126.612 1020,120.6" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,137.2 C240,123.19999999999999 420,137.214 600,127.19999999999999 S 960,137.212 1020,131.2" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,147.8 C240,133.8 420,147.814 600,137.8 S 960,147.812 1020,141.8" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,158.4 C240,144.4 420,158.414 600,148.4 S 960,158.412 1020,152.4" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,169.0 C240,155 420,169.014 600,159 S 960,169.012 1020,163" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,179.6 C240,165.6 420,179.614 600,169.6 S 960,179.612 1020,173.6" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,190.2 C240,176.2 420,190.214 600,180.2 S 960,190.212 1020,184.2" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,200.8 C240,186.8 420,200.814 600,190.8 S 960,200.812 1020,194.8" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,211.4 C240,197.4 420,211.414 600,201.4 S 960,211.412 1020,205.4" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,222.0 C240,208 420,222.014 600,212 S 960,222.012 1020,216" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,232.6 C240,218.6 420,232.614 600,222.6 S 960,232.612 1020,226.6" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,243.2 C240,229.2 420,243.214 600,233.2 S 960,243.212 1020,237.2" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,253.8 C240,239.8 420,253.814 600,243.8 S 960,253.812 1020,247.8" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,264.4 C240,250.39999999999998 420,264.414 600,254.39999999999998 S 960,264.412 1020,258.4" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,275.0 C240,261 420,275.014 600,265 S 960,275.012 1020,269" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,285.6 C240,271.6 420,285.614 600,275.6 S 960,285.612 1020,279.6" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,296.2 C240,282.2 420,296.214 600,286.2 S 960,296.212 1020,290.2" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,306.8 C240,292.8 420,306.814 600,296.8 S 960,306.812 1020,300.8" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,317.4 C240,303.4 420,317.414 600,307.4 S 960,317.412 1020,311.4" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    <path d="M60,328.0 C240,314 420,328.014 600,318 S 960,328.012 1020,322" fill="none" stroke="url(#cosFade)" strokeWidth="1" />
    
    <g transform="translate(180,18) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="6" rx="2" /><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></g>
    <text x="190" y="52" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">EXPLAIN THE BRAND</text>
    <line x1="190" y1="62" x2="190" y2="78" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="190" y1="78" x2="190" y2="336" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(310,54) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" /></g>
    <text x="320" y="88" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">TONE OF VOICE</text>
    <line x1="320" y1="98" x2="320" y2="114" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="320" y1="114" x2="320" y2="336" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(440,18) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5" /><path d="M12 22V12" /></g>
    <text x="450" y="52" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">PRODUCT DETAILS</text>
    <line x1="450" y1="62" x2="450" y2="78" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="450" y1="78" x2="450" y2="336" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(570,54) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></g>
    <text x="580" y="88" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">MOOD + LIGHTING</text>
    <line x1="580" y1="98" x2="580" y2="114" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="580" y1="114" x2="580" y2="336" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(700,18) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></g>
    <text x="710" y="52" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">COLORS + REFS</text>
    <line x1="710" y1="62" x2="710" y2="78" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="710" y1="78" x2="710" y2="336" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(830,54) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></g>
    <text x="840" y="88" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">COMPLIANCE CHECK</text>
    <line x1="840" y1="98" x2="840" y2="114" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="840" y1="114" x2="840" y2="336" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(970,18) scale(0.86)" fill="none" stroke="#5829c7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4" /><path d="m10 9 5 3-5 3z" /></g>
    <text x="980" y="52" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="rgba(76,36,171,.8)">ACTUAL WORK</text>
    <line x1="980" y1="62" x2="980" y2="78" stroke="#5829c7" strokeWidth="1.6" />
    <line x1="980" y1="78" x2="980" y2="336" stroke="#5829c7" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    
    <path d="M80,146 C129.5,156 157,156 190,152 C248.5,144 281,138 320,141.2 C378.5,148.2 411,153 450,150.2 C508.5,141.2 541,137 580,140.6 C638.5,146.6 671,152 710,149.6 C768.5,142.6 801,139 840,141.8" fill="none" stroke="#aab1bf" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 8" />
    <path d="M840,141.8 C895,143.48000000000002 925,146 980,146" fill="none" stroke="#5829c7" strokeWidth="2.4" strokeLinecap="round" />
    <text x="52" y="151" textAnchor="end" style={{ fontWeight: "500", fontSize: "13px" }} fill="#6b7280">Post 1</text>
    <circle cx="190" cy="152" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="320" cy="141.2" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="450" cy="150.2" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="580" cy="140.6" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="710" cy="149.6" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="840" cy="141.8" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="980" cy="146" r="9" fill="#5829c7" /><circle cx="980" cy="146" r="15" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    <path d="M80,208 C129.5,199 157,199 190,202.6 C248.5,209.6 281,215 320,212.2 C378.5,206.2 411,202 450,204.4 C508.5,212.4 541,216 580,212.8 C638.5,204.8 671,200 710,203.2 C768.5,209.2 801,214 840,211.6" fill="none" stroke="#aab1bf" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 8" />
    <path d="M840,211.6 C895,210.16 925,208 980,208" fill="none" stroke="#5829c7" strokeWidth="2.4" strokeLinecap="round" />
    <text x="52" y="213" textAnchor="end" style={{ fontWeight: "500", fontSize: "13px" }} fill="#6b7280">Reel 1</text>
    <circle cx="190" cy="202.6" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="320" cy="212.2" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="450" cy="204.4" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="580" cy="212.8" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="710" cy="203.2" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="840" cy="211.6" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="980" cy="208" r="9" fill="#5829c7" /><circle cx="980" cy="208" r="15" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    <path d="M80,270 C129.5,278 157,278 190,274.8 C248.5,280.8 281,276 320,273.6 C378.5,264.6 411,261 450,264.6 C508.5,271.6 541,277 580,274.2 C638.5,268.2 671,264 710,266.4 C768.5,274.4 801,278 840,274.8" fill="none" stroke="#aab1bf" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 8" />
    <path d="M840,274.8 C895,272.88 925,270 980,270" fill="none" stroke="#5829c7" strokeWidth="2.4" strokeLinecap="round" />
    <text x="52" y="275" textAnchor="end" style={{ fontWeight: "500", fontSize: "13px" }} fill="#6b7280">Post 2</text>
    <circle cx="190" cy="274.8" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="320" cy="273.6" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="450" cy="264.6" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="580" cy="274.2" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="710" cy="266.4" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="840" cy="274.8" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="980" cy="270" r="9" fill="#5829c7" /><circle cx="980" cy="270" r="15" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    <path d="M80,330 C129.5,323 157,323 190,325.8 C248.5,315.8 281,320 320,324 C378.5,332 411,338 450,334.8 C508.5,328.8 541,324 580,326.4 C638.5,335.4 671,339 710,335.4 C768.5,327.4 801,322 840,325.2" fill="none" stroke="#aab1bf" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 8" />
    <path d="M840,325.2 C895,327.12 925,330 980,330" fill="none" stroke="#5829c7" strokeWidth="2.4" strokeLinecap="round" />
    <text x="52" y="335" textAnchor="end" style={{ fontWeight: "500", fontSize: "13px" }} fill="#6b7280">Reel 2</text>
    <circle cx="190" cy="325.8" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="320" cy="324" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="450" cy="334.8" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="580" cy="326.4" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="710" cy="335.4" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="840" cy="325.2" r="6" fill="#fff" stroke="#aab1bf" strokeWidth="2" />
    <circle cx="980" cy="330" r="9" fill="#5829c7" /><circle cx="980" cy="330" r="15" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    
    </svg>
  );
}
