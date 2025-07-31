import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);

  // Create the global footer row
  const globalFooterRow = document.createElement('div');
  globalFooterRow.className = 'global-footer';

  // Center column (max width 1200px)
  const centerCol = document.createElement('div');
  centerCol.className = 'global-footer-center';

  // Left, center, and right columns
  const leftCol = document.createElement('div');
  leftCol.className = 'global-footer-col global-footer-col-left';

  // Create three columns inside the middleCol for the three icons
  const middleCol = document.createElement('div');
  middleCol.className = 'global-footer-col global-footer-col-center';

  // Create inner columns container
  const iconsRow = document.createElement('div');
  iconsRow.className = 'global-footer-icons-row';

  // NZ Govt logo
  const nzGovtCol = document.createElement('div');
  nzGovtCol.className = 'global-footer-icon-col global-footer-icon-nzgovt';
  const nzGovtImg = document.createElement('img');
  nzGovtImg.src = '/icons/nzgovt-logo-expanded-wordmark-white.svg';
  nzGovtImg.alt = 'New Zealand Government';
  nzGovtCol.appendChild(nzGovtImg);

  // MSD logo
  const msdCol = document.createElement('div');
  msdCol.className = 'global-footer-icon-col global-footer-icon-msd';
  const msdImg = document.createElement('img');
  msdImg.src = '/icons/msd-logo-expanded.svg';
  msdImg.alt = 'Ministry of Social Development';
  msdCol.appendChild(msdImg);

  // Shielded logo
  const shieldedCol = document.createElement('div');
  shieldedCol.className = 'global-footer-icon-col global-footer-icon-shielded';
  const shieldedImg = document.createElement('img');
  shieldedImg.src = '/icons/shielded-logo.svg';
  shieldedImg.alt = 'Shielded';
  shieldedCol.appendChild(shieldedImg);

  // Append the three icon columns to the iconsRow
  iconsRow.appendChild(msdCol);
  iconsRow.appendChild(nzGovtCol);
  iconsRow.appendChild(shieldedCol);

  // Append the iconsRow to the middleCol
  middleCol.appendChild(iconsRow);

  const rightCol = document.createElement('div');
  rightCol.className = 'global-footer-col global-footer-col-right';

  // Optionally, you can add content to the columns here

  // Append columns to centerCol
  centerCol.appendChild(leftCol);
  centerCol.appendChild(middleCol);
  centerCol.appendChild(rightCol);

  // Append centerCol to globalFooterRow
  globalFooterRow.appendChild(centerCol);

  // Append the globalFooterRow to the block (after the main footer)
  block.appendChild(globalFooterRow);

}
