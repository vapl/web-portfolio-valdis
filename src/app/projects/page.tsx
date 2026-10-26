import type { Metadata } from "next";
import FeaturedWorkCard from "@/components/FeaturedWorkCard";
import SectionTitle from "@/components/SectionTitle";
import { getAllProjects } from "@/lib/getProjects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects spanning internal production systems, ERP reporting and custom web applications.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="min-h-screen bg-background px-11 pb-24 pt-32 text-text md:px-18">
      <div className="mx-auto max-w-7xl space-y-16 md:space-y-24">
        <header className="space-y-6">
          <SectionTitle titleTop="Selected" titleBot="Projects" />
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-text/70">
            Internal systems, data integrations and web applications built around
            real business needs. Explore the problem, the process and the result.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <FeaturedWorkCard
              key={project.slug}
              slug={project.slug}
              imageSrc={project.cover}
              title={project.title}
              subtitle={project.excerpt}
              date={project.publishedAt.slice(0, 4)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
