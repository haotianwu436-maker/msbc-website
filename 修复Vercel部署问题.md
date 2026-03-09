# 🔧 修复 Vercel 部署问题

## 问题分析

网站显示深色/黑色页面，通常是因为：
1. JavaScript 文件没有正确加载
2. 构建输出目录不正确
3. 构建命令问题

## 解决方案

### 方案 1: 修改 Vercel 构建命令（推荐）

在 Vercel Dashboard：

1. **进入项目设置**
   - 点击项目 `msbc-website-vercel`
   - 点击 `Settings` → `General`

2. **修改 Build Command**
   - 找到 `Build Command`
   - 改为：`cd client && pnpm install && pnpm build`
   - 或者：`pnpm install && pnpm --filter . build:client`

3. **确认 Output Directory**
   - 应该是：`dist/public`

4. **保存并重新部署**

### 方案 2: 修改 package.json（如果方案 1 不行）

在 `package.json` 中添加一个专门用于 Vercel 的构建命令：

```json
{
  "scripts": {
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "build:client": "vite build",
    "build:vercel": "cd client && vite build"
  }
}
```

然后在 Vercel 中使用 `build:client` 命令。

---

## 快速检查清单

### 1. 检查浏览器控制台（必须）
1. 访问网站
2. 按 `F12` 打开开发者工具
3. 点击 `Console` 标签
4. **查看是否有错误**（红色文字）
5. 把错误信息告诉我

### 2. 检查 Vercel 构建日志（必须）
1. Vercel Dashboard → 项目 → `Deployments`
2. 点击最新的部署
3. 查看 `Build Logs`
4. **查看是否有错误**（红色文字）
5. 把错误信息告诉我

### 3. 检查文件是否正确生成
1. Vercel Dashboard → 项目 → `Deployments`
2. 点击最新的部署
3. 查看 `Source` 或 `Files`
4. 确认 `index.html` 存在
5. 确认 `assets` 文件夹存在

---

## 常见错误和解决方案

### 错误 1: "Cannot find module"
**原因**: 依赖未安装或路径错误
**解决**: 
- 检查 `installCommand` 是否正确
- 确认 `pnpm install` 成功执行

### 错误 2: "Build failed"
**原因**: 构建命令错误
**解决**: 
- 修改 Build Command 为：`cd client && pnpm install && vite build`
- 或者：`pnpm install && vite build`（如果 root 在 client）

### 错误 3: "404 Not Found"
**原因**: 输出目录错误
**解决**: 
- 确认 Output Directory 是 `dist/public`
- 确认 `index.html` 在输出目录中

---

## 需要的信息

请提供：
1. **浏览器控制台错误**（F12 → Console）
2. **Vercel 构建日志错误**（Deployments → Build Logs）
3. **构建是否成功**（绿色勾号还是红色叉号）

有了这些信息，我可以帮你快速定位问题！
