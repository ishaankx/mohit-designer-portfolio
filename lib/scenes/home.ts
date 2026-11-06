import type { Engine } from "@/lib/engine";
import { contactScene, fades, pauseOffscreen, q, qa, reveal, willChange, type Cond } from "./shared";

function frameSequence(canvas: HTMLCanvasElement) {
  const n = Number(canvas.dataset.frames) || 0;
  const digits = Number(canvas.dataset.digits) || 4;
  const ctx = canvas.getContext("2d");
  const frames: HTMLImageElement[] = [];
  for (let i = 0; i < n; i++) {
    const img = new Image();
    img.decoding = "async";
    img.src = `${canvas.dataset.path}${String(i + 1).padStart(digits, "0")}.${canvas.dataset.ext}`;
    frames.push(img);
  }
  let last = -1;
  const size = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    last = -1;
  };
  size();
  window.addEventListener("resize", size);
  const draw = (p: number) => {
    if (!ctx || !n) return;
    let i = Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))));
    if (i === last) return;
    while (i > 0 && !frames[i].complete) i--;
    const img = frames[i];
    if (!img.complete || !img.naturalWidth) return;
    const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    last = i;
  };
  return { draw, dispose: () => window.removeEventListener("resize", size) };
}

function heroScene(engine: Engine, c: Cond) {
  const { gsap, ScrollTrigger } = engine;
  const hero = q('[data-scene="hero"]');
  if (!hero) return;
  const $ = (n: string) => q(`[data-hero="${n}"]`, hero);
  const desk = $("desk"), text = $("text"), textpx = $("textpx"), plunge = $("plunge"), lockup = $("lockup");
  const canvas = q<HTMLCanvasElement>('[data-hero="seq"]', hero);
  const stage = hero.firstElementChild as HTMLElement | null;
  // desk/text/plunge are permanently composited in Hero.module.css; toggling them re-rasters the 3.9x-scaled plate.
  const wc = willChange([lockup]);

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: () => `+=${Math.max(1, hero.offsetHeight - 2 * (stage?.offsetHeight ?? window.innerHeight))}`,
      // Lenis already smooths the wheel; a long scrub on top made the dolly trail the scroll by over a second.
      scrub: c.desktop ? 0.3 : 0.4,
      invalidateOnRefresh: true,
      onToggle: wc.onToggle,
    },
  });

  tl.to(lockup, { y: -90, opacity: 0, duration: 0.25 }, 0);

  let seq: ReturnType<typeof frameSequence> | null = null;
  if (canvas) {
    seq = frameSequence(canvas);
    const p = { f: 0 };
    tl.to(p, { f: 1, duration: 0.85, onUpdate: () => seq?.draw(p.f) }, 0);
  } else {
    tl.fromTo(desk, { scale: 1, z: 0 }, { scale: 1.7, z: 60, duration: 1 }, 0)
      .fromTo(plunge, { scale: 1 }, { scale: 2.3, duration: 0.18, ease: "power2.in" }, 0.82)
      .fromTo($("monitor"), { opacity: 0 }, { opacity: 1, duration: 0.55 }, 0.3);
  }

  tl.fromTo(text, { scale: 1, y: 0, opacity: 1 }, { scale: 1.12, y: () => -0.06 * window.innerHeight, opacity: 0.4, duration: 1 }, 0)
    .fromTo($("bloom"), { opacity: 0.35 }, { opacity: 1, duration: 1 }, 0)
    .fromTo($("vignette"), { opacity: 0 }, { opacity: 1, duration: 1 }, 0)
    .fromTo($("flash"), { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.86)
    .fromTo($("fade"), { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.92);

  let detach = () => {};
  if (c.fine) {
    const dx = gsap.quickTo($("deskpx"), "x", { duration: 0.9, ease: "power3" });
    const dy = gsap.quickTo($("deskpx"), "y", { duration: 0.9, ease: "power3" });
    const tx = gsap.quickTo(textpx, "x", { duration: 1.1, ease: "power3" });
    const ty = gsap.quickTo(textpx, "y", { duration: 1.1, ease: "power3" });
    const move = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      dx(-nx * 28);
      dy(-ny * 28);
      tx(-nx * 12);
      ty(-ny * 12);
    };
    let on = false;
    const set = (active: boolean) => {
      if (active === on) return;
      on = active;
      if (active) window.addEventListener("pointermove", move, { passive: true });
      else window.removeEventListener("pointermove", move);
    };
    ScrollTrigger.create({ trigger: hero, start: "top top", end: "bottom top", onToggle: (self) => set(self.isActive) });
    set(window.scrollY < hero.offsetHeight);
    detach = () => set(false);
  }

  return () => {
    detach();
    seq?.dispose();
    wc.clear();
  };
}

