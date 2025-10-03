// Function to extract the post ID from the URL
function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Import required services
import { PostService } from '../../api/post/postService.js';
import { basePath } from '../../api/constants.js';

// Initialize PostService instance
const postService = new PostService();

// Function to load and display the post
async function loadPost() {
  const postId = getPostIdFromUrl();

  if (!postId) {
    displayMessage('Post not found.');
    return;
  }

  try {
    const post = await postService.readPost(postId);
    console.log('Loaded post:', post);

    displayPost(post);
    displayEditDeleteButtons(post);
  } catch (error) {
    console.error('Error loading post:', error);
    displayMessage(`Error loading post: ${error.message}`);
  }
}

function displayPost(post) {
  const postData = post.data;
  const postContainer = document.querySelector('.post-container');
  if (!postContainer) return;

  postContainer.innerHTML = `
    <article class="container py-4">
      <header class="mb-3">
        <h1 class="h3 mb-2">${postData.title || 'Untitled Post'}</h1>
        ${postData.tags?.length ? `<p class="text-body-secondary small mb-0">Tags: ${postData.tags.join(', ')}</p>` : ''}
      </header>

      ${postData.media?.url ? `
        <figure class="card shadow-sm mb-3">
          <img
            src="${postData.media.url}"
            alt="${postData.media.alt || 'Post image'}"
            class="card-img-top img-fluid w-100"
          />
        </figure>` : `<p class="text-body-secondary">No image available.</p>`}

      ${postData.body ? `<p class="lead">${postData.body}</p>` : ''}

      <p class="text-body-secondary small mb-0">
        Created: ${postData.created ? new Date(postData.created).toLocaleString() : 'Unknown'}
        ${postData.updated ? ` — Updated: ${new Date(postData.updated).toLocaleString()}` : ''}
      </p>
    </article>
  `;
}


// Function to display edit and delete buttons
function displayEditDeleteButtons(post) {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  if (userDetails?.name === post.author?.name) {
    const buttonsContainer = document.querySelector('.buttons-container');
    if (!buttonsContainer) {
      console.error('Buttons container not found.');
      return;
    }

    buttonsContainer.innerHTML = '';

    // Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Post';
    editButton.className = 'btn btn-primary';
    editButton.addEventListener('click', () => {
      window.location.pathname = `${basePath}/post/manage/?id=${post.id}`;
    });
    buttonsContainer.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Post';
    deleteButton.className = 'btn btn-danger';
    deleteButton.addEventListener('click', async () => {
      const confirmation = confirm(
        'Are you sure you want to delete this post?'
      );
      if (confirmation) {
        try {
          await postService.deletePost(post.id);
          alert('Post deleted successfully.');
          window.location.pathname = `${basePath}/`;
        } catch (error) {
          alert(`Error deleting post: ${error.message}`);
        }
      }
    });
    buttonsContainer.appendChild(deleteButton);
  }
}

// Function to display messages
function displayMessage(message) {
  const postContainer = document.querySelector('.post-container');
  if (postContainer) {
    postContainer.innerHTML = `<p>${message}</p>`;
  }
}

// Ensure DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPost);
} else {
  loadPost();
}
