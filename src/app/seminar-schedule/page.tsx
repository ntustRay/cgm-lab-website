"use client";
import Banner from "@/components/shared/Banner";
import {schedules} from "@/data/schedule";
import {endOfWeek, isWithinInterval, startOfWeek} from "date-fns";
import {useState} from "react";

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

const years = Object.keys(schedules).sort(); // e.g. ["2020", "2021", "2022", "2023", "2024", "2025"]

export default function SeminarSchedulePage() {
  // Start from the latest year
  const [currentYearIndex, setCurrentYearIndex] = useState(years.length - 1);
  const currentYear = years[currentYearIndex];
  const scheduleData = schedules[currentYear];

  // Defensive: skip if no data
  if (!scheduleData || scheduleData.length === 0) {
    return <div>No schedule data for {currentYear}</div>;
  }

  const scheduleInfo = scheduleData[0] as ScheduleInfo;
  const scheduleItems = scheduleData.slice(1) as ScheduleItem[];

  // Get today's date and current week range (Monday–Sunday)
  const today = new Date();
  const weekStart = startOfWeek(today, {weekStartsOn: 1}); // Monday
  const weekEnd = endOfWeek(today, {weekStartsOn: 1}); // Sunday

  // Helper to parse "M/D" as Date in the correct year
  function parseScheduleDate(md: string): Date | null {
    const [month, day] = md?.split("/").map(Number);
    if (!month || !day) return null;
    return new Date(Number(scheduleInfo.year), month - 1, day);
  }

  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8 relative">
          <h1 className="text-6xl font-bold mb-2">{scheduleInfo.year} Seminar Schedule</h1>
          <p className="text-xl mb-1">
            {scheduleInfo.classroom} {scheduleInfo.time} EVERY {scheduleInfo.day?.toUpperCase()}
          </p>
          <p className="text-sm mb-4">NTUST COMPUTER GRAPHICS MULTIMEDIA LABORATORY</p>

          <div className="absolute right-0 bottom-0 text-lg font-medium">
            <button
              className="hover:underline disabled:opacity-50 disabled:no-underline"
              onClick={() => setCurrentYearIndex((i) => Math.min(years.length - 1, i + 1))}
              disabled={currentYearIndex === years.length - 1}
            >
              The Next
            </button>
            <span className="mx-2">|</span>
            <button
              className="hover:underline disabled:opacity-50 disabled:no-underline"
              onClick={() => setCurrentYearIndex((i) => Math.max(0, i - 1))}
              disabled={currentYearIndex === 0}
            >
              The Past
            </button>
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

                // Highlight if this item's date is in the current week
                let highlightClass = "";
                const itemDate = parseScheduleDate(item.Date);
                if (
                  itemDate &&
                  isWithinInterval(itemDate, {start: weekStart, end: weekEnd})
                ) {
                  highlightClass = "bg-yellow-200";
                }

                return (
                  <tr key={index} className={`${bgColor} ${highlightClass}`}>
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