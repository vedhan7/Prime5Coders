
import { 
  Code, 
  Palette, 
  Box, 
  ShoppingCart, 
  LayoutDashboard, 
  Smartphone,
  Globe,
  Lock,
  Search,
  PenTool,
  Rocket,
  MessageSquare
} from 'lucide-react';
import { Service, Project, TeamMember, PricingTier, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Full-Stack Web Dev',
    description: 'Scalable, secure, and high-performance web applications built with modern frameworks.',
    icon: Code,
    features: [
      'Modern Frameworks (React/Next.js)',
      'Secure Backend Architecture',
      'API Integration',
      'Performance Optimization'
    ]
  },
  {
    id: 'domain',
    title: 'Domain Registration',
    description: 'Find and register your perfect domain name. We handle DNS and configuration.',
    icon: Globe,
    link: 'https://indiadomainbank.com/',
    features: [
      'TLD Registration',
      'DNS Management',
      'Whois Privacy',
      'Instant Setup'
    ]
  },
  {
    id: 'ssl',
    title: 'SSL Certificates',
    description: 'Encrypt your website traffic and build trust with visitors using premium SSLs.',
    icon: Lock,
    link: 'https://indiadomainbank.com/',
    features: [
      '256-bit Encryption',
      'Green Bar Trust',
      'SEO Boost',
      'Fast Issuance'
    ]
  },
  {
    id: 'ui-ux',
    title: 'Modern UI/UX Design',
    description: 'User-centric designs that look stunning and provide seamless experiences across devices.',
    icon: Palette,
    features: [
      'User Research & Personas',
      'Wireframing & Prototyping',
      'Interactive Design Systems',
      'Usability Testing'
    ]
  },
  {
    id: '3d-web',
    title: '3D & Interactive',
    description: 'Immersive 3D experiences using WebGL and Three.js to captivate your audience.',
    icon: Box,
    features: [
      'WebGL / Three.js Implementation',
      'Interactive 3D Models',
      'Performance Optimization',
      'Custom Shaders & Effects'
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Solutions',
    description: 'Custom online stores optimized for conversions, featuring secure payment integrations.',
    icon: ShoppingCart,
    features: [
      'Secure Payment Gateways',
      'Inventory Management',
      'Conversion Rate Optimization',
      'User-Friendly Checkout'
    ]
  },
  {
    id: 'dashboard',
    title: 'Dashboards & Admin',
    description: 'Powerful data visualization tools and admin panels to manage your business efficiently.',
    icon: LayoutDashboard,
    features: [
      'Real-time Data Visualization',
      'Role-Based Access Control',
      'Interactive Charts',
      'Automated Reporting'
    ]
  },
  {
    id: 'mobile',
    title: 'Responsive & Mobile',
    description: 'Mobile-first approach ensuring your site looks perfect on phones, tablets, and desktops.',
    icon: Smartphone,
    features: [
      'Mobile-First Design',
      'Cross-Platform Compatibility',
      'Touch-Optimized Interfaces',
      'PWA (Progressive Web Apps)'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'SKS PUBLIC SCHOOL',
    category: 'Dashboard',
    description: 'A real-time crypto analytics dashboard with interactive charts and dark mode.',
    techStack: ['React', 'D3.js', 'Tailwind', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop',
    liveLink: 'https://sks-public-school-415273004224.us-west1.run.app/',
    githubLink: 'https://github.com/vedhan7/SKS_PUBLIC_CBSE'
  },
  {
    id: '2',
    title: 'Byte Force - Attendance System',
    category: 'E-Commerce',
    description: 'A modern furniture store with 3D product previews and AR capabilities.',
    techStack: ['Next.js', 'Three.js', 'Stripe', 'PostgreSQL'],
    imageUrl: 'blob:null/1afab153-b29a-4ee6-a26c-2eb36b2fa7ab',
    liveLink: 'https://www.qandle.com/blog/wp-content/uploads/2024/07/AI-Based-Attendance-System-scaled.jpeg',
    githubLink: 'https://github.com/vedhan7/SMART-ATTENDANCE'
  },
  {
    id: '3',
    title: 'PR - Mobiles & Accessories',
    category: 'Web App',
    description: 'A comprehensive learning management system for schools with video streaming.',
    techStack: ['Vue.js', 'Firebase', 'WebRTC'],
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBRqYvQaHDHd7DJ7EQMBCi---ngqcfeb4qkw&s',
    liveLink: 'https://pr-cell-mobiles-accessories-showcase-415273004224.us-west1.run.app/',
    githubLink: 'https://github.com/vedhan7/prcellmobiles'
  },
  {
    id: '4',
    title: 'Portfolio',
    category: '3D/Interactive',
    description: 'An award-winning portfolio site featuring scroll-based animations and WebGL effects.',
    techStack: ['React', 'Framer Motion', 'WebGL'],
    imageUrl: 'https://static.resumegiants.com/wp-content/uploads/sites/25/2022/06/09105622/Professional-portfolio-736x414.webp',
    liveLink: 'https://cyberdev-portfolio-415273004224.us-west1.run.app/',
    githubLink: '#'
  }
];

export const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Vedhan',
    role: 'CEO & Developer',
    bio: 'Visionary leader driving technical excellence and business strategy. Expert in full-stack architecture.',
    // Replace the URL below with your actual hosted image URL
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQHxn6F7Tg6Fvw/profile-displayphoto-crop_800_800/B4EZlrukwnKkAM-/0/1758448996527?e=1766016000&v=beta&t=fEaVuVBQ0bn71v6-y0hnpUdzKilwqOlWYsdj7JHb8A4',
    socials: { 
      github: 'https://github.com/vedhan7', 
      linkedin: 'https://www.linkedin.com/in/vedhan-s-519957375/', 
    }
  },
  {
    id: '2',
    name: 'Imran Sheik',
    role: 'CTO & Developer',
    bio: 'Technical innovator overseeing system architecture and delivering cutting-edge digital solutions.',
    // Replace the URL below with your actual hosted image URL
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGTwgf4b0l3vg/profile-displayphoto-crop_800_800/B4DZob3uJ0GQAI-/0/1761404185938?e=1766016000&v=beta&t=QllI2zmNKLk92EWmTNMGnSFHqeSRu18V7ISD4yL3nkI',
    socials: { 
      github: '#', 
      linkedin: 'https://www.linkedin.com/in/imran-sheik/' 
    }
  },
  {
    id: '3',
    name: 'Abishek Raj',
    role: 'CFO & Marketing Lead',
    bio: 'Strategic financial planning combined with data-driven marketing to maximize brand growth.',
    // Replace the URL below with your actual hosted image URL
    avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGbBvlDJiecJw/profile-displayphoto-crop_800_800/B4DZreDVFtIgAI-/0/1764662007357?e=1766016000&v=beta&t=77sMsgELEel7LQPyO2sMMptexPna7RzVvBfi0nZAspw',
    socials: { 
      linkedin: 'https://www.linkedin.com/in/abishek-raj-647809311/', 
      github: '#' 
    }
  }
];

