import { getProjectBySlug, getProjectSlugs } from "@/lib/getProjects";
import { CaseStuddyLayout } from "@/components/case/layout";
import * as Blocks from "@/components/case/blocks";
import { compileMDX } from "next-mdx-remote/rsc";

// pre-generate static paths (SSG)
export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  const { content, meta } = getProjectBySlug(params.slug);

  const mdx = await compileMDX({
    source: content,
    components: Blocks,
    options: { parseFrontmatter: false },
  });

  return <CaseStuddyLayout meta={meta}>{mdx.content}</CaseStuddyLayout>;
};

export default ProjectPage;
