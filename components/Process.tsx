import type { CSSProperties } from "react";
import { artboard, mark, processCopy, steps } from "@/content/process";
import { processPath } from "@/lib/path";
import s from "./Process.module.css";

export default function Process() {
  const { d, prefixes, markFill } = processPath(steps, mark);
  const { w, h } = artboard;

  return (
    <section id="process" className={s.process} data-scene="process" data-cursor="pen" aria-labelledby="process-title">
      <div className={s.stage}>
        <header className={s.head}>
          <h2 id="process-title" className={`giant ${s.title}`}>
            {processCopy.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h2>
          <p className={s.sub}>{processCopy.sub}</p>
        </header>

        <div className={s.board}>
          <div className={s.artboard} data-process="artboard">
            <svg className={s.svg} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
              <g className={s.guides}>
                {steps.map((st) => (
                  <line key={`v${st.x}`} x1={st.x} y1={0} x2={st.x} y2={h} />
                ))}
                <line x1={0} y1={300} x2={w} y2={300} />
                <line x1={0} y1={620} x2={w} y2={620} />
              </g>
              {steps.map((st) => (
                <g key={`h${st.x}`} className={s.handles} data-process="handles" data-x={st.x} data-y={st.y}>
                  <line x1={st.x - st.hx} y1={st.y - st.hy} x2={st.x + st.hx} y2={st.y + st.hy} />
                  <circle cx={st.x - st.hx} cy={st.y - st.hy} r={6} />
                  <circle cx={st.x + st.hx} cy={st.y + st.hy} r={6} />
                </g>
              ))}
              <path className={s.markFill} d={markFill} data-process="mark" />
              <path className={s.path} d={d} pathLength={1} data-process="path" data-prefixes={JSON.stringify(prefixes)} />
              {steps.map((st) => (
                <rect key={`a${st.x}`} className={s.anchor} x={st.x - 9} y={st.y - 9} width={18} height={18} data-process="anchor" />
              ))}
            </svg>

            <ol className={s.steps}>
              {steps.map((st, i) => (
                <li
                  key={st.title}
                  className={s.step}
                  data-place={st.place}
                  data-process="step"
                  style={{ "--x": `${(st.x / w) * 100}%`, "--y": `${(st.y / h) * 100}%` } as CSSProperties}
                >
                  <span className={s.num}>{i + 1}</span>
                  <h3 className={s.stepTitle}>{st.title}</h3>
                  <p className={s.stepLine}>{st.line}</p>
                </li>
              ))}
            </ol>

            <span className={s.markNote} data-process="marknote" aria-hidden="true">
              {processCopy.markNote}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
