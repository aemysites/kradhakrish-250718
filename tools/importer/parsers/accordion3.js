/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block by class, as per the HTML and screenshots
  const accordion = element.querySelector('.expand-widget.sl-accordion');
  if (!accordion) return;

  // Prepare the header
  const headerRow = ['Accordion (accordion3)'];
  const rows = [headerRow];

  // Each accordion item is a .sl-accordion--section element
  const sections = accordion.querySelectorAll('.sl-accordion--section');
  sections.forEach(section => {
    // Title cell: from the button > span inside h2.accordion-title
    const button = section.querySelector('.accordion-title button');
    let titleContent;
    if (button) {
      // We want the text/HTML inside the first span child (including any HTML formatting)
      const span = button.querySelector('span');
      if (span) {
        // Move the content, don't clone
        titleContent = span;
      } else {
        titleContent = button;
      }
    } else {
      titleContent = document.createTextNode('');
    }
    // Content cell: the .sl-accordion--content (include all children, maintain structure)
    const content = section.querySelector('.sl-accordion--content');
    let contentCell;
    if (content) {
      contentCell = content;
    } else {
      contentCell = document.createTextNode('');
    }
    rows.push([titleContent, contentCell]);
  });

  // Create the table and replace the block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  accordion.replaceWith(table);
}
