import type { ProjectKind } from "@/content/projects";

const C = { hot: "#ff4d5e", crimson: "#e32b3c", glow: "#ff8a93", b5: "#b3101f", b6: "#8a0c1a", b7: "#5c0912", b8: "#3a050a", b9: "#1a0306", ink: "#0b0506", black: "#050304", paper: "#f4efea" };

type Props = { kind: ProjectKind; variant?: number; seed: string; label?: string; className?: string };

export default function PlaceholderArt({ kind, variant = 0, seed, label, className }: Props) {
  const id = (n: string) => `${seed}-${n}`;
  const url = (n: string) => `url(#${id(n)})`;
  const v = variant % 3;
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

  let body;
  switch (kind) {
    case "branding":
      body = (
        <>
          <rect width="800" height="1000" fill={C.b9} />
          <circle cx={400 + (v - 1) * 90} cy={420 + v * 30} r={260 - v * 30} fill={url("g")} />
          <path d={`M400 ${250 + v * 20} C 330 380, 470 420, 400 ${560 + v * 20} C 520 470, 470 330, 400 ${250 + v * 20} Z`} fill={C.paper} opacity=".92" />
          <rect x="140" y="790" width="520" height="54" fill={C.paper} />
          <rect x="140" y="866" width={300 + v * 60} height="16" fill={C.crimson} />
        </>
      );
      break;
    case "poster":
      body = (
        <>
          <rect width="800" height="1000" fill={url("g")} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="-200" y={140 + i * 190} width="1200" height={50 + i * 12} fill={C.black} transform={`rotate(${-16 + v * 9} 400 500)`} />
          ))}
          <circle cx={520 - v * 120} cy={360 + v * 60} r="170" fill={C.black} />
          <rect x="70" y="860" width="380" height="22" fill={C.paper} />
          <rect x="70" y="900" width="250" height="12" fill={C.paper} opacity=".7" />
        </>
      );
      break;
    case "packaging":
      body = (
        <>
          <rect width="800" height="1000" fill={C.ink} />
          <ellipse cx="400" cy="900" rx="380" ry="60" fill={C.b8} />
          {[0, 1, 2].map((i) => {
            const x = 150 + i * 190 + (v - 1) * 20;
            const h = 420 + ((i + v) % 3) * 50;
            return (
              <g key={i}>
                <rect x={x + 42} y={880 - h - 70} width="36" height="80" rx="6" fill={C.b6} />
                <rect x={x} y={880 - h} width="120" height={h} rx="22" fill={[C.b5, C.crimson, C.b7][(i + v) % 3]} />
                <rect x={x} y={880 - h * 0.62} width="120" height={h * 0.34} fill={C.paper} opacity=".9" />
                <rect x={x + 16} y={880 - h * 0.5} width="88" height="12" fill={C.black} />
              </g>
            );
          })}
        </>
      );
      break;
    case "album":
      body = (
        <>
          <rect width="800" height="1000" fill={C.black} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={i} cx="400" cy="480" r={60 + i * 52} fill="none" stroke={i % 2 ? C.b6 : C.crimson} strokeWidth={6 + ((i + v) % 3) * 8} opacity={0.35 + i * 0.09} />
          ))}
          <rect x={340 + (v - 1) * 40} y="420" width="120" height="120" fill={C.paper} />
          <rect x="80" y="880" width="260" height="20" fill={C.paper} />
        </>
      );
      break;
    case "editorial":
      body = (
        <>
          <rect width="800" height="1000" fill={C.paper} />
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1={60 + i * 60} y1="0" x2={60 + i * 60} y2="1000" stroke={C.b9} strokeWidth="1" opacity=".08" />
          ))}
          <rect x="60" y="80" width={560 - v * 80} height="90" fill={C.black} />
          <rect x="60" y="190" width={420 + v * 40} height="90" fill={C.black} />
          <rect x={v === 1 ? 420 : 60} y="330" width="320" height="400" fill={C.crimson} />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={v === 1 ? 60 : 420} y={340 + i * 46} width={300 - (i % 3) * 40} height="12" fill={C.black} opacity=".75" />
          ))}
          <rect x="60" y="800" width="680" height="2" fill={C.black} />
        </>
      );
      break;
    case "illustration":
      body = (
        <>
          <rect width="800" height="1000" fill={url("g")} />
          <circle cx={560 - v * 140} cy={250 + v * 30} r="110" fill={C.hot} />
          <circle cx={560 - v * 140} cy={250 + v * 30} r="180" fill={C.crimson} opacity=".18" />
          <path d={`M0 1000 V${700 - v * 20} h120 v-120 h90 v80 h110 v-200 h100 v150 h120 v-90 h130 v130 h130 V1000 Z`} fill={C.black} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={140 + i * 95} y={760 + (i % 2) * 50} width="18" height="26" fill={i === v + 1 ? C.glow : C.b6} />
          ))}
        </>
      );
      break;
  }

  return (
    <svg className={className} viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" {...a11y}>
      <defs>
        <radialGradient id={id("g")} cx=".5" cy=".35" r=".8">
          <stop offset="0" stopColor={kind === "illustration" ? C.b7 : C.glow} />
          <stop offset=".45" stopColor={kind === "illustration" ? C.b9 : C.crimson} />
          <stop offset="1" stopColor={kind === "illustration" ? C.black : C.b6} />
        </radialGradient>
      </defs>
      {body}
    </svg>
  );
}
