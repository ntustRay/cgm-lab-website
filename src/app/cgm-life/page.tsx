// src/app/cgm-life/page.tsx
import Banner from '@/components/shared/Banner';
import Image from 'next/image';
import cgmLifeData from '@/data/cgm-life.json';

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
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#BD3C3F] mb-4">CGM Lab Life</h1>
          
          {sortedYears.map(year => (
            <div key={year} className="mb-8">
              <h2 className="text-lg font-semibold mb-3 bg-[#333333] text-white px-3 py-1">{year}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsByYear[year].map(event => {
                  // Format date to show month only
                  const eventDate = new Date(event.date);
                  const formattedDate = eventDate.toLocaleString('en-US', { month: 'short' });
                  
                  return (
                  <div key={event.id} className="overflow-hidden bg-white border border-gray-200 shadow-sm mb-3">
                    <div className="relative h-40">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm text-black card-title">{event.title}</h3>
                      <p className="text-[#BD3C3F] text-xs my-1">{formattedDate}. {year}</p>
                      <p className="text-xs text-[#606060]">{event.description}</p>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}