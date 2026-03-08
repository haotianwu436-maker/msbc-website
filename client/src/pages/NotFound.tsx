import { Link } from "wouter";
import PageLayout from "@/components/PageLayout";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <PageLayout>
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-7xl md:text-9xl font-bold text-amber-400/20">404</h1>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-4">Page Not Found</h2>
          <p className="text-sm font-body text-slate-400 mt-3 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to="/2026"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 font-display font-semibold text-sm bg-amber-500 hover:bg-amber-400 text-[#0C1222] rounded-lg transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
