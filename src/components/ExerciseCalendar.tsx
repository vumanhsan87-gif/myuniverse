'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { type ExerciseLog, type ExerciseStatus } from '@/data/life';

const statusColors: Record<ExerciseStatus, { bg: string; star: string }> = {
  rest:    { bg: '', star: '' },
  light:   { bg: 'rgba(134, 239, 172, 0.15)', star: '#86efac' },
  intense: { bg: 'rgba(253, 230, 138, 0.2)', star: '#fde68a' },
  sick:    { bg: 'rgba(192, 192, 192, 0.12)', star: '#c0c0c0' },
};

function StarIcon({ color }: { color: string }) {
  if (!color) return null;
  return (
    <svg
      className="absolute -top-1 -right-1 w-3 h-3"
      viewBox="0 0 20 20"
      style={{ filter: `drop-shadow(0 0 3px ${color})` }}
    >
      <path
        d="M10 0l2.5 7.5H20l-6 4.5 2.5 7.5L10 15l-6.5 4.5 2.5-7.5L0 7.5h7.5z"
        fill={color}
      />
    </svg>
  );
}

interface ExerciseCalendarProps {
  logs: ExerciseLog[];
  onLogClick: (log: ExerciseLog) => void;
}

export default function ExerciseCalendar({ logs, onLogClick }: ExerciseCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState('2026-05');

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
    if (log && log.hasDetail) {
      onLogClick(log);
    }
  };

  const weekdayLabels = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="w-full">
      {/* 标题和月份导航 */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-life-primary text-sm">运动打卡日历</span>
        <div className="flex items-center gap-1">
          <button
            onClick={goToPrevMonth}
            className="p-1 glass-card hover:border-life-primary/50 transition-colors"
          >
            <svg className="w-3 h-3 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-text-primary font-medium text-xs min-w-[60px] text-center">
            {year}.{month}
          </span>
          <button
            onClick={goToNextMonth}
            className="p-1 glass-card hover:border-life-primary/50 transition-colors"
          >
            <svg className="w-3 h-3 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 日历网格 */}
      <div className="glass-card p-2">
        {/* 星期标题 */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekdayLabels.map((label, i) => (
            <div
              key={label}
              className={`text-center text-xs py-1 ${
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
            const colors = statusColors[log?.status || 'rest'];

            return (
              <motion.div
                key={dateStr}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`
                  aspect-square rounded flex flex-col items-center justify-center relative
                  transition-all duration-200
                  ${log ? 'cursor-pointer' : ''}
                  ${log?.hasDetail ? 'border border-life-primary/30' : ''}
                  ${isToday ? 'ring-1 ring-life-primary' : ''}
                  ${log ? 'hover:bg-life-primary/20' : ''}
                `}
                style={colors.bg ? { backgroundColor: colors.bg } : undefined}
                onClick={() => log && handleDayClick(day)}
              >
                {/* 发光星星 */}
                {log && colors.star && <StarIcon color={colors.star} />}

                <span className={`text-xs font-medium ${
                  log ? (log.hasDetail ? 'text-life-primary' : 'text-text-primary') : 'text-text-muted'
                }`}>
                  {day}
                </span>
                {log && (
                  <span className={`text-xs truncate max-w-full ${
                    log.hasDetail
                      ? 'text-life-primary animate-pulse'
                      : 'text-text-secondary'
                  }`}>
                    {log.content.length > 4 ? log.content.slice(0, 3) + '…' : log.content}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
