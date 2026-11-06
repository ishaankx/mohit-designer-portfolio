import { CITY, EMAIL, NAME, SOCIAL_URLS, contact } from "@/content/site";
import Button from "./Button";
import s from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className={s.footer} data-scene="contact" aria-labelledby="contact-title">
      <span className={s.glow} aria-hidden="true" />
      <h2 id="contact-title" className={s.title}>
        {contact.title.map((l) => (
          <span key={l} className={s.mask}>
            <span className={s.line} data-contact="line">
              {l}
            </span>
          </span>
        ))}
      </h2>

      <div className={s.row}>
        <p className={s.lead}>{contact.line}</p>
        <div className={s.actions}>
          <a className={`link ${s.email}`} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <Button data={{ "data-copy": EMAIL, "data-copy-done": contact.copied }}>{contact.copy}</Button>
        </div>
      </div>

      <ul className={s.socials}>
        {SOCIAL_URLS.map((l) => (
          <li key={l.label}>
            <a className="link" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="rule" />
      <div className={s.base}>
        <p>
          © {year} {NAME}
        </p>
        <p>{CITY}</p>
        <a className="link" href="#top">
          {contact.top}
        </a>
      </div>
    </footer>
  );
}
