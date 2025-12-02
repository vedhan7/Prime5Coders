import React from 'react';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We provide comprehensive digital solutions tailored to your business needs. 
            From initial concept to final deployment, we handle it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {SERVICES.map((service) => (
            <div key={service.id} className="glass-card p-8 rounded-2xl flex flex-col h-full hover:border-blue-500/50 transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20">
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-8 flex-grow">{service.description}</p>
              
              <div className="space-y-3 mb-8">
                {/* Dummy features per service */}
                <div className="flex items-center text-sm text-gray-300">
                    <Check size={16} className="text-green-400 mr-2" />
                    <span>Clean & Modern Code</span>
                </div>
                 <div className="flex items-center text-sm text-gray-300">
                    <Check size={16} className="text-green-400 mr-2" />
                    <span>Optimized Performance</span>
                </div>
                 <div className="flex items-center text-sm text-gray-300">
                    <Check size={16} className="text-green-400 mr-2" />
                    <span>Scalable Architecture</span>
                </div>
              </div>

              <Link 
                to="/contact" 
                className="w-full block text-center py-3 rounded-lg border border-white/10 hover:bg-white/5 text-white font-semibold transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-3xl p-12 text-center border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to start your project?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Let's discuss how we can help your business grow with our technical expertise.
            </p>
            <Link 
                to="/contact"
                className="inline-block px-8 py-4 bg-[#4b6bfb] hover:bg-blue-600 text-white font-bold rounded-full transition-shadow hover:shadow-[0_0_20px_rgba(75,107,251,0.5)]"
            >
                Start Conversation
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;