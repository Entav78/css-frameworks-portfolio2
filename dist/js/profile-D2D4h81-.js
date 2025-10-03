import{a as d}from"./authGuard-Bc6VeQ6b.js";import{h as n}from"./headers-Bv46HF1c.js";import{b as f}from"./app-CxrOAxwR.js";class p{constructor(t="https://v2.api.noroff.dev/social/profiles"){this.baseApiUrl=t}async getProfile(t,r=!1){if(!t)throw new Error("Username is required to fetch a profile.");const s=`${this.baseApiUrl}/${t}?_posts=${r}`;console.log("Fetching from API URL:",s);try{const e=n();console.log("Headers being sent:",{"Content-Type":e.get("Content-Type"),Authorization:e.get("Authorization")});const o=await fetch(s,{headers:e});if(!o.ok)throw console.error("API response status:",o.status),new Error(`Failed to fetch profile data: ${o.status}`);const l=await o.json();return console.log("Profile data:",l),console.log("Full API response for profile:",l),l}catch(e){throw console.error("Error fetching profile data:",e.message),e}}async getProfiles(t=10,r=1){const s=`${this.baseApiUrl}?limit=${t}&page=${r}`;try{const e=await fetch(s,{headers:n()});if(!e.ok)throw new Error("Failed to fetch profiles");const o=await e.json();return console.log("Profiles data:",o),o}catch(e){throw console.error("Error fetching profiles:",e.message),e}}}d();console.log("Profile page script is running");(async function(){document.readyState==="loading"?(console.log("DOM is still loading, setting event listener"),document.addEventListener("DOMContentLoaded",c)):(console.log("DOM already loaded, running setup directly"),await c())})();async function c(){console.log("Setting up profile page");try{const a=new p,t=JSON.parse(localStorage.getItem("userDetails"));if(!t?.name){console.error("User details are missing or invalid.");return}const r=t.name;console.log("Fetching user profile for:",r);const e=(await a.getProfile(r,!0))?.data;if(!e){console.error("Failed to fetch user profile data.");return}u(e),g(e.posts||[],r)}catch(a){console.error("Error fetching user profile or posts:",a.message)}}function u({name:a,email:t,bio:r,avatar:s,banner:e}){const o=document.getElementById("dynamic-profile-details");if(!o)return;const l=document.getElementById("fallbackAvatarCard");if(l){const i=l.querySelector("img");i&&(s?.url?(i.src=s.url,i.alt=s.alt||`${a}'s avatar`):(i.src="/images/IMG_9166.jpg",i.alt="Hilde and Sasha"),i.classList.add("rounded-circle"),i.style.width="128px",i.style.height="128px",i.style.objectFit="cover")}o.innerHTML=`
    <div class="card">
      <div class="card-body">
        <h2 class="h4 card-title mb-1">${a}</h2>
        <p class="text-body-secondary small mb-3">Email: ${t}</p>
        ${r?`<p class="mb-3">${r}</p>`:""}

        ${e?.url?`<img src="${e.url}" alt="${e.alt||"Profile banner"}"
                   class="img-fluid rounded profile-banner mb-2" />`:""}
      </div>
    </div>
  `}function g(a,t){const r=document.querySelector(".post-container");if(!r)return;r.innerHTML=`
    <h3 class="h5 mb-3">${t}'s Posts</h3>
    <div class="row g-3" id="postsRow"></div>
  `;const s=r.querySelector("#postsRow");if(!a.length){s.outerHTML='<p class="text-body-secondary mb-0">No posts found.</p>';return}a.forEach(e=>{const o=document.createElement("div");o.className="col-12 col-sm-6 col-lg-4",o.innerHTML=`
      <article class="card h-100 shadow-sm">
        ${e.media?.url?`<img src="${e.media.url}" alt="${e.media.alt||"Post image"}"
                 class="card-img-top post-image" />`:""}
        <div class="card-body">
          <h4 class="h6 card-title mb-1">
            <a href="${f}/post/?id=${e.id}" class="stretched-link text-decoration-none">
              ${e.title||"Untitled Post"}
            </a>
          </h4>
          ${e.body?`<p class="card-text small text-body-secondary mb-0">${e.body}</p>`:""}
        </div>
      </article>
    `,s.appendChild(o)})}
