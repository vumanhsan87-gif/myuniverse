'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { academicItems, tags, type AcademicItem, type Link } from '@/data/academic';

// 获取链接图标
function LinkIcon({ type }: { type?: string }) {
  if (type === 'feishu') {
    return (
      <span className="text-academic-primary text-xl mt-0.5" title="飞书文档">
        📄
      </span>
    );
  }
  if (type === 'bilibili') {
    return (
      <span className="text-academic-primary text-xl mt-0.5" title="B站视频">
        ▶
      </span>
    );
  }
  return (
    <span className="text-academic-primary text-xl mt-0.5" title="链接">
      🔗
    </span>
  );
}

// 详情弹窗组件
function DetailModal({
  item,
  onClose,
}: {
  item: AcademicItem;
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
        initial={{ opacity: 0, scale: 0.95, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, x: 50 }}
        className="glass-card p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {item.title}
            </h2>
            <span className="text-sm text-text-muted">{item.date}</span>
          </div>
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

        {/* 简短描述 */}
        <p className="text-text-secondary leading-relaxed mb-4">
          {item.description}
        </p>

        {/* 详细描述 */}
        {item.detail && (
          <p className="text-text-primary leading-relaxed mb-6 whitespace-pre-wrap">
            {item.detail}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map((tag) => {
            const tagInfo = tags.find((t) => t.id === tag);
            return tagInfo && tagInfo.id !== 'all' ? (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full border border-academic-primary/30 text-academic-secondary"
              >
                {tagInfo.label}
              </span>
            ) : null;
          })}
        </div>

        {/* 图片展示 */}
        {item.images && item.images.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm text-text-muted mb-3">相关图片</h3>
            <div className="grid grid-cols-2 gap-3">
              {item.images.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={img}
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
        {item.links && item.links.length > 0 && (
          <div>
            <h3 className="text-sm text-text-muted mb-3">相关链接</h3>
            <div className="space-y-3">
              {item.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 glass-card hover:border-academic-primary/50 transition-colors group"
                >
                  <LinkIcon type={link.type} />
                  <div>
                    <p className="text-text-primary group-hover:text-academic-primary transition-colors">
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

export default function AcademicPage() {
  const [activeTag, setActiveTag] = useState('all');
  const [selectedItem, setSelectedItem] = useState<AcademicItem | null>(null);

  const filteredContent: AcademicItem[] =
    activeTag === 'all'
      ? academicItems
      : academicItems.filter((item) => item.tags.includes(activeTag));

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            保研与大学
          </h1>
          <p className="text-text-secondary">
            <span className="text-academic-primary">✧</span> 价值增长星系
          </p>
        </motion.div>

        {/* Tag 筛选 - 顶部导航形式 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(tag.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeTag === tag.id
                  ? 'bg-academic-primary text-white glow-orange'
                  : 'glass-card text-text-secondary hover:text-text-primary hover:border-academic-primary/50'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </motion.div>

        {/* 内容卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="glass-card p-6 hover:glow-orange transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs text-text-muted">{item.date}</span>
                <span className="text-academic-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-academic-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag) => {
                  const tagInfo = tags.find((t) => t.id === tag);
                  return tagInfo && tagInfo.id !== 'all' ? (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded border border-academic-primary/30 text-academic-secondary"
                    >
                      {tagInfo.label}
                    </span>
                  ) : null;
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredContent.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-muted">暂无相关内容</p>
          </div>
        )}
      </div>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
