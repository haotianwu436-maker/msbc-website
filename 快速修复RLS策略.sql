-- ============================================
-- 快速修复 RLS 策略 - 允许公开写入
-- ============================================
-- 在 Supabase Dashboard > SQL Editor 中执行此文件
-- ============================================

-- 1. 删除旧的认证策略
DROP POLICY IF EXISTS "Allow authenticated write access" ON speakers;
DROP POLICY IF EXISTS "Allow authenticated write access" ON sponsors;
DROP POLICY IF EXISTS "Allow authenticated write access" ON agenda_items;
DROP POLICY IF EXISTS "Allow authenticated write access" ON faq_items;

-- 2. 创建新的公开写入策略
CREATE POLICY "Allow public write access" ON speakers FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON sponsors FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON agenda_items FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON faq_items FOR ALL USING (true);

-- 3. 配置 Storage Buckets（如果还没有创建）
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('images', 'images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('posters', 'posters', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('speaker-photos', 'speaker-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('sponsor-logos', 'sponsor-logos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- 4. 配置 Storage Policies（允许公开上传）
-- 删除旧的 Storage 策略（如果存在）
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public upload access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete access" ON storage.objects;

-- 创建新的 Storage 策略
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));

CREATE POLICY "Allow public upload access" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));

CREATE POLICY "Allow public update access" ON storage.objects
  FOR UPDATE USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));

CREATE POLICY "Allow public delete access" ON storage.objects
  FOR DELETE USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));

-- 5. 验证策略已创建
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('speakers', 'sponsors', 'agenda_items', 'faq_items')
ORDER BY tablename, policyname;
