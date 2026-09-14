"use client";

import { useCopyFeedback } from "@/lib/copy";

type CopyButtonProps = {
  text: string;
  id?: string;
  label?: string;
  className?: string;
};

export function CopyButton({
  text,
  id = "copy",
  label = "Copy",
  className = "copy-btn",
}: CopyButtonProps) {
  const { copiedId, copy } = useCopyFeedback();
  const isCopied = copiedId === id;

  return (
    <button
      type="button"
      className={className}
      onClick={() => copy(id, text)}
    >
      {isCopied ? "Copied!" : label}
    </button>
  );
}
