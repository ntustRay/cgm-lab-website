// src/app/research/page.tsx
"use client";
import Banner from "@/components/shared/Banner";
import Image from "next/image"; // Import the Next.js Image component
import Link from "next/link"; // Import the Next.js Link component
import researchData from "../../../public//data/research.json";

interface ResearchProject {
  image_src: string;
  link: string;
  title: string;
  authors: string[];
  year: string;
}

export default function ResearchPage() {
  // Cast the imported JSON data to the defined interface
  const projects: ResearchProject[] = researchData as ResearchProject[];

  const getProjectUrl = (link: string) => {
    if (link.startsWith("http")) {
      return link;
    }
    // Ensure no double slashes if link already starts with /
    const path = link.startsWith("/") ? link.substring(1) : link;
    return `https://cgm.cs.ntust.edu.tw/Activity/lab/${path}`;
  };

  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Research Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link href={getProjectUrl(project.link)} key={index} className="block group" target="_blank" rel="noopener noreferrer">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.03] hover:border-[#1b1b1b] transition-all duration-200 h-full flex flex-col">
                <div className="relative w-full h-48">
                  <Image
                    src={getProjectUrl(project.image_src)}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    {project.authors.join(", ")}
                  </p>
                  <p className="text-sm text-gray-500 mt-auto">{project.year}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}