
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, LogOut, User, LayoutDashboard, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { ADMIN_EMAILS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const isAdmin = currentUser && currentUser.email && ADMIN_EMAILS.includes(currentUser.email);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 dark:bg-[#050816]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
                src="https://www2.online-converting.com/upload/api_e9963a9052/result.jpg" 
                alt="Prime5Coders Logo" 
                className="w-10 h-10 object-contain transform group-hover:rotate-12 transition-transform drop-shadow-lg"
            />
            <span className="text-2xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-gray-400">
              Prime5Coders
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#4b6bfb] ${
                  location.pathname === link.path 
                    ? 'text-[#4b6bfb]' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 hover:text-[#4b6bfb] dark:text-gray-300 dark:hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-4">
                 {isAdmin && (
                    <Link
                      to="/admin"
                      className="p-2 text-red-500 hover:text-red-600 transition-colors"
                      title="Admin Dashboard"
                    >
                      <Shield size={20} />
                    </Link>
                 )}
                 {!isAdmin && (
                    <Link 
                        to="/dashboard"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#4b6bfb] ${
                            location.pathname === '/dashboard' ? 'text-[#4b6bfb]' : 'text-gray-600 dark:text-gray-300'
                        }`}
                    >
                        <LayoutDashboard size={18} />
                        <span className="hidden lg:inline">Dashboard</span>
                    </Link>
                 )}
                 <span className="text-sm text-gray-600 dark:text-gray-300 hidden xl:block flex items-center gap-2">
                    <User size={16} />
                    {currentUser.displayName?.split(' ')[0] || 'User'}
                 </span>
                 <button
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                    title="Log Out"
                 >
                    <LogOut size={20} />
                 </button>
                 <Link
                  to="/pricing"
                  className="px-5 py-2.5 rounded-full bg-[#4b6bfb] hover:bg-blue-600 text-white font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(75,107,251,0.5)] animate-glow"
                >
                  New Project
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-full bg-[#4b6bfb] hover:bg-blue-600 text-white font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(75,107,251,0.5)]"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 focus:outline-none"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-[#4b6bfb] dark:hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#050816] border-b border-gray-200 dark:border-white/10 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                   location.pathname === link.path 
                   ? 'text-[#4b6bfb] bg-blue-50 dark:bg-white/10 dark:text-white' 
                   : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#4b6bfb] dark:hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-white/5 mt-2">
                {currentUser ? (
                    <>
                        <div className="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                            Signed in as {currentUser.email}
                        </div>
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="block px-3 py-3 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 mb-2"
                            >
                                <div className="flex items-center gap-2">
                                    <Shield size={18} />
                                    Admin Portal
                                </div>
                            </Link>
                        )}
                        {!isAdmin && (
                            <Link
                                to="/dashboard"
                                className="block px-3 py-3 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-[#4b6bfb] dark:hover:text-white mb-2"
                            >
                                <div className="flex items-center gap-2">
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </div>
                            </Link>
                        )}
                         <Link
                            to="/pricing"
                            className="block w-full text-center px-5 py-3 rounded-md bg-[#4b6bfb] text-white font-bold shadow-lg mb-3 animate-glow"
                        >
                            New Project
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-center px-5 py-3 rounded-md bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white font-medium hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <Link
                    to="/login"
                    className="block w-full text-center px-5 py-3 rounded-md bg-[#4b6bfb] text-white font-bold shadow-lg"
                    >
                    Get Started
                    </Link>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
