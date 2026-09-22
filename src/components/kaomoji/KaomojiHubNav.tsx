"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { KAOMOJI_HUB_NAV_GROUPS } from "@/data/kaomoji-index-policy";
import { getKaomojiList } from "@/data/kaomoji";

type KaomojiHubNavProps = {
  activeSlug?: string;
};

/**
 * Grouped quick picker on /kaomoji/ — indexed vs browse-only, no extra SEO URLs.
 */
export function KaomojiHubNav({ activeSlug }: KaomojiHubNavProps) {
  const [openGroup, setOpenGroup] = useState<string>("moods");

  const groups = useMemo(() => {
    return KAOMOJI_HUB_NAV_GROUPS.map((group) => ({
      ...group,
      items: group.slugs
        .map((slug) => {
          const page = getKaomojiList(slug);
          if (!page) return null;
          return {
            slug,
            href: `/${slug}/`,
            label: page.h1,
          };
        })
        .filter(Boolean) as { slug: string; href: string; label: string }[],
    })).filter((g) => g.items.length > 0);
  }, []);

  return (
    <section className="seo-section kaomoji-hub-nav" aria-labelledby="hub-nav-heading">
      <h2 id="hub-nav-heading">Choose a kaomoji list</h2>
      <p className="seo-lead">
        Indexed tabs are the pages we target in Google—each owns one keyword family.
        Browse tabs are for navigation only (noindex) so angry/happy/sad do not
        fight multiline kaomojis or cute/cry/heart.
      </p>
      <div className="kaomoji-hub-nav__tabs" role="tablist" aria-label="Kaomoji list groups">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            id={`hub-tab-${group.id}`}
            aria-selected={openGroup === group.id}
            aria-controls={`hub-panel-${group.id}`}
            className={
              openGroup === group.id
                ? "kaomoji-hub-nav__tab is-active"
                : "kaomoji-hub-nav__tab"
            }
            onClick={() => setOpenGroup(group.id)}
          >
            {group.heading}
            {!group.indexable ? (
              <span className="kaomoji-hub-nav__badge">Browse</span>
            ) : null}
          </button>
        ))}
      </div>
      {groups.map((group) => (
        <div
          key={group.id}
          id={`hub-panel-${group.id}`}
          role="tabpanel"
          aria-labelledby={`hub-tab-${group.id}`}
          hidden={openGroup !== group.id}
          className="kaomoji-hub-nav__panel"
        >
          <p className="seo-lead">{group.description}</p>
          <ul className="kaomoji-hub-nav__links">
            {group.items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className={
                    activeSlug === item.slug
                      ? "kaomoji-hub-nav__link is-active"
                      : "kaomoji-hub-nav__link"
                  }
                  aria-current={activeSlug === item.slug ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
