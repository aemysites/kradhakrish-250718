/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <main> content area, which contains the main column content
  const main = element.querySelector('main#content');
  if (!main) return;

  // Remove any banners or extraneous elements that are not visible content
  main.querySelectorAll('[style*="display: none"], .android-banner').forEach(el => el.remove());

  // Gather all direct children of <main> except for scripts or empty nodes
  const contentBlocks = [];
  Array.from(main.childNodes).forEach(node => {
    // Only include:
    // - Element nodes (excluding <script> and empty elements)
    // - Text nodes that are not just whitespace
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName.toLowerCase() === 'script') return;
      // Exclude empty elements
      if (
        (!node.textContent || node.textContent.trim() === '') &&
        (!node.querySelector || node.querySelectorAll('*').length === 0)
      ) return;
      contentBlocks.push(node);
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
      // Wrap stray text in a span for structure
      const span = document.createElement('span');
      span.textContent = node.textContent.trim();
      contentBlocks.push(span);
    }
  });

  // Compose the columns38 block: header then full content in a single cell
  const headerRow = ['Columns (columns38)'];
  const rows = [headerRow, [contentBlocks]];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
