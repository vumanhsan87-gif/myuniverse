/**
 * 保命与生活 - 内容数据
 * 直接在这里添加或修改内容即可
 */

const BASE_PATH = ''; // 使用自定义域名时为空

// ============ 图片和链接的添加方法 ============
//
// 【图片】
// 1. 把图片放到 public/images/life/ 文件夹下（运动图片放 health/，书籍封面放 books/）
// 2. 在数据中添加 images 字段，格式：['/images/life/图片文件名.png']
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
//   title: '我的飞书文档',
//   url: 'https://example.feishu.cn/docx/xxxxxx',
//   type: 'feishu',
//   description: '文档说明'
// }
//
// 【视频链接示例】
// {
//   title: '30分钟全程站立有氧燃脂操',
//   url: 'https://b23.tv/xG8nrCI',
//   type: 'bilibili',
//   description: '周六野Zoey，无跳跃无深蹲，膝友好'
// }
//
// 【完整示例（运动模块）】
// {
//   id: 'exercise-1',
//   name: '有氧运动',
//   target: 4,
//   current: 3,
//   unit: '次/周',
//   detail: '26.5.1，感觉良好，稍稍出汗',
//   images: ['/images/life/health/example.png'],
//   links: [
//     {
//       title: '周六野有氧燃脂操',
//       url: 'https://b23.tv/xG8nrCI',
//       type: 'bilibili',
//       description: '无跳跃无深蹲，膝友好'
//     },
//     {
//       title: '运动记录文档',
//       url: 'https://example.feishu.cn/docx/xxxxxx',
//       type: 'feishu',
//       description: '详细运动计划'
//     }
//   ]
// }
// =============================================

export interface LifeSection {
  id: string;
  title: string;
  icon: string;
  description: string;
}

// 链接类型
export interface Link {
  title: string;
  url: string;
  type?: 'bilibili' | 'feishu' | 'other';
  description?: string;
}

// 书籍
export interface Book {
  id: string;
  title: string;
  author: string;
  notes?: string;
  detail?: string;
  cover?: string;
  images?: string[];
  links?: Link[];
}

// 运动
export interface Exercise {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  detail?: string;
  images?: string[];
  links?: Link[];
  checkCount?: number; // 打卡次数
}

// 奇思妙想
export interface Idea {
  id: string;
  content: string;
  detail?: string;
}

// 运动日志（用于日历打卡）
export interface ExerciseLog {
  id: string;
  date: string;       // '2026-05-01'
  exerciseId: string; // 对应 exercises 中的运动类型
  content: string;     // 简短记录，如 "跑步3公里"
  hasDetail?: boolean; // 是否有详情可以点击查看
}

export function getImagePath(path: string): string {
  return `${BASE_PATH}${path}`;
}

// 页面分区配置
export const lifeSections: LifeSection[] = [
  {
    id: 'books',
    title: '可曾读过什么书',
    icon: '📚',
    description: '阅读是一座随身携带的避难所',
  },
  {
    id: 'health',
    title: '身体是革命的本钱',
    icon: '💪',
    description: '饮食与运动的平衡艺术',
  },
  {
    id: 'ideas',
    title: '满船清梦压星河',
    icon: '✨',
    description: '脑洞与灵感的星辰大海',
  },
];

// 书籍列表
export const books: Book[] = [];

// 运动数据
export const exercises: Exercise[] = [
  {
    id: 'exercise-1',
    name: '有氧运动',
    target: 4,
    current: 3,
    unit: '次/周',
    detail: '26.5.1，感觉良好，稍稍出汗',
    checkCount: 4, // 打卡次数
    links: [
      {
        title: '30分钟全程站立有氧燃脂操',
        url: 'https://b23.tv/xG8nrCI',
        type: 'bilibili',
        description: '周六野Zoey，无跳跃无深蹲，膝友好'
      }
    ]
  },
];

// 运动日志（用于日历展示）
export const exerciseLogs: ExerciseLog[] = [
  // 5月的运动记录
  { id: 'log-1', date: '2026-05-02', exerciseId: 'exercise-1', content: '有氧操30分钟', hasDetail: true },
  { id: 'log-2', date: '2026-05-04', exerciseId: 'exercise-1', content: '有氧操' },
  { id: 'log-3', date: '2026-05-07', exerciseId: 'exercise-1', content: '有氧燃脂' },
  { id: 'log-4', date: '2026-05-09', exerciseId: 'exercise-1', content: '今天状态不错', hasDetail: true },
];

// 奇思妙想
export const ideas: Idea[] = [
  {
    id: 'idea-1',
    content: '学着学着突然冒出"如果周末两天都在学的话就好了"的愧疚感，吓得我赶紧打了自己一巴掌。休息啊，多么美好的休息，周末当然是休息，没有乱七八糟的东西，只有温暖舒适的床，床边插座和手机，啊如此幸福的休息！如此珍贵的周末！休息两天后今早9点30垂死病中惊坐起，9点50带着bgm进入教室都觉得格外有活力',
  },
  {
    id: 'idea-2',
    content: '为什么会计里的「借」和「贷」要叫这个名字？是谁第一个这么翻译的？',
  },
  {
    id: 'idea-3',
    content: '人生的资产负债表里，哪些是资产，哪些是负债？',
  },
  {
    id: 'idea-4',
    content: '复利效应在人生中是否存在？',
  },
  {
    id: 'idea-5',
    content: '如果宇宙是一个公司，谁是它的 CEO？',
  },
];
