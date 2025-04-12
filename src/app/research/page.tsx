// src/app/research/page.tsx
import Banner from '@/components/shared/Banner';
import ResearchCard from '@/components/ui/ResearchCard';
import researchData from '@/data/research.json';

interface ResearchProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function ResearchPage() {
  const researchProjects = researchData as ResearchProject[];

  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Research Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchProjects.map(project => (
            <ResearchCard key={project.id} research={project} />
          ))}
        </div>
      </div>
    </>
  );
}