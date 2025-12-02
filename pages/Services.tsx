
import React, { useEffect, useRef } from 'react';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Services: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-12');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Services</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            We provide comprehensive digital solutions tailored to your business needs. 
            From initial concept to final deployment, we handle it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              ref={(el) => { cardsRef.current[index] = el; }}
              className="glass-card p-8 rounded-2xl flex flex-col h-full hover:border-blue-500/50 transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group opacity-0 translate-y-12"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-blue-500/40">
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow">{service.description}</p>
              
              <div className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Check size={16} className="text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                  </div>
                ))}
              </div>

              {service.link ? (
                <a 
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 rounded-lg border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white font-semibold transition-colors"
                >
                  Visit Website
                </a>
              ) : (
                <Link 
                  to={currentUser ? "/pricing" : "/login"} 
                  className="w-full block text-center py-3 rounded-lg border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white font-semibold transition-colors"
                >
                  Get a Quote
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-3xl p-12 text-center border border-white/20 dark:border-white/10 shadow-lg dark:shadow-none">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to start your project?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
                Let's discuss how we can help your business grow with our technical expertise.
            </p>
            <Link 
                to={currentUser ? "/pricing" : "/login"}
                className="inline-block px-8 py-4 bg-[#4b6bfb] hover:bg-blue-600 text-white font-bold rounded-full transition-all animate-glow shadow-md"
            >
                Start Conversation
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
