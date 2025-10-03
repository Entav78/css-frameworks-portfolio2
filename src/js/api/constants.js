// Use Postman, or JavaScript to get your API key = e87bb321-e9d6-4af1-97fb-1bc12fe26578
// In Workflow we will learn how to secure this information
//export const API_KEY = import.meta.env.VITE_API_KEY || "";//

export const API_KEY = 'e87bb321-e9d6-4af1-97fb-1bc12fe26578';

export const API_BASE = 'https://v2.api.noroff.dev';

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`;

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;

export const basePath = '';

/*Social endpoints:
social-posts (social posts related endpoints)
GET/social/posts
POST/social/posts
GET/social/posts/following
GET/social/posts/search
PUT/social/posts/{id}
DELETE/social/posts/
GET/social/posts/{id}
PUT/social/posts/{id}/react/{symbol}
POST/social/posts/{id}/comment
DELETE/social/posts/{id}/comment/{commentId}

social-profiles (social profiles related endpoints)
GET/social/profiles
GET/social/profiles/{name}
PUT/social/profiles/{name}
GET/social/profiles/search
PUT/social/profiles/{name}/follow
PUT/social/profiles/{name}/unfollow
GET/social/profiles/{name}/posts
*/
