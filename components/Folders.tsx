import { projects } from "@/content/projects";
import { work } from "@/content/site";
import Folder from "./Folder";
import ProjectArt from "./ProjectArt";
import s from "./Folders.module.css";

export default function Folders() {
  return (
    <section id="work" className={s.work} data-scene="work" aria-labelledby="work-title">
      <header className={s.head}>
        <h2 id="work-title" className={`giant ${s.title}`} data-work="title">
          {work.title.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </h2>
        <p className={s.sub}>{work.sub}</p>
      </header>
      <ul className={s.grid} data-work="grid">
        {projects.map((p) => (
          <li key={p.slug} data-work="item">
            <Folder
              slug={p.slug}
              title={p.title}
              year={p.year}
              sheets={[
                <ProjectArt key="a" project={p} which="art" variant={2} sizes="200px" />,
                <ProjectArt key="b" project={p} which="preview-1" variant={1} sizes="220px" />,
                <ProjectArt key="c" project={p} which="cover" variant={0} sizes="240px" />,
              ]}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
