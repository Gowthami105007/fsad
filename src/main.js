import './style.css';
import { Header } from './components/Header.js';
import { Home } from './views/Home.js';
import { Workshops } from './views/Workshops.js';
import { WorkshopDetail } from './views/WorkshopDetail.js';
import { Admin } from './views/Admin.js';
import { Login } from './views/Login.js';
import { Signup } from './views/Signup.js';
import { Dashboard } from './views/Dashboard.js';
import { FeedbackList } from './views/FeedbackList.js';

const app = document.querySelector('#app');

// Simple Router
const routes = {
  '/': Home,
  '/workshops': Workshops,
  '/dashboard': Dashboard,
  '/admin': Admin,
  '/login': Login,
  '/signup': Signup,
  '/feedback': FeedbackList,
};


function router() {
  const hash = window.location.hash || '#/';
  const pathParts = hash.slice(1).split('/');
  const path = pathParts[1] ? `/${pathParts[1]}` : '/';

  let view = routes[path];
  let args = [];

  // Handle dynamic routes
  if (!view && path === '/workshop' && pathParts[2]) {
    view = WorkshopDetail;
    args = [pathParts[2]];
  }

  if (!view) view = routes['/'];

  app.innerHTML = `
    ${Header()}
    <main>
      ${view(...args)}
    </main>
    <footer style="border-top: 1px solid var(--glass-border); padding: 2rem 0; margin-top: auto; text-align: center; color: var(--text-muted);">
      <div class="container">
        &copy; 2025 SkillForge. All rights reserved.
      </div>
    </footer>
  `;
}

// Video Modal Functionality
window.openVideo = (videoUrl, title) => {
  const modal = document.createElement('div');
  modal.id = 'video-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
  `;

  modal.innerHTML = `
    <div style="width: 100%; max-width: 1200px; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h2 style="color: white; font-size: 1.5rem; font-weight: 700;">${title}</h2>
        <button onclick="closeVideo()" style="background: rgba(255,255,255,0.1); border: none; color: white; font-size: 2rem; cursor: pointer; padding: 0.5rem 1rem; border-radius: 0.5rem; line-height: 1;">×</button>
      </div>
      <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 1rem; background: var(--glass);">
        <iframe 
          src="${videoUrl}" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 1rem;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `;

  modal.onclick = (e) => {
    if (e.target === modal) {
      closeVideo();
    }
  };

  document.body.appendChild(modal);
};

window.closeVideo = () => {
  const modal = document.getElementById('video-modal');
  if (modal) {
    modal.remove();
  }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
