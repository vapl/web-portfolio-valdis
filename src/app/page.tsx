import ProjectSlide from "@/components/ProjectSlide";
import { projectList } from '@/data/projectList';


export default function Home() {
  const project = projectList[0];

  return (
    <main>
      <ProjectSlide
        abbreviation={project.abbreviation}
        image={project.image}
        slug={project.slug}
      />
    </main>
  );
}
