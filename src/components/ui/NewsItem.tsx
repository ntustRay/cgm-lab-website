// src/components/ui/NewsItem.tsx
import {formatDate} from '@/lib/utils';
import {News} from '@/types/index';
import Image from 'next/image';

interface NewsItemProps {
  news: News;
}

const NewsItem = ({news}: NewsItemProps) => {
  return (
    <div className="cgm-news mb-3">
      <div>
        {news.title}
        <br />
        {news.content && <span>{news.content}</span>}
        <br />
        <span className="text-[#BD3C3F]">{formatDate(news.date)}</span>
      </div>
    </div>
  );
};

export default NewsItem;