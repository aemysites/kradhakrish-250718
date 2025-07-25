/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the accordion block
  let accordion = element;
  // If the element is not the accordion block, try to find it inside
  if (!accordion.classList.contains('expand-widget') || !accordion.classList.contains('sl-accordion')) {
    // Try more generally if both classes aren't there (most robust)
    const found = element.querySelector('.expand-widget.sl-accordion');
    if (found) accordion = found;
    else {
      // fallback: look for any '.sl-accordion' with sections
      const alt = element.querySelector('.sl-accordion');
      if (alt && alt.querySelector('.sl-accordion--section')) accordion = alt;
    }
  }
  if (!accordion) return;

  // Find all direct accordion sections
  const sections = Array.from(accordion.querySelectorAll(':scope > .sl-accordion--section'));
  if (!sections.length) return;

  const headerRow = ['Accordion (accordion32)'];
  const rows = sections.map((section) => {
    // Title cell: .accordion-title button span (existing element)
    let title = section.querySelector('.accordion-title button span');
    if (!title) {
      // fallback to full button (prefer referencing existing element)
      title = section.querySelector('.accordion-title button');
      if (!title) {
        // fallback to .accordion-title
        title = section.querySelector('.accordion-title');
      }
    }
    // Content cell: .sl-accordion--content or .widget-content (existing element)
    let content = section.querySelector('.sl-accordion--content') || section.querySelector('.widget-content');
    // Defensive: fallback to section if not found
    if (!content) content = section;
    return [title, content];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  accordion.replaceWith(table);
}
