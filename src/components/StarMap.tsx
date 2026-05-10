'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { academicItems, starMapCategories, type AcademicItem } from '@/data/academic';

interface StarMapProps {
  onNodeClick: (item: AcademicItem) => void;
}

interface NodeData {
  item: AcademicItem;
  x: number;
  y: number;
  category: string;
  parentIndex?: number;
}

export default function StarMap({ onNodeClick }: StarMapProps) {
  const [hoveredNode, setHoveredNode] = useState<{ item: AcademicItem; x: number; y: number } | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Parse position and build tree layout
  const { nodes, connections } = useMemo(() => {
    const itemsWithPosition = academicItems.filter(item => item.position);
    const categories = ['视觉', '学术', '理工', '实习研究'];

    // Group by category
    const categoryGroups: Record<string, AcademicItem[]> = {};
    categories.forEach(cat => { categoryGroups[cat] = []; });

    itemsWithPosition.forEach(item => {
      if (item.position) {
        const category = item.position.replace(/[0-9.].*$/, '');
        if (categoryGroups[category]) {
          categoryGroups[category].push(item);
        }
      }
    });

    // Sort within each category by position
    Object.keys(categoryGroups).forEach(cat => {
      categoryGroups[cat].sort((a, b) => {
        const posA = a.position || '';
        const posB = b.position || '';
        return posA.localeCompare(posB);
      });
    });

    // Calculate positions
    const nodes: NodeData[] = [];
    const connections: { from: number; to: number; category: string }[] = [];
    const svgWidth = 800;
    const svgHeight = 320;
    const categoryCount = categories.filter(c => categoryGroups[c].length > 0).length;

    if (categoryCount === 0) return { nodes: [], connections: [] };

    const startX = 60;
    const endX = svgWidth - 60;
    const categoryWidth = (endX - startX) / Math.max(categoryCount, 1);
    const verticalStart = 60;
    const verticalEnd = svgHeight - 60;
    const rowHeight = 70;

    let currentCategoryIndex = 0;
    categories.forEach((category) => {
      const items = categoryGroups[category];
      if (items.length === 0) return;

      const categoryX = startX + (currentCategoryIndex + 0.5) * categoryWidth;

      items.forEach((item, idx) => {
        const position = item.position || '';
        const orderPart = position.replace(/^[^\d]*/, '');

        // Root nodes: position ends with just a number like "1"
        // Child nodes: position like "2.1" means child of root node 2
        if (/^\d+$/.test(orderPart)) {
          // Root node
          const rootIndex = nodes.length;
          nodes.push({
            item,
            x: categoryX,
            y: verticalStart + idx * rowHeight,
            category,
            parentIndex: undefined,
          });
        } else {
          // Child node: find parent
          const parentOrder = orderPart.split('.')[0];
          const parentPosition = category + parentOrder;
          const parentItem = items.find(i => i.position === parentPosition);
          const parentNodeIndex = nodes.findIndex(n => n.item.id === parentItem?.id);

          if (parentNodeIndex >= 0) {
            const parentNode = nodes[parentNodeIndex];
            // Position child to the right and slightly above/below parent
            const childIndex = parseInt(orderPart.split('.')[1] || '1') - 1;
            const offsetY = (childIndex - 0.5) * 50;
            nodes.push({
              item,
              x: categoryX,
              y: Math.max(verticalStart + 20, Math.min(verticalEnd - 20, parentNode.y + offsetY)),
              category,
              parentIndex: parentNodeIndex,
            });
            connections.push({
              from: parentNodeIndex,
              to: nodes.length - 1,
              category,
            });
          } else {
            // Fallback: treat as root
            nodes.push({
              item,
              x: categoryX,
              y: verticalStart + idx * rowHeight,
              category,
              parentIndex: undefined,
            });
          }
        }
      });

      currentCategoryIndex++;
    });

    return { nodes, connections };
  }, []);

  const handleMouseEnter = (node: NodeData, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setHoveredNode({
      item: node.item,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleNodeClick = (item: AcademicItem) => {
    onNodeClick(item);
    setTooltipVisible(false);
  };

  if (nodes.length === 0) {
    return null;
  }

  const categoryColors = starMapCategories;

  return (
    <div className="w-full mb-8">
      {/* 标题 */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-academic-primary text-sm">成长星轨图</span>
        <span className="text-text-muted text-xs">点击节点查看详情</span>
      </div>

      {/* SVG 星轨图 */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox="0 0 800 320"
          className="w-full min-w-[600px] h-auto"
          style={{ maxHeight: '320px' }}
        >
          {/* 发光滤镜 */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 连接线 */}
          {connections.map((conn, idx) => {
            const fromNode = nodes[conn.from];
            const toNode = nodes[conn.to];
            const catColor = categoryColors[conn.category]?.glow || 'rgba(255,255,255,0.2)';

            return (
              <motion.line
                key={`line-${idx}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={catColor}
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              />
            );
          })}

          {/* 节点 */}
          {nodes.map((node, idx) => {
            const catColor = categoryColors[node.category]?.color || '#ffffff';
            const catGlow = categoryColors[node.category]?.glow || 'rgba(255,255,255,0.3)';
            const textWidth = Math.min(node.item.title.length * 14, 140);
            const ellipseRx = textWidth / 2 + 15;
            const ellipseRy = 22;

            return (
              <motion.g
                key={node.item.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => handleMouseEnter(node, e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleNodeClick(node.item)}
              >
                {/* 椭圆背景 */}
                <motion.ellipse
                  cx={node.x}
                  cy={node.y}
                  rx={ellipseRx}
                  ry={ellipseRy}
                  fill="rgba(11, 15, 25, 0.8)"
                  stroke={catColor}
                  strokeWidth="2"
                  filter="url(#glow)"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />

                {/* 文字 */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={catColor}
                  fontSize="12"
                  fontWeight="500"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {node.item.title.length > 12
                    ? node.item.title.slice(0, 11) + '…'
                    : node.item.title}
                </text>

                {/* 年份标签 */}
                <text
                  x={node.x + ellipseRx - 8}
                  y={node.y + ellipseRy - 4}
                  textAnchor="end"
                  fill="var(--color-text-muted)"
                  fontSize="9"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {node.item.date}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {tooltipVisible && hoveredNode && hoveredNode.item.meaning && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute z-50 px-4 py-2 glass-card text-sm text-text-primary max-w-xs pointer-events-none"
              style={{
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
              }}
            >
              {hoveredNode.item.meaning}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 图例 */}
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {Object.entries(categoryColors).map(([category, { color }]) => (
          <div key={category} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
            />
            <span className="text-xs text-text-muted">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
