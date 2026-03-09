# Supabase 数据库设置指南

## 第一步：创建 Supabase 项目

1. 访问 https://supabase.com 并注册/登录
2. 点击 "New Project"
3. 填写项目信息：
   - Name: `msbc-website`
   - Database Password: （设置一个强密码）
   - Region: 选择离你最近的区域
4. 等待项目创建完成（约 2 分钟）

## 第二步：获取 API 密钥

### 详细步骤：

1. **进入项目设置**
   - 在 Supabase Dashboard 左侧菜单栏，找到并点击 **Settings**（设置图标）
   - 然后点击 **API** 子菜单

2. **找到 Project URL**
   - 在页面顶部或 "Project URL" 部分
   - 格式类似：`https://xxxxxxxxxxxxx.supabase.co`
   - 复制这个 URL

3. **找到 API Keys**
   - 向下滚动到 "Project API keys" 部分
   - 你会看到两个 key：
     - **`anon` `public`** - 这是公开的客户端密钥（前端使用）
     - **`service_role` `secret`** - 这是服务端密钥（⚠️ 保密，不要暴露给前端）

4. **如果看不到 service_role key**
   - 点击 **`service_role`** 旁边的眼睛图标 👁️ 来显示密钥
   - 或者点击 "Reveal" 按钮
   - ⚠️ **注意**: `service_role` key 有完整权限，不要在前端代码中使用！

5. **复制密钥**
   - 点击密钥旁边的复制图标 📋
   - 或者手动选中并复制

### 如果仍然找不到：

**方法 1：检查项目是否已创建**
- 确保你已经创建了 Supabase 项目
- 项目创建需要几分钟时间，等待项目状态变为 "Active"

**方法 2：使用不同的导航路径**
- 尝试：左侧菜单 → **Project Settings** → **API**
- 或者：点击项目名称 → **Settings** → **API**

**方法 3：查看页面 URL**
- 确保你在正确的项目页面
- URL 应该类似：`https://app.supabase.com/project/your-project-id/settings/api`

### 截图参考位置：

```
Supabase Dashboard
├── [左侧菜单]
│   ├── Table Editor
│   ├── SQL Editor
│   ├── Authentication
│   ├── Storage
│   └── Settings ⬅️ 点击这里
│       └── API ⬅️ 然后点击这里
│           ├── Project URL: https://xxx.supabase.co
│           └── Project API keys:
│               ├── anon public: eyJhbGc... ⬅️ 复制这个
│               └── service_role secret: eyJhbGc... ⬅️ 点击眼睛显示
```

## 第三步：配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **注意**: `.env.local` 文件已添加到 `.gitignore`，不会被提交到 Git。

## 第四步：创建数据库表

在 Supabase Dashboard 中，进入 **SQL Editor**，执行以下 SQL：

### 1. Site Settings 表

```sql
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 启用 Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取
CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT USING (true);

-- 仅允许认证用户写入（后续配置）
CREATE POLICY "Allow authenticated write access" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');
```

### 2. Speakers 表

```sql
CREATE TABLE IF NOT EXISTS speakers (
  speaker_id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  photo TEXT,
  title TEXT NOT NULL,
  organisation TEXT NOT NULL,
  short_bio TEXT,
  topic_tags TEXT[] DEFAULT '{}',
  social_links JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON speakers FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write access" ON speakers FOR ALL USING (auth.role() = 'authenticated');
```

### 3. Sponsors 表

```sql
CREATE TABLE IF NOT EXISTS sponsors (
  sponsor_id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  logo TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('title', 'platinum', 'gold', 'silver', 'community_partner', 'university_partner', 'media_partner')),
  website_url TEXT,
  short_description TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON sponsors FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write access" ON sponsors FOR ALL USING (auth.role() = 'authenticated');
```

### 4. Agenda Items 表

```sql
CREATE TABLE IF NOT EXISTS agenda_items (
  session_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  format TEXT NOT NULL CHECK (format IN ('keynote', 'panel', 'workshop', 'fireside_chat', 'hackathon_session')),
  track TEXT NOT NULL,
  stage TEXT NOT NULL,
  speaker_ids TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE agenda_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON agenda_items FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write access" ON agenda_items FOR ALL USING (auth.role() = 'authenticated');
```

### 5. FAQ Items 表

```sql
CREATE TABLE IF NOT EXISTS faq_items (
  faq_id TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('general', 'registration', 'hackathon', 'sponsorship', 'university')),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON faq_items FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write access" ON faq_items FOR ALL USING (auth.role() = 'authenticated');
```

### 6. Posters 表

```sql
CREATE TABLE IF NOT EXISTS posters (
  poster_id TEXT PRIMARY KEY,
  title TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE posters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON posters FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write access" ON posters FOR ALL USING (auth.role() = 'authenticated');
```

### 7. Contact Links 表

```sql
CREATE TABLE IF NOT EXISTS contact_links (
  contact_id TEXT PRIMARY KEY,
  contact_type TEXT NOT NULL CHECK (contact_type IN ('sponsorship', 'media', 'community', 'general')),
  label TEXT NOT NULL,
  description TEXT,
  cta_label TEXT NOT NULL,
  email TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON contact_links FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write access" ON contact_links FOR ALL USING (auth.role() = 'authenticated');
```

### 8. Universities 表

```sql
CREATE TABLE IF NOT EXISTS universities (
  university_id TEXT PRIMARY KEY,
  university_name TEXT NOT NULL,
  logo TEXT,
  category TEXT NOT NULL CHECK (category IN ('organising', 'participating', 'student_club')),
  role_description TEXT,
  website_url TEXT,
  city TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON universities FOR SELECT USING (true);
CREATE POLICY "Allow authenticated write access" ON universities FOR ALL USING (auth.role() = 'authenticated');
```

## 第五步：创建 Storage Buckets

1. 进入 **Storage** 菜单
2. 创建以下 buckets（设置为 public）：
   - `images` - 通用图片
   - `posters` - 海报图片
   - `speaker-photos` - 演讲者照片
   - `sponsor-logos` - 赞助商 Logo

每个 bucket 设置：
- **Public bucket**: ✅ Yes
- **File size limit**: 5MB (可根据需要调整)
- **Allowed MIME types**: `image/*`

## 第六步：配置认证（可选）

如果需要更安全的 Admin 登录，可以：

1. 进入 **Authentication** > **Policies**
2. 创建管理员用户
3. 更新 RLS policies 以使用 `auth.uid()` 检查

## 第七步：导入初始数据

可以使用 Admin 页面的导入功能，或直接在 SQL Editor 中插入数据。

## 完成！

现在你的 Supabase 数据库已经配置完成，可以开始使用 Admin 页面管理内容了。
