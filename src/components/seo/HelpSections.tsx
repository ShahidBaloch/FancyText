type HelpSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type HelpSectionsProps = {
  sections: HelpSection[];
};

/** Extra how-to / explainer blocks shared by tool pages. */
export function HelpSections({ sections }: HelpSectionsProps) {
  if (!sections.length) return null;

  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          className="seo-section seo-prose"
          aria-labelledby={section.id}
        >
          <h2 id={section.id}>{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </>
  );
}

export type { HelpSection };
