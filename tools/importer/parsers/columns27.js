/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area
  const main = element.querySelector('main.two-col-content');
  if (!main) return;
  // Find the two column grid containing the blocks
  const twoCol = main.querySelector('div.two-col');
  if (!twoCol) return;
  const grid = twoCol.querySelector('div.grid.online-services');
  if (!grid) return;

  // Each .block-wrap is a column
  const blockWraps = Array.from(grid.querySelectorAll(':scope > .block-wrap'));

  // Gather heading and summary, if present
  const heading = main.querySelector('h1');
  const summary = main.querySelector('p.summary');

  // To ensure all text is included, insert heading and summary at the beginning of the first column block
  if (blockWraps.length > 0 && heading) {
    blockWraps[0].insertBefore(heading, blockWraps[0].firstChild);
  }
  if (blockWraps.length > 0 && summary) {
    // Insert after heading if present, else at the top
    if (blockWraps[0].firstChild && blockWraps[0].firstChild.tagName === 'H1') {
      blockWraps[0].insertBefore(summary, blockWraps[0].children[1]);
    } else {
      blockWraps[0].insertBefore(summary, blockWraps[0].firstChild);
    }
  }

  // Build the cells array: header row (1 column), then a single row with N columns
  const headerRow = ['Columns (columns27)'];
  const columnsRow = blockWraps;
  const cells = [headerRow, columnsRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
