import { getNavPages, SITE_NAME } from "@/data/pages/registry";
import { SiteNav } from "@/components/layout/SiteNav";

export function SiteHeader() {
  const nav = getNavPages().flatMap((item) =>
    item.navLabel ? [{ url: item.url, navLabel: item.navLabel }] : [],
  );

  return (
    <header className="site-header">
      {/*
        Desktop omits Home (logo = home; Home was the first item clipped by
        overflow-x). Mobile drawer keeps Home first for clear way-finding.
      */}
      <SiteNav
        siteName={SITE_NAME}
        items={nav}
        mobileExtraItems={[{ url: "/", navLabel: "Home" }]}
      />
    </header>
  );
}
