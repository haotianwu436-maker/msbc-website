/**
 * MSBC Contact Page
 * Design: "Luminal Horizon" — Warm, professional, multi-channel contact
 */
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { contactPageContent, contactMethods, siteSettings } from "@/lib/data";
import { ArrowRight, Mail, Handshake, Newspaper, Users, HelpCircle } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  sponsorship: <Handshake className="w-6 h-6" />,
  media: <Newspaper className="w-6 h-6" />,
  community: <Users className="w-6 h-6" />,
  general: <HelpCircle className="w-6 h-6" />,
};

export default function Contact() {
  const c = contactPageContent;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero bg-gradient-to-b from-[#0A0F1C] to-background">
        <div className="container">
          <SectionHeading title={c.heroHeadline} subtitle={c.heroSupportingCopy} />
        </div>
      </section>

      {/* Contact Cards */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {contactMethods.map((method, i) => (
            <motion.div key={method.contactId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-amber-500/20 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-500/20 transition-colors">
                {typeIcons[method.contactType] || <Mail className="w-6 h-6" />}
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">{method.label}</h3>
              <p className="text-sm font-body text-slate-400 leading-relaxed mb-4">{method.description}</p>
              <a href={`mailto:${method.email}`}
                className="inline-flex items-center gap-2 text-sm font-display font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                {method.ctaLabel} <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Social Links */}
      <SectionWrapper bgClassName="bg-[#0A0F1C]">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-3">{c.social.title}</h3>
          <p className="text-sm font-body text-slate-400 mb-6">{c.social.bodyCopy}</p>
          <div className="flex justify-center gap-4">
            {siteSettings.socialLinks.map((link) => (
              <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 transition-all font-body text-sm font-medium border border-white/5 hover:border-amber-500/30">
                {link.platform === "twitter" && "X"}
                {link.platform === "telegram" && "TG"}
                {link.platform === "linkedin" && "LI"}
                {link.platform === "instagram" && "IG"}
              </a>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper>
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-display text-2xl font-bold text-white mb-3">{c.finalCta.title}</h3>
          <p className="text-sm font-body text-slate-400 mb-6">{c.finalCta.bodyCopy}</p>
          <a href={c.finalCta.ctaUrl}
            className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-semibold text-base bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
            {c.finalCta.ctaLabel} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
