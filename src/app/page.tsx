// src/app/page.tsx - Updated
import Banner from '@/components/shared/Banner';
import NewsItem from '@/components/ui/NewsItem';
import AwardItem from '@/components/ui/AwardItem';
import newsData from '@/data/news.json';
import awardsData from '@/data/awards.json';
import cgmLifeData from '@/data/cgm-life.json';
import Image from 'next/image';

export default function Home() {
  const news = newsData.slice(0, 5); // Show top 5 news items
  const awards = awardsData.slice(0, 5); // Show top 5 awards
  const cgmLifeEvents = cgmLifeData.slice(0, 5); // Show top 5 CGM Life events

  // Find pinned news if any
  const pinnedNews = newsData.find(item => item.isPinned);
  const regularNews = pinnedNews ? news.filter(item => item.id !== pinnedNews.id) : news;

  return (
    <>
      <Banner />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-200">Computer Graphics and Multimedia Laboratory</h1>
          <p className="text-base max-w-4xl mx-auto text-center text-[#606060]">
            Welcome to the CGM Lab at National Taiwan University of Science and Technology.
            Our research focuses on rendering, visualization, synthesis, and modeling in computer graphics.
          </p>
        </div>

        <h2 className="text-xl font-bold mb-4">Lab Highlights</h2>

        <div className="flex flex-col md:flex-row md:space-x-4 mb-8">
          <div className="md:w-1/3 border-r border-gray-200 pr-4">
            <div className="newsTitleStyle mb-4">
              <img src="/images/award.png" width={126} height={25} alt="Awards" />
            </div>
            {awards.map(award => (
              <AwardItem key={award.id} award={award} />
            ))}
          </div>
          
          <div className="md:w-1/3 border-r border-gray-200 px-4">
            <div className="newsTitleStyle mb-4">
              <img src="/images/lifes.png" width={147} height={25} alt="CGM Life" />
            </div>
            {cgmLifeEvents.map(event => (
              <div key={event.id} className="cgm-news mb-3">
                {event.title}
                <br />
                <span className="text-[#BD3C3F]">{new Date(event.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
          
          <div className="md:w-1/3 pl-4">
            <div className="newsTitleStyle mb-4">
              <img src="/images/news.png" width={126} height={25} alt="News" />
            </div>
            {pinnedNews && (
              <div className="cgm-news mb-3">
                {pinnedNews.title}
                <br />
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