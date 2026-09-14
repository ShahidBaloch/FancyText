import Link from "next/link";
import { getLivePages } from "@/data/pages/registry";

function capitalizeKeyword(kw: string): string {
  return kw.charAt(0).toUpperCase() + kw.slice(1);
}

export function resolveFellowHref(
  kw: string,
  currentUrl: string,
): string | undefined {
  const lower = kw.toLowerCase();
  const match = getLivePages().find(
    (p) =>
      p.primaryKeyword.toLowerCase() === lower ||
      p.fellowKeywords.some((f) => f.toLowerCase() === lower),
  );
  if (!match || match.url === currentUrl) return undefined;
  return match.url;
}

type FellowKeywordsProps = {
  keywords: string[];
  currentUrl: string;
  heading?: string;
};

/** Only renders when at least one fellow keyword maps to another live page. */
export function FellowKeywords({
  keywords,
  currentUrl,
  heading = "Related searches",
}: FellowKeywordsProps) {
  const links = keywords
    .map((kw) => ({ kw, href: resolveFellowHref(kw, currentUrl) }))
    .filter((f): f is { kw: string; href: string } => Boolean(f.href));

  if (!links.length) return null;

  return (
    <section className="seo-section seo-prose" aria-labelledby="related-kw-heading">
      <h2 id="related-kw-heading">{heading}</h2>
      <ul className="taxonomy-links">
        {links.map(({ kw, href }) => (
          <li key={kw}>
            <Link href={href}>{capitalizeKeyword(kw)}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
