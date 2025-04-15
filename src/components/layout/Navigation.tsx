"use client"
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {name: "News", path: "/"},
    {name: "Director", path: "/director"},
    {name: "Students", path: "/students"},
    {name: "CGM Life", path: "/cgm-life"},
    {name: "Seminar Schedule", path: "/seminar-schedule"},
    {name: "Publications", path: "/publications"},
    {name: "Research", path: "/research"}
  ];

  return (
    <>
      {/* Full screen mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#000000e6] z-50 flex flex-col items-center justify-center md:hidden">
          {/* Close button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white p-2"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="flex flex-col items-center space-y-5">
            {navItems.map((item) => (
              <li key={item.path} className="py-2">
                <Link
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  className={cn(
                    "block nav-link hover:text-[#bd3c3f] text-white !text-xl font-medium",
                    pathname === item.path ? "text-[#bd3c3f] font-bold" : ""
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <nav className="bg-black text-white h-[30px] flex items-center">
        <div className="container mx-auto px-0">
          {/* Mobile menu button */}
          <div className="md:hidden flex justify-between items-center py-2 px-4">
            <span className="font-medium text-sm">Menu</span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              {/* Hamburger Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex w-full justify-around items-center h-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "nav-link hover:text-[#bd3c3f] text-white text-xs flex items-center justify-center text-center",
                  pathname === item.path ? "text-[#bd3c3f]" : "",
                  item.name === "Seminar Schedule" ? "px-5" : "px-2"
                )}
                style={{height: "20px", minWidth: item.name === "Seminar Schedule" ? "120px" : "80px"}}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;