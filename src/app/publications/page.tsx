// src/app/publications/page.tsx
import Banner from "@/components/shared/Banner";
import publicationsData from "@/data/publications.json";

type Publication = {
  index?: number;
  title: string;
  authors?: string;
  publication?: string;
  link?: string;
  conference?: string;
  year?: number;
};

type PublicationCategory = "Journal" | "Conference" | "Technical";

export default function PublicationsPage() {
  const categories: PublicationCategory[] = ["Journal", "Conference", "Technical"];

  return (
    <>
      <Banner />
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-5">Publications</h1>

        {categories.map(category => (
          <div key={category} className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 border-b pb-2">{category} Publications</h2>
            <div className="space-y-2">
              {publicationsData[category]?.map((pub: Publication, arrayIndex: number) => (
                <div key={arrayIndex} className="border-b pb-1">
                  <h3 className="text-lg font-semibold !mb-0">
                    <span className="text-gray-600 mr-2">[{publicationsData[category].length - arrayIndex}]</span>
                    {pub.title !== "_blank" ? pub.title : "(Title not available)"}
                  </h3>
                  {pub.authors && <p className="text-sm text-gray-700">{pub.authors}</p>}
                  {pub.publication && <p className="text-sm italic text-gray-600">{pub.publication}</p>}
                  {pub.link && (
                    <a
                      href={pub.link}
                      className="text-blue-600 hover:underline text-sm mt-0.5 inline-block mb-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Paper
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}