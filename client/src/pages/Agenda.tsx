/**
 * MSBC Agenda Page — "Stage Presence" Design
 * Timeline-style agenda with day tabs and track filters. Fully responsive.
 */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { agendaSessions, speakers, homepageContent } from "@/lib/data";
import { Clock, MapPin, Users } from "lucide-react";

export default function Agenda() {
  const dates = useMemo(() => Array.from(new Set(agendaSessions.map((s) => s.date))).sort(), []);
  const [activeDate, setActiveDate] = useState(dates[0] || "");
  const tracks = useMemo(() => Array.from(new Set(agendaSessions.map((s) => s.track))), []);
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
        {/* Day Tabs — horizontal scroll on mobile */}
        <div className="flex gap-2 mb-5 sm:mb-8 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {dates.map((date, i) => (
            <button
              key={date}
              onClick={() => setActiveDate(date)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                activeDate === date
                  ? "bg-[#2563EB] text-white"
                  : "bg-white/[0.03] text-[#6B7280] hover:text-[#F0F2F8] border border-white/[0.06]"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              Day {i + 1} — {formatDate(date)}
            </button>
          ))}
        </div>

        {/* Track Filter — horizontal scroll on mobile */}
        <div className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-10 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          <button
            onClick={() => setActiveTrack("All")}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-medium tracking-[0.08em] uppercase transition-all whitespace-nowrap shrink-0 ${
              activeTrack === "All"
                ? "border border-[#2563EB]/30 text-[#2563EB] bg-[#2563EB]/10"
                : "border border-white/[0.06] text-[#6B7280] hover:text-[#F0F2F8]"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            All Tracks
          </button>
          {tracks.map((track) => (
            <button
              key={track}
              onClick={() => setActiveTrack(track)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-medium tracking-[0.08em] uppercase transition-all whitespace-nowrap shrink-0 ${
                activeTrack === track
                  ? "border border-[#2563EB]/30 text-[#2563EB] bg-[#2563EB]/10"
                  : "border border-white/[0.06] text-[#6B7280] hover:text-[#F0F2F8]"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Sessions */}
        <div className="space-y-2 sm:space-y-3">
          {filtered.map((session, i) => {
            const sessionSpeakers = speakers.filter((sp) => session.speakerIds.includes(sp.speakerId));
            return (
              <motion.div
                key={session.sessionId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="conference-card flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 sm:p-5 md:p-6"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 sm:w-40 shrink-0">
                  <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#2563EB]" />
                  <span className="text-xs sm:text-sm text-[#9CA3AF]" style={{ fontFamily: "var(--font-mono)" }}>
                    {session.startTime} – {session.endTime}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-2">
                    <span
                      className="text-[9px] sm:text-[10px] font-medium tracking-[0.08em] uppercase px-1.5 sm:px-2.5 py-0.5 sm:py-1 border border-[#2563EB]/20 text-[#2563EB]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {session.format.replace("_", " ")}
                    </span>
                    <span
                      className="text-[9px] sm:text-[10px] tracking-[0.08em] uppercase text-[#6B7280] flex items-center gap-1"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      <MapPin className="w-2.5 sm:w-3 h-2.5 sm:h-3" /> {session.stage}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#F0F2F8] leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {session.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] mt-1 line-clamp-2 sm:line-clamp-none" style={{ fontFamily: "var(--font-body)" }}>
                    {session.shortDescription}
                  </p>
                  {sessionSpeakers.length > 0 && (
                    <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                      <Users className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#6B7280] shrink-0" />
                      <div className="flex -space-x-2 shrink-0">
                        {sessionSpeakers.map((sp) => (
                          <img key={sp.speakerId} src={sp.photo} alt={sp.fullName} className="w-5 h-5 sm:w-7 sm:h-7 ring-2 ring-[#07090F] object-cover" />
                        ))}
                      </div>
                      <span className="text-[11px] sm:text-xs text-[#9CA3AF] truncate" style={{ fontFamily: "var(--font-body)" }}>
                        {sessionSpeakers.map((sp) => sp.fullName).join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-10 sm:py-16 text-sm text-[#6B7280]" style={{ fontFamily: "var(--font-body)" }}>
              No sessions found for this selection.
            </div>
          )}
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
