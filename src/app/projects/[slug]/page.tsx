import { projectList } from "@/data/projectList";
import Image from "next/image";
import { Metadata } from "next";

// pre-generate static paths (SSG)
export async function generateStaticParams() {
    return projectList.map(p => ({ slug: p.slug}));
}

//pre-page SEO based on project
export async function generateMetadata(
    { params }: { params: { slug: string }}
): Promise<Metadata> {
    const p = projectList.find(x => x.slug === params.slug);

    if (!p) return { title: "Project not found" };

    return {
        title: `${p.title} | Valdis Portfolio`,
        description: p.description,
        openGraph: {
            title: p.title,
            description: p.description,
            images: [{ url: p.image }]
        }
    }
}

export default function ProjectPage({ params }: {params: {slug: string }}) {
    const p = projects.find(x => x.slug === params.slug);
}