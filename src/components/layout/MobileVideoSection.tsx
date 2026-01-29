import { Video, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface VideoResource {
  id: string;
  title: string;
  speaker: string;
  topic: string;
  url: string;
}

const popularVideos: VideoResource[] = [
  {
    id: "1",
    title: "Repurposing Existing Medications",
    speaker: "Dr. John Campbell",
    topic: "Drug Repurposing",
    url: "https://www.youtube.com/@DrJohnCampbell"
  },
  {
    id: "2",
    title: "New Findings in Cancer Treatment",
    speaker: "Dr. Paul Marik",
    topic: "Integrative Oncology",
    url: "#"
  },
  {
    id: "3",
    title: "Metabolic Health Breakthroughs",
    speaker: "Dr. Peter Attia",
    topic: "Longevity Medicine",
    url: "#"
  },
  {
    id: "4",
    title: "NAD+ and Aging Research",
    speaker: "Dr. David Sinclair",
    topic: "Longevity Science",
    url: "#"
  },
  {
    id: "5",
    title: "Gut Microbiome Insights",
    speaker: "Dr. Will Bulsiewicz",
    topic: "Gut Health",
    url: "#"
  },
  {
    id: "6",
    title: "Fasting and Cellular Repair",
    speaker: "Dr. Jason Fung",
    topic: "Metabolic Health",
    url: "#"
  }
];

// Category color mapping
const getTopicColor = (topic: string): string => {
  const colorMap: Record<string, string> = {
    "Drug Repurposing": "bg-indigo-500",
    "Integrative Oncology": "bg-red-500",
    "Longevity Medicine": "bg-cyan-500",
    "Longevity Science": "bg-yellow-600",
    "Gut Health": "bg-lime-600",
    "Metabolic Health": "bg-teal-500",
  };
  return colorMap[topic] || "bg-primary";
};

export function MobileVideoSection() {
  return (
    <section className="lg:hidden py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Video className="h-6 w-6" />
          <h2 className="font-heading text-2xl font-semibold">Expert Talks</h2>
        </div>
        <p className="text-muted-foreground mb-6">Practitioner insights & research videos</p>
        
        {/* Horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {popularVideos.map((video) => (
            <a 
              key={video.id} 
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-64 group bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <Play className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{video.speaker}</p>
                </div>
              </div>
              <span className={`inline-block text-xs font-medium text-white px-2 py-0.5 rounded ${getTopicColor(video.topic)}`}>
                {video.topic}
              </span>
              <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
                <ExternalLink className="h-3 w-3" />
                <span>Watch Now</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link to="/merch">
            <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-primary-foreground">
              Browse All Videos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
