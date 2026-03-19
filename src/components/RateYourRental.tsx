import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Mail,
  Car,
  Tag,
  PenLine,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import StarRating from "./StarRating";
import { submitReview } from "../services/api";

interface Props {
  onReviewSubmitted: () => void;
}

export default function RateYourRental({ onReviewSubmitted }: Props) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [carName, setCarName] = useState("");
  const [carCategory, setCarCategory] = useState("electric");
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const isValid =
    rating > 0 &&
    content.trim() &&
    clientName.trim() &&
    clientEmail.trim() &&
    carName.trim() &&
    title.trim();

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    try {
      await submitReview({
        client_name: clientName,
        client_email: clientEmail,
        car_name: carName,
        car_category: carCategory,
        rating,
        title,
        content,
      });
      setSuccess(true);
      setRating(0);
      setContent("");
      setClientName("");
      setClientEmail("");
      setCarName("");
      setTitle("");
      onReviewSubmitted();
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-strong rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 px-6 py-4">
        <div className="flex items-center gap-2 text-white">
          <Sparkles size={20} />
          <h2 className="text-base font-bold">Rate Your Rental</h2>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm text-gray-500 mb-5 flex items-center gap-1.5">
          <MessageSquare size={14} />
          Share your experience with the community
        </p>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-200"
            >
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
              <span className="font-medium">Thank you for your review!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3.5">
          {/* Name & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <User
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Your name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 focus:bg-white transition-all"
              />
            </div>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                placeholder="Your email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Car & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Car
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Car name"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 focus:bg-white transition-all"
              />
            </div>
            <div className="relative">
              <Tag
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                value={carCategory}
                onChange={(e) => setCarCategory(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 focus:bg-white transition-all appearance-none"
              >
                <option value="electric">Electric</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="relative">
            <PenLine
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Review title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 focus:bg-white transition-all"
            />
          </div>

          {/* Rating */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-sm font-semibold text-gray-700 mb-2.5">Overall Rating</p>
            <StarRating rating={rating} size="xl" interactive onChange={setRating} />
            {rating > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-500 mt-2"
              >
                {rating === 5
                  ? "Outstanding!"
                  : rating === 4
                    ? "Very Good!"
                    : rating === 3
                      ? "It was okay"
                      : rating === 2
                        ? "Could be better"
                        : "Poor experience"}
              </motion.p>
            )}
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Your Review</p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share details about the car's condition, pickup process, and drive experience..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 focus:bg-white transition-all leading-relaxed"
            />
            <p className="text-xs text-gray-400 mt-1.5 text-right">
              {content.length} characters
            </p>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={submitting || !isValid}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl
              hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed
              shadow-lg shadow-blue-500/25 btn-shine flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Feedback
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
