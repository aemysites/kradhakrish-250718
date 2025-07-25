/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('.sl-accordion');
  if (!accordion) return;

  const headerRow = ['Accordion (accordion39)'];
  const rows = [headerRow];

  // Find all accordion sections
  const sections = accordion.querySelectorAll(':scope > .sl-accordion--section');
  sections.forEach((section) => {
    // Title: use the <button> label text, preserve formatting
    let titleCell;
    const titleButton = section.querySelector('h2 button');
    if (titleButton) {
      // Just use the button's inner HTML (excludes the arrow icon)
      // Get the span only if available, otherwise use the button
      const labelSpan = titleButton.querySelector('span');
      if (labelSpan) {
        titleCell = labelSpan;
      } else {
        titleCell = document.createElement('span');
        titleCell.textContent = titleButton.textContent.trim();
      }
    } else {
      // fallback in case no button
      titleCell = document.createTextNode('');
    }

    // Content: preserve all children in .sl-accordion--content
    let contentCell;
    const contentDiv = section.querySelector('.sl-accordion--content');
    if (contentDiv) {
      // Filter out empty text nodes
      const childNodes = Array.from(contentDiv.childNodes).filter(n =>
        !(n.nodeType === 3 && n.textContent.trim() === '')
      );
      if (childNodes.length === 1) {
        contentCell = childNodes[0];
      } else if (childNodes.length > 1) {
        contentCell = childNodes;
      } else {
        contentCell = document.createTextNode('');
      }
    } else {
      contentCell = document.createTextNode('');
    }
    rows.push([titleCell, contentCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  accordion.replaceWith(table);
}
