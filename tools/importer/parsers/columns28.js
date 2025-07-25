/* global WebImporter */
export default function parse(element, { document }) {
  // Find the links container (columns) and the logos container
  const footerLinks = element.querySelector('.footer-links');
  const footerLogos = element.querySelector('.footer-logos');

  if (!footerLinks) return;
  const columns = Array.from(footerLinks.querySelectorAll(':scope > .link-column'));
  if (!columns.length) return;

  // Compose the header row: exactly one cell (colspan will be handled by createTable rendering logic)
  const headerRow = ['Columns (columns28)'];

  // Compose the columns row: use each column as a cell
  const contentRow = columns.map(col => col);

  // If logos exist, put in a row with the same number of columns
  let rows = [headerRow, contentRow];
  if (footerLogos) {
    const logosContainer = footerLogos.querySelector('.footer-logos-container') || footerLogos;
    // Provide a row with same number of columns, logo in first cell, rest empty
    const logosRow = [logosContainer, ...Array(columns.length - 1).fill('')];
    rows.push(logosRow);
  }

  // Use WebImporter.DOMUtils.createTable to generate the block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
