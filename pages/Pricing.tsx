
import React, { useState } from 'react';
import { PRICING, FAQS } from '../constants';
import { Check, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../services/firebase';
import Pricing3D from '../components/Pricing3D';

const Pricing: React.FC = () => {
  const { currentUser } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Spotlight effect variables
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // 3D Tilt Logic
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 3 degrees for subtlety)
    const rotateX = ((y - centerY) / centerY) * -3; 
    const rotateY = ((x - centerX) / centerX) * 3;

    // Apply transform immediately for responsiveness
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    // Remove transition during movement to prevent lag
    card.style.transition = 'none';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    
    // Reset transform
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    // Add transition back for smooth return to resting state
    card.style.transition = 'transform 0.5s ease-out';
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const trackPlanSelect = (planName: string) => {
    if (analytics) {
      logEvent(analytics, 'select_item', {
        item_list_id: 'pricing_plans',
        item_list_name: 'Pricing Plans',
        items: [{ item_name: planName }]
      });
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Transparent Pricing</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Choose a package that suits your stage of growth. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {PRICING.map((tier) => (
            <div 
              key={tier.id} 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`group relative p-8 rounded-2xl flex flex-col will-change-transform ${
                tier.recommended 
                  ? 'bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/10 dark:to-[#050816] border-2 border-blue-500/50 shadow-xl dark:shadow-[0_0_30px_rgba(75,107,251,0.15)] z-10' 
                  : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 shadow-md dark:shadow-none'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Spotlight Overlay */}
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(75, 107, 251, 0.08), transparent 40%)`,
                  transform: 'translateZ(0px)',
                }}
              />

              {tier.recommended && (
                <div 
                  className="absolute -top-4 left-1/2 transform bg-[#4b6bfb] text-white text-xs font-bold px-4 py-1 rounded-full tracking-wider shadow-md z-20"
                  style={{ transform: 'translate3d(-50%, 0, 30px)' }}
                >
                  POPULAR
                </div>
              )}

              {/* 3D Object */}
              <div style={{ transform: 'translateZ(40px)' }}>
                <Pricing3D tierId={tier.id} />
              </div>
              
              <div className="text-center mb-8 mt-4 relative z-10" style={{ transform: 'translateZ(20px)' }}>
                <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">{tier.name}</h3>
                <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{tier.price}</span>
                    <span className="text-gray-500 ml-1">/project</span>
                </div>
                <p className="text-gray-500 text-sm mt-4">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow relative z-10" style={{ transform: 'translateZ(20px)' }}>
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check size={18} className="text-[#4b6bfb] mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                to={currentUser ? "/contact" : "/login"}
                onClick={() => trackPlanSelect(tier.name)}
                style={{ transform: 'translateZ(20px)' }}
                className={`w-full block text-center py-3 rounded-lg font-semibold transition-all relative z-10 ${
                  tier.recommended
                    ? 'bg-[#4b6bfb] hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white'
                }`}
              >
                Choose {tier.name}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400">Everything you need to know before getting started.</p>
          </div>
          
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-[#0a0f1e] border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm hover:border-blue-500/30 transition-colors"
              >
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-gray-900 dark:text-white font-medium pr-8">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp size={20} className="text-[#4b6bfb] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <div 
                  className={`px-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? 'max-h-48 py-4 border-t border-gray-100 dark:border-white/5 opacity-100' : 'max-h-0 py-0 opacity-0'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                <Info size={18} />
                Need a custom quote? <Link to="/contact" className="text-[#4b6bfb] hover:underline">Contact us</Link> for a tailored solution.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
