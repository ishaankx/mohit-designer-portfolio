import type { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Engine } from "@/lib/engine";

export type Cond = { reduce: boolean; motion: boolean; desktop: boolean; fine: boolean };

export const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
export const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

export function willChange(els: (Element | null | undefined)[], value = "transform, opacity") {
  const list = els.filter((el): el is HTMLElement => el instanceof HTMLElement);
  return {
    onToggle: (self: ScrollTrigger) => list.forEach((el) => (el.style.willChange = self.isActive ? value : "")),
    clear: () => list.forEach((el) => (el.style.willChange = "")),
  };
}

export function reveal({ gsap }: Engine, root: ParentNode = document) {
  qa("[data-reveal]", root).forEach((el) => {
    gsap.fromTo(
      el,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
    );
  });
}

export function fades({ gsap }: Engine) {
  qa("[data-reveal], [data-work='item'], [data-layers='row']").forEach((el) => {
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "none", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
  });
}

export function contactScene({ gsap }: Engine) {
  const footer = q('[data-scene="contact"]');
  if (!footer) return;
  gsap.fromTo(
    qa('[data-contact="line"]', footer),
    { yPercent: 90 },
    { yPercent: 0, ease: "none", stagger: 0.12, scrollTrigger: { trigger: footer, start: "top bottom", end: "top 30%", scrub: 0.6 } },
  );
}

export function pauseOffscreen() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.removeAttribute("data-paused");
      else e.target.setAttribute("data-paused", "");
    }
  });
  qa("[data-loop]").forEach((el) => io.observe(el));
  return () => io.disconnect();
}
