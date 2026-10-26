import {
  getProjectBySlug,
  getProjectSlugs,
  getAllProjects,
} from "@/lib/getProjects";
import { CaseStudyLayout } from "@/components/case/layout";
import * as Blocks from "@/components/case/blocks";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  return {
    title: project.meta.title,
    description: project.meta.excerpt,
    openGraph: {
      title: project.meta.title,
      description: project.meta.excerpt,
      type: "article",
    },
  };
}

// pre-generate static paths (SSG)
export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const { content, meta } = project;
  const projects = getAllProjects();

  const index = projects.findIndex((p) => p.slug === slug);

  const prev = projects[index - 1];
  const next = projects[index + 1];

  const mdx = await compileMDX({
    source: content,
    components: Blocks,
    options: {
      parseFrontmatter: false,
      // Only repository-owned MDX is loaded here. Preserve component props
      // such as images, metrics and invert while retaining dangerous-JS checks.
      blockJS: false,
      blockDangerousJS: true,
    },
  });

  return (
    <CaseStudyLayout meta={meta} prev={prev} next={next}>
      {mdx.content}
    </CaseStudyLayout>
  );
}
