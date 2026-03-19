import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Star,
  ChevronRight,
  LifeBuoy,
  ShieldCheck,
  XCircle,
  Building2,
  Briefcase,
  Lock,
  Globe,
  Share2,
  Zap,
  Trophy,
  Users,
} from "lucide-react";
import { ReviewSummary as ReviewSummaryType } from "../types";
import { fetchSummary } from "../services/api";
import ReviewSummaryComponent from "../components/ReviewSummary";
import RateYourRental from "../components/RateYourRental";
import ReviewList from "../components/ReviewList";

export default function ReviewsPage() {
  const [summary, setSummary] = useState<ReviewSummaryType | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadSummary = async () => {
    try {
      const data = await fetchSummary();
      setSummary(data);
    } catch {
      console.error("Failed to load summary");
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const handleReviewSubmitted = () => {
    setRefreshKey((k) => k + 1);
    loadSummary();
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="glass-strong sticky top-0 z-50 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md shadow-blue-500/30">
              <Car size={18} className="text-white" />
            </div>
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">
              ERP <span className="text-blue-600">Car Rental</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Dashboard</span>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="font-bold text-gray-900 flex items-center gap-1.5">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              Ratings & Customer Reviews
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-animated-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-32 h-32 border border-white/20 rounded-full" />
          <div className="absolute top-5 right-40 w-48 h-48 border border-white/10 rounded-full" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 border border-white/10 rounded-full -mb-32" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-8"
          >
            <div className="flex-1">
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
                Customer Reviews
              </h1>
              <p className="text-blue-100 text-sm max-w-lg leading-relaxed">
                Discover what our clients say about their rental experiences.
                Real reviews from verified renters to help you choose the perfect vehicle.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-2 mx-auto">
                  <Trophy size={24} className="text-amber-300" />
                </div>
                <p className="text-2xl font-black text-white">{summary?.average_rating?.toFixed(1) || "..."}</p>
                <p className="text-[11px] text-blue-200 font-medium">Avg Rating</p>
              </div>
              <div className="w-px h-14 bg-white/20" />
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-2 mx-auto">
                  <Users size={24} className="text-emerald-300" />
                </div>
                <p className="text-2xl font-black text-white">{summary?.total_reviews || "..."}</p>
                <p className="text-[11px] text-blue-200 font-medium">Total Reviews</p>
              </div>
              <div className="w-px h-14 bg-white/20" />
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-2 mx-auto">
                  <Zap size={24} className="text-yellow-300" />
                </div>
                <p className="text-2xl font-black text-white">98%</p>
                <p className="text-[11px] text-blue-200 font-medium">Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-[340px] flex-shrink-0 space-y-6">
            <div className="sticky top-20 space-y-6">
              <ReviewSummaryComponent summary={summary} />
              <RateYourRental onReviewSubmitted={handleReviewSubmitted} />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 min-w-0">
            <ReviewList refreshKey={refreshKey} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 relative overflow-hidden">
        {/* Decorative top line */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600" />

        {/* Decorative circles */}
        <div className="absolute top-20 -right-20 w-64 h-64 rounded-full border border-gray-800 opacity-40" />
        <div className="absolute bottom-10 -left-10 w-40 h-40 rounded-full border border-gray-800 opacity-30" />

        <div className="max-w-7xl mx-auto px-6 py-14 relative">
          <div className="grid grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Car size={20} className="text-white" />
                </div>
                <span className="text-lg font-extrabold text-white tracking-tight">
                  ERP <span className="text-blue-400">Car Rental</span>
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                The premium enterprise platform for luxury and electric vehicle
                rentals. Experience driving redefined.
              </p>
              <div className="flex gap-2">
                {[Globe, Share2].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                  >
                    <Icon size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
                Support
              </h3>
              <ul className="space-y-3">
                {[
                  { icon: LifeBuoy, label: "Help Center" },
                  { icon: ShieldCheck, label: "Safety Information" },
                  { icon: XCircle, label: "Cancellation Options" },
                ].map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                      <Icon
                        size={15}
                        className="text-gray-600 group-hover:text-blue-400 transition-colors"
                      />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corporate */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
                Corporate
              </h3>
              <ul className="space-y-3">
                {[
                  { icon: Building2, label: "Fleet Management" },
                  { icon: Briefcase, label: "Business Accounts" },
                  { icon: Lock, label: "Privacy Policy" },
                ].map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                      <Icon
                        size={15}
                        className="text-gray-600 group-hover:text-blue-400 transition-colors"
                      />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
                Stay Updated
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Get the latest fleet additions and exclusive deals.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-gray-800 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              &copy; 2023 ERP Car Rental Systems. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
