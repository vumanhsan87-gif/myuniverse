'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { lifeSections, books, exerciseLogs, ideas, type Link, getImagePath } from '@/data/life';
import ExerciseCalendar from '@/components/ExerciseCalendar';
import { exercises, type ExerciseLog } from '@/data/life';

// 获取链接图标
function LinkIcon({ type }: { type?: string }) {
  if (type === 'feishu') {
    return (
      <span className="text-life-primary text-xl mt-0.5" title="飞书文档">
        📄
      </span>
    );
  }
  if (type === 'bilibili') {
    return (
      <span className="text-life-primary text-xl mt-0.5" title="B站视频">
        ▶
      </span>
    );
  }
  return (
    <span className="text-life-primary text-xl mt-0.5" title="链接">
      🔗
    </span>
  );
}

// 详情弹窗组件 - 支持图片和链接
function DetailModal({
  title,
  content,
  images,
  links,
  onClose,
}: {
  title: string;
  content?: string;
  images?: string[];
  links?: Link[];
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
        initial={{ opacity: 0, scale: 0.95, x: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, x: -50 }}
        className="glass-card p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
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

        {/* 详细内容 */}
        {content && (
          <p className="text-text-secondary leading-relaxed whitespace-pre-wrap mb-6">
            {content}
          </p>
        )}

        {/* 图片展示 */}
        {images && images.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm text-text-muted mb-3">相关图片</h3>
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={getImagePath(img)}
                    alt={`图片 ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 链接展示 */}
        {links && links.length > 0 && (
          <div>
            <h3 className="text-sm text-text-muted mb-3">相关链接</h3>
            <div className="space-y-3">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 glass-card hover:border-life-primary/50 transition-colors group"
                >
                  <LinkIcon type={link.type} />
                  <div>
                    <p className="text-text-primary group-hover:text-life-primary transition-colors">
                      {link.title}
                    </p>
                    {link.description && (
                      <p className="text-text-muted text-sm mt-1">
                        {link.description}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function LifePage() {
  const [activeSection, setActiveSection] = useState('all');
  const [selectedItem, setSelectedItem] = useState<{
    title: string;
    content?: string;
    images?: string[];
    links?: Link[];
  } | null>(null);
  const [selectedLog, setSelectedLog] = useState<ExerciseLog | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            保命与生活
          </h1>
          <p className="text-text-secondary">
            <span className="text-life-primary">✧</span> 生态维生星系
          </p>
        </motion.div>

        {/* 分区筛选 - 顶部导航形式 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveSection('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
              activeSection === 'all'
                ? 'bg-life-primary text-white glow-green'
                : 'glass-card text-text-secondary hover:text-text-primary hover:border-life-primary/50'
            }`}
          >
            全部
          </button>
          {lifeSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2 ${
                activeSection === section.id
                  ? 'bg-life-primary text-white glow-green'
                  : 'glass-card text-text-secondary hover:text-text-primary hover:border-life-primary/50'
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </button>
          ))}
        </motion.div>

        {/* 内容卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 书籍 */}
          {(activeSection === 'all' || activeSection === 'books') &&
            books.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedItem({
                  title: item.title,
                  content: item.detail || item.notes,
                  images: item.images,
                  links: item.links,
                })}
                className="glass-card p-6 hover:glow-green transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📚</span>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary group-hover:text-life-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-text-muted text-sm">{item.author}</p>
                  </div>
                </div>
                {item.notes && (
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {item.notes}
                  </p>
                )}
              </motion.div>
            ))}

          {/* 运动 - 使用日历展示 */}
          {(activeSection === 'all' || activeSection === 'health') && (
            <ExerciseCalendar
              logs={exerciseLogs}
              onLogClick={(log) => {
                const exercise = exercises.find(e => e.id === log.exerciseId);
                if (exercise) {
                  setSelectedLog(log);
                  setSelectedItem({
                    title: exercise.name,
                    content: exercise.detail,
                    images: exercise.images,
                    links: exercise.links,
                  });
                }
              }}
            />
          )}

          {/* 奇思妙想 */}
          {(activeSection === 'all' || activeSection === 'ideas') &&
            ideas.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedItem({
                  title: item.content.length > 20 ? item.content.slice(0, 20) + '...' : item.content,
                  content: item.detail || item.content,
                })}
                className="glass-card p-6 hover:glow-green transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <p className="text-text-primary leading-relaxed group-hover:text-life-primary transition-colors">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
        </div>

        {/* 空状态 */}
        {books.length === 0 && ideas.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted">暂无相关内容</p>
          </div>
        )}
      </div>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal
            title={selectedItem.title}
            content={selectedItem.content}
            images={selectedItem.images}
            links={selectedItem.links}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
