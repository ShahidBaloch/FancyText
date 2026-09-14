import Link from "next/link";
import type { PageEntry } from "@/data/pages/registry";

type RelatedToolsProps = {
  pages: PageEntry[];
  heading?: string;
};

export function RelatedTools({
  pages,
  heading = "Related tools",
}: RelatedToolsProps) {
  if (!pages.length) return null;

  return (
    <section className="seo-section" aria-labelledby="related-heading">
      <h2 id="related-heading">{heading}</h2>
      <ul className="related-grid">
        {pages.map((p) => (
          <li key={p.url}>
            <Link href={p.url}>
              <span className="related-title">{p.primaryKeyword}</span>
              <span className="related-desc">{p.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
