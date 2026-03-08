/**
 * MSBC Participating Universities Page — "Stage Presence" Design
 * Categorized university display. Fully responsive.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { universities, homepageContent } from "@/lib/data";
import { MapPin, ArrowUpRight } from "lucide-react";

const categoryConfig: Record<string, { label: string; description: string; order: number }> = {
  organising: { label: "Organising Universities", description: "The universities leading and shaping the MSBC experience.", order: 1 },
  participating: { label: "Participating Universities", description: "Universities actively contributing to the MSBC community.", order: 2 },
  student_club: { label: "Student Communities", description: "Student-led blockchain and tech communities supporting MSBC.", order: 3 },
};

export default function Universities() {
  const categories = Array.from(new Set(universities.map((u) => u.category))).sort(
    (a, b) => (categoryConfig[a]?.order || 99) - (categoryConfig[b]?.order || 99)
  );

  return (
    <PageLayout>
      <section className="page-hero">
        <div className="container">
          <SectionHeading label="Universities" title="Participating Universities" subtitle={homepageContent.universities.bodyCopy} />
        </div>
      </section>

      {categories.map((cat, ci) => {
        const config = categoryConfig[cat] || { label: cat, description: "", order: 99 };
        const unis = universities.filter((u) => u.category === cat);
        return (
          <SectionWrapper key={cat} elevated={ci % 2 === 1}>
            <div className="mb-6 sm:mb-8 md:mb-10">
              <span
                className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-[#2563EB] mb-1.5 sm:mb-2 inline-block"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {config.label}
              </span>
              <p className="text-xs sm:text-sm text-[#6B7280]" style={{ fontFamily: "var(--font-body)" }}>
                {config.description}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {unis.map((uni, i) => (
                <motion.a
                  key={uni.universityId}
                  href={uni.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="conference-card p-3 sm:p-4 md:p-5 flex items-center gap-3 sm:gap-4 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-[#2563EB]/30 transition-colors">
                    <span
                      className="text-xs sm:text-sm font-bold text-[#2563EB]/40 group-hover:text-[#2563EB] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {uni.universityName.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#F0F2F8] group-hover:text-[#2563EB] transition-colors truncate" style={{ fontFamily: "var(--font-display)" }}>
                      {uni.universityName}
                    </h4>
                    <div className="flex items-center gap-1 mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {uni.city}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </SectionWrapper>
        );
      })}

      <SectionWrapper>
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="headline-sm text-[#F0F2F8]">Want Your University Involved?</h3>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-3 sm:mt-4 mb-6 sm:mb-8" style={{ fontFamily: "var(--font-body)" }}>
            Universities, student societies, and campus communities interested in participating or collaborating can reach out through our contact page.
          </p>
          <Link href="/2026/contact" className="btn-primary">
            Get in Touch
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
