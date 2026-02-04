import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | EvidenceMed</title>
        <meta
          name="description"
          content="Privacy Policy for EvidenceMed - Learn how we collect, use, and protect your personal information."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground text-lg">
                Last updated: February 4, 2025
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  1. Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Welcome to EvidenceMed ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using EvidenceMed, you agree to this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  2. Information We Collect
                </h2>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  Information You Provide
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Account registration information (name, email address, professional credentials)</li>
                  <li>Profile information (organization, professional title)</li>
                  <li>Communications with us (support requests, feedback)</li>
                  <li>Payment information for subscription services</li>
                </ul>

                <h3 className="text-xl font-medium text-foreground mb-3">
                  Automatically Collected Information
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Device information (browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, search queries)</li>
                  <li>IP address and general location information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide, maintain, and improve our educational platform</li>
                  <li>Process your account registration and manage your subscription</li>
                  <li>Personalize your experience and deliver relevant content</li>
                  <li>Communicate with you about updates, features, and educational resources</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Analyze usage patterns to enhance our services</li>
                  <li>Protect against unauthorized access and ensure platform security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  4. Information Sharing
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong className="text-foreground">Service Providers:</strong> With third-party vendors who assist in operating our platform (hosting, analytics, payment processing)</li>
                  <li><strong className="text-foreground">Institutional Licenses:</strong> With your organization if you access our platform through an institutional subscription</li>
                  <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong className="text-foreground">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  5. Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  6. Your Rights and Choices
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong className="text-foreground">Access:</strong> Request a copy of your personal information</li>
                  <li><strong className="text-foreground">Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong className="text-foreground">Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong className="text-foreground">Data Portability:</strong> Receive your data in a portable format</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, please contact us at{" "}
                  <a href="mailto:privacy@integrativeevidence.com" className="text-primary hover:underline">
                    privacy@integrativeevidence.com
                  </a>
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  7. Cookies and Tracking
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your experience. These include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong className="text-foreground">Essential Cookies:</strong> Required for basic site functionality</li>
                  <li><strong className="text-foreground">Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong className="text-foreground">Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  8. Third-Party Links
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform may contain links to third-party websites, including PubMed, NIH, and other research databases. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  9. Children's Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  EvidenceMed is designed for healthcare professionals and researchers. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  10. Changes to This Policy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  11. Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-muted/50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-primary" />
                    <a href="mailto:privacy@integrativeevidence.com" className="text-primary hover:underline">
                      privacy@integrativeevidence.com
                    </a>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    IntegrativeEvidence.com<br />
                    Privacy Inquiries
                  </p>
                </div>
              </section>

              {/* Related Links */}
              <section className="border-t border-border pt-8 mt-12">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Related Policies
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/terms-of-service"
                    className="text-primary hover:underline"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    to="/editorial-methodology"
                    className="text-primary hover:underline"
                  >
                    Editorial Methodology
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
