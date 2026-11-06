const ANTON: Record<string, readonly [number, number, number]> = {
  A: [0.4854, 0.0146, 0.0146], B: [0.4785, 0.0381, 0.0186], C: [0.4741, 0.0312, 0.019], D: [0.4932, 0.0381, 0.0322],
  E: [0.4116, 0.0381, 0.0186], F: [0.3989, 0.0381, 0.0171], G: [0.4849, 0.0312, 0.0278], H: [0.499, 0.0381, 0.0381],
  I: [0.2266, 0.0303, 0.0303], J: [0.4663, 0.0186, 0.0278], K: [0.4722, 0.0381, -0.0088], L: [0.3975, 0.0381, 0.0107],
  M: [0.7461, 0.0381, 0.0381], N: [0.498, 0.0381, 0.0381], O: [0.4863, 0.0312, 0.0312], P: [0.4722, 0.0381, 0.0161],
  Q: [0.4937, 0.0264, 0.0176], R: [0.4766, 0.0381, 0.0186], S: [0.4614, 0.0205, 0.019], T: [0.3955, 0.0098, 0.0098],
  U: [0.4736, 0.0278, 0.0278], V: [0.4692, 0.0112, 0.0117], W: [0.7119, 0.0132, 0.0132], X: [0.4839, 0.0132, 0.0127],
  Y: [0.4463, 0.0049, 0.0054], Z: [0.4102, 0.0156, 0.0166], "&": [0.52, 0.0171, 0.0146], ".": [0.2285, 0.0269, 0.0269],
  "'": [0.2139, 0.02, 0.022], " ": [0.2344, 0, 0],
};

const FALLBACK = [0.47, 0.03, 0.03] as const;

/** Advance of a space in Anton, in em. Used to set the hero words on one line. */
export const ANTON_SPACE = ANTON[" "][0];

export function antonFit(word: string) {
  const chars = [...word.toUpperCase()];
  const metrics = chars.map((c) => ANTON[c] ?? FALLBACK);
  const advance = metrics.reduce((sum, m) => sum + m[0], 0);
  const lsb = metrics[0]?.[1] ?? 0;
  const rsb = metrics[metrics.length - 1]?.[2] ?? 0;
  return { chars, ink: +(advance - lsb - rsb).toFixed(4), lsb };
}
