import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg" | "xl";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showValue?: boolean;
}

export default function StarRating({
  rating,
  size = "md",
  interactive = false,
  onChange,
  showValue = false,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const sizeMap = { sm: 14, md: 18, lg: 24, xl: 32 };
  const starSize = sizeMap[size];

  const displayRating = hovered || rating;

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= displayRating;
          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange?.(star)}
              onMouseEnter={() => interactive && setHovered(star)}
              onMouseLeave={() => interactive && setHovered(0)}
              className={`transition-all duration-200 ${
                interactive
                  ? "cursor-pointer hover:scale-110 active:scale-95"
                  : "cursor-default"
              } ${filled ? "star-pop" : ""}`}
              style={{ animationDelay: `${star * 0.05}s` }}
            >
              <Star
                size={starSize}
                className={`transition-colors duration-200 ${
                  filled
                    ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                    : "fill-gray-200 text-gray-200"
                } ${interactive && !filled ? "hover:fill-amber-200 hover:text-amber-200" : ""}`}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-semibold text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