function aboutScene(engine: Engine, c: Cond) {
  const { gsap } = engine;
  const about = q('[data-scene="about"]');
  if (!about) return;
  const $ = (n: string) => q(`[data-about="${n}"]`, about);
  const letters = $("letters"), subject = $("subject"), selection = $("selection");

  gsap
    .timeline({
      defaults: { ease: "none" },
      // letters/subject are permanently composited in About.module.css.
      scrollTrigger: { trigger: about, start: "top bottom", end: "top top", scrub: 0.6 },
    })
    .fromTo(letters, { yPercent: 22, scale: 1.2 }, { yPercent: 0, scale: 1, duration: 1 }, 0)
    .fromTo(subject, { y: () => window.innerHeight * 0.3 }, { y: 0, duration: 0.9, ease: "power2.out" }, 0)
    .fromTo(selection, { clipPath: "inset(0% 100% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.35, ease: "power1.inOut" }, 0.6)
    .fromTo(qa('[data-about="handle"]', about), { scale: 0 }, { scale: 1, duration: 0.12, stagger: 0.02, ease: "back.out(3)" }, 0.85)
    .fromTo(qa('[data-about="note"]', about), { clipPath: "inset(-20% 100% -20% -10%)" }, { clipPath: "inset(-20% -10% -20% -10%)", duration: 0.2, stagger: 0.06 }, 0.8);

  if (c.desktop) {
    gsap
      .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: about, start: "bottom 140%", end: "bottom 40%", scrub: 0.6 } })
      .to(subject, { scale: 1.1, opacity: 0.2 }, 0)
      .to(letters, { scale: 1.15, yPercent: -12, opacity: 0.35 }, 0);
  }

  reveal(engine, about);
}

function layersScene(engine: Engine) {
  const { gsap } = engine;
  const sec = q('[data-scene="layers"]');
  if (!sec) return;

  gsap.fromTo(
    q('[data-layers="title"]', sec),
    { yPercent: 35, scale: 1.08 },
    { yPercent: 0, scale: 1, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "top 25%", scrub: 0.6 } },
  );

  gsap.fromTo(
    q('[data-layers="stage"]', sec),
    { clipPath: "inset(10% 10% 10% 10%)", scale: 0.94 },
    { clipPath: "inset(0% 0% 0% 0%)", scale: 1, ease: "none", scrollTrigger: { trigger: sec, start: "top 70%", end: "top 5%", scrub: 0.6 } },
  );

  gsap.fromTo(
    qa('[data-layers="row"]', sec),
    { y: 36, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: q('[data-layers="rows"]', sec), start: "top 82%", once: true } },
  );

  qa("[data-bar]", sec).forEach((bar) => {
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: Number(bar.dataset.bar) || 1, ease: "none", scrollTrigger: { trigger: bar, start: "top 92%", end: "top 58%", scrub: 0.5 } },
    );
  });
}

