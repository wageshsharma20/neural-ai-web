// =========================================================
// NEURAL AI — BLOGS & RESOURCES DATA
// Full blog posts data and extended resources
// =========================================================

// ── All Blog Posts ──
export const ALL_BLOGS = [
  {
    id: 'blog-01',
    title: 'Understanding Attention: From Transformers to Linear Attention',
    excerpt:
      'A ground-up walkthrough of the self-attention mechanism, its computational cost, and the emerging linear-attention variants reducing O(n²) complexity.',
    content: 'This is the full expanded content for the blog post. It goes into much deeper detail about the topic discussed in the excerpt. ' + 'A ground-up walkthrough of the self-attention mechanism, its computational cost, and the emerging linear-attention variants reducing O(n²) complexity.' + ' Furthermore, we explore advanced concepts, implementation details, and practical examples that will help you master the material.',
    author: 'Aryan Mehta',
    authorRole: 'Core — Research',
    authorInitials: 'AM',
    category: 'Deep Learning',
    readTime: '9 min read',
    publishedAt: '2025-06-14',
    featured: true,
    tags: ['Transformers', 'Attention', 'Architecture'],
  },
  {
    id: 'blog-02',
    title: 'Vision-Language Models: Bridging Pixels and Text',
    excerpt:
      'A survey of CLIP, Flamingo, and GPT-4V, tracing the architectural choices that make multimodal reasoning possible.',
    content: 'This is the full expanded content for the blog post. It goes into much deeper detail about the topic discussed in the excerpt. ' + 'A survey of CLIP, Flamingo, and GPT-4V, tracing the architectural choices that make multimodal reasoning possible.' + ' Furthermore, we explore advanced concepts, implementation details, and practical examples that will help you master the material.',
    author: 'Sneha Kapoor',
    authorRole: 'Core — Content',
    authorInitials: 'SK',
    category: 'Generative AI',
    readTime: '12 min read',
    publishedAt: '2025-05-28',
    featured: false,
    tags: ['Vision', 'Language Models', 'Multimodal'],
  },
  {
    id: 'blog-03',
    title: 'The Road to AGI: Milestones, Benchmarks and Open Questions',
    excerpt:
      'An opinionated survey of what current benchmarks actually measure, where they fall short, and what frontier labs are quietly working on next.',
    content: 'This is the full expanded content for the blog post. It goes into much deeper detail about the topic discussed in the excerpt. ' + 'An opinionated survey of what current benchmarks actually measure, where they fall short, and what frontier labs are quietly working on next.' + ' Furthermore, we explore advanced concepts, implementation details, and practical examples that will help you master the material.',
    author: 'Rahul Sharma',
    authorRole: 'Office Bearer',
    authorInitials: 'RS',
    category: 'Research',
    readTime: '15 min read',
    publishedAt: '2025-05-10',
    featured: false,
    tags: ['AGI', 'Benchmarks', 'Research'],
  },
  {
    id: 'blog-04',
    title: 'Mechanistic Interpretability: Reading the Mind of a Neural Network',
    excerpt:
      'An introduction to circuits, superposition, and how researchers are reverse-engineering what LLMs actually learn internally.',
    content: 'This is the full expanded content for the blog post. It goes into much deeper detail about the topic discussed in the excerpt. ' + 'An introduction to circuits, superposition, and how researchers are reverse-engineering what LLMs actually learn internally.' + ' Furthermore, we explore advanced concepts, implementation details, and practical examples that will help you master the material.',
    author: 'Ishaan Batra',
    authorRole: 'Core — Research',
    authorInitials: 'IB',
    category: 'Machine Learning',
    readTime: '11 min read',
    publishedAt: '2025-04-22',
    featured: false,
    tags: ['Interpretability', 'LLMs', 'Research'],
  },
  {
    id: 'blog-05',
    title: 'LoRA and Beyond: Efficient Fine-Tuning of Large Language Models',
    excerpt:
      'Why training a 7B parameter model on a consumer GPU is now possible — and the fascinating mathematics of low-rank decomposition behind it.',
    content: 'This is the full expanded content for the blog post. It goes into much deeper detail about the topic discussed in the excerpt. ' + 'Why training a 7B parameter model on a consumer GPU is now possible — and the fascinating mathematics of low-rank decomposition behind it.' + ' Furthermore, we explore advanced concepts, implementation details, and practical examples that will help you master the material.',
    author: 'Ananya Das',
    authorRole: 'Technical Head',
    authorInitials: 'AD',
    category: 'NLP',
    readTime: '8 min read',
    publishedAt: '2025-04-05',
    featured: false,
    tags: ['Fine-Tuning', 'LoRA', 'Efficiency'],
  },
  {
    id: 'blog-06',
    title: 'Point Clouds to 3D Scenes: NeRF, 3DGS and Beyond',
    excerpt:
      'From Neural Radiance Fields to 3D Gaussian Splatting — a deep dive into how AI is reconstructing the physical world from photographs.',
    content: 'This is the full expanded content for the blog post. It goes into much deeper detail about the topic discussed in the excerpt. ' + 'From Neural Radiance Fields to 3D Gaussian Splatting — a deep dive into how AI is reconstructing the physical world from photographs.' + ' Furthermore, we explore advanced concepts, implementation details, and practical examples that will help you master the material.',
    author: 'Kabir Malhotra',
    authorRole: 'Core — Technical',
    authorInitials: 'KM',
    category: 'Computer Vision',
    readTime: '10 min read',
    publishedAt: '2025-03-18',
    featured: false,
    tags: ['3D Vision', 'NeRF', 'Gaussian Splatting'],
  },
  {
    id: 'blog-07',
    title: 'Reward Hacking and Alignment: Lessons from RLHF',
    excerpt:
      'What went wrong with early RLHF approaches, how constitutional AI and DPO try to fix it, and what the alignment community hasn\'t solved yet.',
    content: 'This is the full expanded content for the blog post. It goes into much deeper detail about the topic discussed in the excerpt. ' + 'What went wrong with early RLHF approaches, how constitutional AI and DPO try to fix it, and what the alignment community hasn\'t solved yet.' + ' Furthermore, we explore advanced concepts, implementation details, and practical examples that will help you master the material.',
    author: 'Tara Pillai',
    authorRole: 'Events Head',
    authorInitials: 'TP',
    category: 'Artificial Intelligence',
    readTime: '13 min read',
    publishedAt: '2025-03-02',
    featured: false,
    tags: ['RLHF', 'Alignment', 'AI Safety'],
  },
  {
    id: 'blog-08',
    title: 'Building a Real-Time Object Detection Pipeline',
    excerpt:
      'A practical walkthrough of deploying YOLOv9 with TensorRT for sub-30ms inference on edge devices, with lessons from our robotics cluster.',
    content: 'This is the full expanded content for the blog post. It goes into much deeper detail about the topic discussed in the excerpt. ' + 'A practical walkthrough of deploying YOLOv9 with TensorRT for sub-30ms inference on edge devices, with lessons from our robotics cluster.' + ' Furthermore, we explore advanced concepts, implementation details, and practical examples that will help you master the material.',
    author: 'Aditya Verma',
    authorRole: 'President',
    authorInitials: 'AV',
    category: 'Robotics',
    readTime: '7 min read',
    publishedAt: '2025-02-14',
    featured: false,
    tags: ['Object Detection', 'Edge AI', 'Systems'],
  },
];

