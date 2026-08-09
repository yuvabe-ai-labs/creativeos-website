/**
 * The same lanes with context established once, fanning out into four assets.
 *
 * Ported verbatim from the Design Canvas source; see design-reference/.
 */
export function ContextOnceChart() {
  return (
    <svg
    viewBox="0 0 1080 340"
    className="block h-auto w-full" aria-hidden="true">
    <defs>
    <linearGradient id="cosFadeB" x1="60" y1="118" x2="1020" y2="340" gradientUnits="userSpaceOnUse">
    <stop offset="0" stopColor="#cbc3df" stopOpacity=".22" />
    <stop offset="1" stopColor="#9688c0" stopOpacity=".5" />
    </linearGradient>
    </defs>
    <path d="M60,118.0 C240,104 420,118.014 600,108 S 960,118.012 1020,112" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,128.6 C240,114.6 420,128.614 600,118.6 S 960,128.612 1020,122.6" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,139.2 C240,125.19999999999999 420,139.214 600,129.2 S 960,139.212 1020,133.2" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,149.8 C240,135.8 420,149.814 600,139.8 S 960,149.812 1020,143.8" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,160.4 C240,146.4 420,160.414 600,150.4 S 960,160.412 1020,154.4" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,171.0 C240,157 420,171.014 600,161 S 960,171.012 1020,165" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,181.6 C240,167.6 420,181.614 600,171.6 S 960,181.612 1020,175.6" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,192.2 C240,178.2 420,192.214 600,182.2 S 960,192.212 1020,186.2" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,202.8 C240,188.8 420,202.814 600,192.8 S 960,202.812 1020,196.8" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,213.4 C240,199.4 420,213.414 600,203.4 S 960,213.412 1020,207.4" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,224.0 C240,210 420,224.014 600,214 S 960,224.012 1020,218" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,234.6 C240,220.6 420,234.614 600,224.6 S 960,234.612 1020,228.6" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,245.2 C240,231.2 420,245.214 600,235.2 S 960,245.212 1020,239.2" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,255.8 C240,241.8 420,255.814 600,245.8 S 960,255.812 1020,249.8" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,266.4 C240,252.39999999999998 420,266.414 600,256.4 S 960,266.412 1020,260.4" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,277.0 C240,263 420,277.014 600,267 S 960,277.012 1020,271" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,287.6 C240,273.6 420,287.614 600,277.6 S 960,287.612 1020,281.6" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,298.2 C240,284.2 420,298.214 600,288.2 S 960,298.212 1020,292.2" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,308.8 C240,294.8 420,308.814 600,298.8 S 960,308.812 1020,302.8" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    <path d="M60,319.4 C240,305.4 420,319.414 600,309.4 S 960,319.412 1020,313.4" fill="none" stroke="url(#cosFadeB)" strokeWidth="1" />
    
    <g transform="translate(180,18) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="6" rx="2" /><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></g>
    <text x="190" y="52" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">EXPLAIN THE BRAND</text>
    <line x1="190" y1="62" x2="190" y2="78" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="190" y1="78" x2="190" y2="316" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(310,54) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" /></g>
    <text x="320" y="88" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">TONE OF VOICE</text>
    <line x1="320" y1="98" x2="320" y2="114" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="320" y1="114" x2="320" y2="316" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(440,18) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="M3.3 7 12 12l8.7-5" /><path d="M12 22V12" /></g>
    <text x="450" y="52" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">PRODUCT DETAILS</text>
    <line x1="450" y1="62" x2="450" y2="78" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="450" y1="78" x2="450" y2="316" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(570,54) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></g>
    <text x="580" y="88" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">MOOD + LIGHTING</text>
    <line x1="580" y1="98" x2="580" y2="114" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="580" y1="114" x2="580" y2="316" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(700,18) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></g>
    <text x="710" y="52" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">COLORS + REFS</text>
    <line x1="710" y1="62" x2="710" y2="78" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="710" y1="78" x2="710" y2="316" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(830,54) scale(0.86)" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></g>
    <text x="840" y="88" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="#9ca3af">COMPLIANCE CHECK</text>
    <line x1="840" y1="98" x2="840" y2="114" stroke="#c3c9d4" strokeWidth="1.6" />
    <line x1="840" y1="114" x2="840" y2="316" stroke="#c3c9d4" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    <g transform="translate(970,18) scale(0.86)" fill="none" stroke="#5829c7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4" /><path d="m10 9 5 3-5 3z" /></g>
    <text x="980" y="52" textAnchor="middle" style={{ fontWeight: "600", fontSize: "12px", letterSpacing: "1px" }} fill="rgba(76,36,171,.8)">WORK STARTS HERE</text>
    <line x1="980" y1="62" x2="980" y2="78" stroke="#5829c7" strokeWidth="1.6" />
    <line x1="980" y1="78" x2="980" y2="316" stroke="#5829c7" strokeWidth="1.2" strokeDasharray="2 7" opacity=".65" />
    
    <text x="52" y="211" textAnchor="end" style={{ fontWeight: "500", fontSize: "13px" }} fill="#6b7280">Once</text>
    <path d="M80,206 C129.5,216 157,216 190,212 C248.5,200 281,194 320,198.8 C378.5,206.8 411,214 450,210.8 C508.5,200.8 541,196 580,200 C638.5,212 671,218 710,213.2 C768.5,205.2 801,198 840,201.2" fill="none" stroke="#5829c7" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="190" cy="212" r="6" fill="#fff" stroke="#5829c7" strokeWidth="2" />
    <circle cx="320" cy="198.8" r="6" fill="#fff" stroke="#5829c7" strokeWidth="2" />
    <circle cx="450" cy="210.8" r="6" fill="#fff" stroke="#5829c7" strokeWidth="2" />
    <circle cx="580" cy="200" r="6" fill="#fff" stroke="#5829c7" strokeWidth="2" />
    <circle cx="710" cy="213.2" r="6" fill="#fff" stroke="#5829c7" strokeWidth="2" />
    <circle cx="840" cy="201.2" r="6" fill="#fff" stroke="#5829c7" strokeWidth="2" />
    <path d="M840,201.2 C910,201.2 920,140 980,140" fill="none" stroke="#5829c7" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="980" cy="140" r="9" fill="#5829c7" /><circle cx="980" cy="140" r="15" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    <path d="M840,201.2 C910,201.2 920,186 980,186" fill="none" stroke="#5829c7" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="980" cy="186" r="9" fill="#5829c7" /><circle cx="980" cy="186" r="15" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    <path d="M840,201.2 C910,201.2 920,232 980,232" fill="none" stroke="#5829c7" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="980" cy="232" r="9" fill="#5829c7" /><circle cx="980" cy="232" r="15" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    <path d="M840,201.2 C910,201.2 920,278 980,278" fill="none" stroke="#5829c7" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="980" cy="278" r="9" fill="#5829c7" /><circle cx="980" cy="278" r="15" fill="none" stroke="rgba(88,41,199,.28)" strokeWidth="2" />
    <circle cx="840" cy="201.2" r="6" fill="#fff" stroke="#5829c7" strokeWidth="2" />
    
    </svg>
  );
}
