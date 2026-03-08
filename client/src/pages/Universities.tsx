/**
 * MSBC Participating Universities Page
 * Design: "Luminal Horizon" — Categorized university display
 */
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { universities, homepageContent } from "@/lib/data";
import { GraduationCap, MapPin } from "lucide-react";

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
      {/* Hero */}
      <section className="page-hero bg-gradient-to-b from-[#0A0F1C] to-background">
        <div className="container">
          <SectionHeading title="Participating Universities" subtitle={homepageContent.universities.bodyCopy} />
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, ci) => {
        const config = categoryConfig[cat] || { label: cat, description: "", order: 99 };
        const unis = universities.filter((u) => u.category === cat);
        return (
          <SectionWrapper key={cat} bgClassName={ci % 2 === 1 ? "bg-[#0A0F1C]" : ""}>
            <h3 className="font-display text-lg font-semibold text-amber-400 mb-2 uppercase tracking-wider">{config.label}</h3>
            <p className="text-sm font-body text-slate-400 mb-8">{config.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {unis.map((uni, i) => (
                <motion.a key={uni.universityId} href={uni.websiteUrl} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="glass-card rounded-xl p-5 flex items-center gap-4 group hover:border-amber-500/20 transition-all">
                  <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-amber-500/10 transition-colors">
                    <GraduationCap className="w-7 h-7 text-amber-400/70 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">{uni.universityName}</h4>
                    <div className="flex items-center gap-1 mt-1 text-xs font-body text-slate-500">
                      <MapPin className="w-3 h-3" /> {uni.city}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </SectionWrapper>
        );
      })}

      {/* CTA */}
      <SectionWrapper>
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-3">Want Your University Involved?</h3>
          <p className="text-sm font-body text-slate-400 mb-6">
            Universities, student societies, and campus communities interested in participating or collaborating can reach out through our contact page.
          </p>
          <a href="/2026/contact"
            className="inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all">
            Get in Touch
          </a>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
