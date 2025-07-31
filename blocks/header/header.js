import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // Find all sections in the fragment
  const sections = fragment.querySelectorAll('.section');

  // 1. Logo section (first section)
  const logoSection = sections[0];
  if (logoSection) {
    logoSection.classList.add('header-logo-section');
    // Optionally, add a role or aria-label if needed
    const logoWrapper = logoSection.querySelector('.default-content-wrapper');
    if (logoWrapper) {
      logoWrapper.classList.add('header-logo-wrapper');
      // Ensure the logo image is the first child
      const logoImg = logoWrapper.querySelector('img');
      if (logoImg && logoWrapper.firstChild !== logoImg) {
        logoWrapper.insertBefore(logoImg, logoWrapper.firstChild);
      }
    }
  }

  // 2. Utility links section (second section)
  const utilSection = sections[1];
  if (utilSection) {
    utilSection.classList.add('header-utility-section');
    const utilWrapper = utilSection.querySelector('.default-content-wrapper');
    if (utilWrapper) {
      utilWrapper.classList.add('header-utility-wrapper');
      // Style the first <ul> as utility nav
      const utilNav = utilWrapper.querySelector('ul');
      if (utilNav) {
        utilNav.classList.add('header-utility-nav');
      }
    }
  }

  // 3. Main nav section (third section)
  const navSection = sections[2];
  if (navSection) {
    navSection.classList.add('header-mainnav-section');
    const navWrapper = navSection.querySelector('.default-content-wrapper');
    if (navWrapper) {
      navWrapper.classList.add('header-mainnav-wrapper');
      // Style the <ul> as main nav
      const mainNav = navWrapper.querySelector('ul');
      if (mainNav) {
        mainNav.classList.add('header-mainnav');
        mainNav.setAttribute('role', 'menubar');
      }
      // Style the login button
      const loginBtn = navWrapper.querySelector('.button-container .button');
      if (loginBtn) {
        loginBtn.classList.add('header-login-button');
      }
    }
  }

  block.appendChild(fragment);
}
