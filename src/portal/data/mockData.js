// ─── Neural AI Operations Platform — Mock Data ───────────────────────────────
// All data is static and for UI demonstration only.

export const currentUser = {
  id: 'USR-001',
  name: 'Arjun Sharma',
  role: 'Super Admin',

  avatar: null,
  initials: 'AS',
  email: 'arjun.sharma@dtu.ac.in',
  rollNumber: '2K21/CO/045',
  batch: '2021–2025',
  bio: 'President of Neural AI. Final year B.Tech Computer Engineering. Passionate about deep learning and computer vision.',
  skills: ['Python', 'PyTorch', 'React', 'Leadership', 'Research'],
  joined: 'Sep 2021',
  location: 'Delhi, India',
  linkedin: 'linkedin.com/in/arjunsharma',
  github: 'github.com/arjunsharma',
};

export const stats = {
  activeMembers: 147,
  pendingTasks: 23,
  completedTasks: 312,
  upcomingEvents: 4,
  activeProjects: 11,
  totalNotices: 38,
  memberGrowth: '+12%',
  taskCompletionRate: '87%',
};

export const members = [
  {
    id: 'USR-001', name: 'Arjun Sharma', role: 'Super Admin',
    email: 'arjun.sharma@dtu.ac.in', rollNumber: '2K21/CO/045', batch: '2021–25',
    status: 'active', joined: '2021-09-10', reportsTo: null, initials: 'AS',
    skills: ['Python', 'PyTorch', 'React', 'Leadership'],
  },
  {
    id: 'USR-002', name: 'Priya Mehta', role: 'Admin',
    email: 'priya.mehta@dtu.ac.in', rollNumber: '2K21/CO/091', batch: '2021–25',
    status: 'active', joined: '2021-09-12', reportsTo: 'USR-001', initials: 'PM',
    skills: ['TensorFlow', 'Computer Vision', 'Flask'],
  }
];

export const departments = [];

export const tasks = [
  {
    id: 'TASK-001', title: 'Design Workshop Slides for ML Bootcamp',
    description: 'Create presentation slides covering supervised learning fundamentals.',
    priority: 'high', status: 'in_progress', dueDate: '2026-08-05',
    assignedTo: ['USR-004'], assignedBy: 'USR-002',
    progress: 65, tags: ['design', 'workshop'],
    comments: 3, createdAt: '2026-07-20',
  },
  {
    id: 'TASK-002', title: 'Submit Research Paper to AAAI 2027',
    description: 'Finalize and submit the paper on efficient transformers.',
    priority: 'urgent', status: 'under_review', dueDate: '2026-08-10',
    assignedTo: ['USR-003', 'USR-007'], assignedBy: 'USR-001',
    progress: 90, tags: ['research', 'publication'],
    comments: 12, createdAt: '2026-06-15',
  }
];

export const projects = [
  {
    id: 'PROJ-001', title: 'NeuralSight — Medical Image Segmentation',
    description: 'A deep learning pipeline for automated tumor detection in MRI scans using U-Net architecture.',
    status: 'active', category: 'Computer Vision',
    team: ['USR-003', 'USR-007', 'USR-006'],
    lead: 'USR-003',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'FastAPI'],
    startDate: '2026-04-01', deadline: '2026-10-01',
    progress: 58,
    repo: 'github.com/neural-ai-dtu/neuralsight',
    demo: null,
    featured: true,
  },
  {
    id: 'PROJ-002', title: 'SpeakEasy — Hinglish ASR System',
    description: 'Automatic speech recognition fine-tuned on code-switched Hindi-English audio.',
    status: 'active', category: 'NLP',
    team: ['USR-002', 'USR-003'],
    lead: 'USR-002',
    technologies: ['Whisper', 'HuggingFace', 'Python', 'React'],
    startDate: '2026-03-15', deadline: '2026-09-15',
    progress: 72,
    repo: 'github.com/neural-ai-dtu/speakeasy',
    demo: 'speakeasy-demo.vercel.app',
    featured: true,
  }
];

export const events = [
  {
    id: 'EVT-001', title: 'HackNeural 4.0',
    type: 'Hackathon', status: 'upcoming',
    description: '36-hour AI/ML hackathon open to all DTU students. Build, innovate, and compete.',
    date: '2026-08-22', endDate: '2026-08-23',
    venue: 'DTU Main Seminar Hall', registrations: 0, capacity: 200,
    budget: 80000, budgetSpent: 12000,
    sponsors: ['NVIDIA', 'Devfolio', 'GeeksforGeeks'],
    volunteers: ['USR-005', 'USR-009', 'USR-006'],
    status_detail: 'Venue pending confirmation',
  },
  {
    id: 'EVT-002', title: 'ML Bootcamp — Batch 2023',
    type: 'Workshop', status: 'upcoming',
    description: 'A 4-week intensive ML bootcamp for new members covering fundamentals to deployment.',
    date: '2026-08-05', endDate: '2026-08-30',
    venue: 'EC Block Lab 302', registrations: 47, capacity: 60,
    budget: 15000, budgetSpent: 3200,
    sponsors: [],
    volunteers: ['USR-006', 'USR-007'],
    status_detail: 'Registrations open',
  }
];

export const notices = [
  {
    id: 'NTC-001', title: 'HackNeural 4.0 — Registrations Open',
    category: 'Events', priority: 'high', status: 'published',
    content: 'We are thrilled to announce that registrations for HackNeural 4.0 are now open. Form your teams and register before August 15th.',
    publishedAt: '2026-07-28', author: 'USR-001', featured: true, views: 342,
  },
  {
    id: 'NTC-002', title: 'Recruitment 2026 — Applications Due August 20',
    category: 'Recruitment', priority: 'high', status: 'published',
    content: 'Neural AI is recruiting for the 2026–27 session. Applications are due August 20. Shortlisted candidates will be contacted for interviews.',
    publishedAt: '2026-07-25', author: 'USR-001', featured: false, views: 567,
  }
];

