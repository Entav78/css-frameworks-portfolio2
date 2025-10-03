import { basePath } from '../../api/constants.js';

export class Navigation {
  constructor(containerElements) {
    this.containers = Array.isArray(containerElements)
      ? containerElements
      : [containerElements];
    if (!this.containers || this.containers.length === 0) {
      throw new Error('No valid container elements provided to Navigation.');
    }
  }

  /**
   * Creates a navigation button and appends it to the provided navigation element.
   * @param {HTMLElement} nav - The navigation element to append the button to.
   * @param {string} text - The text to display on the button.
   * @param {string} path - The path to navigate to when the button is clicked.
   * @param {string} className - The CSS class to apply to the button.
   * @param {function} [onClick=null] - An optional click handler.
   * @returns {HTMLElement} - The created button element.
   */
  createButton(nav, text, path, className, onClick = null) {
  const listItem = document.createElement('li');
  listItem.className = 'nav-item';

  const button = document.createElement('a');
  button.textContent = text;
  button.className = `nav-link ${className}`;

  button.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (path) window.location.pathname = path;
  else if (onClick) onClick();
});


  listItem.appendChild(button);
  nav.appendChild(listItem);
  return button;
}


  /**
   * Creates the navigation bar with optional elements like Home and Login/Logout.
   * @param {boolean} isLoggedIn - Whether the user is logged in or not.
   * @param {Object} options - Additional options for the navigation.
   * @param {boolean} options.includeHomeButton - Whether to include the Home button.
   */
  

  createNavbar(isLoggedIn, options = { includeHomeButton: true }) {
    this.containers.forEach((container) => {
      if (!container) {
        console.error('Navigation container not found.');
        return;
      }

      console.log('Updating navigation for container:', container);
      container.innerHTML = ''; // Clear existing navigation content

      const nav = document.createElement('nav');
      const currentPage = window.location.pathname;

if (options.includeHomeButton && currentPage !== '/') {
  this.createButton(nav, 'Home', '/', 'home-button');
}

if (isLoggedIn && currentPage !== '/post/manage/') {
  this.createButton(nav, 'Manage Post', '/post/manage/', 'manage-post-button');
}

if (isLoggedIn) {
  if (currentPage !== '/profile/') {
    this.createButton(nav, 'My Profile', '/profile/', 'profile-button');
  }
  this.createButton(nav, 'Logout', null, 'logout-button', () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userDetails');
    window.location.assign('/'); // go home on logout
  });
} else {
  if (currentPage !== '/auth/login/') {
    this.createButton(nav, 'Login', '/auth/login/', 'login-button');
  }
  if (currentPage !== '/auth/register/') {
    this.createButton(nav, 'Register', '/auth/register/', 'register-button');
  }
}


      // Append the navigation to the current container
      container.appendChild(nav);
    });
  }
}
