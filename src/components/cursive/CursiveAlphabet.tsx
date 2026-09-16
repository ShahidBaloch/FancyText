import { LetterGrid } from "@/components/seo/LetterGrid";
import { CopyButton } from "@/components/tool/CopyButton";
import { cursiveAlphabet } from "@/lib/fonts/cursive";

export function CursiveAlphabet() {
  const capitals = cursiveAlphabet("capital");
  const smalls = cursiveAlphabet("small");

  return (
    <>
      <section className="seo-section" aria-labelledby="alphabet-heading">
        <h2 id="alphabet-heading">Cursive alphabet (A–Z)</h2>
        <p className="seo-lead">
          This is the full Mathematical Script alphabet. Copy a whole row for
          worksheets, or type a name in the generator above to convert every
          letter at once.
        </p>
        <div className="alphabet-specimen">
          <div className="alphabet-row">
            <span className="field-label">Capital cursive</span>
            <p className="alphabet-glyphs" lang="en">
              {capitals}
            </p>
            <CopyButton
              text={capitals}
              id="alphabet-capital"
              label="Copy A–Z"
              ariaLabel="Copy capital cursive alphabet A to Z"
            />
          </div>
          <div className="alphabet-row">
            <span className="field-label">Small cursive</span>
            <p className="alphabet-glyphs" lang="en">
              {smalls}
            </p>
            <CopyButton
              text={smalls}
              id="alphabet-small"
              label="Copy a–z"
              ariaLabel="Copy small cursive alphabet a to z"
            />
          </div>
        </div>
      </section>
      <LetterGrid
        heading="Individual cursive letters"
        lead="Each glyph still has a dedicated copy page for old links. For words, names, and bios, stay on this generator."
      />
    </>
  );
}
