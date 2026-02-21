"use client";

import { useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

type Common = {
  caption?: string;
  mode?: "container" | "bleed";
};

type Img = Common & {
  type: "image";
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

type Vid = Common & {
  type: "video";
  src: string;
  poster?: string;
  scrub?: boolean;
  muted?: boolean;
  loop?: boolean;
};

type MediaInputItem = (Partial<Img> & { src: string }) | Vid;

const BleedFigure: React.FC<{
  children: React.ReactNode;
  caption?: string;
}> = ({ children, caption }) => (
  <figure className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
    {children}
    {caption && (
      <figcaption className="text-center text-text/60 mt-2">
        {caption}
      </figcaption>
    )}
  </figure>
);

const ContainerFigure: React.FC<{
  children: React.ReactNode;
  caption?: string;
}> = ({ children, caption }) => (
  <figure>
    {children}
    {caption && (
      <figcaption className="text-center text-text/60 mt-2">
        {caption}
      </figcaption>
    )}
  </figure>
);

/** Vide block width option scroll-scrubbing */
function VideoBlock({ item, bleed }: { item: Vid; bleed: boolean }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll progress relative to this block (0 at enter, 1 at exit)
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 210%", "end start"],
  });

  useEffect(() => {
    if (!item.scrub && item.scrub !== undefined) return; // scrub=false => do nothing

    const video = videoRef.current;
    if (!video) return;

    // Defaults for safe autoplay policies
    video.muted = item.muted ?? true;

    let duration = 0;
    const onMeta = () => {
      duration = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);

    let rafId: number | null = null;
    const targetTime = 0;

    const unsub = scrollYProgress.on("change", () => {
      if (!duration) return;

      if (rafId !== null) {
        rafId = requestAnimationFrame(() => {
          video.currentTime = targetTime;
          rafId = null;
        });
      }
    });

    return () => {
      unsub();
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [item.scrub, item.muted, scrollYProgress]);

  const V = (
    <div ref={wrapRef}>
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        playsInline
        // controls only if not scrubbing
        controls={item.scrub === false}
        loop={item.loop ?? false}
        className="w-full h-auto rounded-none object-cover"
      />
    </div>
  );

  return bleed ? (
    <BleedFigure caption={item.caption}>{V}</BleedFigure>
  ) : (
    <ContainerFigure caption={item.caption}>{V}</ContainerFigure>
  );
}

const Media = ({ images = [] }: { images?: MediaInputItem[] }) => {
  const safeImages = Array.isArray(images) ? images : [];

  return (
    <div className="space-y-8">
      {safeImages.map((item, i) => {
        const bleed = item.mode === "bleed";
        const type = item.type ?? "image";

        if (type === "video") {
          return <VideoBlock key={i} item={item as Vid} bleed={bleed} />;
        }

        // image
        const imageEl = (
          <Image
            src={item.src}
            alt={item.alt ?? ""}
            width={item.width ?? 1400}
            height={item.height ?? 900}
            className="w-full h-auto object-cover rounded-xl"
            priority={false}
          />
        );

        return bleed ? (
          <BleedFigure key={i} caption={item.caption}>
            <Image
              src={item.src}
              alt={item.alt ?? ""}
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
            />
          </BleedFigure>
        ) : (
          <ContainerFigure key={i} caption={item.caption}>
            {imageEl}
          </ContainerFigure>
        );
      })}
    </div>
  );
};

export default Media;
