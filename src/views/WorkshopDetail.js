
import { store } from '../store.js';

export function WorkshopDetail(id) {
  const workshop = store.getWorkshop(id);
  const feedbacks = store.getWorkshopFeedbacks(id);

  if (!workshop) {
    return `<div class="container" style="padding: 4rem 0;"><h1>Workshop not found</h1></div>`;
  }

  return `
    <div class="container" style="padding: 4rem 0;">
      <a href="#/workshops" style="display: inline-block; margin-bottom: 2rem; color: var(--text-muted);">&larr; Back to Workshops</a>
      
      <div style="display: grid; grid-template-columns: 1fr 350px; gap: 4rem; align-items: start;">
        <div>
          <h1 style="font-size: 3.5rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.1;">${workshop.title}</h1>
          <p style="font-size: 1.25rem; color: var(--text-muted); margin-bottom: 2rem;">
            Hosted by <span style="color: var(--text-main); font-weight: 600;">${workshop.instructor}</span>
          </p>
          
          <div style="height: 400px; overflow: hidden; border-radius: 1rem; margin-bottom: 2rem;">
            <img src="${workshop.image}" alt="${workshop.title}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>

          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">About this workshop</h2>
          <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem;">
            ${workshop.description}
          </p>

          <div style="margin-top: 4rem; border-top: 1px solid var(--glass-border); padding-top: 2rem;">
            <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">Leave Feedback</h2>
            <form onsubmit="handleFeedbackSubmit(event, ${workshop.id})">
              <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-muted);">Name</label>
                <input type="text" name="name" required placeholder="Your Name" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: 0.5rem; background: var(--glass); color: var(--text-main); font-size: 1rem;">
              </div>
              
              <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-muted);">Email</label>
                <input type="email" name="email" required placeholder="Your Email" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: 0.5rem; background: var(--glass); color: var(--text-main); font-size: 1rem;">
              </div>
              
              <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-muted);">Rating</label>
                <select name="rating" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: 0.5rem; background: var(--glass); color: var(--text-main); font-size: 1rem;">
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              
              <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-muted);">Comments</label>
                <textarea name="comments" required placeholder="Share your experience..." rows="4" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: 0.5rem; background: var(--glass); color: var(--text-main); font-size: 1rem; font-family: inherit;"></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary">Submit Feedback</button>
            </form>
          </div>

          <div style="margin-top: 4rem;">
            <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">Reviews</h2>
            ${feedbacks.length === 0 ? `
              <p style="color: var(--text-muted);">No reviews yet. Be the first to leave one!</p>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                ${feedbacks.map(f => `
                  <div class="card" style="padding: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                      <span style="font-weight: 600;">${f.name}</span>
                      <span style="color: var(--primary); font-weight: 600;">${'★'.repeat(f.rating)}${'☆'.repeat(5 - f.rating)}</span>
                    </div>
                    <p style="color: var(--text-muted); margin-bottom: 0.5rem;">${f.comments}</p>
                    <small style="color: var(--text-muted); font-size: 0.75rem;">${new Date(f.date).toLocaleDateString()}</small>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>

        <div class="card" style="position: sticky; top: 100px;">
          <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">Registration Details</h3>
          
          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="color: var(--text-muted);">Date</span>
              <span style="font-weight: 600;">${workshop.date}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="color: var(--text-muted);">Time</span>
              <span style="font-weight: 600;">${workshop.time}</span>
            </div>

          </div>

          <button onclick="handleRegister(${workshop.id})" class="btn btn-primary" style="width: 100%;">Register Now</button>
          <p style="font-size: 0.875rem; color: var(--text-muted); text-align: center; margin-top: 1rem;">
            Limited spots available
          </p>
        </div>
      </div>
    </div>
  `;
}

window.handleRegister = (workshopId) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    alert('Please login to register');
    window.location.hash = '#/login';
    return;
  }

  store.registerForWorkshop(currentUser.id, workshopId);
  alert('Successfully registered!');
  window.location.hash = '#/dashboard';
};

window.handleFeedbackSubmit = (e, workshopId) => {
  e.preventDefault();
  const form = e.target;
  const feedback = {
    workshopId: workshopId,
    name: form.name.value,
    email: form.email.value,
    rating: parseInt(form.rating.value),
    comments: form.comments.value
  };

  store.addFeedback(feedback);
  alert('Thank you for your feedback!');
  form.reset();

  // Reload the current view to show the new feedback
  window.location.reload();
};
