/**
 * MSBC Sponsors Page — "Stage Presence" Design
 * Tiered sponsor display. Fully responsive.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { sponsors as defaultSponsors, homepageContent, ASSETS } from "@/lib/data";
import { useSponsors } from "@/hooks/useSupabase";
import { ArrowUpRight } from "lucide-react";

const tierConfig: Record<string, { label: string; size: string; order: number }> = {
  title: { label: "Title Sponsor", size: "w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40", order: 1 },
  platinum: { label: "Platinum", size: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32", order: 2 },
  gold: { label: "Gold", size: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28", order: 3 },
  silver: { label: "Silver", size: "w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24", order: 4 },
  community_partner: { label: "Community Partners", size: "w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24", order: 5 },
  university_partner: { label: "University Partners", size: "w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24", order: 6 },
  media_partner: { label: "Media Partners", size: "w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24", order: 7 },
};

export default function Sponsors() {
  // Try to fetch from Supabase, fallback to default data
  const { data: supabaseSponsors } = useSponsors();
  const sponsors = supabaseSponsors && supabaseSponsors.length > 0 ? supabaseSponsors : defaultSponsors;
  
  const tiers = Array.from(new Set(sponsors.map((s) => s.tier))).sort(
    (a, b) => (tierConfig[a]?.order || 99) - (tierConfig[b]?.order || 99)
  );

  return (
    <PageLayout>
      <section className="relative page-hero overflow-hidden">
        <div className="absolute inset-0">
          <img src={ASSETS.sponsorsBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07090F]/80 to-[#07090F]" />
        </div>
        <div className="container relative z-10">
          <SectionHeading label="Partners & Sponsors" title="Sponsors & Partners" subtitle={homepageContent.sponsors.bodyCopy} />
        </div>
      </section>

      {tiers.map((tier, ti) => {
        const tierSponsors = sponsors.filter((s) => s.tier === tier);
        const config = tierConfig[tier] || { label: tier, size: "w-16 h-16 sm:w-20 sm:h-20", order: 99 };
        return (
          <SectionWrapper key={tier} elevated={ti % 2 === 1}>
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <span
                className="text-[10px] sm:text-[11px] font-medium tracking-[0.15em] uppercase text-[#0066ff]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {config.label}
              </span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
              {tierSponsors.map((sponsor, i) => (
                <motion.a
                  key={sponsor.sponsorId}
                  href={sponsor.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-3 sm:gap-4 group"
                >
                  <div className={`${config.size} conference-card flex items-center justify-center p-3 sm:p-4`}>
                    <span
                      className="text-[11px] sm:text-xs md:text-sm font-medium text-[#8b99b5] group-hover:text-[#f5f6fa] transition-colors text-center px-2 sm:px-3 leading-tight"
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

      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] sm:w-[60%] h-[80%] bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_70%)] pointer-events-none" />
        <div className="horizon-glow" />
        <div className="container section-padding relative z-10 text-center">
          <span
            className="inline-block text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-[#2563EB] mb-4 sm:mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Partner With Us
          </span>
          <h2 className="headline-lg text-[#F0F2F8]">Partner with the Next Generation</h2>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#9CA3AF] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Join MSBC and help shape a conference where visibility, credibility, and future talent come together.
          </p>
          <div className="mt-6 sm:mt-8 md:mt-10">
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
