export const NAME = "Mohit";
export const EMAIL = "EMAIL";
export const CITY = "New Delhi";
/** IANA time zone for the live clock in the nav, e.g. "Asia/Kolkata", "Europe/London". */
export const TIME_ZONE = "Asia/Kolkata";
export const SOCIAL_URLS = [
  { label: "Behance", href: "https://www.behance.net/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Dribbble", href: "https://dribbble.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
];

export const site = {
  name: NAME,
  role: "Creative Designer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  description: `${NAME} is a creative designer in ${CITY} making identities, posters, packaging and album art in Photoshop and Illustrator.`,
};

export const navMeta = {
  status: "Available for work",
  /** Shown when the status is hovered; the status links to the contact section. */
  statusHover: "Let’s talk",
  menu: "Menu",
  close: "Close",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  words: ["Creative", "Designer"],
  hello: "Hello, I’m",
  /** Two deliberate lines: the claim, then the craft. */
  intro: ["Identities, posters and album art with teeth.", "Built in Photoshop and Illustrator, finished by hand."],
  cta: { label: "View my work", href: "#work" },
  plateAlt: "A dark desk lit in red: a monitor and laptop showing artwork, a keyboard, headphones, sketches, a pen tablet and a desk lamp.",
};

export const heroScene = {
  frameSequence: {
    enabled: false,
    path: "/images/hero/seq/",
    frames: 120,
    digits: 4,
    ext: "webp",
    width: 1920,
    height: 1080,
  },
};

export const about = {
  backdrop: NAME,
  title: ["Pixels", "with a pulse."],
  body: [
    `I’m ${NAME}, a graphic designer in ${CITY}. I make identities, posters, packaging and album art for brands and bands that would rather be remembered than liked.`,
    "I sketch on paper, build in Illustrator, then light, grade and dirty it up in Photoshop. Every layer is named, every file is tidy, and nothing ships until the print looks better than the screen.",
  ],
  facts: [
    { label: "Based in", value: CITY },
    { label: "Practising", value: "8 years" },
    { label: "Clients", value: "60+ brands, labels and studios" },
    { label: "Available", value: "Booking from next month" },
  ],
  notes: ["layer 1: me, no filters", "selection locked", "still fixing the kerning"],
  portraitAlt: `Portrait of ${NAME} in a sand polo shirt, lit with a red rim light.`,
  paletteHint: "Steal the house palette. Click a swatch to copy its hex.",
  palette: [
    { name: "Pitch", hex: "#000000" },
    { name: "Blood", hex: "#5C0912" },
    { name: "Vein", hex: "#B3101F" },
    { name: "Crimson", hex: "#E32B3C" },
    { name: "Hot", hex: "#FF4D5E" },
    { name: "Paper", hex: "#F4EFEA" },
  ],
};

export const work = {
  title: ["Selected", "files"],
  sub: "Six projects, each in its own folder. Open one to see how it was made.",
  next: "Next file",
};

export const contact = {
  title: ["Got a brief?", "Make it loud."],
  line: "Tell me what it has to say and who needs to hear it. I reply within two working days.",
  copy: "Copy email",
  copied: "Copied",
  top: "Back to top",
};
