
import { store } from '../store.js';

export function FeedbackList() {
    const feedbacks = store.getAllFeedbacks();

    return `
    <div class="container" style="padding: 4rem 0;">
      <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 2rem;">All Feedbacks</h1>
      
      ${feedbacks.length === 0 ? `
        <div class="card" style="text-align: center; padding: 4rem 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">No feedbacks yet</h2>
          <p style="color: var(--text-muted);">Feedbacks submitted by users will appear here.</p>
        </div>
      ` : `
        <div class="grid grid-cols-3">
          ${feedbacks.map(f => {
        const workshop = store.getWorkshop(f.workshopId);
        return `
              <div class="card">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                  <span style="font-weight: 600;">${f.name}</span>
                  <span style="color: var(--primary); font-weight: 600;">${'★'.repeat(f.rating)}${'☆'.repeat(5 - f.rating)}</span>
                </div>
                <p style="color: var(--text-muted); margin-bottom: 1rem; font-style: italic;">"${f.comments}"</p>
                
                <div style="border-top: 1px solid var(--glass-border); padding-top: 1rem; margin-top: auto;">
                  <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.25rem;">
                    Workshop: <strong style="color: var(--text-main);">${workshop ? workshop.title : 'Unknown Workshop'}</strong>
                  </p>
                  <p style="font-size: 0.75rem; color: var(--text-muted);">
                    ${new Date(f.date).toLocaleDateString()} • ${new Date(f.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            `;
    }).join('')}
        </div>
      `}
    </div>
  `;
}
