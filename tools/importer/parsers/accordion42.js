/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area
  const main = element.querySelector('main#content');
  if (!main) return;

  // Find all immediate .block elements representing accordion sections
  const blocks = Array.from(main.querySelectorAll(':scope > .block'));
  if (blocks.length === 0) return;

  // Compose the table header
  const rows = [['Accordion (accordion42)']];

  // For each accordion section
  blocks.forEach(block => {
    // Title: prefer textContent of first h2, or blank string
    let title = '';
    const h2 = block.querySelector('h2');
    if (h2) {
      title = h2.textContent.trim();
    }

    // Content: everything except the first h2
    // To keep all text and block semantics, collect all nodes except h2
    const contentNodes = [];
    block.childNodes.forEach(node => {
      if (node !== h2 && (node.nodeType !== 3 || node.textContent.trim())) {
        // If it's a text node with actual content, wrap in <p>
        if (node.nodeType === 3) {
          const txt = node.textContent.trim();
          if (txt.length) {
            const p = document.createElement('p');
            p.textContent = txt;
            contentNodes.push(p);
          }
        } else {
          contentNodes.push(node);
        }
      }
    });
    // Remove any empty or whitespace-only nodes
    const filtered = contentNodes.filter(n => {
      if (n.nodeType === 1 && n.tagName === 'P') {
        return n.textContent.trim().length > 0;
      }
      return true;
    });

    // If only one element, just that; if none, blank; else, array of nodes
    let contentCell = '';
    if (filtered.length === 1) contentCell = filtered[0];
    else if (filtered.length > 1) contentCell = filtered;

    rows.push([title, contentCell]);
  });

  // Build table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
