/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area
  const main = element.querySelector('main#content');
  if (!main) return;

  // Find the two-col container
  const twoCol = main.querySelector('.two-col');
  if (!twoCol) return;

  // Find the grid with columns
  const grid = twoCol.querySelector('.grid.online-services');
  if (!grid) return;

  // Each column is a .block-wrap
  const blockWraps = Array.from(grid.querySelectorAll(':scope > .block-wrap'));

  // For each column, gather its direct content as is, removing link-number <sup>s
  const columnCells = blockWraps.map((wrap) => {
    wrap.querySelectorAll('sup.link-number').forEach(sup => sup.remove());
    return wrap;
  });

  // Header row: exactly one column, as required
  const headerRow = ['Columns (columns7)'];
  // Second row: each block-wrap in its own cell
  const columnsRow = columnCells;

  // Compose table data as expected: header row (single column), then row with N columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element (.container.js-on) with the new block table
  element.replaceWith(table);
}
