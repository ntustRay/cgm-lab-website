"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
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
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation links */}
        <table width="100%" border={0} cellPadding={0} cellSpacing={0} className={cn(
          "hidden md:table",
          isMenuOpen ? "block" : ""
        )}>
          <tbody>
            <tr className="text-center">
              {navItems.map((item) => (
                <td key={item.path} height="20px" width={item.name === "Seminar Schedule" ? "120px" : "80px"}>
                  <Link
                    href={item.path}
                    className={cn(
                      "nav-link hover:text-[#bd3c3f] text-white text-xs",
                      pathname === item.path ? "text-[#bd3c3f]" : ""
                    )}
                  >
                    {item.name}
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* Mobile navigation links */}
        <ul className={cn(
          "md:hidden",
          isMenuOpen ? "block py-2 px-4" : "hidden"
        )}>
          {navItems.map((item) => (
            <li key={item.path} className="py-1 text-center">
              <Link
                href={item.path}
                className={cn(
                  "block nav-link hover:text-[#bd3c3f] text-xs",
                  pathname === item.path ? "text-[#bd3c3f] font-medium" : ""
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;