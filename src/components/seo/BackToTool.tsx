export function BackToTool({ href = "#tool" }: { href?: string }) {
  return (
    <p className="back-to-tool">
      <a href={href}>Back to the tool</a>
    </p>
  );
}
