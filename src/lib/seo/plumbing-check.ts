import { getTopicalRelatedUrlKeys } from "@/data/pages/registry";
import { assertSeoPlumbingInvariants } from "@/lib/seo/required-indexable";

export function runSeoPlumbingCheck(): void {
  assertSeoPlumbingInvariants(new Set(getTopicalRelatedUrlKeys()));
}
