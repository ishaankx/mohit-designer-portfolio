import { skills, skillsCopy } from "@/content/skills";
import LayersPanel from "./LayersPanel";
import SkillArt from "./SkillArt";
import s from "./Layers.module.css";

export default function Layers() {
  return (
    <section id="skills" className={s.layers} data-scene="layers" aria-labelledby="skills-title">
      <div className="rule" />
      <header className={s.head}>
        <h2 id="skills-title" className={`giant ${s.title}`} data-layers="title">
          {skillsCopy.title.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </h2>
        <p className={s.sub}>{skillsCopy.sub}</p>
      </header>
      <LayersPanel
        skills={skills}
        copy={skillsCopy}
        arts={skills.map((sk) => (
          <SkillArt key={sk.id} kind={sk.art} id={sk.id} />
        ))}
      />
    </section>
  );
}
