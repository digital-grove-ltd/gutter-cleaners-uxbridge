import type {
  LocalBusiness,
  FAQPage,
  Service,
  BreadcrumbList,
  BlogPosting,
  HowTo,
  WithContext,
} from "schema-dts";

const BASE_URL = "https://www.guttercleanersuxbridge.co.uk";
const BUSINESS_ID = `${BASE_URL}/#business`;
const BUSINESS_NAME = "Gutter Cleaners Uxbridge";
const BUSINESS_DESCRIPTION =
  "Professional gutter cleaning, repair, replacement and fascia & soffit services across Uxbridge, Harrow, Hayes, Hillingdon, Slough, Southall, West Drayton and Windsor.";

// ---------------------------------------------------------------------------
// 1. Sitewide LocalBusiness schema
// ---------------------------------------------------------------------------
export function sitewideLocalBusiness(): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"] as any,
    "@id": BUSINESS_ID,
    name: BUSINESS_NAME,
    description: BUSINESS_DESCRIPTION,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    image: `${BASE_URL}/images/homepage-hero.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Uxbridge",
      addressRegion: "Greater London",
      postalCode: "UB8",
      addressCountry: "GB",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ] as any,
    areaServed: [
      { "@type": "City", name: "Uxbridge", containedIn: { "@type": "AdministrativeArea", name: "Greater London" } },
      { "@type": "City", name: "Harrow", containedIn: { "@type": "AdministrativeArea", name: "Greater London" } },
      { "@type": "City", name: "Hayes", containedIn: { "@type": "AdministrativeArea", name: "Greater London" } },
      { "@type": "City", name: "Hillingdon", containedIn: { "@type": "AdministrativeArea", name: "Greater London" } },
      { "@type": "City", name: "Slough", containedIn: { "@type": "AdministrativeArea", name: "Berkshire" } },
      { "@type": "City", name: "Southall", containedIn: { "@type": "AdministrativeArea", name: "Greater London" } },
      { "@type": "City", name: "West Drayton", containedIn: { "@type": "AdministrativeArea", name: "Greater London" } },
      { "@type": "City", name: "Windsor", containedIn: { "@type": "AdministrativeArea", name: "Berkshire" } },
    ] as any,
    priceRange: "££",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Gutter Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gutter Cleaning",
            url: `${BASE_URL}/gutter-cleaning/`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gutter Repairs",
            url: `${BASE_URL}/gutter-repairs/`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gutter Replacement",
            url: `${BASE_URL}/gutter-replacement/`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fascia & Soffit Cleaning/Repair",
            url: `${BASE_URL}/fascia-soffit-cleaning/`,
          },
        },
      ],
    } as any,
    sameAs: [],
  };
}

// ---------------------------------------------------------------------------
// 2. Location + service schema
// ---------------------------------------------------------------------------
export function locationServiceSchema(
  town: string,
  postcode: string,
  serviceName: string,
  serviceSlug: string
): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${serviceName} in ${town}`,
    description: `Professional ${serviceName.toLowerCase()} in ${town} ${postcode}`,
    url: `${BASE_URL}${serviceSlug}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": BUSINESS_ID,
    } as any,
    areaServed: {
      "@type": "City",
      name: town,
      containedIn: { "@type": "AdministrativeArea", name: "Greater London" },
    } as any,
    serviceType: serviceName,
  } as any;
}

// ---------------------------------------------------------------------------
// 3. FAQ schema
// ---------------------------------------------------------------------------
export function faqSchema(faqs: { q: string; a: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// ---------------------------------------------------------------------------
// 4. Breadcrumb schema
// ---------------------------------------------------------------------------
export function breadcrumbSchema(
  items: { name: string; url: string }[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, url }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: url,
    })),
  };
}

// ---------------------------------------------------------------------------
// 5. HowTo schema
// ---------------------------------------------------------------------------
export function howToSchema(
  name: string,
  steps: { name: string; text: string }[]
): WithContext<HowTo> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map(({ name: stepName, text }, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: stepName,
      text,
    })) as any,
  };
}

// ---------------------------------------------------------------------------
// 6. Localised LocalBusiness for town pages
// ---------------------------------------------------------------------------
export function locationBusinessSchema(
  town: string,
  postcode: string
): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"] as any,
    "@id": `${BUSINESS_ID}-${town.toLowerCase().replace(/\s+/g, "-")}`,
    name: `${BUSINESS_NAME} — ${town}`,
    description: `Professional gutter cleaning, repair and replacement in ${town} ${postcode} and surrounding areas.`,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Uxbridge",
      addressRegion: "Greater London",
      postalCode: "UB8",
      addressCountry: "GB",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ] as any,
    areaServed: [
      {
        "@type": "City",
        name: town,
        containedIn: { "@type": "AdministrativeArea", name: "Greater London" },
      },
    ] as any,
    priceRange: "££",
    sameAs: [],
  };
}

// ---------------------------------------------------------------------------
// 7. BlogPosting schema
// ---------------------------------------------------------------------------
export function blogPostSchema(
  title: string,
  description: string,
  url: string,
  datePublished: string,
  imageUrl?: string
): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    } as any,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    } as any,
    ...(imageUrl ? { image: imageUrl } : {}),
  };
}

// ---------------------------------------------------------------------------
// Legacy exports — kept for backward compatibility with existing pages
// ---------------------------------------------------------------------------

/** @deprecated Use sitewideLocalBusiness() instead */
export const siteSchema = {
  localBusiness: sitewideLocalBusiness(),
};

/** @deprecated Use locationServiceSchema() instead */
export function serviceSchema(
  name: string,
  description: string,
  url: string
): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@id": BUSINESS_ID } as any,
    areaServed: { "@type": "AdministrativeArea", name: "West London" } as any,
  };
}

/** @deprecated Use blogPostSchema() instead */
export function blogPostingSchema(
  title: string,
  description: string,
  publishedDate: string,
  modifiedDate: string,
  author: string,
  url: string,
  imageUrl?: string
): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Organization",
      name: author,
    },
    url,
    ...(imageUrl && { image: imageUrl }),
  };
}

/** @deprecated Use locationBusinessSchema() instead */
export function localBusinessWithAreaSchema(
  area: string
): WithContext<LocalBusiness> {
  return locationBusinessSchema(area, "");
}
