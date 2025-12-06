
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10">
        <div className="mb-8 flex justify-center">
            <div className="relative">
                <AlertTriangle size={80} className="text-[#4b6bfb] opacity-80" />
                <div className="absolute inset-0 animate-ping opacity-20 text-[#4b6bfb]">
                    <AlertTriangle size={80} />
                </div>
            </div>
        </div>
        
        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-4">
          404
        </h1>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center px-8 py-4 rounded-full bg-[#4b6bfb] hover:bg-blue-600 text-white font-bold text-lg transition-all animate-glow shadow-lg"
        >
          <Home size={20} className="mr-2" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
