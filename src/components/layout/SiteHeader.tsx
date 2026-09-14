"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { getNavPages, SITE_NAME } from "@/data/pages/registry";

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function SiteHeader() {
  const nav = getNavPages();
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

  const links = nav.map((item) => {
    const href = normalizePath(item.url);
    const active = pathname === href;
    return (
      <Link
        key={item.url}
        href={item.url}
        className={`nav-link${active ? " is-active" : ""}`}
        aria-current={active ? "page" : undefined}
        onClick={() => setOpen(false)}
      >
        {item.navLabel}
      </Link>
    );
  });

  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden>
            ℱ
          </span>
          <span className="brand-name">{SITE_NAME}</span>
        </Link>

        <nav className="site-nav site-nav--desktop" aria-label="Primary">
          {links}
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

      <div
        id={menuId}
        className={`site-nav-drawer${open ? " is-open" : ""}`}
        hidden={!open}
      >
        <nav className="site-nav site-nav--mobile" aria-label="Mobile">
          {links}
        </nav>
      </div>
    </header>
  );
}
