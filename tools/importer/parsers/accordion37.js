/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block by its classes
  const accordion = element.querySelector('.expand-widget.sl-accordion');
  if (!accordion) return;

  // Get all accordion sections
  const sections = Array.from(accordion.querySelectorAll('.sl-accordion--section'));

  // Prepare rows for the block table
  const rows = [
    ['Accordion (accordion37)']
  ];

  sections.forEach(section => {
    // Title cell: The title is the visible text from the <button> in h2.accordion-title
    let titleBtn = section.querySelector('h2.accordion-title > button');
    let title = '';
    if (titleBtn) {
      // Use the span (main label) if available, else fallback to button text
      const labelSpan = titleBtn.querySelector('span');
      title = labelSpan ? labelSpan.textContent.trim() : titleBtn.textContent.trim();
    }

    // Content cell: All content inside the widget-content div, preserve HTML & semantics
    const contentDiv = section.querySelector('.widget-content');
    let contentCell = '';
    if (contentDiv) {
      // Collect all direct children that are elements or significant text
      // This ensures all paragraphs, headings, lists, and links are included
      const contentNodes = [];
      for (const node of contentDiv.childNodes) {
        if (node.nodeType === 1) {
          contentNodes.push(node);
        } else if (node.nodeType === 3 && node.textContent.trim()) {
          // Preserve significant text nodes by wrapping in <p> for readability
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          contentNodes.push(p);
        }
      }
      // If only one node, use that, else provide array
      contentCell = contentNodes.length === 1 ? contentNodes[0] : contentNodes;
    }

    rows.push([
      title,
      contentCell
    ]);
  });

  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
