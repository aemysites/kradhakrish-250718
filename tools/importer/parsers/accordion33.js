/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block
  const accordion = element.querySelector('.sl-accordion');
  if (!accordion) return;
  // Get all accordion sections
  const sections = accordion.querySelectorAll('.sl-accordion--section');
  const rows = [];
  // Header row as per block spec
  rows.push(['Accordion (accordion33)']);
  // Process each section
  sections.forEach((section) => {
    // Title: robustly get the button text or fallback to raw text content
    let titleElem = section.querySelector('.accordion-title button span');
    let titleContent;
    if (titleElem) {
      titleContent = titleElem;
    } else {
      // fallback: use the button itself if no span
      const button = section.querySelector('.accordion-title button');
      if (button) {
        // Create a div for consistent referencing
        const fallbackTitle = document.createElement('div');
        fallbackTitle.textContent = button.textContent.trim();
        titleContent = fallbackTitle;
      }
    }
    // Content: use the content div directly
    const contentDiv = section.querySelector('.sl-accordion--content');
    if (titleContent && contentDiv) {
      rows.push([titleContent, contentDiv]);
    }
  });
  // Create the accordion block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace accordion in DOM
  accordion.replaceWith(block);
}
