// Function to extract the post ID from the URL
function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

import { PostService } from '../../api/post/postService.js';
import { basePath } from '../../api/constants.js';

const postService = new PostService();

async function loadPost() {
  const postId = getPostIdFromUrl();
  if (!postId) return displayMessage('Post not found.');

  try {
    const post = await postService.readPost(postId);
    displayPost(post);
    displayEditDeleteButtons(post);
  } catch (err) {
    displayMessage(`Error loading post: ${err.message}`);
  }
}

function displayPost(post) {
  const postData = post.data;
  const el = document.querySelector('.post-container');
  if (!el) return;

  el.innerHTML = `
    <article>
      <header class="mb-3">
        <h1 class="h3 mb-1">${postData.title || 'Untitled Post'}</h1>
        ${postData.tags?.length
          ? `<p class="text-body-secondary small mb-0">Tags: ${postData.tags.join(', ')}</p>`
          : ''
        }
      </header>

      ${
        postData.media?.url
          ? `
            <figure class="card shadow-sm mb-3 post-hero">
              <img src="${postData.media.url}"
                   alt="${postData.media.alt || 'Post image'}"
                   class="card-img-top img-fluid w-100"
                   loading="lazy" decoding="async" />
            </figure>`
          : `<p class="text-body-secondary">No image available.</p>`
      }

      ${postData.body ? `<p class="lead">${postData.body}</p>` : ''}

      <p class="text-body-secondary small mb-0">
        Created: ${postData.created ? new Date(postData.created).toLocaleString() : 'Unknown'}
        ${postData.updated ? ` — Updated: ${new Date(postData.updated).toLocaleString()}` : ''}
      </p>
    </article>
  `;
}

function displayEditDeleteButtons(post) {
  const user = JSON.parse(localStorage.getItem('userDetails'));
  if (user?.name !== post.author?.name) return;

  const wrap = document.querySelector('.buttons-container');
  if (!wrap) return;

  wrap.innerHTML = '';

  const edit = document.createElement('a');
  edit.className = 'btn btn-primary me-2';
  edit.textContent = 'Edit Post';
  edit.href = `${basePath}/post/manage/?id=${post.id}`;

  const del = document.createElement('button');
  del.className = 'btn btn-danger';
  del.textContent = 'Delete Post';
  del.addEventListener('click', async () => {
    if (!confirm('Delete this post?')) return;
    try {
      await postService.deletePost(post.id);
      alert('Post deleted.');
      window.location.assign(`${basePath}/`);
    } catch (e) {
      alert(`Error deleting post: ${e.message}`);
    }
  });

  wrap.append(edit, del);
}

function displayMessage(msg) {
  const el = document.querySelector('.post-container');
  if (el) el.innerHTML = `<p class="text-body-secondary">${msg}</p>`;
}

// boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPost);
} else {
  loadPost();
}
