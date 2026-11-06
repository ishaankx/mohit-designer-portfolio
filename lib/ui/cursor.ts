type Mode = "default" | "link" | "pen" | "select" | "eyedropper" | "magnify" | "open" | "native";

const FIELDS = "input, textarea, select, [contenteditable='true']";

export function cursor() {
  const root = document.querySelector<HTMLElement>("[data-cursor-root]");
  const dot = root?.querySelector<HTMLElement>("[data-cursor-dot]");
  const ring = root?.querySelector<HTMLElement>("[data-cursor-ring]");
  if (!root || !dot || !ring) return () => {};
  const html = document.documentElement;
  root.hidden = false;
  html.classList.add("has-cursor");

  let x = -100, y = -100, rx = x, ry = y, raf = 0, shown = false;
  let mode: Mode = "default";
  let zoom: HTMLElement | null = null;
  let copiedTimer = 0;

  const loop = () => {
    rx += (x - rx) * 0.2;
    ry += (y - ry) * 0.2;
    ring.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0)`;
    raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.1 ? requestAnimationFrame(loop) : 0;
  };
  const setMode = (m: Mode) => {
    if (m === mode) return;
    mode = m;
    root.dataset.mode = m;
  };
  const setZoom = (el: HTMLElement | null) => {
    if (el === zoom) return;
    zoom?.removeAttribute("data-zooming");
    zoom = el;
    zoom?.setAttribute("data-zooming", "");
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    x = e.clientX;
    y = e.clientY;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (!shown) {
      shown = true;
      rx = x;
      ry = y;
      root.dataset.visible = "";
    }
    if (!raf) raf = requestAnimationFrame(loop);
    if (zoom) {
      const b = zoom.getBoundingClientRect();
      zoom.style.setProperty("--zx", `${(((x - b.left) / b.width) * 100).toFixed(2)}%`);
      zoom.style.setProperty("--zy", `${(((y - b.top) / b.height) * 100).toFixed(2)}%`);
    }
  };
  const onOver = (e: PointerEvent) => {
    const t = e.target instanceof Element ? e.target : null;
    if (!t) return;
    if (t.closest(FIELDS)) {
      setZoom(null);
      return setMode("native");
    }
    const host = t.closest<HTMLElement>("[data-cursor]");
    const interactive = t.closest("a, button, [role='button'], label, summary");
    const next = (host && (!interactive || interactive.contains(host)) ? host.dataset.cursor : interactive ? "link" : "default") as Mode;
    setZoom(next === "magnify" ? (host?.querySelector<HTMLElement>("[data-zoom]") ?? null) : null);
    setMode(next);
  };
  const onLeave = () => {
    shown = false;
    delete root.dataset.visible;
    setZoom(null);
  };
  const onDown = () => (root.dataset.down = "");
  const onUp = () => delete root.dataset.down;
  const onCopied = () => {
    root.dataset.copied = "";
    clearTimeout(copiedTimer);
    copiedTimer = window.setTimeout(() => delete root.dataset.copied, 1200);
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerover", onOver, { passive: true });
  html.addEventListener("mouseleave", onLeave);
  window.addEventListener("pointerdown", onDown);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("cursor:copied", onCopied);

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(copiedTimer);
    setZoom(null);
    root.hidden = true;
    html.classList.remove("has-cursor");
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerover", onOver);
    html.removeEventListener("mouseleave", onLeave);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("cursor:copied", onCopied);
  };
}
