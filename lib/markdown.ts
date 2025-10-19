// Very small markdown to HTML converter for common patterns.
// Note: For production-grade security, use a proper sanitizer and renderer.

export function markdownToHtml(md: string): string {
  let html = md;
  // Escape basic HTML to reduce risk (very minimal)
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Headings
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-lg font-semibold mt-4">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-xl font-bold mt-6">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-2xl font-bold mt-8">$1</h1>');

  // Bold and italics
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-gray-100 rounded text-sm">$1</code>');

  // Lists
  html = html.replace(/^(?:-\s+.+\n?)+/gm, (match) => {
    const items = match
      .trim()
      .split(/\n/)
      .map((line) => line.replace(/^-\s+/, '<li class="ml-5 list-disc">'))
      .join('');
    return `<ul class="my-3">${items}</ul>`;
  });

  // Paragraphs: wrap lines that are not tags into <p>
  html = html
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<h\d|^<ul|^<li|^<code/.test(trimmed)) return trimmed;
      return `<p class="my-2 leading-7 text-gray-800">${trimmed}</p>`;
    })
    .join('\n');

  return html;
}

// Inline-friendly Markdown to HTML for previews: keeps bold/italic/code, flattens headings and lists.
export function markdownToInlineHtml(md: string): string {
  if (!md) return "";
  let text = md;

  // Escape basic HTML first
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Links [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

  // Headings -> strong inline
  text = text.replace(/^#{1,6}\s+(.+)$/gm, '<strong>$1</strong>');

  // Lists: "- item" lines -> bullet + space; collapse to single line later
  text = text.replace(/^\s*-\s+/gm, '• ');

  // Bold and italics
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-gray-100 rounded text-[0.85em]">$1</code>');

  // Collapse newlines to spaces (inline preview)
  text = text.replace(/\s*\n+\s*/g, ' ');

  return text.trim();
}
