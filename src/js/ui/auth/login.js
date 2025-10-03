

import { Login } from '../../api/auth/login.js';

/**
 * Handles form submission for user login.
 * Sends the email and password to the API and processes the response.
 *
 * @param {Event} event - The form submission event.
 */
export async function onLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const loginInstance = new Login();

  try {
    const userData = await loginInstance.login(data);

    // Save token to localStorage
    localStorage.setItem('accessToken', userData.accessToken);

    console.log('accessToken saved to localStorage:', userData.accessToken);

    // Save user details to localStorage
    const userDetails = {
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar,
      banner: userData.banner,
      bio: userData.bio,
    };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    console.log('User details saved to localStorage:', userDetails);

    // Redirect to profile
    alert('Login successful!');
    window.location.pathname = '/profile/';
  } catch (error) {
    alert(`Login failed: ${error.message}`);
    console.error('Login error:', error);
  }
}
