/**
 * MSBC Agenda Page — "Stage Presence" Design
 * Timeline-style agenda with day tabs and track filters. Fully responsive.
 */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { agendaSessions as defaultAgendaSessions, speakers, homepageContent } from "@/lib/data";
import { useAgendaSessions } from "@/hooks/useSupabase";
import { Clock, MapPin, Users } from "lucide-react";

export default function Agenda() {
  // Try to fetch from Supabase, fallback to default data
  const { data: supabaseAgenda } = useAgendaSessions();
  const agendaSessions = supabaseAgenda && supabaseAgenda.length > 0 ? supabaseAgenda : defaultAgendaSessions;
  
  const dates = useMemo(() => Array.from(new Set(agendaSessions.map((s) => s.date))).sort(), [agendaSessions]);
  const [activeDate, setActiveDate] = useState(dates[0] || "");
  const tracks = useMemo(() => Array.from(new Set(agendaSessions.map((s) => s.track))), [agendaSessions]);
  const [activeTrack, setActiveTrack] = useState("All");

  const filtered = agendaSessions
    .filter((s) => s.date === activeDate)
    .filter((s) => activeTrack === "All" || s.track === activeTrack)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const formatDate = (d: string) => {
    const date = new Date(d + "T00:00:00");
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <PageLayout>
      <section className="page-hero">
        <div className="container">
          <SectionHeading label="Programme" title="Conference Agenda" subtitle={homepageContent.agenda.bodyCopy} />
        </div>
      </section>

      <SectionWrapper>
        {/* Day Tabs — enhanced horizontal scroll on mobile */}
        <div className="flex gap-3 mb-6 sm:mb-10 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
          {dates.map((date, i) => (
            <button
              key={date}
              onClick={() => setActiveDate(date)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 rounded-lg ${
                activeDate === date
                  ? "bg-[#0066ff] text-white shadow-lg shadow-[#0066ff]/30"
                  : "bg-white/[0.04] text-[#8b99b5] hover:text-[#f5f6fa] hover:bg-white/[0.06] border border-white/[0.08]"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Day {i + 1} — {formatDate(date)}
            </button>
          ))}
        </div>

        {/* Track Filter — enhanced horizontal scroll on mobile */}
        <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
          <button
            onClick={() => setActiveTrack("All")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-medium tracking-[0.1em] uppercase transition-all whitespace-nowrap shrink-0 rounded-md ${
                activeTrack === "All"
                  ? "border border-[#0066ff]/40 text-[#0066ff] bg-[#0066ff]/12"
                  : "border border-white/[0.08] text-[#8b99b5] hover:text-[#f5f6fa] hover:border-white/[0.12]"
              }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            All Tracks
          </button>
          {tracks.map((track) => (
            <button
              key={track}
              onClick={() => setActiveTrack(track)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-medium tracking-[0.1em] uppercase transition-all whitespace-nowrap shrink-0 rounded-md ${
                activeTrack === track
                  ? "border border-[#0066ff]/40 text-[#0066ff] bg-[#0066ff]/12"
                  : "border border-white/[0.08] text-[#8b99b5] hover:text-[#f5f6fa] hover:border-white/[0.12]"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Sessions — enhanced layout */}
        <div className="space-y-3 sm:space-y-4">
          {filtered.map((session, i) => {
            const sessionSpeakers = speakers.filter((sp) => session.speakerIds.includes(sp.speakerId));
            return (
              <motion.div
                key={session.sessionId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="conference-card flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 group"
              >
                <div className="flex items-start gap-3 sm:gap-4 sm:w-44 md:w-48 shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#0066ff] mt-0.5 shrink-0" />
                  <span className="text-sm sm:text-base font-medium text-[#8b99b5]" style={{ fontFamily: "var(--font-mono)" }}>
                    {session.startTime} – {session.endTime}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                    <span
                      className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase px-3 sm:px-4 py-1.5 border border-[#0066ff]/35 text-[#0066ff] rounded-md"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {session.format.replace("_", " ")}
                    </span>
                    <span
                      className="text-[10px] sm:text-[11px] tracking-[0.12em] uppercase text-[#8b99b5] flex items-center gap-1.5"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> {session.stage}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#f5f6fa] leading-tight mb-2 group-hover:text-[#0066ff] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    {session.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#8b99b5] leading-relaxed mb-3" style={{ fontFamily: "var(--font-body)" }}>
                    {session.shortDescription}
                  </p>
                  {sessionSpeakers.length > 0 && (
                    <div className="flex items-center gap-3 sm:gap-4">
                      <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[#8b99b5] shrink-0" />
                      <div className="flex -space-x-2 shrink-0">
                        {sessionSpeakers.map((sp) => (
                          <img key={sp.speakerId} src={sp.photo} alt={sp.fullName} className="w-6 h-6 sm:w-8 sm:h-8 ring-2 ring-[#050d1c] rounded-xl object-cover" />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-[#8b99b5] truncate" style={{ fontFamily: "var(--font-body)" }}>
                        {sessionSpeakers.map((sp) => sp.fullName).join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16 sm:py-20 text-base text-[#6B7280]" style={{ fontFamily: "var(--font-body)" }}>
              No sessions found for this selection.
            </div>
          )}
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
