import { Link } from "react-router-dom";
import { Leaf, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Conditions Database", href: "/conditions", isLink: true },
      { name: "Research Library", href: "/research", isLink: true },
      { name: "Natural Compounds", href: "/compounds", isLink: true },
      { name: "Integrative Therapies", href: "/integrative-therapies", isLink: true },
      { name: "Ayurveda", href: "/ayurveda", isLink: true },
      { name: "Pricing", href: "/pricing", isLink: true },
    ],
    resources: [
      { name: "For Practitioners", href: "/pricing", isLink: true },
      { name: "For Institutions", href: "/pricing#institutional", isLink: true },
      { name: "Reference Library", href: "/merch", isLink: true },
      { name: "Search", href: "/search", isLink: true },
    ],
    company: [
      { name: "About Us", href: "/about", isLink: true },
      { name: "Editorial Methodology", href: "/editorial-methodology", isLink: true },
      { name: "Contact", href: "mailto:contact@integrativeevidence.com", isLink: false },
    ],
    legal: [
      { name: "Medical Disclaimer", href: "#disclaimer" },
      { name: "Privacy Policy", href: "/privacy-policy", isLink: true },
      { name: "Terms of Service", href: "/terms-of-service", isLink: true },
      { name: "Affiliate Disclosure", href: "/terms-of-service#affiliate", isLink: true },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Legal Disclaimer Banner */}
      <div className="bg-muted/70 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-semibold text-foreground mb-2 text-center">
              Important Medical & Legal Disclaimer
            </h3>
            <p className="text-xs text-muted-foreground text-center leading-relaxed mb-3">
              The information provided on this website is for <strong className="text-foreground">general educational and informational purposes only</strong> and 
              does not constitute medical advice, diagnosis, treatment recommendations, or endorsement of any specific therapy, product, or practitioner. 
              Content is derived from published research and does not represent the views of any medical institution.
            </p>
            <p className="text-xs text-muted-foreground text-center leading-relaxed mb-3">
              <strong className="text-foreground">This content is not a substitute for professional medical advice.</strong> Always seek the guidance of a qualified 
              healthcare provider with any questions regarding a medical condition, treatment options, or before starting any new health regimen. 
              Never disregard professional medical advice or delay seeking treatment because of information you have read on this website.
            </p>
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Research summaries may not reflect the complete body of evidence on any topic. Individual results may vary. 
              IntegrativeEvidence.com assumes no liability for actions taken based on information presented herein. 
              <strong className="text-foreground"> If you are experiencing a medical emergency, call your local emergency services immediately.</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold text-foreground">
                EvidenceMed
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Research-backed education platform for alternative and complementary medicine. 
              All content sourced from peer-reviewed publications.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/integrativeevidence"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/integrativeevidence"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@integrativeevidence.com"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/integrativeevid"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  {link.isLink ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  {link.isLink ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.isLink ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  {link.href === "#disclaimer" ? (
                    <a
                      href="#disclaimer"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('.bg-muted\\/70')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ) : link.isLink ? (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} IntegrativeEvidence.com. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Research aggregated from PubMed, NIH, and peer-reviewed journals.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;