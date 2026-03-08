/**
 * MSBC Homepage — "Stage Presence" Design
 * TOKEN2049-grade conference homepage.
 * Void Black + Electric Blue + Platinum White. No amber. No rounded corners.
 * Oversized headlines, editorial spacing, architectural precision.
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
  ExternalLink,
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
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={ASSETS.heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/70 to-[#07090F]/30" />
      </div>

      {/* Spotlight radial */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container relative z-10 pb-20 md:pb-28 pt-32">
        <div className="max-w-5xl">
          {/* Date / Location — mono label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <span
              className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#2563EB]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Aug 15–17, 2026
            </span>
            <span className="w-6 h-[1px] bg-white/20" />
            <span
              className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#6B7280]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Kuala Lumpur, Malaysia
            </span>
          </motion.div>

          {/* Oversized headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="headline-xl"
          >
            Malaysia Student{" "}
            <span className="text-[#2563EB]">Blockchain</span>{" "}
            Conference
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-[#9CA3AF] max-w-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {hero.headline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href={hero.primaryCta.url} className="btn-primary">
              {hero.primaryCta.label}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link href={hero.secondaryCta.url} className="btn-secondary">
              {hero.secondaryCta.label}
            </Link>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-14"
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
    <section className="border-y border-white/[0.06]">
      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {homepageContent.stats.map((stat, i) => (
            <motion.div key={stat.label} {...stagger(i)} className="text-center">
              <div className="stat-number">{stat.value}</div>
              <div
                className="text-[11px] tracking-[0.1em] uppercase text-[#6B7280] mt-2"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <SectionHeading label="About MSBC" title={about.sectionTitle} align="left" />
          <p
            className="text-base md:text-lg text-[#9CA3AF] leading-[1.8]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {about.bodyCopy}
          </p>
          <p
            className="mt-4 text-sm text-[#2563EB]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Built in Kuala Lumpur. Connected across Asia.
          </p>
        </div>
        <div className="relative">
          <img
            src={ASSETS.aboutVisual}
            alt="MSBC Network"
            className="w-full h-auto"
          />
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {featured.map((speaker, i) => (
          <motion.div
            key={speaker.speakerId}
            {...stagger(i)}
            className="conference-card p-0 overflow-hidden group"
          >
            {/* Photo — square, sharp corners */}
            <div className="aspect-square overflow-hidden bg-[#1F2937]">
              <img
                src={speaker.photo}
                alt={speaker.fullName}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="p-5">
              <h3
                className="text-sm md:text-base font-semibold text-[#F0F2F8]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {speaker.fullName}
              </h3>
              <p
                className="text-xs md:text-sm text-[#2563EB] mt-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {speaker.title}
              </p>
              <p
                className="text-xs text-[#6B7280] mt-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {speaker.organisation}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-14 text-center">
        <Link href={content.ctaUrl} className="btn-secondary">
          {content.ctaLabel}
          <ArrowRight className="w-4 h-4" />
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
      <div className="space-y-3">
        {featured.map((session, i) => (
          <motion.div
            key={session.sessionId}
            {...stagger(i)}
            className="conference-card flex flex-col md:flex-row md:items-center gap-4 p-5 md:p-6"
          >
            {/* Time */}
            <div className="flex items-center gap-2 md:w-44 shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
              <span
                className="text-sm text-[#9CA3AF]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {session.startTime} – {session.endTime}
              </span>
            </div>
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1.5">
                <span
                  className="text-[10px] font-medium tracking-[0.08em] uppercase px-2.5 py-1 border border-[#2563EB]/20 text-[#2563EB]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {session.format.replace("_", " ")}
                </span>
                <span
                  className="text-[10px] tracking-[0.08em] uppercase text-[#6B7280]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {session.track}
                </span>
              </div>
              <h3
                className="text-base md:text-lg font-semibold text-[#F0F2F8]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {session.title}
              </h3>
              <p
                className="text-sm text-[#6B7280] mt-1 line-clamp-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {session.shortDescription}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-14 text-center">
        <Link href={content.ctaUrl} className="btn-secondary">
          {content.ctaLabel}
          <ArrowRight className="w-4 h-4" />
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
        <img src={ASSETS.hackathonBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/80 to-[#07090F]/60" />
      </div>
      {/* Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.1)_0%,_transparent_70%)] pointer-events-none" />

      <div className="container section-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span
              className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#2563EB] mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Hackathon
            </span>
            <h2 className="headline-lg text-[#F0F2F8]">
              {content.sectionTitle}
            </h2>
            <p
              className="mt-6 text-base md:text-lg text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {content.bodyCopy}
            </p>
            <div className="mt-10">
              <Link href={content.ctaUrl} className="btn-primary">
                {content.ctaLabel}
                <ArrowUpRight className="w-4 h-4" />
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
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
        {universities.slice(0, 6).map((uni, i) => (
          <motion.div
            key={uni.universityId}
            {...stagger(i)}
            className="conference-card p-5 md:p-6 text-center"
          >
            <div
              className="text-2xl md:text-3xl font-bold text-[#2563EB]/30 mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {uni.universityName.split(" ").map(w => w[0]).join("").slice(0, 3)}
            </div>
            <p
              className="text-[11px] md:text-xs text-[#9CA3AF] leading-tight"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {uni.universityName}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-14 text-center">
        <Link href={content.ctaUrl} className="btn-secondary">
          {content.ctaLabel}
          <ArrowRight className="w-4 h-4" />
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
      <div className="space-y-12">
        {grouped.map((group) => (
          <div key={group.tier}>
            <div className="text-center mb-6">
              <span
                className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#6B7280]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {group.label}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {group.items.map((sponsor, i) => (
                <motion.a
                  key={sponsor.sponsorId}
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...stagger(i)}
                  className={`conference-card flex items-center justify-center group ${
                    group.tier === "title"
                      ? "w-32 h-32 md:w-40 md:h-40"
                      : group.tier === "platinum"
                      ? "w-28 h-28 md:w-32 md:h-32"
                      : "w-20 h-20 md:w-24 md:h-24"
                  }`}
                >
                  <span
                    className="text-xs md:text-sm text-[#6B7280] group-hover:text-[#F0F2F8] transition-colors text-center px-2"
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
      <div className="mt-16 flex flex-wrap justify-center gap-4">
        <Link href={content.cta1Url} className="btn-secondary">
          {content.cta1Label}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href={content.cta2Url} className="btn-primary">
          {content.cta2Label}
          <ArrowUpRight className="w-4 h-4" />
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
      <div className="max-w-3xl mx-auto space-y-2">
        {previewFaqs.map((faq) => (
          <div key={faq.faqId} className="border-b border-white/[0.06]">
            <button
              onClick={() => setOpenId(openId === faq.faqId ? null : faq.faqId)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span
                className="text-sm md:text-base font-medium text-[#F0F2F8] pr-4 group-hover:text-[#2563EB] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {faq.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#6B7280] shrink-0 transition-transform duration-200 ${
                  openId === faq.faqId ? "rotate-180 text-[#2563EB]" : ""
                }`}
              />
            </button>
            {openId === faq.faqId && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pb-5"
              >
                <p
                  className="text-sm text-[#9CA3AF] leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-14 text-center">
        <Link href={content.ctaUrl} className="btn-secondary">
          {content.ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

// ─── Final CTA Section ─────────────────────────────────────────
function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[80%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="horizon-glow" />
      <div className="container section-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span
              className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#2563EB] mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Join Us
            </span>
            <h2 className="headline-lg text-[#F0F2F8]">
              Be Part of What's Next
            </h2>
            <p
              className="mt-6 text-base md:text-lg text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Join 700+ students, builders, and ecosystem leaders in Kuala Lumpur for three days of talks, workshops, hackathon experiences, and meaningful connections.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/2026/tickets" className="btn-primary">
                Register Now
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/2026/become-a-sponsor" className="btn-secondary">
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
