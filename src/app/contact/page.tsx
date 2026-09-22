import type { Metadata } from "next";
import { Breadcrumbs, HOME_CRUMB, homeCrumbLd } from "@/components/seo/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd, organizationJsonLd, webPageJsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { RelatedTools } from "@/components/seo/RelatedTools";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactConfig } from "@/data/contact";
import { pageMetadata } from "@/lib/seo/metadata";
import {
  SITE_NAME,
  SITE_URL,
  getPageByUrl,
  getTopicalRelated,
} from "@/data/pages/registry";

const page = getPageByUrl("/contact/")!;
const related = getTopicalRelated("/contact/", 6);
const absoluteUrl = new URL("/contact/", SITE_URL).toString();

export const metadata: Metadata = pageMetadata(page);

export default function ContactPage() {
  return (
    <div className="site-shell">
      <JsonLd
        data={{
          ...organizationJsonLd({
            name: SITE_NAME,
            url: SITE_URL,
            description: page.description,
            email: contactConfig.email,
          }),
        }}
      />
      <JsonLd
        data={webPageJsonLd({
          name: "Contact FancifyText",
          description: page.description,
          url: absoluteUrl,
          siteName: SITE_NAME,
          siteUrl: SITE_URL,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          homeCrumbLd(SITE_URL),
          { name: "Contact", url: absoluteUrl },
        ])}
      />
      <Breadcrumbs
        items={[
          HOME_CRUMB,
          { name: "Contact" },
        ]}
      />
      <PageHero
        h1="Contact FancifyText"
        lead="A bug, a tool question, or a privacy note. We typically reply within one business day."
      />

      <div className="contact-layout">
        <div className="contact-card contact-card--aside">
          <p className="contact-eyebrow">Direct email</p>
          <ul className="contact-channels">
            <li>
              <p className="contact-channel-label">Inbox</p>
              <a href={`mailto:${contactConfig.email}`} className="contact-channel-value">
                {contactConfig.email}
              </a>
            </li>
            <li>
              <p className="contact-channel-label">Reply time</p>
              <span className="contact-channel-value">Typically one business day</span>
            </li>
          </ul>
        </div>

        <div className="contact-card">
          <h2 id="contact-query">Send a query</h2>
          <p className="contact-card-lead">
            Prefer email? Write to{" "}
            <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>
            . We typically reply within one business day.
          </p>
          <ContactForm />
        </div>
      </div>

      <RelatedTools pages={related} />
    </div>
  );
}
