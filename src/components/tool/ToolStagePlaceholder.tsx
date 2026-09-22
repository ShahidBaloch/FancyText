/** SSR placeholder while the client tool chunk loads — reduces layout shift. */
export function ToolStagePlaceholder() {
  return (
    <div
      className="tool-stage tool-stage--loading"
      id="tool"
      aria-busy="true"
      aria-label="Loading text converter"
    >
      <div className="tool-stage-loading-inner">
        <span className="tool-stage-loading-bar" />
        <p className="seo-lead">Loading Unicode styles…</p>
      </div>
    </div>
  );
}
