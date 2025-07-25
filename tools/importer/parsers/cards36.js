/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to generate the block table
  function createCardsBlock(cards) {
    const headerRow = ['Cards'];
    const rows = cards.map(card => [card.image, card.text]);
    return WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  }

  // === FEATURE TILES ===
  const featureTiles = element.querySelector('#feature-tiles ul');
  if (featureTiles) {
    const featureCards = Array.from(featureTiles.children).map(li => {
      // li.card > div.block > h2 > a, sup, p
      const block = li.querySelector('.block');
      let textElements = [];
      if (block) {
        // Reference h2 if present
        const h2 = block.querySelector('h2');
        if (h2) textElements.push(h2);
        // Reference p if present
        const p = block.querySelector('p');
        if (p) textElements.push(p);
      }
      return {
        image: '', // No image in these cards
        text: textElements.length === 1 ? textElements[0] : textElements
      };
    });
    if (featureCards.length > 0) {
      const table = createCardsBlock(featureCards);
      // Replace entire #feature-tiles block
      featureTiles.parentElement.replaceWith(table);
    }
  }

  // === NEWS TILES ===
  const newsTiles = element.querySelector('#news-tiles ul');
  if (newsTiles) {
    const newsCards = Array.from(newsTiles.children).map(li => {
      // li.story > .img > img, .text > h3 > a, sup, p
      let img = '';
      const imgDiv = li.querySelector('.img');
      if (imgDiv) {
        const imgEl = imgDiv.querySelector('img');
        if (imgEl) img = imgEl;
      }
      let textElements = [];
      const text = li.querySelector('.text');
      if (text) {
        const h3 = text.querySelector('h3');
        if (h3) textElements.push(h3);
        const p = text.querySelector('p');
        if (p) textElements.push(p);
      }
      return {
        image: img || '',
        text: textElements.length === 1 ? textElements[0] : textElements
      };
    });
    if (newsCards.length > 0) {
      const table = createCardsBlock(newsCards);
      // Replace entire #news-tiles block
      newsTiles.parentElement.replaceWith(table);
    }
  }
}
