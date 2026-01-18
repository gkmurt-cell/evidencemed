import { useState } from "react";
import { MapPin, Search, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const modalities = [
  { name: "Acupuncture", searchTerm: "acupuncture+practitioner" },
  { name: "Chiropractic", searchTerm: "chiropractor" },
  { name: "Naturopathy", searchTerm: "naturopathic+doctor" },
  { name: "Ayurveda", searchTerm: "ayurveda+practitioner" },
  { name: "Functional Medicine", searchTerm: "functional+medicine+doctor" },
  { name: "Homeopathy", searchTerm: "homeopathy+practitioner" },
  { name: "Massage Therapy", searchTerm: "massage+therapist" },
  { name: "Traditional Chinese Medicine", searchTerm: "TCM+practitioner" },
  { name: "Herbalist", searchTerm: "herbalist+practitioner" },
  { name: "Osteopathy", searchTerm: "osteopath" },
];

interface PractitionerFinderProps {
  variant?: "sidebar" | "full";
}

export function PractitionerFinder({ variant = "sidebar" }: PractitionerFinderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [selectedModality, setSelectedModality] = useState(modalities[0]);

  const handleSearch = () => {
    if (!location.trim()) return;
    
    const searchQuery = `${selectedModality.searchTerm}+near+${encodeURIComponent(location)}`;
    const mapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  const handleQuickSearch = (modality: typeof modalities[0]) => {
    if (!location.trim()) {
      setSelectedModality(modality);
      return;
    }
    
    const searchQuery = `${modality.searchTerm}+near+${encodeURIComponent(location)}`;
    const mapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Sidebar compact version */}
      <div className="p-4 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-b border-border">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
          <MapPin className="h-5 w-5" />
          <h3 className="font-heading font-semibold text-sm">Find a Practitioner</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Locate integrative medicine providers near you
        </p>
        
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter your city or zip code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-9 pr-3 h-9 text-sm rounded-full bg-background"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsOpen(true);
              }
            }}
          />
        </div>
        
        <Button 
          size="sm" 
          className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => setIsOpen(true)}
        >
          <MapPin className="h-4 w-4 mr-2" />
          Find Practitioner Near You
        </Button>
      </div>

      {/* Full Map Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              Find an Integrative Medicine Practitioner
            </DialogTitle>
            <DialogDescription>
              Search for certified practitioners in your area by modality
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Location Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Your Location</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter city, state or zip code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Modality Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Select a Modality</label>
              <div className="grid grid-cols-2 gap-2">
                {modalities.map((modality) => (
                  <button
                    key={modality.name}
                    onClick={() => handleQuickSearch(modality)}
                    className={`p-3 text-left rounded-lg border transition-all text-sm ${
                      selectedModality.name === modality.name
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300"
                        : "border-border hover:border-emerald-300 hover:bg-muted/50"
                    }`}
                  >
                    <span className="font-medium">{modality.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleSearch}
              disabled={!location.trim()}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Search on Google Maps
            </Button>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center">
              Results are provided by Google Maps. EvidenceMed does not endorse or verify individual practitioners. 
              Always verify credentials and reviews before scheduling appointments.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
