import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";
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
          }),
          email: contactConfig.email,
        }}
      />
      <Breadcrumbs
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Contact" },
        ]}
      />
      <PageHero
        h1="Contact FancifyText"
        lead="A bug, a tool question, or a privacy note. We typically reply within one business day."
      />

      <div className="contact-layout">
        <div>
          <p className="contact-eyebrow">Email</p>
          <ul className="contact-channels">
            <li>
              <a href={`mailto:${contactConfig.email}`} className="contact-channel-value">
                {contactConfig.email}
              </a>
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
