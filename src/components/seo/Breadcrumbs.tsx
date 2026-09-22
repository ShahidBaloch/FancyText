import Link from "next/link";

export type Crumb = {
  name: string;
  href?: string;
};

/**
 * First crumb for visible trail + BreadcrumbList.
 * Use "Home" (not the brand) — Google already shows sitename/favicon; brand as
 * position-1 burns SERP pixels and duplicates the title/sitename row.
 * Leaf crumbs should stay intent-matched (e.g. "Kaomoji", "Cute Kaomojis").
 */
export const HOME_CRUMB: Crumb = { name: "Home", href: "/" };

export function homeCrumbLd(siteUrl: string): { name: string; url: string } {
  return { name: "Home", url: new URL("/", siteUrl).toString() };
}

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length < 2) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="breadcrumbs-item">
              {index > 0 ? (
                <span className="breadcrumbs-sep" aria-hidden>
                  /
                </span>
              ) : null}
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined}>{item.name}</span>
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
