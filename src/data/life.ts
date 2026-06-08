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
  image?: string; // 可选背景图片，类似朋友圈配图
}

// 运动状态颜色：rest=无色, light=绿色, intense=黄色, sick=银色
export type ExerciseStatus = 'rest' | 'light' | 'intense' | 'sick';

// 运动日志（用于日历打卡）
export interface ExerciseLog {
  id: string;
  date: string;       // '2026-05-01'
  exerciseId: string; // 对应 exercises 中的运动类型
  content: string;     // 简短记录，如 "跑步3公里"
  status?: ExerciseStatus; // 运动状态，用于日历颜色标记
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
  { id: 'log-1', date: '2026-05-02', exerciseId: 'exercise-1', content: '有氧操30分钟', status: 'intense', hasDetail: true },
  { id: 'log-2', date: '2026-05-04', exerciseId: 'exercise-1', content: '有氧操', status: 'light' },
  { id: 'log-3', date: '2026-05-07', exerciseId: 'exercise-1', content: '有氧燃脂', status: 'light' },
  { id: 'log-4', date: '2026-05-09', exerciseId: 'exercise-1', content: '生病休息', status: 'sick', hasDetail: true },
  { id: 'log-5', date: '2026-05-10', exerciseId: 'exercise-1', content: '休息日', status: 'rest' },
];

// 奇思妙想
export const ideas: Idea[] = [
  {
    id: 'idea-1',
    content: '学着学着突然冒出"如果周末两天都在学的话就好了"的愧疚感，吓得我赶紧打了自己一巴掌。休息啊，多么美好的休息，周末当然是休息，没有乱七八糟的东西，只有温暖舒适的床，床边插座和手机，啊如此幸福的休息！如此珍贵的周末！休息两天后今早9点30垂死病中惊坐起，9点50带着bgm进入教室都觉得格外有活力',
  },
  {
    id: 'idea-2',
    content: '干正事的时候听歌容易沉浸在歌词里，所以我一般听b站的古文朗读。但！我没想到这玩意后劲也那么大，脑子里全是“诱我松桂，欺我云壑。虽假容于江皋，乃缨情于好爵”（被骂到了）......“见故国之旗鼓，感平生于畴日”......然后最近才知道原来高三学的种树郭橐驼传和病梅馆记表达的意思是相似的，再看一遍发现写得真好😭“鸣鼓而聚之，击木而召之。吾小人辍飧饔以劳吏者，且不得暇，又何以蕃吾生而安吾性耶？故病且怠”。这么好的文章在某些时刻只是生僻字特别多又难背的种树文......但至少是背下来了。没有无用的经历，只不过在“当时”的我们看来没有用，但这些东西会在未来出现，给你一计回旋镖，然后——真的好奇妙啊',
  },
  {
    id: 'idea-3',
    content: '装了一撮茶叶到空的巧克力饼干的袋子，泡出来有一股巧克力的香味(｡- .•)',
  },
  {
    id: 'idea-4',
    content: '关于这个大一时没轻没重的“雄心壮志”。是心理课的大作业，看得出来心理很健康了……',
    image: 'images/life/greatheart.jpg',
  },
  {
    id: 'idea-5',
    content: '越自律，越拖延。与某实验中“小孩坚持15min不吃糖，就能再得到一颗糖作为奖励”类似，我们如果坚持克制工作与学习的欲望，任务清单上就会有吃不完的糖🍬🍬🍬🍬🍬🍬🍬🍬🍬此之谓“可持续发展”！（文艺风：我对求知的敬畏，近乎吝啬。每次只敢在真理的边缘浅尝辄止，唯恐一朝读尽，往后便没了念想。这种“惜读”的艺术，本质上是对未知的长情告白——只要我学得够慢，真理就永远不会离我而去。）',
    image: '/images/life/daydayup.jpg',
  },
  {
    id: 'idea-6',
    content: '大学最有性价比的东西是水果刀，与我一起品尝过苹果的清甜，芒果的多汁，梨的酸涩，番茄乌梅的新奇……还有这个糖分超高的菠萝！！！',
    image: '/images/life/pinapple.jpg',
  },
  {
    id: 'idea-7',
    content: '6元椰奶+1元冰块+3元水果+？？？=20元鲜果椰奶清补凉',
  },
  {
    id: 'idea-8',
    content: '不合适终究是不合适',
    image:'/images/life/chazuo.png'
  },
  {
    id: 'idea-9',
    content: '已经掌握了ai经典的“不是......而是......”安慰句式，例如：你不是在熬夜，而是在为除夕那天的守岁做准备。',
  },
  {
    id: 'idea-10',
    content: '抬头看，有惊喜（非常成功的广告）',
    image:'/images/life/tensubway.jpg'
  },
];
