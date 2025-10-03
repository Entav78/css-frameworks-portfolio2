import { authGuard } from '../../utilities/authGuard.js';
import { Profile } from '../../api/profile/profile.js';
import { basePath } from '../../api/constants.js';

// Enforce authentication
authGuard();

console.log('Profile page script is running');

// Initialize the profile page
(async function initializeProfilePage() {
  if (document.readyState === 'loading') {
    console.log('DOM is still loading, setting event listener');
    document.addEventListener('DOMContentLoaded', setupProfilePage);
  } else {
    console.log('DOM already loaded, running setup directly');
    await setupProfilePage();
  }
})();

async function setupProfilePage() {
  console.log('Setting up profile page');

  try {
    const profileApi = new Profile();
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (!userDetails?.name) {
      console.error('User details are missing or invalid.');
      return;
    }

    const username = userDetails.name;
    console.log('Fetching user profile for:', username);

    // Fetch user profile with posts
    const userProfile = await profileApi.getProfile(username, true);
    const profileData = userProfile?.data;

    if (!profileData) {
      console.error('Failed to fetch user profile data.');
      return;
    }

    // Render profile details and user posts
    renderProfileDetails(profileData);
    renderUserPosts(profileData.posts || [], username);
  } catch (error) {
    console.error('Error fetching user profile or posts:', error.message);
  }
}

function renderProfileDetails({ name, email, bio, avatar, banner }) {
  const detailsEl = document.getElementById('dynamic-profile-details');
  if (!detailsEl) return;

  // Update the left avatar card image (use real avatar if present; otherwise fallback)
  const avatarCard = document.getElementById('fallbackAvatarCard');
  if (avatarCard) {
    const imgEl = avatarCard.querySelector('img');
    if (imgEl) {
      if (avatar?.url) {
        imgEl.src = avatar.url;
        imgEl.alt = avatar.alt || `${name}'s avatar`;
      } else {
        imgEl.src = '/images/IMG_9166.jpg';
        imgEl.alt = 'Hilde and Sasha';
      }
      // ensure correct styling
      imgEl.classList.add('rounded-circle');
      imgEl.style.width = '128px';
      imgEl.style.height = '128px';
      imgEl.style.objectFit = 'cover';
    }
  }

  // Render the profile details card (no extra avatar here—left card handles it)
  detailsEl.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h2 class="h4 card-title mb-1">${name}</h2>
        <p class="text-body-secondary small mb-3">Email: ${email}</p>
        ${bio ? `<p class="mb-3">${bio}</p>` : ''}

        ${
          banner?.url
            ? `<img src="${banner.url}" alt="${banner.alt || 'Profile banner'}"
                   class="img-fluid rounded profile-banner mb-2" />`
            : ''
        }
      </div>
    </div>
  `;
}





function renderUserPosts(posts, username) {
  const container = document.querySelector('.post-container');
  if (!container) return;

  // Header + row container for cards
  container.innerHTML = `
    <h3 class="h5 mb-3">${username}'s Posts</h3>
    <div class="row g-3" id="postsRow"></div>
  `;
  const row = container.querySelector('#postsRow');

  if (!posts.length) {
    row.outerHTML = `<p class="text-body-secondary mb-0">No posts found.</p>`;
    return;
  }

  posts.forEach((post) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4'; // 1 → 2 → 3 columns
    col.innerHTML = `
      <article class="card h-100 shadow-sm">
        ${post.media?.url ? `
        <img
          src="${post.media.url}"
          alt="${post.media.alt || 'Post image'}"
          class="card-img-top profile-thumb"
          loading="lazy"
          decoding="async"
        />
      ` : ''}
        <div class="card-body">
          <h4 class="h6 card-title mb-1">
            <a href="${basePath}/post/?id=${post.id}" class="stretched-link text-decoration-none">
              ${post.title || 'Untitled Post'}
            </a>
          </h4>
          ${
            post.body
              ? `<p class="card-text small text-body-secondary mb-0">${post.body}</p>`
              : ''
          }
        </div>
      </article>
    `;
    row.appendChild(col);
  });
}




