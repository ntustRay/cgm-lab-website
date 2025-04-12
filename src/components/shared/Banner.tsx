// src/components/shared/Banner.tsx - Updated
import CGMLogo from './CGMLogo';

const Banner = () => {
  return (
    <div className="relative w-full h-48 bg-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-2/3 pl-8 space-y-2">
          <h2 className="text-4xl font-light">Rendering</h2>
          <h2 className="text-5xl font-medium">Visualization</h2>
          <h2 className="text-3xl font-light ml-12">Synthesis</h2>
          <h2 className="text-4xl font-medium ml-24">Modeling</h2>
        </div>
        <div className="w-1/3 flex justify-center">
          <CGMLogo size={120} />
        </div>
      </div>
    </div>
  );
};

export default Banner;