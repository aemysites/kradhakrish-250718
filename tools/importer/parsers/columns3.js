/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns: only direct children of .footer-links should be columns
  const footerLinks = element.querySelector('.footer-links');
  let columns = [];
  if (footerLinks) {
    columns = Array.from(footerLinks.children).filter(x => x.classList.contains('link-column'));
  }

  // For each column, include its header and list as-is, to preserve semantic structure
  const columnCells = columns.map((col) => {
    // Use all child elements of the column (h2, ul)
    return Array.from(col.children);
  });

  // Header row must exactly match: Columns (columns3)
  const headerRow = ['Columns (columns3)'];

  // Only create the columns block as in the example
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnCells
  ], document);

  // Replace the element with the block table
  element.replaceWith(table);
}
