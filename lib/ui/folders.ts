import { loadEngine } from "@/lib/engine";

type Reversible = { reverse: () => unknown; eventCallback: (type: "onReverseComplete", cb: () => void) => unknown };

export function folders() {
  const els = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[data-folder]"));
  if (!els.length) return () => {};
  const observers: IntersectionObserver[] = [];
  const watch = (list: HTMLElement[], margin: string) => {
    if (!list.length) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.target.toggleAttribute("data-open", e.isIntersecting)), { rootMargin: margin });
    list.forEach((el) => io.observe(el));
    observers.push(io);
  };
  watch(els.filter((el) => el.hasAttribute("data-auto-open")), "-20% 0px -20% 0px");
  if (matchMedia("(hover: none)").matches) watch(els.filter((el) => !el.hasAttribute("data-auto-open")), "-38% 0px -38% 0px");

  let flip: { el: HTMLElement; cover: HTMLElement; tween: Reversible } | null = null;

  const onClick = async (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const el = e.currentTarget as HTMLAnchorElement;
    const cover = el.querySelector<HTMLElement>("[data-cover]");
    if (!cover || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if ("CSSViewTransitionRule" in window) {
      document.querySelectorAll<HTMLElement>("[data-vt-named]").forEach((n) => {
        n.style.removeProperty("view-transition-name");
        delete n.dataset.vtNamed;
      });
      cover.style.setProperty("view-transition-name", `work-${el.dataset.folder}`);
      cover.dataset.vtNamed = "";
      return;
    }

    e.preventDefault();
    el.setAttribute("data-open", "");
    el.dataset.leaving = "";
    const { Flip } = await loadEngine();
    const proxy = document.createElement("div");
    proxy.dataset.flipProxy = "";
    proxy.style.cssText = "position:fixed;inset:0;pointer-events:none;visibility:hidden";
    document.body.appendChild(proxy);
    cover.style.transition = "none";
    const href = el.href;
    const tween = Flip.fit(cover, proxy, {
      duration: 0.8,
      ease: "expo.inOut",
      scale: true,
      onComplete: () => window.location.assign(href),
    }) as unknown as Reversible;
    flip = { el, cover, tween };
  };

  const onShow = (e: PageTransitionEvent) => {
    if (!e.persisted || !flip) return;
    const { el, cover, tween } = flip;
    flip = null;
    tween.eventCallback("onReverseComplete", () => {
      cover.style.removeProperty("transition");
      cover.style.removeProperty("transform");
      cover.style.removeProperty("width");
      cover.style.removeProperty("height");
      delete el.dataset.leaving;
      el.removeAttribute("data-open");
      document.querySelector("[data-flip-proxy]")?.remove();
    });
    tween.reverse();
  };

  els.forEach((el) => el.addEventListener("click", onClick));
  window.addEventListener("pageshow", onShow);
  return () => {
    observers.forEach((io) => io.disconnect());
    els.forEach((el) => el.removeEventListener("click", onClick));
    window.removeEventListener("pageshow", onShow);
  };
}
