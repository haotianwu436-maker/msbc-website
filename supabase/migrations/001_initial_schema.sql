-- MSBC Website Database Schema
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated write access" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- 2. Speakers Table
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
-- Allow public write access for admin panel (in production, use proper auth)
CREATE POLICY "Allow public write access" ON speakers FOR ALL USING (true);

-- 3. Sponsors Table
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
-- Allow public write access for admin panel (in production, use proper auth)
CREATE POLICY "Allow public write access" ON sponsors FOR ALL USING (true);

-- 4. Agenda Items Table
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
-- Allow public write access for admin panel (in production, use proper auth)
CREATE POLICY "Allow public write access" ON agenda_items FOR ALL USING (true);

-- 5. FAQ Items Table
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
-- Allow public write access for admin panel (in production, use proper auth)
CREATE POLICY "Allow public write access" ON faq_items FOR ALL USING (true);

-- 6. Posters Table
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

-- 7. Contact Links Table
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

-- 8. Universities Table
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_speakers_featured ON speakers(featured);
CREATE INDEX IF NOT EXISTS idx_speakers_sort_order ON speakers(sort_order);
CREATE INDEX IF NOT EXISTS idx_sponsors_tier ON sponsors(tier);
CREATE INDEX IF NOT EXISTS idx_sponsors_display_order ON sponsors(display_order);
CREATE INDEX IF NOT EXISTS idx_agenda_items_date ON agenda_items(date);
CREATE INDEX IF NOT EXISTS idx_agenda_items_sort_order ON agenda_items(sort_order);
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(category);
CREATE INDEX IF NOT EXISTS idx_faq_items_sort_order ON faq_items(sort_order);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_speakers_updated_at BEFORE UPDATE ON speakers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON sponsors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agenda_items_updated_at BEFORE UPDATE ON agenda_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_items_updated_at BEFORE UPDATE ON faq_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posters_updated_at BEFORE UPDATE ON posters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_links_updated_at BEFORE UPDATE ON contact_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON universities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Storage Buckets Configuration
-- ============================================

-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('images', 'images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('posters', 'posters', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('speaker-photos', 'speaker-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('sponsor-logos', 'sponsor-logos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- Storage Policies: Allow public read access
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));

-- Storage Policies: Allow public upload access
CREATE POLICY "Allow public upload access" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));

-- Storage Policies: Allow public update access
CREATE POLICY "Allow public update access" ON storage.objects
  FOR UPDATE USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));

-- Storage Policies: Allow public delete access
CREATE POLICY "Allow public delete access" ON storage.objects
  FOR DELETE USING (bucket_id IN ('images', 'posters', 'speaker-photos', 'sponsor-logos'));