export const PRICING: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹1,000',
    description: 'Perfect for small businesses looking to establish a web presence.',
    features: [
      '5 Page Responsive Website',
      'Basic SEO Setup',
      'Contact Form Integration',
      '1 Month Support',
      'Mobile Optimized'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '₹3,499',
    description: 'Ideal for growing companies needing dynamic features.',
    recommended: true,
    features: [
      '10 Page Dynamic Website',
      'CMS Integration (Content Management)',
      'Advanced SEO & Analytics',
      'Blog / News Section',
      '3 Months Support',
      'Speed Optimization'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    price: '₹5,299',
    description: 'Full-scale custom development for complex requirements.',
    features: [
      'Unlimited Pages',
      'E-Commerce / Custom Web App',
      '3D Elements & Advanced Animations',
      'API Integrations & Dashboards',
      '6 Months Priority Support',
      'User Authentication'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [];

export const PROCESS_STEPS = [
  {
    title: 'Discovery',
    description: 'We meet to understand your goals, target audience, and functional requirements.',
    icon: Search
  },
  {
    title: 'Strategy & Design',
    description: 'We create wireframes and high-fidelity mockups aligned with your brand identity.',
    icon: PenTool
  },
  {
    title: 'Development',
    description: 'Our coding wizards build your site using the latest tech stack, ensuring speed and security.',
    icon: Code
  },
  {
    title: 'Launch & Scale',
    description: 'We deploy your site, set up analytics, and provide ongoing support for growth.',
    icon: Rocket
  }
];

export const FAQS = [
  {
    question: "How long does a typical project take?",
    answer: "For a standard 5-page website (Starter Plan), it typically takes 3-5 business days. Larger projects like E-commerce or Custom Apps can take 2-4 weeks depending on complexity."
  },
  {
    question: "Do you provide hosting and domain services?",
    answer: "Yes! We can handle domain registration and server setup. We recommend modern hosting solutions like Vercel or Netlify for best performance, but we can work with any provider."
  },
  {
    question: "Can I update the website content myself?",
    answer: "Absolutely. With our Professional and Business plans, we integrate a CMS (Content Management System) that allows you to edit text and images without touching code."
  },
  {
    question: "Is there a maintenance fee?",
    answer: "We offer free support for a limited time after launch (depending on your plan). After that, we offer optional monthly maintenance packages for security updates and content changes."
  },
  {
    question: "What is your refund policy?",
    answer: "We work in milestones. If you're not satisfied with the initial design phase, we offer a full refund. Once development begins, refunds are prorated based on work completed."
  }
];
