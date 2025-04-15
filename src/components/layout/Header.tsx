// src/components/layout/Header.tsx
import Image from "next/image";
import Link from "next/link";
import CGMLogo from "../../../public/images/placeholder.png";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header>
      <div className="bg-white">
        <div className="pl-5 pt-5 pb-2">
          <Link href="/" className="block">
            <div className="flex flex-row items-end text-[50px] font-bold text-black ">
              <div className="pl-2 pr-2 leading-none tracking-tighter">
                CGM
              </div>
              <div className="flex flex-col text-sm text-[#606060] leading-none self-end mb-1">
                <p>電腦圖學與多媒體實驗室</p>
                <p>Computer Graphics and Multimedia Laboratory</p>
                <p>National Taiwan University of Science and Technology</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Navigation />
      <Image src={CGMLogo} alt="CGMLogo" width={1000} height={200} className="w-full" />
    </header>
  );
};

export default Header;