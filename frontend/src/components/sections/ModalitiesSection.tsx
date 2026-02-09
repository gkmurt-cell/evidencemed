import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const modalities = [
  { name: "Ayurveda", path: "/ayurveda", color: "text-amber-600" },
  { name: "Traditional Chinese Medicine", path: "/tcm", color: "text-rose-600" },
  { name: "Naturopathy", path: "/naturopathy", color: "text-green-600" },
  { name: "Homeopathy", path: "/homeopathy", color: "text-purple-600" },
  { name: "Unani Medicine", path: "/unani", color: "text-teal-600" },
  { name: "Functional Medicine", path: "/functional-medicine", color: "text-blue-600" },
  { name: "Aromatherapy", path: "/aromatherapy", color: "text-pink-600" },
  { name: "Energy Healing", path: "/energy-healing", color: "text-violet-600" },
  { name: "Mind-Body Medicine", path: "/mind-body", color: "text-cyan-600" },
  { name: "Bodywork & Manual Therapy", path: "/bodywork", color: "text-orange-600" },
  { name: "Nutritional Therapy", path: "/nutrition", color: "text-emerald-600" },
  { name: "Sound Therapy", path: "/sound-therapy", color: "text-indigo-600" },
  { name: "Hydrotherapy", path: "/hydrotherapy", color: "text-sky-600" },
  { name: "Sai Vibrionics", path: "/sai-vibrionics", color: "text-fuchsia-600" },
];

const ModalitiesSection = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-2">
              Explore Integrative Modalities
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Comprehensive guides to traditional and modern healing systems
            </p>
          </div>

          {/* Modalities Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {modalities.map((modality) => (
              <Link
                key={modality.path}
                to={modality.path}
                className="group bg-card border border-border rounded-lg px-3 py-2.5 hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <span className={`text-sm font-medium ${modality.color} group-hover:underline`}>
                  {modality.name}
                </span>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-6">
            <Link
              to="/therapies"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              View All Therapies & Detailed Guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModalitiesSection;
