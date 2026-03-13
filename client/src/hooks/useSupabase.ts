/**
 * Supabase Hooks for CMS
 * Provides data fetching and mutation functions for Admin and Frontend
 */

import { useState, useEffect, useCallback } from "react";
import { supabase, TABLES, STORAGE_BUCKETS } from "@/lib/supabase";
import type { Speaker, Sponsor, AgendaSession, FaqItem, ContactMethod, University } from "@/lib/data";

// ─── Generic Data Fetching Hook ────────────────────────────────────
export function useSupabaseData<T>(
  table: string,
  options?: {
    orderBy?: string;
    ascending?: boolean;
    filter?: Record<string, any>;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from(table).select("*");

      if (options?.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending ?? true });
      }

      if (options?.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { data: result, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setData((result as T[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch data"));
      console.error(`Error fetching ${table}:`, err);
    } finally {
      setLoading(false);
    }
  }, [table, options?.orderBy, options?.ascending, JSON.stringify(options?.filter)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ─── Data Transformers ────────────────────────────────────────────
// Convert between camelCase (TypeScript) and snake_case (database)

function speakerToDb(speaker: Partial<Speaker>): any {
  const db: any = {};
  if (speaker.speakerId !== undefined) db.speaker_id = speaker.speakerId;
  if (speaker.fullName !== undefined) db.full_name = speaker.fullName;
  if (speaker.photo !== undefined) db.photo = speaker.photo;
  if (speaker.title !== undefined) db.title = speaker.title;
  if (speaker.organisation !== undefined) db.organisation = speaker.organisation;
  if (speaker.shortBio !== undefined) db.short_bio = speaker.shortBio;
  if (speaker.topicTags !== undefined) db.topic_tags = speaker.topicTags;
  if (speaker.socialLinks !== undefined) db.social_links = speaker.socialLinks;
  if (speaker.featured !== undefined) db.featured = speaker.featured;
  if (speaker.sortOrder !== undefined) db.sort_order = speaker.sortOrder;
  return db;
}

function speakerFromDb(db: any): Speaker {
  return {
    speakerId: db.speaker_id,
    fullName: db.full_name,
    photo: db.photo || "",
    title: db.title,
    organisation: db.organisation,
    shortBio: db.short_bio || "",
    topicTags: db.topic_tags || [],
    socialLinks: db.social_links || [],
    featured: db.featured || false,
    sortOrder: db.sort_order || 0,
  };
}

function sponsorToDb(sponsor: Partial<Sponsor>): any {
  const db: any = {};
  if (sponsor.sponsorId !== undefined) db.sponsor_id = sponsor.sponsorId;
  if (sponsor.companyName !== undefined) db.company_name = sponsor.companyName;
  if (sponsor.logo !== undefined) db.logo = sponsor.logo;
  if (sponsor.tier !== undefined) db.tier = sponsor.tier;
  if (sponsor.websiteUrl !== undefined) db.website_url = sponsor.websiteUrl;
  if (sponsor.shortDescription !== undefined) db.short_description = sponsor.shortDescription;
  if (sponsor.featured !== undefined) db.featured = sponsor.featured;
  if (sponsor.displayOrder !== undefined) db.display_order = sponsor.displayOrder;
  return db;
}

function sponsorFromDb(db: any): Sponsor {
  return {
    sponsorId: db.sponsor_id,
    companyName: db.company_name,
    logo: db.logo || "",
    tier: db.tier,
    websiteUrl: db.website_url || "",
    shortDescription: db.short_description || "",
    featured: db.featured || false,
    displayOrder: db.display_order || 0,
  };
}

function agendaToDb(session: Partial<AgendaSession>): any {
  const db: any = {};
  if (session.sessionId !== undefined) db.session_id = session.sessionId;
  if (session.title !== undefined) db.title = session.title;
  if (session.shortDescription !== undefined) db.short_description = session.shortDescription;
  if (session.date !== undefined) db.date = session.date;
  if (session.startTime !== undefined) db.start_time = session.startTime;
  if (session.endTime !== undefined) db.end_time = session.endTime;
  if (session.format !== undefined) db.format = session.format;
  if (session.track !== undefined) db.track = session.track;
  if (session.stage !== undefined) db.stage = session.stage;
  if (session.speakerIds !== undefined) db.speaker_ids = session.speakerIds;
  if (session.featured !== undefined) db.featured = session.featured;
  if (session.sortOrder !== undefined) db.sort_order = session.sortOrder;
  return db;
}

function agendaFromDb(db: any): AgendaSession {
  return {
    sessionId: db.session_id,
    title: db.title,
    shortDescription: db.short_description || "",
    date: db.date,
    startTime: db.start_time,
    endTime: db.end_time,
    format: db.format,
    track: db.track,
    stage: db.stage,
    speakerIds: db.speaker_ids || [],
    featured: db.featured || false,
    sortOrder: db.sort_order || 0,
  };
}

function faqToDb(faq: Partial<FaqItem>): any {
  const db: any = {};
  if (faq.faqId !== undefined) db.faq_id = faq.faqId;
  if (faq.category !== undefined) db.category = faq.category;
  if (faq.question !== undefined) db.question = faq.question;
  if (faq.answer !== undefined) db.answer = faq.answer;
  if (faq.sortOrder !== undefined) db.sort_order = faq.sortOrder;
  return db;
}

function faqFromDb(db: any): FaqItem {
  return {
    faqId: db.faq_id,
    category: db.category,
    question: db.question,
    answer: db.answer,
    sortOrder: db.sort_order || 0,
  };
}

// ─── Speakers ─────────────────────────────────────────────────────
export function useSpeakers() {
  const { data: rawData, loading, error, refetch } = useSupabaseData<any>(TABLES.SPEAKERS, {
    orderBy: "sort_order",
    ascending: true,
  });

  const data = rawData.map(speakerFromDb);

  return { data, loading, error, refetch };
}

export async function createSpeaker(speaker: Omit<Speaker, "speakerId"> & { speakerId?: string }) {
  const speakerData = {
    ...speaker,
    speakerId: speaker.speakerId || `sp-${Date.now()}`,
  };
  const dbData = speakerToDb(speakerData);
  const { data, error } = await supabase.from(TABLES.SPEAKERS).insert([dbData]).select().single();
  if (error) throw error;
  return speakerFromDb(data);
}

export async function updateSpeaker(speakerId: string, updates: Partial<Speaker>) {
  const dbUpdates = speakerToDb(updates);
  const { data, error } = await supabase
    .from(TABLES.SPEAKERS)
    .update({ ...dbUpdates, updated_at: new Date().toISOString() })
    .eq("speaker_id", speakerId)
    .select()
    .single();
  if (error) throw error;
  return speakerFromDb(data);
}

export async function deleteSpeaker(speakerId: string) {
  const { error } = await supabase.from(TABLES.SPEAKERS).delete().eq("speaker_id", speakerId);
  if (error) throw error;
}

// ─── Sponsors ─────────────────────────────────────────────────────
export function useSponsors() {
  const { data: rawData, loading, error, refetch } = useSupabaseData<any>(TABLES.SPONSORS, {
    orderBy: "display_order",
    ascending: true,
  });

  const data = rawData.map(sponsorFromDb);

  return { data, loading, error, refetch };
}

export async function createSponsor(sponsor: Omit<Sponsor, "sponsorId"> & { sponsorId?: string }) {
  const sponsorData = {
    ...sponsor,
    sponsorId: sponsor.sponsorId || `spo-${Date.now()}`,
  };
  const dbData = sponsorToDb(sponsorData);
  const { data, error } = await supabase.from(TABLES.SPONSORS).insert([dbData]).select().single();
  if (error) throw error;
  return sponsorFromDb(data);
}

export async function updateSponsor(sponsorId: string, updates: Partial<Sponsor>) {
  const dbUpdates = sponsorToDb(updates);
  const { data, error } = await supabase
    .from(TABLES.SPONSORS)
    .update({ ...dbUpdates, updated_at: new Date().toISOString() })
    .eq("sponsor_id", sponsorId)
    .select()
    .single();
  if (error) throw error;
  return sponsorFromDb(data);
}

export async function deleteSponsor(sponsorId: string) {
  const { error } = await supabase.from(TABLES.SPONSORS).delete().eq("sponsor_id", sponsorId);
  if (error) throw error;
}

// ─── Agenda ───────────────────────────────────────────────────────
export function useAgendaSessions() {
  const { data: rawData, loading, error, refetch } = useSupabaseData<any>(TABLES.AGENDA_ITEMS, {
    orderBy: "sort_order",
    ascending: true,
  });

  const data = rawData.map(agendaFromDb);

  return { data, loading, error, refetch };
}

export async function createAgendaSession(session: Omit<AgendaSession, "sessionId"> & { sessionId?: string }) {
  const sessionData = {
    ...session,
    sessionId: session.sessionId || `ses-${Date.now()}`,
  };
  const dbData = agendaToDb(sessionData);
  const { data, error } = await supabase.from(TABLES.AGENDA_ITEMS).insert([dbData]).select().single();
  if (error) throw error;
  return agendaFromDb(data);
}

export async function updateAgendaSession(sessionId: string, updates: Partial<AgendaSession>) {
  const dbUpdates = agendaToDb(updates);
  const { data, error } = await supabase
    .from(TABLES.AGENDA_ITEMS)
    .update({ ...dbUpdates, updated_at: new Date().toISOString() })
    .eq("session_id", sessionId)
    .select()
    .single();
  if (error) throw error;
  return agendaFromDb(data);
}

export async function deleteAgendaSession(sessionId: string) {
  const { error } = await supabase.from(TABLES.AGENDA_ITEMS).delete().eq("session_id", sessionId);
  if (error) throw error;
}

// ─── FAQ ──────────────────────────────────────────────────────────
export function useFaqItems() {
  const { data: rawData, loading, error, refetch } = useSupabaseData<any>(TABLES.FAQ_ITEMS, {
    orderBy: "sort_order",
    ascending: true,
  });

  const data = rawData.map(faqFromDb);

  return { data, loading, error, refetch };
}

export async function createFaqItem(faq: Omit<FaqItem, "faqId"> & { faqId?: string }) {
  const faqData = {
    ...faq,
    faqId: faq.faqId || `faq-${Date.now()}`,
  };
  const dbData = faqToDb(faqData);
  const { data, error } = await supabase.from(TABLES.FAQ_ITEMS).insert([dbData]).select().single();
  if (error) throw error;
  return faqFromDb(data);
}

export async function updateFaqItem(faqId: string, updates: Partial<FaqItem>) {
  const dbUpdates = faqToDb(updates);
  const { data, error } = await supabase
    .from(TABLES.FAQ_ITEMS)
    .update({ ...dbUpdates, updated_at: new Date().toISOString() })
    .eq("faq_id", faqId)
    .select()
    .single();
  if (error) throw error;
  return faqFromDb(data);
}

export async function deleteFaqItem(faqId: string) {
  const { error } = await supabase.from(TABLES.FAQ_ITEMS).delete().eq("faq_id", faqId);
  if (error) throw error;
}

// ─── Universities ──────────────────────────────────────────────────
function universityToDb(university: Partial<University>): any {
  const db: any = {};
  if (university.universityId !== undefined) db.university_id = university.universityId;
  if (university.universityName !== undefined) db.university_name = university.universityName;
  if (university.logo !== undefined) db.logo = university.logo;
  if (university.category !== undefined) db.category = university.category;
  if (university.roleDescription !== undefined) db.role_description = university.roleDescription;
  if (university.websiteUrl !== undefined) db.website_url = university.websiteUrl;
  if (university.city !== undefined) db.city = university.city;
  if (university.displayOrder !== undefined) db.display_order = university.displayOrder;
  return db;
}

function universityFromDb(db: any): University {
  return {
    universityId: db.university_id,
    universityName: db.university_name,
    logo: db.logo || "",
    category: db.category,
    roleDescription: db.role_description || "",
    websiteUrl: db.website_url || "",
    city: db.city || "",
    displayOrder: db.display_order || 0,
  };
}

export function useUniversities() {
  const { data: rawData, loading, error, refetch } = useSupabaseData<any>(TABLES.UNIVERSITIES, {
    orderBy: "display_order",
    ascending: true,
  });

  const data = rawData.map(universityFromDb);

  return { data, loading, error, refetch };
}

export async function createUniversity(university: Omit<University, "universityId"> & { universityId?: string }) {
  const universityData = {
    ...university,
    universityId: university.universityId || `uni-${Date.now()}`,
  };
  const dbData = universityToDb(universityData);
  const { data, error } = await supabase.from(TABLES.UNIVERSITIES).insert([dbData]).select().single();
  if (error) throw error;
  return universityFromDb(data);
}

export async function updateUniversity(universityId: string, updates: Partial<University>) {
  const dbUpdates = universityToDb(updates);
  const { data, error } = await supabase
    .from(TABLES.UNIVERSITIES)
    .update({ ...dbUpdates, updated_at: new Date().toISOString() })
    .eq("university_id", universityId)
    .select()
    .single();
  if (error) throw error;
  return universityFromDb(data);
}

export async function deleteUniversity(universityId: string) {
  const { error } = await supabase.from(TABLES.UNIVERSITIES).delete().eq("university_id", universityId);
  if (error) throw error;
}

// ─── Image Upload ──────────────────────────────────────────────────
export async function uploadImage(
  file: File,
  bucket: keyof typeof STORAGE_BUCKETS,
  path?: string
): Promise<string> {
  const fileName = path || `${Date.now()}-${file.name}`;
  const bucketName = STORAGE_BUCKETS[bucket];

  const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw error;

  // Get public URL
  const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
  return urlData.publicUrl;
}

export async function deleteImage(bucket: keyof typeof STORAGE_BUCKETS, path: string) {
  const bucketName = STORAGE_BUCKETS[bucket];
  const { error } = await supabase.storage.from(bucketName).remove([path]);
  if (error) throw error;
}

// ─── Site Settings ─────────────────────────────────────────────────
export async function getSiteSetting(key: string) {
  const { data, error } = await supabase.from(TABLES.SITE_SETTINGS).select("value").eq("key", key).single();
  if (error) throw error;
  return data?.value;
}

export async function setSiteSetting(key: string, value: any) {
  const { data, error } = await supabase
    .from(TABLES.SITE_SETTINGS)
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" })
    .select()
    .single();
  if (error) throw error;
  return data;
}
