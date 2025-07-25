/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordion sections by class
  const sections = element.querySelectorAll('.sl-accordion--section');
  if (!sections.length) return;
  // Header row as per the block name in the prompt
  const rows = [['Accordion (accordion22)']];
  sections.forEach(section => {
    // --- TITLE ---
    let titleText = '';
    const button = section.querySelector('.accordion-title > button');
    if (button) {
      // Get text content from the button (span preferred, but include all text)
      titleText = Array.from(button.childNodes)
        .filter(n => n.nodeType === 1 || n.nodeType === 3)
        .map(n => n.textContent.trim())
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
    }
    // --- CONTENT ---
    const content = section.querySelector('.widget-content');
    let contentCell;
    if (content) {
      // Reference the content element directly to preserve all formatting and structure (no cloning)
      contentCell = content;
    } else {
      // fallback to empty string
      contentCell = '';
    }
    rows.push([titleText, contentCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
