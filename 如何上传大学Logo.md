# 📸 如何上传大学 Logo（简单方法）

## ✅ 新功能：图片上传

现在你可以**直接上传图片**，不需要手动输入 URL 了！

---

## 🚀 使用步骤

### 方法 1：图片上传（推荐，最简单）

1. **进入 Admin 页面**
   - 访问：`你的网站域名/admin`
   - 登录你的账号

2. **编辑大学信息**
   - 点击左侧菜单的 **"Universities"**
   - 找到要编辑的大学（例如：Xiamen University）
   - 点击右侧的 **→** 按钮进入编辑模式

3. **上传 Logo**
   - 在编辑页面，你会看到 **"Logo Upload"** 区域
   - **方式 1：点击上传**
     - 点击上传区域
     - 选择图片文件（JPG、PNG、WebP）
     - 最大 2MB
   - **方式 2：拖拽上传**
     - 直接将图片文件拖拽到上传区域
     - 松开鼠标即可上传

4. **等待上传完成**
   - 上传过程中会显示加载动画
   - 上传成功后，Logo URL 会自动填充
   - 你会看到图片预览

5. **保存**
   - Logo URL 会自动保存
   - 可以继续编辑其他信息
   - 完成后点击 "Back" 返回列表

---

### 方法 2：手动输入 URL（备选）

如果图片已经在网上（例如：从其他网站复制图片链接）：

1. 在 **"Logo URL"** 输入框中
2. 粘贴图片的完整 URL
3. 例如：`https://example.com/logo.png`

---

## 📋 图片要求

- **格式**：JPG、PNG、WebP
- **大小**：最大 2MB
- **建议尺寸**：200x200 像素或更高（正方形）
- **背景**：透明背景 PNG 最佳

---

## ⚠️ 注意事项

### 如果看不到上传功能：

**原因**：Supabase 未配置或未连接

**解决方法**：
1. 检查 Vercel 环境变量是否配置正确
2. 确认 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY` 已设置
3. 如果未配置，会显示 "Logo URL" 输入框（手动输入方式）

### 上传失败：

**可能原因**：
1. 图片太大（超过 2MB）
2. 图片格式不支持
3. Supabase Storage 未配置 "logos" bucket

**解决方法**：
1. 压缩图片（使用在线工具如 TinyPNG）
2. 转换为支持的格式（JPG、PNG、WebP）
3. 检查 Supabase Storage 中是否有 "logos" bucket

---

## 🔧 配置 Supabase Storage Bucket（如果需要）

如果上传功能不可用，需要创建 "logos" bucket：

1. **打开 Supabase Dashboard**
   - 访问 https://supabase.com/dashboard
   - 选择你的项目

2. **创建 Storage Bucket**
   - 点击左侧菜单 **"Storage"**
   - 点击 **"New bucket"**
   - 名称输入：`logos`
   - 选择 **"Public bucket"**（公开访问）
   - 点击 **"Create bucket"**

3. **设置权限**
   - 点击 "logos" bucket
   - 点击 **"Policies"** 标签
   - 添加策略：
     - **Policy name**: `Allow public read`
     - **Allowed operation**: `SELECT`
     - **Target roles**: `anon`, `authenticated`
     - **USING expression**: `true`
   - 添加策略：
     - **Policy name**: `Allow authenticated upload`
     - **Allowed operation**: `INSERT`
     - **Target roles**: `authenticated`
     - **USING expression**: `true`

4. **重新测试**
   - 刷新 Admin 页面
   - 再次尝试上传 Logo

---

## 💡 使用技巧

### 1. 批量上传
- 可以一次编辑一个大学，上传 Logo
- 然后继续编辑下一个

### 2. 预览功能
- 上传后可以立即看到预览
- 如果不满意，可以点击 "更换图片" 重新上传

### 3. 手动编辑 URL
- 上传后，Logo URL 会自动填充
- 如果需要，可以手动编辑 URL（例如：使用 CDN 链接）

---

## 🎯 快速操作流程

```
1. Admin → Universities
2. 点击大学 → 编辑
3. 拖拽图片到上传区域
4. 等待上传完成
5. 点击 Back 返回
✅ 完成！
```

---

## ❓ 常见问题

### Q: 上传后图片不显示？
**A**: 检查：
1. Logo URL 是否正确
2. 图片是否公开访问
3. 浏览器控制台是否有错误

### Q: 可以上传多个 Logo 吗？
**A**: 每个大学只能有一个 Logo。如果需要更换，重新上传即可。

### Q: 上传的图片存储在哪里？
**A**: 存储在 Supabase Storage 的 "logos" bucket 中。

### Q: 图片会被压缩吗？
**A**: 不会自动压缩。建议上传前先压缩图片以获得更好的性能。

---

**现在试试上传 Logo 吧！** 🎉
