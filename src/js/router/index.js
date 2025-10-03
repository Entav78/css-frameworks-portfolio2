import { basePath } from '../api/constants.js';

export default async function router(pathname = window.location.pathname) {
  console.log('Router running');

  const cleanPathname = pathname.replace(basePath, '') || '/';
  console.log('Clean Pathname:', cleanPathname);

  try {
    switch (cleanPathname) {
      case '/':
        console.log('Loading home view');
        await import('./views/home.js');
        break;
      case '/auth/':
        await import('./views/auth.js');
        break;
      case '/auth/login/':
        console.log('Attempting to load login.js...');
        try {
          const loginModule = await import('./views/login.js');
          console.log('Login module loaded:', loginModule);
          loginModule.initializeLoginPage();
        } catch (error) {
          console.error('Error loading login module:', error.message);
        }
        break;
      case '/auth/register/':
        await import('./views/register.js');
        break;
      case '/post/':
        await import('./views/post.js');
        break;
      case '/post/edit/':
        await import('./views/postEdit.js');
        break;
      case '/post/manage/':
        await import('./views/postManage.js');
        break;
      case '/profile/':
        await import('./views/profile.js');
        break;
      default:
        await import('./views/notFound.js');
    }
  } catch (error) {
    console.error('Router Error:', error.message);
  }
}


