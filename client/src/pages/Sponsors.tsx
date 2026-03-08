/**
 * MSBC Sponsors Page
 * Design: "Luminal Horizon" — Tiered sponsor display with premium feel
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { sponsors, homepageContent, ASSETS } from "@/lib/data";
import { ArrowRight, Handshake } from "lucide-react";

const tierConfig: Record<string, { label: string; size: string; order: number }> = {
  title: { label: "Title Sponsor", size: "w-28 h-28 md:w-36 md:h-36", order: 1 },
  platinum: { label: "Platinum", size: "w-24 h-24 md:w-28 md:h-28", order: 2 },
  gold: { label: "Gold", size: "w-20 h-20 md:w-24 md:h-24", order: 3 },
  silver: { label: "Silver", size: "w-16 h-16 md:w-20 md:h-20", order: 4 },
  community_partner: { label: "Community Partners", size: "w-16 h-16 md:w-20 md:h-20", order: 5 },
  university_partner: { label: "University Partners", size: "w-16 h-16 md:w-20 md:h-20", order: 6 },
  media_partner: { label: "Media Partners", size: "w-16 h-16 md:w-20 md:h-20", order: 7 },
};

export default function Sponsors() {
  const tiers = Array.from(new Set(sponsors.map((s) => s.tier))).sort(
    (a, b) => (tierConfig[a]?.order || 99) - (tierConfig[b]?.order || 99)
  );

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative page-hero overflow-hidden">
        <div className="absolute inset-0">
          <img src={ASSETS.sponsorsBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C1222]/80 to-[#0C1222]" />
        </div>
        <div className="container relative z-10">
          <SectionHeading title="Sponsors & Partners" subtitle={homepageContent.sponsors.bodyCopy} />
        </div>
      </section>

      {/* Tiered Sponsors */}
      {tiers.map((tier) => {
        const tierSponsors = sponsors.filter((s) => s.tier === tier);
        const config = tierConfig[tier] || { label: tier, size: "w-16 h-16", order: 99 };
        return (
          <SectionWrapper key={tier} bgClassName={tiers.indexOf(tier) % 2 === 1 ? "bg-[#0A0F1C]" : ""}>
            <h3 className="font-display text-lg font-semibold text-amber-400 mb-8 text-center uppercase tracking-wider">
              {config.label}
            </h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {tierSponsors.map((sponsor, i) => (
                <motion.a
                  key={sponsor.sponsorId}
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className={`${config.size} rounded-xl bg-white/5 border border-white/5 group-hover:border-amber-500/30 flex items-center justify-center transition-all overflow-hidden`}>
                    <Handshake className="w-10 h-10 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <span className="text-sm font-body text-slate-300 group-hover:text-amber-400 transition-colors text-center">
                    {sponsor.companyName}
                  </span>
                </motion.a>
              ))}
            </div>
          </SectionWrapper>
        );
      })}

      {/* Become a Sponsor CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-[#0C1222] to-amber-500/10" />
        <div className="container section-padding relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Partner with the Next Generation</h2>
          <div className="h-[2px] w-16 bg-amber-500 mt-4 mb-5 mx-auto" />
          <p className="text-base font-body text-slate-300 max-w-2xl mx-auto">
            Join MSBC and help shape a conference where visibility, credibility, and future talent come together.
          </p>
          <div className="mt-8">
            <Link to="/2026/become-a-sponsor"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              Become a Sponsor <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
