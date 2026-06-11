/**
 * 保研与大学 - 经历内容
 * 直接在这里添加或修改内容即可
 */

const BASE_PATH = ''; // 使用自定义域名时为空

// ============ 图片、PDF 和链接的添加方法 ============
//
// 【图片】
// 1. 把图片放到 public/images/academic/ 文件夹下
// 2. 在数据中添加 images 字段，格式：['/images/academic/图片文件名.png']
//    （系统会自动添加 BASE_PATH 前缀）
//
// 【PDF】
// 1. 把 PDF 文件放到 public/ 文件夹下
// 2. 在数据中添加 pdf 字段，格式：'/文件名.pdf'
// 3. 卡片上会显示 PDF 下载按钮，点击详情可在线预览
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
//   pdf: '/项目文件.pdf',
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
  images?: string[];         // 详情弹窗中显示的图片路径
  pdf?: string;              // PDF 文件路径（放在 public/ 下），如 '/文件.pdf'
  links?: Link[];            // 详情弹窗中显示的链接（视频、飞书文档等）
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
  { id: 'methodology', label: '方法论' },
];

// 在这里添加你的经历内容
export const academicItems: AcademicItem[] = [
  {
    id: 'group-work',
    title: '优雅完成小组作业',
    description: '关于大学什么东西最闹心？小组作业当之无愧。当然，我认为我们不喜欢的并不是作业本身，而是作业与成绩挂钩这一机制——当你的个人成绩有一部分会取决于他人的努力时，小组作业就变得不那么纯粹了，它逐渐成为人性测试与心理博弈。作为一名资深的小组作业玩家，本人痛定思痛，总结了这套实战指南。本项目获教务处主办的学业经验分享征稿活动三等奖。',
    date: '2024-2026',
    tags: ['methodology', 'org'],
    pdf: '/刘宇微-优雅完成小组作业-word（防止word格式错乱）.pdf',
  },
  {
    id: 'privacy-ethics',
    title: '从”openai窃声”到勾选框里的”同意”：隐私是科技进步的必然牺牲品吗？',
    description: `一切，都要从一个勾选方框说起。
当我们第一次使用一个网络产品时，我们说：”是的，我已经阅读并同意了《用户协议》和《隐私政策》”，有的甚至你直接登陆，它就默认你阅读并同意了。
但是，你真的阅读这些条款了吗？你确定这些条款一点也不长，它们也一点儿不晦涩难懂，你非常有耐心地一字一句研究了？
到此为止，权力的不平衡已经建立。我们同意无偿让对方收集我们的个人信息，并用于我们无法想象的规模层面，获取商业利益；我们无法追溯自己的数据是否被用于模型训练，罗尔斯在”无知之幕”中强调的信息对等、公平正义不复存在。`,
    date: '2025.06',
    tags: ['methodology', 'org'],
    pdf: '/隐私是科技进步的必然牺牲品吗？.pdf',
  },
];
