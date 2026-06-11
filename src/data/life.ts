/**
 * 保命与生活 - 内容数据
 * 直接在这里添加或修改内容即可
 */

const BASE_PATH = ''; // 使用自定义域名时为空

// ============ 图片和链接的添加方法 ============
//
// 【图片】
// 1. 把图片放到 public/images/life/ 文件夹下（奇思妙想配图和书籍封面都放这里）
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
  story?: string;    // 我与书的故事
  quotes?: string[];  // 书籍金句
}

// 运动
export interface Exercise {
  id: string;
  name: string;
  detail?: string;
  images?: string[];
  links?: Link[];
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
  title: string;      // 两字标题，显示在日历格子上
  content: string;    // 点击展开的拓展详情
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
];

// 书籍列表
// 添加方法：
// 1. 把书籍封面图片放到 public/images/life/ 文件夹下（和奇思妙想共用）
// 2. 填写 cover 字段，如 '/images/life/books/封面.jpg'
// 3. story 是你与这本书的故事，quotes 是书中的金句（数组，每条一句）
export const books: Book[] = [
  {
    id: 'book-1',
    title: '伯恩斯新情绪疗法',
    author: '伯恩斯',
    cover: '/images/life/book1.jpg',
    story: '第一段实习的带教一边说“我想你心理肯定很健康的”，一边让我带薪看这本书……美其名曰整理思维模式',
    quotes: [
      '情绪源于思维。一些负面情绪源于对事件的认知扭曲',
      '“认同上瘾症”：如果你重视的人不认同你，你就会痛苦不堪 → 事实上你必须先相信别人的批评。',
    ],
  },
];

// 运动数据（只记录运动类型和链接，不做目标追踪）
export const exercises: Exercise[] = [
  {
    id: 'exercise-1',
    name: '轻松的',
    detail: '',
    links: [
      {
        title: '30分钟全程站立有氧燃脂操',
        url: 'https://b23.tv/xG8nrCI',
        type: 'bilibili',
        description: '周六野Zoey，无跳跃无深蹲，膝友好'
      }
    ]
  },
  {
    id: 'exercise-2',
    name: '做完舒服不酸痛',
    detail: '',
    links: [
      {
        title: '30钟全身燃脂有氧+无氧HIIT',
        url: ' https://b23.tv/3Guf2xs',
        type: 'bilibili',
        description: ''
      },
      {
        title: '20分钟暴汗燃脂有氧运动,',
        url: ' https://b23.tv/EIJdQuM',
        type: 'bilibili',
        description: ''
      }
    ]
  },
  {
    id: 'exercise-3',
    name: '休息',
  },

];

// 运动日志（用于日历展示）
// title: 两字标题显示在日历格子上，content: 点击展开的拓展详情
export const exerciseLogs: ExerciseLog[] = [
  // 5月的运动记录
  { id: 'log-1', date: '2026-05-02', title: '爽', content: '', status: 'intense'},
  { id: 'log-2', date: '2026-05-04', title: '爽', content: '', status: 'light' },
  { id: 'log-3', date: '2026-05-06', title: '月经', content: '', status: 'rest' },
  { id: 'log-6', date: '2026-05-11', title: '爽', content: '', status: 'intense'},
  { id: 'log-7', date: '2026-05-12', title: '爽', content: '', status: 'light' },
  { id: 'log-8', date: '2026-05-13', title: '爽', content: '', status: 'light' },
  { id: 'log-9', date: '2026-05-15', title: '生病', content: '在自习室对着空调吹了一天，回来烧上39了……', status: 'sick', hasDetail: true },
  { id: 'log-10', date: '2026-05-21', title: '不适', content: '尝试锻炼，但练完咳嗽，有点哮喘', status: 'sick', hasDetail: true  },
  { id: 'log-11', date: '2026-05-22', title: '不适', content: '再次尝试，不敢试了', status: 'sick', hasDetail: true },
  { id: 'log-12', date: '2026-05-25', title: '复健', content: '感觉良好', status: 'light', hasDetail: true  },
  { id: 'log-13', date: '2026-05-27', title: '复健', content: '差不多恢复了', status: 'light' },
  // 6月
  { id: 'log-14', date: '2026-06-05', title: '散步', content: '散步', status: 'light' },
  { id: 'log-15', date: '2026-06-06', title: '爽', content: '步入正轨', status: 'light', },
  { id: 'log-16', date: '2026-06-09', title: '散步', content: '', status: 'light' },
  { id: 'log-17', date: '2026-06-10', title: '散步', content: '', status: 'light' },
];

