/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header as per spec
  const headerRow = ['Accordion (accordion23)'];
  const rows = [headerRow];

  // Find all accordion items (sections)
  const sections = element.querySelectorAll('.sl-accordion--section');
  sections.forEach((section) => {
    // Title cell: get the text from the <span> inside the button
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
    
    // Content cell: all child nodes of .widget-content, in order (reference, not clone)
    const contentDiv = section.querySelector('.widget-content');
    let contentCell = '';
    if (contentDiv) {
      // Filter out empty text nodes, keep order
      const contentNodes = Array.from(contentDiv.childNodes).filter((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent.trim().length > 0;
        }
        return true;
      });
      // If only 1 node, put it directly, else as array
      if (contentNodes.length === 1) {
        contentCell = contentNodes[0];
      } else if (contentNodes.length > 1) {
        contentCell = contentNodes;
      } else {
        contentCell = '';
      }
    }
    // Push this row
    rows.push([title, contentCell]);
  });

  // Create and replace with accordion table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
