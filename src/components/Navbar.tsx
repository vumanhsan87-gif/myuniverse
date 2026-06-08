'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: '主页' },
  { href: '/academic/', label: '保研与大学' },
  { href: '/life/', label: '保命与生活' },
];

export default function Navbar() {
  const pathname = usePathname();

  const getActiveColor = (href: string) => {
    if (href === '/academic/') return 'text-academic-primary';
    if (href === '/life/') return 'text-life-primary';
    return 'text-ice-blue';
  };

  const getIndicatorColor = (href: string) => {
    if (href === '/academic/') return 'bg-academic-primary';
    if (href === '/life/') return 'bg-life-primary';
    return 'bg-ice-blue';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#0a1628]/85 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-base font-medium text-text-primary hover:text-ice-blue transition-colors">
          刘宇微
        </Link>

        <div className="flex gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive ? getActiveColor(item.href) : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 ${getIndicatorColor(item.href)} rounded-full`}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
