# ✅ 下一步操作指南

## 你已经完成：
- ✅ 创建 Supabase 项目
- ✅ 找到 API Keys

## 现在需要做的：

### 步骤 1：创建环境变量文件（1 分钟）

1. **在项目根目录创建 `.env.local` 文件**
   
   在项目根目录（与 `package.json` 同级）创建文件：
   
   **Windows PowerShell:**
   ```powershell
   New-Item -Path .env.local -ItemType File
   ```
   
   **或者手动创建：**
   - 在文件管理器中，进入项目根目录
   - 创建新文件，命名为 `.env.local`（注意前面的点）

2. **编辑 `.env.local`，填入你的 Supabase 信息**
   
   打开 `.env.local` 文件，填入以下内容：
   
   ```env
   VITE_SUPABASE_URL=https://你的项目ID.supabase.co
   VITE_SUPABASE_ANON_KEY=你的anon_public密钥
   ```
   
   **示例：**
   ```env
   VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   
   ⚠️ **重要提示：**
   - 确保 URL 和 Key 之间没有多余的空格
   - 确保 Key 是完整的（通常很长，200+ 字符）
   - 不要添加引号

3. **保存文件**
   - 保存 `.env.local` 文件
   - 确保文件在项目根目录

### 步骤 2：验证环境变量（30 秒）

1. **重启开发服务器**（如果正在运行）
   ```bash
   # 按 Ctrl+C 停止当前服务器
   # 然后重新启动
   pnpm dev
   ```

2. **检查控制台**
   - 打开浏览器开发者工具（F12）
   - 查看 Console 标签
   - 如果没有看到 Supabase 警告，说明配置成功 ✅
   - 如果看到警告，检查 `.env.local` 文件格式

### 步骤 3：运行数据库迁移（2 分钟）

1. **打开 Supabase SQL Editor**
   - 在 Supabase Dashboard 左侧菜单
   - 点击 **SQL Editor**
   - 或访问：`https://app.supabase.com/project/[你的项目ID]/sql`

2. **创建新查询**
   - 点击 "New query" 按钮

3. **复制并执行 SQL**
   - 打开项目中的文件：`supabase/migrations/001_initial_schema.sql`
   - 复制全部内容（Ctrl+A, Ctrl+C）
   - 粘贴到 SQL Editor（Ctrl+V）
   - 点击 "Run" 按钮或按 `Ctrl+Enter`

4. **确认成功**
   - 应该看到 "Success" 消息
   - 如果有错误，查看错误信息

### 步骤 4：创建 Storage Buckets（2 分钟）

1. **打开 Storage**
   - 在 Supabase Dashboard 左侧菜单
   - 点击 **Storage**

2. **创建 4 个 Buckets**
   
   点击 "New bucket" 按钮，依次创建：
   
   **Bucket 1: images**
   - Name: `images`
   - ✅ Public bucket: **Yes**（勾选）
   - File size limit: `5 MB`
   - Allowed MIME types: `image/*`
   
   **Bucket 2: posters**
   - Name: `posters`
   - ✅ Public bucket: **Yes**
   - File size limit: `5 MB`
   - Allowed MIME types: `image/*`
   
   **Bucket 3: speaker-photos**
   - Name: `speaker-photos`
   - ✅ Public bucket: **Yes**
   - File size limit: `5 MB`
   - Allowed MIME types: `image/*`
   
   **Bucket 4: sponsor-logos**
   - Name: `sponsor-logos`
   - ✅ Public bucket: **Yes**
   - File size limit: `5 MB`
   - Allowed MIME types: `image/*`

3. **确认创建**
   - 每个 bucket 创建后应该出现在列表中
   - 状态应该显示为 "Public"

### 步骤 5：测试 Admin 页面（1 分钟）

1. **启动开发服务器**
   ```bash
   pnpm dev
   ```

2. **访问 Admin 页面**
   - 打开浏览器访问：`http://localhost:3000/admin`
   - 默认密码：`msbc2026`

3. **检查连接状态**
   - 登录后，查看页面顶部
   - 应该看到：**"Supabase Connected"** ✅
   - 如果看到 "Using Local Storage"，说明环境变量未正确加载

4. **测试功能**
   - 点击 "Speakers"
   - 点击 "Add Speaker"
   - 填写信息并保存
   - 如果保存成功，说明一切正常！

## ✅ 完成检查清单

- [ ] 创建了 `.env.local` 文件
- [ ] 填入了 `VITE_SUPABASE_URL`
- [ ] 填入了 `VITE_SUPABASE_ANON_KEY`
- [ ] 重启了开发服务器
- [ ] 运行了数据库迁移 SQL
- [ ] 创建了 4 个 Storage buckets
- [ ] Admin 页面显示 "Supabase Connected"
- [ ] 测试创建了一个 Speaker

## 🆘 如果遇到问题

### 问题 1：环境变量不生效
- ✅ 确保文件名为 `.env.local`（不是 `.env`）
- ✅ 确保文件在项目根目录
- ✅ 重启开发服务器
- ✅ 检查变量名是否正确

### 问题 2：SQL 迁移失败
- ✅ 检查错误信息
- ✅ 确保项目状态是 "Active"
- ✅ 如果表已存在，可以跳过

### 问题 3：Storage bucket 创建失败
- ✅ 确保 bucket 名称正确
- ✅ 确保选择了 "Public bucket"
- ✅ 检查是否已存在同名 bucket

## 🎉 完成！

设置完成后，你就可以：
- ✅ 在 Admin 页面管理所有内容
- ✅ 上传图片到 Supabase Storage
- ✅ 数据会持久保存到 Supabase 数据库
- ✅ 多个管理员可以同时编辑

需要帮助？告诉我你卡在哪一步！
