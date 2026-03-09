-- 添加 logos bucket 到 Supabase Storage
-- 如果已经运行过 001_initial_schema.sql，可以单独运行这个 SQL

-- 创建 logos bucket（如果不存在）
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('logos', 'logos', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- 更新存储策略以包含 logos bucket
-- 注意：如果策略已存在，需要先删除再创建，或者使用 CREATE OR REPLACE

-- 删除旧的策略（如果存在）
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public upload access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete access" ON storage.objects;

-- 创建新的策略（包含 logos）
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos', 'logos'));

CREATE POLICY "Allow public upload access" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos', 'logos'));

CREATE POLICY "Allow public update access" ON storage.objects
  FOR UPDATE USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos', 'logos'));

CREATE POLICY "Allow public delete access" ON storage.objects
  FOR DELETE USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos', 'logos'));