function processScene(engine: Engine) {
  const { gsap } = engine;
  const sec = q('[data-scene="process"]');
  const path = sec && q<SVGPathElement>('[data-process="path"]', sec);
  if (!sec || !path) return;
  const svg = path.ownerSVGElement;
  const anchors = qa<SVGRectElement>('[data-process="anchor"]', sec);
  const handles = qa<SVGGElement>('[data-process="handles"]', sec);
  const steps = qa('[data-process="step"]', sec);
  const note = q('[data-process="marknote"]', sec);
  const prefixes = JSON.parse(path.dataset.prefixes ?? "[]") as string[];

  const total = path.getTotalLength();
  const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svg?.appendChild(probe);
  const fracs = prefixes.map((d) => {
    probe.setAttribute("d", d);
    return total ? probe.getTotalLength() / total : 0;
  });
  probe.remove();

  const D0 = 0.05, D1 = 0.82, MARK = 0.86;
  const at = (f: number) => D0 + f * (D1 - D0);
  sec.dataset.ready = "";

  const state = steps.map(() => false);
  let current = -1;
  let markOn = false;
  const sync = (p: number) => {
    let cur = -1;
    steps.forEach((el, i) => {
      const reached = p >= at(fracs[i] ?? 0) - 0.005;
      if (reached) cur = i;
      if (reached !== state[i]) {
        state[i] = reached;
        el.toggleAttribute("data-reached", reached);
        anchors[i]?.toggleAttribute("data-reached", reached);
      }
    });
    if (cur !== current) {
      steps[current]?.removeAttribute("data-current");
      steps[cur]?.setAttribute("data-current", "");
      current = cur;
    }
    const m = p >= MARK + 0.04;
    if (m !== markOn) {
      markOn = m;
      note?.toggleAttribute("data-reached", m);
    }
  };

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: sec, start: "top top", end: "bottom bottom", scrub: 0.6, onUpdate: (self) => sync(self.progress) },
  });
  tl.fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: D1 - D0 }, D0);
  fracs.forEach((f, i) => {
    const anchor = anchors[i];
    const handle = handles[i];
    if (anchor) tl.fromTo(anchor, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.03, ease: "back.out(3)" }, at(f) - 0.004);
    if (handle) tl.fromTo(handle, { opacity: 0, scale: 0.2, svgOrigin: `${handle.dataset.x} ${handle.dataset.y}` }, { opacity: 1, scale: 1, duration: 0.05, ease: "power2.out" }, at(f));
  });
  tl.fromTo(q('[data-process="mark"]', sec), { opacity: 0 }, { opacity: 1, duration: 0.06 }, MARK).to({}, { duration: 1 - MARK - 0.06 }, MARK + 0.06);
  sync(tl.scrollTrigger?.progress ?? 0);

  return () => {
    delete sec.dataset.ready;
    steps.forEach((el) => el.removeAttribute("data-reached"));
  };
}

function workScene(engine: Engine) {
  const { gsap } = engine;
  const sec = q('[data-scene="work"]');
  if (!sec) return;
  gsap.fromTo(
    q('[data-work="title"]', sec),
    { scale: 1.3, yPercent: 30, opacity: 0.3 },
    { scale: 1, yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "top 20%", scrub: 0.6 } },
  );
  gsap.fromTo(
    qa('[data-work="item"]', sec),
    { y: 90, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.09, scrollTrigger: { trigger: q('[data-work="grid"]', sec), start: "top 85%", once: true } },
  );
}

export default function setupHome(engine: Engine) {
  const mm = engine.gsap.matchMedia();
  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 768px)",
      fine: "(hover: hover) and (pointer: fine)",
    },
    (ctx) => {
      const c = ctx.conditions as Cond;
      if (c.reduce) {
        fades(engine);
        return;
      }
      const cleanups = [heroScene(engine, c), aboutScene(engine, c), layersScene(engine), processScene(engine), workScene(engine), contactScene(engine)];
      return () => cleanups.forEach((fn) => fn?.());
    },
  );
  const stopLoops = pauseOffscreen();
  return () => {
    mm.revert();
    stopLoops();
  };
}
