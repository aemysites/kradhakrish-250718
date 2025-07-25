/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('.expand-widget.sl-accordion');
  if (!accordion) return;

  // Table header as per block name + variant
  const rows = [['Accordion (accordion1)']];

  // Find all accordion sections (panels)
  const sections = accordion.querySelectorAll(':scope > .sl-accordion--section');
  sections.forEach((section) => {
    // Title cell: The visible heading is in the button's child span
    let title = '';
    const btn = section.querySelector('.accordion-title > button');
    if (btn) {
      const span = btn.querySelector('span');
      if (span) {
        title = span.textContent.trim();
      } else {
        title = btn.textContent.trim();
      }
    }
    
    // Content cell: All content inside .widget-content
    let contentCell = '';
    const content = section.querySelector('.widget-content');
    if (content) {
      contentCell = content;
    }
    rows.push([title, contentCell]);
  });

  // Create and replace accordion with block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  accordion.replaceWith(block);
}
