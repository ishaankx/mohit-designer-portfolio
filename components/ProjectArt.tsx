import { getImageProps } from "next/image";
import { preload as preloadImage } from "react-dom";
import type { Project, ProjectImage } from "@/content/projects";
import { hasAsset } from "@/lib/assets";
import PlaceholderArt from "./PlaceholderArt";

type Props = {
  project: Project;
  which: ProjectImage;
  variant?: number;
  sizes: string;
  alt?: string;
  preload?: boolean;
  className?: string;
};

export default function ProjectArt({ project, which, variant = 0, sizes, alt = "", preload = false, className }: Props) {
  const file = `/images/work/${project.slug}/${which}.webp`;
  if (which !== "art" && hasAsset(file)) {
    const { props } = getImageProps({ src: file, alt, fill: true, sizes, quality: 70, loading: preload ? "eager" : "lazy", fetchPriority: preload ? "high" : "auto" });
    if (preload) preloadImage(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "high" });
    return <img {...props} alt={alt} className={className} style={{ ...props.style, objectFit: "cover" }} />;
  }
  return <PlaceholderArt kind={project.kind} variant={variant} seed={`${project.slug}-${which}-${variant}`} label={alt || undefined} className={className} />;
}
