/**
 * Review sits between image and video: the flaw loops back once, at the image,
 * and only the corrected pass continues to video.
 *
 * The red return arc fires 0.6s into the 6s cycle — before the image->video
 * run at 2.6s — so the fix visibly happens first.
 *
 * Ported from the Design Canvas source; see design-reference/.
 */
export function CheckpointReview() {
  return (
    <svg viewBox="0 0 800 470" className="block h-auto w-full" aria-hidden="true">
      <defs>
        <marker id="cosArrowP4" markerWidth="6" markerHeight="6" refX="4.5" refY="3" orient="auto">
          <path d="M0.5,0.5 L5.5,3 L0.5,5.5 Z" fill="#5829c7" />
        </marker>
      </defs>
      <rect x="46" y="36" width="708" height="400" rx="30" fill="rgba(88,41,199,.04)" stroke="rgba(88,41,199,.35)" strokeWidth="2" />
      <text x="84" y="76" style={{ fontWeight: "600", fontSize: "19px", letterSpacing: "2px" }} fill="#5829c7">CREATIVEOS</text>
      <g fill="none" stroke="#9688c0" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="2 14">
        <line x1="226" y1="200" x2="364" y2="200" />
        <line x1="426" y1="200" x2="574" y2="200" />
      </g>
      <path d="M374,232 C340,300 260,300 226,232" fill="none" stroke="#5829c7" strokeWidth="4" strokeLinecap="round" markerEnd="url(#cosArrowP4)" />
      <circle cx="400" cy="200" r="38" fill="none" stroke="#f04e28" strokeWidth="3" strokeDasharray="5 8" />
      <g fill="none" stroke="#5829c7" strokeWidth="5" strokeLinecap="round">
        <line x1="226" y1="200" x2="364" y2="200" strokeDasharray="14 900" style={{ animation: "cosloopS 6s linear infinite", animationDelay: "0s" }} />
        <path d="M374,232 C340,300 260,300 226,232" stroke="#f04e28" strokeWidth="10" strokeDasharray="14 900" style={{ animation: "cosloopR 6s linear infinite", animationDelay: "0.6s" }} />
        <line x1="226" y1="200" x2="574" y2="200" strokeDasharray="14 900" style={{ animation: "cosloopS 6s linear infinite", animationDelay: "2.6s" }} />
      </g>
      <circle cx="200" cy="200" r="40" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
      <circle cx="200" cy="200" r="40" fill="#5829c722" />
      <circle cx="200" cy="200" r="26" fill="#fff" stroke="#5829c7" strokeWidth="4" />
      <circle cx="200" cy="200" r="8" fill="#f04e28" />
      <circle cx="400" cy="200" r="40" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
      <circle cx="400" cy="200" r="40" fill="#5829c722" />
      <circle cx="400" cy="200" r="26" fill="#fff" stroke="#5829c7" strokeWidth="4" />
      <path d="M390,200 L397,207 L412,190" fill="none" stroke="#5829c7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="600" cy="200" r="40" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
      <circle cx="600" cy="200" r="40" fill="#5829c722" />
      <circle cx="600" cy="200" r="26" fill="#fff" stroke="#5829c7" strokeWidth="4" />
      <circle cx="600" cy="200" r="14" fill="#5829c7" />
      <text x="200" y="130" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px" }} fill="#374151">Image</text>
      <text x="400" y="130" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px" }} fill="#374151">Review</text>
      <text x="600" y="130" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px" }} fill="#374151">Video</text>
      <text x="300" y="330" textAnchor="middle" style={{ fontWeight: "500", fontSize: "19px" }} fill="#7a68ad">fixed at the image ↺</text>
    </svg>
  );
}
