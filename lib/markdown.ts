// Very small markdown to HTML converter for common patterns.
// Note: For production-grade security, use a proper sanitizer and renderer.

function escapeBasic(html: string) {
  return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Normalize inline bullets (" * Item1 * Item2") and inline ordered items (" 1. First 2. Second") into separate lines.
function normalizeInlineLists(text: string) {
  const lines = text.split(/\r?\n/);
  const out: string[] = [];
  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      out.push(line);
      continue;
    }

    // If line already starts like a list, keep as is
    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      out.push(trimmed);
      continue;
    }

    // Split inline bullets marked by " * "
    if (/\s\*\s/.test(line)) {
      const parts = line.split(/\s\*\s+/).map((s) => s.trim()).filter(Boolean);
      if (parts.length > 1) {
        // If first part is a normal sentence ending with ':' keep as intro line
        const first = parts[0];
        if (first && /:?$/.test(first) && !/^\*\s/.test(first)) {
          out.push(first);
          for (let i = 1; i < parts.length; i++) out.push(`* ${parts[i]}`);
        } else {
          // Treat all as bullets
          for (const p of parts) out.push(`* ${p}`);
        }
        continue;
      }
    }

    // Split inline ordered list items: " 1. Foo 2. Bar 3. Baz"
    if (/\s\d+\.\s+/.test(line)) {
      // Insert newlines before occurrences of "<number>. "
      const normalized = line.replace(/\s(\d+)\.\s+/g, (m, num) => `\n${num}. `);
      if (/^\d+\.\s+/.test(normalized) || /\n\d+\.\s+/.test(normalized)) {
        const parts = normalized.split(/\n/).map((s) => s.trim()).filter(Boolean);
        for (const p of parts) out.push(p);
        continue;
      }
    }

    out.push(line);
  }
  return out.join("\n");
}

export function markdownToHtml(md: string): string {
  let html = md || "";
  // Escape basic HTML to reduce risk (very minimal)
  html = escapeBasic(html);

  // Normalize inline list markers into proper lines
  html = normalizeInlineLists(html);

  // Headings
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-lg font-semibold mt-4">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-xl font-bold mt-6">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-2xl font-bold mt-8">$1</h1>');

  // Bold and italics
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-gray-100 rounded text-sm">$1</code>');

  // Ordered lists (1. 2. 3.)
  html = html.replace(/^(?:\d+\.\s+.+\n?)+/gm, (match) => {
    const items = match
      .trim()
      .split(/\n/)
      .map((line) => line.replace(/^\d+\.\s+/, '<li class="ml-5 list-decimal">'))
      .join('');
    return `<ol class="my-3">${items}</ol>`;
  });

  // Bullet lists (- or *)
  html = html.replace(/^(?:[-*]\s+.+\n?)+/gm, (match) => {
    const items = match
      .trim()
      .split(/\n/)
      .map((line) => line.replace(/^[-*]\s+/, '<li class="ml-5 list-disc">'))
      .join('');
    return `<ul class="my-3">${items}</ul>`;
  });

  // Paragraphs: wrap lines that are not tags into <p>
  html = html
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<h\d|^<ul|^<ol|^<li|^<code/.test(trimmed)) return trimmed;
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
  text = escapeBasic(text);

  // Normalize inline bullets/numbers into separate lines first
  text = normalizeInlineLists(text);

  // Links [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");

  // Headings -> strong inline
  text = text.replace(/^#{1,6}\s+(.+)$/gm, '<strong>$1</strong>');

  // Convert list line starters to bullets/numbers with line breaks preserved
  text = text.replace(/^\s*[-*]\s+/gm, '• ');
  text = text.replace(/^\s*(\d+)\.\s+/gm, '$1. ');

  // Bold and italics
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 bg-gray-100 rounded text-[0.85em]">$1</code>');

  // Collapse multiple blank lines; but keep single newlines so items appear on separate lines
  text = text.replace(/\n{3,}/g, '\n\n');

  // Convert remaining newlines to <br> for inline preview context
  text = text.replace(/\n/g, '<br />');

  return text.trim();
}
