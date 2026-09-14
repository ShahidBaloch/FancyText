"use client";

import { useId, useState } from "react";

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
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="seo-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading">{heading}</h2>
      {accordion ? (
        <div className="faq-list faq-accordion">
          {items.map((item, i) => {
            const panelId = `${baseId}-panel-${i}`;
            const btnId = `${baseId}-btn-${i}`;
            const open = openIndex === i;
            return (
              <div key={item.question} className={`faq-item${open ? " is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    className="faq-trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                  >
                    {item.question}
                    <span className="faq-chevron" aria-hidden>
                      {open ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  hidden={!open}
                  className="faq-panel"
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
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
