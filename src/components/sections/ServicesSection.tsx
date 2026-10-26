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
      title: "Internal Tools",
      description:
        "Custom systems that simplify everyday work, centralize information, and replace fragmented manual processes.",
      iconName: icon.cilApplications,
    },
    {
      id: 2,
      title: "Business Automation",
      description:
        "Automation of repetitive workflows, reporting, data processing, and document-heavy tasks.",
      iconName: icon.cilBolt,
    },
    {
      id: 3,
      title: "Data & Integrations",
      description:
        "Connecting databases, APIs, ERP systems, and existing company data into practical working solutions.",
      iconName: icon.cilStorage,
    },
    {
      id: 4,
      title: "Web Applications",
      description:
        "Full-stack applications built with modern web technologies, databases, and AI-assisted development.",
      iconName: icon.cilBrowser,
    },
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
