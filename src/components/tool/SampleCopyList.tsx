"use client";

import { transform } from "@/lib/fonts/styles";
import { useCopyFeedback } from "@/lib/copy";

type SampleCopyListProps = {
  samples: string[];
  styleId: string;
};

export function SampleCopyList({ samples, styleId }: SampleCopyListProps) {
  const { copiedId, errorId, errorMessage, copy } = useCopyFeedback();

  return (
    <div>
      {errorMessage ? (
        <p className="copy-status" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <ul className="sample-list">
        {samples.map((sample) => {
          const fancy = transform(sample, styleId);
          return (
            <li key={sample}>
              <span className="sample-plain">{sample}</span>
              <span className="sample-fancy">{fancy}</span>
              <button
                type="button"
                className="copy-btn copy-btn--light"
                aria-label={`Copy sample: ${sample}`}
                onClick={() => copy(sample, fancy.trim())}
              >
                {copiedId === sample
                  ? "Copied!"
                  : errorId === sample
                    ? "Failed"
                    : "Copy"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
