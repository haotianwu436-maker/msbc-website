/**
 * Supabase Client Configuration
 * 
 * Setup Instructions:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Get your project URL and anon key from Settings > API
 * 3. Create a .env.local file in the project root with:
 *    VITE_SUPABASE_URL=your-project-url
 *    VITE_SUPABASE_ANON_KEY=your-anon-key
 * 4. For admin authentication, create a service role key (keep it secret!)
 *    VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (only for server-side)
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️ Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local"
  );
  console.warn(
    "📖 设置指南: 查看 SUPABASE_QUICK_START.md 获取详细步骤"
  );
}

// Create Supabase client for public access
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Database table names
export const TABLES = {
  SITE_SETTINGS: "site_settings",
  SPEAKERS: "speakers",
  SPONSORS: "sponsors",
  AGENDA_ITEMS: "agenda_items",
  FAQ_ITEMS: "faq_items",
  POSTERS: "posters",
  HERO_SECTIONS: "hero_sections",
  CONTACT_LINKS: "contact_links",
  UNIVERSITIES: "universities",
} as const;

// Storage bucket names
export const STORAGE_BUCKETS = {
  IMAGES: "images",
  POSTERS: "posters",
  SPEAKER_PHOTOS: "speaker-photos",
  SPONSOR_LOGOS: "sponsor-logos",
  LOGOS: "logos", // For university logos
} as const;

// ─── Image Upload Helper ──────────────────────────────────────────
/**
 * Upload an image file to Supabase Storage
 * @param file - The file to upload
 * @param bucket - The bucket name (key from STORAGE_BUCKETS)
 * @returns The public URL of the uploaded file
 */
export async function uploadImage(
  file: File,
  bucket: keyof typeof STORAGE_BUCKETS
): Promise<string> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase credentials not configured");
  }

  const bucketName = STORAGE_BUCKETS[bucket];
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${bucketName}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    throw new Error(`上传失败: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}
