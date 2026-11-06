import type { CSSProperties, ReactNode } from "react";
import s from "./ProjectView.module.css";

function Eye() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 12 C 5.5 6.5, 18.5 6.5, 22 12 C 18.5 17.5, 5.5 17.5, 2 12 Z" />
      <circle cx="12" cy="12" r="3.2" />
      <path className={s.slash} d="M4 20 L20 4" />
    </svg>
  );
}

type Props = { before: ReactNode; after: ReactNode; beforeLabel: string; afterLabel: string };

const START = 56;

export default function BeforeAfter({ before, after, beforeLabel, afterLabel }: Props) {
  return (
    <div className={s.ba} data-ba="">
      <div className={s.baLayers} role="group" aria-label="Layers">
        <div className={s.baRow} data-ba-row="after">
          <button type="button" className={s.baEye} data-ba-eye="after" data-name={afterLabel} aria-pressed="true" aria-label={`Hide ${afterLabel} layer`}>
            <Eye />
          </button>
          <span className={s.baName}>{afterLabel}</span>
          <span className={s.baValue} data-ba-value="">
            {START}%
          </span>
        </div>
        <div className={s.baRow} data-ba-row="before">
          <button type="button" className={s.baEye} data-ba-eye="before" data-name={beforeLabel} aria-pressed="true" aria-label={`Hide ${beforeLabel} layer`}>
            <Eye />
          </button>
          <span className={s.baName}>{beforeLabel}</span>
          <span className={s.baValue}>100%</span>
        </div>
      </div>

      <div className={s.baCanvas} style={{ "--split": `${START}%` } as CSSProperties} data-project="ba" data-ba-canvas="">
        <div className={s.baBefore} data-ba-before="">
          {before}
          <svg className={s.baGuides} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M33.3 0 V100 M66.6 0 V100 M0 33.3 H100 M0 66.6 H100" />
          </svg>
        </div>
        <div className={s.baAfter}>{after}</div>
        <span className={s.baHandle} aria-hidden="true" />
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={START}
          className={s.baRange}
          data-ba-range=""
          aria-label={`Reveal the ${afterLabel.toLowerCase()} layer over the ${beforeLabel.toLowerCase()}`}
        />
      </div>
    </div>
  );
}
