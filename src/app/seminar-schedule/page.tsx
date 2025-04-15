// src/app/seminar-schedule/page.tsx
import Banner from "@/components/shared/Banner";
import schedule2025Data from "@/data/schedule/schedule2025.json";
import Link from "next/link";

type ScheduleItem = {
  Date: string;
  Topic: string;
  Speaker: string;
  Title: string;
};

type ScheduleInfo = {
  year: string;
  day: string;
  classroom: string;
  time: string;
};

export default function SeminarSchedulePage() {
  // First item contains schedule info
  const scheduleInfo = schedule2025Data[0] as ScheduleInfo;

  // Rest of items are the actual schedule entries
  const scheduleItems = schedule2025Data.slice(1) as ScheduleItem[];

  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8 relative">
          <h1 className="text-6xl font-bold mb-2">{scheduleInfo.year} Seminar Schedule</h1>
          <p className="text-xl mb-1">
            {scheduleInfo.classroom} {scheduleInfo.time} EVERY {scheduleInfo.day.toUpperCase()}
          </p>
          <p className="text-sm mb-4">NTUST COMPUTER GRAPHICS MULTIMEDIA LABORATORY</p>

          <div className="absolute right-0 top-0 text-sm">
            <Link href="/seminar-schedule" className="hover:underline">The Next</Link>
            {" | "}
            <Link href="/seminar-schedule/archive" className="hover:underline">The Past</Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2 text-left bg-gray-700 text-white">Date</th>
                <th className="border border-gray-400 p-2 text-left bg-gray-700 text-white">Topic</th>
                <th className="border border-gray-400 p-2 text-left bg-gray-700 text-white">Speaker</th>
                <th className="border border-gray-400 p-2 text-left bg-gray-700 text-white">Title</th>
              </tr>
            </thead>
            <tbody>
              {scheduleItems.map((item, index) => {
                // Determine if this is a Paper or Abstract row to apply alternating styles
                const rowType = item.Topic;
                const isEvenRow = index % 2 === 0;
                const bgColor =
                  rowType === "Paper" ? "bg-amber-50" :
                    rowType === "Abstract" ? "bg-gray-50" : "bg-white";

                return (
                  <tr key={index} className={bgColor}>
                    {isEvenRow && (
                      <td rowSpan={2} className="border border-gray-300 p-2 text-center align-middle">
                        {item.Date}
                      </td>
                    )}
                    <td className="border border-gray-300 p-2">{item.Topic}</td>
                    <td className="border border-gray-300 p-2">{item.Speaker}</td>
                    <td className="border border-gray-300 p-2">{item.Title}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}