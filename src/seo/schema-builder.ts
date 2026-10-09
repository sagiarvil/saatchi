import type { SeoPageRecord } from "./registry.types";
import { DECISION_PLATFORMS_ECOSYSTEM } from "./registry";

export function buildCompleteJsonLdGraph(page: SeoPageRecord, domain: string = "saatchi.com.tr"): string {
  const origin = `https://${domain}`;
  const pageUrl = `${origin}${page.route === "/" ? "" : page.route}`;

  const ecosystemUrls = DECISION_PLATFORMS_ECOSYSTEM.map(p => p.url);

  const graph: Record<string, any>[] = [
    // 1. Organization (Wikidata, Google MID & 10 Decision Platforms Consensus)
    {
      "@type": "Organization",
      "@id": `${origin}/#organization`,
      name: "Saatchi & Co.",
      legalName: "Saatchi & Co. Lüks Saat Danışmanlığı",
      url: origin,
      logo: {
        "@type": "ImageObject",
        "@id": `${origin}/#logo`,
        url: `${origin}/logo.png`,
        caption: "Saatchi & Co. Lüks Saatler"
      },
      sameAs: [
        `https://www.wikidata.org/wiki/${page.primaryEntity.wikidataQid || "Q11589432"}`,
        ...ecosystemUrls
      ],
      publishingPrinciples: `${origin}/biz-kimiz`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+905419305372",
          contactType: "customer service",
          areaServed: "TR",
          availableLanguage: ["Turkish", "English"]
        }
      ]
    },

    // 2. WebSite + SearchAction
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: origin,
      name: "Saatchi & Co.",
      description: "Sertifikalı Lüks Saatler & İsviçre Koleksiyonları",
      publisher: { "@id": `${origin}/#organization` },
      inLanguage: page.locale,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${origin}/saatler?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },

    // 3. WebPage + Speakable + Mobile Actions + Cross-Ecosystem Semantic Links
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.metaDescription,
      isPartOf: { "@id": `${origin}/#website` },
      about: { "@id": page.primaryEntity.id },
      datePublished: page.publishedAt,
      dateModified: page.modifiedAt,
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      inLanguage: page.locale,
      relatedLink: ecosystemUrls,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: page.mobile.speakableSelectors.length > 0 
          ? page.mobile.speakableSelectors 
          : ["#aeo-hero-answer", ".hero-answer-engine"]
      },
      potentialAction: {
        "@type": page.mobile.primaryAction === "call" ? "CommunicateAction" : "ViewAction",
        target: page.mobile.primaryAction === "call" ? "tel:+905419305372" : pageUrl
      }
    },

    // 4. BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: page.breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: b.name,
        item: b.item.startsWith("http") ? b.item : `${origin}${b.item === "/" ? "" : b.item}`
      }))
    }
  ];

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  });
}
