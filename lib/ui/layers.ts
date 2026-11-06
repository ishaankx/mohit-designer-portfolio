export function layers() {
  const panel = document.querySelector<HTMLElement>("[data-layers-panel]");
  if (!panel) return () => {};
  const rows = Array.from(panel.querySelectorAll<HTMLElement>('[data-layers="row"]'));
  const stageLayers = Array.from(panel.querySelectorAll<HTMLElement>("[data-layer]"));
  const stage = panel.querySelector<HTMLElement>('[data-layers="stage"]');
  const capName = panel.querySelector<HTMLElement>("[data-cap-name]");
  const capNote = panel.querySelector<HTMLElement>("[data-cap-note]");
  const base = { name: capName?.textContent ?? "", note: capNote?.textContent ?? "" };
  let active: number | null = null;

  const setActive = (i: number | null) => {
    if (i === active) return;
    active = i;
    rows.forEach((row, j) => {
      row.toggleAttribute("data-active", j === i);
      row.querySelector("[data-solo]")?.setAttribute("aria-pressed", String(j === i));
    });
    stageLayers.forEach((layer, j) => layer.toggleAttribute("data-dim", i !== null && j !== i));
    const row = i === null ? null : rows[i];
    if (capName) capName.textContent = row?.dataset.name ?? base.name;
    if (capNote) capNote.textContent = row?.dataset.note ?? base.note;
    stage?.setAttribute("aria-label", `Layer stage showing ${row?.dataset.name ?? base.name}`);
  };

  const toggleEye = (i: number) => {
    const row = rows[i];
    if (!row) return;
    const off = !row.hasAttribute("data-off");
    row.toggleAttribute("data-off", off);
    stageLayers[i]?.toggleAttribute("data-off", off);
    const eye = row.querySelector("[data-eye]");
    eye?.setAttribute("aria-pressed", String(!off));
    eye?.setAttribute("aria-label", `${off ? "Show" : "Hide"} ${row.dataset.name} layer`);
  };

  const rowOf = (t: EventTarget | null) => (t instanceof Element ? t.closest<HTMLElement>('[data-layers="row"]') : null);

  const onClick = (e: MouseEvent) => {
    const row = rowOf(e.target);
    if (!row) return;
    const i = rows.indexOf(row);
    const t = e.target as Element;
    if (t.closest("[data-eye]")) toggleEye(i);
    else if (t.closest("[data-solo]")) setActive(active === i ? null : i);
  };
  const onOver = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const row = rowOf(e.target);
    if (row) setActive(rows.indexOf(row));
  };
  const onLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") setActive(null);
  };
  const onFocus = (e: FocusEvent) => {
    const t = e.target as Element | null;
    if (!t?.closest("[data-solo]")) return;
    const row = rowOf(t);
    if (row) setActive(rows.indexOf(row));
  };

  panel.addEventListener("click", onClick);
  panel.addEventListener("pointerover", onOver);
  panel.addEventListener("pointerleave", onLeave);
  panel.addEventListener("focusin", onFocus);
  return () => {
    panel.removeEventListener("click", onClick);
    panel.removeEventListener("pointerover", onOver);
    panel.removeEventListener("pointerleave", onLeave);
    panel.removeEventListener("focusin", onFocus);
  };
}
