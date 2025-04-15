// src/app/publications/page.tsx
import Banner from "@/components/shared/Banner";
import publicationsData from "@/data/publications.json";

type Publication = {
  id?: string;
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
        <h1 className="text-2xl font-bold mb-4">Publications</h1>

        {categories.map(category => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-3 border-b pb-2">{category} Publications</h2>
            <div className="space-y-3">
              {publicationsData[category]?.map((pub: Publication, arrayIndex: number) => (
                <div key={arrayIndex} className="border-b pb-2">
                  <h3 className="font-medium">
                    <span className="text-gray-600 mr-2">[{pub.index || arrayIndex + 1}]</span>
                    {pub.title !== "_blank" ? pub.title : "(Title not available)"}
                  </h3>
                  {pub.authors && <p className="text-sm text-gray-700 mt-0.5">{pub.authors}</p>}
                  {pub.publication && <p className="text-sm italic text-gray-600 mt-0.5">{pub.publication}</p>}
                  {pub.link && (
                    <a
                      href={pub.link}
                      className="text-blue-600 hover:underline text-sm mt-1 inline-block mb-1"
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