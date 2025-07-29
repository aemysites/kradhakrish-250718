/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block name
  const headerRow = ['Cards (cards10)'];

  // Find all li.story elements within the element
  const items = element.querySelectorAll('ul > li.story');
  const rows = [];

  items.forEach((li) => {
    // First cell: Image
    let imgCell = '';
    const imgDiv = li.querySelector(':scope > .img');
    if (imgDiv) {
      const img = imgDiv.querySelector('img');
      if (img) imgCell = img;
    }

    // Second cell: Text (title, description)
    let textCell = '';
    const textDiv = li.querySelector(':scope > .text');
    if (textDiv) {
      // Create fragment to collect elements in order
      const frag = document.createDocumentFragment();
      // Title (h3 with link and possible sup)
      const h3 = textDiv.querySelector('h3');
      if (h3) frag.appendChild(h3);
      // Description (first paragraph)
      const para = textDiv.querySelector('p');
      if (para) frag.appendChild(para);
      textCell = frag;
    }
    rows.push([imgCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
