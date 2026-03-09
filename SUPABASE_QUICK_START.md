# Supabase 快速开始指南

## 🚀 5 分钟快速设置

### 步骤 1：创建 Supabase 项目（2 分钟）

1. **访问 Supabase**
   - 打开 https://supabase.com
   - 如果没有账号，点击 "Start your project" 注册
   - 如果有账号，点击 "New Project"

2. **填写项目信息**
   ```
   Organization: [选择或创建组织]
   Name: msbc-website
   Database Password: [设置一个强密码，记住它！]
   Region: [选择离你最近的区域，如 Southeast Asia (Singapore)]
   Pricing Plan: Free (免费计划足够使用)
   ```

3. **等待项目创建**
   - 点击 "Create new project"
   - 等待 1-2 分钟，直到看到 "Project is ready"

### 步骤 2：获取 API 密钥（1 分钟）

#### 方法 A：通过左侧菜单（推荐）

1. 在项目 Dashboard 左侧，找到 **⚙️ Settings** 图标
2. 点击 **Settings**，然后点击 **API**
3. 你会看到：

```
┌─────────────────────────────────────────┐
│ Project URL                              │
│ https://xxxxxxxxxxxxx.supabase.co       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Project API keys                        │
│                                         │
│ anon public                             │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │
│ [📋] Copy                               │
│                                         │
│ service_role secret                     │
│ [👁️] Reveal                             │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │
│ [📋] Copy                               │
└─────────────────────────────────────────┘
```

#### 方法 B：如果找不到 Settings

1. 点击页面右上角的 **⚙️ 齿轮图标**
2. 选择 **API Settings** 或 **Project Settings**
3. 或者直接访问：`https://app.supabase.com/project/[你的项目ID]/settings/api`

#### 方法 C：通过项目概览页

1. 在 Dashboard 首页，找到 "Project Settings" 卡片
2. 点击 "API Settings" 链接

### 步骤 3：配置环境变量（1 分钟）

1. **在项目根目录创建 `.env.local` 文件**
   ```bash
   # Windows PowerShell
   New-Item -Path .env.local -ItemType File
   
   # 或者手动创建文件
   ```

2. **编辑 `.env.local`，填入以下内容：**
   ```env
   VITE_SUPABASE_URL=https://你的项目ID.supabase.co
   VITE_SUPABASE_ANON_KEY=你的anon_public密钥
   ```

   **示例：**
   ```env
   VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. **保存文件**
   - ⚠️ 确保文件名为 `.env.local`（注意前面的点）
   - ⚠️ 不要提交这个文件到 Git（已在 .gitignore 中）

### 步骤 4：运行数据库迁移（1 分钟）

1. **打开 Supabase SQL Editor**
   - 在左侧菜单点击 **SQL Editor**
   - 或者访问：`https://app.supabase.com/project/[你的项目ID]/sql`

2. **创建新查询**
   - 点击 "New query" 按钮

3. **复制并执行 SQL**
   - 打开项目中的 `supabase/migrations/001_initial_schema.sql` 文件
   - 复制全部内容
   - 粘贴到 SQL Editor
   - 点击 "Run" 或按 `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

4. **确认执行成功**
   - 应该看到 "Success. No rows returned" 或类似的成功消息
   - 如果有错误，检查错误信息并修复

### 步骤 5：创建 Storage Buckets（1 分钟）

1. **打开 Storage**
   - 在左侧菜单点击 **Storage**
   - 或者访问：`https://app.supabase.com/project/[你的项目ID]/storage/buckets`

2. **创建 Buckets**
   点击 "New bucket" 按钮，依次创建以下 4 个 bucket：

   **Bucket 1: images**
   ```
   Name: images
   Public bucket: ✅ Yes (勾选)
   File size limit: 5 MB
   Allowed MIME types: image/*
   ```

   **Bucket 2: posters**
   ```
   Name: posters
   Public bucket: ✅ Yes
   File size limit: 5 MB
   Allowed MIME types: image/*
   ```

   **Bucket 3: speaker-photos**
   ```
   Name: speaker-photos
   Public bucket: ✅ Yes
   File size limit: 5 MB
   Allowed MIME types: image/*
   ```

   **Bucket 4: sponsor-logos**
   ```
   Name: sponsor-logos
   Public bucket: ✅ Yes
   File size limit: 5 MB
   Allowed MIME types: image/*
   ```

3. **确认创建**
   - 每个 bucket 创建后，应该出现在列表中
   - 状态应该显示为 "Public"

## ✅ 验证设置

### 测试 1：检查环境变量

1. 重启开发服务器（如果正在运行）
   ```bash
   # 停止当前服务器 (Ctrl+C)
   # 然后重新启动
   pnpm dev
   ```

2. 打开浏览器控制台（F12）
3. 如果看到警告：`⚠️ Supabase credentials not found`，说明环境变量未正确加载
4. 如果没有警告，说明配置成功

### 测试 2：访问 Admin 页面

1. 启动开发服务器：`pnpm dev`
2. 访问：`http://localhost:3000/admin`
3. 登录（默认密码：`msbc2026`）
4. 查看页面顶部，应该看到：
   - ✅ **"Supabase Connected"** - 如果配置成功
   - ⚠️ **"Using Local Storage"** - 如果 Supabase 未配置

### 测试 3：测试数据库连接

1. 在 Admin 页面，点击 "Speakers"
2. 点击 "Add Speaker"
3. 填写信息并保存
4. 如果保存成功且数据出现在列表中，说明数据库连接正常

## 🆘 常见问题

### Q1: 找不到 Settings/API 菜单

**解决方案：**
- 确保你在项目 Dashboard 页面（不是组织页面）
- 尝试刷新页面（F5）
- 检查 URL 是否正确：`https://app.supabase.com/project/[项目ID]`

### Q2: 看不到 service_role key

**解决方案：**
- `service_role` key 默认是隐藏的，点击 "Reveal" 按钮显示
- 如果不需要服务器端操作，可以暂时不配置
- 前端只需要 `anon` key

### Q3: 环境变量不生效

**解决方案：**
- 确保文件名为 `.env.local`（不是 `.env`）
- 确保文件在项目根目录（与 `package.json` 同级）
- 重启开发服务器
- 检查变量名是否正确：`VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`

### Q4: SQL 迁移失败

**解决方案：**
- 检查错误信息，可能是表已存在
- 如果表已存在，可以跳过创建表的语句
- 或者先删除现有表（谨慎操作）

### Q5: Storage bucket 创建失败

**解决方案：**
- 确保 bucket 名称是唯一的
- 检查是否已经存在同名 bucket
- 确保选择了 "Public bucket"

## 📞 需要帮助？

如果以上步骤都无法解决问题：

1. **检查 Supabase 文档**
   - https://supabase.com/docs/guides/getting-started

2. **查看项目状态**
   - 确保项目状态是 "Active"
   - 检查是否有任何错误提示

3. **联系支持**
   - Supabase Discord: https://discord.supabase.com
   - Supabase GitHub: https://github.com/supabase/supabase

## 🎉 完成！

设置完成后，你可以：
- ✅ 在 Admin 页面管理内容
- ✅ 上传图片到 Supabase Storage
- ✅ 数据会持久保存到 Supabase 数据库
- ✅ 多个管理员可以同时编辑内容
