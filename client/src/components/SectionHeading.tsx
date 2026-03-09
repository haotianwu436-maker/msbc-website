/**
 * MSBC SectionHeading — "Stage Presence" Design
 * Oversized headline with mono label. Responsive spacing.
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
      className={`max-w-5xl mb-12 sm:mb-16 md:mb-20 lg:mb-28 ${alignClass}`}
    >
      {label && (
        <span
          className="inline-block text-[10px] sm:text-xs font-medium tracking-[0.18em] uppercase text-[#0066ff] mb-5 sm:mb-7 md:mb-8"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {label}
        </span>
      )}
      <h2 className="headline-lg text-[#f5f6fa] mb-5 sm:mb-7 md:mb-8">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg sm:text-xl md:text-2xl leading-[1.7] ${
            align === "center" ? "mx-auto max-w-3xl" : ""
          } text-[#8b99b5]`}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