// ── Extended Resources ──
export const RESOURCES = [
  {
    id: 'res-01',
    type: 'Roadmap',
    title: 'ML Engineer Roadmap 2025',
    description: 'A comprehensive, opinionated roadmap from Python basics to production ML systems, curated by the Neural AI technical team.',
    link: '#',
    difficulty: 'Beginner',
    tags: ['Getting Started', 'ML', 'Engineering'],
  },
  {
    id: 'res-02',
    type: 'Course',
    title: 'Deep Learning Specialisation',
    description: 'Andrew Ng\'s five-course specialisation covering ANNs, CNNs, RNNs, and the foundations of modern deep learning.',
    link: '#',
    difficulty: 'Intermediate',
    tags: ['Neural Networks', 'Coursera', 'Foundation'],
  },
  {
    id: 'res-03',
    type: 'Research Paper',
    title: 'Attention Is All You Need',
    description: 'The original Transformer paper by Vaswani et al. Still the single best paper to understand before diving into LLMs.',
    link: '#',
    difficulty: 'Advanced',
    tags: ['Transformers', 'Foundational', 'NLP'],
  },
  {
    id: 'res-04',
    type: 'Book',
    title: 'Deep Learning — Goodfellow, Bengio, Courville',
    description: 'The definitive textbook covering the mathematical foundations of deep learning from first principles. Available free online.',
    link: '#',
    difficulty: 'Intermediate',
    tags: ['Textbook', 'Mathematics', 'Theory'],
  },
  {
    id: 'res-05',
    type: 'Cheat Sheet',
    title: 'PyTorch Quick Reference',
    description: 'Neural AI\'s internally maintained PyTorch cheat sheet — tensors, autograd, training loops, and common patterns.',
    link: '#',
    difficulty: 'Beginner',
    tags: ['PyTorch', 'Reference', 'Practical'],
  },
  {
    id: 'res-06',
    type: 'Workshop Material',
    title: 'Diffusion Models from Scratch',
    description: 'Slides, notebooks, and code from our June 2025 two-day workshop. Covers score matching, DDPM, and DDIM implementation.',
    link: '#',
    difficulty: 'Advanced',
    tags: ['Diffusion', 'Generative AI', 'Workshop'],
  },
  {
    id: 'res-07',
    type: 'Documentation',
    title: 'Hugging Face Transformers Docs',
    description: 'The canonical reference for loading, fine-tuning, and deploying models from the Hugging Face ecosystem.',
    link: '#',
    difficulty: 'Intermediate',
    tags: ['HuggingFace', 'Reference', 'NLP'],
  },
  {
    id: 'res-08',
    type: 'Open Source',
    title: 'Neural AI GitHub Organisation',
    description: 'All open-source projects from Neural AI members — forked, contributed to, and maintained by the society.',
    link: '#',
    difficulty: 'Beginner',
    tags: ['Open Source', 'Projects', 'GitHub'],
  },
  {
    id: 'res-09',
    type: 'Research Paper',
    title: 'Scaling Laws for Neural Language Models',
    description: 'Kaplan et al., 2020 — the paper that established compute-optimal training and reshaped how frontier labs think about model size.',
    link: '#',
    difficulty: 'Advanced',
    tags: ['Scaling', 'Research', 'LLMs'],
  },
];

// ── Resource types (for filter) ──
export const RESOURCE_TYPES = [
  'All', 'Roadmap', 'Course', 'Research Paper', 'Book',
  'Cheat Sheet', 'Workshop Material', 'Documentation', 'Open Source',
];

// ── Difficulty filters ──
export const DIFFICULTY_LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
