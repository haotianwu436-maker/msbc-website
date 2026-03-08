/**
 * MSBC Tickets & Registration Page — "Stage Presence" Design
 * Clean ticket cards with external Luma links. Sharp, commercial.
 */
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { ticketsContent } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

const statusStyles: Record<string, { label: string; border: string; text: string }> = {
  open: { label: "Open", border: "border-emerald-500/30", text: "text-emerald-400" },
  coming_soon: { label: "Coming Soon", border: "border-[#2563EB]/30", text: "text-[#2563EB]" },
  sold_out: { label: "Sold Out", border: "border-red-500/30", text: "text-red-400" },
  closed: { label: "Closed", border: "border-white/[0.06]", text: "text-[#6B7280]" },
};

export default function Tickets() {
  const c = ticketsContent;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <SectionHeading label="Registration" title={c.heroHeadline} subtitle={c.heroSupportingCopy} />
          <div className="flex flex-wrap justify-center gap-6 mt-2">
            <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>
              Aug 15–17, 2026
            </span>
            <span className="w-6 h-[1px] bg-white/20 self-center" />
            <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#6B7280]" style={{ fontFamily: "var(--font-mono)" }}>
              Kuala Lumpur, Malaysia
            </span>
          </div>
        </div>
      </section>

      {/* Ticket Cards */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {c.ticketTypes.map((ticket, i) => {
            const status = statusStyles[ticket.status] || statusStyles.open;
            const isClickable = ticket.status === "open";
            return (
              <motion.div
                key={ticket.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`conference-card p-6 flex flex-col ${
                  i === 0 ? "border-[#2563EB]/30" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#6B7280]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Ticket
                  </span>
                  <span
                    className={`text-[10px] font-medium tracking-[0.08em] uppercase px-2.5 py-1 border ${status.border} ${status.text}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {status.label}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#F0F2F8]" style={{ fontFamily: "var(--font-display)" }}>
                  {ticket.name}
                </h3>
                <div className="stat-number mt-3">{ticket.price}</div>
                <p className="text-sm text-[#6B7280] mt-4 flex-1 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {ticket.description}
                </p>
                <div className="mt-6">
                  {isClickable ? (
                    <a
                      href={ticket.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center"
                    >
                      {ticket.ctaLabel}
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-white/[0.03] text-[#6B7280] border border-white/[0.06] cursor-not-allowed"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {ticket.ctaLabel}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Info Note */}
      <SectionWrapper elevated>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-[#6B7280] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Registration is handled through Luma. By registering, you will receive event updates, venue details, and access information directly to your email.
          </p>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
