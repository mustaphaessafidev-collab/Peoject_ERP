import { ReviewsResponse, ReviewSummary, Review, ReviewReply, CarCategory } from "../types";

// Static mock data
let mockReviews: Review[] = [
  {
    id: 1,
    client_name: "Alice Dupont",
    client_email: "alice@example.com",
    car_name: "Tesla Model S",
    car_category: "electric",
    rating: 5,
    title: "Amazing experience!",
    content: "The car was in perfect condition and driving it was a dream. Highly recommended.",
    is_verified: true,
    helpful_count: 12,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    replies: [
      {
        id: 1,
        review_id: 1,
        author_name: "Customer Service",
        content: "Thank you for your review, Alice! We hope to see you again.",
        created_at: new Date(Date.now() - 86400000).toISOString()
      }
    ]
  },
  {
    id: 2,
    client_name: "Bob Martin",
    client_email: "bob@example.com",
    car_name: "Range Rover Sport",
    car_category: "suv",
    rating: 4,
    title: "Great SUV for family trip",
    content: "Very spacious and clean. The pickup process was slightly delayed though.",
    is_verified: true,
    helpful_count: 5,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    replies: []
  },
  {
    id: 3,
    client_name: "Claire Boucher",
    client_email: "claire@example.com",
    car_name: "Mercedes S-Class",
    car_category: "luxury",
    rating: 5,
    title: "Absolute luxury",
    content: "Everything was perfectly handled by the rental service. Five stars.",
    is_verified: true,
    helpful_count: 8,
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    replies: []
  },
  {
    id: 4,
    client_name: "David Lee",
    client_email: "david@example.com",
    car_name: "Toyota Camry",
    car_category: "sedan",
    rating: 3,
    title: "Good but basic",
    content: "The car was fine, but the interior could have been cleaner.",
    is_verified: false,
    helpful_count: 2,
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    replies: []
  }
];

let mockId = 5;
let mockReplyId = 2;

export async function fetchReviews(
  category?: string,
  sort?: string,
  page = 1,
  limit = 4
): Promise<ReviewsResponse> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  let filtered = [...mockReviews];
  if (category && category !== "all") {
    filtered = filtered.filter(r => r.car_category === category);
  }
  
  if (sort === "highest") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "lowest") {
    filtered.sort((a, b) => a.rating - b.rating);
  } else {
    // latest
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return {
    reviews: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}

export async function fetchSummary(): Promise<ReviewSummary> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const total = mockReviews.length;
  if (total === 0) {
    return {
      average_rating: 0,
      total_reviews: 0,
      distribution: [5, 4, 3, 2, 1].map(r => ({ rating: r, count: 0, percentage: 0 }))
    };
  }

  const sum = mockReviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = sum / total;
  
  const dist = [5, 4, 3, 2, 1].map(r => {
    const count = mockReviews.filter(rev => rev.rating === r).length;
    return {
      rating: r,
      count,
      percentage: Math.round((count / total) * 100)
    };
  });

  return {
    average_rating: avg,
    total_reviews: total,
    distribution: dist
  };
}

export async function submitReview(data: {
  client_name: string;
  client_email: string;
  car_name: string;
  car_category: string;
  rating: number;
  title: string;
  content: string;
}): Promise<Review> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newReview: Review = {
    id: mockId++,
    client_name: data.client_name,
    client_email: data.client_email,
    car_name: data.car_name,
    car_category: data.car_category as CarCategory,
    rating: data.rating,
    title: data.title,
    content: data.content,
    is_verified: false,
    helpful_count: 0,
    created_at: new Date().toISOString(),
    replies: []
  };
  
  mockReviews = [newReview, ...mockReviews];
  return newReview;
}

export async function markHelpful(id: number): Promise<Review> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const review = mockReviews.find(r => r.id === id);
  if (!review) throw new Error("Review not found");
  review.helpful_count += 1;
  return { ...review };
}

export async function unmarkHelpful(id: number): Promise<Review> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const review = mockReviews.find(r => r.id === id);
  if (!review) throw new Error("Review not found");
  review.helpful_count = Math.max(0, review.helpful_count - 1);
  return { ...review };
}

export async function submitReply(
  reviewId: number,
  data: { author_name: string; content: string }
): Promise<ReviewReply> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const review = mockReviews.find(r => r.id === reviewId);
  if (!review) throw new Error("Review not found");
  
  const newReply: ReviewReply = {
    id: mockReplyId++,
    review_id: reviewId,
    author_name: data.author_name,
    content: data.content,
    created_at: new Date().toISOString()
  };
  
  review.replies.push(newReply);
  return newReply;
}

export async function deleteReply(reviewId: number, replyId: number): Promise<ReviewReply> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const review = mockReviews.find(r => r.id === reviewId);
  if (!review) throw new Error("Review not found");
  
  const replyIndex = review.replies.findIndex(r => r.id === replyId);
  if (replyIndex === -1) throw new Error("Reply not found");
  
  const [deleted] = review.replies.splice(replyIndex, 1);
  return deleted;
}
