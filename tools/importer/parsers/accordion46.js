/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row exactly as required
  const rows = [['Accordion (accordion46)']];

  // Find all accordion sections in the element
  const sections = Array.from(element.querySelectorAll('.sl-accordion--section'));

  sections.forEach(section => {
    // --- Title Cell ---
    // Use the text content of the button's span for the title, fallback to button if span not present
    let titleText = '';
    const btn = section.querySelector('h2.accordion-title > button.expand-contract');
    if (btn) {
      const span = btn.querySelector('span');
      if (span && span.textContent.trim()) {
        titleText = span.textContent.trim();
      } else {
        titleText = btn.textContent.trim();
      }
    } else {
      // fallback: h2 text
      const h2 = section.querySelector('h2.accordion-title');
      if (h2 && h2.textContent.trim()) {
        titleText = h2.textContent.trim();
      }
    }

    // --- Content Cell ---
    // Gather all content nodes for the accordion content (preserving all text nodes and child elements)
    let contentCell;
    const content = section.querySelector('.widget-content.sl-accordion--content');
    if (content) {
      // Collect all child nodes and filter empty text/comment nodes
      const nodes = Array.from(content.childNodes).filter(n => {
        if (n.nodeType === Node.TEXT_NODE) {
          return n.textContent.trim() !== '';
        }
        return n.nodeType === Node.ELEMENT_NODE;
      });
      // If there's only one node, put it directly; if more, use array
      if (nodes.length === 0) {
        contentCell = '';
      } else if (nodes.length === 1) {
        contentCell = nodes[0];
      } else {
        contentCell = nodes;
      }
    } else {
      contentCell = '';
    }

    rows.push([titleText, contentCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
