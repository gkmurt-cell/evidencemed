import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Star, ThumbsUp, User } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const sampleReviews: Review[] = [
  {
    id: "1",
    name: "Dr. Sarah M.",
    rating: 5,
    comment: "This platform has transformed how I research alternative therapies for my patients. The peer-reviewed focus gives me confidence in the information.",
    date: "Jan 15, 2026",
    helpful: 24,
  },
  {
    id: "2",
    name: "James T.",
    rating: 5,
    comment: "Finally, a resource that takes evidence-based alternative medicine seriously. The research summaries save me hours of work.",
    date: "Jan 12, 2026",
    helpful: 18,
  },
  {
    id: "3",
    name: "Linda R., ND",
    rating: 4,
    comment: "Great compilation of integrative therapies. Would love to see more on essential oils and aromatherapy research.",
    date: "Jan 8, 2026",
    helpful: 12,
  },
];

const CommentsSection = () => {
  const [reviews] = useState<Review[]>(sampleReviews);
  const [newReview, setNewReview] = useState({ name: "", email: "", rating: 5, comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would save to database
    console.log("Review submitted:", newReview);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setNewReview({ name: "", email: "", rating: 5, comment: "" });
  };

  const renderStars = (rating: number, interactive = false, onRate?: (r: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
            } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
            onClick={() => interactive && onRate?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 lg:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                Community Feedback & Reviews
              </h2>
            </div>
            <p className="text-muted-foreground">
              Share your experience with EvidenceMed and help others discover evidence-based alternative medicine resources.
            </p>
          </div>

          {/* Reviews List */}
          <div className="space-y-6 mb-10">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{review.name}</h4>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-muted-foreground mb-4">{review.comment}</p>
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            ))}
          </div>

          {/* Submit Review Form */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
              Leave a Review
            </h3>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-lg font-medium text-foreground">Thank you for your feedback!</p>
                <p className="text-muted-foreground">Your review will be published after moderation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Your Name
                    </label>
                    <Input
                      placeholder="Dr. Jane Doe"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email (for follow-up, not published)
                    </label>
                    <Input
                      type="email"
                      placeholder="jane@example.com"
                      value={newReview.email}
                      onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Rating
                  </label>
                  {renderStars(newReview.rating, true, (r) => setNewReview({ ...newReview, rating: r }))}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Review
                  </label>
                  <Textarea
                    placeholder="Share your experience with EvidenceMed..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Submit Review
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentsSection;
