'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { lifeSections, books, exerciseLogs, ideas, type Link, type Book, getImagePath } from '@/data/life';
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

// 通用详情弹窗（运动等）
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {content && (
          <p className="text-text-secondary leading-relaxed whitespace-pre-wrap mb-6">{content}</p>
        )}
        {images && images.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm text-text-muted mb-3">相关图片</h3>
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image src={getImagePath(img)} alt={`图片 ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
        {links && links.length > 0 && (
          <div>
            <h3 className="text-sm text-text-muted mb-3">相关链接</h3>
            <div className="space-y-3">
              {links.map((link, i) => (
                <a
                  key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 glass-card hover:border-life-primary/50 transition-colors group"
                >
                  <LinkIcon type={link.type} />
                  <div>
                    <p className="text-text-primary group-hover:text-life-primary transition-colors">{link.title}</p>
                    {link.description && <p className="text-text-muted text-sm mt-1">{link.description}</p>}
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

// 书籍详情弹窗 — 故事 + 金句
function BookDetailModal({ book, onClose }: { book: Book; onClose: () => void }) {
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
        className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-text-muted hover:text-text-primary transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 封面 + 书名区域 */}
        <div className="relative">
          {book.cover ? (
            <div className="relative w-full h-48 sm:h-56 overflow-hidden">
              <img
                src={getImagePath(book.cover)}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              {/* 底部渐变过渡 */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(11,15,25,0.95)] to-transparent" />
            </div>
          ) : (
            <div className="w-full h-32 bg-universe-blue/50" />
          )}

          {/* 书名 + 作者 — 叠在封面底部 */}
          <div className={`px-8 pb-6 ${book.cover ? '-mt-16 relative z-10' : 'p-8'}`}>
            <h2 className="text-2xl font-bold text-text-primary mb-1">{book.title}</h2>
            <p className="text-life-primary text-sm">{book.author}</p>
          </div>
        </div>

        <div className="px-8 pb-8 space-y-8">
          {/* 我与书的故事 */}
          {book.story && (
            <div>
              <h3 className="flex items-center gap-3 text-text-primary font-bold mb-4">
                <span className="w-8 h-px bg-life-primary/50" />
                我与书的故事
                <span className="flex-1 h-px bg-white/5" />
              </h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-wrap text-sm">
                {book.story}
              </p>
            </div>
          )}

          {/* 书籍金句 */}
          {book.quotes && book.quotes.length > 0 && (
            <div>
              <h3 className="flex items-center gap-3 text-text-primary font-bold mb-4">
                <span className="w-8 h-px bg-life-primary/50" />
                书籍金句
                <span className="flex-1 h-px bg-white/5" />
              </h3>
              <div className="space-y-4">
                {book.quotes.map((quote, i) => (
                  <div key={i} className="relative pl-6 py-1 group">
                    {/* 左侧竖线 */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-life-primary/30 group-hover:bg-life-primary/60 transition-colors rounded-full" />
                    {/* 引号装饰 */}
                    <span className="absolute -left-1 -top-1 text-life-primary/20 text-2xl font-serif leading-none select-none">
                      &ldquo;
                    </span>
                    <p className="text-text-secondary italic leading-relaxed text-sm">
                      {quote}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 备注（兼容旧数据） */}
          {(book.notes || book.detail) && !book.story && (
            <p className="text-text-secondary leading-relaxed whitespace-pre-wrap text-sm">
              {book.detail || book.notes}
            </p>
          )}

          {/* 相关链接 */}
          {book.links && book.links.length > 0 && (
            <div>
              <h3 className="flex items-center gap-3 text-text-primary font-bold mb-4">
                <span className="w-8 h-px bg-life-primary/50" />
                相关链接
                <span className="flex-1 h-px bg-white/5" />
              </h3>
              <div className="space-y-2">
                {book.links.map((link, i) => (
                  <a
                    key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 glass-card hover:border-life-primary/50 transition-colors group text-sm"
                  >
                    <LinkIcon type={link.type} />
                    <span className="text-text-primary group-hover:text-life-primary transition-colors">
                      {link.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-text-primary mb-4">保命与生活</h1>
          <p className="text-text-secondary">
            <span className="text-life-primary">✧</span> 生态维生星系
          </p>
        </motion.div>

        {/* 运动 - 左日历右链接布局 */}
        {(activeSection === 'all' || activeSection === 'health') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mb-8"
          >
            <div className="flex gap-6 items-stretch">
              <div className="w-[300px] flex-shrink-0">
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
              </div>
              <div className="flex-1">
                <div className="glass-card p-4 h-full overflow-y-auto">
                  <h3 className="text-sm text-text-muted mb-3">运动链接</h3>
                  <div className="space-y-3">
                    {exercises
                      .sort((a, b) => (b.checkCount || 0) - (a.checkCount || 0))
                      .map((exercise) => (
                        <div key={exercise.id} className="glass-card p-3 hover:border-life-primary/50 transition-colors">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-life-primary font-bold text-sm w-8">
                              {exercise.checkCount || 0}次
                            </span>
                            <p className="text-text-primary text-sm font-medium">{exercise.name}</p>
                          </div>
                          {exercise.detail && (
                            <p className="text-text-secondary text-xs leading-relaxed ml-11">{exercise.detail}</p>
                          )}
                          {exercise.links && exercise.links.length > 0 && (
                            <div className="ml-11 mt-2">
                              {exercise.links.map((link, i) => (
                                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                                  className="text-life-primary text-xs hover:underline block">
                                  {link.title}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 分区筛选 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
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
          {lifeSections.filter(s => s.id !== 'health').map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-life-primary text-white glow-green'
                  : 'glass-card text-text-secondary hover:text-text-primary hover:border-life-primary/50'
              }`}
            >
              {section.title}
            </button>
          ))}
        </motion.div>

        {/* 内容卡片 - 瀑布流布局 */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {/* 书籍 */}
          {(activeSection === 'all' || activeSection === 'books') &&
            books.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedBook(item)}
                className="mb-4 break-inside-avoid"
              >
                {/* 书籍卡片 — 统一封面 + 底部书名 */}
                <div className="relative rounded-2xl overflow-hidden cursor-pointer group glass-card">
                  {item.cover ? (
                    <>
                      {/* 封面图片 — object-cover 处理不同尺寸 */}
                      <div className="relative w-full aspect-[3/4]">
                        <img
                          src={getImagePath(item.cover)}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* 底部渐变 — 书名区域 */}
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      </div>
                    </>
                  ) : (
                    /* 无封面时的占位 */
                    <div className="relative w-full aspect-[3/4] bg-universe-blue/40 flex items-center justify-center">
                      <span className="text-text-muted text-5xl font-serif opacity-30">
                        {item.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* 书名 + 作者 — 叠在底部 */}
                  <div className={`${item.cover ? 'absolute bottom-0 inset-x-0' : ''} p-4`}>
                    <h3 className="text-text-primary font-bold text-sm group-hover:text-life-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-text-muted text-xs mt-0.5">{item.author}</p>
                  </div>

                  {/* 悬停边框 */}
                  <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-life-primary/40 transition-colors duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}

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
                className="glass-card p-6 hover:glow-green transition-all duration-300 cursor-pointer group mb-4 break-inside-avoid"
              >
                <p className="text-text-primary leading-relaxed group-hover:text-life-primary transition-colors">
                  {item.content}
                </p>
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

      {/* 通用详情弹窗 */}
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

      {/* 书籍详情弹窗 */}
      <AnimatePresence>
        {selectedBook && (
          <BookDetailModal
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
