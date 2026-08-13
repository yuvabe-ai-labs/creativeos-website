/**
 * The same four stages — script, images, video, review — inside one CreativeOS
 * boundary. The dot runs the square on a 4.8s cycle and the review leg returns
 * as a solid arrow: the correction goes straight back without leaving the canvas.
 *
 * Ported from the Design Canvas source; see design-reference/.
 */
export function CanvasLoop() {
  return (
    <svg viewBox="0 0 800 470" className="block h-auto w-full" aria-hidden="true">
      <defs>
        <marker id="cosArrow2" markerWidth="6" markerHeight="6" refX="4.5" refY="3" orient="auto">
          <path d="M0.5,0.5 L5.5,3 L0.5,5.5 Z" fill="#5829c7" />
        </marker>
      </defs>
      <rect x="46" y="36" width="708" height="400" rx="30" fill="rgba(88,41,199,.04)" stroke="rgba(88,41,199,.35)" strokeWidth="2" />
      <text x="84" y="76" style={{ fontWeight: "600", fontSize: "19px", letterSpacing: "2px" }} fill="#5829c7">CREATIVEOS</text>
      <g fill="none" stroke="#9688c0" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="2 14">
        <line x1="278" y1="170" x2="514" y2="170" />
        <line x1="560" y1="218" x2="560" y2="286" />
        <line x1="240" y1="286" x2="240" y2="218" />
      </g>
      <path d="M512,334 L288,334" fill="none" stroke="#5829c7" strokeWidth="4" strokeLinecap="round" markerEnd="url(#cosArrow2)" />
      <circle cx="560" cy="334" r="40" fill="none" stroke="#f04e28" strokeWidth="3" strokeDasharray="5 8" />
      <g fill="none" stroke="#5829c7" strokeWidth="5" strokeLinecap="round">
        <path d="M278,170 L514,170" strokeDasharray="14 900" style={{ animation: "cosloopS 4.8s linear infinite", animationDelay: "0s" }} />
        <path d="M560,218 L560,286" strokeDasharray="14 900" style={{ animation: "cosloopS 4.8s linear infinite", animationDelay: "1.2s" }} />
        <path d="M512,334 L288,334" strokeDasharray="14 900" style={{ animation: "cosloopS 4.8s linear infinite", animationDelay: "2.4s" }} />
        <path d="M240,286 L240,218" strokeDasharray="14 900" style={{ animation: "cosloopS 4.8s linear infinite", animationDelay: "3.6s" }} />
      </g>
      <circle cx="240" cy="170" r="40" fill="rgba(150,136,192,.30)" />
      <circle cx="240" cy="170" r="26" fill="#fff" stroke="#5829c7" strokeWidth="4" />
      <circle cx="560" cy="170" r="40" fill="rgba(150,136,192,.30)" />
      <circle cx="560" cy="170" r="26" fill="#fff" stroke="#5829c7" strokeWidth="4" />
      <circle cx="560" cy="334" r="40" fill="rgba(150,136,192,.30)" />
      <circle cx="560" cy="334" r="26" fill="#fff" stroke="#5829c7" strokeWidth="4" />
      <circle cx="240" cy="334" r="40" fill="rgba(150,136,192,.30)" />
      <circle cx="240" cy="334" r="26" fill="#fff" stroke="#5829c7" strokeWidth="4" />
      <text x="240" y="120" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px" }} fill="#374151">Script</text>
      <text x="560" y="120" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px" }} fill="#374151">Images</text>
      <text x="560" y="404" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px" }} fill="#374151">Video</text>
      <text x="240" y="404" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px" }} fill="#374151">Review</text>
    </svg>
  );
}
