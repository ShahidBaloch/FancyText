import { HomeHeroSpecimen } from "@/components/seo/HomeHeroSpecimen";

const BRAND = "FancifyText";

export function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-copy">
        <p className="home-brand">{BRAND}</p>
        <h1 id="home-title" className="home-title">
          Fancy text generator
        </h1>
        <p className="home-lead">
          Type once, then copy bold, cursive, bubble, and aesthetic fonts for
          bios, chats, and usernames.
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
