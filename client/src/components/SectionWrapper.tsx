/**
 * MSBC Section Wrapper
 * Provides consistent section padding, optional background, and entrance animations.
 */
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  bgClassName?: string;
  noPadding?: boolean;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  bgClassName = "",
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <section id={id} className={`relative ${bgClassName}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`container ${noPadding ? "" : "section-padding"} ${className}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
