/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block within the element
  const accordion = element.querySelector('.sl-accordion');
  if (!accordion) return;

  // Prepare the header row as specified
  const headerRow = ['Accordion (accordion14)'];
  const rows = [headerRow];

  // Get all immediate accordion sections
  const sections = accordion.querySelectorAll(':scope > .sl-accordion--section');

  sections.forEach(section => {
    // Title cell: get the inner text of the accordion title button
    let titleContent = '';
    const titleBtn = section.querySelector('.accordion-title button');
    if (titleBtn) {
      const span = titleBtn.querySelector('span');
      titleContent = span ? span.textContent.trim() : titleBtn.textContent.trim();
    }

    // Content cell: reference the content div as-is
    const contentDiv = section.querySelector('.sl-accordion--content');
    let contentCell = null;
    if (contentDiv) {
      // Remove display:none for import systems that may ignore hidden content
      contentDiv.removeAttribute('style');

      // Remove the first <p> if it is empty and more content follows
      const ps = contentDiv.querySelectorAll(':scope > p');
      if (
        ps.length > 0 &&
        ps[0].textContent.trim() === '' &&
        contentDiv.children.length > 1
      ) {
        contentDiv.removeChild(ps[0]);
      }
      contentCell = contentDiv;
    } else {
      // Fallback for missing content
      contentCell = '';
    }

    rows.push([
      titleContent,
      contentCell
    ]);
  });

  // Create the block table with the collected rows
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original accordion element with the new table block
  accordion.replaceWith(table);
}