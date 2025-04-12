// src/components/layout/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './Navigation';
import CGMLogo from '../shared/CGMLogo';

const Header = () => {
  return (
    <header>
      <div className="bg-white">
        <div className="mb-1 p-2">
          <Link href="/" className="block">
            <div className="text-4xl font-bold text-[#dddddd]">
              CGM
              <div className="text-sm text-[#606060]">
                <p>電腦圖學與多媒體實驗室</p>
                <p>Computer Graphics and Multimedia Laboratory</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Navigation />
      <div className="bg-[#000000] w-full relative">
        <div className="relative h-[120px] flex items-center">
          <div className="absolute left-4 text-white">
            <div className="text-[22px] font-light leading-6">Rendering</div>
            <div className="text-[28px] font-medium leading-8 ml-8">Visualization</div>
            <div className="text-[20px] font-light leading-6 ml-16">Synthesis</div>
            <div className="text-[24px] font-medium leading-7 ml-16">Modeling</div>
          </div>
          <div className="absolute right-4">
            <CGMLogo size={80} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;