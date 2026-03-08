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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#07090F]/90 backdrop-blur-md border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-[60px] sm:h-[72px]">
          {/* Logo */}
          <Link href="/2026" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#F0F2F8]" style={{ fontFamily: "var(--font-display)" }}>
              MSBC
            </span>
            <span className="text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 border border-white/[0.12] text-[#2563EB] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              2026
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navigation.mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                className="text-[12px] xl:text-[13px] font-medium tracking-wide text-[#6B7280] hover:text-[#F0F2F8] transition-colors duration-200 uppercase whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Link
              href={navigation.registerCta.url}
              className="btn-primary text-sm py-2.5 px-5 xl:px-6"
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#07090F]/98 backdrop-blur-xl lg:hidden flex flex-col"
          >
            {/* Close button area — matches header height */}
            <div className="h-[60px] sm:h-[72px] shrink-0" />

            {/* Nav links */}
            <nav className="flex-1 flex flex-col items-start justify-start px-6 sm:px-8 gap-1 overflow-y-auto pb-8">
              {navigation.mainNav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="w-full"
                >
                  <Link
                    href={item.url}
                    className="block py-3 text-xl sm:text-2xl font-bold text-[#F0F2F8] hover:text-[#2563EB] transition-colors border-b border-white/[0.04]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigation.mainNav.length * 0.04, duration: 0.3 }}
                className="mt-6 w-full"
              >
                <Link href={navigation.registerCta.url} className="btn-primary w-full justify-center text-base py-4">
                  {navigation.registerCta.label}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
