/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block by class
  const accordionRoot = element.querySelector('.expand-widget.sl-accordion, .sl-accordion');
  if (!accordionRoot) return;

  const headerRow = ['Accordion (accordion48)'];
  const rows = [headerRow];

  // Get all accordion sections
  const sections = accordionRoot.querySelectorAll(':scope > .sl-accordion--section');
  sections.forEach(section => {
    // --- TITLE CELL ---
    // The button within h2.accordion-title holds the title, usually a <span> inside
    const button = section.querySelector('h2.accordion-title > button');
    let titleEl = null;
    if (button) {
      const span = button.querySelector('span');
      if (span) {
        titleEl = span;
      } else {
        // fallback: use the button itself
        titleEl = button;
      }
    } else {
      // fallback: use heading text in the section
      const h2 = section.querySelector('h2.accordion-title');
      if (h2) {
        titleEl = h2;
      } else {
        titleEl = document.createTextNode(''); // Shouldn't happen, but safe fallback
      }
    }

    // --- CONTENT CELL ---
    const contentDiv = section.querySelector('.widget-content.sl-accordion--content');
    let contentEl = null;
    if (contentDiv) {
      // Remove inline style (display:none)
      contentDiv.removeAttribute('style');
      contentEl = contentDiv;
    } else {
      // fallback if content is missing
      contentEl = document.createTextNode('');
    }

    rows.push([titleEl, contentEl]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  accordionRoot.replaceWith(table);
}
