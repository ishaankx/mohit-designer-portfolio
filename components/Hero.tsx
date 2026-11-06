import { getImageProps } from "next/image";
import { preload } from "react-dom";
import type { CSSProperties } from "react";
import { NAME, hero, heroScene } from "@/content/site";
import { ANTON_SPACE, antonFit } from "@/lib/fit";
import { hasAsset } from "@/lib/assets";
import { blur } from "@/lib/placeholders";
import DeskSilhouette from "./DeskSilhouette";
import s from "./Hero.module.css";

const MOBILE_MQ = "(max-width: 767px), (max-aspect-ratio: 4/5)";
const DESKTOP_MQ = "(min-width: 768px) and (min-aspect-ratio: 4/5)";
const DESK = { src: "/images/hero/desk.webp", width: 1536, height: 743, sizes: "calc(100vw + 48px)" };
const DESK_M = { src: "/images/hero/desk-mobile.webp", width: 1024, height: 806, sizes: "112vw" };

type Vars = CSSProperties & Record<`--${string}`, string | number>;

export default function Hero() {
  const lines = hero.words.map(antonFit);
  // Desktop sets every word on one full-width line; phones stack them, one word per line.
  const inks = {
    "--ink1": lines[0].ink,
    "--ink2": (lines[1] ?? lines[0]).ink,
    "--ink-all": antonFit(hero.words.join(" ")).ink,
    "--space": ANTON_SPACE,
  } as Vars;
  // One continuous left-to-right rise across all words (the gap counts as one beat).
  const starts = lines.map((_, li) => lines.slice(0, li).reduce((n, l) => n + l.chars.length + 1, 0));
  const seq = heroScene.frameSequence;
  const firstFrame = `${seq.path}${"1".padStart(seq.digits, "0")}.${seq.ext}`;
  const useSeq = seq.enabled && hasAsset(firstFrame);
  const hasDesk = hasAsset(DESK.src);
  const hasMobile = hasDesk && hasAsset(DESK_M.src);
  const plate = useSeq ? "sequence" : hasMobile ? "dual" : hasDesk ? "desktop" : "silhouette";

  let plateNode = null;
  if (useSeq) {
    const { props } = getImageProps({ src: firstFrame, width: seq.width, height: seq.height, sizes: "100vw", quality: 75, alt: "", loading: "eager", fetchPriority: "high" });
    preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "high" });
    plateNode = (
      <div className={s.seqBox}>
        <img {...props} className={s.seqImg} alt="" />
        <canvas className={s.seqCanvas} data-hero="seq" data-frames={seq.frames} data-path={seq.path} data-digits={seq.digits} data-ext={seq.ext} />
      </div>
    );
  } else if (hasDesk) {
    const { props: desk } = getImageProps({ ...DESK, quality: 75, alt: hero.plateAlt, loading: "eager", fetchPriority: "high" });
    preload(desk.src, { as: "image", imageSrcSet: desk.srcSet, imageSizes: desk.sizes, fetchPriority: "high", media: hasMobile ? DESKTOP_MQ : undefined });
    let mobile;
    if (hasMobile) {
      const { props: m } = getImageProps({ ...DESK_M, quality: 75, alt: hero.plateAlt });
      preload(m.src, { as: "image", imageSrcSet: m.srcSet, imageSizes: m.sizes, fetchPriority: "high", media: MOBILE_MQ });
      mobile = { srcSet: m.srcSet ?? m.src, sizes: DESK_M.sizes, media: MOBILE_MQ, width: DESK_M.width, height: DESK_M.height };
    }
    plateNode = (
      <div className={s.plate} data-plate-wrap="">
        <span className={s.plateBlur} aria-hidden="true" />
        <picture>
          {mobile && <source media={mobile.media} srcSet={mobile.srcSet} sizes={mobile.sizes} width={mobile.width} height={mobile.height} />}
          <img {...desk} alt={hero.plateAlt} className={s.plateImg} data-blur="" />
        </picture>
      </div>
    );
  } else {
    plateNode = <DeskSilhouette className={s.silhouette} />;
  }

  return (
    <section className={s.hero} data-scene="hero" data-loop="" aria-labelledby="hero-title">
      <div
        className={s.stage}
        data-plate={plate}
        style={{ ...inks, "--blur-d": `url(${blur.desk})`, "--blur-m": `url(${blur.deskMobile})` } as Vars}
      >
        <div className={s.bg} aria-hidden="true">
          <span className={s.pool} />
          <span className={s.beams} />
          <span className={`${s.haze} ${s.hazeA}`} />
          <span className={`${s.haze} ${s.hazeB}`} />
        </div>

        <div className={s.textLayer} data-hero="text">
          <div className={s.textPx} data-hero="textpx">
            <h1 id="hero-title" className={s.title}>
              <span className="sr-only">{hero.words.join(" ")}</span>
              {lines.map((line, li) => (
                <span key={li} className={s.line} aria-hidden="true" style={{ "--ink": line.ink, "--lsb": line.lsb } as Vars}>
                  {line.chars.map((ch, i) => (
                    <span key={i} className={s.char} style={{ "--i": starts[li] + i } as Vars}>
                      {ch === " " ? " " : ch}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>
        </div>

        <div className={s.deskLayer} data-hero="desk">
          <div className={s.deskPx} data-hero="deskpx">
            {useSeq ? (
              plateNode
            ) : (
              <div className={s.plateBox} data-hero="plunge">
                <div className={s.deskIntro}>
                  {plateNode}
                  <span className={s.monitorGlow} aria-hidden="true" />
                  <span className={s.monitorBloom} data-hero="monitor" aria-hidden="true" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={s.front} aria-hidden="true">
          <span className={s.spill} data-hero="bloom" />
          <span className={s.vignette} />
          <span className={s.vignetteTight} data-hero="vignette" />
          <span className={s.sweep} />
          <span className={s.flash} data-hero="flash" />
          <span className={s.fade} data-hero="fade" />
        </div>

        <div className={s.lockup} data-hero="lockup">
          <div className={s.who}>
            <p className={s.hello}>{hero.hello}</p>
            <p className={s.name}>
              {NAME}
              <span className={s.dot} aria-hidden="true" />
            </p>
          </div>
          <div className={s.pitch}>
            <p className={s.intro}>
              {hero.intro.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <a className={s.cta} href={hero.cta.href}>
              <span className={s.ctaRoll}>
                <span>{hero.cta.label}</span>
                <span aria-hidden="true">{hero.cta.label}</span>
              </span>
              <span className={s.ctaLine} aria-hidden="true">
                <svg viewBox="0 0 12 12">
                  <path d="M6 1l5 5-5 5" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
