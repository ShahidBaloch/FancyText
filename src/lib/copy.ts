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
  const [announcement, setAnnouncement] = useState("");

  async function copy(id: string, text: string, label?: string) {
    setErrorId(null);
    setErrorMessage(null);

    if (!text.trim()) {
      const message = "Nothing to copy — type some text first.";
      setErrorId(id);
      setErrorMessage(message);
      setAnnouncement(message);
      window.setTimeout(() => {
        setErrorId((cur) => (cur === id ? null : cur));
        setErrorMessage((cur) => (cur === message ? null : cur));
      }, resetMs + 600);
      return false;
    }

    const ok = await copyText(text);
    if (ok) {
      setCopiedId(id);
      // Button labels stay static so the accessible name does not churn; this
      // is the only success signal a screen reader gets.
      setAnnouncement(`Copied ${label ?? id} to clipboard`);
      void import("@/components/seo/GoogleAnalytics").then((m) =>
        m.trackEvent("copy_fancy_text", { style_id: id }),
      );
      window.setTimeout(
        () => setCopiedId((cur) => (cur === id ? null : cur)),
        resetMs,
      );
    } else {
      const message = "Copy failed — select the text and copy manually.";
      setErrorId(id);
      setErrorMessage(message);
      setAnnouncement(message);
      window.setTimeout(() => {
        setErrorId((cur) => (cur === id ? null : cur));
        setErrorMessage(null);
      }, resetMs + 800);
    }
    return ok;
  }

  return { copiedId, errorId, errorMessage, announcement, copy };
}
