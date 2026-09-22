import Link from "next/link";
import {
  getExplorePages,
  getFooterPages,
  SITE_NAME,
} from "@/data/pages/registry";

const GUIDES = [
  { href: "/guides/instagram-bio-fonts/", label: "Instagram bio fonts" },
  { href: "/guides/how-unicode-fancy-fonts-work/", label: "How fancy fonts work" },
  { href: "/guides/discord-colored-text-not-working/", label: "Discord color fixes" },
  { href: "/guides/whatsapp-stylish-text/", label: "WhatsApp stylish text" },
  { href: "/guides/facebook-name-fonts/", label: "Facebook name fonts" },
  { href: "/guides/fancy-text-shows-boxes/", label: "Why fancy text shows boxes" },
  { href: "/guides/roblox-fancy-text/", label: "Roblox fancy text" },
  { href: "/guides/snapchat-name-fonts/", label: "Snapchat name fonts" },
];

const LEGAL = [
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
  { href: "/llms.txt", label: "LLMs.txt" },
];

const BRAND_WORDS: Record<string, string> = {
  html: "HTML",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
  discord: "Discord",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
};

function navLinkLabel(value: string): string {
  const small = new Set(["and", "or", "for", "of", "the", "a", "an"]);
  return value
    .split(/(\s+)/)
    .map((part, index) => {
      const lower = part.toLowerCase();
      if (BRAND_WORDS[lower]) return BRAND_WORDS[lower];
      if (!part.trim()) return part;
      if (index > 0 && small.has(lower)) return lower;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}

export function SiteFooter() {
  const tools = getFooterPages();
  const explore = getExplorePages();

  return (
    <footer className="site-footer">
      <div className="site-shell footer-shell">
        <div className="footer-brand-block">
          <Link href="/" className="footer-brand">
            {SITE_NAME}
          </Link>
          <p className="footer-tagline">
            Free Unicode fancy text to copy and paste.
          </p>
        </div>

        <nav className="footer-col" aria-label="Tools">
          <p className="footer-col-title">Tools</p>
          {tools.map((item) => (
            <Link key={item.url} href={item.url}>
              {item.navLabel ?? navLinkLabel(item.primaryKeyword)}
            </Link>
          ))}
        </nav>

        <nav className="footer-col" aria-label="Explore">
          <p className="footer-col-title">Explore</p>
          {explore.map((item) => (
            <Link key={item.url} href={item.url}>
              {navLinkLabel(item.primaryKeyword)}
            </Link>
          ))}
        </nav>

        <nav className="footer-col" aria-label="Guides">
          <p className="footer-col-title">Guides</p>
          {GUIDES.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className="footer-col" aria-label="Legal">
          <p className="footer-col-title">Legal</p>
          {LEGAL.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="footer-copy">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
