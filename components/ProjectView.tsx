import type { CSSProperties } from "react";
import { nextProject, type Project } from "@/content/projects";
import { work } from "@/content/site";
import BackButton from "./BackButton";
import BeforeAfter from "./BeforeAfter";
import Folder from "./Folder";
import ProjectArt from "./ProjectArt";
import s from "./ProjectView.module.css";

export default function ProjectView({ project }: { project: Project }) {
  const next = nextProject(project.slug);
  const meta = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Tools", value: project.tools.join(", ") },
  ];

  return (
    <main id="main" className={s.page}>
      <article>
        <header className={s.head} data-project="head">
          <BackButton label="Back to work" />
          <h1 className={s.title} data-project="title">
            {project.title.split(" ").map((word, i) => (
              <span key={i} className={s.mask}>
                <span className={s.line} style={{ "--i": i } as CSSProperties}>
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p className={s.summary}>{project.summary}</p>
        </header>

        <figure className={s.hero} data-project="hero" data-cursor="magnify" style={{ viewTransitionName: `work-${project.slug}` }}>
          <div className={s.parallax} data-project="parallax">
            <div className={s.zoom} data-zoom="">
              <ProjectArt project={project} which="cover" sizes="100vw" alt={project.coverAlt} preload className={s.art} />
            </div>
          </div>
        </figure>

        <section className={s.details} aria-label="Project details">
          <dl className={s.meta}>
            {meta.map((m) => (
              <div key={m.label} className={s.metaRow}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
          <p className={s.intro} data-reveal="">
            {project.intro}
          </p>
        </section>

        <section className={s.chapters} aria-label="How it was made">
          <ol className={s.captions} data-project="captions">
            {project.chapters.map((c, i) => (
              <li key={c.title} className={s.caption} data-caption={i}>
                <span className={s.capNum}>{i + 1}</span>
                <h2 className={s.capTitle}>{c.title}</h2>
                <p className={s.capText}>{c.text}</p>
              </li>
            ))}
          </ol>
          <div className={s.figures}>
            {project.chapters.map((c, i) => (
              <figure key={c.title} className={s.figure} data-project="figure" data-index={i} data-cursor="magnify">
                <div className={s.frame} data-project="frame">
                  <div className={s.parallax} data-project="parallax">
                    <div className={s.zoom} data-zoom="">
                      <ProjectArt project={project} which={c.image} variant={c.variant} sizes="(max-width: 899px) 100vw, 62vw" alt={c.alt} className={s.art} />
                    </div>
                  </div>
                </div>
                <figcaption className={s.figcaption}>
                  <span className={s.capNum}>{i + 1}</span>
                  <strong>{c.title}</strong> {c.text}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={s.compare} aria-labelledby="compare-title">
          <h2 id="compare-title" className={`giant ${s.compareTitle}`}>
            <span>{project.compare.title}</span>
          </h2>
          <BeforeAfter
            beforeLabel={project.compare.before}
            afterLabel={project.compare.after}
            before={<ProjectArt project={project} which="preview-1" variant={1} sizes="(max-width: 899px) 100vw, 70vw" className={s.art} />}
            after={<ProjectArt project={project} which="preview-1" variant={1} sizes="(max-width: 899px) 100vw, 70vw" alt={`${project.title}, ${project.compare.after.toLowerCase()}`} className={s.art} />}
          />
        </section>

        <section className={s.next} aria-labelledby="next-title">
          <h2 id="next-title" className={s.nextTitle}>
            {work.next}
          </h2>
          <div className={s.nextFolder}>
            <Folder
              slug={next.slug}
              title={next.title}
              year={next.year}
              autoOpen
              sheets={[
                <ProjectArt key="a" project={next} which="art" variant={2} sizes="200px" />,
                <ProjectArt key="b" project={next} which="preview-1" variant={1} sizes="220px" />,
                <ProjectArt key="c" project={next} which="cover" variant={0} sizes="240px" />,
              ]}
            />
          </div>
        </section>
      </article>
    </main>
  );
}
