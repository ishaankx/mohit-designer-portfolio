import type { Step } from "@/content/process";

type Mark = { start: readonly [number, number]; inHandle: readonly [number, number]; points: readonly (readonly [number, number])[] };

const pt = (x: number, y: number) => `${x} ${y}`;

export function processPath(steps: Step[], mark: Mark) {
  const first = steps[0];
  let d = `M ${pt(first.x, first.y)}`;
  const prefixes = [d];
  for (let i = 1; i < steps.length; i++) {
    const a = steps[i - 1];
    const b = steps[i];
    d += ` C ${pt(a.x + a.hx, a.y + a.hy)} ${pt(b.x - b.hx, b.y - b.hy)} ${pt(b.x, b.y)}`;
    prefixes.push(d);
  }
  const last = steps[steps.length - 1];
  const [mx, my] = mark.start;
  d += ` C ${pt(last.x + last.hx, last.y + last.hy)} ${pt(mx + mark.inHandle[0], my + mark.inHandle[1])} ${pt(mx, my)}`;
  const lines = mark.points.map(([x, y]) => ` L ${pt(x, y)}`).join("");
  return { d: d + lines, prefixes, markFill: `M ${pt(mx, my)}${lines} Z` };
}
