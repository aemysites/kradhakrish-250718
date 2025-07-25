/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block element
  const accordion = element.querySelector('.block.expand-widget.sl-accordion');
  if (!accordion) return;

  // All accordion sections
  const sections = accordion.querySelectorAll('.sl-accordion--section');

  // Table header must match EXACTLY
  const cells = [['Accordion (accordion31)']];

  // Each row: [title cell, content cell]
  sections.forEach((section) => {
    // Title: use the visible button text (span)
    const btn = section.querySelector('h2.accordion-title > button');
    let titleCell = '';
    if (btn) {
      // The visible label is always the span in the button
      const titleSpan = btn.querySelector('span');
      if (titleSpan) {
        // Reference the existing element
        titleCell = titleSpan;
      } else {
        titleCell = btn;
      }
    }

    // Content: reference all children of the accordion content div
    const contentDiv = section.querySelector('.widget-content');
    let contentCell = '';
    if (contentDiv) {
      // Gather all non-empty child nodes (to preserve paragraphs, blocks, etc)
      const nodes = [...contentDiv.childNodes].filter(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent.trim();
        }
        return true;
      });
      if (nodes.length === 1) {
        contentCell = nodes[0];
      } else if (nodes.length > 1) {
        contentCell = nodes;
      } else {
        contentCell = '';
      }
    }
    cells.push([titleCell, contentCell]);
  });

  // Create the accordion block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  accordion.replaceWith(table);
}
