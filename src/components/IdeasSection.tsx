'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ideas } from '@/data/life';

// Fisher-Yates 洗牌
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 详情弹窗组件
function DetailModal({
  content,
  onClose,
}: {
  content: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-card p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">奇思妙想</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function IdeasSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<typeof ideas[number] | null>(null);

  // 随机打乱 + 复制以实现无缝循环滚动
  const displayIdeas = useMemo(() => {
    const shuffled = shuffle(ideas);
    return [...shuffled, ...shuffled];
  }, []);

  return (
    <section className="relative px-6 py-20">
      {/* 标题 */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl text-text-secondary mb-8 tracking-widest text-center"
      >
        随机奇思妙想
      </motion.h2>

      {/* 横向滚动卡片区域 */}
      <div className="max-w-4xl mx-auto">
        <div
          className="overflow-x-auto hide-scrollbar"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex gap-4 w-max py-2 ${isPaused ? '' : 'animate-marquee'}`}
          >
            {displayIdeas.map((idea, index) =>
              idea.image ? (
                // 有图片的卡片 — 类似朋友圈配图
                <div
                  key={`${idea.id}-${index}`}
                  onClick={() => setSelectedIdea(idea)}
                  className="relative min-w-[280px] max-w-[280px] h-[380px] rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
                >
                  {/* 背景图片 - 顶部全透明，底部50%可见 */}
                  <div
                    className="absolute inset-0"
                    style={{
                      maskImage:
                        'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%)',
                      WebkitMaskImage:
                        'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%)',
                    }}
                  >
                    <img
                      src={idea.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 暗色覆盖层 - 顶部略深增强文字可读性 */}
                  <div className="absolute inset-0 bg-gradient-to-b from-universe-bg/60 via-universe-bg/20 to-transparent" />

                  {/* 文字 - 放在上方（图片透明的区域） */}
                  <div className="relative z-10 p-5 pt-8 h-full flex flex-col">
                    <p className="text-text-primary text-sm leading-relaxed line-clamp-6">
                      {idea.content}
                    </p>
                  </div>

                  {/* 悬停边框 */}
                  <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-ice-blue/40 transition-colors duration-300 pointer-events-none" />
                </div>
              ) : (
                // 无图片的卡片 — 纯文字框
                <div
                  key={`${idea.id}-${index}`}
                  onClick={() => setSelectedIdea(idea)}
                  className="glass-card p-5 min-w-[260px] max-w-[260px] cursor-pointer hover:border-ice-blue/40 hover:scale-[1.02] transition-all duration-300 flex-shrink-0"
                  style={{ background: 'rgba(11, 15, 25, 0.5)' }}
                >
                  <p className="text-text-primary text-sm leading-relaxed line-clamp-4">
                    {idea.content}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedIdea && (
          <DetailModal
            content={selectedIdea.detail || selectedIdea.content}
            onClose={() => setSelectedIdea(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
