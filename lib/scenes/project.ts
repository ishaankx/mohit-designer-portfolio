import type { Engine } from "@/lib/engine";
import { contactScene, fades, pauseOffscreen, q, qa, reveal, type Cond } from "./shared";

export default function setupProject(engine: Engine) {
  const { gsap, ScrollTrigger } = engine;
  const mm = gsap.matchMedia();

  mm.add(
    { reduce: "(prefers-reduced-motion: reduce)", motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 768px)", fine: "(hover: hover) and (pointer: fine)" },
    (ctx) => {
      const c = ctx.conditions as Cond;
      if (c.reduce) {
        fades(engine);
        return;
      }

      const head = q('[data-project="head"]');
      gsap.to(q('[data-project="title"]'), {
        yPercent: -14,
        scale: 0.94,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: { trigger: head, start: "top top", end: "bottom top", scrub: 0.6 },
      });

      const hero = q('[data-project="hero"]');
      if (hero) {
        gsap
          .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } })
          .fromTo(q('[data-project="parallax"]', hero), { yPercent: 0, scale: 1 }, { yPercent: 8, scale: 1.08 }, 0);
      }

      const captions = qa("[data-caption]");
      const chapters = captions[0]?.closest("section");
      if (chapters) chapters.setAttribute("data-ready", "");

      qa('[data-project="figure"]').forEach((fig, i) => {
        const frame = q('[data-project="frame"]', fig);
        const layer = q('[data-project="parallax"]', fig);
        gsap.fromTo(
          frame,
          { clipPath: c.desktop ? "inset(18% 10% 18% 10%)" : "inset(10% 6% 10% 6%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: fig, start: "top 92%", end: "top 35%", scrub: 0.6 } },
        );
        gsap.fromTo(
          layer,
          { yPercent: -7, scale: 1.18 },
          { yPercent: 7, scale: 1, ease: "none", scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: 0.6 } },
        );
        ScrollTrigger.create({
          trigger: fig,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) captions.forEach((cap, j) => cap.toggleAttribute("data-active", j === i));
          },
        });
      });
      captions[0]?.setAttribute("data-active", "");

      const ba = q('[data-project="ba"]');
      if (ba) {
        gsap.fromTo(ba, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut", scrollTrigger: { trigger: ba, start: "top 80%", once: true } });
      }

      reveal(engine);
      contactScene(engine);
      return () => chapters?.removeAttribute("data-ready");
    },
  );

  const stopLoops = pauseOffscreen();
  return () => {
    mm.revert();
    stopLoops();
  };
}
