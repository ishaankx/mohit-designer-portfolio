import type { CSSProperties } from "react";
import { CITY, EMAIL, NAME, SOCIAL_URLS, TIME_ZONE, nav, navMeta } from "@/content/site";
import s from "./Nav.module.css";

/** Filled in and kept ticking by lib/ui/nav.ts in the designer's time zone. */
function Clock() {
  return (
    <time className={s.clock} data-clock-time="">
      <span data-hh="">--</span>
      <span className={s.colon}>:</span>
      <span data-mm="">--</span>
    </time>
  );
}

/** Availability rolls to "Let's talk" on hover and jumps to the contact section. */
function Status({ className, base }: { className: string; base: string }) {
  return (
    <p className={className}>
      <a className={s.avail} href={`${base}#contact`} aria-label={`${navMeta.status}. ${navMeta.statusHover}`}>
        <span className={s.availRoll}>
          <span>{navMeta.status}</span>
          <span className={s.availHover} aria-hidden="true">
            {navMeta.statusHover}
            <svg className={s.availArrow} viewBox="0 0 24 24">
              <path d="M3 12h17M14 6l6 6-6 6" />
            </svg>
          </span>
        </span>
      </a>
      <span className={s.sep} aria-hidden="true" />
      <span>{CITY}</span>
      <Clock />
    </p>
  );
}

export default function Nav({ home = false }: { home?: boolean }) {
  const base = home ? "" : "/";
  return (
    <header className={s.nav} data-nav="" data-tz={TIME_ZONE}>
      <a className={s.brand} href={home ? "#top" : "/"}>
        {NAME}
        <span className={s.dot} aria-hidden="true" />
      </a>

      <Status className={s.status} base={base} />

      <button type="button" className={s.menuBtn} aria-expanded="false" aria-controls="site-menu" data-menu-toggle="" data-btn="">
        <span className={s.menuLabel} data-menu-label="">
          <span>{navMeta.menu}</span>
          <span aria-hidden="true">{navMeta.close}</span>
        </span>
        <span className={s.burger} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <span className={s.progress} data-progress="" aria-hidden="true" />

      <div id="site-menu" className={s.menu} inert data-menu="" data-lenis-prevent="">
        <nav aria-label="Menu">
          <ol className={s.menuList}>
            {nav.map((l, i) => (
              <li key={l.href} className={s.menuItem}>
                <a href={base + l.href} className={s.menuLink} data-section={l.href.slice(1)} style={{ "--i": i } as CSSProperties}>
                  <span className={s.menuIndex} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={s.menuText}>{l.label}</span>
                  <svg className={s.menuArrow} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 12h17M14 6l6 6-6 6" />
                  </svg>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className={s.aside}>
          <a className={`link ${s.mail}`} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <ul className={s.socials}>
            {SOCIAL_URLS.map((l) => (
              <li key={l.label}>
                <a className="link" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Status className={s.asideStatus} base={base} />
        </div>
      </div>
    </header>
  );
}
