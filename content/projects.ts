export type ProjectKind = "branding" | "poster" | "packaging" | "album" | "editorial" | "illustration";
export type ProjectImage = "cover" | "preview-1" | "art";

export type Chapter = { title: string; text: string; image: ProjectImage; variant: number; alt: string };

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  category: string;
  year: string;
  client: string;
  role: string;
  tools: string[];
  summary: string;
  intro: string;
  coverAlt: string;
  chapters: Chapter[];
  compare: { title: string; before: string; after: string };
};

export const projects: Project[] = [
  {
    slug: "kiln-coffee",
    title: "Kiln Coffee",
    kind: "branding",
    category: "Branding",
    year: "2025",
    client: "Kiln Coffee Co.",
    role: "Brand identity, packaging system",
    tools: ["Illustrator", "Photoshop", "InDesign"],
    summary: "An identity for a roastery that runs its ovens hotter than anyone else in town.",
    intro: "Kiln roasts dark and talks loud. The brief was one line: look like the heat. We built a wordmark from a single flame stroke, a type system that holds on a paper cup and a six metre wall, and a crimson that only appears where the coffee touches it.",
    coverAlt: "Kiln Coffee identity: a flame mark above a condensed wordmark on deep red.",
    chapters: [
      { title: "The mark", text: "One continuous stroke, drawn by hand fifty times, then rebuilt as a vector with eight anchor points.", image: "cover", variant: 0, alt: "The Kiln flame mark at large scale." },
      { title: "The system", text: "Cups, bags, signage and a menu board, all set on the same three column grid.", image: "preview-1", variant: 1, alt: "Kiln packaging and signage laid out together." },
      { title: "On the street", text: "Launch posters went up the week the shop opened. Two were stolen. We took that as approval.", image: "art", variant: 2, alt: "Kiln launch posters on a wall." },
    ],
    compare: { title: "From marker to master file", before: "Sketch", after: "Final" },
  },
  {
    slug: "noise-floor",
    title: "Noise Floor",
    kind: "poster",
    category: "Poster series",
    year: "2025",
    client: "Noise Floor Festival",
    role: "Poster series, motion",
    tools: ["Photoshop", "Illustrator", "After Effects"],
    summary: "Twelve posters for an underground electronic festival, one for every hour of the night.",
    intro: "Each poster is built from the waveform of that hour’s set, printed in two inks, then scanned and distressed in Photoshop until it looked like it had lived on a wall for a month.",
    coverAlt: "Noise Floor poster: black bands cutting across a red field with a huge circle.",
    chapters: [
      { title: "Waveforms", text: "Every set was recorded, flattened into a single waveform and traced as a vector shape.", image: "cover", variant: 0, alt: "Waveform shapes forming a poster layout." },
      { title: "Two inks", text: "Black and one red. Overprints did the rest, so every misregistration became part of the system.", image: "preview-1", variant: 1, alt: "Two ink poster detail showing overprint." },
      { title: "In motion", text: "The series became twelve looping clips for screens at the venue, each exactly one bar long.", image: "art", variant: 2, alt: "Still from the animated poster loop." },
    ],
    compare: { title: "Raw scan against the print", before: "Scan", after: "Print" },
  },
  {
    slug: "ember-sauce",
    title: "Ember Hot Sauce",
    kind: "packaging",
    category: "Packaging",
    year: "2024",
    client: "Ember Pantry",
    role: "Packaging, illustration",
    tools: ["Illustrator", "Photoshop", "Procreate"],
    summary: "A hot sauce range where the label tells you exactly how much it will hurt.",
    intro: "Four heat levels, four illustrations, one rule: the hotter the sauce, the less of the label survives. Level four is almost entirely flame, with the ingredients printed small enough to feel like a warning.",
    coverAlt: "Three Ember hot sauce bottles with labels burning away at different levels.",
    chapters: [
      { title: "Heat scale", text: "A burn line climbs the label from level one to four. You can read the heat from across the shop.", image: "cover", variant: 0, alt: "Ember bottles lined up by heat level." },
      { title: "Hand inked", text: "Every flame was inked in Procreate, then vectorised so it prints clean on a curved bottle.", image: "preview-1", variant: 1, alt: "Close up of the inked flame illustration." },
      { title: "Shelf test", text: "We printed mockups and stood them next to forty competitors. Ember was the only one you could spot in two seconds.", image: "art", variant: 2, alt: "Ember bottles on a crowded shelf." },
    ],
    compare: { title: "Label dieline against the final", before: "Dieline", after: "Final" },
  },
  {
    slug: "velvet-static",
    title: "Velvet Static",
    kind: "album",
    category: "Album art",
    year: "2024",
    client: "Velvet Static",
    role: "Album art, singles, merch",
    tools: ["Photoshop", "Lightroom", "Illustrator"],
    summary: "Cover art for a debut record that sounds like a radio left on in an empty room.",
    intro: "We photographed a television through red gel at one second exposures, then composited forty frames into a single face that never quite resolves. The singles each crop a different part of it.",
    coverAlt: "Velvet Static cover: concentric red rings around a pale square.",
    chapters: [
      { title: "Forty frames", text: "Long exposures of a detuned screen, stacked and masked by hand into one image.", image: "cover", variant: 0, alt: "Composited album cover artwork." },
      { title: "The singles", text: "Three singles, three crops of the same face, so the album completes the picture.", image: "preview-1", variant: 1, alt: "Three single covers side by side." },
      { title: "Merch", text: "The rings became a screen print that sold out at the first show.", image: "art", variant: 2, alt: "Velvet Static merch print." },
    ],
    compare: { title: "Raw frame against the composite", before: "Frame", after: "Composite" },
  },
  {
    slug: "margin-notes",
    title: "Margin Notes",
    kind: "editorial",
    category: "Editorial",
    year: "2023",
    client: "Margin Notes Quarterly",
    role: "Editorial design, art direction",
    tools: ["InDesign", "Photoshop", "Illustrator"],
    summary: "A quarterly magazine about the people who annotate everything.",
    intro: "A twelve column grid, a serif that behaves, and one rule broken on every spread. Readers write in to tell us which rule they spotted, and we print the best letters in the margins.",
    coverAlt: "Margin Notes spread: heavy headline bars and red image block on paper.",
    chapters: [
      { title: "The grid", text: "Twelve columns and a wide outer margin reserved for notes, quotes and doodles.", image: "cover", variant: 0, alt: "Magazine spread on a twelve column grid." },
      { title: "Broken rules", text: "Each spread breaks the grid exactly once. Finding it became a game for readers.", image: "preview-1", variant: 1, alt: "Spread where a headline breaks the grid." },
      { title: "Covers", text: "Four covers a year, each built from a reader’s handwritten annotation.", image: "art", variant: 2, alt: "Set of four Margin Notes covers." },
    ],
    compare: { title: "Wireframe against the spread", before: "Wireframe", after: "Spread" },
  },
  {
    slug: "night-shift",
    title: "Night Shift",
    kind: "illustration",
    category: "Illustration",
    year: "2023",
    client: "Self-initiated",
    role: "Illustration series",
    tools: ["Procreate", "Photoshop"],
    summary: "Forty illustrations of the city between midnight and five.",
    intro: "Drawn on the night bus home, finished in Photoshop the next afternoon. Every piece uses three colours and the light from a single window.",
    coverAlt: "Night Shift illustration: a red moon over a black skyline with lit windows.",
    chapters: [
      { title: "Three colours", text: "Black, blood red and one warm white. Everything else is texture.", image: "cover", variant: 0, alt: "Night Shift illustration in three colours." },
      { title: "One window", text: "Each scene is lit by a single window, so the composition always has one place to look.", image: "preview-1", variant: 1, alt: "Illustration lit by one window." },
      { title: "The book", text: "The series became a pocket book sold at the late night bookshop that inspired it.", image: "art", variant: 2, alt: "Night Shift pocket book." },
    ],
    compare: { title: "Bus sketch against the finish", before: "Sketch", after: "Finish" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
