import { projectList } from "@/data/projectList";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

// pre-generate static paths (SSG)
export async function generateStaticParams() {
  return projectList.map((p) => ({ slug: p.slug }));
}

//pre-page SEO based on project
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = projectList.find((x) => x.slug === params.slug);

  if (!p) return { title: "Project not found" };

  return {
    title: `${p.title} | Valdis Portfolio`,
    description: p.description,
    openGraph: {
      title: p.title,
      description: p.description,
      images: [{ url: p.image }],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = projectList.find((x) => x.slug === params.slug);

  if (!p) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">Project not found</h1>
          <Link className="underline" href={"/projects"}>
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <section className="relative h-[48vh] w-full">
        {/* Hover image */}
        <Image
          src={p.image}
          alt={p.title}
          fill
          className="object-cover"
          priority
        />

        {/* Dark overly + Title */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text">
            {p.title}
          </h1>
          <p className="text-text/80 mt-2 max-w-2xl">{p.description}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {p.technologies.map((t) => (
            <span key={t} className="rounded-2xl border px-3 py-1 text-sm">
              {t}
            </span>
          ))}
        </div>

        {/* Content (basic HTML string for now) */}
        <article
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: p.content ?? "" }}
        />

        {/* Links */}
        <div className="flex gap-3">
          {p.liveUrl && (
            <Link
              className="rounded-2xl px-4 py-2 border hover:bg-white/5"
              href={p.liveUrl}
            >
              Live Demo
            </Link>
          )}
          {p.githubUrl && (
            <Link
              className="rounded-2xl px-4 py-2 border hover:bg-white/5"
              href={p.githubUrl}
            >
              View on GitHub
            </Link>
          )}
        </div>

        {/* Prev/Next navigation */}
        <nav className="flex items-center justify-between pt-8 border-t">
          {navOf(p.slug).prev ? (
            <Link
              className="underline"
              href={`/projects/${navOf(p.slug).prev!.slug}`}
            ></Link>
          ) : (
            <span />
          )}
          {navOf(p.slug).next ? (
            <Link
              className="underline"
              href={`/projects/${navOf(p.slug).next!.slug}`}
            ></Link>
          ) : (
            <span />
          )}
        </nav>
      </section>
    </main>
  );
}

// Helper to find previous/next project based on slug
function navOf(slug: string) {
  const ordered = [...projectList].sort(
    (a, b) => +new Date(a.publishedAt) - +new Date(b.publishedAt)
  );

  const i = ordered.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? ordered[i - 1] : null,
    next: i < ordered.length - 1 ? ordered[i + 1] : null,
  };
}
