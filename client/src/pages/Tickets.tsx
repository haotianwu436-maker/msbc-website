/**
 * MSBC Tickets & Registration Page
 * Design: "Luminal Horizon" — Clean ticket cards with external Luma links
 */
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { ticketsContent, eventEdition } from "@/lib/data";
import { ArrowRight, Calendar, MapPin, Ticket } from "lucide-react";

const statusStyles: Record<string, { label: string; bg: string; text: string }> = {
  open: { label: "Open", bg: "bg-emerald-500/15 border-emerald-500/30", text: "text-emerald-400" },
  coming_soon: { label: "Coming Soon", bg: "bg-amber-500/15 border-amber-500/30", text: "text-amber-400" },
  sold_out: { label: "Sold Out", bg: "bg-red-500/15 border-red-500/30", text: "text-red-400" },
  closed: { label: "Closed", bg: "bg-slate-500/15 border-slate-500/30", text: "text-slate-400" },
};

export default function Tickets() {
  const c = ticketsContent;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="page-hero bg-gradient-to-b from-[#0A0F1C] to-background">
        <div className="container">
          <SectionHeading title={c.heroHeadline} subtitle={c.heroSupportingCopy} />
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm font-body text-slate-400">
              <Calendar className="w-4 h-4 text-amber-400" />
              August 15–17, 2026
            </div>
            <div className="flex items-center gap-2 text-sm font-body text-slate-400">
              <MapPin className="w-4 h-4 text-amber-400" />
              Kuala Lumpur, Malaysia
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Cards */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {c.ticketTypes.map((ticket, i) => {
            const status = statusStyles[ticket.status] || statusStyles.open;
            const isClickable = ticket.status === "open";
            return (
              <motion.div key={ticket.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`glass-card rounded-xl p-6 flex flex-col hover:border-amber-500/20 transition-all ${
                  i === 0 ? "border-amber-500/30" : ""
                }`}>
                <div className="flex items-center justify-between mb-4">
                  <Ticket className="w-5 h-5 text-amber-400" />
                  <span className={`text-[10px] font-body font-medium uppercase tracking-wider px-2 py-0.5 rounded-full border ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{ticket.name}</h3>
                <p className="font-display text-2xl font-bold text-amber-400 mt-2">{ticket.price}</p>
                <p className="text-sm font-body text-slate-400 mt-3 flex-1 leading-relaxed">{ticket.description}</p>
                <div className="mt-6">
                  {isClickable ? (
                    <a href={ticket.ctaUrl} target="_blank" rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-display font-semibold text-sm bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all">
                      {ticket.ctaLabel} <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <button disabled
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 font-display font-semibold text-sm bg-white/5 text-slate-500 rounded-lg cursor-not-allowed">
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
      <SectionWrapper bgClassName="bg-[#0A0F1C]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-body text-slate-400 leading-relaxed">
            Registration is handled through Luma. By registering, you will receive event updates, venue details, and access information directly to your email.
          </p>
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
