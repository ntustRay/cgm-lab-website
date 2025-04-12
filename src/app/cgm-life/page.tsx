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
  
  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">CGM Lab Life</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {events.map(event => (
            <div key={event.id} className="overflow-hidden shadow-md bg-white rounded-lg">
              <div className="relative h-48">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-xs text-gray-500">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}