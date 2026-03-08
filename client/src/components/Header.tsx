/**
 * MSBC Header / Navigation
 * Design: "Luminal Horizon" — Frosted glass nav on dark background
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { navigation, siteSettings } from "@/lib/data";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0C1222]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/2026" className="flex items-center gap-2 group">
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-white">
              {siteSettings.siteName}
            </span>
            <span className="hidden sm:inline text-xs font-body text-amber-400/80 border border-amber-400/30 rounded-full px-2 py-0.5">
              2026
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.mainNav.map((item) => (
              <Link
                key={item.label}
                to={item.url}
                className={`px-3 py-2 text-sm font-body font-medium transition-colors rounded-md hover:text-amber-400 hover:bg-white/5 ${
                  location === item.url || (item.url.includes("#") && location === "/2026")
                    ? "text-amber-400"
                    : "text-slate-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to={navigation.registerCta.url}
              className="px-5 py-2.5 text-sm font-display font-semibold bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              {navigation.registerCta.label}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0C1222]/95 backdrop-blur-xl border-t border-white/5"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navigation.mainNav.map((item) => (
                <Link
                  key={item.label}
                  to={item.url}
                  className="px-4 py-3 text-base font-body text-slate-300 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10">
                <Link
                  to={navigation.registerCta.url}
                  className="block text-center px-5 py-3 text-sm font-display font-semibold bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all"
                >
                  {navigation.registerCta.label}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
