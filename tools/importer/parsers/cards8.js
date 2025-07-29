/* global WebImporter */
export default function parse(element, { document }) {
  // Table structure: [ [Header], [image/icon, text], ... ] as per requirements
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Locate the cards container (ul inside #feature-tiles)
  const tiles = element.querySelector('#feature-tiles ul');
  if (tiles) {
    Array.from(tiles.children).forEach((li) => {
      // Each .card li should have a .block containing h2 (title, with link) and p (desc)
      const block = li.querySelector('.block');
      if (!block) return;

      // Remove any <sup class="link-number"> elements so only real text remains
      block.querySelectorAll('sup.link-number').forEach(sup => sup.remove());

      // There are no images in these cards, so first cell blank
      // Second cell: use the actual .block element (preserves headings, links, and all text)
      // This also ensures any future extra content inside .block is not lost
      rows.push(['', block]);
    });
  }

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
