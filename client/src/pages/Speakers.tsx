/**
 * MSBC Speakers Page
 * Design: "Luminal Horizon" — Featured speakers grid with modal detail view
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { speakers, type Speaker, homepageContent } from "@/lib/data";
import { X, ExternalLink } from "lucide-react";

function SpeakerCard({ speaker, onClick }: { speaker: Speaker; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="glass-card rounded-xl p-5 text-left group hover:border-amber-500/30 transition-all duration-300 w-full"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-amber-500/30 transition-all shrink-0">
          <img src={speaker.photo} alt={speaker.fullName} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base md:text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
            {speaker.fullName}
          </h3>
          <p className="text-sm font-body text-amber-400/80 mt-0.5">{speaker.title}</p>
          <p className="text-xs font-body text-slate-400 mt-0.5">{speaker.organisation}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {speaker.topicTags.map((tag) => (
              <span key={tag} className="text-[10px] font-body px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card rounded-2xl p-6 md:p-8 max-w-lg w-full relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-start gap-5">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-amber-500/30 shrink-0">
            <img src={speaker.photo} alt={speaker.fullName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-white">{speaker.fullName}</h3>
            <p className="text-sm font-body text-amber-400 mt-1">{speaker.title}</p>
            <p className="text-sm font-body text-slate-400">{speaker.organisation}</p>
          </div>
        </div>
        <p className="mt-5 text-sm font-body text-slate-300 leading-relaxed">{speaker.shortBio}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {speaker.topicTags.map((tag) => (
            <span key={tag} className="text-xs font-body px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {tag}
            </span>
          ))}
        </div>
        {speaker.socialLinks.length > 0 && (
          <div className="mt-5 flex gap-2">
            {speaker.socialLinks.map((link) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-body text-slate-400 hover:text-amber-400 transition-colors">
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
      <section className="page-hero bg-gradient-to-b from-[#0A0F1C] to-background">
        <div className="container">
          <SectionHeading
            title="Meet the Speakers"
            subtitle={homepageContent.speakers.bodyCopy}
          />
        </div>
      </section>

      {/* Featured Speakers */}
      <SectionWrapper>
        <h3 className="font-display text-lg font-semibold text-amber-400 mb-6 uppercase tracking-wider">Featured Speakers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((speaker) => (
            <SpeakerCard key={speaker.speakerId} speaker={speaker} onClick={() => setSelectedSpeaker(speaker)} />
          ))}
        </div>
      </SectionWrapper>

      {/* All Speakers */}
      {others.length > 0 && (
        <SectionWrapper bgClassName="bg-[#0A0F1C]">
          <h3 className="font-display text-lg font-semibold text-slate-300 mb-6 uppercase tracking-wider">All Speakers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {others.map((speaker) => (
              <SpeakerCard key={speaker.speakerId} speaker={speaker} onClick={() => setSelectedSpeaker(speaker)} />
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedSpeaker && <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />}
      </AnimatePresence>
    </PageLayout>
  );
}
