/* eslint-disable react/no-unescaped-entities */

import AboutHero from "@/components/AboutHero";
import { PullQuote } from "@/components/case/blocks";
import FeaturedWorkCard from "@/components/FeaturedWorkCard";
import HorizontalTextScroll from "@/components/HorizontalTextScroll";
import ProcessSpine from "@/components/ProcessSpine";
import ServicesSection from "@/components/sections/ServicesSection";
import SectionTitle from "@/components/SectionTitle";
import Toolbox from "@/components/stack/Toolbox";
import Button from "@/components/ui/Button";
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
        <div className="flex flex-col space-y-6">
          <p className="text-text text-[clamp(1.5rem,2.5vw,3.5rem)] font-bold tracking-wide">
            I turn real business problems into working digital systems.
          </p>
          <p className="text-text text-[clamp(1.5rem,2.5vw,3.5rem)] font-bold tracking-wide">
            Internal tools, automation, data integrations and web applications — built rapidly with modern development and AI tools.
          </p>
        </div>
      </section>
      <section className="py-18 bg-black">
        <div className="px-11 md:px-18 mx-auto space-y-24 flex flex-col items-center">
          <SectionTitle titleTop="Featured" titleBot="Work" />
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
          {/* <Button link="/projects" value="All Projects" /> */}
        </div>
      </section>
      <section>
        <HorizontalTextScroll
          topRowText="CODING • DESIGN"
          botRowText="FRONTEND • BACKEND • DEVELOPMENT"
        />
      </section>
      <ServicesSection />
      <section className="py-24 bg-primary/10">
        <div className="px-11 md:px-18 mx-auto space-y-24 flex flex-col items-center">
          <SectionTitle titleTop="What I Bring" className="text-text" />
          <PullQuote>
            <div className="flex flex-col space-y-6">
              <p className="text-text text-[clamp(1.5rem,2.5vw,3.5rem)] font-bold tracking-wide">
                I design practical systems that solve real business problems — reducing manual work, connecting data, and making everyday processes easier to manage.
              </p>
              <p className="text-text text-[clamp(1.5rem,2.5vw,3.5rem)] font-bold tracking-wide">
                My strength is turning unclear requirements into working solutions, from the first idea to a usable prototype.
              </p>
            </div>
          </PullQuote>
        </div>
      </section>
      <section className="flex flex-col items-center px-11 md:px-18 mx-auto py-18 space-y-24 bg-black">
        <SectionTitle
          titleTop="How I Build"
          className="text-text"
        />
        <Toolbox />
      </section>
      <section className="flex flex-col items-center px-11 md:px-18 mx-auto py-18 space-y-24">
        <SectionTitle titleTop="How I Work" />
        <ProcessSpine />
        <Button link="/contact" value="Get in Touch" />
      </section>
    </main>
  );
}
