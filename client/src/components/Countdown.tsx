/**
 * MSBC Countdown — "Stage Presence" Design
 * Mono-spaced countdown with architectural precision. No glass cards.
 */
import { useState, useEffect } from "react";
import { eventEdition } from "@/lib/data";

interface TimeUnit {
  value: number;
  label: string;
}

function getTimeRemaining(target: string): TimeUnit[] {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return [
    { value: 0, label: "Days" },
    { value: 0, label: "Hrs" },
    { value: 0, label: "Min" },
    { value: 0, label: "Sec" },
  ];
  return [
    { value: Math.floor(diff / 86400000), label: "Days" },
    { value: Math.floor((diff % 86400000) / 3600000), label: "Hrs" },
    { value: Math.floor((diff % 3600000) / 60000), label: "Min" },
    { value: Math.floor((diff % 60000) / 1000), label: "Sec" },
  ];
}

export default function Countdown() {
  const [units, setUnits] = useState<TimeUnit[]>(
    getTimeRemaining(eventEdition.countdownTarget)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setUnits(getTimeRemaining(eventEdition.countdownTarget));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 md:gap-5">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3 md:gap-5">
          <div className="text-center">
            <div
              className="text-3xl md:text-5xl font-medium text-[#F0F2F8] tabular-nums"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {String(unit.value).padStart(2, "0")}
            </div>
            <div
              className="text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-[#6B7280] mt-1.5"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {unit.label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span
              className="text-2xl md:text-4xl text-[#2563EB]/40 font-light select-none"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
