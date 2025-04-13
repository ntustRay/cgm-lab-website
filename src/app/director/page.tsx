// src/app/director/page.tsx
import Banner from "@/components/shared/Banner";
import Image from "next/image";
import { Person } from "@/types/index";
import directorData from "@/data/director.json";

export default function DirectorPage() {
  const director: Person = directorData;
  
  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="rounded overflow-hidden">
              {director.imageUrl && (
                <Image 
                  src={director.imageUrl} 
                  alt={director.name} 
                  width={400} 
                  height={500} 
                  className="w-full"
                />
              )}
            </div>
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">
              {director.name} ({director.chineseName})
            </h1>
            <p className="text-lg mb-4">
              I am a professor in the {director.department} at {director.university}.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-2">Research Interests</h2>
            <ul className="list-disc list-inside mb-6">
              {director.researchInterests?.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-2">Contact Information</h2>
            {director.contact && (
              <div className="space-y-1">
                <p><strong>Email:</strong> {director.contact.email}</p>
                {director.contact.phone && <p><strong>Tel:</strong> {director.contact.phone}</p>}
                {director.contact.fax && <p><strong>Fax:</strong> {director.contact.fax}</p>}
                {director.contact.address && <p><strong>Address:</strong> {director.contact.address}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}