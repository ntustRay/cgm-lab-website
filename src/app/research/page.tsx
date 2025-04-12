// src/app/research/page.tsx
import Banner from '@/components/shared/Banner';
import ResearchCard from '@/components/ui/ResearchCard';

// This would come from a JSON file in a real implementation
const researchProjects = [
  {
    id: "research-1",
    title: "Private Projection and Beautification of Camera Images",
    description: "This research focuses on techniques for enhancing and protecting privacy in camera images through projection and beautification algorithms.",
    imageUrl: "/images/research/placeholder.jpg"
  },
  {
    id: "research-2",
    title: "Realistic Video Generation for American Sign Language",
    description: "Developing methods to generate realistic videos for American Sign Language to aid in communication and education.",
    imageUrl: "/images/research/placeholder.jpg"
  },
  {
    id: "research-3",
    title: "Neural Map Processing Visualization through a Graphic Algorithm",
    description: "Investigating visualization techniques for neural map processing using advanced graphic algorithms.",
    imageUrl: "/images/research/placeholder.jpg"
  }
];

export default function ResearchPage() {
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