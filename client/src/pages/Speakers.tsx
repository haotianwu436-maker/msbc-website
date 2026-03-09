/**
 * MSBC Speakers Page — TOKEN2049 Style
 * Horizontal speaker cards with large photos, circular avatars below
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import { speakers as defaultSpeakers, type Speaker } from "@/lib/data";
import { useSpeakers } from "@/hooks/useSupabase";
import { X, ExternalLink, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

function FeaturedSpeakerCard({ speaker, onClick }: { speaker: Speaker; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="conference-card p-0 overflow-hidden text-left group w-full"
    >
      <div className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
        {/* Large portrait — TOKEN2049 style */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 shrink-0 overflow-hidden rounded-xl relative">
          <img
            src={speaker.photo}
            alt={speaker.fullName}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050d1c]/40 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
        {/* Text content */}
        <div className="flex-1 min-w-0 pt-1">
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f5f6fa] group-hover:text-[#0066ff] transition-colors mb-2 uppercase tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {speaker.fullName}
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-[#f5f6fa] mb-1 uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {speaker.organisation}
          </p>
          <p className="text-sm sm:text-base text-[#0066ff] uppercase" style={{ fontFamily: "var(--font-body)" }}>
            {speaker.title}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function SpeakerModal({ speaker, onClose }: { speaker: Speaker; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0f1729] border border-[#1e293b] p-5 sm:p-6 md:p-8 w-full sm:max-w-lg relative sm:rounded-xl rounded-t-xl max-h-[85vh] overflow-y-auto halftone-bg"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#8b99b5] hover:text-[#f5f6fa] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-start gap-3 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 overflow-hidden shrink-0 bg-[#0f1729] rounded-xl">
            <img src={speaker.photo} alt={speaker.fullName} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#f5f6fa]" style={{ fontFamily: "var(--font-display)" }}>
              {speaker.fullName}
            </h3>
            <p className="text-xs sm:text-sm text-[#0066ff] mt-1" style={{ fontFamily: "var(--font-body)" }}>
              {speaker.title}
            </p>
            <p className="text-xs sm:text-sm text-[#8b99b5]" style={{ fontFamily: "var(--font-body)" }}>
              {speaker.organisation}
            </p>
          </div>
        </div>
        <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-[#8b99b5] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          {speaker.shortBio}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
          {speaker.topicTags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#0066ff]/20 text-[#0066ff] rounded-md"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {tag}
            </span>
          ))}
        </div>
        {speaker.socialLinks.length > 0 && (
          <div className="mt-4 sm:mt-5 flex flex-wrap gap-3">
            {speaker.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#8b99b5] hover:text-[#0066ff] transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <ExternalLink className="w-3 h-3" /> {link.platform}
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  
  // Try to fetch from Supabase, fallback to default data
  const { data: supabaseSpeakers, loading, error } = useSpeakers();
  const speakers = supabaseSpeakers && supabaseSpeakers.length > 0 ? supabaseSpeakers : defaultSpeakers;
  
  const featured = speakers.filter((s) => s.featured).slice(0, 4);
  const others = speakers.filter((s) => !s.featured).slice(0, 8);

  return (
    <PageLayout>
      {/* Hero Section — TOKEN2049 style */}
      <section className="page-hero halftone-bg">
        <div className="container">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block text-xs sm:text-sm font-medium tracking-[0.15em] uppercase text-[#0066ff] mb-6 sm:mb-8"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                OUR SPEAKERS
              </span>
              <h1
                className="text-[clamp(2rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#f5f6fa] mb-6 sm:mb-8 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                THE LEADING VOICES.
                <br />
                ON CRYPTO'S{" "}
                <span className="text-[#0066ff]">BIGGEST</span> STAGE.
              </h1>
              <Link href="/2026/tickets" className="btn-primary text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 inline-flex items-center gap-2">
                SEE MORE SPEAKERS
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Speakers — TOKEN2049 horizontal layout */}
      {loading ? (
        <SectionWrapper>
          <div className="text-center py-12 text-[#8b99b5]">
            加载中...
          </div>
        </SectionWrapper>
      ) : featured.length > 0 ? (
        <SectionWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((speaker) => (
              <FeaturedSpeakerCard key={speaker.speakerId} speaker={speaker} onClick={() => setSelectedSpeaker(speaker)} />
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      {/* More Speakers — Circular avatars */}
      {others.length > 0 && (
        <SectionWrapper elevated>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10">
            {others.map((speaker) => (
              <motion.button
                key={speaker.speakerId}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedSpeaker(speaker)}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/[0.08] hover:border-[#0066ff]/40 transition-all group"
              >
                <img
                  src={speaker.photo}
                  alt={speaker.fullName}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </motion.button>
            ))}
          </div>
          <div className="text-center">
            <p
              className="text-sm sm:text-base md:text-lg font-medium text-[#8b99b5] uppercase tracking-wide"
              style={{ fontFamily: "var(--font-display)" }}
            >
              AND MANY MORE
            </p>
          </div>
        </SectionWrapper>
      )}

      {/* CTA Section */}
      <SectionWrapper>
        <div className="text-center">
          <Link href="/2026/tickets" className="btn-primary text-base sm:text-lg px-10 py-5">
            Register Now
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </SectionWrapper>

      <AnimatePresence>
        {selectedSpeaker && <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />}
      </AnimatePresence>
    </PageLayout>
  );
}
