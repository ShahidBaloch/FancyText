export const SITE_SAME_AS: string[] = [
  // Add public profiles when they exist, e.g. GitHub / X / Discord support.
  // Kept empty-safe: Organization schema omits sameAs when length is 0.
];

export const CONTACT_EMAIL = "hello@fancifytext.com";

export const contactConfig = {
  email: CONTACT_EMAIL,
  inquiryCta: "Send message",
} as const;
