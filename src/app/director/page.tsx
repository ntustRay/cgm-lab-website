// src/app/director/page.tsx
import Banner from "@/components/shared/Banner";
import {Director} from "@/types/index";
import Image from "next/image";
import directorData from "../../../public//data/director.json";

export default function DirectorPage() {
  const director: Director = directorData;

  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/5">
            <div className="rounded overflow-hidden bg-gray-100 p-4">
              <div className="mt-4 text-center">
                <h1 className="text-xl font-bold">
                  {director.name} ({director.chineseName})
                </h1>
                <p className="text-lg text-gray-700">
                  {director.title}
                </p>
                {director.imageUrl && <Image
                  src={director.imageUrl}
                  alt={director.name}
                  width={500}
                  height={600}
                  className="w-full"
                />}
                <p className="text-md text-gray-600">
                  {director.department}
                </p>
                <p className="text-md text-gray-600">
                  {director.university}
                </p>
              </div>

            </div>
          </div>
          <div className="md:w-3/5">
            <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Introduction</h2>
            <p className="text-base mb-6">
              {directorData.introduction}
            </p>

            <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Research Interests</h2>
            <ul className="list-disc list-inside mb-6 pl-4">
              {director.researchInterests?.map((interest, index) => (
                <li key={index} className="text-base mb-1">{interest}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Contact Information</h2>
            {director.contact && (
              <div className="space-y-2">
                <p className="text-base"><strong>Email:</strong> {director.contact.email}</p>
                {director.contact.phone && <p className="text-base"><strong>Tel:</strong> {director.contact.phone}</p>}
                {director.contact.fax && <p className="text-base"><strong>Fax:</strong> {director.contact.fax}</p>}
                {director.contact.address && <p className="text-base"><strong>Address:</strong> {director.contact.address}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}