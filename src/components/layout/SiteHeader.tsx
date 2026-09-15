import { getNavPages, SITE_NAME } from "@/data/pages/registry";
import { SiteNav } from "@/components/layout/SiteNav";

export function SiteHeader() {
  const nav = getNavPages().flatMap((item) =>
    item.navLabel ? [{ url: item.url, navLabel: item.navLabel }] : [],
  );

  return (
    <header className="site-header">
      <SiteNav siteName={SITE_NAME} items={nav} />
    </header>
  );
}
