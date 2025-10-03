
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap CSS
import './styles.css';                         // your minimal fixes (see below)
import 'bootstrap';                            // JS for offcanvas, etc.

import router from './js/router/index.js';
import { Navigation } from './js/ui/global/navigation.js';

function initializeNavigation() {
  const wide = document.querySelector('.navbar-nav');
  const side = document.querySelector('.offcanvas-body .navbar-nav');
  const containers = [wide, side].filter(Boolean);
  if (!containers.length) return;

  const navigation = new Navigation(containers);

  const update = () => {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    navigation.createNavbar(isLoggedIn, { includeHomeButton: true });
  };

  update();
  window.addEventListener('storage', (e) => {
    if (e.key === 'accessToken') update();
  });
}

async function initializeApp() {
  initializeNavigation();
  await router(window.location.pathname);
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', initializeApp)
  : initializeApp();


