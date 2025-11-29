
import { store } from '../store.js';

export function Signup() {
  window.handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Validate full name (only letters and spaces allowed)
    const namePattern = /^[a-zA-Z\s]+$/;
    const nameError = document.getElementById('nameError');
    const nameInput = e.target.name;

    if (!namePattern.test(name)) {
      nameError.style.display = 'block';
      nameInput.style.borderColor = '#ef4444';
      nameInput.focus();
      return;
    } else {
      nameError.style.display = 'none';
      nameInput.style.borderColor = 'var(--glass-border)';
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = existingUsers.find(u => u.email === email);

    if (userExists) {
      alert('User with this email already exists! Please login instead.');
      window.location.hash = '#/login';
      return;
    }

    // Register new user
    const user = { id: Date.now(), name, email, password };
    existingUsers.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    // Also register in store
    store.registerUser(name, email);

    alert('Signup successful! Please login now.');
    window.location.hash = '#/login';
  };

  window.validateNameInput = (input) => {
    const namePattern = /^[a-zA-Z\s]+$/;
    const nameError = document.getElementById('nameError');
    const value = input.value.trim();

    if (value && !namePattern.test(value)) {
      nameError.style.display = 'block';
      input.style.borderColor = '#ef4444';
    } else {
      nameError.style.display = 'none';
      input.style.borderColor = 'var(--glass-border)';
    }
  };

  return `
    <div class="container" style="padding: 4rem 0; max-width: 500px;">
      <div class="card">
        <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem; text-align: center;">Create Account</h1>
        <p style="text-align: center; color: var(--text-muted); margin-bottom: 2rem;">Join SkillForge to access amazing workshops</p>
        
        <form onsubmit="handleSignup(event)">
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Full Name</label>
            <input type="text" name="name" required placeholder="John Doe" oninput="validateNameInput(this)" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: 0.5rem; background: var(--glass); color: var(--text); font-size: 1rem;">
            <span id="nameError" style="display: none; color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; display: none;">Please enter a valid name (letters and spaces only, no numbers)</span>
          </div>
          
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email Address</label>
            <input type="email" name="email" required placeholder="john@example.com" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: 0.5rem; background: var(--glass); color: var(--text); font-size: 1rem;">
          </div>
          
          <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Password</label>
            <input type="password" name="password" required minlength="6" placeholder="Minimum 6 characters" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: 0.5rem; background: var(--glass); color: var(--text); font-size: 1rem;">
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Confirm Password</label>
            <input type="password" name="confirmPassword" required minlength="6" placeholder="Re-enter password" style="width: 100%; padding: 0.75rem; border: 1px solid var(--glass-border); border-radius: 0.5rem; background: var(--glass); color: var(--text); font-size: 1rem;">
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.875rem; font-size: 1rem; font-weight: 600;">Sign Up</button>
        </form>
        
        <div style="margin-top: 1.5rem; text-align: center; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">
          <p style="color: var(--text-muted);">
            Already have an account? 
            <a href="#/login" style="color: var(--primary); text-decoration: none; font-weight: 600; margin-left: 0.25rem;">Login here</a>
          </p>
        </div>
      </div>
    </div>
  `;
}
