"use client";

import { useCopyFeedback } from "@/lib/copy";

type CopyButtonProps = {
  text: string;
  id?: string;
  label?: string;
  className?: string;
  /** Accessible name describing what will be copied. */
  ariaLabel?: string;
};

export function CopyButton({
  text,
  id = "copy",
  label = "Copy",
  className = "copy-btn",
  ariaLabel,
}: CopyButtonProps) {
  const { copiedId, errorId, errorMessage, copy } = useCopyFeedback();
  const isCopied = copiedId === id;
  const hasError = errorId === id;
  const empty = !text.trim();

  return (
    <span className="copy-control">
      <button
        type="button"
        className={className}
        aria-label={ariaLabel ?? label}
        disabled={empty}
        onClick={() => copy(id, text)}
      >
        {isCopied ? "Copied!" : hasError ? "Failed" : label}
      </button>
      {hasError && errorMessage ? (
        <span className="copy-status" role="alert">
          {errorMessage}
        </span>
      ) : null}
    </span>
  );
}
