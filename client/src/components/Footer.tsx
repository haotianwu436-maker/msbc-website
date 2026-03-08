/**
 * MSBC Footer — "Stage Presence" Design
 * Minimal, architectural footer. Precision dividers, mono labels.
 */
import { Link } from "wouter";
import { siteSettings, navigation, eventEdition } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container py-16 md:py-20">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xl font-bold tracking-tight text-[#F0F2F8]" style={{ fontFamily: "var(--font-display)" }}>
                MSBC
              </span>
              <span className="text-[10px] font-medium px-2 py-1 border border-white/[0.12] text-[#2563EB] tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                {eventEdition.editionYear}
              </span>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-body)" }}>
              {eventEdition.eventTagline}
            </p>
            <p className="text-sm text-[#6B7280] mt-2" style={{ fontFamily: "var(--font-body)" }}>
              {eventEdition.city}, {eventEdition.country}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#6B7280] mb-5" style={{ fontFamily: "var(--font-mono)" }}>
              Navigate
            </h4>
            <ul className="space-y-3">
              {navigation.mainNav.slice(0, 5).map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.url}
                    className="text-sm text-[#9CA3AF] hover:text-[#F0F2F8] transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#6B7280] mb-5" style={{ fontFamily: "var(--font-mono)" }}>
              More
            </h4>
            <ul className="space-y-3">
              {navigation.mainNav.slice(5).map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.url}
                    className="text-sm text-[#9CA3AF] hover:text-[#F0F2F8] transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/2026/tickets"
                  className="text-sm text-[#9CA3AF] hover:text-[#F0F2F8] transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Tickets
                </Link>
              </li>
              <li>
                <Link
                  href="/2026/become-a-sponsor"
                  className="text-sm text-[#9CA3AF] hover:text-[#F0F2F8] transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Become a Sponsor
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#6B7280] mb-5" style={{ fontFamily: "var(--font-mono)" }}>
              Connect
            </h4>
            <ul className="space-y-3">
              {siteSettings.socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#9CA3AF] hover:text-[#2563EB] transition-colors"
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
        <div className="horizon-glow mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4B5563]" style={{ fontFamily: "var(--font-mono)" }}>
            &copy; {new Date().getFullYear()} Malaysia Student Blockchain Conference. All rights reserved.
          </p>
          <p className="text-xs text-[#4B5563]" style={{ fontFamily: "var(--font-mono)" }}>
            {eventEdition.startDate.replace(/-/g, ".")} &mdash; {eventEdition.endDate.replace(/-/g, ".")} &middot; {eventEdition.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
