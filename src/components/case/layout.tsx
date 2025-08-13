import Image from "next/image";

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

export const CaseStuddyLayout = ({ meta, children }: LayoutProps) => {
  return (
    <main className="min-h-screen text-text bg-background">
      {/* Hero */}
      <section className="relative h-[44vh] w-full overflow-hidden">
        <Image
          src={meta.cover}
          alt={meta.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to black/80" />
        <div className="absolute bottom-8 left-6 md:left-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {meta.title}
          </h1>
          <p className="mt-3 text-text/85 text-base md:text-lg max-w-2xl">
            {meta.excerpt}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {children}
      </section>
    </main>
  );
};
