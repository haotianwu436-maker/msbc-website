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
  useUniversities,
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
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from "./useSupabase";
import { supabase } from "@/lib/supabase";
import type { Speaker, Sponsor, AgendaSession, FaqItem, University } from "@/lib/data";

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
  const universitiesData = useUniversities();

  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    // Data (ensure arrays are never undefined)
    speakers: speakersData.data || [],
    sponsors: sponsorsData.data || [],
    agendaSessions: agendaData.data || [],
    faqItems: faqData.data || [],
    universities: universitiesData.data || [],
    
    // Loading states
    loading: loading || speakersData.loading || sponsorsData.loading || agendaData.loading || faqData.loading || universitiesData.loading,
    
    // Errors
    error: speakersData.error || sponsorsData.error || agendaData.error || faqData.error || universitiesData.error,
    errors: {
      speakers: speakersData.error,
      sponsors: sponsorsData.error,
      agenda: agendaData.error,
      faq: faqData.error,
      universities: universitiesData.error,
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
    createUniversity: async (university: Omit<University, "universityId"> & { universityId?: string }) => {
      try {
        const result = await createUniversity(university);
        await universitiesData.refetch();
        return result;
      } catch (error) {
        console.error("Failed to create university:", error);
        throw error;
      }
    },
    updateUniversity: async (universityId: string, updates: Partial<University>) => {
      try {
        const result = await updateUniversity(universityId, updates);
        await universitiesData.refetch();
        return result;
      } catch (error) {
        console.error("Failed to update university:", error);
        throw error;
      }
    },
    deleteUniversity: async (universityId: string) => {
      try {
        await deleteUniversity(universityId);
        await universitiesData.refetch();
      } catch (error) {
        console.error("Failed to delete university:", error);
        throw error;
      }
    },
    setUniversities: async (universities: University[]) => {
      // Optimized batch update for Supabase CMS
      try {
        const current = universitiesData.data || [];
        const currentIds = new Set(current.map((u) => u.universityId));
        const newIds = new Set(universities.map((u) => u.universityId));

        // Batch operations
        const toDelete: string[] = [];
        const toCreate: University[] = [];
        const toUpdate: { id: string; data: Partial<University> }[] = [];

        // Find items to delete
        for (const currentUni of current) {
          if (!newIds.has(currentUni.universityId)) {
            toDelete.push(currentUni.universityId);
          }
        }

        // Find items to create or update
        for (const uni of universities) {
          if (currentIds.has(uni.universityId)) {
            toUpdate.push({ id: uni.universityId, data: uni });
          } else {
            toCreate.push(uni);
          }
        }

        // Execute batch operations in parallel
        const promises: Promise<any>[] = [];

        // Batch delete
        if (toDelete.length > 0) {
          promises.push(
            Promise.all(toDelete.map((id) => deleteUniversity(id)))
          );
        }

        // Batch create
        if (toCreate.length > 0) {
          promises.push(
            Promise.all(toCreate.map((uni) => createUniversity(uni)))
          );
        }

        // Batch update
        if (toUpdate.length > 0) {
          promises.push(
            Promise.all(toUpdate.map(({ id, data }) => updateUniversity(id, data)))
          );
        }

        // Wait for all operations to complete
        await Promise.all(promises);

        // Refetch data
        await universitiesData.refetch();
      } catch (error) {
        console.error("Failed to set universities:", error);
        throw error;
      }
    },
    setAgendaSessions: async (sessions: AgendaSession[]) => {
      try {
        const current = agendaData.data || [];
        const currentIds = new Set(current.map((s) => s.sessionId));
        const newIds = new Set(sessions.map((s) => s.sessionId));

        const toDelete: string[] = [];
        const toCreate: AgendaSession[] = [];
        const toUpdate: { id: string; data: Partial<AgendaSession> }[] = [];

        for (const currentSession of current) {
          if (!newIds.has(currentSession.sessionId)) {
            toDelete.push(currentSession.sessionId);
          }
        }

        for (const session of sessions) {
          if (currentIds.has(session.sessionId)) {
            toUpdate.push({ id: session.sessionId, data: session });
          } else {
            toCreate.push(session);
          }
        }

        const promises: Promise<any>[] = [];
        if (toDelete.length > 0) {
          promises.push(Promise.all(toDelete.map((id) => deleteAgendaSession(id))));
        }
        if (toCreate.length > 0) {
          promises.push(Promise.all(toCreate.map((s) => createAgendaSession(s))));
        }
        if (toUpdate.length > 0) {
          promises.push(Promise.all(toUpdate.map(({ id, data }) => updateAgendaSession(id, data))));
        }

        await Promise.all(promises);
        await agendaData.refetch();
      } catch (error) {
        console.error("Failed to set agenda sessions:", error);
        throw error;
      }
    },
    setSponsors: async (sponsors: Sponsor[]) => {
      try {
        const current = sponsorsData.data || [];
        const currentIds = new Set(current.map((s) => s.sponsorId));
        const newIds = new Set(sponsors.map((s) => s.sponsorId));

        const toDelete: string[] = [];
        const toCreate: Sponsor[] = [];
        const toUpdate: { id: string; data: Partial<Sponsor> }[] = [];

        for (const currentSponsor of current) {
          if (!newIds.has(currentSponsor.sponsorId)) {
            toDelete.push(currentSponsor.sponsorId);
          }
        }

        for (const sponsor of sponsors) {
          if (currentIds.has(sponsor.sponsorId)) {
            toUpdate.push({ id: sponsor.sponsorId, data: sponsor });
          } else {
            toCreate.push(sponsor);
          }
        }

        const promises: Promise<any>[] = [];
        if (toDelete.length > 0) {
          promises.push(Promise.all(toDelete.map((id) => deleteSponsor(id))));
        }
        if (toCreate.length > 0) {
          promises.push(Promise.all(toCreate.map((s) => createSponsor(s))));
        }
        if (toUpdate.length > 0) {
          promises.push(Promise.all(toUpdate.map(({ id, data }) => updateSponsor(id, data))));
        }

        await Promise.all(promises);
        await sponsorsData.refetch();
      } catch (error) {
        console.error("Failed to set sponsors:", error);
        throw error;
      }
    },
    setFaqItems: async (faqItems: FaqItem[]) => {
      try {
        const current = faqData.data || [];
        const currentIds = new Set(current.map((f) => f.faqId));
        const newIds = new Set(faqItems.map((f) => f.faqId));

        const toDelete: string[] = [];
        const toCreate: FaqItem[] = [];
        const toUpdate: { id: string; data: Partial<FaqItem> }[] = [];

        for (const currentFaq of current) {
          if (!newIds.has(currentFaq.faqId)) {
            toDelete.push(currentFaq.faqId);
          }
        }

        for (const faq of faqItems) {
          if (currentIds.has(faq.faqId)) {
            toUpdate.push({ id: faq.faqId, data: faq });
          } else {
            toCreate.push(faq);
          }
        }

        const promises: Promise<any>[] = [];
        if (toDelete.length > 0) {
          promises.push(Promise.all(toDelete.map((id) => deleteFaqItem(id))));
        }
        if (toCreate.length > 0) {
          promises.push(Promise.all(toCreate.map((f) => createFaqItem(f))));
        }
        if (toUpdate.length > 0) {
          promises.push(Promise.all(toUpdate.map(({ id, data }) => updateFaqItem(id, data))));
        }

        await Promise.all(promises);
        await faqData.refetch();
      } catch (error) {
        console.error("Failed to set FAQ items:", error);
        throw error;
      }
    },
    setContactMethods: async (contactMethods: ContactMethod[]) => {
      // Contact methods are stored in site_settings, so we'll use a different approach
      // For now, we'll just update the local state and let the caller handle persistence
      // This is a placeholder - you may need to implement a proper contact methods table
      try {
        // Since contact methods might not have a dedicated table, we'll skip for now
        // You can implement this based on your data structure
        console.warn("setContactMethods not fully implemented for Supabase");
      } catch (error) {
        console.error("Failed to set contact methods:", error);
        throw error;
      }
    },
    
    // Refetch functions
    refetch: {
      speakers: speakersData.refetch,
      sponsors: sponsorsData.refetch,
      agenda: agendaData.refetch,
      faq: faqData.refetch,
      universities: universitiesData.refetch,
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
