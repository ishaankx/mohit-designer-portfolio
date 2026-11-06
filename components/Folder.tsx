import type { ReactNode } from "react";
import s from "./Folder.module.css";

type Props = { slug: string; title: string; year: string; sheets: ReactNode[]; autoOpen?: boolean };

export default function Folder({ slug, title, year, sheets, autoOpen = false }: Props) {
  return (
    <a href={`/work/${slug}`} className={s.folder} data-folder={slug} data-auto-open={autoOpen ? "" : undefined} data-cursor="open">
      <span className={s.icon} aria-hidden="true">
        <span className={s.glow} />
        <span className={s.back} />
        <span className={s.sheets}>
          {sheets.map((node, i) => (
            <span key={i} className={s.sheet} data-cover={i === sheets.length - 1 ? "" : undefined}>
              {node}
            </span>
          ))}
        </span>
        <span className={s.flap} />
      </span>
      <span className={s.name}>{title}</span>
      <span className={s.year}>{year}</span>
    </a>
  );
}
