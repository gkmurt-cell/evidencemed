import type { Compound } from "@/data/compoundData";

interface CompoundJsonLdProps {
  compound: Compound;
}

const CompoundJsonLd = ({ compound }: CompoundJsonLdProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalScholarlyArticle",
    headline: `${compound.name} (${compound.latinName}) — Research Profile`,
    about: {
      "@type": "Drug",
      name: compound.name,
      alternateName: compound.latinName,
      drugClass: compound.category,
    },
    description: compound.description,
    author: {
      "@type": "Organization",
      name: "EvidenceMed Editorial Team",
      url: "https://evidencemed.lovable.app/about",
    },
    publisher: {
      "@type": "Organization",
      name: "EvidenceMed",
      url: "https://evidencemed.lovable.app",
    },
    datePublished: "2025-01-15",
    dateModified: "2026-02-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://evidencemed.lovable.app/compound/${compound.id}`,
    },
    citation: compound.references?.map((ref) => ({
      "@type": "ScholarlyArticle",
      name: ref.title,
      author: ref.authors,
      datePublished: String(ref.year),
      isPartOf: {
        "@type": "Periodical",
        name: ref.journal,
      },
      sameAs: ref.doi
        ? `https://doi.org/${ref.doi}`
        : `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`,
    })) || [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default CompoundJsonLd;

// For condition pages
export const ConditionJsonLd = ({ condition }: { condition: { title: string; description: string; id: string } }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: condition.title,
    description: condition.description,
    url: `https://evidencemed.lovable.app/condition/${condition.id}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://evidencemed.lovable.app/condition/${condition.id}`,
    },
    recognizingAuthority: {
      "@type": "Organization",
      name: "EvidenceMed",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
