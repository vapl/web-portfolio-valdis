import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ProjectMeta = {
  slug: string;
  abbreviation: string;
  title: string;
  excerpt: string;
  cover: string;
  tags: string[];
  publishedAt: string;
  liveUrl?: string;
  githubUrl?: string;
};

const possibleDirs = [
  path.join(process.cwd(), "content/projects"),
  path.join(process.cwd(), "src/content/projects"),
  path.join(process.cwd(), "app/content/projects"),
];

export function getAllProjects(): ProjectMeta[] {
  const projectsDir = possibleDirs.find(fs.existsSync) || possibleDirs[0];
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir);

  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf8");
      const { data } = matter(raw);
      return data as ProjectMeta;
    });
}

export function getProjectSlugs() {
  return getAllProjects().map((p) => p.slug);
}

export function getProjectBySlug(slug: string) {
  const projectsDir = possibleDirs.find(fs.existsSync) || possibleDirs[0];

  const filePath = path.join(projectsDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  return { content, meta: data as ProjectMeta };
}
