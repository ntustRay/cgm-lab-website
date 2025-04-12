import {formatDate} from '@/lib/utils';

interface Award {
  id: string;
  title: string;
  subTitle: string;
  date: string;
  imageUrl: string;
}

interface AwardItemProps {
  award: Award;
}

const AwardItem = ({award}: AwardItemProps) => {
  return (
    <div className="cgm-news mb-3">
      <div>
        {award.title}
        <br />
        {award.subTitle}
        <br />
        <span className="text-[#BD3C3F]">{formatDate(award.date)}</span>
      </div>
    </div>
  );
};

export default AwardItem; 