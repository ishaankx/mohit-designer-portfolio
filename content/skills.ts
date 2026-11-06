export type ArtKind = "photo" | "vector" | "grid" | "motion" | "brush" | "frame" | "grade";
export type BlendMode = "normal" | "screen" | "lighten" | "color-dodge" | "hard-light" | "difference" | "exclusion";

export type Skill = {
  id: string;
  name: string;
  blend: string;
  mode: BlendMode;
  opacity: number;
  note: string;
  art: ArtKind;
};

export const skillsCopy = {
  title: ["Every tool", "is a layer."],
  sub: "Hide a layer to see what it was doing. Hover one to solo it. The blend is the craft.",
  columns: { layer: "Layer", blend: "Blend", opacity: "Opacity" },
  composite: "Composite",
  compositeNote: "Every visible layer, flattened into one image.",
};

export const skills: Skill[] = [
  { id: "photoshop", name: "Photoshop", blend: "Normal", mode: "normal", opacity: 96, note: "Compositing, retouching, light and grade.", art: "photo" },
  { id: "illustrator", name: "Illustrator", blend: "Screen", mode: "screen", opacity: 94, note: "Logos, lettering and vector systems that scale to a billboard.", art: "vector" },
  { id: "indesign", name: "InDesign", blend: "Lighten", mode: "lighten", opacity: 82, note: "Editorial grids, books and print-ready files.", art: "grid" },
  { id: "after-effects", name: "After Effects", blend: "Color Dodge", mode: "color-dodge", opacity: 74, note: "Motion identities and loops for launch day.", art: "motion" },
  { id: "procreate", name: "Procreate", blend: "Hard Light", mode: "hard-light", opacity: 88, note: "Sketching, inking and textured illustration.", art: "brush" },
  { id: "figma", name: "Figma", blend: "Difference", mode: "difference", opacity: 70, note: "Layouts, decks and clean handoff.", art: "frame" },
  { id: "lightroom", name: "Lightroom", blend: "Exclusion", mode: "exclusion", opacity: 66, note: "Colour that holds across a whole series.", art: "grade" },
];
