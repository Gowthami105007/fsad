

export function Header() {
  // Define logout handler
  window.handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.hash = '#/login';
    window.location.reload();
  };

  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  return `
    <header style="background: var(--glass); backdrop-filter: blur(12px); border-bottom: 1px solid var(--glass-border); position: sticky; top: 0; z-index: 100;">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; height: 80px;">
        <a href="#/" style="font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
          <span class="text-gradient">SkillForge</span>
        </a>
        
        <nav style="display: flex; gap: 2rem; align-items: center;">
          <a href="#/" style="font-weight: 500; color: var(--text-muted); transition: color 0.2s;">Home</a>
          <a href="#/workshops" style="font-weight: 500; color: var(--text-muted); transition: color 0.2s;">Workshops</a>
          <a href="#/dashboard" style="font-weight: 500; color: var(--text-muted); transition: color 0.2s;">My Dashboard</a>
          <a href="#/admin" style="font-weight: 500; color: var(--text-muted); transition: color 0.2s;">Admin</a>
          <a href="#/feedback" style="font-weight: 500; color: var(--text-muted); transition: color 0.2s;">Feedback</a>
          ${currentUser ? `
            <button onclick="handleLogout()" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
              Logout
            </button>
          ` : `
            <a href="#/login" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem; text-decoration: none;">
              Login
            </a>
          `}
        </nav>
      </div>
    </header>
  `;
}
 
