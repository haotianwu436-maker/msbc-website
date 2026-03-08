/**
 * MSBC Page Transition Component
 * Smooth fade + subtle slide animation on page navigation.
 */
import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: "easeIn" as const,
    },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  const [location] = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);

  return (
    <motion.div
      key={location}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
}
