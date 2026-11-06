import type { gsap as GSAP } from "gsap";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import type { Flip as FlipPlugin } from "gsap/Flip";
import type LenisType from "lenis";

export type Engine = {
  gsap: typeof GSAP;
  ScrollTrigger: typeof ST;
  Flip: typeof FlipPlugin;
  lenis: LenisType | null;
};

let engine: Promise<Engine> | null = null;
let lenisRef: LenisType | null = null;

export const getLenis = () => lenisRef;

export function loadEngine(): Promise<Engine> {
  if (!engine) {
    engine = (async () => {
      const [{ gsap }, { ScrollTrigger }, { Flip }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/Flip"),
        import("lenis"),
      ]);
      gsap.registerPlugin(ScrollTrigger, Flip);
      ScrollTrigger.config({ ignoreMobileResize: true });

      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const lenis = new Lenis({ lerp: 0.09, anchors: true, autoRaf: false });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
        lenisRef = lenis;
      }

      let timer = 0;
      const ro = new ResizeObserver(() => {
        clearTimeout(timer);
        timer = window.setTimeout(() => ScrollTrigger.refresh(), 220);
      });
      ro.observe(document.body);
      void document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return { gsap, ScrollTrigger, Flip, lenis: lenisRef };
    })();
  }
  return engine;
}

export function onIdle(cb: () => void, timeout = 1200) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(cb, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(cb, 200);
  return () => clearTimeout(id);
}
