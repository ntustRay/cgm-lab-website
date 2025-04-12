// src/components/layout/Navigation.tsx
"use client"
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';

const Navigation = () => {
  const pathname = usePathname();

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
      <ul className="flex flex-wrap justify-center">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className={cn(
                "block px-4 py-2 hover:bg-gray-700 transition",
                pathname === item.path ? "font-bold" : ""
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;