# 刘宇微 · 个人介绍网站

> "致广大而尽精微"

## 项目状态

**开发进度**: Phase 1-4 主体框架已完成 ✅

### 已完成
- [x] Next.js 项目初始化 + Tailwind CSS v4 宇宙色系配置
- [x] Noto Serif SC 字体加载
- [x] Canvas 星空背景组件（动态闪烁星星）
- [x] Lenis 平滑滚动集成
- [x] 顶部导航栏（带动画指示器）
- [x] 右侧悬浮导航点（桌面端）
- [x] 主页 Hero 区域（图片背景 + 可点击导航）
- [x] 保研与大学页面（顶部 tag 筛选 + 毛玻璃卡片）
- [x] 保命与生活页面（顶部分类 + 奇思妙想自动轮播 + 环形进度条）
- [x] 本地内容数据文件（可直接编辑）
- [x] 项目编译测试通过

### 待完成
- [ ] GitHub Actions + GitHub Pages 部署配置
- [ ] 内容填充（按需编辑 `src/data/` 下的文件）

---

## 内容编辑指南

你可以直接编辑以下文件来更新内容：

### 保研与大学
文件: `src/data/academic.ts`

```typescript
// 添加新经历
{
  id: 'unique-id',
  title: '经历标题',
  description: '经历描述...',
  date: '2024',
  tags: ['tech', 'ai'],  // 标签：tech/ai/visualization/finance/accounting/org/english/internship
}
```

### 保命与生活
文件: `src/data/life.ts`

```typescript
// 书籍
{ id: 'book-1', title: '书名', author: '作者', notes: '笔记...' }

// 运动
{ id: 'exercise-1', name: '跑步', target: 50, current: 35, unit: '公里/月' }

// 奇思妙想
{ id: 'idea-1', content: '你的想法...' }
```

编辑后运行 `npm run dev` 即可预览效果。

---

## GitHub Pages 部署步骤

### 前提条件
- 一个 GitHub 账号

### 步骤

**1. 创建 GitHub 仓库**

1. 打开 https://github.com/new
2. Repository name 填 `introduce`（或你喜欢的名字）
3. 选择 Private（私有）
4. 点击 "Create repository"

**2. 本地上传代码**

在项目目录执行：
```bash
# 初始化 git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/introduce.git

# 推送
git branch -M main
git push -u origin main
```

**3. 配置 GitHub Actions 自动部署**

这一步我会帮你做，你只需要：
1. 进入仓库 Settings → Pages
2. Source 选择 "GitHub Actions"
3. 我会创建 `.github/workflows/deploy.yml` 文件

**4. 访问网站**

部署成功后，网站会在 `https://YOUR_USERNAME.github.io/introduce` 可见。

---

## 项目文件结构

```
src/
├── app/
│   ├── layout.tsx        # 根布局（星空背景、导航栏）
│   ├── page.tsx         # 主页
│   ├── academic/        # 保研与大学
│   │   └── page.tsx
│   └── life/            # 保命与生活
│       └── page.tsx
├── components/
│   ├── StarField.tsx    # Canvas 星空背景
│   ├── Navbar.tsx       # 顶部导航栏
│   ├── HeroSection.tsx  # 主页背景图
│   ├── FloatingNav.tsx  # 悬浮导航点
│   └── SmoothScroll.tsx # Lenis 平滑滚动
├── data/
│   ├── academic.ts      # 保研与大学内容数据
│   └── life.ts          # 保命与生活内容数据
└── app/
    └── globals.css       # 全局样式 + 宇宙色系

public/images/hero/
└── home-hero.png        # 主页背景图片
```

---

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 本地预览
npm run start
```

---

## 设计说明

### 视觉风格
- 宇宙深空主题：#0B0F19 深蓝黑底色 + Canvas 动态星星
- 第一星系（保研与大学）：科技橙 + 冷白光
- 第二星系（保命与生活）：墨绿 + 暖金色
- 毛玻璃卡片：半透明背景 + backdrop-blur

### 技术栈
- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion
- Lenis 平滑滚动
- Canvas 粒子星空
