// src/app/page.tsx - Updated
import Banner from '@/components/shared/Banner';
import LabHighlight from '@/components/ui/LabHighlight';
import NewsItem from '@/components/ui/NewsItem';
import {News} from '@/types/index';
import newsData from '@/data/news.json';
import Link from 'next/link';

export default function Home() {
  const news: News[] = newsData;
  const latestNews = news.slice(0, 3); // Only show the latest 3 news items

  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Computer Graphics and Multimedia Laboratory</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Welcome to the CGM Lab at National Taiwan University of Science and Technology.
            Our research focuses on rendering, visualization, synthesis, and modeling in computer graphics.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Lab Highlights</h2>
          <div className="space-y-6">
            <LabHighlight
              title="Research Projects"
              description="Explore our cutting-edge research in computer graphics, visualization, and multimedia systems."
              imageUrl="/images/research/placeholder.jpg"
              linkText="View Research"
              linkUrl="/research"
            />
            <LabHighlight
              title="Meet Our Team"
              description="Learn about our director, researchers, and students working on innovative projects."
              imageUrl="/images/people/placeholder.jpg"
              linkText="Meet the Team"
              linkUrl="/director"
            />
            <LabHighlight
              title="Lab Activities"
              description="Check out photos and updates from our lab events, seminars, and social activities."
              imageUrl="/images/cgm-life/placeholder.jpg"
              linkText="Lab Life"
              linkUrl="/cgm-life"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          <div className="space-y-6">
            {latestNews.map((item) => (
              <NewsItem key={item.id} news={item} />
            ))}
            {news.length > 3 && (
              <div className="text-center mt-4">
                <Link href="/news" className="text-blue-600 hover:underline">
                  View All News
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}