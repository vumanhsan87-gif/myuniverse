/**
 * 保研与大学 - 经历内容
 * 直接在这里添加或修改内容即可
 */

const BASE_PATH = '/myuniverse';

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
  links?: Link[];          // 详情弹窗中显示的链接（视频、飞书文档等）
}

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
  // ========== 技术类 ==========
  {
    id: 'tech-1',
    title: '333在这里添加标题',
    description: '3333在这里添加简短的预览描述...',
    detail: '3333333333333在这里添加详细的经历描述，包括：\n- 具体做了什么\n- 使用了什么技术\n- 有什么成果',
    date: '2024',
    tags: ['tech', 'ai'],
    links: [
     {
       title: '飞书项目文档',
       url: 'https://rcnmp728rcry.feishu.cn/wiki/L5gbwvdxEiKI1vkiJPccFOQanSg',
       type: 'feishu',
       description: '详细记录'
     }
   ]
  },

  // ========== 经管类 ==========
  {
    id: 'finance-1',
    title: '财务报表分析',
    description: '对上市公司财务报表进行深度分析，撰写分析报告',
    date: '2024',
    tags: ['accounting', 'finance'],
  },

  // ========== 实习 ==========
  {
    id: 'internship-1',
    title: 'PE/VC 实习经历',
    description: '参与投后增值服务，进行行业研究和公司分析',
    date: '2024',
    tags: ['internship', 'finance'],
  },
];
