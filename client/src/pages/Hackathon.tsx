/**
 * MSBC Hackathon Page
 * Design: "Luminal Horizon" — Builder-focused, aspirational tone
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { hackathonContent, ASSETS } from "@/lib/data";
import { ArrowRight, Rocket, Coins, Users, Landmark, Zap, Calendar, CheckCircle } from "lucide-react";

const trackIcons: Record<string, React.ReactNode> = {
  coins: <Coins className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  landmark: <Landmark className="w-6 h-6" />,
  rocket: <Rocket className="w-6 h-6" />,
};

export default function Hackathon() {
  const c = hackathonContent;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={ASSETS.hackathonBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C1222]/70 via-[#0C1222]/50 to-[#0C1222]" />
        </div>
        <div className="container relative z-10 page-hero">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6">
              <Rocket className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-body text-amber-300">Hackathon</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              {c.heroHeadline}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-5 text-lg font-body text-slate-300 max-w-2xl leading-relaxed">
              {c.heroSupportingCopy}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8">
              <a href={c.heroPrimaryCta.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                {c.heroPrimaryCta.label} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Build */}
      <SectionWrapper>
        <SectionHeading title={c.whyJoin.title} subtitle={c.whyJoin.bodyCopy} />
      </SectionWrapper>

      {/* Build Tracks */}
      <SectionWrapper bgClassName="bg-[#0A0F1C]">
        <SectionHeading title={c.tracks.title} subtitle={c.tracks.introCopy} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {c.tracks.items.map((track, i) => (
            <motion.div key={track.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-amber-500/20 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500/20 transition-colors">
                {trackIcons[track.icon] || <Zap className="w-6 h-6" />}
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">{track.name}</h3>
              <p className="text-sm font-body text-slate-400 leading-relaxed">{track.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper>
        <SectionHeading title={c.timeline.title} subtitle={c.timeline.introCopy} />
        <div className="max-w-2xl mx-auto">
          {c.timeline.items.map((item, i) => (
            <motion.div key={item.phase} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-4 mb-6 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                {i < c.timeline.items.length - 1 && <div className="w-px flex-1 bg-amber-500/20 mt-2" />}
              </div>
              <div className="pb-6">
                <p className="text-xs font-body text-amber-400 uppercase tracking-wider mb-1">{item.date}</p>
                <h4 className="font-display text-base font-semibold text-white">{item.phase}</h4>
                <p className="text-sm font-body text-slate-400 mt-1">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-[#0C1222] to-amber-500/10" />
        <div className="container section-padding relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">{c.finalCta.title}</h2>
            <div className="h-[2px] w-16 bg-amber-500 mt-4 mb-5 mx-auto" />
            <p className="text-base font-body text-slate-300 max-w-2xl mx-auto">{c.finalCta.bodyCopy}</p>
            <div className="mt-8">
              <a href={c.finalCta.ctaUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                {c.finalCta.ctaLabel} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
