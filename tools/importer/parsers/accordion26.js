/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block within the given element
  const accordion = element.querySelector('.expand-widget.sl-accordion');
  if (!accordion) return;

  // Prepare table rows
  const rows = [];
  const headerRow = ['Accordion (accordion26)'];
  rows.push(headerRow);

  // Get all accordion sections
  const sections = accordion.querySelectorAll('.sl-accordion--section');
  sections.forEach((section) => {
    // Get the title cell (the .accordion-title > button > span)
    let titleContent = '';
    const btn = section.querySelector('.accordion-title > button');
    if (btn) {
      // Only use the span inside the button for the title
      const span = btn.querySelector('span');
      if (span) {
        titleContent = span;
      } else {
        // fallback to the button's textContent if span missing
        titleContent = document.createTextNode(btn.textContent.trim());
      }
    } else {
      // fallback to the heading itself
      const heading = section.querySelector('.accordion-title');
      titleContent = heading ? document.createTextNode(heading.textContent.trim()) : '';
    }

    // Get the content cell (the .widget-content, with all its children)
    let contentCell = '';
    const contentDiv = section.querySelector('.widget-content');
    if (contentDiv) {
      // Remove any hide/display attributes for import
      contentDiv.classList.remove('sl-accordion--hide');
      contentDiv.style.display = '';
      contentCell = contentDiv;
    } else {
      contentCell = '';
    }
    rows.push([titleContent, contentCell]);
  });

  // Create the accordion block table and replace the accordion element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  accordion.replaceWith(table);
}
