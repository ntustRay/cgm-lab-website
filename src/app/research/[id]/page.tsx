// src/app/research/[id]/page.tsx
import Banner from '@/components/shared/Banner';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import researchData from '@/data/research.json';

interface ResearchProject {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  team: string[];
  publications: {
    title: string;
    conference: string;
    link?: string;
  }[];
}

// Generate static params for all research projects
export function generateStaticParams() {
  const projects = researchData as ResearchProject[];
  return projects.map((project) => ({
    id: project.id,
  }));
}

// Get a research project by ID from the JSON data
const getResearchProject = (id: string) => {
  const projects = researchData as ResearchProject[];
  const project = projects.find(p => p.id === id);
  if (!project) return null;
  return project;
};

export default function ResearchProjectPage({params}: {params: {id: string}}) {
  const project = getResearchProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-4">
          <Link href="/research" className="text-blue-600 hover:underline">
            ← Back to Research Projects
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-1">
              <div className="relative h-64 overflow-hidden rounded-lg">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="prose max-w-none">
                <p className="text-lg mb-4">{project.description}</p>
                <p>{project.fullDescription}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-3">Research Team</h2>
              <ul className="list-disc list-inside space-y-1">
                {project.team.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Related Publications</h2>
              {project.publications.length > 0 ? (
                <ul className="space-y-3">
                  {project.publications.map((pub, index) => (
                    <li key={index} className="border-l-4 border-blue-500 pl-3">
                      <p className="font-medium">{pub.title}</p>
                      <p className="text-sm text-gray-600">{pub.conference}</p>
                      {pub.link && (
                        <a href={pub.link} className="text-blue-600 hover:underline text-sm">
                          View Paper
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No publications yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}