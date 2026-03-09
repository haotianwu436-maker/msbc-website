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
import { faqItems as defaultFaqItems, homepageContent } from "@/lib/data";
import { useFaqItems } from "@/hooks/useSupabase";
import { ChevronDown, ArrowUpRight } from "lucide-react";

const categoryLabels: Record<string, string> = {
  general: "General",
  registration: "Registration & Tickets",
  hackathon: "Hackathon",
  sponsorship: "Sponsorship",
  university: "Universities & Communities",
};

export default function Faq() {
  // Try to fetch from Supabase, fallback to default data
  const { data: supabaseFaqs } = useFaqItems();
  const faqItems = supabaseFaqs && supabaseFaqs.length > 0 ? supabaseFaqs : defaultFaqItems;
  
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
        {/* Category Tabs — enhanced horizontal scroll on mobile */}
        <div className="flex gap-3 mb-8 sm:mb-12 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenId(null); }}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 rounded-lg ${
                activeCategory === cat
                  ? "bg-[#0066ff] text-white shadow-lg shadow-[#0066ff]/30"
                  : "bg-white/[0.04] text-[#8b99b5] hover:text-[#f5f6fa] hover:bg-white/[0.06] border border-white/[0.08]"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* FAQ Items — enhanced layout */}
        <div className="max-w-4xl mx-auto space-y-2 sm:space-y-3">
          {filtered.map((faq, i) => (
            <motion.div
              key={faq.faqId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="conference-card overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.faqId ? null : faq.faqId)}
                className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left group"
              >
                <span className="text-sm sm:text-base md:text-lg font-semibold text-[#F0F2F8] pr-4 sm:pr-6 group-hover:text-[#2563EB] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {faq.question}
                </span>
                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB] shrink-0 transition-transform duration-300 ${openId === faq.faqId ? "rotate-180" : ""}`} />
              </button>
              {openId === faq.faqId && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6"
                >
                  <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
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
