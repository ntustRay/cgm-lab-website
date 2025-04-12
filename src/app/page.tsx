// src/app/page.tsx
import Banner from '@/components/shared/Banner';
import NewsItem from '@/components/ui/NewsItem';
import { News } from '@/types/index';
import newsData from '@/data/news.json';

export default function Home() {
  const news: News[] = newsData;
  
  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Latest News</h1>
        <div className="space-y-6">
          {news.map((item) => (
            <NewsItem key={item.id} news={item} />
          ))}
        </div>
      </div>
    </>
  );
}