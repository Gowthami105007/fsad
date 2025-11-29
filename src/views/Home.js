
import { store } from '../store.js';

export function Home() {
  const featuredWorkshops = store.getWorkshops().slice(0, 3);

  return `
    <div>
      <!-- Hero Section -->
      <section style="padding: 8rem 0; text-align: center; position: relative; overflow: hidden;">
        <div class="container" style="position: relative; z-index: 10;">
          <h1 style="font-size: 4rem; font-weight: 800; margin-bottom: 1.5rem; line-height: 1.1;">
            Master New Skills with <br />
            <span class="text-gradient">Expert-Led Workshops</span>
          </h1>
          <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 3rem;">
            Join live interactive sessions with industry professionals. Elevate your career with hands-on training in the latest technologies.
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <a href="#/workshops" class="btn btn-primary">Browse Workshops</a>
            <a href="#/login" class="btn btn-outline">Login</a>
          </div>
        </div>
        
        <!-- Background Glow -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 600px; background: var(--primary); opacity: 0.1; filter: blur(100px); border-radius: 50%; z-index: 0;"></div>
      </section>

      <!-- Featured Workshops -->
      <section class="container" style="padding-bottom: 6rem;">
        <div style="display: flex; justify-content: space-between; align-items: end; margin-bottom: 3rem;">
          <div>
            <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem;">Featured Workshops</h2>
            <p style="color: var(--text-muted);">Hand-picked sessions for you</p>
          </div>
          <a href="#/workshops" style="color: var(--primary); font-weight: 600;">View All -></a>
        </div>

        <div class="grid grid-cols-3">
          ${featuredWorkshops.map(workshop => `
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
      </section>
    </div>
  `;
}
