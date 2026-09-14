import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/seo/PageHero";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Fancy text generator" },
  { href: "/copy-paste-fonts/", label: "Copy and paste fonts" },
  { href: "/cursive-text-generator/", label: "Cursive text" },
  { href: "/bold-text-generator/", label: "Bold text" },
  { href: "/kaomoji/", label: "Kaomoji" },
  { href: "/about/", label: "About" },
];

export default function NotFound() {
  return (
    <div className="site-shell">
      <PageHero
        h1="Page not found"
        lead="That URL is not a FancifyText tool. Try one of these instead."
      />
      <ul className="not-found-links">
        {LINKS.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
