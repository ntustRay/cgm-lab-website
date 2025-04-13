import {formatDate} from "@/lib/utils";
import {Award} from "@/types/index";

interface AwardItemProps {
  award: Award;
}

const AwardItem = ({award}: AwardItemProps) => {
  return (
    <div className="cgm-news mb-3">
      <div>
        {award.content.map((line, index) => (
          <div key={index}>
            {line}
          </div>
        ))}
        <span className="text-[#BD3C3F]">{formatDate(award.date)}</span>
      </div>
    </div>
  );
};

export default AwardItem; 