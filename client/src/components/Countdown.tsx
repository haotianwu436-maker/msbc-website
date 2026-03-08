/**
 * MSBC Countdown Timer
 * Counts down to the event start date with flip-style animation.
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
    { value: 0, label: "Hours" },
    { value: 0, label: "Minutes" },
    { value: 0, label: "Seconds" },
  ];
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
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
    <div className="flex gap-3 sm:gap-4">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="glass-card rounded-lg px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[72px] text-center">
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-1.5 text-[10px] sm:text-xs font-body text-slate-400 uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
