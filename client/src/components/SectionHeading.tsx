/**
 * MSBC SectionHeading — "Stage Presence" Design
 * Oversized headline with mono label and optional subtitle.
 * No decorative dividers — typography IS the design.
 */
import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`max-w-3xl mb-14 md:mb-20 ${alignClass}`}
    >
      {label && (
        <span
          className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-[#2563EB] mb-4"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {label}
        </span>
      )}
      <h2 className="headline-lg text-[#F0F2F8]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base md:text-lg leading-relaxed ${
            align === "center" ? "mx-auto max-w-2xl" : ""
          } text-[#6B7280]`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
