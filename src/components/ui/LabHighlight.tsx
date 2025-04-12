// src/components/ui/LabHighlight.tsx
import Image from 'next/image';
import Link from 'next/link';

interface LabHighlightProps {
  title: string;
  description: string;
  imageUrl: string;
  linkText: string;
  linkUrl: string;
}

const LabHighlight = ({ title, description, imageUrl, linkText, linkUrl }: LabHighlightProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden shadow-md mb-6">
      <div className="md:w-1/3 relative h-48 md:h-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 md:w-2/3">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <Link href={linkUrl} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default LabHighlight;