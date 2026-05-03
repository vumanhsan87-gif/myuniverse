'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const sections = [
  {
    href: '/academic',
    title: '保研与大学',
    subtitle: '价值增长星系',
    description: '大学经历与成就',
    color: 'academic',
    tags: ['技术类', '经管', '实习'],
  },
  {
    href: '/life',
    title: '保命与生活',
    subtitle: '生态维生星系',
    description: '健康、幽默与日常',
    color: 'life',
    tags: ['书籍', '运动', '脑洞'],
  },
];

export default function DirectoryNav() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl text-text-secondary mb-16 tracking-widest"
      >
        数字宇宙导览
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl w-full">
        {sections.map((section, index) => (
          <motion.div
            key={section.href}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <Link href={section.href}>
              <div
                className={`relative p-8 cursor-pointer transition-all duration-300 hover:scale-105 glass-card ${
                  section.color === 'academic'
                    ? 'hover:glow-orange'
                    : 'hover:glow-green'
                }`}
              >
                {/* 标题区域 - 不再有大星星 */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-text-primary">
                    {section.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">{section.subtitle}</p>
                </div>

                {/* 描述 */}
                <p className="text-text-secondary mb-6">{section.description}</p>

                {/* 标签 - 使用对应主题色的圆点 */}
                <div className="flex flex-wrap gap-3">
                  {section.tags.map((tag) => {
                    const dotColor = section.color === 'academic' ? '#f97316' : '#059669';
                    const dotShadow = section.color === 'academic'
                      ? '0 0 8px rgba(249, 115, 22, 0.4)'
                      : '0 0 8px rgba(5, 150, 105, 0.4)';

                    return (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 text-xs text-text-secondary"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: dotColor,
                            boxShadow: dotShadow,
                          }}
                        />
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* 镂空星星装饰 */}
                {section.color === 'academic' && (
                  <div className="absolute -top-2 -right-2">
                    <span className="text-academic-primary/70 text-xl">☆</span>
                  </div>
                )}
                {section.color === 'life' && (
                  <div className="absolute -top-2 -right-2">
                    <span className="text-life-primary/70 text-xl">☆</span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
