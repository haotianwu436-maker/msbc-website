# 配置 Supabase Auth 登录验证

## 已完成的工作

✅ 创建了 `useSupabaseAuth` hook  
✅ 更新了 LoginScreen 组件支持 Supabase Auth  
✅ 更新了 Admin 组件以使用 Supabase Auth（如果配置了的话）

## 下一步：在 Supabase Dashboard 中创建管理员用户

### 方法 1: 使用 Supabase Dashboard（推荐）

1. 打开 Supabase Dashboard: https://supabase.com/dashboard
2. 选择你的项目
3. 进入 **Authentication** > **Users**
4. 点击 **Add user** > **Create new user**
5. 填写：
   - **Email**: 你的管理员邮箱（例如：admin@msbc.my）
   - **Password**: 设置一个强密码
   - **Auto Confirm User**: ✅ 勾选（自动确认用户，无需邮箱验证）
6. 点击 **Create user**

### 方法 2: 使用 SQL Editor

1. 进入 **SQL Editor**
2. 执行以下 SQL（替换邮箱和密码）：

```sql
-- 创建管理员用户
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@msbc.my', -- 替换为你的邮箱
  crypt('your-password-here', gen_salt('bf')), -- 替换为你的密码
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
```

**注意**: 上面的 SQL 方法比较复杂，推荐使用方法 1。

## 使用方法

1. 刷新 Admin 页面
2. 点击 "使用 Supabase 登录 →" 按钮
3. 输入你在 Supabase 中创建的用户邮箱和密码
4. 点击 "Sign In"

## 安全提示

⚠️ **重要**: 
- Supabase Auth 比简单密码验证更安全
- 支持密码重置、多用户管理等功能
- 如果 Supabase 未配置，会自动回退到简单密码验证

## 如果 Supabase Auth 未配置

如果 `.env.local` 中没有配置 Supabase URL 和 Key，系统会自动使用简单密码验证（默认密码：msbc2026）。
