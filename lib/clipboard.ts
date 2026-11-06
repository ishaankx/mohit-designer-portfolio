export async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;opacity:0;pointer-events:none";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  }
}

export function announceCopied() {
  window.dispatchEvent(new CustomEvent("cursor:copied"));
}
