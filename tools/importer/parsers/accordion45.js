/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block in the element
  const accordion = element.querySelector('.block.expand-widget.sl-accordion');
  if (!accordion) return;

  // Find all direct child sections (accordion items)
  const sections = accordion.querySelectorAll(':scope > .sl-accordion--section');

  // Define rows array for block table
  const rows = [];
  // Header row as per requirements
  rows.push(['Accordion (accordion45)']);

  // For each accordion section, extract title and content
  sections.forEach(section => {
    // Title cell
    let title = '';
    const titleBtn = section.querySelector('.accordion-title button');
    if (titleBtn) {
      const span = titleBtn.querySelector('span');
      title = span ? span.textContent.trim() : titleBtn.textContent.trim();
    }
    // Content cell: reference widget-content directly
    let content = section.querySelector('.widget-content');
    if (!content) {
      // Fallback empty element
      content = document.createElement('div');
    }
    rows.push([title, content]);
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace accordion with new table
  accordion.replaceWith(table);
}
