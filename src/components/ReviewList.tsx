import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownWideNarrow,
  ChevronDown,
  Zap,
  Truck,
  Crown,
  CarFront,
  LayoutGrid,
  Loader2,
  SearchX,
} from "lucide-react";
import { Review } from "../types";
import { fetchReviews } from "../services/api";
import ReviewCard from "./ReviewCard";

interface Props {
  refreshKey: number;
}

const CATEGORIES = [
  { value: "all", label: "All Cars", icon: LayoutGrid },
  { value: "electric", label: "Electric", icon: Zap },
  { value: "suv", label: "SUV", icon: Truck },
  { value: "sedan", label: "Sedan", icon: CarFront },
  { value: "luxury", label: "Luxury", icon: Crown },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Most Recent" },
  { value: "highest", label: "Highest Rated" },
  { value: "lowest", label: "Lowest Rated" },
  { value: "most_helpful", label: "Most Helpful" },
];

export default function ReviewList({ refreshKey }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadReviews = useCallback(
    async (pageNum: number, append: boolean) => {
      setLoading(true);
      try {
        const data = await fetchReviews(category, sort, pageNum);
        setReviews((prev) =>
          append ? [...prev, ...data.reviews] : data.reviews
        );
        setTotalPages(data.totalPages);
        setTotal(data.total);
      } catch {
        console.error("Failed to load reviews");
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [category, sort]
  );

  useEffect(() => {
    setPage(1);
    loadReviews(1, false);
  }, [category, sort, refreshKey, loadReviews]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadReviews(nextPage, true);
  };

  const handleUpdate = () => {
    setPage(1);
    loadReviews(1, false);
  };

  return (
    <div>
      {/* Filters bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-2xl shadow-sm p-4 mb-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
              <ArrowDownWideNarrow size={16} className="text-blue-500" />
              Sort by:
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-xl text-sm text-blue-600 font-semibold
                  focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all cursor-pointer hover:border-blue-300"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
              />
            </div>
            {total > 0 && (
              <span className="text-xs text-gray-400 font-medium ml-1">
                {total} review{total !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Category filters */}
          <div className="flex gap-1.5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = category === cat.value;
              return (
                <motion.button
                  key={cat.value}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategory(cat.value)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25"
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50"
                  }`}
                >
                  <Icon size={14} />
                  {cat.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Skeleton loading */}
      {initialLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-strong rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-11 h-11 rounded-full shimmer" />
                <div className="flex-1">
                  <div className="shimmer h-5 w-36 rounded-lg mb-2" />
                  <div className="shimmer h-3 w-56 rounded-lg" />
                </div>
                <div className="shimmer h-4 w-24 rounded-lg" />
              </div>
              <div className="shimmer h-5 w-72 rounded-lg mb-3" />
              <div className="shimmer h-4 w-full rounded-lg mb-2" />
              <div className="shimmer h-4 w-3/4 rounded-lg" />
            </div>
          ))}
        </div>
      )}

      {/* Reviews */}
      {!initialLoading && (
        <div className="space-y-4 stagger-children">
          <AnimatePresence mode="popLayout">
            {reviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                onUpdate={handleUpdate}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Empty state */}
      {reviews.length === 0 && !loading && !initialLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong rounded-2xl p-12 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
            <SearchX size={28} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-700 mb-1">
            No reviews found
          </h3>
          <p className="text-sm text-gray-500">
            Try selecting a different category or sort option.
          </p>
        </motion.div>
      )}

      {/* Loading more indicator */}
      {loading && !initialLoading && (
        <div className="flex justify-center py-8">
          <Loader2 size={24} className="text-blue-500 animate-spin" />
        </div>
      )}

      {/* Load More */}
      {page < totalPages && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLoadMore}
            className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-gray-200 rounded-2xl text-sm font-bold text-gray-700
              hover:border-blue-300 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
          >
            Load More Reviews
            <ChevronDown size={16} />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
