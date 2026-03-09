# 创建 Supabase 管理员用户

## 步骤说明

### 方法 1: 使用 Supabase Dashboard（推荐，最简单）

1. **打开 Supabase Dashboard**
   - 访问：https://supabase.com/dashboard
   - 登录你的账号
   - 选择你的项目

2. **进入 Authentication 页面**
   - 点击左侧菜单的 **Authentication**
   - 点击 **Users** 标签

3. **创建新用户**
   - 点击右上角的 **Add user** 按钮
   - 选择 **Create new user**

4. **填写用户信息**
   - **Email**: 输入你的邮箱（例如：`admin@msbc.my` 或 `your-email@gmail.com`）
   - **Password**: 设置一个强密码（至少 8 位）
   - **Auto Confirm User**: ✅ **勾选这个选项**（重要！这样就不需要邮箱验证了）

5. **创建用户**
   - 点击 **Create user** 按钮

6. **完成！**
   - 现在你可以使用这个邮箱和密码登录 Admin 页面了

### 方法 2: 使用 SQL Editor（高级用户）

如果你熟悉 SQL，也可以直接在 SQL Editor 中执行：

```sql
-- 注意：这个方法比较复杂，推荐使用方法 1
-- 需要在 Supabase Dashboard > SQL Editor 中执行
```

## 登录 Admin 页面

创建用户后：

1. 刷新 Admin 页面
2. 在 **Email** 输入框中输入你创建的邮箱
3. 在 **Password** 输入框中输入你设置的密码
4. 点击 **Sign In**

## 如果 Supabase Auth 登录失败

系统会自动尝试简单密码验证（默认密码：`msbc2026`）

## 常见问题

### Q: 我没有 Supabase 账号怎么办？
A: 访问 https://supabase.com 注册一个免费账号

### Q: 我忘记密码了怎么办？
A: 在 Supabase Dashboard > Authentication > Users 中，点击用户旁边的菜单，选择 "Reset Password"

### Q: 我可以创建多个管理员用户吗？
A: 可以！在 Supabase Dashboard 中创建多个用户即可

### Q: 如果我不想使用 Supabase Auth 怎么办？
A: 不填写 `.env.local` 文件中的 Supabase 配置，系统会自动使用简单密码验证

## 安全提示

⚠️ **重要**：
- 使用强密码（至少 8 位，包含字母、数字和特殊字符）
- 不要分享你的管理员账号密码
- 定期更换密码
