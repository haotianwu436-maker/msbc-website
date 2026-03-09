/**
 * MSBC Header — "Stage Presence" Design
 * Premium conference navigation. Transparent on hero, solid on scroll.
 * Fully responsive: mobile hamburger → desktop horizontal nav.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050d1c]/95 backdrop-blur-lg border-b border-[#1e293b]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-[60px] sm:h-[72px]">
          {/* Logo — TOKEN2049 style */}
          <Link href="/2026" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#f5f6fa]" style={{ fontFamily: "var(--font-display)" }}>
              MSBC
            </span>
            <span className="text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 text-[#8b99b5] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              2026
            </span>
          </Link>

          {/* Desktop Nav — TOKEN2049 style white text */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navigation.mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                className="text-xs xl:text-sm font-medium tracking-wide text-[#f5f6fa] hover:text-[#0066ff] transition-colors duration-200 uppercase whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA — TOKEN2049 style buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              href={navigation.registerCta.url}
              className="btn-primary text-xs py-2 px-5"
            >
              {navigation.registerCta.label}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -mr-2 text-[#F0F2F8]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu — Full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#050d1c]/98 backdrop-blur-xl lg:hidden flex flex-col"
          >
            {/* Close button area — matches header height */}
            <div className="h-[64px] sm:h-[76px] shrink-0" />

            {/* Nav links */}
            <nav className="flex-1 flex flex-col items-start justify-start px-6 sm:px-8 gap-0 overflow-y-auto pb-8 pt-4">
              {navigation.mainNav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <Link
                    href={item.url}
                    className="block py-4 text-2xl sm:text-3xl font-bold text-[#f5f6fa] hover:text-[#0066ff] transition-colors border-b border-white/[0.06]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigation.mainNav.length * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 w-full"
              >
                <Link href={navigation.registerCta.url} className="btn-primary w-full justify-center text-lg py-5">
                  {navigation.registerCta.label}
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
