import HeroSlideshow from "@/components/HeroSlideshow";
import { getAllProjects } from "@/lib/getProjects";

export default function Home() {
  const projects = getAllProjects();
  return (
    <main className="bg-background">
      <HeroSlideshow segmentMs={6000} projects={projects} />
    </main>
  );
}
