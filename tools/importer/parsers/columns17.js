/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .two-col block which holds the grid of columns
  const twoCol = element.querySelector('.two-col');
  if (!twoCol) return;
  const grid = twoCol.querySelector('.grid.online-services');
  if (!grid) return;

  // Find all immediate .block-wrap children (columns)
  const blockWraps = grid.querySelectorAll(':scope > .block-wrap');

  // For each column, gather all its content, preserving semantics
  const columns = Array.from(blockWraps).map(wrap => {
    // Reference the .block directly
    const block = wrap.querySelector(':scope > .block');
    if (!block) return '';
    // Gather all child nodes (elements and text nodes with content)
    const colContent = [];
    block.childNodes.forEach(node => {
      // Only include elements or non-empty text nodes
      if (node.nodeType === 1) {
        colContent.push(node);
      } else if (node.nodeType === 3 && node.textContent.trim()) {
        // Create a span to preserve inline text nodes
        const span = document.createElement('span');
        span.textContent = node.textContent;
        colContent.push(span);
      }
    });
    return colContent.length === 1 ? colContent[0] : colContent;
  });

  // Only create the table if at least one column has content
  if (!columns.length || columns.every(col => !col || (Array.isArray(col) && col.length === 0))) return;

  // Header row must be a single cell. The content row must be one array (1 cell) with an array containing all column elements
  const headerRow = ['Columns (columns17)'];
  // The columns row: a single cell containing an array of column elements
  const columnsRow = [columns];

  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
