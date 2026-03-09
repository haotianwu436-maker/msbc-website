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
  speakers,
  agendaSessions,
  sponsors,
  universities,
  faqItems,
  eventEdition,
} from "@/lib/data";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  ChevronDown,
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
      {/* Background */}
      <div className="absolute inset-0">
        <img src={ASSETS.heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/40 via-[#07090F]/80 to-[#07090F]" />
      </div>

      {/* Subtle spotlight — TOKEN2049 editorial style */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] sm:w-[60%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container relative z-10 py-20 sm:py-24 md:py-32 lg:py-40">
        <div className="max-w-6xl">
          {/* Date / Location — refined mono label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap items-center gap-3 sm:gap-5 mb-8 sm:mb-12"
          >
            <span
              className="text-[11px] sm:text-xs font-medium tracking-[0.15em] uppercase text-[#2563EB]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Aug 15–17, 2026
            </span>
            <span className="w-6 sm:w-8 h-px bg-white/15" />
            <span
              className="text-[11px] sm:text-xs font-medium tracking-[0.15em] uppercase text-[#6B7280]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Kuala Lumpur, Malaysia
            </span>
          </motion.div>

          {/* Commanding headline — TOKEN2049 scale */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.04em] text-[#F0F2F8] mb-6 sm:mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Malaysia Student{" "}
            <span className="text-[#2563EB]">Blockchain</span>{" "}
            Conference
          </motion.h1>

          {/* Editorial body copy */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg sm:text-xl md:text-2xl text-[#9CA3AF] max-w-3xl leading-[1.6] mb-10 sm:mb-12 md:mb-16"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {hero.headline}
          </motion.p>

          {/* Premium CTAs — editorial spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
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

          {/* Countdown — refined presentation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
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
    <section className="border-y border-white/[0.04]">
      <div className="container py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          {homepageContent.stats.map((stat, i) => (
            <motion.div 
              key={stat.label} 
              {...stagger(i)} 
              className="text-center"
            >
              <div 
                className="text-[clamp(2rem,6vw,5rem)] font-medium leading-none text-[#2563EB] mb-3 sm:mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] sm:text-xs tracking-[0.12em] uppercase text-[#6B7280]"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 xl:gap-32 items-center">
        <div className="order-first lg:order-last">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={ASSETS.aboutVisual}
              alt="MSBC Network"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <SectionHeading label="About MSBC" title={about.sectionTitle} align="left" />
          <p
            className="text-base sm:text-lg md:text-xl text-[#9CA3AF] leading-[1.75] mb-6 sm:mb-8"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {about.bodyCopy}
          </p>
          <p
            className="text-sm sm:text-base text-[#2563EB] tracking-wide"
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
  const featured = speakers.filter((s) => s.featured).slice(0, 4);
  return (
    <SectionWrapper elevated>
      <SectionHeading
        label="Speakers"
        title={content.sectionTitle}
        subtitle={content.bodyCopy}
      />
      {/* Premium speaker grid — TOKEN2049 editorial layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {featured.map((speaker, i) => (
          <motion.div
            key={speaker.speakerId}
            {...stagger(i)}
            className="group"
          >
            {/* Large portrait — no card border */}
            <div className="aspect-[3/4] overflow-hidden mb-4 sm:mb-5">
              <img
                src={speaker.photo}
                alt={speaker.fullName}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Clean typography — editorial style */}
            <h3
              className="text-sm sm:text-base md:text-lg font-bold text-[#F0F2F8] leading-tight mb-1 group-hover:text-[#2563EB] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {speaker.fullName}
            </h3>
            <p
              className="text-xs sm:text-sm text-[#2563EB] mb-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {speaker.title}
            </p>
            <p
              className="text-xs text-[#6B7280] leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {speaker.organisation}
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

// ─── Agenda Preview ────────────────────────────────────────────
function AgendaPreview() {
  const { agenda: content } = homepageContent;
  const featured = agendaSessions.filter((s) => s.featured).slice(0, 4);

  return (
    <SectionWrapper>
      <SectionHeading
        label="Programme"
        title={content.sectionTitle}
        subtitle={content.bodyCopy}
      />
      {/* Editorial agenda list — minimal borders */}
      <div className="max-w-4xl mx-auto space-y-1">
        {featured.map((session, i) => (
          <motion.div
            key={session.sessionId}
            {...stagger(i)}
            className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 py-6 sm:py-8 border-b border-white/[0.04] last:border-0 group"
          >
            {/* Time — refined mono */}
            <div className="flex items-start gap-3 sm:w-36 md:w-40 shrink-0">
              <Clock className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
              <span
                className="text-sm font-medium text-[#9CA3AF]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {session.startTime} – {session.endTime}
              </span>
            </div>
            {/* Content — editorial layout */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span
                  className="text-[10px] font-medium tracking-[0.1em] uppercase px-3 py-1 border border-[#2563EB]/30 text-[#2563EB]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {session.format.replace("_", " ")}
                </span>
                <span
                  className="text-[10px] tracking-[0.1em] uppercase text-[#6B7280]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {session.track}
                </span>
              </div>
              <h3
                className="text-base sm:text-lg md:text-xl font-bold text-[#F0F2F8] leading-tight mb-2 group-hover:text-[#2563EB] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {session.title}
              </h3>
              <p
                className="text-sm sm:text-base text-[#6B7280] leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {session.shortDescription}
              </p>
            </div>
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

// ─── Hackathon Preview ─────────────────────────────────────────
function HackathonPreview() {
  const { hackathon: content } = homepageContent;
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={ASSETS.hackathonBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/50 via-[#07090F]/90 to-[#07090F]" />
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] sm:w-[60%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span
              className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[#2563EB] mb-6 sm:mb-8"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Hackathon
            </span>
            <h2 
              className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#F0F2F8] mb-6 sm:mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {content.sectionTitle}
            </h2>
            <p
              className="text-lg sm:text-xl md:text-2xl text-[#9CA3AF] leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12"
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
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2563EB]/25 mb-3 sm:mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {uni.universityName.split(" ").map(w => w[0]).join("").slice(0, 3)}
            </div>
            <p
              className="text-xs sm:text-sm text-[#6B7280] leading-relaxed"
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
                className="text-xs font-medium tracking-[0.15em] uppercase text-[#6B7280]"
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
                    className="text-sm sm:text-base md:text-lg font-semibold text-[#6B7280] group-hover:text-[#F0F2F8] transition-colors text-center leading-tight"
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
      <div className="mt-14 sm:mt-18 md:mt-24 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-5">
        <Link href={content.cta1Url} className="btn-secondary text-base px-8 py-4">
          {content.cta1Label}
          <ArrowRight className="w-5 h-5" />
        </Link>
        <Link href={content.cta2Url} className="btn-primary text-base px-8 py-4">
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
                className={`w-5 h-5 text-[#6B7280] shrink-0 transition-transform duration-300 ${
                  openId === faq.faqId ? "rotate-180 text-[#2563EB]" : ""
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
              className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[#2563EB] mb-6 sm:mb-8"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Join Us
            </span>
            <h2 
              className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#F0F2F8] mb-6 sm:mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Be Part of What's Next
            </h2>
            <p
              className="text-lg sm:text-xl md:text-2xl text-[#9CA3AF] leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12"
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
    </PageLayout>
  );
}
