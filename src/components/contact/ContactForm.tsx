"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { contactConfig } from "@/data/contact";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: { ok?: boolean; error?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Failed to send message.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please email us directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <p className="contact-success-title">Message sent</p>
        <p>Thanks — we&apos;ll get back to you within one business day.</p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="contact-form" aria-labelledby="contact-query">
      <label className="contact-label">
        Name
        <input
          required
          type="text"
          name="name"
          autoComplete="name"
          maxLength={120}
          className="text-input"
          placeholder="Your name"
        />
      </label>

      <label className="contact-label">
        Email
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          maxLength={200}
          className="text-input"
          placeholder="you@email.com"
        />
      </label>

      <label className="contact-label">
        Query
        <textarea
          required
          name="message"
          rows={7}
          maxLength={5000}
          className="text-input"
          placeholder="A bug, a question about a tool, or a privacy note…"
        />
      </label>

      <div className="contact-honeypot" aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="contact-privacy-note">
        We use your details only to reply to this query. See our{" "}
        <Link href="/privacy/">Privacy Policy</Link>.
      </p>

      <button
        type="submit"
        className="btn-primary"
        disabled={status === "submitting"}
      >
        {status === "submitting"
          ? "Sending — typically one business day…"
          : contactConfig.inquiryCta}
      </button>

      {status === "error" ? (
        <p className="contact-error" role="alert">
          {error} Or email{" "}
          <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>{" "}
          directly.
        </p>
      ) : null}
    </form>
  );
}
