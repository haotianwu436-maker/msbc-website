/**
 * Supabase CMS Hook
 * Integrates Supabase database with Admin panel
 * Falls back to localStorage if Supabase is not configured
 */

import { useState, useEffect, useCallback } from "react";
import {
  useSpeakers,
  useSponsors,
  useAgendaSessions,
  useFaqItems,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
  createSponsor,
  updateSponsor,
  deleteSponsor,
  createAgendaSession,
  updateAgendaSession,
  deleteAgendaSession,
  createFaqItem,
  updateFaqItem,
  deleteFaqItem,
} from "./useSupabase";
import { supabase } from "@/lib/supabase";
import type { Speaker, Sponsor, AgendaSession, FaqItem } from "@/lib/data";

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(url && key && url !== "" && key !== "");
};

export function useSupabaseCms() {
  const [useSupabase, setUseSupabase] = useState(isSupabaseConfigured());
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase
  const speakersData = useSpeakers();
  const sponsorsData = useSponsors();
  const agendaData = useAgendaSessions();
  const faqData = useFaqItems();

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    // Data (ensure arrays are never undefined)
    speakers: speakersData.data || [],
    sponsors: sponsorsData.data || [],
    agendaSessions: agendaData.data || [],
    faqItems: faqData.data || [],
    
    // Loading states
    loading: loading || speakersData.loading || sponsorsData.loading || agendaData.loading || faqData.loading,
    
    // Errors
    error: speakersData.error || sponsorsData.error || agendaData.error || faqData.error,
    errors: {
      speakers: speakersData.error,
      sponsors: sponsorsData.error,
      agenda: agendaData.error,
      faq: faqData.error,
    },
    
    // Mutations
    createSpeaker: async (speaker: Omit<Speaker, "speakerId"> & { speakerId?: string }) => {
      try {
        const result = await createSpeaker(speaker);
        await speakersData.refetch();
        return result;
      } catch (error) {
        console.error("Failed to create speaker:", error);
        throw error;
      }
    },
    updateSpeaker: async (speakerId: string, updates: Partial<Speaker>) => {
      try {
        const result = await updateSpeaker(speakerId, updates);
        await speakersData.refetch();
        return result;
      } catch (error) {
        console.error("Failed to update speaker:", error);
        throw error;
      }
    },
    deleteSpeaker: async (speakerId: string) => {
      try {
        await deleteSpeaker(speakerId);
        await speakersData.refetch();
      } catch (error) {
        console.error("Failed to delete speaker:", error);
        throw error;
      }
    },
    createSponsor: async (sponsor: Omit<Sponsor, "sponsorId"> & { sponsorId?: string }) => {
      try {
        const result = await createSponsor(sponsor);
        await sponsorsData.refetch();
        return result;
      } catch (error) {
        console.error("Failed to create sponsor:", error);
        throw error;
      }
    },
    updateSponsor: async (sponsorId: string, updates: Partial<Sponsor>) => {
      try {
        const result = await updateSponsor(sponsorId, updates);
        await sponsorsData.refetch();
        return result;
      } catch (error) {
        console.error("Failed to update sponsor:", error);
        throw error;
      }
    },
    deleteSponsor: async (sponsorId: string) => {
      try {
        await deleteSponsor(sponsorId);
        await sponsorsData.refetch();
      } catch (error) {
        console.error("Failed to delete sponsor:", error);
        throw error;
      }
    },
    createAgendaSession: async (session: Omit<AgendaSession, "sessionId"> & { sessionId?: string }) => {
      try {
        const result = await createAgendaSession(session);
        await agendaData.refetch();
        return result;
      } catch (error) {
        console.error("Failed to create agenda session:", error);
        throw error;
      }
    },
    updateAgendaSession: async (sessionId: string, updates: Partial<AgendaSession>) => {
      try {
        const result = await updateAgendaSession(sessionId, updates);
        await agendaData.refetch();
        return result;
      } catch (error) {
        console.error("Failed to update agenda session:", error);
        throw error;
      }
    },
    deleteAgendaSession: async (sessionId: string) => {
      try {
        await deleteAgendaSession(sessionId);
        await agendaData.refetch();
      } catch (error) {
        console.error("Failed to delete agenda session:", error);
        throw error;
      }
    },
    createFaqItem: async (faq: Omit<FaqItem, "faqId"> & { faqId?: string }) => {
      try {
        const result = await createFaqItem(faq);
        await faqData.refetch();
        return result;
      } catch (error) {
        console.error("Failed to create FAQ item:", error);
        throw error;
      }
    },
    updateFaqItem: async (faqId: string, updates: Partial<FaqItem>) => {
      try {
        const result = await updateFaqItem(faqId, updates);
        await faqData.refetch();
        return result;
      } catch (error) {
        console.error("Failed to update FAQ item:", error);
        throw error;
      }
    },
    deleteFaqItem: async (faqId: string) => {
      try {
        await deleteFaqItem(faqId);
        await faqData.refetch();
      } catch (error) {
        console.error("Failed to delete FAQ item:", error);
        throw error;
      }
    },
    
    // Refetch functions
    refetch: {
      speakers: speakersData.refetch,
      sponsors: sponsorsData.refetch,
      agenda: agendaData.refetch,
      faq: faqData.refetch,
    },
    
    // Configuration status
    isConfigured: useSupabase,
    
    // Image upload function
    uploadImage: async (file: File, bucket: keyof typeof import("@/lib/supabase").STORAGE_BUCKETS) => {
      const { uploadImage } = await import("@/lib/supabase");
      return uploadImage(file, bucket);
    },
  };
}
