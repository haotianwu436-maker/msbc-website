/**
 * MSBC FAQ Page — "Stage Presence" Design
 * Categorized accordion FAQ. Fully responsive.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { faqItems, homepageContent } from "@/lib/data";
import { ChevronDown, ArrowUpRight } from "lucide-react";

const categoryLabels: Record<string, string> = {
  general: "General",
  registration: "Registration & Tickets",
  hackathon: "Hackathon",
  sponsorship: "Sponsorship",
  university: "Universities & Communities",
};

export default function Faq() {
  const categories = Array.from(new Set(faqItems.map((f) => f.category)));
  const [activeCategory, setActiveCategory] = useState("general");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = faqItems.filter((f) => f.category === activeCategory).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <PageLayout>
      <section className="page-hero">
        <div className="container">
          <SectionHeading label="Support" title="Frequently Asked Questions" subtitle={homepageContent.faq.bodyCopy} />
        </div>
      </section>

      <SectionWrapper>
        {/* Category Tabs — horizontal scroll on mobile */}
        <div className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-10 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenId(null); }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? "bg-[#2563EB] text-white"
                  : "bg-white/[0.03] text-[#6B7280] hover:text-[#F0F2F8] border border-white/[0.06]"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
          {filtered.map((faq, i) => (
            <motion.div
              key={faq.faqId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="conference-card overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.faqId ? null : faq.faqId)}
                className="w-full flex items-center justify-between p-3 sm:p-4 md:p-5 text-left"
              >
                <span className="text-xs sm:text-sm md:text-base font-medium text-[#F0F2F8] pr-3 sm:pr-4" style={{ fontFamily: "var(--font-display)" }}>
                  {faq.question}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB] shrink-0 transition-transform duration-200 ${openId === faq.faqId ? "rotate-180" : ""}`} />
              </button>
              {openId === faq.faqId && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5">
                  <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper elevated>
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="headline-sm text-[#F0F2F8]">Still Have Questions?</h3>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-3 sm:mt-4 mb-5 sm:mb-8" style={{ fontFamily: "var(--font-body)" }}>
            If you cannot find the answer you are looking for, feel free to reach out to the MSBC team directly.
          </p>
          <Link href="/2026/contact" className="btn-primary">
            Contact Us
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
