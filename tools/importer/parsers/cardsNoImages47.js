/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all direct children matching selector
  function directChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Locate the main content area
  const main = element.querySelector('main#content');
  if (!main) return;

  const headerRow = ['Cards (cardsNoImages47)'];
  const rows = [];

  // Collect all relevant card content in the order it appears
  const children = Array.from(main.children);
  children.forEach(child => {
    // h1: first card row
    if (child.tagName === 'H1') {
      rows.push([child]);
      return;
    }
    // summary p: card row
    if (child.tagName === 'P' && child.classList.contains('summary')) {
      rows.push([child]);
      return;
    }
    // .block: may be promo or info block
    if (child.classList.contains('block')) {
      // If promo, use the promo inner content
      const promo = child.querySelector('.promo');
      if (promo) {
        // Grab the <div> within .promo, which has the <p>s
        const promoDiv = promo.querySelector('div');
        if (promoDiv) {
          // Reference all <p> from promoDiv
          const promoPs = Array.from(promoDiv.querySelectorAll('p'));
          if (promoPs.length) {
            rows.push([promoPs]);
          }
        }
        return;
      }
      // Standard info block: heading, paragraphs, and links
      const cardContent = [];
      // Heading
      const h2 = child.querySelector('h2');
      if (h2) cardContent.push(h2);
      // Paragraphs directly under .block
      const ps = Array.from(child.querySelectorAll(':scope > p'));
      ps.forEach(p => cardContent.push(p));
      // Any .links blocks directly under .block
      const links = directChildren(child, '.links');
      links.forEach(linkDiv => cardContent.push(linkDiv));
      if (cardContent.length) {
        rows.push([cardContent]);
      }
    }
  });

  // Compose the cards block table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}
