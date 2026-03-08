/**
 * MSBC Hackathon Page — "Stage Presence" Design
 * Builder-focused, aspirational. Fully responsive.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { hackathonContent, ASSETS } from "@/lib/data";
import { ArrowUpRight, Coins, Users, Landmark, Zap, Rocket } from "lucide-react";

const trackIcons: Record<string, React.ReactNode> = {
  coins: <Coins className="w-4 h-4 sm:w-5 sm:h-5" />,
  users: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
  landmark: <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />,
  rocket: <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />,
};

export default function Hackathon() {
  const c = hackathonContent;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={ASSETS.hackathonBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/80 to-[#07090F]/40" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] sm:w-[60%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.1)_0%,_transparent_70%)] pointer-events-none" />
        <div className="container relative z-10 pb-12 sm:pb-16 md:pb-20 lg:pb-28 pt-24 sm:pt-28 md:pt-32">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-[#2563EB] mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Hackathon
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="headline-xl"
            >
              {c.heroHeadline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[#9CA3AF] max-w-2xl leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {c.heroSupportingCopy}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 sm:mt-8 md:mt-10"
            >
              <a href={c.heroPrimaryCta.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {c.heroPrimaryCta.label}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Build */}
      <SectionWrapper>
        <SectionHeading label="Why Build" title={c.whyJoin.title} subtitle={c.whyJoin.bodyCopy} />
      </SectionWrapper>

      {/* Build Tracks */}
      <SectionWrapper elevated>
        <SectionHeading label="Tracks" title={c.tracks.title} subtitle={c.tracks.introCopy} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {c.tracks.items.map((track, i) => (
            <motion.div
              key={track.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="conference-card p-4 sm:p-6 group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-[#2563EB] mb-3 sm:mb-4 border border-[#2563EB]/20 group-hover:bg-[#2563EB]/10 transition-colors">
                {trackIcons[track.icon] || <Zap className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#F0F2F8] mb-1.5 sm:mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {track.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {track.description}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper>
        <SectionHeading label="Timeline" title={c.timeline.title} subtitle={c.timeline.introCopy} />
        <div className="max-w-2xl mx-auto">
          {c.timeline.items.map((item, i) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-3 sm:gap-5 mb-6 sm:mb-8 last:mb-0"
            >
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB] shrink-0">
                  <span className="text-xs sm:text-sm font-medium" style={{ fontFamily: "var(--font-mono)" }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                {i < c.timeline.items.length - 1 && <div className="w-px flex-1 bg-white/[0.06] mt-2" />}
              </div>
              <div className="pb-2 sm:pb-4">
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.1em] uppercase text-[#2563EB]" style={{ fontFamily: "var(--font-mono)" }}>
                  {item.date}
                </span>
                <h4 className="text-sm sm:text-base font-semibold text-[#F0F2F8] mt-1" style={{ fontFamily: "var(--font-display)" }}>
                  {item.phase}
                </h4>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1" style={{ fontFamily: "var(--font-body)" }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] sm:w-[60%] h-[80%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_70%)] pointer-events-none" />
        <div className="horizon-glow" />
        <div className="container section-padding relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="headline-lg text-[#F0F2F8]">{c.finalCta.title}</h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#9CA3AF] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              {c.finalCta.bodyCopy}
            </p>
            <div className="mt-6 sm:mt-8 md:mt-10">
              <a href={c.finalCta.ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {c.finalCta.ctaLabel}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
