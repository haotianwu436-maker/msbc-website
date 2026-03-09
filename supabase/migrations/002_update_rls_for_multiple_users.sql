-- Update RLS policies to require authentication for write operations
-- This ensures only authenticated users (created via Supabase Auth) can modify data
-- Run this after creating user accounts in Supabase Dashboard

-- 1. Update Speakers table RLS
DROP POLICY IF EXISTS "Allow public write access" ON speakers;
CREATE POLICY "Allow authenticated write access" ON speakers
  FOR ALL USING (auth.role() = 'authenticated');

-- 2. Update Sponsors table RLS
DROP POLICY IF EXISTS "Allow public write access" ON sponsors;
CREATE POLICY "Allow authenticated write access" ON sponsors
  FOR ALL USING (auth.role() = 'authenticated');

-- 3. Update Agenda Items table RLS
DROP POLICY IF EXISTS "Allow public write access" ON agenda_items;
CREATE POLICY "Allow authenticated write access" ON agenda_items
  FOR ALL USING (auth.role() = 'authenticated');

-- 4. Update FAQ Items table RLS
DROP POLICY IF EXISTS "Allow public write access" ON faq_items;
CREATE POLICY "Allow authenticated write access" ON faq_items
  FOR ALL USING (auth.role() = 'authenticated');

-- 5. Update Universities table RLS (if exists)
DROP POLICY IF EXISTS "Allow public write access" ON universities;
CREATE POLICY "Allow authenticated write access" ON universities
  FOR ALL USING (auth.role() = 'authenticated');

-- 6. Update Contact Links table RLS (if exists)
DROP POLICY IF EXISTS "Allow public write access" ON contact_links;
CREATE POLICY "Allow authenticated write access" ON contact_links
  FOR ALL USING (auth.role() = 'authenticated');

-- 7. Update Hero Sections table RLS (if exists)
DROP POLICY IF EXISTS "Allow public write access" ON hero_sections;
CREATE POLICY "Allow authenticated write access" ON hero_sections
  FOR ALL USING (auth.role() = 'authenticated');

-- 8. Update Posters table RLS (if exists)
DROP POLICY IF EXISTS "Allow public write access" ON posters;
CREATE POLICY "Allow authenticated write access" ON posters
  FOR ALL USING (auth.role() = 'authenticated');

-- Note: Public read access remains unchanged (anyone can view the website)
-- Only write operations require authentication
