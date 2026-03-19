import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThumbsUp,
  MessageCircle,
  Shield,
  Clock,
  Zap,
  Crown,
  Truck,
  CarFront,
  Send,
  ChevronDown,
  ChevronUp,
  Reply,
  Trash2,
} from "lucide-react";
import { Review } from "../types";
import StarRating from "./StarRating";
import { markHelpful, unmarkHelpful, submitReply, deleteReply } from "../services/api";

interface Props {
  review: Review;
  onUpdate: () => void;
  index?: number;
}

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 5) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const AVATAR_GRADIENTS = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-purple-500 to-violet-600",
  "from-orange-500 to-red-500",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-fuchsia-500 to-purple-600",
];

function getAvatarGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "electric":
      return <Zap size={13} />;
    case "suv":
      return <Truck size={13} />;
    case "luxury":
      return <Crown size={13} />;
    default:
      return <CarFront size={13} />;
  }
}

function getCategoryStyle(category: string) {
  switch (category) {
    case "electric":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "suv":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "luxury":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-blue-50 text-blue-700 border-blue-200";
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ReviewCard({ review, onUpdate, index = 0 }: Props) {
  const [helpfulClicked, setHelpfulClicked] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("liked_reviews");
      const liked: number[] = stored ? JSON.parse(stored) : [];
      return liked.includes(review.id);
    } catch {
      return false;
    }
  });
  const [helpfulCount, setHelpfulCount] = useState(review.helpful_count);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [replyName, setReplyName] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);
  const [myReplies, setMyReplies] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem("my_reply_ids");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleHelpful = async () => {
    try {
      const stored = localStorage.getItem("liked_reviews");
      let liked: number[] = stored ? JSON.parse(stored) : [];

      if (helpfulClicked) {
        // Unlike
        await unmarkHelpful(review.id);
        setHelpfulCount((c) => Math.max(0, c - 1));
        setHelpfulClicked(false);
        liked = liked.filter((id) => id !== review.id);
      } else {
        // Like
        await markHelpful(review.id);
        setHelpfulCount((c) => c + 1);
        setHelpfulClicked(true);
        if (!liked.includes(review.id)) {
          liked.push(review.id);
        }
      }
      localStorage.setItem("liked_reviews", JSON.stringify(liked));
    } catch {
      /* silently fail */
    }
  };

  const handleReplySubmit = async () => {
    if (!replyName.trim() || !replyContent.trim()) return;
    setSubmittingReply(true);
    try {
      const newReply = await submitReply(review.id, {
        author_name: replyName,
        content: replyContent,
      });

      const newMyReplies = [...myReplies, newReply.id];
      setMyReplies(newMyReplies);
      localStorage.setItem("my_reply_ids", JSON.stringify(newMyReplies));

      setReplyName("");
      setReplyContent("");
      setShowReplyForm(false);
      onUpdate();
    } catch {
      alert("Failed to submit reply.");
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleDeleteReply = async (replyId: number) => {
    if (!window.confirm("Are you sure you want to delete this reply?")) return;
    try {
      await deleteReply(review.id, replyId);
      const newMyReplies = myReplies.filter((id) => id !== replyId);
      setMyReplies(newMyReplies);
      localStorage.setItem("my_reply_ids", JSON.stringify(newMyReplies));
      onUpdate();
    } catch {
      alert("Failed to delete reply.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-strong rounded-2xl shadow-sm card-hover overflow-hidden"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${getAvatarGradient(
                review.client_name
              )} flex items-center justify-center text-white text-sm font-bold shadow-md`}
            >
              {getInitials(review.client_name)}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-gray-900">
                  {review.client_name}
                </span>
                {review.is_verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200 uppercase tracking-wider">
                    <Shield size={10} className="fill-emerald-500 text-emerald-500" />
                    Verified Renter
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                <span>Rented:</span>
                <span className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                  {review.car_name}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold border ${getCategoryStyle(
                    review.car_category
                  )}`}
                >
                  {getCategoryIcon(review.car_category)}
                  {review.car_category.toUpperCase()}
                </span>
                <span className="text-gray-300">|</span>
                <span>{formatDate(review.created_at)}</span>
              </div>
            </div>
          </div>
          <StarRating rating={review.rating} size="sm" />
        </div>

        {/* Content */}
        <h3 className="font-bold text-gray-900 mb-2 text-[15px]">{review.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {review.content}
        </p>

        {/* Replies */}
        <AnimatePresence>
          {review.replies?.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-2 transition-colors"
              >
                <Reply size={13} />
                {review.replies.length} {review.replies.length === 1 ? "Reply" : "Replies"}
                {showReplies ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>

              {showReplies && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  {review.replies.map((reply) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-2 pl-4 border-l-2 border-blue-300 bg-gradient-to-r from-blue-50/80 to-transparent rounded-r-xl p-3.5 group"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                            <CarFront size={12} className="text-white" />
                          </div>
                          <span className="text-sm font-bold text-blue-700">
                            {reply.author_name}
                          </span>
                          <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <Clock size={10} />
                            {getRelativeTime(reply.created_at)}
                          </span>
                        </div>
                        {myReplies.includes(reply.id) && (
                          <button
                            onClick={() => handleDeleteReply(reply.id)}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                            title="Delete reply"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {reply.content}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleHelpful}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                helpfulClicked
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-500 hover:bg-gray-50 hover:text-blue-600 border border-transparent"
              }`}
            >
              <ThumbsUp
                size={14}
                className={helpfulClicked ? "fill-blue-500" : ""}
              />
              Helpful
              <span
                className={`text-xs font-bold ${
                  helpfulClicked ? "text-blue-700" : "text-gray-400"
                }`}
              >
                ({helpfulCount})
              </span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowReplyForm(!showReplyForm)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                showReplyForm
                  ? "bg-gray-100 text-gray-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <MessageCircle size={14} />
              Reply
            </motion.button>
          </div>

          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={12} />
            {getRelativeTime(review.created_at)}
          </span>
        </div>

        {/* Reply Form */}
        <AnimatePresence>
          {showReplyForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100 space-y-3"
            >
              <input
                type="text"
                placeholder="Your name"
                value={replyName}
                onChange={(e) => setReplyName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
              />
              <textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowReplyForm(false)}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReplySubmit}
                  disabled={
                    submittingReply ||
                    !replyName.trim() ||
                    !replyContent.trim()
                  }
                  className="flex items-center gap-1.5 px-4 py-2 text-sm bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-all shadow-sm"
                >
                  <Send size={13} />
                  {submittingReply ? "Sending..." : "Reply"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
