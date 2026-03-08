/**
 * MSBC Become a Sponsor Page
 * Design: "Luminal Horizon" — Professional, conversion-oriented
 */
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { becomeSponsorContent } from "@/lib/data";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

export default function BecomeSponsor() {
  const c = becomeSponsorContent;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero bg-gradient-to-b from-[#0A0F1C] to-background">
        <div className="container">
          <div className="max-w-3xl">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
              {c.heroHeadline}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-5 text-lg font-body text-slate-300 max-w-2xl leading-relaxed">
              {c.heroSupportingCopy}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8">
              <a href={c.heroPrimaryCta.url}
                className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                {c.heroPrimaryCta.label} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Sponsor */}
      <SectionWrapper>
        <SectionHeading title={c.whySponsor.title} subtitle={c.whySponsor.bodyCopy} align="left" />
      </SectionWrapper>

      {/* Sponsorship Tiers */}
      <SectionWrapper bgClassName="bg-[#0A0F1C]">
        <SectionHeading title={c.opportunities.title} subtitle={c.opportunities.introCopy} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.opportunities.tiers.map((tier, i) => (
            <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`glass-card rounded-xl p-6 hover:border-amber-500/20 transition-all ${
                i === 0 ? "border-amber-500/30 sm:col-span-2 lg:col-span-1" : ""
              }`}>
              <div className="flex items-center gap-2 mb-4">
                <Star className={`w-5 h-5 ${i === 0 ? "text-amber-400" : "text-slate-500"}`} />
                <h3 className="font-display text-lg font-semibold text-white">{tier.name}</h3>
              </div>
              <ul className="space-y-2.5">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm font-body text-slate-300">
                    <CheckCircle className="w-4 h-4 text-amber-400/70 mt-0.5 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Why It Matters */}
      <SectionWrapper>
        <SectionHeading title={c.whyItMatters.title} subtitle={c.whyItMatters.bodyCopy} />
      </SectionWrapper>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-[#0C1222] to-amber-500/10" />
        <div className="container section-padding relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">{c.finalCta.title}</h2>
          <div className="h-[2px] w-16 bg-amber-500 mt-4 mb-5 mx-auto" />
          <p className="text-base font-body text-slate-300 max-w-2xl mx-auto">{c.finalCta.bodyCopy}</p>
          <div className="mt-8">
            <a href={c.finalCta.ctaUrl}
              className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              {c.finalCta.ctaLabel} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
