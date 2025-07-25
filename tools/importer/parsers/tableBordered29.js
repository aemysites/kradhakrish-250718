/* global WebImporter */
export default function parse(element, { document }) {
  // Find the 'Income limits' table
  const headings = Array.from(element.querySelectorAll('h3, h2, h4'));
  let incomeHeading = null;
  for (const h of headings) {
    if (h.textContent.trim().toLowerCase().includes('income limits')) {
      incomeHeading = h;
      break;
    }
  }
  let targetTable = null;
  if (incomeHeading) {
    let next = incomeHeading.nextElementSibling;
    while (next && !targetTable) {
      if (next.tagName === 'TABLE') {
        targetTable = next;
      } else if (next.querySelector && next.querySelector('table')) {
        targetTable = next.querySelector('table');
      }
      next = next.nextElementSibling;
    }
  }
  if (!targetTable) return;

  // Extract table data: only put the content of each cell, not the cell element itself
  const rows = Array.from(targetTable.rows);
  const tableData = rows.map(row => {
    return Array.from(row.cells).map(cell => {
      // Flatten: get all child nodes of cell as array
      return Array.from(cell.childNodes);
    });
  });

  // Compose cells array: first row is header, rest is tableData
  const cells = [
    ['Table (bordered)'],
    ...tableData
  ];
  // Create the block table and replace the original table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  targetTable.replaceWith(block);
}
