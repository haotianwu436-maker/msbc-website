# 🔧 修复 Vercel 环境变量配置

## 问题诊断

浏览器控制台显示：
```
⚠️ Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
Uncaught Error: supabaseUrl is required.
```

**原因**：Vercel 部署时没有读取到环境变量。

---

## ✅ 解决方案：在 Vercel 配置环境变量

### 步骤 1: 打开 Vercel Dashboard

1. 访问 https://vercel.com/dashboard
2. 登录你的账号
3. 找到并点击项目 `msbc-website-vercel`

### 步骤 2: 进入项目设置

1. 点击项目名称进入项目页面
2. 点击顶部导航栏的 **`Settings`**（设置）
3. 在左侧菜单中找到 **`Environment Variables`**（环境变量）

### 步骤 3: 添加环境变量

#### 添加第一个变量：`VITE_SUPABASE_URL`

1. 点击 **`Add New`**（添加新变量）
2. 在 **`Key`**（键）输入框输入：
   ```
   VITE_SUPABASE_URL
   ```
3. 在 **`Value`**（值）输入框输入：
   - 打开你的 `.env.local` 文件
   - 复制 `VITE_SUPABASE_URL=` 后面的内容（例如：`https://xxxxx.supabase.co`）
   - 粘贴到 Vercel 的 Value 输入框
4. 在 **`Environment`**（环境）选择：
   - ✅ Production（生产环境）
   - ✅ Preview（预览环境）
   - ✅ Development（开发环境）
   - **全选三个环境！**
5. 点击 **`Save`**（保存）

#### 添加第二个变量：`VITE_SUPABASE_ANON_KEY`

1. 再次点击 **`Add New`**（添加新变量）
2. 在 **`Key`**（键）输入框输入：
   ```
   VITE_SUPABASE_ANON_KEY
   ```
3. 在 **`Value`**（值）输入框输入：
   - 打开你的 `.env.local` 文件
   - 复制 `VITE_SUPABASE_ANON_KEY=` 后面的内容（一长串字符）
   - 粘贴到 Vercel 的 Value 输入框
4. 在 **`Environment`**（环境）选择：
   - ✅ Production（生产环境）
   - ✅ Preview（预览环境）
   - ✅ Development（开发环境）
   - **全选三个环境！**
5. 点击 **`Save`**（保存）

### 步骤 4: 确认环境变量已添加

你应该看到两个环境变量：
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

每个变量都应该有三个环境标签：`Production`, `Preview`, `Development`

### 步骤 5: 重新部署

#### 方法 1: 手动触发重新部署（推荐）

1. 在 Vercel Dashboard，点击顶部导航栏的 **`Deployments`**（部署）
2. 找到最新的部署记录
3. 点击部署记录右侧的 **`...`**（三个点）
4. 选择 **`Redeploy`**（重新部署）
5. 确认重新部署

#### 方法 2: 推送新代码触发自动部署

```bash
git commit --allow-empty -m "触发重新部署"
git push origin main
```

### 步骤 6: 等待部署完成

1. 部署通常需要 1-3 分钟
2. 在 `Deployments` 页面可以看到部署进度
3. 部署完成后，状态会变成绿色的 **`Ready`**（就绪）

### 步骤 7: 测试网站

1. 访问你的网站 URL
2. 按 `F12` 打开开发者工具
3. 查看 `Console`（控制台）
4. **应该不再看到** `supabaseUrl is required` 错误
5. 网站应该正常显示内容

---

## 🔍 如何找到你的 Supabase 凭证

### 如果找不到 `.env.local` 文件：

1. **打开 Supabase Dashboard**
   - 访问 https://supabase.com/dashboard
   - 登录你的账号
   - 选择你的项目

2. **找到 API Keys**
   - 点击左侧菜单的 **`Settings`**（设置）
   - 点击 **`API`**
   - 在 **`Project API keys`** 部分可以看到：
     - **`URL`**：这就是 `VITE_SUPABASE_URL`
     - **`anon public`**：这就是 `VITE_SUPABASE_ANON_KEY`

3. **复制到 Vercel**
   - 复制 URL 到 Vercel 的 `VITE_SUPABASE_URL`
   - 复制 anon public key 到 Vercel 的 `VITE_SUPABASE_ANON_KEY`

---

## ⚠️ 常见问题

### Q1: 环境变量添加后还是报错？

**A**: 确保：
1. 环境变量名称完全正确（区分大小写）
2. 值没有多余的空格或引号
3. 选择了所有三个环境（Production, Preview, Development）
4. **重新部署了项目**（环境变量不会自动应用到已部署的版本）

### Q2: 如何确认环境变量已生效？

**A**: 
1. 重新部署后
2. 在浏览器控制台应该不再看到 Supabase 相关错误
3. 网站应该正常显示内容

### Q3: 其他错误（TronWeb、umami、Sentry）需要处理吗？

**A**: 不需要。这些是：
- **TronWeb**: 浏览器扩展（TronLink）的警告，不影响网站
- **umami**: 分析工具的错误，不影响网站功能
- **Sentry**: 错误追踪工具的错误，不影响网站功能

**主要问题只有 Supabase 环境变量！**

---

## 📝 检查清单

- [ ] 在 Vercel Dashboard 添加了 `VITE_SUPABASE_URL`
- [ ] 在 Vercel Dashboard 添加了 `VITE_SUPABASE_ANON_KEY`
- [ ] 两个变量都选择了所有三个环境（Production, Preview, Development）
- [ ] 重新部署了项目
- [ ] 部署完成后测试了网站
- [ ] 浏览器控制台不再显示 Supabase 错误

完成以上步骤后，网站应该可以正常显示了！
