"use client";
import HeroShrinkingCover from "../hero-covers/HeroShrinkingCover";
import SideToc from "./SideToc";

type TocItem = { id: string; label: string };

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
  toc?: TocItem[];
};

export const CaseStudyLayout = ({ meta, children }: LayoutProps) => {
  return (
    <main className="min-h-screen text-text bg-background ">
      <HeroShrinkingCover
        imageSrc={meta.cover}
        title={meta.title}
        excerpt={meta.excerpt}
        shrinkDistance={400}
        bottomOffset={82}
        containerPadBase={260}
        containerPadMd={290}
      />

      {/* --- BODY --- */}
      <div className="w-full mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-center gap-8">
          {/* Content */}
          <article className="mx-auto lg:mx-0 px-9 md:px-6">{children}</article>
        </div>
      </div>
    </main>
  );
};
