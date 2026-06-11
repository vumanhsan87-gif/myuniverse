'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { academicItems, tags, type AcademicItem, type Link, getImagePath } from '@/data/academic';

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

// PDF 图标
function PdfIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
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
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 封面图 — 干净完整，无渐变 */}
        {item.images && item.images[0] && (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
            <Image
              src={getImagePath(item.images[0])}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* 头部 */}
        <div className="flex items-start justify-between p-8 pb-0">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {item.title}
            </h2>
            <span className="text-sm text-text-muted">{item.date}</span>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0 ml-4"
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

        <div className="px-8 pt-4 pb-2">
          {/* 描述 */}
          <p className="text-text-secondary leading-relaxed mb-4 whitespace-pre-wrap">
            {item.description}
          </p>

          {/* 详细描述 */}
          {item.detail && (
            <p className="text-text-primary leading-relaxed mb-4 whitespace-pre-wrap">
              {item.detail}
            </p>
          )}

          {/* 标签 */}
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
        </div>

        {/* PDF 在线预览 */}
        {item.pdf && (
          <div className="border-t border-white/5">
            <div className="px-8 py-4 flex items-center justify-between">
              <h3 className="text-sm text-text-muted flex items-center gap-2">
                <PdfIcon />
                PDF 预览
              </h3>
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-academic-primary text-sm hover:underline flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                新窗口打开
              </a>
            </div>
            <div className="px-4 pb-4">
              <iframe
                src={item.pdf}
                className="w-full rounded-xl border border-white/5"
                style={{ height: '65vh', minHeight: '500px' }}
                title={`${item.title} - PDF 预览`}
              />
            </div>
          </div>
        )}

        {/* 其他图片展示（跳过已用作封面的第一张） */}
        {item.images && item.images.length > 1 && (
          <div className="px-8 pb-4">
            <div className="border-t border-white/5 pt-6">
              <h3 className="text-sm text-text-muted mb-3">相关图片</h3>
              <div className="grid grid-cols-2 gap-3">
                {item.images.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={getImagePath(img)}
                      alt={`图片 ${i + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 链接展示 */}
        {item.links && item.links.length > 0 && (
          <div className="px-8 pb-8">
            <div className="border-t border-white/5 pt-6">
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
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function AcademicPage() {
  const [selectedItem, setSelectedItem] = useState<AcademicItem | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            保研与大学
          </h1>
          <p className="text-text-secondary">
            <span className="text-academic-primary">✧</span> 价值增长星系
          </p>
        </motion.div>

        {/* 内容卡片 */}
        <div className="space-y-4">
          {academicItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card hover:glow-orange transition-all duration-300 group overflow-hidden"
            >
              {/* 封面图 — 干净完整，无渐变无模糊 */}
              {item.images && item.images[0] && (
                <div
                  onClick={() => setSelectedItem(item)}
                  className="relative w-full aspect-[16/9] overflow-hidden cursor-pointer"
                >
                  <Image
                    src={getImagePath(item.images[0])}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div
                onClick={() => setSelectedItem(item)}
                className="p-6 cursor-pointer"
              >
                {/* 日期 + PDF 标记 */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-text-muted">{item.date}</span>
                  <div className="flex items-center gap-2">
                    {item.pdf && (
                      <span className="flex items-center gap-1 px-2 py-0.5 text-xs rounded border border-red-400/40 text-red-300/80">
                        <PdfIcon />
                        PDF
                      </span>
                    )}
                    <span className="text-academic-primary opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      →
                    </span>
                  </div>
                </div>

                {/* 标题 */}
                <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-academic-primary transition-colors">
                  {item.title}
                </h3>

                {/* 描述 */}
                <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* 标签 */}
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
              </div>

              {/* PDF 直接下载/打开按钮 */}
              {item.pdf && (
                <div className="border-t border-white/5 px-6 py-3 flex items-center gap-3">
                  <a
                    href={item.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-academic-primary text-sm hover:underline transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    打开 PDF
                  </a>
                  <a
                    href={item.pdf}
                    download
                    className="flex items-center gap-2 text-text-muted text-sm hover:text-text-primary transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    下载
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 空状态 */}
        {academicItems.length === 0 && (
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
