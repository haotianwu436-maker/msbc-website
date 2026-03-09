/**
 * MSBC Footer — "Stage Presence" Design
 * Minimal, architectural footer. Fully responsive.
 */
import { Link } from "wouter";
import { siteSettings, navigation, eventEdition } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e293b] halftone-bg">
      <div className="container py-16 sm:py-20 md:py-24">
        {/* Top row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-10">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#f5f6fa]" style={{ fontFamily: "var(--font-display)" }}>
                MSBC
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium px-2 sm:px-2.5 py-1 sm:py-1.5 border border-white/[0.15] text-[#0066ff] tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                {eventEdition.editionYear}
              </span>
            </div>
            <p className="text-base text-[#8b99b5] leading-relaxed max-w-xs mb-3" style={{ fontFamily: "var(--font-body)" }}>
              {eventEdition.eventTagline}
            </p>
            <p className="text-sm text-[#8b99b5]" style={{ fontFamily: "var(--font-body)" }}>
              {eventEdition.city}, {eventEdition.country}
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-[#0066ff] mb-5 sm:mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              Navigate
            </h4>
            <ul className="space-y-3 sm:space-y-3.5">
              {navigation.mainNav.slice(0, 5).map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.url}
                    className="text-sm sm:text-base text-[#8b99b5] hover:text-[#f5f6fa] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-[#0066ff] mb-5 sm:mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              More
            </h4>
            <ul className="space-y-3 sm:space-y-3.5">
              {navigation.mainNav.slice(5).map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.url}
                    className="text-sm sm:text-base text-[#8b99b5] hover:text-[#f5f6fa] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/2026/tickets"
                  className="text-sm sm:text-base text-[#8b99b5] hover:text-[#f5f6fa] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Tickets
                </Link>
              </li>
              <li>
                <Link
                  href="/2026/become-a-sponsor"
                  className="text-sm sm:text-base text-[#8b99b5] hover:text-[#f5f6fa] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Become a Sponsor
                </Link>
              </li>
            </ul>
          </div>

          {/* Social — full width on smallest mobile, half on sm */}
          <div className="col-span-2 sm:col-span-1 md:col-span-2">
            <h4 className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase text-[#0066ff] mb-5 sm:mb-6" style={{ fontFamily: "var(--font-mono)" }}>
              Connect
            </h4>
            <ul className="flex flex-row sm:flex-col gap-4 sm:gap-3.5 flex-wrap">
              {siteSettings.socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-base text-[#8b99b5] hover:text-[#0066ff] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom divider + copyright */}
        <div className="horizon-glow mt-12 sm:mt-16 mb-6 sm:mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5">
          <p className="text-[11px] sm:text-xs text-[#8b99b5] text-center sm:text-left" style={{ fontFamily: "var(--font-mono)" }}>
            &copy; {new Date().getFullYear()} Malaysia Student Blockchain Conference. All rights reserved.
          </p>
          <p className="text-[11px] sm:text-xs text-[#8b99b5]" style={{ fontFamily: "var(--font-mono)" }}>
            {eventEdition.startDate.replace(/-/g, ".")} &mdash; {eventEdition.endDate.replace(/-/g, ".")} &middot; {eventEdition.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
