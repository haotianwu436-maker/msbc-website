/**
 * MSBC CMS Data Hook
 * Uses localStorage to persist edits. Falls back to default data from data.ts.
 * Non-technical users can edit content through the admin panel,
 * and changes persist across browser sessions.
 */
import { useState, useEffect, useCallback } from "react";
import {
  siteSettings as defaultSiteSettings,
  eventEdition as defaultEventEdition,
  homepageContent as defaultHomepageContent,
  speakers as defaultSpeakers,
  agendaSessions as defaultAgendaSessions,
  sponsors as defaultSponsors,
  universities as defaultUniversities,
  faqItems as defaultFaqItems,
  contactMethods as defaultContactMethods,
  hackathonContent as defaultHackathonContent,
  becomeSponsorContent as defaultBecomeSponsorContent,
  contactPageContent as defaultContactPageContent,
  ticketsContent as defaultTicketsContent,
  navigation as defaultNavigation,
  ASSETS as defaultAssets,
  type Speaker,
  type AgendaSession,
  type Sponsor,
  type University,
  type FaqItem,
  type ContactMethod,
} from "@/lib/data";

const STORAGE_PREFIX = "msbc_cms_";

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return fallback;
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

export function useCmsData() {
  const [siteSettings, setSiteSettings] = useState(() => loadFromStorage("siteSettings", defaultSiteSettings));
  const [eventEdition, setEventEdition] = useState(() => loadFromStorage("eventEdition", defaultEventEdition));
  const [homepageContent, setHomepageContent] = useState(() => loadFromStorage("homepageContent", defaultHomepageContent));
  const [speakers, setSpeakers] = useState<Speaker[]>(() => loadFromStorage("speakers", defaultSpeakers));
  const [agendaSessions, setAgendaSessions] = useState<AgendaSession[]>(() => loadFromStorage("agendaSessions", defaultAgendaSessions));
  const [sponsors, setSponsors] = useState<Sponsor[]>(() => loadFromStorage("sponsors", defaultSponsors));
  const [universities, setUniversities] = useState<University[]>(() => loadFromStorage("universities", defaultUniversities));
  const [faqItems, setFaqItems] = useState<FaqItem[]>(() => loadFromStorage("faqItems", defaultFaqItems));
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>(() => loadFromStorage("contactMethods", defaultContactMethods));
  const [hackathonContent, setHackathonContent] = useState(() => loadFromStorage("hackathonContent", defaultHackathonContent));
  const [becomeSponsorContent, setBecomeSponsorContent] = useState(() => loadFromStorage("becomeSponsorContent", defaultBecomeSponsorContent));
  const [contactPageContent, setContactPageContent] = useState(() => loadFromStorage("contactPageContent", defaultContactPageContent));
  const [ticketsContent, setTicketsContent] = useState(() => loadFromStorage("ticketsContent", defaultTicketsContent));

  // Auto-save to localStorage on change
  useEffect(() => { saveToStorage("siteSettings", siteSettings); }, [siteSettings]);
  useEffect(() => { saveToStorage("eventEdition", eventEdition); }, [eventEdition]);
  useEffect(() => { saveToStorage("homepageContent", homepageContent); }, [homepageContent]);
  useEffect(() => { saveToStorage("speakers", speakers); }, [speakers]);
  useEffect(() => { saveToStorage("agendaSessions", agendaSessions); }, [agendaSessions]);
  useEffect(() => { saveToStorage("sponsors", sponsors); }, [sponsors]);
  useEffect(() => { saveToStorage("universities", universities); }, [universities]);
  useEffect(() => { saveToStorage("faqItems", faqItems); }, [faqItems]);
  useEffect(() => { saveToStorage("contactMethods", contactMethods); }, [contactMethods]);
  useEffect(() => { saveToStorage("hackathonContent", hackathonContent); }, [hackathonContent]);
  useEffect(() => { saveToStorage("becomeSponsorContent", becomeSponsorContent); }, [becomeSponsorContent]);
  useEffect(() => { saveToStorage("contactPageContent", contactPageContent); }, [contactPageContent]);
  useEffect(() => { saveToStorage("ticketsContent", ticketsContent); }, [ticketsContent]);

  const resetAll = useCallback(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) localStorage.removeItem(key);
    });
    setSiteSettings(defaultSiteSettings);
    setEventEdition(defaultEventEdition);
    setHomepageContent(defaultHomepageContent);
    setSpeakers(defaultSpeakers);
    setAgendaSessions(defaultAgendaSessions);
    setSponsors(defaultSponsors);
    setUniversities(defaultUniversities);
    setFaqItems(defaultFaqItems);
    setContactMethods(defaultContactMethods);
    setHackathonContent(defaultHackathonContent);
    setBecomeSponsorContent(defaultBecomeSponsorContent);
    setContactPageContent(defaultContactPageContent);
    setTicketsContent(defaultTicketsContent);
  }, []);

  const exportData = useCallback(() => {
    const data = {
      siteSettings, eventEdition, homepageContent, speakers, agendaSessions,
      sponsors, universities, faqItems, contactMethods, hackathonContent,
      becomeSponsorContent, contactPageContent, ticketsContent,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `msbc-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [siteSettings, eventEdition, homepageContent, speakers, agendaSessions, sponsors, universities, faqItems, contactMethods, hackathonContent, becomeSponsorContent, contactPageContent, ticketsContent]);

  const importData = useCallback((jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.siteSettings) setSiteSettings(data.siteSettings);
      if (data.eventEdition) setEventEdition(data.eventEdition);
      if (data.homepageContent) setHomepageContent(data.homepageContent);
      if (data.speakers) setSpeakers(data.speakers);
      if (data.agendaSessions) setAgendaSessions(data.agendaSessions);
      if (data.sponsors) setSponsors(data.sponsors);
      if (data.universities) setUniversities(data.universities);
      if (data.faqItems) setFaqItems(data.faqItems);
      if (data.contactMethods) setContactMethods(data.contactMethods);
      if (data.hackathonContent) setHackathonContent(data.hackathonContent);
      if (data.becomeSponsorContent) setBecomeSponsorContent(data.becomeSponsorContent);
      if (data.contactPageContent) setContactPageContent(data.contactPageContent);
      if (data.ticketsContent) setTicketsContent(data.ticketsContent);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    siteSettings, setSiteSettings,
    eventEdition, setEventEdition,
    homepageContent, setHomepageContent,
    speakers, setSpeakers,
    agendaSessions, setAgendaSessions,
    sponsors, setSponsors,
    universities, setUniversities,
    faqItems, setFaqItems,
    contactMethods, setContactMethods,
    hackathonContent, setHackathonContent,
    becomeSponsorContent, setBecomeSponsorContent,
    contactPageContent, setContactPageContent,
    ticketsContent, setTicketsContent,
    resetAll,
    exportData,
    importData,
  };
}

// Admin password
const ADMIN_PASSWORD_KEY = "msbc_admin_password";
const DEFAULT_PASSWORD = "msbc2026";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem("msbc_admin_session");
    if (session === "authenticated") setIsAuthenticated(true);
  }, []);

  const login = (password: string): boolean => {
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (password === storedPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("msbc_admin_session", "authenticated");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("msbc_admin_session");
  };

  const changePassword = (oldPassword: string, newPassword: string): boolean => {
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (oldPassword === storedPassword && newPassword.length >= 4) {
      localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
      return true;
    }
    return false;
  };

  return { isAuthenticated, login, logout, changePassword };
}
