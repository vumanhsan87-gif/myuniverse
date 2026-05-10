'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { exercises, type Link, type ExerciseLog } from '@/data/life';

interface ExerciseCalendarProps {
  logs: ExerciseLog[];
  onLogClick: (log: ExerciseLog) => void;
}

// 链接图标组件
function LinkIcon({ type }: { type?: string }) {
  if (type === 'feishu') {
    return <span className="text-life-primary text-lg">📄</span>;
  }
  if (type === 'bilibili') {
    return <span className="text-life-primary text-lg">▶</span>;
  }
  return <span className="text-life-primary text-lg">🔗</span>;
}

// 详情弹窗
function DetailModal({
  log,
  onClose,
}: {
  log: ExerciseLog;
  onClose: () => void;
}) {
  const exercise = exercises.find(e => e.id === log.exerciseId);
  if (!exercise) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-1">{exercise.name}</h2>
            <p className="text-text-muted text-sm">{log.date}</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {exercise.detail && (
          <p className="text-text-secondary leading-relaxed whitespace-pre-wrap mb-6">
            {exercise.detail}
          </p>
        )}

        {exercise.links && exercise.links.length > 0 && (
          <div>
            <h3 className="text-sm text-text-muted mb-3">相关链接</h3>
            <div className="space-y-3">
              {exercise.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 glass-card hover:border-life-primary/50 transition-colors group"
                >
                  <LinkIcon type={link.type} />
                  <div>
                    <p className="text-text-primary group-hover:text-life-primary transition-colors">
                      {link.title}
                    </p>
                    {link.description && (
                      <p className="text-text-muted text-xs mt-0.5">{link.description}</p>
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

export default function ExerciseCalendar({ logs, onLogClick }: ExerciseCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState('2026-05');
  const [selectedLog, setSelectedLog] = useState<ExerciseLog | null>(null);

  // 解析当前月份
  const [year, month] = currentMonth.split('-').map(Number);

  // 生成日历数据
  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const startWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // 构建日期矩阵
    const days: (number | null)[] = [];

    // 填充月初空白
    for (let i = 0; i < startWeekday; i++) {
      days.push(null);
    }

    // 填充日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [year, month]);

  // 按日期索引日志
  const logMap = useMemo(() => {
    const map: Record<string, ExerciseLog> = {};
    logs.forEach(log => {
      map[log.date] = log;
    });
    return map;
  }, [logs]);

  // 月份切换
  const goToPrevMonth = () => {
    if (month === 1) {
      setCurrentMonth(`${year - 1}-12`);
    } else {
      setCurrentMonth(`${year}-${String(month - 1).padStart(2, '0')}`);
    }
  };

  const goToNextMonth = () => {
    if (month === 12) {
      setCurrentMonth(`${year + 1}-01`);
    } else {
      setCurrentMonth(`${year}-${String(month + 1).padStart(2, '0')}`);
    }
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const log = logMap[dateStr];
    if (log) {
      setSelectedLog(log);
      onLogClick(log);
    }
  };

  const weekdayLabels = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="w-full mb-8">
      {/* 标题和月份导航 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-life-primary text-sm">运动打卡日历</span>
          <span className="text-text-muted text-xs">点击有内容的日期查看详情</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevMonth}
            className="p-2 glass-card hover:border-life-primary/50 transition-colors"
          >
            <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-text-primary font-medium min-w-[80px] text-center">
            {year}年{month}月
          </span>
          <button
            onClick={goToNextMonth}
            className="p-2 glass-card hover:border-life-primary/50 transition-colors"
          >
            <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 日历网格 */}
      <div className="glass-card p-4">
        {/* 星期标题 */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdayLabels.map((label, i) => (
            <div
              key={label}
              className={`text-center text-sm py-2 ${
                i === 0 || i === 6 ? 'text-life-primary' : 'text-text-muted'
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* 日期格子 */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const log = logMap[dateStr];
            const isToday = dateStr === '2026-05-10';

            return (
              <motion.div
                key={dateStr}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`
                  aspect-square rounded-lg flex flex-col items-center justify-center p-1
                  transition-all duration-200
                  ${log ? 'cursor-pointer' : ''}
                  ${log?.hasDetail ? 'bg-life-primary/10 border border-life-primary/30' : ''}
                  ${isToday ? 'ring-2 ring-life-primary ring-offset-2 ring-offset-transparent' : ''}
                  ${log ? 'hover:bg-life-primary/20' : ''}
                `}
                onClick={() => log && handleDayClick(day)}
              >
                <span className={`text-sm font-medium ${
                  log ? (log.hasDetail ? 'text-life-primary' : 'text-text-primary') : 'text-text-muted'
                }`}>
                  {day}
                </span>
                {log && (
                  <span className={`text-xs mt-0.5 truncate max-w-full ${
                    log.hasDetail
                      ? 'text-life-primary animate-pulse'
                      : 'text-text-secondary'
                  }`}>
                    {log.content.length > 6 ? log.content.slice(0, 5) + '…' : log.content}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 图例 */}
      <div className="flex items-center gap-4 mt-3 justify-center">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-life-primary/20 border border-life-primary/30"></span>
          <span className="text-xs text-text-muted">有详情可点击</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded ring-2 ring-life-primary"></span>
          <span className="text-xs text-text-muted">今天</span>
        </div>
      </div>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedLog && (
          <DetailModal
            log={selectedLog}
            onClose={() => setSelectedLog(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
