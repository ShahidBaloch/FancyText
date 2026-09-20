export const SITE_SAME_AS: string[] = [
  // Add public brand profiles only when they exist.
  // Kept empty-safe: Organization schema omits sameAs when length is 0.
];

export const CONTACT_EMAIL = "hello@fancifytext.com";

export const contactConfig = {
  email: CONTACT_EMAIL,
  inquiryCta: "Send message",
} as const;
