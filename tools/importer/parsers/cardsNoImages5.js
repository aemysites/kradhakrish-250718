/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Cards block - matches example exactly
  const headerRow = ['Cards'];
  const rows = [headerRow];

  // Find all .block sections (these represent groups of cards by letter)
  const blocks = element.querySelectorAll('.block');
  blocks.forEach(block => {
    // For each definition entry (card), which is a .links.default div
    block.querySelectorAll('.links.default').forEach(card => {
      // Compose the card cell contents as a single <div>
      const div = document.createElement('div');
      // Card title (the <a>), which is always present
      const a = card.querySelector('a');
      if (a) {
        const strong = document.createElement('strong');
        strong.appendChild(a); // reference the original <a>
        div.appendChild(strong);
      }
      // Optional <sup> (link number)
      const sup = card.querySelector('sup');
      if (sup) {
        div.appendChild(document.createTextNode(' '));
        div.appendChild(sup); // reference the original <sup>
      }
      // Description(s), usually a <p>
      card.querySelectorAll('p').forEach(p => {
        if (div.childNodes.length > 0) {
          div.appendChild(document.createElement('br'));
        }
        div.appendChild(p); // reference the original <p>
      });
      // Only add row if there's meaningful content
      if (div.textContent.trim()) {
        rows.push([div]);
      }
    });
  });

  // Replace the element with the cards table if cards were found
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
