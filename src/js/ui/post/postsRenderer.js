import { basePath } from '../../api/constants.js';

export class PostsRenderer {
  constructor(containerClass) {
    this.containerClass = containerClass; // e.g. 'post-container'
    this.container = null;
  }

  /**
   * Initialize and render posts
   * @param {Function} fetchPostsFunction - async () => { data: Post[] } | Post[]
   */
  async init(fetchPostsFunction) {
    this.container = document.querySelector(`.${this.containerClass}`);
    if (!this.container) {
      console.error(`Container ".${this.containerClass}" not found.`);
      return;
    }

    // Turn container into a Bootstrap grid row
    this.container.classList.add('row', 'g-3');

    try {
      const result = await fetchPostsFunction();
      const posts = Array.isArray(result) ? result : result?.data || [];

      if (!posts.length) {
        this.renderMessage('No posts available.');
        return;
      }

      this.renderPosts(posts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      this.renderMessage(`Error loading posts: ${err.message}`);
    }
  }

  /**
   * Render a list of posts
   */
  renderPosts(posts) {
    // Clear the row
    this.container.innerHTML = '';

    const row = document.createElement('div');
    row.className = 'row g-3';

    posts.forEach((post) => {
    const col = this.createPostElement(post); // returns <div class="col-12 col-sm-6 col-lg-4">
    row.appendChild(col);
  });

  this.container.appendChild(row);
}

  /**
   * Create a single post card wrapped in a Bootstrap col
   * Returns: <div class="col-12 col-sm-6 col-lg-4">...</div>
   */
  createPostElement(post) {
    // Column wrapper
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-lg-4';

    // Card
    const card = document.createElement('article');
    card.className = 'card h-100 shadow-sm';

    // Image (top)
    if (post.media?.url) {
      const img = document.createElement('img');
      img.src = post.media.url;
      img.alt = post.media.alt || 'Post image';
      img.className = 'card-img-top img-fluid'; 
      img.loading = 'lazy';
      img.decoding = 'async';
      card.appendChild(img);
    }


    // Body
    const body = document.createElement('div');
    body.className = 'card-body';

    // Title (link to single post)
    const title = document.createElement('h3');
    title.className = 'h6 card-title mb-1';

    const link = document.createElement('a');
    link.href = `${basePath}/post/?id=${post.id}`;
    link.className = 'stretched-link text-decoration-none';
    link.textContent = post.title || 'Untitled Post';
    title.appendChild(link);

    // Excerpt
    const excerpt = document.createElement('p');
    excerpt.className = 'card-text small text-body-secondary mb-0';
    const text = post.body || '';
    excerpt.textContent = text.length > 140 ? `${text.slice(0, 140)}…` : text;

    // Optional tags (tiny helper)
    if (post.tags?.length) {
      const tags = document.createElement('div');
      tags.className = 'mt-2 small text-body-tertiary';
      tags.textContent = `Tags: ${post.tags.join(', ')}`;
      body.append(title, excerpt, tags);
    } else {
      body.append(title, excerpt);
    }

    card.appendChild(body);
    col.appendChild(card);
    return col;
  }

  /**
   * Render a simple message (keeps the row but shows one full-width card)
   */
  renderMessage(message) {
  this.container.innerHTML = '';
  const row = document.createElement('div');
  row.className = 'row g-3';

  const col = document.createElement('div');
  col.className = 'col-12';
  col.innerHTML = `
    <div class="card border-0 bg-body-secondary-subtle">
      <div class="card-body"><p class="mb-0">${message}</p></div>
    </div>
  `;

  row.appendChild(col);
  this.container.appendChild(row);
}

}

