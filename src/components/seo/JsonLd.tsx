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
    browserRequirements: "Requires JavaScript. Requires HTML5.",
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
