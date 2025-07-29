/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area
  const main = element.querySelector('main#content');
  if (!main) return;

  // Gather all direct children of main, including text nodes with content
  const columnContent = [];
  Array.from(main.childNodes).forEach(node => {
    // Only keep element nodes or non-empty text nodes
    if (node.nodeType === Node.ELEMENT_NODE) {
      columnContent.push(node);
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      // Wrap text node in a span to keep it as a DOM element
      const span = document.createElement('span');
      span.textContent = node.textContent;
      columnContent.push(span);
    }
  });

  // Only create the Columns (columns9) table; do not add Section Metadata unless present in example
  const cells = [
    ['Columns (columns9)'],
    [columnContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
