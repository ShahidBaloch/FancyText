import Link from "next/link";
import type { PageEntry } from "@/data/pages/registry";
import { getIntentOwnerCallout } from "@/lib/seo/intent-clusters";

type IntentOwnerCalloutProps = {
  page: PageEntry;
};

/**
 * Secondary wayfinding for users who need the full style gallery — does not
 * replace the primary intent of this URL (cool vs stylish vs home).
 */
export function IntentOwnerCallout({ page }: IntentOwnerCalloutProps) {
  const callout = getIntentOwnerCallout(page);
  if (!callout) return null;

  const focus = page.primaryKeyword.replace(/\s+generator$/i, "").trim();
  const ownerLabel =
    callout.owner.primaryKeyword.charAt(0).toUpperCase() +
    callout.owner.primaryKeyword.slice(1);

  return (
    <aside
      className="li-callout intent-owner-callout"
      aria-label="Browse all Unicode styles"
    >
      <strong>This page filters to {focus || "one style family"}</strong>
      <span>
        Your styles below match that job. If you want every Unicode style in one
        gallery, open the{" "}
        <Link href={callout.owner.url}>{ownerLabel}</Link>.
      </span>
    </aside>
  );
}
