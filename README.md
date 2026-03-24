# MSBC Website

MSBC 官方网站项目，基于 React + Vite 构建，包含大会主页、演讲者、议程、赞助、票务、常见问题、联系页面，以及后台内容管理页面。

## 功能概览

- 年度主站路由（当前默认跳转到 `2026`）
- 多页面会议信息展示（Speakers / Agenda / Hackathon / Sponsors 等）
- 后台内容管理页面（`/admin`）
- Supabase 数据库与 Storage 集成（可用于内容持久化与图片上传）
- 响应式 UI 与动效体验（Radix UI + Tailwind + Framer Motion）

## 技术栈

- React 19
- TypeScript
- Vite 7
- Wouter（路由）
- Tailwind CSS 4
- Radix UI
- Supabase
- pnpm

## 项目结构

```text
msbc-website/
├─ client/                  # 前端应用
│  ├─ src/
│  │  ├─ pages/             # 页面组件
│  │  ├─ components/        # 通用组件与 UI 组件
│  │  ├─ hooks/             # 业务 hooks（含 Supabase 相关）
│  │  └─ lib/               # 工具与客户端配置
├─ server/                  # 服务端入口（构建时打包）
├─ shared/                  # 共享常量
├─ supabase/
│  └─ migrations/           # 数据库迁移脚本
└─ package.json
```

## 本地开发

### 1) 安装依赖

```bash
pnpm install
```

### 2) 配置环境变量

复制 `env.local.template` 为 `.env.local`，并填写：

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> 若未配置 Supabase，项目会回退到本地存储模式（用于基础开发调试）。

### 3) 启动开发服务

```bash
pnpm dev
```

默认可通过本地地址访问（以终端输出为准）。

## 常用命令

```bash
pnpm dev          # 启动开发环境
pnpm build        # 构建前端 + 服务端产物
pnpm build:client # 仅构建前端
pnpm preview      # 预览构建结果
pnpm check        # TypeScript 类型检查
pnpm format       # 代码格式化
```

## 路由说明

- `/` -> 自动重定向到 `/2026`
- `/2026` -> 首页
- `/2026/speakers`
- `/2026/agenda`
- `/2026/hackathon`
- `/2026/sponsors`
- `/2026/become-a-sponsor`
- `/2026/tickets`
- `/2026/universities`
- `/2026/faq`
- `/2026/contact`
- `/admin` -> 后台管理

## Supabase 初始化

1. 在 Supabase 创建项目并获取 URL 与 anon key。
2. 执行 `supabase/migrations/001_initial_schema.sql` 初始化数据库。
3. 按项目文档创建 Storage buckets（如 `images`、`posters`、`speaker-photos`、`sponsor-logos`）。

可参考仓库内文档：

- `SUPABASE_QUICK_START.md`
- `SUPABASE_INTEGRATION_STATUS.md`

## 部署

项目已包含常见平台配置：

- `vercel.json`
- `netlify.toml`

部署时请在平台环境变量中配置：

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## License

MIT
