import {
  getProjectBySlug,
  getProjectSlugs,
  getAllProjects,
} from "@/lib/getProjects";
import { CaseStudyLayout } from "@/components/case/layout";
import * as Blocks from "@/components/case/blocks";
import { compileMDX } from "next-mdx-remote/rsc";

// pre-generate static paths (SSG)
export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { content, meta } = getProjectBySlug(params.slug);
  const projects = getAllProjects();

  const index = projects.findIndex((p) => p.slug === params.slug);

  const prev = projects[index - 1] ?? null;
  const next = projects[index + 1] ?? null;

  const mdx = await compileMDX({
    source: content,
    components: Blocks,
    options: { parseFrontmatter: false },
  });

  return (
    <CaseStudyLayout meta={meta} prev={prev} next={next}>
      {mdx.content}
    </CaseStudyLayout>
  );
}
