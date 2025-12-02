
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { logEvent } from 'firebase/analytics';
import { analytics } from './services/firebase';

// Page Imports
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Route observer for ScrollToTop and Analytics
const RouteObserver = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Track Page View
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: pathname,
        page_title: document.title
      });
    }
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <RouteObserver />
          <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-[#050816] dark:text-white transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTopButton />
          </div>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
