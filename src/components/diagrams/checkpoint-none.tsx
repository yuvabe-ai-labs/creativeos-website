/**
 * No review checkpoint: one flawed image fans out into four rejected videos.
 *
 * Ported from the Design Canvas source; see design-reference/.
 */

/** Where the four generated videos land, all of them rejected. */
const VIDEOS = [90, 170, 250, 330] as const;

export function CheckpointNone() {
  return (
    <svg viewBox="0 0 800 470" className="block h-auto w-full" aria-hidden="true">
      <g fill="none" stroke="#c3c9d4" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 14">
        <line x1="206" y1="200" x2="364" y2="200" />
        {VIDEOS.map((y) => (
          <line key={y} x1="418" y1="200" x2="592" y2={y} />
        ))}
      </g>
      <g fill="none" stroke="#f04e28" strokeWidth="5" strokeLinecap="round">
        <line x1="206" y1="200" x2="364" y2="200" strokeDasharray="14 900" style={{ animation: "cosloopS 4.8s linear infinite", animationDelay: "0s" }} />
        {VIDEOS.map((y) => (
          <line
            key={y}
            x1="418"
            y1="200"
            x2="592"
            y2={y}
            strokeDasharray="14 900"
            style={{ animation: "cosloopS 4.8s linear infinite", animationDelay: "1.2s" }}
          />
        ))}
      </g>
      <circle cx="180" cy="200" r="40" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
      <circle cx="180" cy="200" r="40" fill="#6b728022" />
      <circle cx="180" cy="200" r="26" fill="#fff" stroke="#6b7280" strokeWidth="4" />
      <circle cx="180" cy="200" r="8" fill="#f04e28" />
      <circle cx="390" cy="200" r="26" fill="none" stroke="#9ca3af" strokeWidth="3" strokeDasharray="5 8" />
      {VIDEOS.map((y) => (
        <g key={y}>
          <circle cx="620" cy={y} r="40" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
          <circle cx="620" cy={y} r="40" fill="#f04e2822" />
          <circle cx="620" cy={y} r="26" fill="#fff" stroke="#f04e28" strokeWidth="4" />
          <path d={`M611,${y - 9} L629,${y + 9} M629,${y - 9} L611,${y + 9}`} stroke="#f04e28" strokeWidth="4" strokeLinecap="round" />
        </g>
      ))}
      <text x="180" y="130" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px" }} fill="#374151">Image</text>
      <text x="390" y="266" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px" }} fill="#9ca3af">No review</text>
      <text x="620" y="420" textAnchor="middle" style={{ fontWeight: "600", fontSize: "20px" }} fill="#8a2e18">4x more expensive</text>
    </svg>
  );
}
