/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block root within the element
  const accordionRoot = element.querySelector('.expand-widget.sl-accordion');
  if (!accordionRoot) return;

  // Get all direct child .sl-accordion--section elements
  const sections = Array.from(accordionRoot.querySelectorAll(':scope > .sl-accordion--section'));

  // Header row as in the block spec
  const rows = [['Accordion (accordion10)']];

  // For each accordion section, extract title and content
  sections.forEach(section => {
    // Find the title (inside h2.accordion-title > button > span)
    let title = '';
    const h2 = section.querySelector(':scope > h2.accordion-title');
    if (h2) {
      const button = h2.querySelector('button');
      if (button) {
        const span = button.querySelector('span');
        title = span ? span.textContent.trim() : button.textContent.trim();
      }
    }
    // Content: reference the .widget-content.sl-accordion--content element
    const content = section.querySelector(':scope > .widget-content.sl-accordion--content');
    // If content is not found, fallback to empty cell
    rows.push([title, content || document.createElement('div')]);
  });

  // Create the accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original accordion root with the block table
  accordionRoot.replaceWith(table);
}
