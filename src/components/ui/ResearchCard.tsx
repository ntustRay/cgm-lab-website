// src/components/ui/ResearchCard.tsx
import Image from "next/image";
import Link from "next/link";

interface ResearchCardProps {
  research: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  };
}

const ResearchCard = ({research}: ResearchCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={research.imageUrl}
          alt={research.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{research.title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-3">{research.description}</p>
        <Link
          href={`/research/${research.id}`}
          className="text-blue-600 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default ResearchCard;