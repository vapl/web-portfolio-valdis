import HeroSlideshow from "@/components/HeroSlideshow";
import { getAllProjects } from "@/lib/getProjects";

export default function Home() {
  const projects = getAllProjects();
  return (
    <main>
<<<<<<< HEAD
      <HeroSlideshow segmentMs={6000} />
=======
      <Navigation />
      <HeroSlideshow segmentMs={6000} projects={projects} />
>>>>>>> 8b1cb7d260b0a6a5cef5326f1cde4d85de5d5394
    </main>
  );
}
