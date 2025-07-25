/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('.expand-widget.sl-accordion');
  if (!accordion) return;

  // Block header as per example
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Select all direct accordion sections
  const sections = accordion.querySelectorAll(':scope > .sl-accordion--section');
  sections.forEach(section => {
    // --- Title cell ---
    // Use the heading button's span text as the title, but reference the element for formatting
    const titleBtn = section.querySelector('.expand-contract');
    let titleElem;
    if (titleBtn) {
      const span = titleBtn.querySelector('span');
      if (span) {
        titleElem = span;
      } else {
        // Fall back to full button if span missing
        titleElem = titleBtn;
      }
    } else {
      // Fall back to section heading text
      const h2 = section.querySelector('h2');
      titleElem = h2 ? h2 : document.createElement('span');
    }

    // --- Content cell ---
    // Use all child nodes of the widget-content container, preserving structure (including lists, links, etc)
    const content = section.querySelector('.widget-content');
    let contentCell;
    if (content) {
      // Reference all existing non-empty nodes
      const nodes = Array.from(content.childNodes).filter(n => {
        if (n.nodeType === 3) return n.textContent.trim().length > 0; // non-empty text
        if (n.nodeType === 1) return true; // element
        return false;
      });
      // If multiple elements, use as array, else single
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

    rows.push([titleElem, contentCell]);
  });

  // Create and replace the accordion block with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  accordion.replaceWith(table);
}