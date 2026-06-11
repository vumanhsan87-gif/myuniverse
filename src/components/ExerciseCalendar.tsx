'use client';

import { useMemo } from 'react';
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

const weekdayLabels = ['日', '一', '二', '三', '四', '五', '六'];

// 根据日志数据自动推断需要显示的月份
function inferMonths(logs: ExerciseLog[]): string[] {
  if (logs.length === 0) {
    // 无数据时显示上个月和本月
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonth = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`;
    return [prevMonth, thisMonth];
  }

  // 从日志中提取所有不重复月份，按时间排序取最近两个
  const months = [...new Set(logs.map(l => l.date.substring(0, 7)))].sort();
  if (months.length <= 2) return months;
  return months.slice(-2);
}

interface ExerciseCalendarProps {
  logs: ExerciseLog[];
  onLogClick: (log: ExerciseLog) => void;
}

export default function ExerciseCalendar({ logs, onLogClick }: ExerciseCalendarProps) {
  const displayMonths = useMemo(() => inferMonths(logs), [logs]);

  // 按日期索引日志
  const logMap = useMemo(() => {
    const map: Record<string, ExerciseLog> = {};
    logs.forEach(log => {
      map[log.date] = log;
    });
    return map;
  }, [logs]);

  return (
    <div className="w-full space-y-3">
      {/* 标题 */}
      <span className="text-life-primary text-sm">运动打卡日历</span>

      {displayMonths.map((currentMonth) => {
        const [year, month] = currentMonth.split('-').map(Number);

        // 生成该月日历数据
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);
        const startWeekday = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        const calendarDays: (number | null)[] = [];
        for (let i = 0; i < startWeekday; i++) calendarDays.push(null);
        for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

        return (
          <div key={currentMonth} className="glass-card p-2">
            {/* 月份标签 */}
            <div className="text-text-primary font-medium text-xs text-center mb-1">
              {year}.{month}
            </div>

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
                  return <div key={`${currentMonth}-empty-${index}`} className="aspect-square" />;
                }

                const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const log = logMap[dateStr];
                const isToday = dateStr === '2026-06-11';
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
                      ${log?.content ? 'border border-life-primary/30' : ''}
                      ${isToday ? 'ring-1 ring-life-primary' : ''}
                      ${log ? 'hover:bg-life-primary/20' : ''}
                    `}
                    style={colors.bg ? { backgroundColor: colors.bg } : undefined}
                    onClick={() => {
                      if (log && log.content) onLogClick(log);
                    }}
                  >
                    {/* 发光星星 */}
                    {log && colors.star && <StarIcon color={colors.star} />}

                    <span className={`text-xs font-medium ${
                      log ? (log.hasDetail ? 'text-life-primary' : 'text-text-primary') : 'text-text-muted'
                    }`}>
                      {day}
                    </span>
                    {log && log.title && (
                      <span className={`text-xs truncate max-w-full ${
                        log.content
                          ? 'text-life-primary animate-pulse'
                          : 'text-text-secondary'
                      }`}>
                        {log.title}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
