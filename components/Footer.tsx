
import React from 'react';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-[#02040a] border-t border-gray-200 dark:border-white/5 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Prime5Coders</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              We code prime solutions for modern brands. Elevating your digital presence with cutting-edge web technologies.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4b6bfb] dark:text-gray-400 dark:hover:text-[#4b6bfb] transition-colors"><Github size={20} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4b6bfb] dark:text-gray-400 dark:hover:text-[#4b6bfb] transition-colors"><Linkedin size={20} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4b6bfb] dark:text-gray-400 dark:hover:text-[#4b6bfb] transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-[#4b6bfb] dark:text-gray-400 dark:hover:text-[#4b6bfb] text-sm">About Us</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-[#4b6bfb] dark:text-gray-400 dark:hover:text-[#4b6bfb] text-sm">Services</Link></li>
              <li><Link to="/projects" className="text-gray-600 hover:text-[#4b6bfb] dark:text-gray-400 dark:hover:text-[#4b6bfb] text-sm">Portfolio</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-[#4b6bfb] dark:text-gray-400 dark:hover:text-[#4b6bfb] text-sm">Pricing</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400 text-sm">Web Development</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">UI/UX Design</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">E-Commerce</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">3D Experiences</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 text-sm">
                <Mail size={16} className="text-[#4b6bfb]" />
                <span>contact@prime5coders.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 text-sm">
                <Phone size={16} className="text-[#4b6bfb]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 text-sm">
                <MapPin size={16} className="text-[#4b6bfb]" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/5 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Prime5Coders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
