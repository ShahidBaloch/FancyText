"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
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
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Adjust during render rather than in an effect: navigating (including via
  // browser back/forward) must close the drawer without a second paint.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const drawer = drawerRef.current;
    const focusables = drawer?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])",
    );
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !focusables?.length) return;
      const list = Array.from(focusables);
      const first = list[0]!;
      const last = list[list.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (drawerRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
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
          ref={toggleRef}
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
        <div ref={drawerRef} id={menuId} className="site-nav-drawer is-open">
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
