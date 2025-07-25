/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area
  const main = element.querySelector('main#content');
  if (!main) return;

  // Select all top-level blocks in the main content (excluding related-pages)
  const blockDivs = Array.from(main.querySelectorAll(':scope > div.block'))
    .filter(block => !block.classList.contains('related-pages'));

  // Prepare table rows, starting with the header
  const rows = [ ['Accordion (accordion12)'] ];

  blockDivs.forEach(block => {
    // Find the first h2 for the section title
    const h2 = block.querySelector('h2');
    if (!h2) return;
    
    // Gather ALL content for this accordion, after the h2 and up to the next h2 or end of block
    const contentEls = [];
    let sibling = h2.nextSibling;
    while (sibling) {
      // Stop at next h2 (which would start a new section)
      if (sibling.nodeType === 1 && sibling.tagName === 'H2') break;
      // Skip empty text nodes
      if (sibling.nodeType === 3 && sibling.textContent.trim() === '') {
        sibling = sibling.nextSibling;
        continue;
      }
      // Flatten leftFloat (button wrapper)
      if (
        sibling.nodeType === 1 &&
        sibling.classList &&
        sibling.classList.contains('leftFloat')
      ) {
        Array.from(sibling.childNodes).forEach(child => {
          if (child.nodeType === 1 || (child.nodeType === 3 && child.textContent.trim() !== '')) {
            contentEls.push(child);
          }
        });
      }
      // Ignore clearboth
      else if (
        sibling.nodeType === 1 &&
        sibling.classList &&
        sibling.classList.contains('clearboth')
      ) {
        // skip
      } else {
        contentEls.push(sibling);
      }
      sibling = sibling.nextSibling;
    }

    // Remove empty text nodes from contentEls
    const finalContent = contentEls.filter(n => {
      if (n.nodeType === 3) return n.textContent.trim() !== '';
      return true;
    });

    // Ensure all text, lists, headings, buttons, etc. are included
    // Use the actual h2 element from the DOM for the section title
    rows.push([
      h2,
      finalContent.length === 1 ? finalContent[0] : finalContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
