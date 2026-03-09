# MSBC 2026 网站 UI 设计需求文档

## 📋 项目概述

**项目名称：** Malaysia Student Blockchain Conference 2026  
**项目类型：** 高端区块链会议官网  
**设计风格：** TOKEN2049 风格，深色高级主题  
**技术栈：** React + TypeScript + Tailwind CSS  
**目标用户：** 学生、开发者、区块链从业者、投资者

---

## 🎨 设计风格参考

### 主要参考网站
- **TOKEN2049** (https://token2049.com) - 主要视觉风格参考
- 风格特点：
  - 深色高级主题
  - 大标题、大留白
  - 克制的装饰，降低模板感
  - 专业的排版层次
  - 微妙的动画效果

### 设计原则
1. **品牌自信**：大胆的排版，减少装饰性元素
2. **编辑感**：更大的留白，清晰的视觉节奏
3. **专业性**：高端会议官网的质感
4. **一致性**：统一的设计语言贯穿所有页面

---

## 🎨 设计系统规范

### 颜色系统

#### 主色
- **Void Black（主背景）**: `#07090F`
- **Void Elevated（卡片背景）**: `#111827`
- **Electric Blue（主色/强调色）**: `#2563EB`
- **Platinum White（主文字）**: `#F0F2F8`

#### 辅助色
- **Muted Gray（次要文字）**: `#6B7280`
- **Muted Text（辅助文字）**: `#9CA3AF`
- **Divider（分割线）**: `#1F2937`
- **Border（边框）**: `rgba(255, 255, 255, 0.06)` - `rgba(255, 255, 255, 0.12)`

#### 使用场景
- 背景：Void Black / Void Elevated
- 主标题：Platinum White
- 次要文字：Muted Gray / Muted Text
- 强调/链接：Electric Blue
- 边框：白色透明度 6-12%

### 字体系统

#### 字体族
- **标题字体（Display）**: Space Grotesk
  - 用于：H1, H2, H3, 导航、按钮
  - 特点：现代、几何、专业
  
- **正文字体（Body）**: Inter
  - 用于：段落、描述文字
  - 特点：清晰、易读、现代
  
- **等宽字体（Mono）**: JetBrains Mono
  - 用于：标签、日期、数据、代码
  - 特点：技术感、精确

#### 字体层级

| 层级 | 用途 | 桌面端 | 移动端 | 行高 | 字重 |
|------|------|--------|--------|------|------|
| H1 (headline-xl) | Hero 主标题 | 8rem | 3rem | 0.92 | 700 |
| H2 (headline-lg) | 区块标题 | 5.5rem | 2.25rem | 1.05 | 700 |
| H3 (headline-md) | 卡片标题 | 3.5rem | 1.75rem | 1.1 | 700 |
| Body Large | 大段文字 | 1.25rem | 1rem | 1.7 | 400 |
| Body | 正文 | 1rem | 0.9375rem | 1.6 | 400 |
| Label | 标签/日期 | 0.75rem | 0.6875rem | 1.4 | 500 |

**字间距：**
- 标题：`-0.05em` 到 `-0.03em`（负值，更紧凑）
- 标签：`0.1em` 到 `0.18em`（大写字母间距）

### 间距系统

#### 基础间距单位
- 基础单位：`4px` (0.25rem)
- 常用间距：`8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 96px, 128px`

#### Section 间距
- 移动端：`6rem` (96px)
- 平板：`12rem` (192px)
- 桌面：`16rem` - `20rem` (256px - 320px)

#### 组件内部间距
- 卡片 Padding：`1.5rem` - `2rem` (24px - 32px)
- 按钮 Padding：`1rem 2.25rem` (垂直 16px, 水平 36px)
- 网格 Gap：`2rem` - `4rem` (32px - 64px)

### 圆角系统
- 按钮：`4px`
- 卡片：`0px`（直角，更现代）
- 头像：`2px`（轻微圆角）

### 阴影系统
- 按钮 Hover：`0 0 40px rgba(37, 99, 235, 0.35)`
- 卡片 Hover：`0 0 32px rgba(37, 99, 235, 0.08)`
- 避免使用过多阴影，保持简洁

---

## 📱 响应式断点

| 设备 | 宽度范围 | 用途 |
|------|----------|------|
| Mobile | 375px - 639px | 手机端 |
| Tablet | 640px - 1023px | 平板 |
| Desktop | 1024px+ | 桌面端 |
| Large Desktop | 1280px+ | 大屏桌面 |

**设计原则：** 移动端优先（Mobile First）

---

## 📄 页面清单与优先级

### 🔴 优先级 1：核心页面（必须）

#### 1. 首页 Homepage
**包含区块：**
- Hero Section（第一屏）
  - 背景图片 + 渐变叠加
  - 聚光灯效果（径向渐变）
  - 日期/地点标签（mono 字体）
  - 超大标题（H1）
  - 描述文字
  - 两个 CTA 按钮（Primary + Secondary）
  - 倒计时组件

- Stats Bar（数据展示）
  - 4 个数据项（数字 + 标签）
  - 大号数字（mono 字体，蓝色）
  - 小号标签（mono 字体，灰色）

- About Section（关于）
  - 左右布局（文字 + 图片）
  - 区块标题（H2）
  - 描述文字
  - 特色标签

- Speakers Preview（演讲者预览）
  - 区块标题（H2）
  - 4 个演讲者卡片（网格布局）
  - 每个卡片：头像（3:4 比例）、姓名、职位、公司
  - "View All" CTA 按钮

- Agenda Preview（议程预览）
  - 区块标题（H2）
  - 4 个议程项（列表布局）
  - 每个项：时间、格式标签、标题、描述
  - "View Full Agenda" CTA 按钮

- Sponsors Preview（赞助商预览）
  - 区块标题（H2）
  - 分级展示（Title / Platinum / Gold / Silver）
  - 每个级别：标签 + Logo 网格
  - 两个 CTA 按钮

- FAQ Preview（常见问题预览）
  - 区块标题（H2）
  - 3-4 个问题（可折叠）
  - "View All FAQs" CTA 按钮

- Final CTA Section（最终行动号召）
  - 背景渐变
  - 大标题
  - 描述文字
  - Primary CTA 按钮

#### 2. Header / Navigation
**桌面端：**
- Logo（MSBC + 2026 标签）
- 导航菜单（水平排列）
- CTA 按钮（右上角）

**移动端：**
- Logo + 汉堡菜单图标
- 全屏菜单（垂直导航）
- CTA 按钮

**交互状态：**
- 滚动时：背景变半透明 + 模糊效果
- Hover：文字颜色变化
- Active：当前页面高亮

#### 3. Footer
**包含：**
- 品牌信息（Logo + 描述）
- 导航链接（2-3 列）
- 社交媒体链接
- 版权信息 + 日期

**布局：** 网格布局，响应式

---

### 🟡 优先级 2：重要页面

#### 4. Speakers 页面
- Hero Section（页面标题）
- 演讲者列表（网格布局）
- 每个卡片：头像、姓名、职位、公司、标签
- 筛选功能（可选）
- 模态框（点击查看详情）

#### 5. Sponsors 页面
- Hero Section（页面标题）
- 分级展示（Title → Platinum → Gold → Silver → Community → University → Media）
- 每个级别：标签 + Logo 网格
- Logo 尺寸根据级别变化

#### 6. Agenda 页面
- Hero Section（页面标题）
- 日期标签（水平滚动）
- 轨道筛选（水平滚动）
- 议程列表（时间线布局）
- 每个项：时间、格式、轨道、标题、描述、演讲者头像

---

### 🟢 优先级 3：次要页面

#### 7. FAQ 页面
- Hero Section（页面标题）
- 分类标签（水平滚动）
- 问题列表（可折叠）
- 每个问题：问题 + 答案（展开/收起）

#### 8. Contact 页面
- Hero Section（页面标题）
- 联系表单
- 联系信息（地址、邮箱、电话）
- 地图（可选）

#### 9. Tickets 页面
- Hero Section（页面标题）
- 票种展示（卡片布局）
- 每个票种：名称、价格、描述、CTA 按钮

---

## 🧩 组件设计要求

### 按钮组件

#### Primary Button
- **样式：** 蓝色背景（#2563EB），白色文字
- **尺寸：** 
  - Small: `py-2.5 px-5` (移动端)
  - Medium: `py-3 px-6` (默认)
  - Large: `py-5 px-10` (Hero CTA)
- **圆角：** `4px`
- **字体：** Space Grotesk, 600 weight
- **Hover：** 背景变亮 + 阴影 + 轻微上移（-2px）
- **图标：** 右侧可加箭头图标

#### Secondary Button
- **样式：** 透明背景，白色边框，白色文字
- **尺寸：** 同 Primary Button
- **圆角：** `4px`
- **字体：** Space Grotesk, 600 weight
- **Hover：** 边框变蓝 + 背景变蓝（透明度 8%）+ 文字变蓝

### 卡片组件

#### Conference Card（通用卡片）
- **背景：** Void Elevated (#111827)
- **边框：** 1px, rgba(255, 255, 255, 0.06)
- **Padding：** `1.5rem - 2rem`
- **Hover：** 边框变蓝 + 蓝色阴影
- **圆角：** 0px（直角）

#### Speaker Card（演讲者卡片）
- **布局：** 头像 + 信息（垂直或水平）
- **头像：** 3:4 比例，默认灰度，hover 时变彩色
- **信息：** 姓名（H3）、职位（蓝色）、公司（灰色）、标签（小标签）
- **移动端：** 垂直布局
- **桌面端：** 网格布局（2列或4列）

#### Agenda Card（议程卡片）
- **布局：** 时间 + 内容（水平布局）
- **时间：** 左侧固定宽度，mono 字体
- **内容：** 格式标签、轨道标签、标题、描述、演讲者头像
- **分隔：** 细线分隔（不是卡片）

### 表单组件

#### Input（输入框）
- **背景：** 透明或 Void Elevated
- **边框：** 1px, rgba(255, 255, 255, 0.08)
- **文字：** Inter, 16px（避免移动端缩放）
- **Focus：** 边框变蓝 + 蓝色阴影
- **Placeholder：** 灰色文字

#### Textarea（文本域）
- 同 Input，但多行

#### Select（下拉选择）
- 同 Input，右侧下拉箭头

### 标签组件

#### Format Tag（格式标签）
- **样式：** 蓝色边框，蓝色文字，透明背景
- **尺寸：** `px-3 py-1.5`
- **字体：** JetBrains Mono, 10px, uppercase
- **圆角：** `2px`

#### Track Tag（轨道标签）
- **样式：** 灰色文字，无边框
- **尺寸：** `px-2 py-1`
- **字体：** JetBrains Mono, 10px, uppercase

### 导航组件

#### Desktop Nav
- **布局：** 水平排列
- **字体：** Space Grotesk, 12px, uppercase
- **颜色：** 灰色（默认），白色（hover/active）
- **间距：** `gap-6 - gap-8`

#### Mobile Nav
- **布局：** 全屏覆盖，垂直排列
- **字体：** Space Grotesk, 24px, bold
- **背景：** 深色半透明 + 模糊
- **动画：** 从左侧滑入

---

## 🎬 动画与交互

### 动画原则
- **简洁：** 避免过度动画
- **流畅：** 使用缓动函数 `cubic-bezier(0.16, 1, 0.3, 1)`
- **快速：** 持续时间 0.3s - 0.6s

### 常用动画
1. **Fade In：** `opacity: 0 → 1`
2. **Slide Up：** `translateY(20px) → translateY(0)`
3. **Stagger：** 列表项依次出现（延迟 0.05s - 0.08s）
4. **Hover：** 颜色变化 + 轻微位移（-1px 到 -2px）

### 交互状态
- **Hover：** 所有可点击元素
- **Active：** 按钮点击、导航当前页
- **Focus：** 表单输入、键盘导航
- **Disabled：** 禁用状态（降低透明度）

---

## 📦 Figma 交付要求

### 文件组织

```
MSBC-2026-Website-Design/
├── 📄 Design System（设计系统）
│   ├── Colors（颜色）
│   ├── Typography（字体）
│   ├── Spacing（间距）
│   └── Components（组件库）
│
├── 📄 Pages（页面）
│   ├── Homepage - Desktop
│   ├── Homepage - Mobile
│   ├── Speakers - Desktop
│   ├── Speakers - Mobile
│   ├── Sponsors - Desktop
│   ├── Sponsors - Mobile
│   ├── Agenda - Desktop
│   ├── Agenda - Mobile
│   ├── FAQ - Desktop
│   ├── FAQ - Mobile
│   ├── Contact - Desktop
│   ├── Contact - Mobile
│   ├── Tickets - Desktop
│   └── Tickets - Mobile
│
└── 📄 Components（组件）
    ├── Buttons
    ├── Cards
    ├── Forms
    ├── Navigation
    └── Icons
```

### 命名规范

#### Frame 命名
- `Homepage - Desktop (1280px)`
- `Homepage - Mobile (375px)`
- `Speaker Card - Default`
- `Speaker Card - Hover`

#### 图层命名
- ✅ 好的命名：`Logo / MSBC Text`、`Button / Primary / Default`
- ❌ 避免：`Rectangle 123`、`Group 456`

#### Component 命名
- `Button / Primary`
- `Button / Secondary`
- `Card / Conference`
- `Card / Speaker`
- `Input / Text`
- `Nav / Desktop`

### 标注要求

#### 必须标注的内容
1. **间距：** Padding、Margin、Gap（使用 Figma 的 Auto Layout）
2. **字体：** 字号、行高、字重、字间距
3. **颜色：** HEX 值或 RGB 值
4. **尺寸：** Width、Height（特别是图标和图片）
5. **圆角：** Border Radius
6. **阴影：** Box Shadow（如果有）

#### 标注方式
- 使用 Figma 的标注工具（Figma 会自动生成）
- 或使用文字标注（放在组件旁边）
- 确保标注清晰易读

### 组件化要求

#### 组件状态
每个组件需要包含：
- Default（默认状态）
- Hover（悬停状态）
- Active（激活状态）
- Disabled（禁用状态，如果适用）
- Focus（焦点状态，表单元素）

#### 组件变体
- 尺寸变体：Small、Medium、Large
- 颜色变体：Primary、Secondary（如果适用）
- 状态变体：Default、Hover、Active

### 导出要求

#### 图标
- **格式：** SVG（优先）或 PNG（备用）
- **尺寸：** 24x24px、32x32px（提供多尺寸）
- **命名：** `icon-arrow-right.svg`、`icon-clock.svg`

#### 图片
- **格式：** WebP（优先）或 PNG
- **分辨率：** 2x（Retina 显示）
- **命名：** `hero-background.webp`、`speaker-john-doe.jpg`

#### 设计规范文档（可选但推荐）
- 导出 PDF 或 Markdown 格式
- 包含设计系统说明
- 包含组件使用指南

---

## 🔍 设计检查清单

### 设计系统
- [ ] 颜色系统完整（主色、辅助色、使用场景）
- [ ] 字体系统完整（字体族、层级、使用场景）
- [ ] 间距系统清晰（基础单位、常用间距）
- [ ] 组件库完整（按钮、卡片、表单等）

### 页面设计
- [ ] 所有页面都有桌面端和移动端版本
- [ ] 响应式布局合理（断点：375px、640px、1024px、1280px）
- [ ] 视觉层次清晰（标题、正文、标签）
- [ ] 留白充足（符合编辑感要求）

### 组件设计
- [ ] 所有组件都有交互状态（hover、active、focus）
- [ ] 组件命名规范（方便查找）
- [ ] 组件可复用（避免重复设计）

### 标注与导出
- [ ] 间距标注清晰（padding、margin、gap）
- [ ] 字体标注完整（字号、行高、字重）
- [ ] 颜色值标注（HEX 或 RGB）
- [ ] 图标可导出（SVG 格式）
- [ ] 图片提供高分辨率版本

### 设计质量
- [ ] 符合 TOKEN2049 风格（深色、大标题、大留白）
- [ ] 降低模板感（减少装饰性元素）
- [ ] 品牌自信（大胆的排版）
- [ ] 一致性（统一的设计语言）

---

## 📚 参考资源

### 设计参考
- **TOKEN2049 官网：** https://token2049.com
- **其他高端会议网站：** Devcon、Consensus、Ethereum Community Conference

### 字体资源
- **Space Grotesk：** https://fonts.google.com/specimen/Space+Grotesk
- **Inter：** https://fonts.google.com/specimen/Inter
- **JetBrains Mono：** https://fonts.google.com/specimen/JetBrains+Mono

### 图标资源
- **Lucide Icons：** https://lucide.dev（当前使用的图标库）
- 或使用 Figma 内置图标库

### 图片资源
- Hero 背景图：需要提供（可以是抽象科技感图片）
- Speaker 头像：由内容提供（设计师只需设计占位符）
- Sponsor Logo：由内容提供（设计师只需设计占位符）

---

## 📞 沟通与反馈

### 设计评审流程
1. **初稿评审：** 首页 + Header/Footer（确认风格）
2. **设计系统确认：** 组件库 + 设计规范（确保一致性）
3. **页面设计：** 按优先级逐个页面设计
4. **最终评审：** 所有页面完成后整体评审

### 反馈方式
- **Figma Comments：** 直接在设计中标注
- **设计评审会议：** 定期沟通（建议每周一次）
- **设计规范文档：** 记录设计决策

### 修改要求
- **小修改：** 颜色、间距、字体（1-2 天内完成）
- **中修改：** 布局调整、组件优化（3-5 天内完成）
- **大修改：** 页面重设计（需要重新评估时间）

---

## ✅ 交付清单

### 必须交付
- [ ] Figma 设计文件（包含所有页面和组件）
- [ ] 设计系统页面（颜色、字体、间距、组件）
- [ ] 所有页面的桌面端和移动端版本
- [ ] 组件库（按钮、卡片、表单等）
- [ ] 交互状态（hover、active、focus）
- [ ] 清晰的标注（间距、字体、颜色）

### 可选交付
- [ ] 设计规范文档（PDF 或 Markdown）
- [ ] 组件使用指南
- [ ] 动画建议文档
- [ ] 设计决策记录

---

## 📝 备注

### 技术约束
- 使用 Tailwind CSS（设计师不需要写代码，但需要了解约束）
- 响应式设计必须考虑（移动端优先）
- 浏览器兼容性：现代浏览器（Chrome、Firefox、Safari、Edge）

### 内容说明
- 所有文字内容由客户提供（设计师使用占位文字）
- 图片资源由客户提供（设计师设计占位符）
- Logo 和品牌元素由客户提供

### 时间安排
- **优先级 1 页面：** 2-3 周
- **优先级 2 页面：** 1-2 周
- **优先级 3 页面：** 1 周
- **总计：** 4-6 周（根据设计师时间调整）

---

## 🎯 设计目标

**最终目标：**
创建一个具有正式活动官网质感的网站，风格统一，信息主次清晰，移动端体验良好，所有 CTA 明确且易点击。

**成功标准：**
- ✅ 首页第一眼具有正式官网质感
- ✅ 页面间风格一致
- ✅ 信息主次清晰
- ✅ 手机端体验正常
- ✅ CTA 明确且易点击

---

**文档版本：** 1.0  
**最后更新：** 2026-03-09  
**联系方式：** [你的联系方式]

---

*如有任何问题，请随时沟通！*
