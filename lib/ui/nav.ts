import { getLenis } from "@/lib/engine";

/** Keeps every [data-clock-time] in the header showing HH:MM in the designer's time zone. */
function clock(header: HTMLElement) {
  const clocks = Array.from(header.querySelectorAll<HTMLElement>("[data-clock-time]"));
  if (!clocks.length) return () => {};
  const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hourCycle: "h23" };
  let fmt: Intl.DateTimeFormat;
  try {
    fmt = new Intl.DateTimeFormat("en-GB", { ...opts, timeZone: header.dataset.tz || undefined });
  } catch {
    fmt = new Intl.DateTimeFormat("en-GB", opts); // unknown zone: fall back to the visitor's clock
  }
  const tick = () => {
    const parts = fmt.formatToParts(new Date());
    const hh = parts.find((p) => p.type === "hour")?.value ?? "--";
    const mm = parts.find((p) => p.type === "minute")?.value ?? "--";
    for (const c of clocks) {
      const h = c.querySelector("[data-hh]"), m = c.querySelector("[data-mm]");
      if (h) h.textContent = hh;
      if (m) m.textContent = mm;
      c.setAttribute("datetime", `${hh}:${mm}`);
    }
  };
  tick();
  const timer = window.setInterval(tick, 10_000);
  return () => clearInterval(timer);
}

export function nav() {
  const header = document.querySelector<HTMLElement>("[data-nav]");
  if (!header) return () => {};
  const toggle = header.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = header.querySelector<HTMLElement>("[data-menu]");
  const label = header.querySelector<HTMLElement>("[data-menu-label]");
  const progress = header.querySelector<HTMLElement>("[data-progress]");
  const links = Array.from(header.querySelectorAll<HTMLAnchorElement>("[data-menu] a[data-section]"));
  let last = window.scrollY;
  let raf = 0;
  let open = false;

  const update = () => {
    raf = 0;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max).toFixed(4) : 0})`;
    if (Math.abs(y - last) < 6) return;
    header.toggleAttribute("data-hidden", !open && y > last && y > 120);
    last = y;
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  /** Marks the section under the middle of the viewport (the topmost one, since sections slide over each other). */
  const markCurrent = () => {
    const mid = window.innerHeight / 2;
    let current: HTMLAnchorElement | null = null;
    for (const a of links) {
      const r = document.getElementById(a.dataset.section ?? "")?.getBoundingClientRect();
      if (r && r.top <= mid && r.bottom >= mid) current = a;
    }
    links.forEach((a) => (a === current ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
  };

  const setOpen = (value: boolean, restoreFocus = true) => {
    open = value;
    if (value && menu && toggle) {
      // The reveal circle grows out of the button.
      const r = toggle.getBoundingClientRect();
      menu.style.setProperty("--mx", `${Math.round(r.left + r.width / 2)}px`);
      menu.style.setProperty("--my", `${Math.round(r.top + r.height / 2)}px`);
      markCurrent();
    }
    header.toggleAttribute("data-open", value);
    toggle?.setAttribute("aria-expanded", String(value));
    label?.toggleAttribute("data-alt", value);
    if (menu) menu.inert = !value;
    const lenis = getLenis();
    if (value) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      header.removeAttribute("data-hidden");
      menu?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else {
      document.documentElement.style.overflow = "";
      lenis?.start();
      if (restoreFocus) toggle?.focus();
    }
  };

  const onToggle = () => setOpen(!open);
  const onKey = (e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key !== "Tab" || !menu || !toggle) return;
    // Keep focus inside the open menu: the toggle plus everything in the panel.
    const items = [toggle, ...menu.querySelectorAll<HTMLElement>("a, button")];
    const first = items[0], lastItem = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      lastItem.focus();
    } else if (!e.shiftKey && document.activeElement === lastItem) {
      e.preventDefault();
      first.focus();
    }
  };
  const onMenuClick = (e: MouseEvent) => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a");
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    if (!href.startsWith("#")) {
      if (link.target !== "_blank" && !href.startsWith("mailto:")) setOpen(false, false);
      return;
    }
    setOpen(false, false);
    e.preventDefault();
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target);
      else target.scrollIntoView();
      history.replaceState(null, "", href);
    });
  };

  const stopClock = clock(header);
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKey, true);
  toggle?.addEventListener("click", onToggle);
  menu?.addEventListener("click", onMenuClick);
  return () => {
    cancelAnimationFrame(raf);
    stopClock();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("keydown", onKey, true);
    toggle?.removeEventListener("click", onToggle);
    menu?.removeEventListener("click", onMenuClick);
  };
}
