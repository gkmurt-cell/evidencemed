import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    archive: [
      { name: "Conditions Database", href: "/conditions", isLink: true },
      { name: "Research Library", href: "/research", isLink: true },
      { name: "Natural Compounds", href: "/compounds", isLink: true },
    ],
    methodology: [
      { name: "Editorial Standards", href: "/methodology", isLink: true },
      { name: "Advisory Board", href: "/advisory-board", isLink: true },
      { name: "About", href: "/about", isLink: true },
    ],
    legal: [
      { name: "Medical Disclaimer", href: "#disclaimer" },
      { name: "Privacy Policy", href: "/privacy-policy", isLink: true },
      { name: "Terms of Service", href: "/terms-of-service", isLink: true },
    ],
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Medical Disclaimer */}
      <div className="bg-muted/70 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-semibold text-foreground mb-2 text-center">
              Medical & Educational Disclaimer
            </h3>
            <p className="text-xs text-muted-foreground text-center leading-relaxed mb-3">
              The information provided on this website is for <strong className="text-foreground">general educational and informational purposes only</strong> and 
              does not constitute medical advice, diagnosis, treatment recommendations, or endorsement of any specific therapy, product, or practitioner. 
              Content is derived from published research and does not represent the views of any medical institution.
            </p>
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              <strong className="text-foreground">This content is not a substitute for professional medical advice.</strong> Always seek the guidance of a qualified 
              healthcare provider with any questions regarding a medical condition or treatment options.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">E</span>
              </div>
              <span className="font-serif text-xl font-semibold text-foreground">
                EvidenceMed
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Institutional research archive for alternative and complementary medicine. 
              All content sourced from peer-reviewed publications.
            </p>
          </div>

          {/* Archive Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Archive</h4>
            <ul className="space-y-3">
              {footerLinks.archive.map((link) => (
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

          {/* Methodology Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Methodology</h4>
            <ul className="space-y-3">
              {footerLinks.methodology.map((link) => (
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
            © {currentYear} EvidenceMed Archive. All rights reserved.
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
