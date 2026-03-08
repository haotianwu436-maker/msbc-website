/**
 * MSBC Speakers Page — "Stage Presence" Design
 * Grayscale-to-color speaker cards, sharp edges, mono labels.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { speakers, type Speaker, homepageContent } from "@/lib/data";
import { X, ExternalLink, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

function SpeakerCard({ speaker, onClick }: { speaker: Speaker; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="conference-card p-0 overflow-hidden text-left group w-full"
    >
      <div className="flex items-start gap-5 p-5 md:p-6">
        <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden shrink-0 bg-[#1F2937]">
          <img
            src={speaker.photo}
            alt={speaker.fullName}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-base md:text-lg font-semibold text-[#F0F2F8] group-hover:text-[#2563EB] transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {speaker.fullName}
          </h3>
          <p className="text-sm text-[#2563EB] mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
            {speaker.title}
          </p>
          <p className="text-xs text-[#6B7280] mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
            {speaker.organisation}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {speaker.topicTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2.5 py-1 border border-white/[0.06] text-[#9CA3AF]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {tag}
              </span>
            ))}
          </div>
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#111827] border border-white/[0.06] p-6 md:p-8 max-w-lg w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B7280] hover:text-[#F0F2F8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-start gap-5">
          <div className="w-24 h-24 overflow-hidden shrink-0 bg-[#1F2937]">
            <img src={speaker.photo} alt={speaker.fullName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#F0F2F8]" style={{ fontFamily: "var(--font-display)" }}>
              {speaker.fullName}
            </h3>
            <p className="text-sm text-[#2563EB] mt-1" style={{ fontFamily: "var(--font-body)" }}>
              {speaker.title}
            </p>
            <p className="text-sm text-[#6B7280]" style={{ fontFamily: "var(--font-body)" }}>
              {speaker.organisation}
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm text-[#9CA3AF] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          {speaker.shortBio}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {speaker.topicTags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2.5 py-1 border border-[#2563EB]/20 text-[#2563EB]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {tag}
            </span>
          ))}
        </div>
        {speaker.socialLinks.length > 0 && (
          <div className="mt-5 flex gap-3">
            {speaker.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#2563EB] transition-colors"
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
  const featured = speakers.filter((s) => s.featured);
  const others = speakers.filter((s) => !s.featured);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            label="Speakers"
            title="Meet the Speakers"
            subtitle={homepageContent.speakers.bodyCopy}
          />
        </div>
      </section>

      {/* Featured Speakers */}
      <SectionWrapper>
        <span
          className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#2563EB] mb-8"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Featured Speakers
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((speaker) => (
            <SpeakerCard key={speaker.speakerId} speaker={speaker} onClick={() => setSelectedSpeaker(speaker)} />
          ))}
        </div>
      </SectionWrapper>

      {/* All Speakers */}
      {others.length > 0 && (
        <SectionWrapper elevated>
          <span
            className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#6B7280] mb-8"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            All Speakers
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {others.map((speaker) => (
              <SpeakerCard key={speaker.speakerId} speaker={speaker} onClick={() => setSelectedSpeaker(speaker)} />
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* CTA */}
      <SectionWrapper>
        <div className="text-center">
          <Link href="/2026/tickets" className="btn-primary">
            Register Now
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>

      {/* Modal */}
      <AnimatePresence>
        {selectedSpeaker && <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />}
      </AnimatePresence>
    </PageLayout>
  );
}
