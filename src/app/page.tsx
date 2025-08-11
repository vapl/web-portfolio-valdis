import Navigation from "@/components/Navigation";
import HeroSlideshow from "@/components/HeroSlideshow";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSlideshow segmentMs={6000} />
    </main>
  );
}
