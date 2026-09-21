type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function faqPageJsonLd(
  pageUrl: string,
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url: pageUrl,
  };
}

export function webApplicationJsonLd(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires a modern web browser.",
    isAccessibleForFree: true,
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function articleJsonLd(opts: {
  headline: string;
  description: string;
  url: string;
  siteName: string;
  siteUrl: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const logoUrl = new URL("/icon", opts.siteUrl).toString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url,
    },
    author: {
      "@type": "Organization",
      name: opts.siteName,
      url: opts.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: opts.siteName,
      url: opts.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    inLanguage: "en",
    isAccessibleForFree: true,
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

export function webPageJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  siteName: string;
  siteUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: {
      "@type": "WebSite",
      name: opts.siteName,
      url: opts.siteUrl,
    },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function organizationJsonLd(opts: {
  name: string;
  url: string;
  description: string;
  email?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: opts.name,
    url: opts.url,
    description: opts.description,
    logo: {
      "@type": "ImageObject",
      url: new URL("/icon", opts.url).toString(),
    },
    ...(opts.sameAs?.length ? { sameAs: opts.sameAs } : {}),
    ...(opts.email
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: opts.email,
            availableLanguage: "English",
          },
        }
      : {}),
  };
}

export function webSiteJsonLd(opts: {
  name: string;
  url: string;
  description: string;
  searchUrlTemplate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: opts.name,
    url: opts.url,
    description: opts.description,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: opts.name,
      url: opts.url,
    },
    ...(opts.searchUrlTemplate
      ? {
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: opts.searchUrlTemplate,
            },
            "query-input": "required name=search_term_string",
          },
        }
      : {}),
  };
}

/** Sample list for rich results (face strings as list item names). */
export function itemListJsonLd(opts: {
  name: string;
  url: string;
  items: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: opts.url,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((face, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: face,
    })),
  };
}

export function howToJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  steps: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    step: opts.steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Step ${index + 1}`,
      text,
    })),
  };
}
