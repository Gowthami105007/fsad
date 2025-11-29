
import { store } from '../store.js';

export function Workshops() {
  const workshops = store.getWorkshops();

  return `
    <div class="container" style="padding: 4rem 0;">
      <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 2rem;">All Workshops</h1>
      
      <div class="grid grid-cols-3">
        ${workshops.map(workshop => `
          <div class="card">
            <div style="height: 200px; overflow: hidden; border-radius: 0.5rem; margin-bottom: 1.5rem;">
              <img src="${workshop.image}" alt="${workshop.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s;">
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
              <span style="font-size: 0.875rem; color: var(--primary); font-weight: 600; background: rgba(99, 102, 241, 0.1); padding: 0.25rem 0.75rem; border-radius: 1rem;">
                ${workshop.date}
              </span>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${workshop.title}</h3>
            <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1.5rem; line-height: 1.6;">
              ${workshop.description.substring(0, 100)}...
            </p>
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
              <div style="width: 32px; height: 32px; background: var(--border); border-radius: 50%;"></div>
              <span style="font-size: 0.875rem; color: var(--text-muted);">By ${workshop.instructor}</span>
            </div>
            <a href="#/workshop/${workshop.id}" class="btn btn-outline" style="width: 100%;">View Details</a>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
