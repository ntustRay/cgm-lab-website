// src/components/layout/Header.tsx
import Link from 'next/link';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header>
      <div className="bg-white py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center">
            <div className="text-4xl font-bold mr-4">CGM</div>
            <div className="text-sm">
              <p>電腦圖學與多媒體實驗室</p>
              <p>Computer Graphics and Multimedia Laboratory</p>
              <p>National Taiwan University of Science and Technology</p>
            </div>
          </Link>
        </div>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;