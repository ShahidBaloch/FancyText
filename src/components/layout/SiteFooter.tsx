import Link from "next/link";
import { getFooterPages, SITE_NAME } from "@/data/pages/registry";

export function SiteFooter() {
  const links = getFooterPages();

  return (
    <footer className="site-footer">
      <div className="site-shell footer-inner">
        <div>
          <p className="footer-brand">{SITE_NAME}</p>
          <p className="footer-tag">
            Free Unicode fancy fonts to copy and paste for social bios, chats,
            and usernames.
          </p>
        </div>
        <div>
          <p className="footer-heading">Popular tools</p>
          <ul className="footer-links">
            {links.map((p) => (
              <li key={p.url}>
                <Link href={p.url}>{p.primaryKeyword}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="site-shell footer-base">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. All generators run in your
          browser.
        </p>
      </div>
    </footer>
  );
}
