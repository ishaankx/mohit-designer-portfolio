import s from "./Swatches.module.css";

type Swatch = { name: string; hex: string };

export default function Swatches({ hint, palette }: { hint: string; palette: Swatch[] }) {
  return (
    <div className={s.palette} data-reveal="">
      <p className={s.hint}>{hint}</p>
      <ul className={s.list}>
        {palette.map((p) => (
          <li key={p.hex}>
            <button type="button" className={s.swatch} data-cursor="eyedropper" data-copy={p.hex} data-copy-done="Copied" aria-label={`Copy ${p.name}, ${p.hex}`}>
              <span className={s.chip} style={{ background: p.hex }} />
              <span className={s.name}>{p.name}</span>
              <span className={s.hex} data-copy-text="">
                {p.hex}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
