// =========================================================
// NEURAL AI — MOCK DATA
// Realistic placeholder data used throughout the public site
// and member portal until backend is integrated.
// =========================================================

// ── Society statistics ──
export const SOCIETY_STATS = [
  { label: 'Members', value: '240+', id: 'stat-members' },
  { label: 'Projects', value: '60+',  id: 'stat-projects' },
  { label: 'Events',   value: '120+', id: 'stat-events' },
  { label: 'Research Papers', value: '18', id: 'stat-papers' },
];

export const currentUser = {
  name: 'Aryan Sharma',
  initials: 'AS',
  role: 'Core Member',
  email: 'a.sharma@dtu.ac.in',
};

// ── Featured projects ──
export const FEATURED_PROJECTS = [
  {
    id: 'proj-01',
    title: 'NeuroSeg',
    tagline: 'Medical image segmentation using transformer-based U-Net architecture.',
    domain: 'Computer Vision',
    year: '2025',
    contributors: 6,
    github: 'https://github.com/neural-ai-dtu/neuroseg',
    demo: null,
  },
  {
    id: 'proj-02',
    title: 'SentinelNLP',
    tagline: 'Real-time hate speech and misinformation detection pipeline for social media.',
    domain: 'NLP',
    year: '2025',
    contributors: 4,
    github: 'https://github.com/neural-ai-dtu/sentinel-nlp',
    demo: 'https://sentinel.neural-ai.in',
  },
  {
    id: 'proj-03',
    title: 'GraspBot',
    tagline: 'Sim-to-real robotic manipulation using reinforcement learning and domain randomisation.',
    domain: 'Robotics',
    year: '2024',
    contributors: 5,
    github: 'https://github.com/neural-ai-dtu/graspbot',
    demo: null,
  },
];

// ── Latest blogs ──
export const FEATURED_BLOGS = [
  {
    id: 'blog-01',
    title: 'Understanding Attention: From Transformers to Linear Attention',
    excerpt:
      'A ground-up walkthrough of the self-attention mechanism, its computational cost, and the emerging linear-attention variants reducing O(n²) complexity.',
    author: 'Aryan Mehta',
    authorRole: 'Core — Research',
    category: 'Deep Learning',
    readTime: '9 min read',
    publishedAt: '2025-06-14',
    coverColor: '#0A0A0A',
  },
  {
    id: 'blog-02',
    title: 'Vision-Language Models: Bridging Pixels and Text',
    excerpt:
      'A survey of CLIP, Flamingo, and GPT-4V, tracing the architectural choices that make multimodal reasoning possible.',
    author: 'Sneha Kapoor',
    authorRole: 'Core — Content',
    category: 'Generative AI',
    readTime: '12 min read',
    publishedAt: '2025-05-28',
    coverColor: '#0A0A0A',
  },
  {
    id: 'blog-03',
    title: 'The Road to AGI: Milestones, Benchmarks and Open Questions',
    excerpt:
      'An opinionated survey of what current benchmarks actually measure, where they fall short, and what frontier labs are quietly working on next.',
    author: 'Rahul Sharma',
    authorRole: 'Office Bearer',
    category: 'Research',
    readTime: '15 min read',
    publishedAt: '2025-05-10',
    coverColor: '#0A0A0A',
  },
];

// ── Upcoming events ──
export const UPCOMING_EVENTS = [
  {
    id: 'evt-01',
    title: 'NeuralHack 2025',
    description: '36-hour AI hackathon. Build solutions across CV, NLP, RL and GenAI tracks.',
    date: '2025-08-16',
    time: '9:00 AM',
    venue: 'DTU Seminar Hall, Block V',
    category: 'Hackathon',
    registrationOpen: true,
    registrationUrl: '#',
  },
  {
    id: 'evt-02',
    title: 'Reading Group — ICML 2025 Highlights',
    description: 'Monthly deep-dive into landmark papers. This session covers diffusion models and mechanistic interpretability.',
    date: '2025-08-04',
    time: '5:00 PM',
    venue: 'EC Room 204',
    category: 'Workshop',
    registrationOpen: false,
    registrationUrl: null,
  },
  {
    id: 'evt-03',
    title: 'Alumni Talk: From Research to Production',
    description: 'Neural AI alumni currently at DeepMind, Microsoft Research and IIT share their journeys.',
    date: '2025-08-22',
    time: '4:30 PM',
    venue: 'Online (Zoom)',
    category: 'Talk',
    registrationOpen: true,
    registrationUrl: '#',
  },
];

