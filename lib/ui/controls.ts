import { announceCopied, copyText } from "@/lib/clipboard";

function sideOf(e: PointerEvent, r: DOMRect) {
  const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
  const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
  if (Math.abs(nx) > Math.abs(ny)) return nx < 0 ? "left" : "right";
  return ny < 0 ? "top" : "bottom";
}

export function magnetic() {
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const offs = Array.from(document.querySelectorAll<HTMLElement>("[data-btn]")).map((el) => {
    let rect: DOMRect | null = null;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.translate = `${cx.toFixed(2)}px ${cy.toFixed(2)}px`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const enter = (e: PointerEvent) => {
      rect = el.getBoundingClientRect();
      el.dataset.from = sideOf(e, rect);
    };
    const move = (e: PointerEvent) => {
      if (!rect || !fine.matches || reduce.matches || e.pointerType !== "mouse") return;
      tx = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
      ty = (e.clientY - (rect.top + rect.height / 2)) * 0.4;
      kick();
    };
    const leave = (e: PointerEvent) => {
      if (rect) el.dataset.from = sideOf(e, rect);
      rect = null;
      tx = 0;
      ty = 0;
      kick();
    };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  });
  return () => offs.forEach((off) => off());
}

export function copyButtons() {
  const live = document.getElementById("copy-live");
  const timers = new WeakMap<HTMLElement, number>();
  const onClick = async (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>("[data-copy]");
    if (!el) return;
    const value = el.dataset.copy ?? "";
    const done = el.dataset.copyDone ?? "Copied";
    await copyText(value);
    announceCopied();
    if (live) live.textContent = `${value} copied to clipboard`;
    const texts = Array.from(el.querySelectorAll<HTMLElement>("[data-copy-text]"));
    texts.forEach((t) => {
      t.dataset.original ??= t.textContent ?? "";
      t.textContent = done;
    });
    el.dataset.done = "";
    clearTimeout(timers.get(el));
    timers.set(
      el,
      window.setTimeout(() => {
        texts.forEach((t) => (t.textContent = t.dataset.original ?? ""));
        delete el.dataset.done;
        if (live) live.textContent = "";
      }, 1500),
    );
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}

export function backLinks() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-back]"));
  if (!links.length) return () => {};
  const go = () => {
    let same = false;
    try {
      same = !!document.referrer && new URL(document.referrer).origin === window.location.origin;
    } catch {
      same = false;
    }
    if (same && window.history.length > 1) window.history.back();
    else window.location.assign("/#work");
  };
  const onClick = (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    go();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "Escape" || e.defaultPrevented) return;
    if ((e.target as Element | null)?.closest("input, textarea, select")) return;
    go();
  };
  links.forEach((l) => l.addEventListener("click", onClick));
  window.addEventListener("keydown", onKey);
  return () => {
    links.forEach((l) => l.removeEventListener("click", onClick));
    window.removeEventListener("keydown", onKey);
  };
}

export function beforeAfter() {
  const offs = Array.from(document.querySelectorAll<HTMLElement>("[data-ba]")).map((root) => {
    const canvas = root.querySelector<HTMLElement>("[data-ba-canvas]");
    const range = root.querySelector<HTMLInputElement>("[data-ba-range]");
    const value = root.querySelector<HTMLElement>("[data-ba-value]");
    const before = root.querySelector<HTMLElement>("[data-ba-before]");
    let showAfter = true;

    const setEye = (which: "after" | "before", on: boolean) => {
      const eye = root.querySelector<HTMLElement>(`[data-ba-eye="${which}"]`);
      eye?.setAttribute("aria-pressed", String(on));
      eye?.setAttribute("aria-label", `${on ? "Hide" : "Show"} ${eye.dataset.name ?? which} layer`);
      root.querySelector(`[data-ba-row="${which}"]`)?.toggleAttribute("data-off", !on);
    };
    const render = () => {
      const v = showAfter ? Number(range?.value ?? 0) : 0;
      canvas?.style.setProperty("--split", `${v}%`);
      if (value) value.textContent = `${v}%`;
      setEye("after", showAfter);
    };
    const onInput = () => {
      showAfter = true;
      render();
    };
    const onClick = (e: MouseEvent) => {
      const eye = (e.target as Element | null)?.closest<HTMLElement>("[data-ba-eye]");
      if (!eye) return;
      if (eye.dataset.baEye === "after") {
        showAfter = !showAfter;
        render();
      } else {
        const on = eye.getAttribute("aria-pressed") !== "true";
        before?.toggleAttribute("data-off", !on);
        setEye("before", on);
      }
    };
    range?.addEventListener("input", onInput);
    root.addEventListener("click", onClick);
    render();
    return () => {
      range?.removeEventListener("input", onInput);
      root.removeEventListener("click", onClick);
    };
  });
  return () => offs.forEach((off) => off());
}

export function images() {
  const offs = Array.from(document.querySelectorAll<HTMLImageElement>("img[data-blur]")).map((img) => {
    const done = () => {
      img.style.backgroundImage = "";
      img.closest("[data-plate-wrap]")?.setAttribute("data-loaded", "");
    };
    if (img.complete && img.naturalWidth) {
      done();
      return () => {};
    }
    img.addEventListener("load", done, { once: true });
    return () => img.removeEventListener("load", done);
  });
  return () => offs.forEach((off) => off());
}
