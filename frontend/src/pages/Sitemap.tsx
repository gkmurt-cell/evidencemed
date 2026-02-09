import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Home,
  Search,
  FileText,
  Pill,
  Heart,
  BookOpen,
  Users,
  Building,
  Shield,
  User,
  Settings
} from "lucide-react";

const sitemapSections = [
  {
    title: "Main Pages",
    icon: Home,
    links: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Search", path: "/search" },
    ]
  },
  {
    title: "Research & Conditions",
    icon: Search,
    links: [
      { name: "Research Library", path: "/research" },
      { name: "Medical Conditions", path: "/conditions" },
      { name: "Resources & Bibliography", path: "/resources" },
    ]
  },
  {
    title: "Natural Compounds",
    icon: Pill,
    links: [
      { name: "All Compounds", path: "/compounds" },
    ]
  },
  {
    title: "Integrative Therapies",
    icon: Heart,
    links: [
      { name: "Integrative Therapies Overview", path: "/therapies" },
      { name: "Ayurveda", path: "/ayurveda" },
      { name: "Traditional Chinese Medicine", path: "/tcm" },
      { name: "Naturopathic Medicine", path: "/naturopathy" },
      { name: "Homeopathy", path: "/homeopathy" },
      { name: "Unani Medicine", path: "/unani" },
      { name: "Functional Medicine", path: "/functional-medicine" },
      { name: "Aromatherapy", path: "/aromatherapy" },
      { name: "Energy Healing", path: "/energy-healing" },
      { name: "Mind-Body Medicine", path: "/mind-body" },
      { name: "Bodywork & Manual Therapy", path: "/bodywork" },
      { name: "Nutritional Therapy", path: "/nutrition" },
      { name: "Sound & Vibrational Therapy", path: "/sound-therapy" },
      { name: "Hydrotherapy", path: "/hydrotherapy" },
      { name: "Sai Vibrionics", path: "/sai-vibrionics" },
    ]
  },
  {
    title: "Methodology & Standards",
    icon: BookOpen,
    links: [
      { name: "Editorial Methodology", path: "/methodology" },
      { name: "Advisory Board", path: "/advisory-board" },
    ]
  },
  {
    title: "For Practitioners",
    icon: Users,
    links: [
      { name: "Practitioner Directory", path: "/practitioners" },
      { name: "Practitioner Repository", path: "/practitioner-repository" },
    ]
  },
  {
    title: "Institutional",
    icon: Building,
    links: [
      { name: "Institutional Access", path: "/institutional-access" },
      { name: "Institutional Pricing", path: "/institutional-pricing" },
    ]
  },
  {
    title: "Account",
    icon: User,
    links: [
      { name: "Sign In / Register", path: "/auth" },
      { name: "Member Resources", path: "/member-resources" },
      { name: "Profile", path: "/profile" },
    ]
  },
  {
    title: "Legal & Policies",
    icon: Shield,
    links: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms of Service", path: "/terms-of-service" },
    ]
  },
];

const Sitemap = () => {
  return (
    <>
      <Helmet>
        <title>Sitemap | EvidenceMed</title>
        <meta name="description" content="Complete sitemap of EvidenceMed - navigate all pages including research, compounds, integrative therapies, and resources." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Sitemap</h1>
            <p className="text-muted-foreground mb-8">
              Complete navigation guide to all pages on EvidenceMed
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {sitemapSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div key={index} className="bg-card border border-border rounded-xl p-5">
                    <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary" />
                      {section.title}
                    </h2>
                    <ul className="space-y-2">
                      {section.links.map((link, i) => (
                        <li key={i}>
                          <Link 
                            to={link.path}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Sitemap;
