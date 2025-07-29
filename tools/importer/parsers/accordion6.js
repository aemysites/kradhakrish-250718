/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block inside the current element
  const accordionBlock = element.querySelector('.sl-accordion');
  if (!accordionBlock) return;

  // Find all accordion sections inside the accordion block
  const accordionSections = accordionBlock.querySelectorAll('.sl-accordion--section');
  const rows = [];
  // Header row, per spec, must match block name exactly
  rows.push(['Accordion']);
  accordionSections.forEach((section) => {
    // Title cell: use the button as-is for semantics/accessibility
    const titleBtn = section.querySelector('.accordion-title button');
    let titleCell = '';
    if (titleBtn) {
      titleCell = titleBtn;
    } else {
      // fallback: try to get the text content from the title
      const h2 = section.querySelector('.accordion-title');
      titleCell = h2 ? h2.textContent.trim() : '';
    }
    // Content cell: collect all non-empty children of the content div
    const contentDiv = section.querySelector('.widget-content');
    let contentCell = '';
    if (contentDiv) {
      // Filter out empty text nodes and empty tags
      const validNodes = Array.from(contentDiv.childNodes).filter(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Exclude empty <p> and <ul> etc.
          if (node.textContent.trim() === '') return false;
          return true;
        }
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent.trim() !== '';
        }
        return false;
      });
      if (validNodes.length === 1) {
        contentCell = validNodes[0];
      } else if (validNodes.length > 1) {
        contentCell = validNodes;
      } // else remains empty string
    }
    rows.push([titleCell, contentCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  accordionBlock.replaceWith(table);
}
