# 如何找到 Supabase API Keys

## 📍 详细位置说明

### 方法 1：通过左侧菜单（最常用）

1. **登录 Supabase Dashboard**
   - 访问 https://app.supabase.com
   - 登录你的账号

2. **选择项目**
   - 在项目列表中，点击你的项目（如 `msbc-website`）
   - 确保进入项目 Dashboard 页面

3. **打开 Settings**
   - 在左侧边栏，找到 **⚙️ Settings** 图标
   - 点击它展开设置菜单
   - 点击 **API** 子菜单

4. **查看 API Keys**
   - 页面会显示：
     - **Project URL** - 在页面顶部
     - **Project API keys** - 在页面中间部分

### 方法 2：直接访问 URL

如果你知道项目 ID，可以直接访问：
```
https://app.supabase.com/project/[你的项目ID]/settings/api
```

**如何找到项目 ID：**
- 在项目 Dashboard 的 URL 中
- 或者在项目设置页面的 URL 中
- 格式类似：`abcdefghijklmnop`

### 方法 3：通过项目概览页

1. 在项目 Dashboard 首页
2. 找到 "Project Settings" 或 "Configuration" 卡片
3. 点击 "API Settings" 链接

## 🔑 API Keys 说明

### anon public key（必需）

- **用途**: 前端应用使用
- **权限**: 受 RLS (Row Level Security) 限制
- **位置**: 在 "Project API keys" 部分，标记为 `anon` `public`
- **格式**: 以 `eyJhbGc...` 开头的长字符串
- **操作**: 点击旁边的 📋 复制按钮

### service_role secret key（可选）

- **用途**: 服务器端使用，有完整权限
- **权限**: 绕过 RLS，可以访问所有数据
- **位置**: 在 `anon` key 下方，标记为 `service_role` `secret`
- **格式**: 以 `eyJhbGc...` 开头的长字符串
- **操作**: 
  1. 点击 👁️ "Reveal" 按钮显示密钥
  2. 然后点击 📋 复制按钮
- **⚠️ 警告**: 不要在前端代码中使用此密钥！

## 📸 界面参考

```
┌─────────────────────────────────────────────────────┐
│  Supabase Dashboard                                 │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [左侧菜单]                                          │
│  📊 Table Editor                                    │
│  📝 SQL Editor                                      │
│  🔐 Authentication                                  │
│  📦 Storage                                         │
│  ⚙️ Settings  ⬅️ 点击这里                          │
│     └─ API  ⬅️ 然后点击这里                         │
│                                                      │
│  [主内容区]                                         │
│                                                      │
│  Project URL                                        │
│  ┌────────────────────────────────────────────┐   │
│  │ https://xxxxxxxxxxxxx.supabase.co          │   │
│  │ [📋 Copy]                                  │   │
│  └────────────────────────────────────────────┘   │
│                                                      │
│  Project API keys                                   │
│                                                      │
│  anon public                                        │
│  ┌────────────────────────────────────────────┐   │
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...    │   │
│  │ [📋 Copy]                                  │   │
│  └────────────────────────────────────────────┘   │
│                                                      │
│  service_role secret                                 │
│  ┌────────────────────────────────────────────┐   │
│  │ [👁️ Reveal]                                │   │
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...    │   │
│  │ [📋 Copy]                                  │   │
│  └────────────────────────────────────────────┘   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## ❓ 常见问题

### Q: 我看不到 Settings 菜单

**可能原因：**
1. 你不在项目页面，而是在组织页面
   - **解决**: 点击项目名称进入项目 Dashboard

2. 浏览器窗口太小，菜单被折叠
   - **解决**: 点击左上角的 ☰ 菜单按钮展开

3. 权限问题
   - **解决**: 确保你是项目的所有者或管理员

### Q: API 页面是空的

**可能原因：**
1. 项目还在创建中
   - **解决**: 等待项目状态变为 "Active"

2. 网络问题
   - **解决**: 刷新页面（F5）

### Q: 找不到 service_role key

**说明：**
- `service_role` key 默认是隐藏的
- 点击 "Reveal" 按钮才能看到
- 如果只是前端使用，可以暂时不配置

### Q: 复制按钮不工作

**解决：**
- 手动选中密钥文本
- 按 `Ctrl+C` (Windows) 或 `Cmd+C` (Mac) 复制

## ✅ 验证配置

配置完成后，检查：

1. **Project URL** 格式正确
   - ✅ 应该以 `https://` 开头
   - ✅ 应该以 `.supabase.co` 结尾
   - ✅ 中间是项目 ID

2. **anon key** 格式正确
   - ✅ 应该以 `eyJ` 开头（Base64 编码的 JWT）
   - ✅ 长度约 200+ 字符

3. **环境变量文件**
   - ✅ `.env.local` 文件存在
   - ✅ 文件在项目根目录
   - ✅ 变量名正确：`VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`

## 🎯 下一步

配置好 API keys 后，继续：
1. ✅ 创建 `.env.local` 文件
2. ✅ 填入 API keys
3. ✅ 运行数据库迁移
4. ✅ 创建 Storage buckets
5. ✅ 测试 Admin 页面

详细步骤请查看 [`SUPABASE_QUICK_START.md`](./SUPABASE_QUICK_START.md)
