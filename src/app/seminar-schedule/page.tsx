// src/app/seminar-schedule/page.tsx
import Banner from '@/components/shared/Banner';
import seminarsData from '@/data/seminars.json';
import { formatDate } from '@/lib/utils';

type Seminar = {
  id: string;
  date: string;
  topic: string;
  speaker: string;
  title: string;
};

export default function SeminarSchedulePage() {
  const seminars = seminarsData as Seminar[];
  
  // Sort seminars by date (latest first)
  const sortedSeminars = [...seminars].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <div className="bg-yellow-50 p-8 mb-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-2">Seminar Schedule 2025</h1>
          <p className="text-lg">MA-314 15:30/17:30 EVERY THURSDAY</p>
          <p className="text-lg">NTUST COMPUTER GRAPHICS MULTIMEDIA LABORATORY</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Topic</th>
                <th className="border p-2 text-left">Speaker</th>
                <th className="border p-2 text-left">Title</th>
              </tr>
            </thead>
            <tbody>
              {sortedSeminars.map(seminar => (
                <tr key={seminar.id}>
                  <td className="border p-2">{formatDate(seminar.date)}</td>
                  <td className="border p-2">{seminar.topic}</td>
                  <td className="border p-2">{seminar.speaker}</td>
                  <td className="border p-2">{seminar.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}