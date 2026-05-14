/**
 * 保研与大学 - 经历内容
 * 直接在这里添加或修改内容即可
 */

const BASE_PATH = ''; // 使用自定义域名时为空

// ============ 图片和链接的添加方法 ============
//
// 【图片】
// 1. 把图片放到 public/images/academic/ 文件夹下
// 2. 在数据中添加 images 字段，格式：['/images/academic/图片文件名.png']
//    （系统会自动添加 BASE_PATH 前缀）
//
// 【链接（视频/飞书文档等）】
// 1. 添加 links 字段，格式：
//    links: [
//      {
//        title: '链接标题（显示在链接上）',
//        url: '链接地址',
//        type: 'bilibili' | 'feishu' | 'other',  // 类型，用于显示不同图标
//        description: '可选的描述文字'
//      }
//    ]
//
// 【飞书文档链接示例】
// {
//   title: '项目文档',
//   url: 'https://example.feishu.cn/docx/xxxxxx',
//   type: 'feishu',
//   description: '详细项目记录'
// }
//
// 【视频链接示例】
// {
//   title: '项目演示视频',
//   url: 'https://b23.tv/xxxxxx',
//   type: 'bilibili',
//   description: '功能演示'
// }
//
// 【完整示例】
// {
//   id: 'project-demo',
//   title: '数据分析项目',
//   description: '简短的预览描述...',
//   detail: '详细的经历描述...\n换行用 \\n',
//   date: '2024',
//   tags: ['tech', 'ai'],
//   images: ['/images/academic/project-demo-1.png'],
//   links: [
//     {
//       title: '项目演示视频',
//       url: 'https://b23.tv/xxxxxx',
//       type: 'bilibili',
//       description: '功能演示'
//     },
//     {
//       title: '飞书项目文档',
//       url: 'https://example.feishu.cn/docx/xxxxxx',
//       type: 'feishu',
//       description: '详细记录'
//     }
//   ]
// }
// =============================================

export interface AcademicItem {
  id: string;
  title: string;
  description: string;       // 预览卡片中显示的简短描述
  date: string;
  tags: string[];
  detail?: string;           // 详情弹窗中显示的详细内容（支持 \n 换行）
  images?: string[];        // 详情弹窗中显示的图片路径
  links?: Link[];           // 详情弹窗中显示的链接（视频、飞书文档等）
  position?: string;         // 星轨图位置，格式 "类别+顺序"，如 "视觉1"、"理工2.1"
  meaning?: string;          // 星轨图 hover 时显示的提示文字
}

// 星轨图类别颜色配置
export const starMapCategories: Record<string, { color: string; glow: string }> = {
  '视觉': { color: '#f0abfc', glow: 'rgba(240, 171, 252, 0.4)' },      // 粉紫色
  '学术': { color: '#67e8f9', glow: 'rgba(103, 232, 249, 0.4)' },       // 青色
  '理工': { color: '#fde68a', glow: 'rgba(253, 230, 138, 0.4)' },       // 暖金色
  '实习研究': { color: '#86efac', glow: 'rgba(134, 239, 172, 0.4)' },  // 浅绿色
};

export interface Link {
  title: string;
  url: string;
  type?: 'bilibili' | 'feishu' | 'other';
  description?: string;
}

// 图片路径工具函数
export function getImagePath(path: string): string {
  return `${BASE_PATH}${path}`;
}

export const tags = [
  { id: 'all', label: '全部' },
  { id: 'tech', label: '技术类' },
  { id: 'ai', label: 'AI与代码' },
  { id: 'visualization', label: '表格与可视化' },
  { id: 'finance', label: '资本与金融' },
  { id: 'accounting', label: '会计与报表' },
  { id: 'org', label: '组织与人' },
  { id: 'english', label: '英语' },
  { id: 'internship', label: '实习' },
];

// 在这里添加你的经历内容
export const academicItems: AcademicItem[] = [
  // ========== 理工类 ==========
  {
    id: 'tech-1',
    title: '数据分析项目',
    description: '使用Python进行数据分析和可视化，探索数据背后的规律',
    detail: '这是一个数据分析项目，主要使用Python进行数据处理和可视化分析。\n\n项目中我：\n- 爬取了多个数据源\n- 使用pandas进行数据清洗\n- 用matplotlib和seaborn制作可视化图表\n- 撰写了分析报告',
    date: '2025',
    tags: ['tech', 'ai'],
    position: '理工1',
    meaning: '用代码探索数据背后的规律',
  },
  {
    id: 'tech-2',
    title: '计算机视觉研究',
    description: '深度学习在图像识别中的应用',
    date: '2025',
    tags: ['tech', 'ai'],
    position: '理工2.1',
    meaning: '让机器学会"看"这个世界',
  },
  {
    id: 'tech-3',
    title: '自动化工具开发',
    description: '提升效率的脚本与工具开发',
    date: '2025',
    tags: ['tech'],
    position: '理工2.2',
    meaning: '用自动化解放双手',
  },

  // ========== 学术类 ==========
  {
    id: 'finance-1',
    title: '财务报表分析',
    description: '对上市公司财务报表进行深度分析，撰写分析报告',
    date: '2024',
    tags: ['accounting', 'finance'],
    position: '学术1',
    meaning: '读懂数字背后的商业逻辑',
  },

  // ========== 实习研究类 ==========
  {
    id: 'internship-1',
    title: 'PE/VC 实习经历',
    description: '参与投后增值服务，进行行业研究和公司分析',
    date: '2024',
    tags: ['internship', 'finance'],
    position: '实习研究1',
    meaning: '从资本视角理解企业价值',
  },

  // ========== 视觉类 ==========
  {
    id: 'vis-1',
    title: '可视化大屏设计',
    description: '数据可视化与交互设计',
    date: '2025',
    tags: ['visualization'],
    position: '视觉1',
    meaning: '让数据讲述故事',
  },
];
