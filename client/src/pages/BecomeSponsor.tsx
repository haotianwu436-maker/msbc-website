/**
 * MSBC Become a Sponsor Page — "Stage Presence" Design
 * Professional, conversion-oriented. Sharp edges, mono labels.
 */
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { becomeSponsorContent } from "@/lib/data";
import { ArrowUpRight, Check } from "lucide-react";

export default function BecomeSponsor() {
  const c = becomeSponsorContent;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#2563EB] mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Sponsorship
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
              className="mt-6 text-lg md:text-xl text-[#9CA3AF] max-w-2xl leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {c.heroSupportingCopy}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10"
            >
              <a href={c.heroPrimaryCta.url} className="btn-primary">
                {c.heroPrimaryCta.label}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Sponsor */}
      <SectionWrapper>
        <SectionHeading label="Why Sponsor" title={c.whySponsor.title} subtitle={c.whySponsor.bodyCopy} align="left" />
      </SectionWrapper>

      {/* Sponsorship Tiers */}
      <SectionWrapper elevated>
        <SectionHeading label="Opportunities" title={c.opportunities.title} subtitle={c.opportunities.introCopy} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {c.opportunities.tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`conference-card p-6 ${
                i === 0 ? "border-[#2563EB]/30" : ""
              }`}
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={`text-[11px] font-medium tracking-[0.1em] uppercase ${
                    i === 0 ? "text-[#2563EB]" : "text-[#6B7280]"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {tier.name}
                </span>
              </div>
              <ul className="space-y-3">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-[#9CA3AF]" style={{ fontFamily: "var(--font-body)" }}>
                    <Check className="w-4 h-4 text-[#2563EB] mt-0.5 shrink-0" />
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
        <SectionHeading label="Impact" title={c.whyItMatters.title} subtitle={c.whyItMatters.bodyCopy} />
      </SectionWrapper>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[80%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_70%)] pointer-events-none" />
        <div className="horizon-glow" />
        <div className="container section-padding relative z-10 text-center">
          <h2 className="headline-lg text-[#F0F2F8]">{c.finalCta.title}</h2>
          <p className="mt-6 text-base md:text-lg text-[#9CA3AF] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            {c.finalCta.bodyCopy}
          </p>
          <div className="mt-10">
            <a href={c.finalCta.ctaUrl} className="btn-primary">
              {c.finalCta.ctaLabel}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
