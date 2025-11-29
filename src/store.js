
const STORAGE_KEY = 'workshop_platform_data_2025_v6';

const initialState = {
  workshops: [
    {
      id: 1,
      title: 'Mastering React 19',
      date: '2025-12-15',
      time: '10:00 AM',
      description: 'Deep dive into the new features of React 19. Learn about the new compiler, server actions, and more.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
      instructor: 'Sarah Jenkins',
      videoUrl: 'https://www.youtube.com/embed/dCLhUialKPQ'

    },
    {
      id: 2,
      title: 'Advanced CSS Animations',
      date: '2025-12-20',
      time: '02:00 PM',
      description: 'Create stunning animations using only CSS. We will cover keyframes, transitions, and 3D transforms.',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop',
      instructor: 'Mike Chen',
      videoUrl: 'https://www.youtube.com/embed/uQNpr09UOAY'

    },
    {
      id: 3,
      title: 'Node.js Microservices',
      date: '2025-01-05',
      time: '11:00 AM',
      description: 'Architecting scalable microservices with Node.js and Docker. Best practices for production.',
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1974&auto=format&fit=crop',
      instructor: 'Alex Rivera',
      videoUrl: 'https://www.youtube.com/embed/_f7h6xQXiLA'

    },
    {
      id: 4,
      title: 'Python for Data Science',
      date: '2025-01-10',
      time: '09:00 AM',
      description: 'Learn data analysis and visualization with Python, Pandas, and Matplotlib.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
      instructor: 'Jessica Lee',
      videoUrl: 'https://www.youtube.com/embed/CMEWVn1uZpQ'

    }
  ],
  users: [],
  registrations: [],
  feedbacks: []
};

let savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
let state = savedState ? { ...initialState, ...savedState } : initialState;

// Ensure arrays are actually arrays (in case of corruption)
if (!Array.isArray(state.workshops)) state.workshops = initialState.workshops;
if (!Array.isArray(state.users)) state.users = [];
if (!Array.isArray(state.registrations)) state.registrations = [];
if (!Array.isArray(state.feedbacks)) state.feedbacks = [];

const saveState = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const store = {
  getWorkshops: () => state.workshops,

  getWorkshop: (id) => state.workshops.find(w => w.id === parseInt(id)),

  addWorkshop: (workshop) => {
    const newWorkshop = { ...workshop, id: Date.now() };
    state.workshops.push(newWorkshop);
    saveState();
    return newWorkshop;
  },

  deleteWorkshop: (id) => {
    state.workshops = state.workshops.filter(w => w.id !== id);
    saveState();
  },

  registerUser: (name, email) => {
    const user = { id: Date.now(), name, email };
    state.users.push(user);
    saveState();
    return user;
  },

  registerForWorkshop: (userId, workshopId) => {
    const registration = { userId, workshopId, date: new Date().toISOString() };
    state.registrations.push(registration);
    saveState();
    return registration;
  },

  getUserRegistrations: (userId) => {
    return state.registrations
      .filter(r => r.userId === userId)
      .map(r => {
        const workshop = state.workshops.find(w => w.id === r.workshopId);
        return { ...r, workshop };
      })
      .filter(r => r.workshop); // Only return registrations where workshop still exists
  },

  addFeedback: (feedback) => {
    const newFeedback = { ...feedback, id: Date.now(), date: new Date().toISOString() };
    if (!state.feedbacks) state.feedbacks = [];
    state.feedbacks.push(newFeedback);
    saveState();
    return newFeedback;
  },

  getWorkshopFeedbacks: (workshopId) => {
    return (state.feedbacks || [])
      .filter(f => f.workshopId === parseInt(workshopId))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  getAllFeedbacks: () => {
    return (state.feedbacks || []).sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};
