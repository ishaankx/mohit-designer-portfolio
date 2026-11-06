import type { CSSProperties, ReactNode } from "react";
import type { Skill, skillsCopy } from "@/content/skills";
import s from "./Layers.module.css";

function Eye() {
  return (
    <svg viewBox="0 0 24 24" className={s.eyeIcon} aria-hidden="true">
      <path d="M2 12 C 5.5 6.5, 18.5 6.5, 22 12 C 18.5 17.5, 5.5 17.5, 2 12 Z" />
      <circle cx="12" cy="12" r="3.2" />
      <path className={s.slash} d="M4 20 L20 4" />
    </svg>
  );
}

type Props = { skills: Skill[]; copy: typeof skillsCopy; arts: ReactNode[] };

export default function LayersPanel({ skills, copy, arts }: Props) {
  return (
    <div className={s.panel} data-layers-panel="">
      <div className={s.stageWrap}>
        <div className={s.stage} data-cursor="select" data-layers="stage" role="img" aria-label={`Layer stage showing ${copy.composite}`}>
          {skills.map((sk, i) => (
            <div key={sk.id} className={s.layer} data-layer={i} style={{ mixBlendMode: sk.mode, opacity: sk.opacity / 100 } as CSSProperties}>
              {arts[i]}
            </div>
          ))}
          <div className={s.caption} aria-hidden="true">
            <p className={s.capName} data-cap-name="">
              {copy.composite}
            </p>
            <p className={s.capNote} data-cap-note="">
              {copy.compositeNote}
            </p>
          </div>
        </div>
      </div>

      <div className={s.list}>
        <div className={s.cols} aria-hidden="true">
          <span />
          <span>{copy.columns.layer}</span>
          <span>{copy.columns.blend}</span>
          <span>{copy.columns.opacity}</span>
        </div>
        <ul data-layers="rows">
          {skills.map((sk) => (
            <li key={sk.id} className={s.row} data-layers="row" data-name={sk.name} data-note={sk.note}>
              <button type="button" className={s.eye} data-eye="" aria-pressed="true" aria-label={`Hide ${sk.name} layer`}>
                <Eye />
              </button>
              <button type="button" className={s.name} data-solo="" aria-pressed="false">
                {sk.name}
                <span className={s.note}>{sk.note}</span>
              </button>
              <span className={s.blend}>{sk.blend}</span>
              <span className={s.opacity}>{sk.opacity}%</span>
              <span className={s.bar} aria-hidden="true">
                <span className={s.barFill} data-bar={sk.opacity / 100} style={{ "--v": sk.opacity / 100 } as CSSProperties} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
