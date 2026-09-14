type PageHeroProps = {
  h1: string;
  lead: string;
};

export function PageHero({ h1, lead }: PageHeroProps) {
  return (
    <div className="page-hero">
      <h1>{h1}</h1>
      <p>{lead}</p>
    </div>
  );
}
