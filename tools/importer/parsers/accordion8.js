/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block relevant to this component
  const accordion = element.querySelector('.block.expand-widget.sl-accordion');
  if (!accordion) return;

  // Get all accordion sections within the accordion block
  const sections = accordion.querySelectorAll(':scope > .sl-accordion--section');
  const rows = [];
  // Table header as per requirements
  rows.push(['Accordion (accordion8)']);

  sections.forEach((section) => {
    // Title cell: text inside the accordion-title button's first span
    let titleContent = '';
    const titleButton = section.querySelector('h2.accordion-title > button');
    if (titleButton) {
      const span = titleButton.querySelector('span');
      titleContent = (span ? span.textContent : titleButton.textContent).trim();
    }
    // Wrap title in a <div> for structure and semantic stability
    const titleDiv = document.createElement('div');
    titleDiv.textContent = titleContent;

    // Content cell: the actual widget-content element,
    // reference the existing element directly for full fidelity
    const content = section.querySelector('.widget-content');
    rows.push([
      titleDiv,
      content ? content : document.createElement('div'), // always provide an element
    ]);
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  accordion.replaceWith(table);
}