// ── Notices ──
export const LATEST_NOTICES = [
  {
    id: 'notice-01',
    title: 'Recruitment 2025–26 Now Open',
    description: 'Applications for all domains are open. Deadline: 10th August 2025.',
    date: '2025-07-25',
    category: 'Important',
    pinned: true,
  },
  {
    id: 'notice-02',
    title: 'NeuralHack 2025 — Registration Live',
    description: 'Register your team of up to 4 for our flagship 36-hour hackathon.',
    date: '2025-07-22',
    category: 'Competitions',
    pinned: false,
  },
  {
    id: 'notice-03',
    title: 'GPU Cluster Access for Research Projects',
    description: 'Approved project teams can now apply for compute allocation on the DTU GPU cluster.',
    date: '2025-07-18',
    category: 'Academic',
    pinned: false,
  },
  {
    id: 'notice-04',
    title: 'Reading Group — New Schedule',
    description: 'Monthly reading sessions move to the first Monday of each month, 5 PM.',
    date: '2025-07-10',
    category: 'General',
    pinned: false,
  },
];

// ── Recent achievements ──
export const ACHIEVEMENTS = [
  {
    id: 'ach-01',
    title: 'Best Paper Award',
    body: 'ICLR 2025 Workshop on Human-Aligned AI',
    year: '2025',
  },
  {
    id: 'ach-02',
    title: '1st Place — Smart India Hackathon',
    body: 'Track: Healthcare AI · 8,000+ participating teams',
    year: '2024',
  },
  {
    id: 'ach-03',
    title: 'Runner-Up — IIT Bombay Techfest AI Challenge',
    body: 'Predictive maintenance using multivariate time-series',
    year: '2024',
  },
  {
    id: 'ach-04',
    title: 'Publication — Springer LNCS',
    body: 'Deep learning for urban traffic flow optimisation',
    year: '2023',
  },
];

// ── Testimonials ──
export const TESTIMONIALS = [
  {
    id: 'test-01',
    quote:
      'Neural AI gave me my first real research experience — working on a real paper with brilliant peers. Nothing in class came close.',
    author: 'Priya Nair',
    role: 'B.Tech CSE, 2024 · Now at Google DeepMind',
    initials: 'PN',
  },
  {
    id: 'test-02',
    quote:
      'The reading groups forced me to actually understand papers, not just read them. That habit got me into a top PhD programme.',
    author: 'Karan Joshi',
    role: 'B.Tech ECE, 2023 · PhD at CMU',
    initials: 'KJ',
  },
  {
    id: 'test-03',
    quote:
      'I joined as a first-year with almost no ML knowledge. By second year, I had shipped a production model used by a startup.',
    author: 'Meera Iyer',
    role: 'B.Tech IT, 2025',
    initials: 'MI',
  },
];

// ── AI domains ──
export const AI_DOMAINS = [
  {
    id: 'dom-ml',
    label: 'Machine Learning',
    description: 'Foundational predictive modeling, statistical analysis, and classical algorithms.',
    subdomains: ['Supervised Learning', 'Unsupervised Learning', 'Time Series Forecasting', 'Feature Engineering', 'Optimization Algorithms'],
  },
  {
    id: 'dom-dl',
    label: 'Deep Learning',
    description: 'Neural networks, computer vision, and complex pattern recognition.',
    subdomains: ['Convolutional Networks', 'Transformer Architectures', 'Sequence Modeling', 'Representation Learning', 'Model Compression'],
  },
  {
    id: 'dom-agent',
    label: 'Agentic AI',
    description: 'Autonomous systems, tool use, and multi-agent coordination.',
    subdomains: ['Goal-directed Planning', 'Tool Orchestration', 'Multi-agent Systems', 'Reinforcement Learning', 'Environment Interaction'],
  },
  {
    id: 'dom-gen',
    label: 'Generative AI',
    description: 'Multimodal generation, diffusion models, and creative synthesis.',
    subdomains: ['Diffusion Models', 'Flow Matching', 'Image & Video Synthesis', 'Controllable Generation', 'Model Fine-tuning'],
  },
  {
    id: 'dom-rag',
    label: 'RAG',
    description: 'Retrieval-augmented generation, knowledge grounding, and semantic search.',
    subdomains: ['Vector Databases', 'Semantic Chunking', 'Hybrid Search', 'Document Parsing', 'Knowledge Graphs'],
  },
  {
    id: 'dom-res',
    label: 'Research',
    description: 'Paper reading, reproducibility, novel contributions and publications.',
    subdomains: ['Paper Reproduction', 'Novel Contributions', 'Reading Groups', 'Workshop Publications', 'Benchmark Design'],
  },
];

// ── Executive team ──
export const EXECUTIVE_TEAM = [
  { id: 'exec-01', name: 'Aditya Verma',   role: 'President',            dept: 'B.Tech CSE, 3rd Year', image: null, linkedin: 'https://linkedin.com' },
  { id: 'exec-02', name: 'Riya Sinha',     role: 'Vice President',       dept: 'B.Tech ECE, 3rd Year', image: null, linkedin: 'https://linkedin.com' },
  { id: 'exec-03', name: 'Kabir Malhotra', role: 'Secretary',            dept: 'B.Tech IT, 2nd Year',  image: null, linkedin: 'https://linkedin.com' },
  { id: 'exec-04', name: 'Ananya Das',     role: 'Technical Head',       dept: 'B.Tech CSE, 3rd Year', image: null, linkedin: 'https://linkedin.com' },
  { id: 'exec-05', name: 'Ishaan Batra',   role: 'Research Head',        dept: 'B.Tech ECE, 2nd Year', image: null, linkedin: 'https://linkedin.com' },
  { id: 'exec-06', name: 'Tara Pillai',    role: 'Events Head',          dept: 'B.Tech IT, 3rd Year',  image: null, linkedin: 'https://linkedin.com' },
];

