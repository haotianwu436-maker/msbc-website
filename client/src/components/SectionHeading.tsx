/**
 * MSBC Section Heading
 * Consistent heading style with optional subtitle and animated divider.
 */
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 md:mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? "text-white" : "text-white"
        }`}
      >
        {title}
      </motion.h2>
      {/* Animated divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`h-[2px] w-16 bg-amber-500 mt-4 mb-5 origin-left ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`text-base md:text-lg font-body leading-relaxed max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-slate-300" : "text-slate-400"}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
