'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const BASE_PATH = '/myuniverse';

const navPoints = [
  { id: 'home', href: '/', label: '主页' },
  { id: 'academic', href: '/academic', label: '保研与大学' },
  { id: 'life', href: '/life', label: '保命与生活' },
];

export default function FloatingNav() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block"
    >
      <div className="flex flex-col gap-4">
        {navPoints.map((point) => {
          const isActive = pathname === point.href;
          return (
            <Link key={point.id} href={`${BASE_PATH}${point.href}`}>
              <motion.div
                className="relative flex items-center justify-end"
                whileHover={{ x: -5 }}
              >
                <span
                  className={`text-xs mr-3 transition-opacity duration-300 ${
                    isActive ? 'text-text-primary opacity-100' : 'text-text-muted opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {point.label}
                </span>
                  <motion.div
                    className={`w-3 h-3 rounded-full border-2 ${
                      isActive
                        ? point.href === '/life'
                          ? 'bg-life-primary border-life-primary scale-125'
                          : point.href === '/academic'
                            ? 'bg-academic-primary border-academic-primary scale-125'
                            : 'bg-ice-blue border-ice-blue scale-125'
                        : point.href === '/life'
                          ? 'border-text-muted hover:border-life-primary'
                          : point.href === '/academic'
                            ? 'border-text-muted hover:border-academic-primary'
                            : 'border-text-muted hover:border-ice-blue'
                    }`}
                    animate={
                      isActive
                        ? {
                            boxShadow: point.href === '/life'
                              ? [
                                  '0 0 10px rgba(5, 150, 105, 0.5)',
                                  '0 0 20px rgba(5, 150, 105, 0.8)',
                                  '0 0 10px rgba(5, 150, 105, 0.5)',
                                ]
                              : point.href === '/academic'
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
              </motion.div>
            </Link>
          );
        })}

        {/* 连接线 - 冰蓝色→橙色→绿色渐变 */}
        <div className="absolute top-1.5 left-1/2 w-px h-full -translate-x-1/2 -z-10">
          <div className="w-full h-full bg-gradient-to-b from-ice-blue via-academic-primary to-life-primary opacity-50" />
        </div>
      </div>
    </motion.div>
  );
}
