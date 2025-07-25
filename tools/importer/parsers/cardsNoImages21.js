/* global WebImporter */
export default function parse(element, { document }) {
  // Build array of rows for the table
  const rows = [];
  // Add header row (must match exactly)
  rows.push(['Cards (cardsNoImages21)']);
  // Each card is a glossary term: inside .block > .links.default
  const blocks = element.querySelectorAll('.block');
  blocks.forEach(block => {
    const entries = block.querySelectorAll('.links.default');
    entries.forEach(entry => {
      // Gather all content from this entry including formatting, links, etc.
      // Reference the existing children of the entry
      const content = [];
      entry.childNodes.forEach(node => {
        // Include non-empty text nodes and all element nodes
        if (node.nodeType === Node.ELEMENT_NODE) {
          content.push(node);
        } else if (node.nodeType === Node.TEXT_NODE) {
          const txt = node.textContent.trim();
          if (txt.length > 0) {
            content.push(document.createTextNode(txt));
          }
        }
      });
      if (content.length > 0) {
        rows.push([content]);
      }
    });
  });
  // Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
