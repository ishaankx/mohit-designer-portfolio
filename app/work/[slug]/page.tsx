import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { hasAsset } from "@/lib/assets";
import ProjectView from "@/components/ProjectView";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const cover = `/images/work/${slug}/cover.webp`;
  const image = hasAsset(cover) ? cover : "/og.jpg";
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      url: `/work/${slug}`,
      title: project.title,
      description: project.summary,
      images: [{ url: image, alt: project.coverAlt }],
    },
    twitter: { card: "summary_large_image", title: project.title, description: project.summary, images: [image] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <>
      <Nav />
      <ProjectView project={project} />
      <SmoothScroll scene="project" />
    </>
  );
}
