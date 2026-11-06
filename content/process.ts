export type Step = {
  title: string;
  line: string;
  x: number;
  y: number;
  hx: number;
  hy: number;
  place: "above" | "below";
};

export const processCopy = {
  title: ["Every project", "starts as a line."],
  sub: "Five anchor points from brief to print. Scroll to draw the path.",
  markNote: "and that’s the mark",
};

export const artboard = { w: 1600, h: 900 };

export const steps: Step[] = [
  { title: "Brief", line: "We pin down the audience, the feeling and the one thing it must say.", x: 180, y: 640, hx: 130, hy: -170, place: "below" },
  { title: "Dig", line: "References, competitors and a moodboard, so we know what to avoid.", x: 500, y: 290, hx: 170, hy: 0, place: "above" },
  { title: "Sketch", line: "Fifty thumbnails on paper before a single pixel.", x: 820, y: 610, hx: 160, hy: 30, place: "below" },
  { title: "Build", line: "Vectors in Illustrator, light and texture in Photoshop.", x: 1130, y: 300, hx: 150, hy: -20, place: "above" },
  { title: "Ship", line: "Print-ready files, exports and a guide that keeps it sharp.", x: 1300, y: 620, hx: 120, hy: 60, place: "below" },
];

export const mark = {
  start: [1390, 310] as const,
  inHandle: [0, 130] as const,
  points: [
    [1390, 170],
    [1530, 170],
    [1530, 310],
    [1482, 310],
    [1460, 262],
    [1438, 310],
    [1390, 310],
  ] as const,
};
