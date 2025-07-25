/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main accordion block
  const accordion = element.querySelector('.sl-accordion, .expand-widget.sl-accordion');
  if (!accordion) return;

  // Find all the accordion sections
  const sections = accordion.querySelectorAll('.sl-accordion--section');

  // Header row matches the exact block name
  const headerRow = ['Accordion (accordion40)'];
  const rows = [headerRow];

  sections.forEach(section => {
    // Get the title (button > span in h2.accordion-title)
    let titleElem;
    const titleButton = section.querySelector('h2.accordion-title button');
    if (titleButton) {
      // Use the button's span or fallback to textContent
      const titleSpan = titleButton.querySelector('span');
      if (titleSpan) {
        titleElem = titleSpan;
      } else {
        // fallback: use button node but strip arrow
        titleElem = document.createElement('span');
        titleElem.textContent = titleButton.childNodes[0]?.textContent.trim() || titleButton.textContent.trim();
      }
    } else {
      // fallback: blank title
      titleElem = document.createElement('span');
      titleElem.textContent = '';
    }

    // Get the content node
    let contentNode = section.querySelector('.sl-accordion--content');
    // Defensive: fallback to .widget-content if .sl-accordion--content not found
    if (!contentNode) {
      contentNode = section.querySelector('.widget-content');
    }

    rows.push([titleElem, contentNode]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  accordion.replaceWith(table);
}
