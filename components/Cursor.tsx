import s from "./Cursor.module.css";

export default function Cursor() {
  return (
    <div className={s.root} data-cursor-root="" data-mode="default" aria-hidden="true" hidden>
      <div className={s.ring} data-cursor-ring="">
        <span className={s.shape} />
        <svg className={s.ants} viewBox="0 0 60 44">
          <rect x="1" y="1" width="58" height="42" />
        </svg>
        <span className={s.label}>Open</span>
      </div>
      <div className={s.dotWrap} data-cursor-dot="">
        <span className={s.dot} />
        <svg className={`${s.tool} ${s.pen}`} viewBox="0 0 24 24">
          <path d="M2 22 L6.5 11.5 L13 6 L18 11 L12.5 17.5 Z" />
          <path d="M2 22 L9.2 14.8" />
          <circle cx="10" cy="14" r="1.4" />
          <path d="M13 6 L16 3 L21 8 L18 11" />
        </svg>
        <svg className={`${s.tool} ${s.dropper}`} viewBox="0 0 24 24">
          <path d="M2 22 L3.5 17 L13 7.5 L16.5 11 L7 20.5 Z" />
          <path d="M12 6.5 L17.5 12" />
          <path d="M15 9 L19.5 4.5 a1.9 1.9 0 0 1 2.7 2.7 L17.7 11.7" />
        </svg>
        <svg className={`${s.tool} ${s.cross}`} viewBox="0 0 24 24">
          <path d="M12 0 V9 M12 15 V24 M0 12 H9 M15 12 H24" />
        </svg>
        <span className={s.copied}>Copied</span>
      </div>
    </div>
  );
}
