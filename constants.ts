import { 
  Code, 
  Palette, 
  Box, 
  ShoppingCart, 
  LayoutDashboard, 
  Smartphone 
} from 'lucide-react';
import { Service, Project, TeamMember, PricingTier, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Full-Stack Web Dev',
    description: 'Scalable, secure, and high-performance web applications built with modern frameworks.',
    icon: Code
  },
  {
    id: 'ui-ux',
    title: 'Modern UI/UX Design',
    description: 'User-centric designs that look stunning and provide seamless experiences across devices.',
    icon: Palette
  },
  {
    id: '3d-web',
    title: '3D & Interactive',
    description: 'Immersive 3D experiences using WebGL and Three.js to captivate your audience.',
    icon: Box
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Solutions',
    description: 'Custom online stores optimized for conversions, featuring secure payment integrations.',
    icon: ShoppingCart
  },
  {
    id: 'dashboard',
    title: 'Dashboards & Admin',
    description: 'Powerful data visualization tools and admin panels to manage your business efficiently.',
    icon: LayoutDashboard
  },
  {
    id: 'mobile',
    title: 'Responsive & Mobile',
    description: 'Mobile-first approach ensuring your site looks perfect on phones, tablets, and desktops.',
    icon: Smartphone
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nebula Finance Dashboard',
    category: 'Dashboard',
    description: 'A real-time crypto analytics dashboard with interactive charts and dark mode.',
    techStack: ['React', 'D3.js', 'Tailwind', 'Node.js'],
    imageUrl: 'https://picsum.photos/800/600?random=1',
    liveLink: '#',
    githubLink: '#'
  },
  {
    id: '2',
    title: 'Aero E-Commerce',
    category: 'E-Commerce',
    description: 'A modern furniture store with 3D product previews and AR capabilities.',
    techStack: ['Next.js', 'Three.js', 'Stripe', 'PostgreSQL'],
    imageUrl: 'https://picsum.photos/800/600?random=2',
    liveLink: '#',
    githubLink: '#'
  },
  {
    id: '3',
    title: 'EduLearn LMS',
    category: 'Web App',
    description: 'A comprehensive learning management system for schools with video streaming.',
    techStack: ['Vue.js', 'Firebase', 'WebRTC'],
    imageUrl: 'https://picsum.photos/800/600?random=3',
    liveLink: '#',
    githubLink: '#'
  },
  {
    id: '4',
    title: 'Zenith Portfolio',
    category: '3D/Interactive',
    description: 'An award-winning portfolio site featuring scroll-based animations and WebGL effects.',
    techStack: ['React', 'Framer Motion', 'WebGL'],
    imageUrl: 'https://picsum.photos/800/600?random=4',
    liveLink: '#',
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
      twitter: '#' 
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
    price: '₹79,999',
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
    id: 'business',
    name: 'Business',
    price: '₹1,99,999',
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
    id: 'premium',
    name: 'Premium / Custom',
    price: '₹3,99,999+',
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