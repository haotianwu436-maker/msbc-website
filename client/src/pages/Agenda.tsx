/**
 * MSBC Agenda Page
 * Design: "Luminal Horizon" — Timeline-style agenda with day tabs and track filters
 */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import { agendaSessions, speakers, homepageContent } from "@/lib/data";
import { Clock, MapPin, Users } from "lucide-react";

const formatBadge = (format: string) => {
  const map: Record<string, string> = {
    keynote: "Keynote", panel: "Panel", workshop: "Workshop",
    fireside_chat: "Fireside Chat", hackathon_session: "Hackathon",
  };
  return map[format] || format;
};

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
      <section className="page-hero bg-gradient-to-b from-[#0A0F1C] to-background">
        <div className="container">
          <SectionHeading title="Conference Agenda" subtitle={homepageContent.agenda.bodyCopy} />
        </div>
      </section>

      <SectionWrapper>
        {/* Day Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {dates.map((date, i) => (
            <button
              key={date}
              onClick={() => setActiveDate(date)}
              className={`px-5 py-2.5 rounded-lg font-display text-sm font-medium transition-all ${
                activeDate === date
                  ? "bg-amber-500 text-[#0C1222]"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              Day {i + 1} — {formatDate(date)}
            </button>
          ))}
        </div>

        {/* Track Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTrack("All")}
            className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all ${
              activeTrack === "All" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-white/5 text-slate-400 border border-white/5 hover:text-white"
            }`}
          >
            All Tracks
          </button>
          {tracks.map((track) => (
            <button
              key={track}
              onClick={() => setActiveTrack(track)}
              className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all ${
                activeTrack === track ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-white/5 text-slate-400 border border-white/5 hover:text-white"
              }`}
            >
              {track}
            </button>
          ))}
        </div>

        {/* Sessions */}
        <div className="space-y-4">
          {filtered.map((session, i) => {
            const sessionSpeakers = speakers.filter((sp) => session.speakerIds.includes(sp.speakerId));
            return (
              <motion.div
                key={session.sessionId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="glass-card rounded-xl p-5 md:p-6 hover:border-amber-500/20 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex items-center gap-2 md:w-36 shrink-0 text-sm font-body text-slate-300">
                    <Clock className="w-4 h-4 text-amber-400" />
                    {session.startTime} – {session.endTime}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-body font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                        {formatBadge(session.format)}
                      </span>
                      <span className="text-[10px] font-body text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {session.stage}
                      </span>
                    </div>
                    <h3 className="font-display text-base md:text-lg font-semibold text-white">{session.title}</h3>
                    <p className="text-sm font-body text-slate-400 mt-1">{session.shortDescription}</p>
                    {sessionSpeakers.length > 0 && (
                      <div className="flex items-center gap-3 mt-3">
                        <Users className="w-4 h-4 text-slate-500" />
                        <div className="flex -space-x-2">
                          {sessionSpeakers.map((sp) => (
                            <img key={sp.speakerId} src={sp.photo} alt={sp.fullName} className="w-7 h-7 rounded-full ring-2 ring-[#0C1222] object-cover" />
                          ))}
                        </div>
                        <span className="text-xs font-body text-slate-400">
                          {sessionSpeakers.map((sp) => sp.fullName).join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500 font-body">
              No sessions found for this selection.
            </div>
          )}
        </div>
      </SectionWrapper>
    </PageLayout>
  );
}
