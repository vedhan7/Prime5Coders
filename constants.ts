import { 
  Code, 
  Palette, 
  Box, 
  ShoppingCart, 
  LayoutDashboard, 
  Smartphone,
  Globe,
  Lock
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
    imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vedantu.com%2Fblog%2Ftop-10-cbse-schools-in-india&psig=AOvVaw23cCzGIZEcXppnu_Mdrs9F&ust=1764755319332000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOil3ITQnpEDFQAAAAAdAAAAABAE',
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
    liveLink: 'https://byteforce-attendance-dashboard-415273004224.us-west1.run.app/',
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
    avatarUrl: 'https://picsum.photos/200/200?random=10',
    socials: { 
      github: '#', 
      linkedin: 'https://www.linkedin.com/in/vedhan-s-519957375/', 
      twitter: 'https://github.com/vedhan7/Portfolio' 
    }
  },
  {
    id: '2',
    name: 'Imran Sheik',
    role: 'CTO & Developer',
    bio: 'Technical innovator overseeing system architecture and delivering cutting-edge digital solutions.',
    avatarUrl: 'https://picsum.photos/200/200?random=11',
    socials: { 
      github: '#', 
      linkedin: 'https://www.linkedin.com/in/imran-sheik/' 
    }
  },
  {
    id: '3',
    name: 'Abhishek Raj',
    role: 'CFO & Marketing Lead',
    bio: 'Strategic financial planning combined with data-driven marketing to maximize brand growth.',
    avatarUrl: 'https://picsum.photos/200/200?random=12',
    socials: { 
      linkedin: 'https://www.linkedin.com/in/abishek-raj-647809311/', 
      twitter: '#' 
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