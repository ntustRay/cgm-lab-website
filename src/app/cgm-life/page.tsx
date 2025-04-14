// src/app/cgm-life/page.tsx
import PhotoGallery from "@/components/PhotoGallery/PhotoGallery";
import Banner from "@/components/shared/Banner";
import cgmLifeData from "@/data/cgm-life.json";
import photosData from "@/data/photos.json";

type CGMLifeEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
};

export default function CGMLifePage() {
  const events = cgmLifeData as CGMLifeEvent[];

  // Group events by year
  const eventsByYear = events.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {} as Record<number, CGMLifeEvent[]>);

  // Sort years in descending order
  const sortedYears = Object.keys(eventsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <Banner />
      <div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-xl font-bold text-[#BD3C3F] mb-4">CGM Lab Life</h1>
          {/* Photo Gallery Section */}
          <section>
            <PhotoGallery albums={photosData} />
          </section>
        </div>
      </div>
    </>
  );
}