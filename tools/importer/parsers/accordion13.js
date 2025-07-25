/* global WebImporter */
export default function parse(element, { document }) {
  // Compose table rows
  const cells = [['Accordion (accordion13)']];

  // Find the accordion container
  const accordion = element.querySelector('.expand-widget.sl-accordion');
  if (!accordion) return;

  // Find all accordion sections
  const sections = accordion.querySelectorAll('.sl-accordion--section');

  sections.forEach(section => {
    // Title cell: extract the text from the button's span or fallback to button
    let titleBtn = section.querySelector('h2.accordion-title > button');
    let titleCell;
    if (titleBtn) {
      const span = titleBtn.querySelector('span');
      if (span) {
        // Use a span element referencing the existing span for semantic fidelity
        titleCell = span;
      } else {
        // Fallback: use the button element itself (references existing)
        titleCell = titleBtn;
      }
    } else {
      // Fallback: use h2 text if button missing
      const h2 = section.querySelector('h2.accordion-title');
      titleCell = h2 ? h2 : document.createTextNode('');
    }

    // Content cell: Use all child nodes of .widget-content (preserves all text, formatting, and structure)
    const contentDiv = section.querySelector('.widget-content');
    let contentCell;
    if (contentDiv) {
      // Filter out empty text nodes
      const childNodes = Array.from(contentDiv.childNodes)
        .filter(node => node.nodeType !== Node.TEXT_NODE || node.textContent.trim());
      if (childNodes.length === 1) {
        contentCell = childNodes[0];
      } else if (childNodes.length > 1) {
        contentCell = childNodes;
      } else {
        contentCell = '';
      }
    } else {
      contentCell = '';
    }
    cells.push([titleCell, contentCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
