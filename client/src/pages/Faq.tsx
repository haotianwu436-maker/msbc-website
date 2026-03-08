/**
 * MSBC FAQ Page
 * Design: "Luminal Horizon" — Categorized accordion FAQ
 */
import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { faqItems, homepageContent } from "@/lib/data";
import { ChevronDown } from "lucide-react";

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
      {/* Hero */}
      <section className="page-hero bg-gradient-to-b from-[#0A0F1C] to-background">
        <div className="container">
          <SectionHeading title="Frequently Asked Questions" subtitle={homepageContent.faq.bodyCopy} />
        </div>
      </section>

      <SectionWrapper>
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpenId(null); }}
              className={`px-4 py-2 rounded-lg font-display text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-amber-500 text-[#0C1222]"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}>
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filtered.map((faq, i) => (
            <motion.div key={faq.faqId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="glass-card rounded-xl overflow-hidden">
              <button onClick={() => setOpenId(openId === faq.faqId ? null : faq.faqId)}
                className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-display text-sm md:text-base font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200 ${openId === faq.faqId ? "rotate-180" : ""}`} />
              </button>
              {openId === faq.faqId && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5">
                  <p className="text-sm font-body text-slate-400 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Still have questions */}
      <SectionWrapper bgClassName="bg-[#0A0F1C]">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-3">Still Have Questions?</h3>
          <p className="text-sm font-body text-slate-400 mb-6">
            If you cannot find the answer you are looking for, feel free to reach out to the MSBC team directly.
          </p>
          <a href="/2026/contact"
            className="inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all">
            Contact Us
          </a>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
