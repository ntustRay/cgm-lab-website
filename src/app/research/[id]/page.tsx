// src/app/research/[id]/page.tsx
import Banner from '@/components/shared/Banner';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';

// This would normally come from a real API or database
const getResearchProject = (id: string) => {
  // Sample project data - in a real app, this would come from an API or database
  const projects = [
    {
      id: "research-1",
      title: "Private Projection and Beautification of Camera Images",
      description: "This research focuses on techniques for enhancing and protecting privacy in camera images through projection and beautification algorithms.",
      fullDescription: "Our research explores advanced algorithms for image processing that can protect privacy while maintaining image quality. We propose a novel approach that combines machine learning techniques with traditional computer graphics methods to achieve effective privacy protection without compromising visual appeal. This work has applications in social media, teleconferencing, and security systems.",
      imageUrl: "/images/research/placeholder.jpg",
      team: ["Prof. Chuan-kai Yang", "Student A", "Student B"],
      publications: [
        {
          title: "Privacy-Preserving Image Enhancement",
          conference: "ACM SIGGRAPH 2023",
          link: "#"
        }
      ]
    },
    {
      id: "research-2",
      title: "Realistic Video Generation for American Sign Language",
      description: "Developing methods to generate realistic videos for American Sign Language to aid in communication and education.",
      fullDescription: "This project aims to create realistic video content for American Sign Language (ASL) to bridge communication gaps and support education. Using deep learning and computer vision techniques, we generate high-quality animations that accurately represent ASL gestures and expressions. The system can translate text or speech input into corresponding ASL videos in real-time.",
      imageUrl: "/images/research/placeholder.jpg",
      team: ["Prof. Chuan-kai Yang", "Student C", "Student D"],
      publications: [
        {
          title: "Neural Networks for Sign Language Video Synthesis",
          conference: "IEEE VR 2023",
          link: "#"
        }
      ]
    },
    {
      id: "research-3",
      title: "Neural Map Processing Visualization through a Graphic Algorithm",
      description: "Investigating visualization techniques for neural map processing using advanced graphic algorithms.",
      fullDescription: "This research explores novel ways to visualize complex neural network processes through innovative graphic algorithms. We develop interactive visualization tools that help researchers and practitioners understand the internal workings of neural networks. Our approach combines information visualization principles with real-time graphics rendering to create intuitive and informative visual representations of neural activations and connections.",
      imageUrl: "/images/research/placeholder.jpg",
      team: ["Prof. Chuan-kai Yang", "Student E"],
      publications: [
        {
          title: "Interactive Visualization of Neural Network Activations",
          conference: "IEEE Visualization 2023",
          link: "#"
        }
      ]
    }
  ];

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