export const recruitmentData = {
  status: 'active',
  cycle: '2026–27',
  applicationDeadline: '2026-08-20',
  interviewStart: '2026-08-25',
  resultsDate: '2026-09-05',
  totalApplications: 234,
  shortlisted: 78,
  interviewed: 0,
  selected: 0,
  rejected: 12,
  stages: [
    { name: 'Applications Open', date: '2026-07-25', status: 'completed' },
    { name: 'Application Deadline', date: '2026-08-20', status: 'pending' },
    { name: 'Shortlisting', date: '2026-08-22', status: 'pending' },
    { name: 'Technical Interview', date: '2026-08-25', status: 'pending' },
    { name: 'Final Interview', date: '2026-09-01', status: 'pending' },
    { name: 'Results Announced', date: '2026-09-05', status: 'pending' },
  ],
  domains: [
    { name: 'Technical', openings: 15, applications: 89 },
    { name: 'Research', openings: 8, applications: 54 },
    { name: 'Design', openings: 6, applications: 47 },
    { name: 'Events', openings: 8, applications: 32 },
    { name: 'Marketing', openings: 5, applications: 12 },
  ],
};

export const blogs = [
  {
    id: 'BLOG-001', title: 'Understanding Attention Is All You Need — A Visual Guide',
    author: 'USR-003', category: 'NLP', status: 'published',
    readTime: '12 min', publishedAt: '2026-07-20', views: 1243, likes: 87,
    excerpt: 'A deep-dive into the transformer architecture with annotated diagrams and code.',
    tags: ['transformers', 'attention', 'nlp'],
    featured: true,
  },
  {
    id: 'BLOG-002', title: 'Getting Started with PyTorch: From Zero to MNIST',
    author: 'USR-006', category: 'Deep Learning', status: 'published',
    readTime: '8 min', publishedAt: '2026-07-10', views: 876, likes: 62,
    excerpt: 'A beginner-friendly introduction to PyTorch with hands-on examples.',
    tags: ['pytorch', 'deep-learning', 'beginners'],
    featured: false,
  }
];

export const achievements = [
  {
    id: 'ACH-001', title: 'Best Paper Award — ICLR Workshop on Efficient ML',
    category: 'Research', date: '2026-05-15',
    description: 'Rohan Gupta\'s paper on sparse attention won Best Paper at the ICLR Efficient ML Workshop.',
    members: ['USR-003'], featured: true, status: 'published',
  },
  {
    id: 'ACH-002', title: '1st Place — Smart India Hackathon 2026',
    category: 'Competition', date: '2026-03-10',
    description: 'Team NeuralSight won 1st place in the healthcare category of SIH 2026.',
    members: ['USR-003', 'USR-007', 'USR-006'], featured: true, status: 'published',
  }
];

export const analyticsData = {
  memberGrowth: [
    { month: 'Aug', count: 85 },
    { month: 'Sep', count: 108 },
    { month: 'Oct', count: 112 },
    { month: 'Nov', count: 115 },
    { month: 'Dec', count: 118 },
    { month: 'Jan', count: 122 },
    { month: 'Feb', count: 126 },
    { month: 'Mar', count: 131 },
    { month: 'Apr', count: 135 },
    { month: 'May', count: 139 },
    { month: 'Jun', count: 143 },
    { month: 'Jul', count: 147 },
  ],
  taskCompletion: [
    { week: 'W1', completed: 22, added: 18 },
    { week: 'W2', completed: 31, added: 24 },
    { week: 'W3', completed: 19, added: 30 },
    { week: 'W4', completed: 28, added: 21 },
    { week: 'W5', completed: 35, added: 19 },
    { week: 'W6', completed: 27, added: 23 },
  ],
  eventParticipation: [
    { event: 'ML Bootcamp', participants: 47 },
    { event: 'HackNeural 3.0', participants: 183 },
    { event: 'Annual Day', participants: 210 },
    { event: 'CV Workshop', participants: 62 },
    { event: 'NLP Session', participants: 38 },
  ],
  departmentActivity: [
    { dept: 'Technical', tasks: 120 },
    { dept: 'Research', tasks: 67 },
    { dept: 'Events', tasks: 89 },
    { dept: 'Design', tasks: 54 },
    { dept: 'Marketing', tasks: 37 },
  ],
  recruitmentStats: [
    { stage: 'Applied', count: 234 },
    { stage: 'Shortlisted', count: 78 },
    { stage: 'Interviewed', count: 0 },
    { stage: 'Selected', count: 0 },
  ],
};

export const recentActivity = [
  { id: 1, type: 'task_completed', user: 'USR-004', message: 'Completed "Update Society Website Home Page"', time: '2 hours ago' },
  { id: 2, type: 'blog_published', user: 'USR-003', message: 'Published "Understanding Attention Is All You Need"', time: '5 hours ago' }
];

export const calendarEvents = [
  { id: 1, title: 'ML Bootcamp Week 1', date: '2026-08-05', type: 'workshop', color: 'cyan' },
  { id: 2, title: 'Task Deadline: Sponsor Deck', date: '2026-08-01', type: 'deadline', color: 'amber' }
];

export const notifications = [
  { id: 1, title: 'Task Overdue', message: 'Book Seminar Hall is past due date.', time: '1h ago', read: false, type: 'warning' },
  { id: 2, title: 'New Application', message: '234 recruitment applications received so far.', time: '3h ago', read: false, type: 'info' }
];
