-- ============================================
-- 修复 Supabase Storage 权限问题
-- ============================================
-- 在 Supabase Dashboard > SQL Editor 中执行此文件
-- ============================================

-- 1. 创建 Storage Buckets（如果还没有创建）
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('images', 'images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('posters', 'posters', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('speaker-photos', 'speaker-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('sponsor-logos', 'sponsor-logos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- 2. 删除旧的 Storage 策略（如果存在）
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public upload access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete access" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

-- 3. 创建新的 Storage 策略（允许公开上传）
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));

CREATE POLICY "Allow public upload access" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));

CREATE POLICY "Allow public update access" ON storage.objects
  FOR UPDATE USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));

CREATE POLICY "Allow public delete access" ON storage.objects
  FOR DELETE USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));

-- 4. 验证 Buckets 已创建
SELECT id, name, public, file_size_limit 
FROM storage.buckets 
WHERE id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos');
