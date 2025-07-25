/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordion blocks (div.block under main)
  const main = element.querySelector('.margin-all > main');
  if (!main) return;
  const blocks = Array.from(main.querySelectorAll(':scope > div.block'));
  const rows = [];
  // Header row matches the block name in the instructions
  rows.push(['Accordion (accordion34)']);
  blocks.forEach(block => {
    // Title is the first h2 inside each block
    const h2 = block.querySelector('h2');
    if (!h2) return; // skip if no h2
    // Content: all other children of the block excluding h2
    const content = [];
    Array.from(block.children).forEach(child => {
      if (child !== h2) {
        content.push(child);
      }
    });
    rows.push([h2, content]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
