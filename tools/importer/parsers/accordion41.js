/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block inside the element
  const accordion = element.querySelector('.sl-accordion');
  if (!accordion) return;

  const headerRow = ['Accordion (accordion41)'];
  const rows = [headerRow];

  // Each .sl-accordion--section is an accordion item
  const sections = accordion.querySelectorAll('.sl-accordion--section');
  sections.forEach(section => {
    // Extract the title as an actual element from the section
    // The title is the button inside h2.accordion-title
    const titleBtn = section.querySelector('h2.accordion-title > button.expand-contract');
    let titleCell = '';
    if (titleBtn) {
      // Reference the button directly for heading/semantics, but remove the arrow div
      const btnClone = titleBtn.cloneNode(true);
      // Remove the arrow div, if it exists
      const arrow = btnClone.querySelector('.arrow-open');
      if (arrow) arrow.remove();
      titleCell = btnClone;
    }
    // The content cell: reference the actual .widget-content.sl-accordion--content element directly
    const contentEl = section.querySelector('.widget-content.sl-accordion--content');
    rows.push([titleCell, contentEl]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  accordion.replaceWith(table);
}
