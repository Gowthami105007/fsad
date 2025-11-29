
import { store } from '../store.js';

export function Login() {
  // Helper to generate random string
  const generateCode = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Initialize captcha
  let currentCaptcha = generateCode();
  window.captchaValue = currentCaptcha;

  window.refreshCaptcha = () => {
    const newCode = generateCode();
    window.captchaValue = newCode;
    const captchaDisplay = document.getElementById('captcha-display');
    if (captchaDisplay) {
      captchaDisplay.textContent = newCode;
    }
  };

  window.handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const captchaInput = e.target.captcha.value;

    // Validate Captcha
    if (captchaInput !== window.captchaValue) {
      alert('Incorrect CAPTCHA. Please try again.');
      return;
    }

    // Get registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find(u => u.email === email);

    // Check if user exists
    if (!user) {
      alert('No account found with this email. Please sign up first!');
      window.location.hash = '#/signup';
      return;
    }

    // Validate password
    if (user.password !== password) {
      alert('Incorrect password. Please try again.');
      return;
    }

    // Login successful - save to localStorage
    const currentUser = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    window.location.hash = '#/dashboard';
    window.location.reload();
  };

  return `
    <div class="container" style="padding: 4rem 0; max-width: 500px;">
      <div class="card">
        <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem; text-align: center;">Welcome Back</h1>
        <p style="text-align: center; color: var(--text-muted); margin-bottom: 2rem;">Login to access your dashboard</p>
        
        <form onsubmit="handleLogin(event)">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email Address</label>
            <input type="email" name="email" required placeholder="john@example.com" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: 0.5rem; background: var(--glass); color: var(--text); font-size: 1rem;">
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Password</label>
            <input type="password" name="password" required placeholder="Enter your password" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: 0.5rem; background: var(--glass); color: var(--text); font-size: 1rem;">
          </div>

          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Security Check</label>
            <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.5rem;">
                <div id="captcha-display" style="
                    background: rgba(255, 255, 255, 0.1);
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    font-family: monospace;
                    font-size: 1.5rem;
                    letter-spacing: 4px;
                    font-weight: bold;
                    user-select: none;
                    border: 1px solid var(--glass-border);
                    min-width: 120px;
                    text-align: center;
                ">${currentCaptcha}</div>
                <button type="button" onclick="refreshCaptcha()" style="
                    background: none;
                    border: none;
                    color: var(--primary);
                    cursor: pointer;
                    font-size: 0.9rem;
                    text-decoration: underline;
                ">Refresh</button>
            </div>
            <input type="text" name="captcha" required placeholder="Enter the code above" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: 0.5rem; background: var(--glass); color: var(--text); font-size: 1rem;">
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.875rem; font-size: 1rem; font-weight: 600;">Login</button>
        </form>
        
        <div style="margin-top: 1.5rem; text-align: center; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">
          <p style="color: var(--text-muted);">
            Don't have an account? 
            <a href="#/signup" style="color: var(--primary); text-decoration: none; font-weight: 600; margin-left: 0.25rem;">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  `;
}
