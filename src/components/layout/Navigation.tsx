"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    {name: 'News', path: '/'},
    {name: 'Director', path: '/director'},
    {name: 'Students', path: '/students'},
    {name: 'CGM Life', path: '/cgm-life'},
    {name: 'Seminar Schedule', path: '/seminar-schedule'},
    {name: 'Publications', path: '/publications'},
    {name: 'Research', path: '/research'}
  ];
  
  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Mobile menu button */}
        <div className="md:hidden flex justify-between items-center py-3">
          <span className="font-medium">Menu</span>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Navigation links */}
        <ul className={cn(
          "md:flex md:flex-row md:items-center md:space-x-6 md:py-4",
          isMenuOpen ? "block py-4" : "hidden"
        )}>
          {navItems.map((item) => (
            <li key={item.path} className="py-2 md:py-0">
              <Link 
                href={item.path}
                className={cn(
                  "block transition-colors hover:text-blue-400",
                  pathname === item.path ? "text-blue-500 font-medium" : ""
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