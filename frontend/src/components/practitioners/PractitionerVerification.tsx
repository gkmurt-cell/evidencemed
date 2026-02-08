import { useState } from "react";
import { Shield, CheckCircle, Clock, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const CREDENTIALS_OPTIONS = [
  { value: "MD", label: "MD - Doctor of Medicine" },
  { value: "DO", label: "DO - Doctor of Osteopathic Medicine" },
  { value: "ND", label: "ND - Naturopathic Doctor" },
  { value: "DC", label: "DC - Doctor of Chiropractic" },
  { value: "LAc", label: "LAc - Licensed Acupuncturist" },
  { value: "RD", label: "RD - Registered Dietitian" },
  { value: "PharmD", label: "PharmD - Doctor of Pharmacy" },
  { value: "PhD", label: "PhD - Doctor of Philosophy" },
  { value: "NP", label: "NP - Nurse Practitioner" },
  { value: "PA", label: "PA - Physician Assistant" },
  { value: "RN", label: "RN - Registered Nurse" },
  { value: "CNS", label: "CNS - Clinical Nurse Specialist" },
  { value: "Other", label: "Other Healthcare Professional" },
];

const SPECIALTY_OPTIONS = [
  "Integrative Medicine",
  "Functional Medicine",
  "Naturopathic Medicine",
  "Internal Medicine",
  "Family Medicine",
  "Nutrition",
  "Oncology",
  "Cardiology",
  "Neurology",
  "Psychiatry",
  "Gastroenterology",
  "Endocrinology",
  "Rheumatology",
  "Pain Management",
  "Sports Medicine",
  "Pediatrics",
  "Geriatrics",
  "Women's Health",
  "Other",
];

interface VerificationStatus {
  status: string;
  verification?: {
    id: string;
    license_number: string;
    license_state: string;
    specialty: string;
    credentials: string;
    status: string;
    submitted_at: string;
    reviewed_at?: string;
    rejection_reason?: string;
  };
}

interface PractitionerVerificationProps {
  token: string;
  currentStatus?: VerificationStatus;
  onVerificationSubmitted?: () => void;
}

export default function PractitionerVerification({
  token,
  currentStatus,
  onVerificationSubmitted,
}: PractitionerVerificationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    license_number: "",
    license_state: "",
    specialty: "",
    institution: "",
    years_experience: "",
    credentials: "",
    bio: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/practitioners/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          years_experience: formData.years_experience
            ? parseInt(formData.years_experience)
            : null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to submit verification");
      }

      toast.success("Verification request submitted! We'll review it shortly.");
      setIsOpen(false);
      onVerificationSubmitted?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render status badge
  const renderStatusBadge = () => {
    if (!currentStatus || currentStatus.status === "not_submitted") {
      return null;
    }

    const status = currentStatus.verification?.status || currentStatus.status;

    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified Practitioner
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Verification Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="bg-red-500/10 text-red-600 border-red-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            Verification Declined
          </Badge>
        );
      default:
        return null;
    }
  };

  // If already approved, show badge only
  if (currentStatus?.status === "approved" || currentStatus?.verification?.status === "approved") {
    return (
      <div className="flex items-center gap-2">
        {renderStatusBadge()}
        <span className="text-xs text-muted-foreground">
          {currentStatus.verification?.credentials} • {currentStatus.verification?.specialty}
        </span>
      </div>
    );
  }

  // If pending, show status
  if (currentStatus?.status === "pending" || currentStatus?.verification?.status === "pending") {
    return (
      <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-amber-600" />
          <span className="font-medium text-amber-700 dark:text-amber-400">
            Verification In Progress
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          Your practitioner verification request is being reviewed. You'll receive an email once it's processed.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Submitted: {new Date(currentStatus.verification?.submitted_at || "").toLocaleDateString()}
        </p>
      </div>
    );
  }

  // If rejected, show reason and allow resubmit
  if (currentStatus?.status === "rejected" || currentStatus?.verification?.status === "rejected") {
    return (
      <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
        <div className="flex items-center gap-2 mb-2">
          <XCircle className="w-4 h-4 text-red-600" />
          <span className="font-medium text-red-700 dark:text-red-400">
            Verification Declined
          </span>
        </div>
        {currentStatus.verification?.rejection_reason && (
          <p className="text-sm text-muted-foreground mb-3">
            Reason: {currentStatus.verification.rejection_reason}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          Please contact support if you believe this is an error.
        </p>
      </div>
    );
  }

  // Default: show verification request button
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" data-testid="verify-practitioner-btn">
          <Shield className="w-4 h-4" />
          Verify as Practitioner
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Practitioner Verification
          </DialogTitle>
          <DialogDescription>
            Verify your healthcare credentials to unlock additional features including
            professional annotations and verified practitioner badge.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="credentials">Credentials *</Label>
              <Select
                value={formData.credentials}
                onValueChange={(value) =>
                  setFormData({ ...formData, credentials: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select credentials" />
                </SelectTrigger>
                <SelectContent>
                  {CREDENTIALS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty *</Label>
              <Select
                value={formData.specialty}
                onValueChange={(value) =>
                  setFormData({ ...formData, specialty: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALTY_OPTIONS.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="license_number">License Number *</Label>
              <Input
                id="license_number"
                value={formData.license_number}
                onChange={(e) =>
                  setFormData({ ...formData, license_number: e.target.value })
                }
                placeholder="e.g., MD12345"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="license_state">License State/Region *</Label>
              <Input
                id="license_state"
                value={formData.license_state}
                onChange={(e) =>
                  setFormData({ ...formData, license_state: e.target.value })
                }
                placeholder="e.g., California"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution (Optional)</Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) =>
                  setFormData({ ...formData, institution: e.target.value })
                }
                placeholder="e.g., Stanford Medicine"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years_experience">Years of Experience</Label>
              <Input
                id="years_experience"
                type="number"
                min="0"
                max="60"
                value={formData.years_experience}
                onChange={(e) =>
                  setFormData({ ...formData, years_experience: e.target.value })
                }
                placeholder="e.g., 10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio (Optional)</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Brief description of your practice and areas of expertise..."
              rows={3}
            />
          </div>

          <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <p className="font-medium mb-1">What you'll get:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Verified Practitioner badge on your profile</li>
              <li>Ability to add clinical annotations to compound pages</li>
              <li>Access to practitioner-only resources and discussions</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit for Verification"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
