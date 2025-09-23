/* eslint-disable react/no-unescaped-entities */

import AboutHero from "@/components/AboutHero";
import ServiceCard from "@/components/cards/ServiceCard";
import FeaturedWorkCard from "@/components/FeaturedWorkCard";
import HorizontalTextScroll from "@/components/HorizontalTextScroll";
import ServicesSection from "@/components/sections/ServicesSection";
import SectionTitle from "@/components/SectionTitle";
import Button from "@/components/ui/Button";
import { getAllProjects } from "@/lib/getProjects";
import * as icon from "@coreui/icons";

export default function AboutPage() {
  const projects = getAllProjects();

  const services = [
    {
      id: 1,
      title: "Web Development",
      description:
        "Modern and fast websites built with Next.js, React, and Tailwind.",
      iconName: icon.cilApplications,
    },
    {
      id: 2,
      title: "Web Applications",
      description:
        "Interactive solutions with backend and databases (Node.js, Supabase, PostgreSQL).",
      iconName: icon.cilStorage,
    },
    {
      id: 3,
      title: "UI/UX Design",
      description:
        "User-friendly design and animations with Framer Motion and Figma.",
      iconName: icon.cilBrush,
    },
    {
      id: 4,
      title: "Automation & Integrations",
      description: "API integrations and custom scripts to reduce manual work.",
      iconName: icon.cilBolt,
    },
    {
      id: 5,
      title: "E-commerce",
      description: "Online stores with payment systems and CMS integration.",
      iconName: icon.cilCart,
    },
  ];

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
          I create digital solutions that transform ideas into powerful web
          experiences. Through innovative frontend design, solid backend
          architecture, and intelligent automation, I build tools that don't
          just look great—they drive real business growth and make complex
          processes effortless.
        </p>
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
          <Button link="/projects" value="All Projects" />
        </div>
      </section>
      <section>
        <HorizontalTextScroll
          topRowText="CODING • DESIGN"
          botRowText="FRONTEND • BACKEND • DEVELOPMENT"
        />
      </section>
      <ServicesSection />
      <section>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
        <p>dsfafafjasdjfāf'pda adsfpa'jfāojfā fa foa'pjfpao'fpoa</p>
      </section>
      {/* ... your story, timeline, skills, socials, CTA, etc. */}
    </main>
  );
}
