// src/app/page.tsx - Updated
import Banner from "@/components/shared/Banner";
import NewsItem from "@/components/ui/NewsItem";
import AwardItem from "@/components/ui/AwardItem";
import newsData from "@/data/news.json";
import awardsData from "@/data/awards.json";
import cgmLifeData from "@/data/cgm-life.json";
import {Award, CGMLifeEvent, News} from "@/types/index";

export default function Home() {
  const news = newsData.slice(0, 5) as News[]; // Show top 5 news items
  const awards = awardsData.slice(0, 5) as Award[]; // Show top 5 awards
  const cgmLifeEvents = cgmLifeData.slice(0, 5) as CGMLifeEvent[]; // Show top 5 CGM Life events

  // Find pinned news if any
  const pinnedNews = newsData.find(item => item.isPinned) as News | undefined;
  const regularNews = pinnedNews ? news.filter(item => item.id !== pinnedNews.id) : news;

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
          </div>
        </div>
      </div>
    </>
  );
}