export const HALL_OF_FAME = [
  { id: 'hof-01', name: 'Priya Nair',   role: 'Founding President (2019)', dept: 'Google DeepMind', image: null, linkedin: 'https://linkedin.com' },
  { id: 'hof-02', name: 'Karan Joshi',  role: 'Research Head (2020)', dept: 'PhD at CMU', image: null, linkedin: 'https://linkedin.com' },
  { id: 'hof-03', name: 'Rohan Gupta',  role: 'Tech Lead (2021)', dept: 'Applied Scientist at Amazon', image: null, linkedin: 'https://linkedin.com' },
  { id: 'hof-04', name: 'Neha Sharma',  role: 'Vice President (2022)', dept: 'ML Engineer at OpenAI', image: null, linkedin: 'https://linkedin.com' },
  { id: 'hof-05', name: 'Vikram Singh', role: 'Secretary (2020)', dept: 'Founder of NeuralX', image: null, linkedin: 'https://linkedin.com' },
];

// ── Legacy timeline ──
export const LEGACY_TIMELINE = [
  { id: 'era-2019', year: '2019–20', heading: 'Foundation', body: 'Neural AI chartered as DTU\'s first dedicated AI society. 28 founding members across 5 departments.' },
  { id: 'era-2020', year: '2020–21', heading: 'First Research Wing', body: 'Research vertical launched. Three projects submitted to national competitions; first ICML workshop paper accepted.' },
  { id: 'era-2021', year: '2021–22', heading: 'NeuralHack I', body: 'Inaugural hackathon draws 400+ participants from 30+ colleges. Flagship event now held annually.' },
  { id: 'era-2022', year: '2022–23', heading: 'Publication & Industry', body: 'First Springer LNCS publication. Industry mentorship programme launched with 12 partner companies.' },
  { id: 'era-2023', year: '2023–24', heading: 'Scale', body: 'Society crosses 200 active members. Smart India Hackathon 1st place. GPU cluster partnership with DTU administration.' },
  { id: 'era-2024', year: '2024–25', heading: 'ICLR Recognition', body: 'Best Paper Award at ICLR 2025 Workshop. Alumni now at DeepMind, CMU PhD, and founding AI startups.' },
];

// ── Navigation links ──
export const NAV_LINKS = [
  { label: 'Home',              href: '/',             id: 'nav-home' },
  { label: 'Society',          href: '/society',      id: 'nav-society' },
  { label: 'Notice Board',     href: '/notices',      id: 'nav-notices' },
  { label: 'Blogs & Resources',href: '/blogs',        id: 'nav-blogs' },
  { label: 'Contact',          href: '/contact',      id: 'nav-contact' },
];

// ── Social links ──
export const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: 'https://linkedin.com',  id: 'social-linkedin', iconClass: 'fa-brands fa-linkedin' },
  { label: 'Instagram', href: 'https://instagram.com', id: 'social-instagram', iconClass: 'fa-brands fa-instagram' },
  { label: 'GitHub',    href: 'https://github.com',    id: 'social-github', iconClass: 'fa-brands fa-github' },
  { label: 'Contact',   href: '/contact',              id: 'social-contact', iconClass: 'fa-solid fa-envelope' },
];

// ── Learning resources ──
export const LEARNING_RESOURCES = [
  { id: 'res-01', type: 'Roadmap',       title: 'ML Engineer Roadmap 2025',   link: '#', difficulty: 'Beginner' },
  { id: 'res-02', type: 'Course',        title: 'Deep Learning Specialisation', link: '#', difficulty: 'Intermediate' },
  { id: 'res-03', type: 'Research Paper',title: 'Attention Is All You Need',  link: '#', difficulty: 'Advanced' },
  { id: 'res-04', type: 'Book',          title: 'Deep Learning — Goodfellow', link: '#', difficulty: 'Intermediate' },
  { id: 'res-14', type: 'Documentation', title: 'ROS 2 Humble Docs',      link: '#', difficulty: 'Beginner' },
  { id: 'res-15', type: 'Documentation', title: 'OpenAI Gym/Gymnasium',   link: '#', difficulty: 'Beginner' },
];

export const events = [];
export const tasks = [];
export const notices = [];


// ── Blog categories ──
export const BLOG_CATEGORIES = [
  'All', 'Artificial Intelligence', 'Machine Learning', 'Deep Learning',
  'Computer Vision', 'NLP', 'Generative AI', 'Robotics', 'Research',
];
