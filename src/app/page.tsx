"use client";

import {useState} from "react";
import Banner from "@/components/shared/Banner";
import NewsItem from "@/components/ui/NewsItem";
import AwardItem from "@/components/ui/AwardItem";
import newsData from "@/data/news.json";
import awardsData from "@/data/awards.json";
import cgmLifeData from "@/data/cgm-life.json";
import {Award, CGMLifeEvent, News} from "@/types/index";

export default function Home() {
  const [showAllAwards, setShowAllAwards] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);

  // Find pinned news if any
  const pinnedNews = newsData.find(item => item.isPinned) as News | undefined;

  // Display all awards or the first 10 awards
  const awards = showAllAwards ? (awardsData as Award[]) : (awardsData.slice(0, 10) as Award[]);

  // Display all CGM life events or the first 15 events
  const cgmLifeEvents = showAllEvents ? (cgmLifeData as CGMLifeEvent[]) : (cgmLifeData.slice(0, 15) as CGMLifeEvent[]);

  // Display all news or the first 12 news items, excluding the pinned news if any
  const news = newsData as News[];
  const regularNews = pinnedNews
    ? (showAllNews ? news.filter(item => item.id !== pinnedNews.id) : news.slice(0, 12).filter(item => item.id !== pinnedNews.id))
    : (showAllNews ? news : news.slice(0, 12));

  return (
    <>
      <Banner />
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row md:space-x-4 mb-8">
          <div className="md:w-1/3 border-r border-gray-200 pr-4 text-left">
            <div className="text-2xl text-black">
              專題獎項:
            </div>
            {awards.map(award => (
              <AwardItem award={award} key={award.id} />
            ))}
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowAllAwards(!showAllAwards)}
                className="text-blue-600 hover:text-blue-800"
              >
                {showAllAwards ? "顯示較少獎項 ↑" : "查看更多獎項 ↓"}
              </button>
            </div>
          </div>

          <div className="md:w-1/3 border-r border-gray-200 px-4">
            <div className="text-2xl text-black">
              實驗室活動:
            </div>
            {cgmLifeEvents.map(event => (
              <div key={event.id} className="cgm-news mb-3">
                CGM Life 新增「{event.title}」
                <br />
                <span className="text-[#BD3C3F]">{new Date(event.date).toLocaleDateString()}</span>
              </div>
            ))}
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowAllEvents(!showAllEvents)}
                className="text-blue-600 hover:text-blue-800"
              >
                {showAllEvents ? "顯示較少活動 ↑" : "查看更多活動 ↓"}
              </button>
            </div>
          </div>

          <div className="md:w-1/3 pl-4">
            <div className="text-2xl text-black">
              網站新聞:
            </div>
            {pinnedNews && (
              <div className="cgm-news mb-3">
                {pinnedNews.content}
                <br />
                <span className="text-[#BD3C3F]">{new Date(pinnedNews.date).toLocaleDateString()} (At Top)</span>
              </div>
            )}
            {regularNews.map(item => (
              <NewsItem key={item.id} news={item} />
            ))}
            <div className="mt-4 text-right">
              <button
                onClick={() => setShowAllNews(!showAllNews)}
                className="text-blue-600 hover:text-blue-800"
              >
                {showAllNews ? "顯示較少新聞 ↑" : "查看更多新聞 ↓"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}