import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Replace header with static HTML as per requirements

  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // Find the first div with class "section"
  const sectionDiv = fragment.querySelector('div.section');
  if (sectionDiv) {
    // Find the inner div with class "default-content-wrapper"
    const defaultContentWrapper = sectionDiv.querySelector('div.default-content-wrapper');
    if (defaultContentWrapper) {
      // Add class for header default content wrapper
      defaultContentWrapper.classList.add('header-default-content-wrapper');

      // Find the first image inside defaultContentWrapper
      const img = defaultContentWrapper.querySelector('img');
      // Remove the image from its current position if it exists
      if (img) {
        img.parentNode.removeChild(img);
      }

      // Create the columns container
      const columnsContainer = document.createElement('div');
      columnsContainer.classList.add('header-columns-container');

      // Left column for image
      const leftCol = document.createElement('div');
      leftCol.classList.add('header-left-col');
      if (img) {
        leftCol.appendChild(img);
      }

      // Right column for search box and button
      const rightCol = document.createElement('div');
      rightCol.classList.add('header-right-col');

      // Create search input
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.placeholder = 'Search...';
      searchInput.setAttribute('aria-label', 'Search');
      searchInput.classList.add('header-search-input');

      // Create submit button
      const submitBtn = document.createElement('button');
      submitBtn.type = 'submit';
      submitBtn.textContent = 'Search';
      submitBtn.classList.add('header-search-button');

      // Optionally, wrap input and button in a form
      const searchForm = document.createElement('form');
      searchForm.classList.add('header-search-form');
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // You can add search logic here if needed
      });
      searchForm.appendChild(searchInput);
      searchForm.appendChild(submitBtn);

      rightCol.appendChild(searchForm);

      // Add columns to container
      columnsContainer.appendChild(leftCol);
      columnsContainer.appendChild(rightCol);

      // Remove all children from defaultContentWrapper
      while (defaultContentWrapper.firstChild) {
        defaultContentWrapper.removeChild(defaultContentWrapper.firstChild);
      }
      // Add the columnsContainer
      defaultContentWrapper.appendChild(columnsContainer);
    }
  }


  // Fetch the second section and the default-content-wrapper
  const sections = fragment.querySelectorAll('div.section');
  const secondSection = sections[1];
  const defaultContentWrapper = secondSection?.querySelector('.default-content-wrapper');

  if (defaultContentWrapper) {
    // Create a wrapper to contain the width to 1200px
    const headerContentWrapper = document.createElement('div');
    headerContentWrapper.classList.add('logo-header-default-content-wrapper');

    // Create columns container
    const columnsContainer = document.createElement('div');
    columnsContainer.classList.add('logo-header-columns-container');

    // Left column for image
    const leftCol = document.createElement('div');
    leftCol.classList.add('logo-header-left-col');
    // Find the first image in the defaultContentWrapper
    const img = defaultContentWrapper.querySelector('img');
    if (img) {
      leftCol.appendChild(img.cloneNode(true));
    }

    // Right column for links
    const rightCol = document.createElement('div');
    rightCol.classList.add('logo-header-right-col');
    // Find all links in the defaultContentWrapper
    const links = defaultContentWrapper.querySelectorAll('a');
    links.forEach(link => {
      const button = document.createElement('button');
      button.textContent = link.textContent;
      button.className = 'logo-header-link-button';
      button.onclick = () => {
        window.location.href = link.href;
      };
      rightCol.appendChild(button);
    });

    // Add columns to container
    columnsContainer.appendChild(leftCol);
    columnsContainer.appendChild(rightCol);

    // Add columnsContainer to the width-constrained wrapper
    headerContentWrapper.appendChild(columnsContainer);

    // Remove all children from defaultContentWrapper
    while (defaultContentWrapper.firstChild) {
      defaultContentWrapper.removeChild(defaultContentWrapper.firstChild);
    }
    // Add the headerContentWrapper (with max-width 1200px) to defaultContentWrapper
    defaultContentWrapper.appendChild(headerContentWrapper);
  }



  
  // Fetch the third section and its default-content-wrapper
  const thirdSection = sections[2];
  const thirdContentWrapper = thirdSection?.querySelector('.default-content-wrapper');

  if (thirdContentWrapper) {
    // Create a wrapper to constrain width to 1200px
    const navHeaderContentWrapper = document.createElement('div');
    navHeaderContentWrapper.classList.add('nav-header-default-content-wrapper');

    // Create columns container
    const navColumnsContainer = document.createElement('div');
    navColumnsContainer.classList.add('nav-header-columns-container');

    // Left column for list of links
    const navLeftCol = document.createElement('div');
    navLeftCol.classList.add('nav-header-left-col');

    // Find all links in the thirdContentWrapper
    const navLis = thirdContentWrapper.querySelectorAll('li');
    if (navLis.length > 0) {
      const ul = document.createElement('ul');
      ul.classList.add('nav-header-links-list');
      navLis.forEach(liEl => {
        // Find the first <a> inside this <li>
        const link = liEl.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = link.textContent;
          a.className = link.className || '';
          li.appendChild(a);
          ul.appendChild(li);
        }
      });
      navLeftCol.appendChild(ul);
    }

    // Right column for Login link
    const navRightCol = document.createElement('div');
    navRightCol.classList.add('nav-header-right-col');

    // Find the Login link inside p.button-container
    const buttonContainer = thirdContentWrapper.querySelector('p.button-container');
    let loginLink;
    if (buttonContainer) {
      const loginA = buttonContainer.querySelector('a');
      if (loginA) {
        loginLink = document.createElement('a');
        loginLink.href = loginA.href;
        loginLink.textContent = loginA.textContent;
        loginLink.className = 'nav-header-login-link';
        navRightCol.appendChild(loginLink);
      }
    }

    // Add columns to container
    navColumnsContainer.appendChild(navLeftCol);
    navColumnsContainer.appendChild(navRightCol);

    // Add columnsContainer to the width-constrained wrapper
    navHeaderContentWrapper.appendChild(navColumnsContainer);

    // Remove all children from thirdContentWrapper
    while (thirdContentWrapper.firstChild) {
      thirdContentWrapper.removeChild(thirdContentWrapper.firstChild);
    }
    // Add the navHeaderContentWrapper to thirdContentWrapper
    thirdContentWrapper.appendChild(navHeaderContentWrapper);
  }


  block.innerHTML = fragment.innerHTML;
}
