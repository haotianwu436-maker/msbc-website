/**
 * MSBC Header — "Stage Presence" Design
 * Premium conference navigation. Transparent on hero, solid on scroll.
 * Sharp architectural styling, no rounded corners.
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
        <div className="container flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/2026" className="flex items-center gap-3 group">
            <span className="text-xl font-bold tracking-tight text-[#F0F2F8]" style={{ fontFamily: "var(--font-display)" }}>
              MSBC
            </span>
            <span className="text-[10px] font-medium px-2 py-1 border border-white/[0.12] text-[#2563EB] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              2026
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.url}
                className="text-[13px] font-medium tracking-wide text-[#6B7280] hover:text-[#F0F2F8] transition-colors duration-200 uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={navigation.registerCta.url}
              className="btn-primary text-sm py-2.5 px-6"
            >
              {navigation.registerCta.label}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#F0F2F8]"
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
            className="fixed inset-0 z-40 bg-[#07090F]/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-start justify-center h-full px-8 gap-6 pt-20">
              {navigation.mainNav.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.url}
                    className="text-2xl font-bold text-[#F0F2F8] hover:text-[#2563EB] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigation.mainNav.length * 0.05, duration: 0.3 }}
                className="mt-6"
              >
                <Link href={navigation.registerCta.url} className="btn-primary">
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
