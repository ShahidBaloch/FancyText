"use client";

import { useState } from "react";

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function useCopyFeedback(resetMs = 1400) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function copy(id: string, text: string) {
    setErrorId(null);
    setErrorMessage(null);

    if (!text.trim()) {
      setErrorId(id);
      setErrorMessage("Nothing to copy — type some text first.");
      window.setTimeout(() => {
        setErrorId((cur) => (cur === id ? null : cur));
        setErrorMessage((cur) =>
          cur === "Nothing to copy — type some text first." ? null : cur,
        );
      }, resetMs + 600);
      return false;
    }

    const ok = await copyText(text);
    if (ok) {
      setCopiedId(id);
      void import("@/components/seo/GoogleAnalytics").then((m) =>
        m.trackEvent("copy_fancy_text", { style_id: id }),
      );
      window.setTimeout(
        () => setCopiedId((cur) => (cur === id ? null : cur)),
        resetMs,
      );
    } else {
      setErrorId(id);
      setErrorMessage("Copy failed — select the text and copy manually.");
      window.setTimeout(() => {
        setErrorId((cur) => (cur === id ? null : cur));
        setErrorMessage(null);
      }, resetMs + 800);
    }
    return ok;
  }

  return { copiedId, errorId, errorMessage, copy };
}
