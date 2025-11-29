
import { store } from '../store.js';

export function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    return `
      <div class="container" style="padding: 4rem 0; text-align: center;">
        <h1 style="margin-bottom: 1rem;">Please Login</h1>
        <p style="color: var(--text-muted); margin-bottom: 2rem;">You need to be logged in to view your dashboard.</p>
        <a href="#/login" class="btn btn-primary">Login</a>
      </div>
    `;
  }

  // Mock registrations for demo if none exist
  let registrations = store.getUserRegistrations(currentUser.id);

  // If no registrations, let's show some empty state or mock data for the demo user
  // For this MVP, we'll just show empty state if none

  return `
    <div class="container" style="padding: 4rem 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
          <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 0.5rem;">My Dashboard</h1>
          <p style="color: var(--text-muted);">Welcome back, ${currentUser.name}</p>
        </div>
        <button onclick="localStorage.removeItem('currentUser'); window.location.reload();" class="btn btn-outline">Logout</button>
      </div>

      ${registrations.length === 0 ? `
        <div class="card" style="text-align: center; padding: 4rem 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">No workshops yet</h2>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">You haven't registered for any workshops yet.</p>
          <a href="#/workshops" class="btn btn-primary">Browse Workshops</a>
        </div>
      ` : `
        <div class="grid grid-cols-3">
          ${registrations.map(reg => `
            <div class="card">
              <div style="height: 150px; overflow: hidden; border-radius: 0.5rem; margin-bottom: 1.5rem;">
                <img src="${reg.workshop.image}" alt="${reg.workshop.title}" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${reg.workshop.title}</h3>
              <div style="margin-bottom: 1rem;">
                <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0.25rem;">
                  📅 Session Date: <strong style="color: var(--text);">${new Date(reg.workshop.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</strong>
                </p>
                <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0.25rem;">
                  🕒 Session Time: <strong style="color: var(--text);">${reg.workshop.time}</strong>
                </p>
                <p style="color: var(--text-muted); font-size: 0.875rem;">
                  Registered on ${new Date(reg.date).toLocaleDateString()}
                </p>
              </div>

              ${reg.workshop.videoUrl ? `
                <button onclick="openVideo('${reg.workshop.videoUrl}', '${reg.workshop.title}')" class="btn btn-primary" style="width: 100%;">
                  📹 Watch Session Video
                </button>
              ` : `
                <button class="btn btn-outline" style="width: 100%; cursor: not-allowed; opacity: 0.5;" disabled>
                  Video Not Available
                </button>
              `}
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}
