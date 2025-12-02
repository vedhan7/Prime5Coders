import React from 'react';
import { PRICING } from '../constants';
import { Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Transparent Pricing</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Choose a package that suits your stage of growth. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING.map((tier) => (
            <div 
              key={tier.id} 
              className={`relative p-8 rounded-2xl flex flex-col ${
                tier.recommended 
                  ? 'bg-gradient-to-b from-blue-900/20 to-[#050816] border border-blue-500/50 shadow-[0_0_30px_rgba(75,107,251,0.15)]' 
                  : 'bg-white/5 border border-white/5'
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#4b6bfb] text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider">
                  POPULAR
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-medium text-gray-300 mb-2">{tier.name}</h3>
                <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-500 ml-1">/project</span>
                </div>
                <p className="text-gray-500 text-sm mt-4">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check size={18} className="text-[#4b6bfb] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/contact"
                className={`w-full block text-center py-3 rounded-lg font-semibold transition-all ${
                  tier.recommended
                    ? 'bg-[#4b6bfb] hover:bg-blue-600 text-white shadow-lg'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                Choose {tier.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <p className="text-gray-400 flex items-center justify-center gap-2">
                <Info size={18} />
                Need a custom quote? <Link to="/contact" className="text-[#4b6bfb] hover:underline">Contact us</Link> for a tailored solution.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;