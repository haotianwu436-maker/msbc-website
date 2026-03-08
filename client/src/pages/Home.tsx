/**
 * MSBC Homepage
 * Design: "Luminal Horizon" — Cinematic dark theme, amber accents, atmospheric depth
 * Sections: Hero → About → Stats → Speakers → Agenda → Hackathon → Universities → Sponsors → FAQ → Contact → Final CTA
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
  Calendar,
  MapPin,
  Users,
  GraduationCap,
  Mic2,
  Clock,
  ChevronDown,
  Rocket,
  Handshake,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

// ─── Hero Section ──────────────────────────────────────────────
function HeroSection() {
  const { hero } = homepageContent;
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={ASSETS.heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C1222]/60 via-[#0C1222]/40 to-[#0C1222]" />
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="max-w-4xl">
          {/* Event Date Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-body text-amber-300">
              August 15–17, 2026
            </span>
            <span className="text-amber-500/40">|</span>
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-body text-amber-300">
              Kuala Lumpur, Malaysia
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Malaysia Student{" "}
            <span className="text-amber-400">Blockchain</span>{" "}
            Conference
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-5 text-lg md:text-xl font-body text-slate-300 max-w-2xl leading-relaxed"
          >
            {hero.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-3 text-base font-body text-slate-400 max-w-2xl leading-relaxed"
          >
            {hero.supportingCopy}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to={hero.primaryCta.url}
              className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              {hero.primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={hero.secondaryCta.url}
              className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base border border-white/20 hover:border-amber-500/50 text-white hover:text-amber-400 rounded-lg transition-all duration-200 hover:bg-white/5"
            >
              {hero.secondaryCta.label}
            </Link>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-12"
          >
            <Countdown />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-body text-slate-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────────
function AboutSection() {
  const { about } = homepageContent;
  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <SectionHeading title={about.sectionTitle} align="left" />
          <p className="text-base md:text-lg font-body text-slate-300 leading-relaxed">
            {about.bodyCopy}
          </p>
          <p className="mt-4 text-sm font-body text-amber-400/80 italic">
            Built in Kuala Lumpur. Connected across Asia.
          </p>
        </div>
        <div className="relative">
          <div className="rounded-xl overflow-hidden">
            <img
              src={ASSETS.aboutVisual}
              alt="Kuala Lumpur skyline at dusk"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
          {/* Decorative glow */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none" />
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── Stats Section ─────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="relative">
      <div className="section-divider" />
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {homepageContent.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-amber-400">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-body text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}

// ─── Speakers Preview Section ──────────────────────────────────
function SpeakersPreview() {
  const { speakers: content } = homepageContent;
  const featured = speakers.filter((s) => s.featured).slice(0, 4);
  return (
    <SectionWrapper>
      <SectionHeading title={content.sectionTitle} subtitle={content.bodyCopy} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
        {featured.map((speaker, i) => (
          <motion.div
            key={speaker.speakerId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-card rounded-xl p-4 text-center group hover:border-amber-500/30 transition-all duration-300"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-white/10 group-hover:ring-amber-500/30 transition-all">
              <img
                src={speaker.photo}
                alt={speaker.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display text-sm md:text-base font-semibold text-white">
              {speaker.fullName}
            </h3>
            <p className="text-xs md:text-sm font-body text-amber-400/80 mt-1">
              {speaker.title}
            </p>
            <p className="text-xs font-body text-slate-400 mt-0.5">
              {speaker.organisation}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to={content.ctaUrl}
          className="inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all"
        >
          {content.ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

// ─── Agenda Preview Section ────────────────────────────────────
function AgendaPreview() {
  const { agenda: content } = homepageContent;
  const featured = agendaSessions.filter((s) => s.featured).slice(0, 3);

  const formatBadge = (format: string) => {
    const map: Record<string, string> = {
      keynote: "Keynote",
      panel: "Panel",
      workshop: "Workshop",
      fireside_chat: "Fireside Chat",
      hackathon_session: "Hackathon",
    };
    return map[format] || format;
  };

  return (
    <SectionWrapper bgClassName="bg-[#0A0F1C]">
      <SectionHeading title={content.sectionTitle} subtitle={content.bodyCopy} />
      <div className="space-y-4">
        {featured.map((session, i) => (
          <motion.div
            key={session.sessionId}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-card rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 hover:border-amber-500/20 transition-all"
          >
            <div className="flex items-center gap-3 md:w-40 shrink-0">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="font-body text-sm text-slate-300">
                {session.startTime} – {session.endTime}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-body font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                  {formatBadge(session.format)}
                </span>
                <span className="text-[10px] font-body text-slate-500 uppercase tracking-wider">
                  {session.track}
                </span>
              </div>
              <h3 className="font-display text-base md:text-lg font-semibold text-white">
                {session.title}
              </h3>
              <p className="text-sm font-body text-slate-400 mt-1 line-clamp-2">
                {session.shortDescription}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to={content.ctaUrl}
          className="inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all"
        >
          {content.ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

// ─── Hackathon Preview Section ─────────────────────────────────
function HackathonPreview() {
  const { hackathon: content } = homepageContent;
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={ASSETS.hackathonBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0C1222]/80" />
      </div>
      <div className="container section-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6">
              <Rocket className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-body text-amber-300">Hackathon</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {content.sectionTitle}
            </h2>
            <div className="h-[2px] w-16 bg-amber-500 mt-4 mb-5 mx-auto" />
            <p className="text-base md:text-lg font-body text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {content.bodyCopy}
            </p>
            <div className="mt-8">
              <Link
                to={content.ctaUrl}
                className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              >
                {content.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Universities Preview Section ──────────────────────────────
function UniversitiesPreview() {
  const { universities: content } = homepageContent;
  return (
    <SectionWrapper>
      <SectionHeading title={content.sectionTitle} subtitle={content.bodyCopy} />
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {universities.slice(0, 6).map((uni, i) => (
          <motion.div
            key={uni.universityId}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="glass-card rounded-xl p-4 w-36 md:w-40 text-center hover:border-amber-500/20 transition-all"
          >
            <div className="w-14 h-14 mx-auto rounded-lg overflow-hidden bg-white/5 flex items-center justify-center mb-3">
              <GraduationCap className="w-7 h-7 text-amber-400/70" />
            </div>
            <p className="font-body text-xs md:text-sm text-slate-300 leading-tight">
              {uni.universityName}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to={content.ctaUrl}
          className="inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all"
        >
          {content.ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

// ─── Sponsors Preview Section ──────────────────────────────────
function SponsorsPreview() {
  const { sponsors: content } = homepageContent;
  const tierOrder = ["title", "platinum", "gold", "silver"];
  const displaySponsors = sponsors.filter((s) => tierOrder.includes(s.tier));

  return (
    <SectionWrapper bgClassName="bg-[#0A0F1C]">
      <SectionHeading title={content.sectionTitle} subtitle={content.bodyCopy} />
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {displaySponsors.map((sponsor, i) => (
          <motion.a
            key={sponsor.sponsorId}
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className={`rounded-xl overflow-hidden bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-amber-500/30 transition-all ${
                sponsor.tier === "title"
                  ? "w-24 h-24 md:w-28 md:h-28"
                  : sponsor.tier === "platinum"
                  ? "w-20 h-20 md:w-24 md:h-24"
                  : "w-16 h-16 md:w-20 md:h-20"
              }`}
            >
              <Handshake className="w-8 h-8 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
            <span className="text-xs font-body text-slate-400 group-hover:text-amber-400 transition-colors">
              {sponsor.companyName}
            </span>
          </motion.a>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to={content.cta1Url}
          className="inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all"
        >
          {content.cta1Label}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to={content.cta2Url}
          className="inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all"
        >
          {content.cta2Label}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

// ─── FAQ Preview Section ───────────────────────────────────────
function FaqPreview() {
  const { faq: content } = homepageContent;
  const previewFaqs = faqItems.filter((f) => f.category === "general").slice(0, 4);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SectionWrapper>
      <SectionHeading title={content.sectionTitle} subtitle={content.bodyCopy} />
      <div className="max-w-3xl mx-auto space-y-3">
        {previewFaqs.map((faq) => (
          <div
            key={faq.faqId}
            className="glass-card rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenId(openId === faq.faqId ? null : faq.faqId)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-display text-sm md:text-base font-medium text-white pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200 ${
                  openId === faq.faqId ? "rotate-180" : ""
                }`}
              />
            </button>
            {openId === faq.faqId && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 pb-5"
              >
                <p className="text-sm font-body text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          to={content.ctaUrl}
          className="inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all"
        >
          {content.ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}

// ─── Contact Preview Section ───────────────────────────────────
function ContactPreview() {
  const { contact: content } = homepageContent;
  return (
    <SectionWrapper bgClassName="bg-[#0A0F1C]">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading title={content.sectionTitle} subtitle={content.bodyCopy} />
        <Link
          to={content.ctaUrl}
          className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
        >
          <MessageCircle className="w-4 h-4" />
          {content.ctaLabel}
        </Link>
      </div>
    </SectionWrapper>
  );
}

// ─── Final CTA Section ─────────────────────────────────────────
function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-[#0C1222] to-amber-500/10" />
      <div className="container section-padding relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Be Part of What's Next
            </h2>
            <div className="h-[2px] w-16 bg-amber-500 mt-4 mb-5 mx-auto" />
            <p className="text-base md:text-lg font-body text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Join 700+ students, builders, and ecosystem leaders in Kuala Lumpur for three days of talks, workshops, hackathon experiences, and meaningful connections.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/2026/tickets"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              >
                Register Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/2026/become-a-sponsor"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base border border-white/20 hover:border-amber-500/50 text-white hover:text-amber-400 rounded-lg transition-all duration-200 hover:bg-white/5"
              >
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
      <AboutSection />
      <StatsSection />
      <SpeakersPreview />
      <AgendaPreview />
      <HackathonPreview />
      <UniversitiesPreview />
      <SponsorsPreview />
      <FaqPreview />
      <ContactPreview />
      <FinalCtaSection />
    </PageLayout>
  );
}