// 奇思妙想
export const ideas: Idea[] = [
  {
    id: 'idea-1',
    content: '在牛雨薇20岁的时候，她开始跟随pyl老师学习绘画。然而，她的导师并没有按照常规的方式教授她绘画的技法和理论，也没有让她临摹名画来提升技艺。相反，他只给了牛雨薇一个坐标轴，并要求她在坐标轴上画“X”',
    image: 'images/life/econ.jpg',
  },
  {
    id: 'idea-2',
    content: '干正事的时候听歌容易沉浸在歌词里，所以我一般听b站的古文朗读。但！我没想到这玩意后劲也那么大，脑子里全是“诱我松桂，欺我云壑。虽假容于江皋，乃缨情于好爵”（被骂到了）......“见故国之旗鼓，感平生于畴日”......然后最近才知道原来高三学的种树郭橐驼传和病梅馆记表达的意思是相似的，再看一遍发现写得真好😭“鸣鼓而聚之，击木而召之。吾小人辍飧饔以劳吏者，且不得暇，又何以蕃吾生而安吾性耶？故病且怠”。这么好的文章在某些时刻只是生僻字特别多又难背的种树文......但至少是背下来了。没有无用的经历，只不过在“当时”的我们看来没有用，但这些东西会在未来出现，给你一计回旋镖，然后——真的好奇妙啊',
  },
  {
    id: 'idea-3',
    content: '【胡闹厨房】1.装了一撮茶叶到空的巧克力饼干的袋子，泡出来有一股巧克力的香味。 2.岩茶加红糖会变成红茶吗？ 3.先用沸水泡茶，降温后再倒入奶粉，就可以得到奶茶了。还可以融化一些巧克力进去，美味。  4.五个桂圆+两个话梅+一堆红糖=？？？',
    image: 'images/life/cook.jpg',
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
    content: '抬头看，有惊喜（非常成功的广告）',
    image:'/images/life/tensubway.jpg'
  },
  {
    id: 'idea-8',
    content: '小刘在做作业的时候不小心打翻了墨水，把一道会计分录弄脏了。问被污损的数字是多少。',
    image:'/images/life/ink.jpg'
  },
  {
    id: 'idea-9',
    content: '此觉无计可消除，才下眉头，却上心头。——首席睡眠研究师牛雨薇​牛老师本人睡过最舒适的午觉是在冬天的图书馆沙发。吃过午饭，冒着寒风，找到沙发空位，歪好姿势，脱羽绒服，盖在身上留个呼吸口，伴着图书馆的暖气和白噪音睡二三十分钟，比在床上还舒服，此乃上上策。​与此相比，最low与最需要技巧的睡眠方式就是直接趴桌。头放在手肘的位置决定了醒来时手是否会麻、颈椎是否酸痛、眼睛是否看不清东西......此法常年受学界批判，功法不到位极易走火入魔，可谓午休一刻折寿一时。​若有觉友询问，自己在的地方只有桌椅怎么办？无妨无妨，想午睡者，目之所及，无不为床，长桌能卧，大地可躺，倒头即睡，快哉快哉！',
    image:'/images/life/rest.jpg'
  },
  {
    id: 'idea-10',
    content: '灵机一动的拖把门闩',
    image:'/images/life/tuoba.jpg'
  },
];
