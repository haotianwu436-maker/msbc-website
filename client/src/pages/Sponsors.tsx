/**
 * MSBC Sponsors Page — "Stage Presence" Design
 * Tiered sponsor display. Commercial, premium. Sharp edges.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { sponsors, homepageContent, ASSETS } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

const tierConfig: Record<string, { label: string; size: string; order: number }> = {
  title: { label: "Title Sponsor", size: "w-32 h-32 md:w-40 md:h-40", order: 1 },
  platinum: { label: "Platinum", size: "w-28 h-28 md:w-32 md:h-32", order: 2 },
  gold: { label: "Gold", size: "w-24 h-24 md:w-28 md:h-28", order: 3 },
  silver: { label: "Silver", size: "w-20 h-20 md:w-24 md:h-24", order: 4 },
  community_partner: { label: "Community Partners", size: "w-20 h-20 md:w-24 md:h-24", order: 5 },
  university_partner: { label: "University Partners", size: "w-20 h-20 md:w-24 md:h-24", order: 6 },
  media_partner: { label: "Media Partners", size: "w-20 h-20 md:w-24 md:h-24", order: 7 },
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
          <img src={ASSETS.sponsorsBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/80 to-[#07090F]" />
        </div>
        <div className="container relative z-10">
          <SectionHeading label="Partners & Sponsors" title="Sponsors & Partners" subtitle={homepageContent.sponsors.bodyCopy} />
        </div>
      </section>

      {/* Tiered Sponsors */}
      {tiers.map((tier, ti) => {
        const tierSponsors = sponsors.filter((s) => s.tier === tier);
        const config = tierConfig[tier] || { label: tier, size: "w-20 h-20", order: 99 };
        return (
          <SectionWrapper key={tier} elevated={ti % 2 === 1}>
            <div className="text-center mb-10">
              <span
                className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#6B7280]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {config.label}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {tierSponsors.map((sponsor, i) => (
                <motion.a
                  key={sponsor.sponsorId}
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className={`${config.size} conference-card flex items-center justify-center`}>
                    <span
                      className="text-xs md:text-sm text-[#6B7280] group-hover:text-[#F0F2F8] transition-colors text-center px-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {sponsor.companyName}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </SectionWrapper>
        );
      })}

      {/* Become a Sponsor CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[80%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_70%)] pointer-events-none" />
        <div className="horizon-glow" />
        <div className="container section-padding relative z-10 text-center">
          <span
            className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#2563EB] mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Partner With Us
          </span>
          <h2 className="headline-lg text-[#F0F2F8]">Partner with the Next Generation</h2>
          <p className="mt-6 text-base md:text-lg text-[#9CA3AF] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Join MSBC and help shape a conference where visibility, credibility, and future talent come together.
          </p>
          <div className="mt-10">
            <Link href="/2026/become-a-sponsor" className="btn-primary">
              Become a Sponsor
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
