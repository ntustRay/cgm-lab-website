// src/components/ui/NewsItem.tsx
import {formatDate} from "@/lib/utils";
import {News} from "@/types/index";

interface NewsItemProps {
  news: News;
}

const NewsItem = ({news}: NewsItemProps) => {
  return (
    <div className="cgm-news mb-3">
      <div>
        {news.content}
        <br />
        <span className="text-[#BD3C3F]">{formatDate(news.date)}</span>
      </div>
    </div>
  );
};

export default NewsItem;