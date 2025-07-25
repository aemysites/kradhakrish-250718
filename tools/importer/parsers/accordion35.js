/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block within the element
  const accordion = element.querySelector('.sl-accordion');
  if (!accordion) return;

  // Prepare the table rows
  const rows = [];
  // Header row - must match the example exactly
  rows.push(['Accordion (accordion35)']);

  // Find all accordion sections
  const sections = accordion.querySelectorAll('.sl-accordion--section');
  sections.forEach((section) => {
    // Title cell: get the title from the <span> inside the <button> inside the <h2>
    let title = '';
    const button = section.querySelector('h2 button');
    if (button) {
      const span = button.querySelector('span');
      if (span) {
        title = span.textContent.trim();
      } else {
        title = button.textContent.trim();
      }
    }
    // Content cell: all child elements (not text nodes) of the widget-content div
    const contentDiv = section.querySelector('.widget-content');
    let contentNodes = [];
    if (contentDiv) {
      // Reference existing child nodes (elements and text nodes with content)
      contentNodes = Array.from(contentDiv.childNodes).filter((n) => {
        // Keep non-empty text nodes and all elements
        return n.nodeType !== Node.TEXT_NODE || n.textContent.trim() !== '';
      });
      // If only one node, use it directly for cell
      if (contentNodes.length === 1) {
        contentNodes = contentNodes[0];
      }
      // If empty, use an empty string
      if (contentNodes.length === 0) {
        contentNodes = '';
      }
    } else {
      contentNodes = '';
    }
    rows.push([title, contentNodes]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original accordion block with the table
  accordion.replaceWith(table);
}
