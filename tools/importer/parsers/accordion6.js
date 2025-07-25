/* global WebImporter */
export default function parse(element, { document }) {
  // Find all blocks that could be considered accordion items (direct .block children of #content)
  const main = element.querySelector('main#content');
  if (!main) return;
  const blocks = Array.from(main.querySelectorAll(':scope > .block'));
  if (!blocks.length) return;

  const cells = [];
  // Header row matches exactly
  cells.push(['Accordion (accordion6)']);

  // Each block = one accordion row (Title, Content)
  blocks.forEach((block) => {
    // Title cell: first h2 in the block
    const title = block.querySelector('h2');
    if (!title) return;
    // Content cell: everything after the h2, until the end of the block
    const content = [];
    let foundTitle = false;
    for (const node of Array.from(block.childNodes)) {
      if (!foundTitle) {
        if (node === title) foundTitle = true;
        continue;
      }
      // Ignore empty text nodes
      if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) continue;
      content.push(node);
    }
    // If content is empty, insert an empty string to preserve the table structure
    cells.push([
      title,
      content.length === 0 ? '' : (content.length === 1 ? content[0] : content)
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
