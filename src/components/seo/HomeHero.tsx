import { HomeHeroSpecimen } from "@/components/seo/HomeHeroSpecimen";

/**
 * Server-rendered hero. Only the rotating specimen is a client island, which
 * keeps the H1 and lead paragraph (the LCP element) out of the client bundle.
 */
export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-copy">
        <p className="home-brand">Free Unicode fonts</p>
        <h1 id="home-title" className="home-title">
          Fancy text generator
        </h1>
        <p className="home-lead">
          Type a word. Copy bold, cursive, bubble, or aesthetic Unicode. Paste
          it into a bio or chat—nothing to install.
        </p>
        <div className="home-cta">
          <a className="btn-primary" href="#tool">
            Start typing
          </a>
          <a className="btn-ghost" href="#gallery-heading">
            Browse styles
          </a>
        </div>
      </div>

      <HomeHeroSpecimen />
    </section>
  );
}
