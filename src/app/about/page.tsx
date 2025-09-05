import AboutHero from "@/components/AboutHero";
import FeaturedWorkCard from "@/components/FeaturedWorkCard";
import { getAllProjects } from "@/lib/getProjects";

export default function AboutPage() {
  const projects = getAllProjects();

  return (
    <main className="bg-background text-text">
      <AboutHero />

      {/* Content below the hero */}
      {/* Intro section */}
      <section className="px-11 md:px-18 max-w-5xl mx-auto py-18 space-y-6">
        <h3 className="text-[clamp(1rem,2.0vw,1.8rem)] uppercase text-secondary tracking-wider">
          Hi, My name is Valdis Vascenkovs
        </h3>
        <p className="text-text text-[clamp(1.5rem,2.5vw,3.5rem)] font-bold tracking-wide">
          I craft web solutions that blend stunning design with seamless
          functionality. By integrating frontend creativity, robust backend
          development, and smart automation, I deliver tools that streamline
          operations, save time, and empower businesses to thrive.
        </p>
      </section>
      <section className="py-18 bg-black">
        <div className="px-11 md:px-18 mx-auto space-y-24 flex flex-col items-center">
          <h1 className="text-[clamp(2.5rem,5.0vw,5.8rem)] text-center flex flex-col leading-none uppercase font-extrabold text-text ">
            <span>Featured</span>
            <span>work</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => {
              const year = new Date(project.publishedAt).getFullYear();
              return (
                <FeaturedWorkCard
                  key={project.slug}
                  slug={project.slug}
                  imageSrc={project.cover}
                  title={project.title}
                  subtitle={project.excerpt}
                  date={year.toString()}
                />
              );
            })}
          </div>
        </div>
      </section>
      {/* ... your story, timeline, skills, socials, CTA, etc. */}
    </main>
  );
}
