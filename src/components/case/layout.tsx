"use client";
import HeroShrinkingCover from "../hero-covers/HeroShrinkingCover";

type LayoutProps = {
  meta: {
    title: string;
    excerpt: string;
    cover: string;
    tags: string[];
    publishedAt: string;
    liveUrl?: string;
    githubUrl?: string;
  };
  children: React.ReactNode;
};

export const CaseStudyLayout = ({ meta, children }: LayoutProps) => {
  return (
    <main className="min-h-screen text-text bg-background">
      <HeroShrinkingCover
        imageSrc={meta.cover}
        title={meta.title}
        excerpt={meta.excerpt}
        shrinkDistance={400}
        bottomOffset={82}
        containerPadBase={260}
        containerPadMd={290}
      />

      {/* Body container — match paddings (px-16 / md:px-24) so edges line up */}
      <section className="max-w-5xl mx-auto px-16 md:px-24 py-10 md:py-14">
        {children}
      </section>
    </main>
  );
};
