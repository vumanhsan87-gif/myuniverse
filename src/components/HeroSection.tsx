'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ideas } from '@/data/life';

// 详情弹窗组件
function DetailModal({
  title,
  content,
  onClose,
}: {
  title: string;
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

export default function HeroSection() {
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 自动轮播奇思妙想（悬停时暂停）
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIdeaIndex((prev) => (prev + 1) % ideas.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIdeaIndex((prev) => (prev - 1 + ideas.length) % ideas.length);
  };

  const handleNext = () => {
    setCurrentIdeaIndex((prev) => (prev + 1) % ideas.length);
  };

  const handleCardClick = () => {
    setIsPaused(true);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setIsPaused(false);
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center pt-3">
      {/* 背景图片 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl px-6 mt-8"
      >
        <div className="relative w-full" style={{ height: '60vh' }}>
          <img
            src="/images/hero/home-hero.png"
            alt="刘宇微 - 致广大而尽精微"
            className="w-full h-full object-contain object-center"
          />
        </div>
      </motion.div>

      {/* 可点击的导航区域 - 覆盖在图片上 */}
      <div className="relative w-full max-w-4xl -mt-32 z-10">
        <Link href="/academic/">
          <motion.div
            className="absolute bottom-[55%] left-[22%] w-[22%] h-[18%] cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        <Link href="/life/">
          <motion.div
            className="absolute bottom-[55%] right-[22%] w-[22%] h-[18%] cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
        </Link>
      </div>

      {/* 随机奇思妙想 - 带左右箭头 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-4xl px-6 mt-24"
      >
        {/* 标题和提示 - 左对齐，增加上方间距 */}
        <div className="flex items-center gap-3 mb-6 ml-12">
          <span className="text-ice-blue text-sm">随机奇思妙想</span>
          <span className="text-text-muted text-xs">自由轮播，点击查看详情</span>
        </div>

        {/* 卡片区域 - 带左右箭头 */}
        <div className="flex items-center gap-4">
          {/* 左箭头 - 冰蓝色 */}
          <button
            onClick={handlePrev}
            className="text-ice-blue hover:text-ice-blue-secondary transition-colors flex-shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 卡片 - 弱化边框，悬浮时高亮 */}
          <div
            className="flex-1 glass-card p-6 min-h-[60px] flex items-center justify-center cursor-pointer border border-[rgba(168,199,250,0.08)] hover:border-ice-blue/40 hover:glow-ice-blue transition-all duration-300"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onClick={handleCardClick}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIdeaIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-text-primary text-lg leading-relaxed text-center"
              >
                {ideas[currentIdeaIndex]?.content}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 右箭头 - 冰蓝色 */}
          <button
            onClick={handleNext}
            className="text-ice-blue hover:text-ice-blue-secondary transition-colors flex-shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* 向下滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-auto py-12"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-sm">向下滑动</span>
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {showDetail && (
          <DetailModal
            title="奇思妙想"
            content={ideas[currentIdeaIndex]?.detail || ideas[currentIdeaIndex]?.content || ''}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
