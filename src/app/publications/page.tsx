// src/app/publications/page.tsx


import Banner from '@/components/shared/Banner';
import publicationsData from '@/data/publications.json';

type Publication = {
  id: string;
  title: string;
  authors: string[];
  conference: string;
  year: number;
  link?: string;
};

export default function PublicationsPage() {
  const publications = publicationsData as Publication[];

  // Group publications by year
  const publicationsByYear = publications.reduce((acc, pub) => {
    const year = pub.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(pub);
    return acc;
  }, {} as Record<number, Publication[]>);

  // Sort years in descending order
  const sortedYears = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Publications</h1>

        {sortedYears.map(year => (
          <div key={year} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{year}</h2>
            <div className="space-y-4">
              {publicationsByYear[year].map(pub => (
                <div key={pub.id} className="border-b pb-4">
                  <h3 className="font-medium">{pub.title}</h3>
                  <p className="text-sm text-gray-700">{pub.authors.join(', ')}</p>
                  <p className="text-sm italic">{pub.conference}</p>
                  {pub.link && (
                    <a
                      href={pub.link}
                      className="text-blue-600 hover:underline text-sm"
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