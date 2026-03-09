/**
 * MSBC SectionWrapper — "Stage Presence" Design
 * Clean dark sections with optional spotlight radial and elevated surface.
 */
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  bgClassName?: string;
  noPadding?: boolean;
  elevated?: boolean;
  spotlight?: boolean;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  bgClassName = "",
  noPadding = false,
  elevated = false,
  spotlight = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative ${elevated ? "bg-[#0f1729] halftone-bg" : "bg-[#050d1c]"} ${spotlight ? "spotlight" : ""} ${bgClassName}`}
    >
      {/* Horizon glow divider at top */}
      <div className="horizon-glow" />
      <div className={`container relative z-10 ${noPadding ? "" : "section-padding"} ${className}`}>
        {children}
      </div>
    </section>
  );
}
