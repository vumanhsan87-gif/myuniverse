'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navPoints = [
  { id: 'home', href: '/' },
  { id: 'academic', href: '/academic/' },
  { id: 'life', href: '/life/' },
];

export default function FloatingNav() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block"
    >
      <div className="flex flex-col items-center gap-3">
        {navPoints.map((point) => {
          const isActive = pathname === point.href || (point.href !== '/' && pathname.startsWith(point.href));
          return (
            <Link key={point.id} href={point.href}>
              <motion.div
                className={`w-3 h-3 rounded-full border-2 ${
                  isActive
                    ? point.id === 'life'
                      ? 'bg-life-primary border-life-primary scale-125'
                      : point.id === 'academic'
                        ? 'bg-academic-primary border-academic-primary scale-125'
                        : 'bg-ice-blue border-ice-blue scale-125'
                    : point.id === 'life'
                      ? 'border-text-muted hover:border-life-primary'
                      : point.id === 'academic'
                        ? 'border-text-muted hover:border-academic-primary'
                        : 'border-text-muted hover:border-ice-blue'
                }`}
                animate={
                  isActive
                    ? {
                        boxShadow: point.id === 'life'
                          ? [
                              '0 0 10px rgba(5, 150, 105, 0.5)',
                              '0 0 20px rgba(5, 150, 105, 0.8)',
                              '0 0 10px rgba(5, 150, 105, 0.5)',
                            ]
                          : point.id === 'academic'
                            ? [
                                '0 0 10px rgba(249, 115, 22, 0.5)',
                                '0 0 20px rgba(249, 115, 22, 0.8)',
                                '0 0 10px rgba(249, 115, 22, 0.5)',
                              ]
                            : [
                                '0 0 10px rgba(0, 212, 255, 0.5)',
                                '0 0 20px rgba(0, 212, 255, 0.8)',
                                '0 0 10px rgba(0, 212, 255, 0.5)',
                              ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Link>
          );
        })}

        {/* 连接线在浮点下方 - 冰蓝色→橙色→绿色渐变 */}
        <div className="w-px h-12 bg-gradient-to-b from-ice-blue via-academic-primary to-life-primary opacity-50" />
      </div>
    </motion.div>
  );
}
