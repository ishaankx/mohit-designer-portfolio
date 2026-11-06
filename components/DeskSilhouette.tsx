export default function DeskSilhouette({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1536 743" preserveAspectRatio="none" role="img" aria-label="A dark desk with a monitor, laptop, keyboard and lamp, lit in red.">
      <defs>
        <linearGradient id="ds-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a050a" />
          <stop offset=".08" stopColor="#120305" />
          <stop offset="1" stopColor="#050304" />
        </linearGradient>
        <linearGradient id="ds-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a0306" />
          <stop offset=".6" stopColor="#5c0912" />
          <stop offset="1" stopColor="#1a0306" />
        </linearGradient>
        <radialGradient id="ds-bulb">
          <stop offset="0" stopColor="#ff8a93" />
          <stop offset="1" stopColor="#e32b3c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="464" width="1536" height="279" fill="url(#ds-desk)" />
      <rect x="0" y="463" width="1536" height="2" fill="#e32b3c" opacity=".5" />
      <rect x="410" y="44" width="720" height="366" rx="8" fill="#0b0506" stroke="#8a0c1a" strokeWidth="3" />
      <rect x="422" y="59" width="696" height="339" fill="url(#ds-screen)" />
      <path d="M720 410 h100 l18 64 h-136 z" fill="#0b0506" />
      <rect x="640" y="468" width="260" height="22" rx="4" fill="#0b0506" stroke="#5c0912" />
      <path d="M30 254 h360 v236 h-360 z" fill="#0b0506" stroke="#8a0c1a" strokeWidth="3" />
      <rect x="44" y="268" width="332" height="206" fill="url(#ds-screen)" opacity=".8" />
      <path d="M0 490 h420 l100 70 h-520 z" fill="#120305" stroke="#5c0912" />
      <rect x="560" y="510" width="476" height="86" rx="6" fill="#0b0506" stroke="#b3101f" strokeWidth="2" />
      <path d="M1230 120 l70 -40 l200 130 l-80 270 l70 0 l0 24 l-150 0 l0 -24 l60 0 l70 -240 l-150 -100 z" fill="#0b0506" stroke="#5c0912" strokeWidth="3" />
      <path d="M1180 210 q90 -110 170 0 z" fill="#0b0506" stroke="#b3101f" strokeWidth="3" />
      <circle cx="1265" cy="200" r="60" fill="url(#ds-bulb)" />
      <rect x="1150" y="400" width="90" height="110" rx="6" fill="#0b0506" stroke="#5c0912" />
      <rect x="1250" y="400" width="110" height="110" rx="8" fill="#0b0506" stroke="#5c0912" />
      <rect x="1040" y="560" width="470" height="130" rx="8" fill="#0b0506" stroke="#8a0c1a" strokeWidth="2" />
    </svg>
  );
}
