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
              className="flex-shrink-0 w-64 group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
            >
              {/* Lecture-style thumbnail */}
              <div className="aspect-video bg-slate-800 relative">
                {/* Abstract slide visual */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-3/4 h-2/3 bg-slate-700/80 rounded-sm border border-slate-600 flex items-center justify-center">
                    <div className="text-center px-3">
                      <div className="w-8 h-0.5 bg-slate-500 mx-auto mb-1.5" />
                      <div className="w-10 h-0.5 bg-slate-500 mx-auto mb-1.5" />
                      <div className="w-6 h-0.5 bg-slate-500 mx-auto" />
                    </div>
                  </div>
                </div>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Play className="h-4 w-4 text-white ml-0.5" />
                  </div>
                </div>
                {/* Speaker initials */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center">
                    <span className="text-[10px] text-slate-300 font-medium">
                      {video.speaker.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{video.speaker}</p>
                <span className={`inline-block text-xs font-medium text-white px-2 py-0.5 rounded ${getTopicColor(video.topic)}`}>
                  {video.topic}
                </span>
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
