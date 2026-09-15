type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  heading?: string;
  items: FaqItem[];
  /** Collapsible details — better on long tool pages. */
  accordion?: boolean;
};

export function FaqSection({
  heading = "Frequently asked questions",
  items,
  accordion = false,
}: FaqSectionProps) {
  return (
    <section className="seo-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading">{heading}</h2>
      {accordion ? (
        <div className="faq-list faq-accordion">
          {items.map((item, i) => (
            <details key={item.question} className="faq-item" open={i === 0}>
              <summary className="faq-trigger">
                {item.question}
                <span className="faq-chevron" aria-hidden />
              </summary>
              <div className="faq-panel">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="faq-list">
          {items.map((item) => (
            <div key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
