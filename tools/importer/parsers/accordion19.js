/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block in the given element
  const accordion = element.querySelector('.sl-accordion');
  if (!accordion) return;

  // Start with the header row exactly as required
  const rows = [['Accordion (accordion19)']];

  // Get all accordion sections
  const sections = accordion.querySelectorAll(':scope > .sl-accordion--section');
  sections.forEach(section => {
    // Title cell: extract the text from the button's span (the accordion label)
    const titleBtn = section.querySelector('.accordion-title > button');
    let titleContent = '';
    if (titleBtn) {
      const span = titleBtn.querySelector('span');
      if (span) {
        titleContent = span.textContent.trim();
      } else {
        titleContent = titleBtn.textContent.trim();
      }
    }
    // Use a heading element if present, but only reference existing elements
    const heading = section.querySelector('.accordion-title');
    let titleEl;
    if (heading && heading.tagName.match(/^H[1-6]$/i)) {
      titleEl = heading;
    } else {
      // If not a heading, create a <p> to hold the text extracted above
      titleEl = document.createElement('p');
      titleEl.textContent = titleContent;
    }

    // Content cell: get all real child nodes of the content div, preserving elements (not cloning)
    const contentDiv = section.querySelector('.sl-accordion--content');
    const contentNodes = [];
    if (contentDiv) {
      Array.from(contentDiv.childNodes).forEach(node => {
        // If it's an element node or a text node with non-empty text
        if (node.nodeType === 1) {
          contentNodes.push(node);
        } else if (node.nodeType === 3 && node.textContent.trim() !== '') {
          // Wrap stray text nodes in <p> for readability
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          contentNodes.push(p);
        }
      });
    }
    rows.push([titleEl, contentNodes]);
  });

  // Replace the entire accordion block with the newly structured block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  accordion.replaceWith(block);
}
