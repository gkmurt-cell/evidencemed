import { useState, useEffect, useCallback } from "react";
import { MessageSquare, ThumbsUp, Shield, Trash2, Plus, Loader2, AlertTriangle, Lightbulb, Pill, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const API_URL = process.env.REACT_APP_BACKEND_URL || "";

const ANNOTATION_TYPES = [
  { value: "research_insight", label: "Research Insight", icon: Lightbulb, color: "text-blue-600", requiresVerification: false },
  { value: "clinical_note", label: "Clinical Note", icon: Stethoscope, color: "text-emerald-600", requiresVerification: true },
  { value: "dosage_guidance", label: "Dosage Guidance", icon: Pill, color: "text-purple-600", requiresVerification: false },
  { value: "safety_alert", label: "Safety Alert", icon: AlertTriangle, color: "text-amber-600", requiresVerification: true },
  { value: "drug_interaction", label: "Drug Interaction", icon: AlertTriangle, color: "text-red-600", requiresVerification: true },
];

const VISIBILITY_OPTIONS = [
  { value: "members", label: "All Members" },
  { value: "practitioners_only", label: "Practitioners Only" },
  { value: "public", label: "Public" },
];

interface Annotation {
  id: string;
  compound_id: string;
  author_id: string;
  author_name: string;
  author_credentials?: string;
  is_verified_practitioner: boolean;
  annotation_type: string;
  content: string;
  visibility: string;
  created_at: string;
  helpful_count: number;
}

interface CompoundAnnotationsProps {
  compoundId: string;
  compoundName: string;
  token?: string;
  isVerifiedPractitioner?: boolean;
}

export default function CompoundAnnotations({
  compoundId,
  compoundName,
  token,
  isVerifiedPractitioner = false,
}: CompoundAnnotationsProps) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAnnotation, setNewAnnotation] = useState({
    annotation_type: "research_insight",
    content: "",
    visibility: "members",
  });
  const [helpfulVotes, setHelpfulVotes] = useState<Set<string>>(new Set());

  const fetchAnnotations = useCallback(async () => {
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `${API_URL}/api/compounds/${compoundId}/annotations`,
        { headers }
      );

      if (response.ok) {
        const data = await response.json();
        setAnnotations(data);
      }
    } catch (error) {
      console.error("Failed to fetch annotations:", error);
    } finally {
      setIsLoading(false);
    }
  }, [compoundId, token]);

  useEffect(() => {
    fetchAnnotations();
  }, [fetchAnnotations]);

  const handleSubmitAnnotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please sign in to add annotations");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_URL}/api/compounds/${compoundId}/annotations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            compound_id: compoundId,
            ...newAnnotation,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to add annotation");
      }

      toast.success("Annotation added successfully!");
      setIsAddDialogOpen(false);
      setNewAnnotation({
        annotation_type: "research_insight",
        content: "",
        visibility: "members",
      });
      fetchAnnotations();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add annotation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpfulVote = async (annotationId: string) => {
    if (!token) {
      toast.error("Please sign in to vote");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/annotations/${annotationId}/helpful`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHelpfulVotes((prev) => {
          const newSet = new Set(prev);
          if (data.helpful) {
            newSet.add(annotationId);
          } else {
            newSet.delete(annotationId);
          }
          return newSet;
        });
        fetchAnnotations();
      }
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  const handleDeleteAnnotation = async (annotationId: string) => {
    if (!token) return;

    try {
      const response = await fetch(
        `${API_URL}/api/annotations/${annotationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Annotation deleted");
        fetchAnnotations();
      }
    } catch (error) {
      toast.error("Failed to delete annotation");
    }
  };

  const getAnnotationTypeConfig = (type: string) => {
    return ANNOTATION_TYPES.find((t) => t.value === type) || ANNOTATION_TYPES[0];
  };

  // Filter annotation types based on verification status
  const availableAnnotationTypes = ANNOTATION_TYPES.filter(
    (type) => !type.requiresVerification || isVerifiedPractitioner
  );

  if (isLoading) {
    return (
      <div className="p-4 rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading annotations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="compound-annotations">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          <h3 className="font-serif text-base font-semibold">Professional Annotations</h3>
          <Badge variant="secondary" className="text-xs">
            {annotations.length}
          </Badge>
        </div>

        {token && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1" data-testid="add-annotation-btn">
                <Plus className="w-3 h-3" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Annotation</DialogTitle>
                <DialogDescription>
                  Share your professional insight about {compoundName}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmitAnnotation} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select
                      value={newAnnotation.annotation_type}
                      onValueChange={(value) =>
                        setNewAnnotation({ ...newAnnotation, annotation_type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAnnotationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className={`w-3 h-3 ${type.color}`} />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Visibility</label>
                    <Select
                      value={newAnnotation.visibility}
                      onValueChange={(value) =>
                        setNewAnnotation({ ...newAnnotation, visibility: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {VISIBILITY_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={newAnnotation.content}
                    onChange={(e) =>
                      setNewAnnotation({ ...newAnnotation, content: e.target.value })
                    }
                    placeholder="Share your professional insight, clinical experience, or research findings..."
                    rows={4}
                    required
                  />
                </div>

                {!isVerifiedPractitioner && (
                  <p className="text-xs text-muted-foreground p-2 rounded bg-muted/50">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Verify as a practitioner to add clinical notes and safety alerts.
                  </p>
                )}

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add Annotation"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Annotations List */}
      {annotations.length === 0 ? (
        <div className="p-6 rounded-lg border border-dashed border-border text-center">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            No annotations yet. Be the first to share your professional insight!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {annotations.map((annotation) => {
            const typeConfig = getAnnotationTypeConfig(annotation.annotation_type);
            const IconComponent = typeConfig.icon;

            return (
              <div
                key={annotation.id}
                className="p-3 rounded-lg border border-border bg-card hover:border-primary/20 transition-colors"
                data-testid={`annotation-${annotation.id}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant="outline"
                      className={`text-xs ${typeConfig.color} border-current/30`}
                    >
                      <IconComponent className="w-3 h-3 mr-1" />
                      {typeConfig.label}
                    </Badge>
                    {annotation.is_verified_practitioner && (
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        {annotation.author_credentials}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(annotation.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  {annotation.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      by {annotation.author_name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {token && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-7 text-xs gap-1 ${
                          helpfulVotes.has(annotation.id)
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                        onClick={() => handleHelpfulVote(annotation.id)}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        {annotation.helpful_count > 0 && annotation.helpful_count}
                      </Button>
                    )}

                    {token && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteAnnotation(annotation.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
