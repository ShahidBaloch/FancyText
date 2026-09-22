import { SerpSpecimenBlock } from "@/components/seo/SerpSpecimenBlock";

type PageHeroProps = {
  h1: string;
  lead: string;
  /** When set, shows intent-matched Unicode/emoji samples above the H1. */
  specimenPath?: string;
};

export function PageHero({ h1, lead, specimenPath }: PageHeroProps) {
  return (
    <div className="page-hero">
      {specimenPath ? (
        <SerpSpecimenBlock path={specimenPath} variant="inline" />
      ) : null}
      <h1>{h1}</h1>
      <p>{lead}</p>
    </div>
  );
}
