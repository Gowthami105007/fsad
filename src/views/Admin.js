 
import { store } from '../store.js';

export function Admin() {
  const workshops = store.getWorkshops();

  // Simple form handling via global function for now (in a real app, use event listeners properly)
  window.handleAddWorkshop = (e) => {
    e.preventDefault();
    const form = e.target;

    let videoUrl = form.videoUrl.value;
    // Convert YouTube watch URL to embed URL if needed
    if (videoUrl) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = videoUrl.match(regExp);
      if (match && match[2].length === 11) {
        videoUrl = `https://www.youtube.com/embed/${match[2]}`;
      }
    }

    const newWorkshop = {
      title: form.title.value,
      date: form.date.value,
      time: form.time.value,
      instructor: form.instructor.value,
      image: form.image.value,
      videoUrl: videoUrl,
      description: form.description.value
    };
    store.addWorkshop(newWorkshop);
    alert('Workshop added successfully!');
    window.location.reload();
  };

  window.handleDeleteWorkshop = (id) => {
    if (confirm('Are you sure?')) {
      store.deleteWorkshop(id);
      window.location.reload();
    }
  };

  return `
    <div class="container" style="padding: 4rem 0;">
      <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 2rem;">Admin Dashboard</h1>
      
      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 4rem;">
        
        <!-- Add Workshop Form -->
        <div class="card">
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">Add New Workshop</h2>
          <form onsubmit="handleAddWorkshop(event)">
            <div>
              <label>Title</label>
              <input type="text" name="title" required placeholder="e.g. Advanced React Patterns">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <label>📅 Session Date</label>
                <input type="date" name="date" required>
              </div>
              <div>
                <label>🕒 Session Time</label>
                <input type="text" name="time" required placeholder="e.g. 10:00 AM">
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
              <div>
                <label>Instructor</label>
                <input type="text" name="instructor" required placeholder="John Doe">
              </div>
            </div>
            <div>
              <label>Image URL</label>
              <input type="url" name="image" required placeholder="https://...">
            </div>
            <div>
              <label>📹 Session Video URL</label>
              <input type="url" name="videoUrl" placeholder="https://www.youtube.com/embed/...">
              <small style="color: var(--text-muted); font-size: 0.75rem; display: block; margin-top: 0.25rem;">Optional: YouTube embed URL</small>
            </div>
            <div>
              <label>Description</label>
              <textarea name="description" rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Add Workshop</button>
          </form>
        </div>

        <!-- Manage Workshops List -->
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">Manage Workshops</h2>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${workshops.map(workshop => `
              <div class="card" style="display: flex; gap: 1.5rem; align-items: center; padding: 1rem;">
                <img src="${workshop.image}" alt="${workshop.title}" style="width: 80px; height: 80px; border-radius: 0.5rem; object-fit: cover;">
                <div style="flex: 1;">
                  <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.25rem;">${workshop.title}</h3>
                  <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0.25rem;">📅 ${new Date(workshop.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} • 🕒 ${workshop.time}</p>
                  <p style="color: var(--text-muted); font-size: 0.875rem;">👨‍🏫 ${workshop.instructor}</p>
                </div>
                <button onclick="handleDeleteWorkshop(${workshop.id})" class="btn btn-outline" style="color: var(--secondary); border-color: var(--secondary);">Delete</button>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}
