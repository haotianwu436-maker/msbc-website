/**
 * MSBC 404 Page — "Stage Presence" Design
 */
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function NotFound() {
  return (
    <PageLayout>
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="container text-center">
          <span
            className="block text-[120px] md:text-[180px] leading-none font-bold text-[#2563EB]/10"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            404
          </span>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#F0F2F8] -mt-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Page Not Found
          </h1>
          <p
            className="text-sm text-[#6B7280] mt-4 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8">
            <Link href="/2026" className="btn-primary">
              Back to Home
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
