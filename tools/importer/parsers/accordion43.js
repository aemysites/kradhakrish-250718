/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion43) block
  const headerRow = ['Accordion (accordion43)'];
  const tableRows = [];

  const main = element.querySelector('main#content');
  if (!main) return;

  // Only select direct .block children of main
  const blocks = Array.from(main.querySelectorAll(':scope > .block'));
  blocks.forEach(block => {
    // Title: Prefer first h2, then h3, then h4, fall back to first p
    let titleElem = block.querySelector('h2, h3, h4, h5, h6');
    if (!titleElem) {
      // Fallback: top promo block might have no heading, take first meaningful non-empty P
      const firstP = Array.from(block.children).find(el => el.tagName === 'P' && el.textContent.trim());
      if (firstP) {
        titleElem = firstP;
      } else {
        // If all else fails, take block as title (should never happen)
        titleElem = block;
      }
    }

    // Content: everything in .block except the title element
    const contentElems = [];
    for (const child of Array.from(block.children)) {
      if (child !== titleElem) {
        contentElems.push(child);
      }
    }
    // Defensive: If nothing left for content, use an empty string
    const contentCell = contentElems.length ? contentElems : '';

    tableRows.push([titleElem, contentCell]);
  });

  // Compose table [[header], [title, content], ...]
  const tableData = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}
