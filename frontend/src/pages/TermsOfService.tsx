import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | EvidenceMed</title>
        <meta 
          name="description" 
          content="Terms of Service for EvidenceMed. Read our terms and conditions governing the use of our educational research platform." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow pt-20 lg:pt-24">
          <div className="container mx-auto px-4 py-12 lg:py-16">
            <div className="max-w-3xl mx-auto prose prose-muted dark:prose-invert">
              
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Terms of Service
              </h1>
              
              <p className="text-muted-foreground mb-8">
                Last updated: February 2025
              </p>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By accessing or using EvidenceMed ("the Platform"), you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use the Platform.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Continued use of the Platform after 
                  changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  2. Description of Service
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  EvidenceMed is an educational research platform that aggregates, organizes, and summarizes 
                  peer-reviewed scientific literature relating to complementary, alternative, and integrative therapies.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The Platform provides access to research summaries, study categorizations, and related educational content.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  3. Educational Purpose Only
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All content on EvidenceMed is provided for educational and informational purposes only. The Platform:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Does not provide medical advice, diagnosis, or treatment recommendations</li>
                  <li>Does not recommend dosages or therapeutic protocols</li>
                  <li>Does not establish a doctor-patient relationship</li>
                  <li>Should not be used as a substitute for professional medical advice</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Always consult a qualified healthcare provider before making any health-related decisions.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  4. User Accounts
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Some features of the Platform may require registration. When creating an account, you agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate accounts that violate these terms.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  5. Acceptable Use
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Use the Platform for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to any portion of the Platform</li>
                  <li>Interfere with or disrupt the Platform's operation</li>
                  <li>Scrape, harvest, or collect data without authorization</li>
                  <li>Redistribute, republish, or commercially exploit content without permission</li>
                  <li>Misrepresent your affiliation or impersonate others</li>
                  <li>Use the Platform to promote or sell products or services without authorization</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  6. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Platform and its original content, features, and functionality are owned by EvidenceMed 
                  and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Research summaries and categorizations are original works created by EvidenceMed. 
                  The underlying research articles remain the property of their respective publishers and authors.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You may not reproduce, distribute, or create derivative works without explicit written permission.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  7. Third-Party Links and Content
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Platform may contain links to third-party websites, including academic publishers, 
                  research databases, and affiliate partners.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We are not responsible for the content, accuracy, or practices of third-party sites. 
                  Inclusion of links does not imply endorsement.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  8. Subscriptions and Payments
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Certain features may require a paid subscription. By subscribing, you agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Pay all applicable fees as described at the time of purchase</li>
                  <li>Provide accurate billing information</li>
                  <li>Accept automatic renewal unless cancelled before the renewal date</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Refund policies are described on our pricing page. We reserve the right to modify pricing with notice.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  9. Disclaimer of Warranties
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Platform is provided "as is" and "as available" without warranties of any kind, 
                  either express or implied, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Implied warranties of merchantability or fitness for a particular purpose</li>
                  <li>Accuracy, completeness, or reliability of content</li>
                  <li>Uninterrupted or error-free operation</li>
                  <li>Freedom from viruses or harmful components</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We do not warrant that the research summaries are free from errors or that they reflect 
                  the most current scientific consensus.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  10. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To the fullest extent permitted by law, EvidenceMed shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Loss of profits, data, or goodwill</li>
                  <li>Health outcomes resulting from reliance on Platform content</li>
                  <li>Damages arising from unauthorized access to your account</li>
                  <li>Any matter beyond our reasonable control</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Our total liability shall not exceed the amount paid by you, if any, for access to the Platform 
                  during the twelve months preceding the claim.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  11. Indemnification
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify and hold harmless EvidenceMed, its officers, directors, employees, 
                  and agents from any claims, damages, losses, or expenses arising from your use of the Platform, 
                  violation of these terms, or infringement of any third-party rights.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  12. Termination
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may terminate or suspend your access to the Platform immediately, without prior notice, 
                  for any reason, including breach of these Terms.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Upon termination, your right to use the Platform will cease immediately. 
                  Provisions that by their nature should survive termination shall remain in effect.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  13. Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with applicable laws, 
                  without regard to conflict of law principles. Any disputes arising from these terms 
                  shall be resolved in the appropriate courts of competent jurisdiction.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  14. Severability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is found to be unenforceable or invalid, 
                  that provision shall be limited or eliminated to the minimum extent necessary, 
                  and the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  15. Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For questions about these Terms of Service, please contact us via the{" "}
                  <Link to="/about" className="text-primary hover:underline">contact page</Link>.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We will respond to inquiries within a reasonable timeframe.
                </p>
              </section>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;
