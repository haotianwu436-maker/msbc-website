/**
 * MSBC Homepage — "Stage Presence" Design
 * TOKEN2049-grade conference homepage. Fully responsive.
 * Void Black + Electric Blue + Platinum White.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import Countdown from "@/components/Countdown";
import {
  ASSETS,
  homepageContent,
  speakers as defaultSpeakers,
  agendaSessions as defaultAgendaSessions,
  sponsors as defaultSponsors,
  universities as defaultUniversities,
  faqItems as defaultFaqItems,
  eventEdition,
  contactMethods,
  contactPageContent,
  siteSettings,
} from "@/lib/data";
import { useSpeakers, useAgendaSessions, useSponsors, useFaqItems, useUniversities } from "@/hooks/useSupabase";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  ChevronDown,
  Mail,
  Handshake,
  Newspaper,
  Users,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const stagger = (i: number) => ({
  ...fadeUp,
  transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.08 },
});

// ─── Hero Section ──────────────────────────────────────────────
function HeroSection() {
  const { hero } = homepageContent;
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background — TOKEN2049 style with video support */}
      <div className="absolute inset-0">
        {/* Video background (auto-plays if available) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/videos/kuala-lumpur-skyline.mp4" type="video/mp4" />
        </video>
        {/* Fallback image */}
        <img src={ASSETS.heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
        {/* Deep dark gradient overlay — TOKEN2049 official color */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1c]/60 via-[#050d1c]/85 to-[#050d1c]" style={{ zIndex: 1 }} />
        {/* Additional blue tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001a3d]/20 via-transparent to-[#050d1c]/40" style={{ zIndex: 1 }} />
      </div>

      {/* Subtle blue spotlight — TOKEN2049 style */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] sm:w-[60%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(0,102,255,0.12)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container relative z-10 py-20 sm:py-24 md:py-32 lg:py-40">
        <div className="max-w-6xl">
          {/* Date / Location — TOKEN2049 style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            <span
              className="text-[11px] sm:text-xs font-medium tracking-[0.15em] uppercase text-[#f5f6fa]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Aug 29–30, 2026
            </span>
            <span className="w-6 sm:w-8 h-px bg-[#f5f6fa]/30" />
            <span
              className="text-[11px] sm:text-xs font-medium tracking-[0.15em] uppercase text-[#8b99b5]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Kuala Lumpur, Malaysia
            </span>
          </motion.div>

          {/* Headline — TOKEN2049 style (reduced size) */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-[#f5f6fa] mb-6 sm:mb-8 uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="block">Malaysia Student</span>
            <span className="block text-[#0066ff]">Blockchain</span>
            <span className="block">Conference</span>
          </motion.h1>

          {/* Editorial body copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-[#8b99b5] max-w-3xl leading-relaxed mb-10 sm:mb-12"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {hero.headline}
          </motion.p>

          {/* Primary CTA — TOKEN2049 style bright blue button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-12 sm:mb-16"
          >
            <Link href={hero.primaryCta.url} className="btn-primary text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5">
              {hero.primaryCta.label}
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <Link href={hero.secondaryCta.url} className="btn-secondary text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5">
              {hero.secondaryCta.label}
            </Link>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Countdown />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="border-y border-[#1e293b] halftone-bg">
      <div className="container py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          {homepageContent.stats.map((stat, i) => (
            <motion.div 
              key={stat.label} 
              {...stagger(i)} 
              className="text-center"
            >
              <div 
                className="text-[clamp(2rem,6vw,5rem)] font-bold leading-none text-[#f5f6fa] mb-3 sm:mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] sm:text-xs tracking-[0.12em] uppercase text-[#8b99b5]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────────
function AboutSection() {
  const { about } = homepageContent;
  return (
    <SectionWrapper id="about" spotlight>
      <div className="max-w-4xl mx-auto">
        <SectionHeading label="About MSBC" title={about.sectionTitle} align="center" />
        <div className="mt-8 sm:mt-10 md:mt-12">
          <p
            className="text-base sm:text-lg md:text-xl text-[#8b99b5] leading-[1.75] mb-6 sm:mb-8 text-center"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {about.bodyCopy}
          </p>
          <p
            className="text-sm sm:text-base text-[#0066ff] tracking-wide uppercase text-center"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Built in Kuala Lumpur. Connected across Asia.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── Speakers Preview ──────────────────────────────────────────
function SpeakersPreview() {
  const { speakers: content } = homepageContent;
  // Try to fetch from Supabase, fallback to default data
  const { data: supabaseSpeakers, loading } = useSpeakers();
  const speakers = supabaseSpeakers && supabaseSpeakers.length > 0 ? supabaseSpeakers : defaultSpeakers;
  
  // Get featured speakers, or fallback to first 4 speakers if no featured ones
  const featured = speakers.filter((s) => s.featured).slice(0, 4);
  const displaySpeakers = featured.length > 0 ? featured : speakers.slice(0, 4);
  
  return (
    <SectionWrapper elevated>
      <SectionHeading
        label="Speakers"
        title={content.sectionTitle}
        subtitle={content.bodyCopy}
      />
      
      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-[#0066ff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#8b99b5]" style={{ fontFamily: "var(--font-body)" }}>加载中...</p>
        </div>
      ) : displaySpeakers.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-base text-[#8b99b5]" style={{ fontFamily: "var(--font-body)" }}>
            暂无演讲者数据
          </p>
        </div>
      ) : (
        <>
          {/* Premium speaker grid — Enhanced TOKEN2049 editorial layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {displaySpeakers.map((speaker, i) => (
              <Link key={speaker.speakerId} href="/2026/speakers">
                <motion.div
                  {...stagger(i)}
                  className="group cursor-pointer"
                >
                  {/* Large portrait — enhanced aspect ratio with rounded corners */}
                  <div className="aspect-[3/4] overflow-hidden mb-4 sm:mb-5 rounded-xl relative bg-white/[0.02] border border-white/[0.06]">
                    {speaker.photo ? (
                      <img
                        src={speaker.photo}
                        alt={speaker.fullName}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        onError={(e) => {
                          // Fallback if image fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/[0.04]">
                        <Users className="w-12 h-12 text-[#8b99b5]" />
                      </div>
                    )}
                    {/* Gradient overlay — TOKEN2049 style */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050d1c]/60 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    {/* Blue accent on hover */}
                    <div className="absolute inset-0 border-2 border-[#0066ff]/0 group-hover:border-[#0066ff]/40 rounded-xl transition-all duration-700" />
                  </div>
                  {/* Clean typography — enhanced editorial style */}
                  <h3
                    className="text-base sm:text-lg md:text-xl font-bold text-[#f5f6fa] leading-tight mb-1.5 group-hover:text-[#0066ff] transition-colors uppercase tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {speaker.fullName}
                  </h3>
                  <p
                    className="text-sm sm:text-base text-[#0066ff] mb-1 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {speaker.title}
                  </p>
                  <p
                    className="text-xs sm:text-sm text-[#8b99b5] leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {speaker.organisation}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="mt-12 sm:mt-16 md:mt-20 text-center">
            <Link href="/2026/speakers" className="btn-secondary text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 inline-flex items-center gap-2">
              {content.ctaLabel || "View All Speakers"}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </>
      )}
    </SectionWrapper>
  );
}

// ─── Agenda Preview ────────────────────────────────────────────
function AgendaPreview() {
  const { agenda: content } = homepageContent;
  // Try to fetch from Supabase, fallback to default data
  const { data: supabaseAgenda } = useAgendaSessions();
  const agendaSessions = supabaseAgenda && supabaseAgenda.length > 0 ? supabaseAgenda : defaultAgendaSessions;
  const featured = agendaSessions.filter((s) => s.featured).slice(0, 4);

  return (
    <SectionWrapper>
      <SectionHeading
        label="Programme"
        title={content.sectionTitle}
        subtitle={content.bodyCopy}
      />
      {/* Editorial agenda list — enhanced minimal borders */}
      <div className="max-w-5xl mx-auto space-y-0">
        {featured.map((session, i) => (
          <motion.div
            key={session.sessionId}
            {...stagger(i)}
            className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-10 py-8 sm:py-10 border-b border-white/[0.06] last:border-0 group"
          >
            {/* Time — enhanced refined mono */}
            <div className="flex items-start gap-3 sm:w-40 md:w-44 shrink-0">
              <Clock className="w-5 h-5 text-[#2563EB] mt-0.5 shrink-0" />
              <span
                className="text-base font-medium text-[#9CA3AF]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {session.startTime} – {session.endTime}
              </span>
            </div>
            {/* Content — enhanced editorial layout */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase px-3 sm:px-4 py-1.5 border border-[#2563EB]/35 text-[#2563EB]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {session.format.replace("_", " ")}
                </span>
                <span
                  className="text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-[#6B7280]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {session.track}
                </span>
              </div>
              <h3
                className="text-lg sm:text-xl md:text-2xl font-bold text-[#F0F2F8] leading-tight mb-3 group-hover:text-[#2563EB] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {session.title}
              </h3>
              <p
                className="text-base sm:text-lg text-[#6B7280] leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {session.shortDescription}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-16 sm:mt-20 md:mt-24 text-center">
        <Link href={content.ctaUrl} className="btn-secondary text-lg px-10 py-5">
          {content.ctaLabel}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

// ─── Hackathon Preview ─────────────────────────────────────────
function HackathonPreview() {
  const { hackathon: content } = homepageContent;
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={ASSETS.hackathonBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1c]/50 via-[#050d1c]/90 to-[#050d1c]" />
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] sm:w-[60%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span
              className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[#0066ff] mb-6 sm:mb-8"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Hackathon
            </span>
            <h2 
              className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#f5f6fa] mb-6 sm:mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {content.sectionTitle}
            </h2>
            <p
              className="text-lg sm:text-xl md:text-2xl text-[#8b99b5] leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.bodyCopy}
            </p>
            <div>
              <Link href={content.ctaUrl} className="btn-primary text-base sm:text-lg px-10 py-5">
                {content.ctaLabel}
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Universities Preview ──────────────────────────────────────
function UniversitiesPreview() {
  const { universities: content } = homepageContent;
  const { data: universitiesData, loading: universitiesLoading } = useUniversities();
  const universities = universitiesData.length > 0 ? universitiesData : defaultUniversities;
  return (
    <SectionWrapper>
      <SectionHeading
        label="Participating Universities"
        title={content.sectionTitle}
        subtitle={content.bodyCopy}
      />
      {/* Minimal university grid — editorial spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 md:gap-10">
        {universities.slice(0, 6).map((uni, i) => (
          <motion.div
            key={uni.universityId}
            {...stagger(i)}
            className="text-center py-6"
          >
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0066ff]/25 mb-3 sm:mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {uni.universityName.split(" ").map(w => w[0]).join("").slice(0, 3)}
            </div>
            <p
              className="text-xs sm:text-sm text-[#8b99b5] leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {uni.universityName}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 sm:mt-16 md:mt-20 text-center">
        <Link href={content.ctaUrl} className="btn-secondary text-base px-8 py-4">
          {content.ctaLabel}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

// ─── Sponsors Preview ──────────────────────────────────────────
function SponsorsPreview() {
  const { sponsors: content } = homepageContent;
  // Try to fetch from Supabase, fallback to default data
  const { data: supabaseSponsors } = useSponsors();
  const sponsors = supabaseSponsors && supabaseSponsors.length > 0 ? supabaseSponsors : defaultSponsors;
  const tierOrder = ["title", "platinum", "gold", "silver"];
  const tierLabels: Record<string, string> = {
    title: "Title Sponsor",
    platinum: "Platinum",
    gold: "Gold",
    silver: "Silver",
  };
  const grouped = tierOrder
    .map((tier) => ({
      tier,
      label: tierLabels[tier],
      items: sponsors.filter((s) => s.tier === tier),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <SectionWrapper elevated>
      <SectionHeading
        label="Partners & Sponsors"
        title={content.sectionTitle}
        subtitle={content.bodyCopy}
      />
      {/* Premium sponsor presentation — TOKEN2049 style */}
      <div className="space-y-12 sm:space-y-16 md:space-y-20">
        {grouped.map((group) => (
          <div key={group.tier}>
            <div className="text-center mb-8 sm:mb-10">
              <span
                className="text-xs font-medium tracking-[0.15em] uppercase text-[#0066ff]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {group.label}
              </span>
            </div>
            {/* Clean grid — no card borders */}
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              {group.items.map((sponsor, i) => (
                <motion.a
                  key={sponsor.sponsorId}
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...stagger(i)}
                  className={`flex items-center justify-center group transition-opacity ${
                    group.tier === "title"
                      ? "w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48"
                      : group.tier === "platinum"
                      ? "w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
                      : "w-24 h-24 sm:w-28 sm:h-28"
                  }`}
                >
                  <span
                    className="text-sm sm:text-base md:text-lg font-semibold text-[#8b99b5] group-hover:text-[#f5f6fa] transition-colors text-center leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {sponsor.companyName}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 sm:mt-20 md:mt-24 flex flex-col sm:flex-row flex-wrap justify-center gap-5 sm:gap-6">
        <Link href={content.cta1Url} className="btn-secondary text-lg px-10 py-5">
          {content.cta1Label}
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link href={content.cta2Url} className="btn-primary text-lg px-10 py-5">
          {content.cta2Label}
          <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

// ─── FAQ Preview ───────────────────────────────────────────────
function FaqPreview() {
  const { faq: content } = homepageContent;
  // Try to fetch from Supabase, fallback to default data
  const { data: supabaseFaqs } = useFaqItems();
  const faqItems = supabaseFaqs && supabaseFaqs.length > 0 ? supabaseFaqs : defaultFaqItems;
  const previewFaqs = faqItems.filter((f) => f.category === "general").slice(0, 4);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SectionWrapper>
      <SectionHeading
        label="FAQ"
        title={content.sectionTitle}
        subtitle={content.bodyCopy}
      />
      {/* Editorial FAQ — clean typography */}
      <div className="max-w-4xl mx-auto space-y-0">
        {previewFaqs.map((faq) => (
          <div key={faq.faqId} className="border-b border-white/[0.04] last:border-0">
            <button
              onClick={() => setOpenId(openId === faq.faqId ? null : faq.faqId)}
              className="w-full flex items-center justify-between py-6 sm:py-8 text-left group"
            >
              <span
                className="text-base sm:text-lg md:text-xl font-bold text-[#F0F2F8] pr-6 group-hover:text-[#2563EB] transition-colors leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#8b99b5] shrink-0 transition-transform duration-300 ${
                  openId === faq.faqId ? "rotate-180 text-[#0066ff]" : ""
                }`}
              />
            </button>
            {openId === faq.faqId && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pb-6 sm:pb-8"
              >
                <p
                  className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-12 sm:mt-16 md:mt-20 text-center">
        <Link href={content.ctaUrl} className="btn-secondary text-base px-8 py-4">
          {content.ctaLabel}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

// ─── Final CTA Section ─────────────────────────────────────────
function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] sm:w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="horizon-glow" />
      <div className="container section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span
              className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[#0066ff] mb-6 sm:mb-8"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Join Us
            </span>
            <h2 
              className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#f5f6fa] mb-6 sm:mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Be Part of What's Next
            </h2>
            <p
              className="text-lg sm:text-xl md:text-2xl text-[#8b99b5] leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Join 700+ students, builders, and ecosystem leaders in Kuala Lumpur for three days of talks, workshops, hackathon experiences, and meaningful connections.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-5">
              <Link href="/2026/tickets" className="btn-primary text-base sm:text-lg px-10 py-5">
                Register Now
                <ArrowUpRight className="w-5 h-5" />
              </Link>
              <Link href="/2026/become-a-sponsor" className="btn-secondary text-base sm:text-lg px-10 py-5">
                Become a Sponsor
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Homepage Component ───────────────────────────────────
export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <SpeakersPreview />
      <AgendaPreview />
      <HackathonPreview />
      <UniversitiesPreview />
      <SponsorsPreview />
      <FaqPreview />
      <FinalCtaSection />
      <ContactSection />
    </PageLayout>
  );
}

// ─── Contact Section ──────────────────────────────────────────────
function ContactSection() {
  const c = contactPageContent;
  const typeIcons: Record<string, React.ReactNode> = {
    sponsorship: <Handshake className="w-4 h-4 sm:w-5 sm:h-5" />,
    media: <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />,
    community: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
    general: <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
  };

  return (
    <SectionWrapper id="contact" elevated>
      <SectionHeading
        label="Contact"
        title={c.heroHeadline}
        subtitle={c.heroSupportingCopy}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {contactMethods.map((method, i) => (
          <motion.div
            key={method.contactId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="conference-card p-5 sm:p-6 md:p-8 group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/[0.08] flex items-center justify-center text-[#0066ff] mb-4 sm:mb-5 group-hover:border-[#0066ff]/40 transition-colors rounded-lg">
              {typeIcons[method.contactType] || <Mail className="w-5 h-5 sm:w-6 sm:h-6" />}
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-[#f5f6fa] mb-2 sm:mb-3" style={{ fontFamily: "var(--font-display)" }}>
              {method.label}
            </h3>
            <p className="text-sm sm:text-base text-[#8b99b5] leading-relaxed mb-4 sm:mb-6" style={{ fontFamily: "var(--font-body)" }}>
              {method.description}
            </p>
            <a
              href={`mailto:${method.email}`}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#0066ff] hover:text-[#0052cc] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {method.ctaLabel}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 sm:mt-16 md:mt-20 text-center">
        <span
          className="inline-block text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-[#0066ff] mb-4 sm:mb-5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Follow Us
        </span>
        <p className="text-sm sm:text-base text-[#8b99b5] mb-6 sm:mb-8" style={{ fontFamily: "var(--font-body)" }}>
          {c.social.bodyCopy}
        </p>
        <div className="flex justify-center gap-3 sm:gap-4">
          {siteSettings.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-white/[0.08] text-[#8b99b5] hover:text-[#0066ff] hover:border-[#0066ff]/40 transition-all text-xs sm:text-sm font-medium rounded-lg"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {link.platform === "twitter" && "X"}
              {link.platform === "telegram" && "TG"}
              {link.platform === "linkedin" && "LI"}
              {link.platform === "instagram" && "IG"}
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
