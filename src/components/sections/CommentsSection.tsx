import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Star, ThumbsUp, User, LogIn } from "lucide-react";
import { getBackendClient } from "@/lib/backend";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
  helpful_count: number;
  user_id: string;
}

const CommentsSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [helpfulMarks, setHelpfulMarks] = useState<Set<string>>(new Set());

  // Fetch approved reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const client = await getBackendClient();
      if (!client) {
        setReviews([]);
        setLoading(false);
        return;
      }

      const { data, error } = await client
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (!error && data) {
        setReviews(data);
      }
      setLoading(false);
    };

    fetchReviews();
  }, []);

  // Fetch user's helpful marks
  useEffect(() => {
    if (!user) return;

    const fetchHelpfulMarks = async () => {
      const client = await getBackendClient();
      if (!client) return;

      const { data } = await client
        .from("review_helpful")
        .select("review_id")
        .eq("user_id", user.id);

      if (data) {
        setHelpfulMarks(new Set(data.map((h) => h.review_id)));
      }
    };

    fetchHelpfulMarks();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to submit a review.",
        variant: "destructive",
      });
      return;
    }

    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in your name and review.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    const client = await getBackendClient();
    if (!client) {
      toast({
        title: "Temporarily unavailable",
        description: "The backend is still loading. Please refresh and try again.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    const { error } = await client.from("reviews").insert({
      user_id: user.id,
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thank you!",
        description: "Your review has been submitted and will be published after moderation.",
      });
      setNewReview({ name: "", rating: 5, comment: "" });
    }

    setSubmitting(false);
  };

  const handleHelpful = async (reviewId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to mark reviews as helpful.",
        variant: "destructive",
      });
      return;
    }

    const isMarked = helpfulMarks.has(reviewId);

    if (isMarked) {
      const client = await getBackendClient();
      if (!client) {
        toast({
          title: "Temporarily unavailable",
          description: "The backend is still loading. Please refresh and try again.",
          variant: "destructive",
        });
        return;
      }

      await client
        .from("review_helpful")
        .delete()
        .eq("review_id", reviewId)
        .eq("user_id", user.id);

      setHelpfulMarks(prev => {
        const next = new Set(prev);
        next.delete(reviewId);
        return next;
      });
    } else {
      const client = await getBackendClient();
      if (!client) {
        toast({
          title: "Temporarily unavailable",
          description: "The backend is still loading. Please refresh and try again.",
          variant: "destructive",
        });
        return;
      }

      await client.from("review_helpful").insert({
        review_id: reviewId,
        user_id: user.id,
      });

      setHelpfulMarks(prev => new Set([...prev, reviewId]));
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              reviews.map((review) => (
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
                        <p className="text-xs text-muted-foreground">{formatDate(review.created_at)}</p>
                      </div>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-muted-foreground mb-4">{review.comment}</p>
                  <button 
                    onClick={() => handleHelpful(review.id)}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      helpfulMarks.has(review.id) 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${helpfulMarks.has(review.id) ? "fill-current" : ""}`} />
                    <span>Helpful ({review.helpful_count + (helpfulMarks.has(review.id) ? 1 : 0)})</span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Submit Review Form */}
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
              Leave a Review
            </h3>
            
            {!user ? (
              <div className="text-center py-8">
                <LogIn className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Sign in to leave a review</p>
                <Button asChild>
                  <a href="/auth">Sign In</a>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Name (as displayed)
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

                <Button type="submit" className="w-full md:w-auto" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Review"}
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
