// src/components/ui/NewsItem.tsx
import {formatDate} from '@/lib/utils';
import {News} from '@/types/index';
import Image from 'next/image';

interface NewsItemProps {
  news: News;
}

const NewsItem = ({news}: NewsItemProps) => {
  return (
    <div className="border-b pb-4">
      <div className="flex flex-col md:flex-row">
        {news.imageUrl && (
          <div className="md:w-1/4 mb-4 md:mb-0 md:mr-4">
            <div className="relative h-32 w-full overflow-hidden">
              <Image
                src={news.imageUrl}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        <div className={news.imageUrl ? "md:w-3/4" : "w-full"}>
          <h2 className="text-xl font-semibold mb-1">{news.title}</h2>
          <p className="text-gray-500 text-sm mb-2">{formatDate(news.date)}</p>
          <p className="text-gray-700">{news.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;