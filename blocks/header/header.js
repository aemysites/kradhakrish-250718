export default async function decorate(block) {
  // Clear block
  block.textContent = '';

  // --- 1. Top logo/branding area ---
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-logo';
  // Move the first <picture> into logoDiv
  const firstPicture = block.querySelector('picture');
  if (firstPicture) logoDiv.append(firstPicture);
  block.append(logoDiv);

  // --- 2. Green-leaf area with pill buttons ---
  const leafDiv = document.createElement('div');
  leafDiv.className = 'header-leaf-area';

  // Move the next two <picture> elements into leafDiv
  const leafPictures = block.querySelectorAll('p picture');
  leafPictures.forEach(pic => {
    if (pic.parentElement) leafDiv.append(pic.parentElement);
  });

  // Move the <ul> with A-Z payments and Forms into leafDiv
  const pillList = Array.from(block.querySelectorAll('ul')).find(
    ul => Array.from(ul.children).some(li => li.textContent.includes('A-Z payments'))
  );
  if (pillList) leafDiv.append(pillList);

  block.append(leafDiv);

  // --- 3. Navigation bar with login ---
  const navDiv = document.createElement('nav');
  navDiv.className = 'header-nav';

  // Move the <ul> with nav items into navDiv
  const navList = Array.from(block.querySelectorAll('ul')).find(
    ul => Array.from(ul.children).some(li => li.textContent.includes('Home'))
  );
  if (navList) navDiv.append(navList);

  // Move the Login <p> into navDiv
  const loginP = Array.from(block.querySelectorAll('p')).find(
    p => p.textContent.trim() === 'Login'
  );
  if (loginP) {
    loginP.className = 'header-login-btn';
    navDiv.append(loginP);
  }

  block.append(navDiv);
}