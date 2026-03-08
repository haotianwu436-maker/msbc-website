/**
 * MSBC Footer
 * Design: "Luminal Horizon" — Minimal dark footer with amber accents
 */
import { Link } from "wouter";
import { siteSettings, navigation } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#080E1A] border-t border-white/5">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/2026" className="inline-block">
              <span className="font-display text-2xl font-bold text-white">MSBC</span>
            </Link>
            <p className="mt-3 text-sm text-slate-400 font-body leading-relaxed max-w-xs">
              Malaysia Student Blockchain Conference. Built in Kuala Lumpur. Connected across Asia.
            </p>
            <div className="flex gap-3 mt-5">
              {siteSettings.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 transition-all text-sm font-medium"
                  aria-label={link.label}
                >
                  {link.platform === "twitter" && "X"}
                  {link.platform === "telegram" && "TG"}
                  {link.platform === "linkedin" && "LI"}
                  {link.platform === "instagram" && "IG"}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Conference
            </h4>
            <ul className="space-y-2.5">
              {navigation.mainNav.slice(0, 4).map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.url}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors font-body"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {navigation.mainNav.slice(4).map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.url}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors font-body"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/2026/tickets"
                  className="text-sm text-slate-400 hover:text-amber-400 transition-colors font-body"
                >
                  Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/2026/become-a-sponsor"
                  className="text-sm text-slate-400 hover:text-amber-400 transition-colors font-body"
                >
                  Become a Sponsor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@msbc.my"
                  className="text-sm text-slate-400 hover:text-amber-400 transition-colors font-body"
                >
                  hello@msbc.my
                </a>
              </li>
              <li className="text-sm text-slate-400 font-body">
                Kuala Lumpur, Malaysia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-body">
            &copy; {new Date().getFullYear()} Malaysia Student Blockchain Conference. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 font-body">
            Built with purpose for the Web3 community.
          </p>
        </div>
      </div>
    </footer>
  );
}
