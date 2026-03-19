import { ReviewSummary as ReviewSummaryType } from "../types";
import StarRating from "./StarRating";
import { BarChart3, TrendingUp, Award, Star as StarIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  summary: ReviewSummaryType | null;
}

export default function ReviewSummary({ summary }: Props) {
  if (!summary) {
    return (
      <div className="glass-strong rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <div className="shimmer w-5 h-5 rounded" />
          <div className="shimmer h-6 rounded-lg w-40" />
        </div>
        <div className="shimmer h-16 rounded-xl w-28 mb-3" />
        <div className="shimmer h-4 rounded-lg w-48 mb-8" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="shimmer h-3 rounded-full mb-3" />
        ))}
      </div>
    );
  }

  const ratingLabel =
    summary.average_rating >= 4.5
      ? "Excellent"
      : summary.average_rating >= 4
        ? "Very Good"
        : summary.average_rating >= 3
          ? "Good"
          : "Average";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-strong rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Header with gradient */}
      <div className="bg-animated-gradient px-6 py-4">
        <div className="flex items-center gap-2 text-white">
          <BarChart3 size={20} className="opacity-90" />
          <h2 className="text-base font-bold">Review Summary</h2>
        </div>
      </div>

      <div className="p-6">
        {/* Big rating */}
        <div className="flex items-center gap-4 mb-2">
          <div className="relative">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 count-up">
              {summary.average_rating.toFixed(1)}
            </span>
          </div>
          <div>
            <StarRating rating={Math.round(summary.average_rating)} size="md" />
            <div className="flex items-center gap-1.5 mt-1">
              <Award size={14} className="text-amber-500" />
              <span className="text-sm font-semibold text-amber-600">{ratingLabel}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
          <TrendingUp size={14} />
          Based on <span className="font-semibold text-gray-700">{summary.total_reviews.toLocaleString()}</span> reviews
        </p>

        {/* Distribution bars */}
        <div className="space-y-2.5">
          {summary.distribution.map(({ rating, count, percentage }, index) => (
            <motion.div
              key={rating}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              className="flex items-center gap-3 group"
            >
              <div className="flex items-center gap-1 w-8">
                <span className="text-sm font-bold text-gray-700">{rating}</span>
                <StarIcon size={12} className="fill-amber-400 text-amber-400" />
              </div>
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    rating >= 4
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : rating === 3
                        ? "bg-gradient-to-r from-amber-400 to-amber-500"
                        : "bg-gradient-to-r from-orange-400 to-red-400"
                  }`}
                />
              </div>
              <span className="w-12 text-right text-xs font-semibold text-gray-500 group-hover:text-gray-800 transition-colors">
                {percentage}%
                <span className="text-gray-400 ml-0.5">({count})</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

