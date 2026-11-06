import s from "./ProjectView.module.css";

export default function BackButton({ label }: { label: string }) {
  return (
    <a href="/#work" className={s.back} data-back="">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 12 H4 M10 6 L4 12 L10 18" />
      </svg>
      <span className="link">{label}</span>
      <span className={s.esc} aria-hidden="true">
        Esc
      </span>
    </a>
  );
}
