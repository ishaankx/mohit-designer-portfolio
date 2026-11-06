import type { ArtKind } from "@/content/skills";

const C = { hot: "#ff4d5e", crimson: "#e32b3c", glow: "#ff8a93", b5: "#b3101f", b6: "#8a0c1a", b7: "#5c0912", paper: "#f4efea" };

export default function SkillArt({ kind, id }: { kind: ArtKind; id: string }) {
  const g = (n: string) => `${id}-${n}`;
  const url = (n: string) => `url(#${g(n)})`;

  switch (kind) {
    case "photo":
      return (
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id={g("s")} cx=".38" cy=".32" r=".7">
              <stop offset="0" stopColor={C.glow} />
              <stop offset=".35" stopColor={C.crimson} />
              <stop offset=".75" stopColor={C.b7} />
              <stop offset="1" stopColor="#1a0306" />
            </radialGradient>
          </defs>
          <circle cx="210" cy="230" r="150" fill={url("s")} />
          <path d="M92 300 A150 150 0 0 0 330 330" fill="none" stroke={C.hot} strokeWidth="3" opacity=".8" />
          <ellipse cx="210" cy="230" rx="182" ry="176" fill="none" stroke={C.paper} strokeWidth="1.5" strokeDasharray="6 5" opacity=".6" />
        </svg>
      );
    case "vector":
      return (
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M60 420 C 60 220, 340 300, 340 90" fill="none" stroke={C.hot} strokeWidth="7" />
          <path d="M150 360 L250 260 L300 360 Z" fill={C.b6} opacity=".9" />
          <line x1="60" y1="420" x2="60" y2="290" stroke={C.paper} strokeWidth="1.2" />
          <line x1="340" y1="90" x2="340" y2="220" stroke={C.paper} strokeWidth="1.2" />
          <circle cx="60" cy="290" r="5" fill={C.paper} />
          <circle cx="340" cy="220" r="5" fill={C.paper} />
          <rect x="52" y="412" width="16" height="16" fill={C.paper} />
          <rect x="332" y="82" width="16" height="16" fill={C.paper} />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={i} x1={20 + i * 30} y1="0" x2={20 + i * 30} y2="500" stroke={C.paper} strokeWidth=".6" opacity=".25" />
          ))}
          <rect x="20" y="40" width="270" height="56" fill={C.paper} opacity=".85" />
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={i % 2 ? 230 : 20} y={130 + Math.floor(i / 2) * 30} width={i % 2 ? 150 : 180} height="9" fill={C.paper} opacity=".55" />
          ))}
          <rect x="230" y="300" width="150" height="160" fill={C.b5} />
        </svg>
      );
    case "motion":
      return (
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={70 + i * 62} cy={300 - Math.sin(i / 1.3) * 160} r={22 + i * 6} fill={C.crimson} opacity={0.18 + i * 0.18} />
          ))}
          <line x1="30" y1="440" x2="370" y2="440" stroke={C.paper} strokeWidth="1.5" opacity=".6" />
          {[70, 194, 318].map((x) => (
            <rect key={x} x={x - 8} y="432" width="16" height="16" transform={`rotate(45 ${x} 440)`} fill={C.hot} />
          ))}
        </svg>
      );
    case "brush":
      return (
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M30 150 C 120 90, 200 220, 370 130" fill="none" stroke={C.b5} strokeWidth="46" strokeLinecap="round" opacity=".9" />
          <path d="M40 280 C 140 230, 240 340, 360 260" fill="none" stroke={C.crimson} strokeWidth="26" strokeLinecap="round" />
          <path d="M60 390 C 160 350, 230 430, 340 380" fill="none" stroke={C.glow} strokeWidth="10" strokeLinecap="round" />
        </svg>
      );
    case "frame":
      return (
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect x="40" y="60" width="320" height="380" fill="none" stroke={C.paper} strokeWidth="2" />
          <rect x="70" y="100" width="260" height="120" fill={C.b6} />
          <rect x="70" y="240" width="122" height="80" fill={C.paper} opacity=".7" />
          <rect x="208" y="240" width="122" height="80" fill={C.paper} opacity=".4" />
          <rect x="70" y="340" width="260" height="60" fill="none" stroke={C.hot} strokeWidth="2" strokeDasharray="8 6" />
        </svg>
      );
    case "grade":
      return (
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <rect key={i} x={30 + i * 14.5} y={460 - (40 + Math.abs(Math.sin(i * 0.7)) * 140)} width="11" height={40 + Math.abs(Math.sin(i * 0.7)) * 140} fill={C.b5} opacity=".75" />
          ))}
          <path d="M30 460 C 140 450, 200 140, 370 60" fill="none" stroke={C.paper} strokeWidth="3" />
          <line x1="30" y1="60" x2="370" y2="460" stroke={C.paper} strokeWidth=".8" opacity=".3" />
        </svg>
      );
  }
}
