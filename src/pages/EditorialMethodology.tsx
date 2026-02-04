import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const EditorialMethodology = () => {
  return (
    <>
      <Helmet>
        <title>Editorial Methodology | EvidenceMed</title>
        <meta 
          name="description" 
          content="Learn about EvidenceMed's editorial methodology, content inclusion criteria, evidence classification, and commitment to research integrity." 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-grow pt-20 lg:pt-24">
          <div className="container mx-auto px-4 py-12 lg:py-16">
            <div className="max-w-3xl mx-auto prose prose-muted dark:prose-invert">
              
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Editorial Methodology
              </h1>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Purpose and Scope
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  EvidenceMed is an educational research platform designed to aggregate, organize, and summarize 
                  peer-reviewed scientific literature relating to complementary, alternative, and integrative therapies.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The platform does not provide medical advice, diagnosis, treatment recommendations, or 
                  dosing guidance. All content is presented for research and informational purposes only.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This page outlines how content is selected, reviewed, categorized, and maintained.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Content Inclusion Criteria
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  EvidenceMed includes research that meets all of the following criteria:
                </p>
                
                <h3 className="font-semibold text-foreground mt-6 mb-3">Source Quality</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Published in peer-reviewed journals, or</li>
                  <li>Hosted in recognized academic repositories (e.g. PubMed, institutional databases)</li>
                  <li>Preprints are clearly labeled as such and separated from peer-reviewed literature</li>
                </ul>

                <h3 className="font-semibold text-foreground mt-6 mb-3">Relevance</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Relates to complementary, alternative, or integrative therapies</li>
                  <li>Includes natural compounds, lifestyle interventions, investigational or repurposed agents, and adjunctive approaches</li>
                  <li>Addresses mechanisms, associations, or observed effects relevant to health conditions</li>
                </ul>

                <h3 className="font-semibold text-foreground mt-6 mb-3">Transparency</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Study metadata is available (authors, institution, journal, year)</li>
                  <li>Original source links (DOI, PubMed ID, or publisher link) are provided</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Study Types and Evidence Classification
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Research on EvidenceMed is categorized by study type, not by outcome or claim. 
                  Typical categories include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>In vitro – Cellular or molecular studies</li>
                  <li>Animal studies – Preclinical research in animal models</li>
                  <li>Observational human studies – Cohort, cross-sectional, case-control</li>
                  <li>Randomized controlled trials – Experimental human studies</li>
                  <li>Systematic reviews and meta-analyses – Aggregated evidence synthesis</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  EvidenceMed does not rank therapies by effectiveness or endorse conclusions. 
                  Study type is provided to help readers contextualize the strength and limitations of available evidence.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Editorial Review Process
                </h2>
                <ol className="list-decimal pl-6 text-muted-foreground space-y-3 mb-4">
                  <li><strong>Initial Identification:</strong> Studies are identified via academic databases, journal feeds, and alerts.</li>
                  <li><strong>Screening:</strong> Research is screened for relevance, source quality, and completeness.</li>
                  <li><strong>Categorization:</strong> Studies are tagged by condition, compound, modality, and study type.</li>
                  <li><strong>Summary:</strong> Plain-language summaries are written to reflect study scope and findings without prescriptive interpretation.</li>
                  <li><strong>Verification:</strong> Source links and metadata are checked prior to publication.</li>
                </ol>
                <p className="text-muted-foreground leading-relaxed italic">
                  EvidenceMed does not alter study conclusions or reinterpret data beyond summarization.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Safety and Limitations
                </h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Safety notes are included only when discussed within the original research.</li>
                  <li>EvidenceMed does not extrapolate safety, efficacy, or suitability for individuals.</li>
                  <li>Absence of evidence is not presented as evidence of absence.</li>
                  <li>Conflicting findings are acknowledged where present.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Dosage and Protocols
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Where studies report dosages, durations, or protocols, this information is treated as 
                  contextual research data only.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">EvidenceMed:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Does not recommend dosages</li>
                  <li>Does not provide protocols</li>
                  <li>Does not suggest replication of study conditions</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Such information is included solely to accurately represent the published research.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Conflicts of Interest and Commercial Separation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  EvidenceMed may reference books, resources, or products via affiliate links on clearly 
                  designated Shop / Resources pages.
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Commercial content is visually and structurally separated from research content.</li>
                  <li>Affiliate relationships are disclosed.</li>
                  <li>Editorial inclusion of research is not influenced by commercial relationships.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Content Updates and Maintenance
                </h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Content is reviewed and updated on a rolling basis.</li>
                  <li>New research is added regularly as it becomes available.</li>
                  <li>Corrections are made if source errors or misclassifications are identified.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Intended Audience
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  EvidenceMed is designed for:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Researchers and students</li>
                  <li>Practitioners seeking research context</li>
                  <li>Educated members of the public interested in primary literature</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  The platform is not intended for self-diagnosis or treatment decisions.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Editorial Independence Statement
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  EvidenceMed operates as an independent educational platform.
                </p>
                <p className="text-muted-foreground leading-relaxed italic">
                  Inclusion of research does not imply endorsement, recommendation, or clinical applicability.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-4">
                  Contact and Feedback
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Feedback regarding sourcing, categorization, or accuracy may be submitted via the{" "}
                  <Link to="/about" className="text-primary hover:underline">contact page</Link>.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  EvidenceMed welcomes corrections supported by verifiable sources.
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

export default EditorialMethodology;
