import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { NAME, about } from "@/content/site";
import { antonFit } from "@/lib/fit";
import { hasAsset } from "@/lib/assets";
import { blur } from "@/lib/placeholders";
import Swatches from "./Swatches";
import s from "./About.module.css";

const HANDLES = ["tl", "t", "tr", "r", "br", "b", "bl", "l"] as const;

function Lamp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 420" role="img" aria-label="A cut-out of the desk lamp">
      <defs>
        <radialGradient id="lamp-bulb">
          <stop offset="0" stopColor="#ff8a93" />
          <stop offset=".5" stopColor="#e32b3c" stopOpacity=".6" />
          <stop offset="1" stopColor="#e32b3c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="96" cy="170" r="90" fill="url(#lamp-bulb)" />
      <path d="M150 360 L200 210 L120 120" fill="none" stroke="#1a0306" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M150 360 L200 210 L120 120" fill="none" stroke="#e32b3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".7" />
      <path d="M40 160 Q60 70 140 90 L150 110 Q80 120 70 175 Z" fill="#0b0506" stroke="#b3101f" strokeWidth="3" />
      <ellipse cx="96" cy="168" rx="38" ry="14" fill="#ff4d5e" opacity=".85" transform="rotate(-24 96 168)" />
      <rect x="80" y="360" width="150" height="26" rx="13" fill="#0b0506" stroke="#8a0c1a" strokeWidth="3" />
      <circle cx="200" cy="210" r="9" fill="#0b0506" stroke="#e32b3c" strokeWidth="2" />
    </svg>
  );
}

export default function About() {
  const backdrop = antonFit(about.backdrop);
  const portrait = hasAsset("images/portrait-cutout.webp");
  const img = portrait
    ? getImageProps({
        src: "/images/portrait-cutout.webp",
        alt: about.portraitAlt,
        width: 1000,
        height: 1500,
        quality: 75,
        sizes: "(max-width: 767px) 80vw, 38vw",
        placeholder: "blur",
        blurDataURL: blur.portrait,
      }).props
    : null;

  return (
    <section id="about" className={s.about} data-scene="about" aria-labelledby="about-title">
      {/* Ink width of the backdrop word, so phones can fit it to the screen width (see About.module.css). */}
      <div className={s.pin} style={{ "--ink": backdrop.ink, "--lsb": backdrop.lsb } as CSSProperties}>
        <div className={s.backdrop} aria-hidden="true">
          <span className={s.letters} data-about="letters">
            {about.backdrop}
          </span>
          <span className={s.shade} />
        </div>

        <div className={s.subject} data-about="subject">
          <div className={s.figure} data-cursor="select">
            {img ? (
              <img {...img} alt={about.portraitAlt} className={s.portrait} data-blur="" />
            ) : (
              <div className={s.fallback}>
                <span className={s.fallbackName}>{NAME}</span>
                <Lamp className={s.lamp} />
              </div>
            )}
            <span className={s.selection} data-about="selection" data-loop="" aria-hidden="true">
              <span className={s.ants} />
              {HANDLES.map((h) => (
                <span key={h} className={s.handle} data-pos={h} data-about="handle" />
              ))}
            </span>
          </div>
          {about.notes.map((note, i) => (
            <p key={note} className={s.note} data-n={i} data-about="note" aria-hidden="true">
              <span className={s.noteText}>{note}</span>
              <svg viewBox="0 0 60 30" className={s.arrow}>
                <path d="M2 4 C 20 4, 38 10, 54 24 M54 24 L44 22 M54 24 L52 14" />
              </svg>
            </p>
          ))}
        </div>
      </div>

      <div className={s.content}>
        <div className={s.copy}>
          <h2 id="about-title" className={`giant ${s.title}`}>
            {about.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h2>
          {about.body.map((p, i) => (
            <p key={i} className={i === 0 ? s.lead : s.body} data-reveal="">
              {p}
            </p>
          ))}
          <dl className={s.facts} data-reveal="">
            {about.facts.map((f) => (
              <div key={f.label} className={s.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <Swatches hint={about.paletteHint} palette={about.palette} />
        </div>
      </div>
    </section>
  );
}
