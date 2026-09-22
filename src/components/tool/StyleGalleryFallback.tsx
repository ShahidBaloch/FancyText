/** Placeholder while StyleGallery chunk loads. */
export function StyleGalleryFallback() {
  return (
    <div className="gallery-loading" aria-busy="true" aria-label="Loading style gallery">
      <p className="seo-lead">Loading style previews…</p>
    </div>
  );
}
