// Project Categories
export const categories = {
  WEB: 'Web Development',
  MOBILE: 'Mobile Development',
  SYSTEM: 'System Development'
};

// All Projects Data
export const projectsData = [
  {
    id: 1,
    title: 'GrowthSphere Ventures',
    subtitle: 'Corporate Website',
    category: categories.WEB,
    description: 'Clean and professional corporate website focused on strong user engagement and modern design principles.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=90',
    techStack: ['React', 'Tailwind CSS', 'Node.js'],
    handle: '@growthsphere',
    location: 'Corporate',
    borderColor: '#4F46E5', // Indigo
    gradient: 'linear-gradient(145deg, #4F46E5, #1e1b4b)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: true
  },
  {
    id: 2,
    title: 'AI-Equity',
    subtitle: 'AI-Powered Platform',
    category: categories.WEB,
    description: 'Innovative AI platform designed for equity analysis with responsive design and intuitive user interface.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=90',
    techStack: ['Python', 'React', 'TensorFlow', 'FastAPI'],
    handle: '@aiequity',
    location: 'FinTech',
    borderColor: '#10B981', // Emerald
    gradient: 'linear-gradient(210deg, #10B981, #064e3b)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: true
  },
  {
    id: 3,
    title: 'Samaya Salon for Her',
    subtitle: 'Service Website',
    category: categories.WEB,
    description: 'Elegant service-based website for a salon with booking system, gallery, and customer engagement features.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop&q=90',
    techStack: ['React', 'Firebase', 'Stripe', 'CSS3'],
    handle: '@samayasalon',
    location: 'Service',
    borderColor: '#EC4899', // Pink
    gradient: 'linear-gradient(165deg, #EC4899, #831843)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: true
  },
  {
    id: 4,
    title: 'Overlooking Clothing',
    subtitle: 'E-Commerce Platform',
    category: categories.WEB,
    description: 'Modern e-commerce clothing platform with dynamic product management, secure checkout, and seamless shopping experience.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&q=90',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    handle: '@overlooking',
    location: 'E-Commerce',
    borderColor: '#F59E0B', // Amber
    gradient: 'linear-gradient(195deg, #F59E0B, #78350f)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: true
  },
  {
    id: 5,
    title: 'Metro Rail System',
    subtitle: 'Transportation Platform',
    category: categories.WEB,
    description: 'Web-based platform for efficient metro route and schedule management with real-time updates.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=1080&fit=crop&q=90',
    techStack: ['React', 'Express', 'PostgreSQL', 'Redis'],
    handle: '@metrorail',
    location: 'Transportation',
    borderColor: '#06B6D4', // Cyan
    gradient: 'linear-gradient(135deg, #06B6D4, #164e63)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: true
  },
  {
    id: 6,
    title: 'Ice Cream Order System',
    subtitle: 'Order Management',
    category: categories.WEB,
    description: 'Real-time order tracking with invoice generation and payment processing for ice cream business.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1920&h=1080&fit=crop&q=90',
    techStack: ['React', 'Node.js', 'MySQL', 'PayPal'],
    handle: '@icecreamorder',
    location: 'Food Service',
    borderColor: '#8B5CF6', // Violet
    gradient: 'linear-gradient(225deg, #8B5CF6, #4c1d95)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: false
  },
  {
    id: 7,
    title: 'PickUp Laundry',
    subtitle: 'Laundry Service App',
    category: categories.WEB,
    description: 'JSP-based laundry service with Captcha authentication, Razorpay integration, PDF invoices, and dynamic service management.',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1920&h=1080&fit=crop&q=90',
    techStack: ['JSP', 'Java', 'MySQL', 'Razorpay'],
    handle: '@pickuplaundry',
    location: 'Service',
    borderColor: '#14B8A6', // Teal
    gradient: 'linear-gradient(150deg, #14B8A6, #134e4a)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: false
  },
  {
    id: 8,
    title: 'Contest Management System',
    subtitle: 'CMS Platform',
    category: categories.WEB,
    description: 'Secure PHP-MySQL platform for managing contests with form submissions, randomization, and AJAX reporting.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop&q=90',
    techStack: ['PHP', 'MySQL', 'AJAX', 'Bootstrap'],
    handle: '@contestcms',
    location: 'Management',
    borderColor: '#EF4444', // Red
    gradient: 'linear-gradient(180deg, #EF4444, #7f1d1d)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: false
  },
  {
    id: 9,
    title: 'Daily Expense Tracker',
    subtitle: 'Finance Android App',
    category: categories.MOBILE,
    description: 'Android app with SQLite, Camera API, and smart notifications for efficient personal finance tracking.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&h=1080&fit=crop&q=90',
    techStack: ['Android', 'SQLite', 'Java', 'Camera API'],
    handle: '@expensetracker',
    location: 'Finance',
    borderColor: '#F97316', // Orange
    gradient: 'linear-gradient(160deg, #F97316, #7c2d12)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: true
  },
  {
    id: 10,
    title: 'Food On Track',
    subtitle: 'Food Delivery App',
    category: categories.MOBILE,
    description: 'Engaging Android app for food ordering with real-time tracking and intuitive user interface.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop&q=90',
    techStack: ['Android', 'Firebase', 'Google Maps', 'Kotlin'],
    handle: '@foodontrack',
    location: 'Food',
    borderColor: '#D946EF', // Fuchsia
    gradient: 'linear-gradient(200deg, #D946EF, #701a75)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: false
  },
  {
    id: 11,
    title: 'Plantify',
    subtitle: 'Plant Care App',
    category: categories.MOBILE,
    description: 'Interactive Android app for plant lovers with care tips, reminders, and plant identification features.',
    image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1920&h=1080&fit=crop&q=90',
    techStack: ['Android', 'Kotlin', 'Room DB', 'ML Kit'],
    handle: '@plantify',
    location: 'Lifestyle',
    borderColor: '#22C55E', // Green
    gradient: 'linear-gradient(170deg, #22C55E, #14532d)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: false
  },
  {
    id: 12,
    title: 'Cakes App',
    subtitle: 'Bakery Ordering App',
    category: categories.MOBILE,
    description: 'Beautiful Android app for custom cake ordering with design customization and delivery tracking.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=1080&fit=crop&q=90',
    techStack: ['Android', 'Java', 'Firebase', 'Stripe'],
    handle: '@cakesapp',
    location: 'Food',
    borderColor: '#FB923C', // Orange-400
    gradient: 'linear-gradient(190deg, #FB923C, #9a3412)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: false
  },
  {
    id: 13,
    title: 'Quiz Apps',
    subtitle: 'Educational Quiz Platform',
    category: categories.MOBILE,
    description: 'Engaging quiz applications with multiple categories, leaderboards, and real-time score tracking.',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1920&h=1080&fit=crop&q=90',
    techStack: ['Android', 'Kotlin', 'Firebase', 'Admob'],
    handle: '@quizapps',
    location: 'Education',
    borderColor: '#A855F7', // Purple
    gradient: 'linear-gradient(220deg, #A855F7, #581c87)',
    url: 'https://github.com/Anirudhdhsinh0012',
    featured: false
  }
];

// Get featured projects
export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

// Get projects by category
export const getProjectsByCategory = (category) => {
  return projectsData.filter(project => project.category === category);
};

// Get all projects
export const getAllProjects = () => {
  return projectsData;
};
