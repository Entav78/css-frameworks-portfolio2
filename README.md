# CSS Frameworks – Portfolio 2

A small multi-page app (MPA) that consumes the **Noroff Social API**.  
Built with **Vite**, **vanilla JS**, and **Bootstrap** (CSS + JS). Pages include:

- Home (feed of posts)
- Single Post
- Manage Post (create/update/delete)
- Profile (avatar/banner + user posts)
- Auth (register & login)

The focus of this repo is getting consistent, responsive UI with a light Bootstrap “skin” and a minimal custom stylesheet.

---

## Why this repo exists

This project was created by “lifting” the working parts of an older `js2-ca-hilde` branch and turning it into a clean **main** branch that’s easy to deploy and grade. In short:

- kept the data layer & routing views that already worked,
- replaced scattered CSS with a single `src/styles.css`,
- added Bootstrap via ES imports in `src/app.js`,
- adjusted markup to use Bootstrap utilities/components.

---

## Tech Stack

- **Vite** (MPA setup)
- **Vanilla JS** (modules)
- **Bootstrap 5** (CSS + JS via `app.js`)
- **Noroff Social API v2**
- **Netlify** (deploy)

---

## Getting Started

### Prerequisites

- Node 18+ (LTS recommended)
- A Noroff account (to use the API)

### Setup

```bash
# install
npm install

# dev server
npm run dev

# production build
npm run build
```

Vite serves from `/` in dev and outputs to `dist/` on build.

---

## Environment / API

The project currently uses a hardcoded `API_KEY` in `src/js/api/constants.js`.  
You can switch to env variables if you want:

```js
// constants.js (optional)
export const API_KEY = import.meta.env.VITE_API_KEY || '';
```

Then create a `.env`:

```
VITE_API_KEY=your-api-key-here
```

Auth tokens are stored in `localStorage` as `accessToken` and `userDetails`.

---

## Project Structure

```
.
├─ auth/
│  ├─ login/
│  └─ register/
├─ post/
│  ├─ edit/
│  ├─ manage/
│  └─ index.html          # single post page shell
├─ profile/
│  └─ index.html
├─ public/                # static assets (favicons, images)
├─ src/
│  ├─ app.js              # Bootstrap + styles + nav init
│  ├─ styles.css          # all custom CSS
│  └─ js/
│     ├─ api/             # API endpoints/services
│     ├─ router/          # views (home, post, profile…)
│     ├─ ui/              # small UI helpers/renderers
│     └─ utilities/
├─ index.html             # home page shell
├─ vite.config.js         # Vite MPA inputs
└─ package.json
```

> **MPA note:** Each page has its own `index.html`. Vite copies them into `dist/` so Netlify can serve them as real pages (no SPA 200.html needed).

---

## Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Styling Conventions

- **Bootstrap** is imported in `src/app.js` (CSS + JS bundle).
- **Custom CSS** lives in `src/styles.css` and is intentionally small.
- Each page gets a body class so styling can be scoped without collisions:
  - `page-home`
  - `page-profile`
  - `single-post-page`
- Cards use `.card`, `.card-img-top`, `.card-body`, etc.
- Thumbnails use a fixed **aspect-ratio** for consistent grids:

  ```css
  .post-container .card-img-top {
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }
  ```

---

## Netlify Deployment

**Build command:** `npm run build`  
**Publish directory:** `dist`

Because this is an MPA and pages exist in `dist`, no special redirects are required. If you ever add client-side routes, add a `_redirects` file.

---

## How to Use

1. **Register** a user (Noroff rule: `@noroff.no` or `@stud.noroff.no`).
2. **Login** to store `accessToken` in `localStorage`.
3. **Create/Manage Posts** in **Manage Post**.
4. **Profile** shows avatar/banner and your posts.
5. **Home** lists posts with consistent cards and images.
6. **Single Post** shows a large hero image with capped height for readability.

---

## Known UX Choices

- Navigation is built dynamically in JS (see `src/js/ui/global/navigation.js`).
- Absolute links assume the site is deployed at domain root (Netlify default).
- We keep favicons in `/public` and link them from each page head.

---

## Credits

- **Noroff Social API v2**  
- Bootstrap 5  
- All images belong to their respective owners.

---

## License

MIT
