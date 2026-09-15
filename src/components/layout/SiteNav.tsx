"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";

type NavItem = {
  url: string;
  navLabel: string;
};

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

function NavLinks({
  items,
  pathname,
  onNavigate,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  return items.map((item) => {
    const href = normalizePath(item.url);
    const active = pathname === href;
    return (
      <Link
        key={item.url}
        href={item.url}
        className={`nav-link${active ? " is-active" : ""}`}
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
      >
        {item.navLabel}
      </Link>
    );
  });
}

export function SiteNav({
  siteName,
  items,
}: {
  siteName: string;
  items: NavItem[];
}) {
  const pathname = normalizePath(usePathname() || "/");
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="site-shell header-inner">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden>
            F
          </span>
          <span className="brand-name">{siteName}</span>
        </Link>
        <nav className="site-nav site-nav--desktop" aria-label="Primary">
          <NavLinks
            items={items}
            pathname={pathname}
            onNavigate={() => setOpen(false)}
          />
        </nav>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bars" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      {open ? (
        <div id={menuId} className="site-nav-drawer is-open">
          <nav className="site-nav site-nav--mobile" aria-label="Mobile">
            <NavLinks
              items={items}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </nav>
        </div>
      ) : null}
    </>
  );
}
