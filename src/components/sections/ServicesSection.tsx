"use client";

import ServiceCard from "@/components/cards/ServiceCard";
import SectionTitle from "@/components/SectionTitle";
import * as icon from "@coreui/icons";
import AnimatedServiceCard from "../cards/AnimatedServiceCard";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import Button from "../ui/Button";

export default function ServicesSection() {
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
    // {
    //   id: 5,
    //   title: "E-commerce",
    //   description: "Online stores with payment systems and CMS integration.",
    //   iconName: icon.cilCart,
    // },
  ];

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Scroll progress visam wrapperim
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="py-18 to-background">
      <div className="relative px-11 md:px-18 space-y-24 flex flex-col items-center">
        <SectionTitle titleTop="How I Can" titleBot="Help" />

        {/* Sticky kartes */}
        <div
          ref={wrapperRef}
          id="cards"
          className="flex flex-col gap-6 w-full md:max-w-5xl"
        >
          {services.map((s, i) => (
            <AnimatedServiceCard
              key={s.id}
              index={i}
              total={services.length}
              scrollYProgress={scrollYProgress}
            >
              <ServiceCard
                sequence={s.id}
                title={s.title}
                description={s.description}
                iconName={s.iconName}
              />
            </AnimatedServiceCard>
          ))}
        </div>
        <Button link="/contact" value="Get in Touch" />
      </div>
    </section>
  );
}
