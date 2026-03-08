/**
 * MSBC Contact Page — "Stage Presence" Design
 * Professional, multi-channel contact. Sharp edges, mono labels.
 */
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { contactPageContent, contactMethods, siteSettings } from "@/lib/data";
import { ArrowUpRight, Mail, Handshake, Newspaper, Users, HelpCircle } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  sponsorship: <Handshake className="w-5 h-5" />,
  media: <Newspaper className="w-5 h-5" />,
  community: <Users className="w-5 h-5" />,
  general: <HelpCircle className="w-5 h-5" />,
};

export default function Contact() {
  const c = contactPageContent;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <SectionHeading label="Contact" title={c.heroHeadline} subtitle={c.heroSupportingCopy} />
        </div>
      </section>

      {/* Contact Cards */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {contactMethods.map((method, i) => (
            <motion.div
              key={method.contactId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="conference-card p-6 group"
            >
              <div className="w-10 h-10 border border-white/[0.06] flex items-center justify-center text-[#2563EB] mb-5 group-hover:border-[#2563EB]/30 transition-colors">
                {typeIcons[method.contactType] || <Mail className="w-5 h-5" />}
              </div>
              <h3 className="text-lg font-semibold text-[#F0F2F8] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {method.label}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-5" style={{ fontFamily: "var(--font-body)" }}>
                {method.description}
              </p>
              <a
                href={`mailto:${method.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#2563EB] hover:text-[#3B82F6] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {method.ctaLabel}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Social Links */}
      <SectionWrapper elevated>
        <div className="max-w-2xl mx-auto text-center">
          <span
            className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#2563EB] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Follow Us
          </span>
          <h3 className="headline-sm text-[#F0F2F8]">{c.social.title}</h3>
          <p className="text-sm text-[#6B7280] mt-4 mb-8" style={{ fontFamily: "var(--font-body)" }}>
            {c.social.bodyCopy}
          </p>
          <div className="flex justify-center gap-3">
            {siteSettings.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center border border-white/[0.06] text-[#6B7280] hover:text-[#2563EB] hover:border-[#2563EB]/30 transition-all text-sm font-medium"
                style={{ fontFamily: "var(--font-mono)" }}
              >
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
          <h3 className="headline-sm text-[#F0F2F8]">{c.finalCta.title}</h3>
          <p className="text-sm text-[#6B7280] mt-4 mb-8" style={{ fontFamily: "var(--font-body)" }}>
            {c.finalCta.bodyCopy}
          </p>
          <a href={c.finalCta.ctaUrl} className="btn-primary">
            {c.finalCta.ctaLabel}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
