export type CarCategory = "electric" | "suv" | "sedan" | "luxury";

export interface Review {
  id: number;
  client_name: string;
  client_email: string;
  car_name: string;
  car_category: CarCategory;
  rating: number;
  title: string;
  content: string;
  is_verified: boolean;
  helpful_count: number;
  created_at: string;
  replies: ReviewReply[];
}

export interface ReviewReply {
  id: number;
  review_id: number;
  author_name: string;
  content: string;
  created_at: string;
}

export interface ReviewSummary {
  average_rating: number;
  total_reviews: number;
  distribution: { rating: number; count: number; percentage: number }[];
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
