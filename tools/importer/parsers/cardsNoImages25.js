/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block containing the news card listings
  const blocks = Array.from(element.querySelectorAll('.block'));
  // Look for a .block containing listings
  const listingsBlock = blocks.find(b => b.querySelector('.listing'));
  if (!listingsBlock) return;

  const cards = Array.from(listingsBlock.querySelectorAll(':scope > .listing'));

  const header = ['Cards (cardsNoImages25)'];
  const rows = [header];

  cards.forEach(card => {
    // Use a fragment to gather the content for this card
    const frag = document.createDocumentFragment();
    // Title with link (remove any sup.link-number)
    const titleDiv = card.querySelector('.title');
    if (titleDiv) {
      // Clean up sup tags in-place
      const sups = titleDiv.querySelectorAll('sup.link-number');
      sups.forEach(sup => sup.remove());
      // Move each child of .title into the fragment
      while (titleDiv.firstChild) {
        frag.appendChild(titleDiv.firstChild);
      }
      frag.appendChild(document.createElement('br'));
    }
    // Description
    const p = card.querySelector('p');
    if (p) {
      frag.appendChild(p);
      frag.appendChild(document.createElement('br'));
    }
    // Date
    const dateDiv = card.querySelector('.date');
    if (dateDiv) {
      frag.appendChild(dateDiv);
    }
    rows.push([frag]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  listingsBlock.replaceWith(table);
}
