
import React, { useState } from 'react';
import { PRICING, FAQS } from '../constants';
import { PricingTier } from '../types';
import { Check, Info, ChevronDown, ChevronUp, X, Loader2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logEvent } from 'firebase/analytics';
import { analytics, db } from '../services/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Pricing: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Order Form State
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    projectName: '',
    phone: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Calculate rotation (Increased intensity to max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;

    // Apply transform immediately for responsiveness
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
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

  const handleSelectPlan = (tier: PricingTier) => {
    if (!currentUser) {
        navigate('/login');
        return;
    }

    if (analytics) {
      logEvent(analytics, 'select_item', {
        item_list_id: 'pricing_plans',
        item_list_name: 'Pricing Plans',
        items: [{ item_name: tier.name }]
      });
    }

    setSelectedTier(tier);
    setShowOrderModal(true);
  };

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedTier) return;

    setIsSubmitting(true);

    try {
        // Save Order to Firestore
        await addDoc(collection(db, 'orders'), {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            userName: currentUser.displayName || 'Client',
            planId: selectedTier.id,
            planName: selectedTier.name,
            price: selectedTier.price,
            projectName: orderForm.projectName,
            clientPhone: orderForm.phone,
            requirements: orderForm.requirements,
            status: 'Pending Payment', // Initial status before payment gateway
            createdAt: serverTimestamp()
        });

        // Also create a "Project" entry so it shows up in Dashboard immediately (Optional, depends on workflow)
        // For now, we'll assume Admin approves it first.
        
        setIsSubmitting(false);
        setShowOrderModal(false);
        
        // Navigate to dashboard or a success page
        // Since we don't have a real payment gateway yet, we simulate success
        navigate('/dashboard'); 
        alert("Order details saved! Our team will contact you for payment.");
        
    } catch (error) {
        console.error("Error creating order:", error);
        setIsSubmitting(false);
        alert("Failed to save order details. Please try again.");
    }
  };

  return (
    <div className="pt-24 pb-20 relative">
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
                  background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(75, 107, 251, 0.15), transparent 40%)`,
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

              <button 
                onClick={() => handleSelectPlan(tier)}
                style={{ transform: 'translateZ(20px)' }}
                className={`w-full block text-center py-3 rounded-lg font-semibold transition-all relative z-10 ${
                  tier.recommended
                    ? 'bg-[#4b6bfb] hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white'
                }`}
              >
                Choose {tier.name}
              </button>
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

      {/* Order Details Modal */}
      {showOrderModal && selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#0a0f1e] rounded-2xl w-full max-w-lg border border-gray-200 dark:border-white/10 shadow-2xl scale-100 animate-in zoom-in-95 duration-200 relative">
                
                <button 
                    onClick={() => setShowOrderModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-6 border-b border-gray-100 dark:border-white/5">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Complete Your Order</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>Selected Plan:</span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-[#4b6bfb] font-semibold">
                            {selectedTier.name} - {selectedTier.price}
                        </span>
                    </div>
                </div>
                
                <form onSubmit={handleConfirmOrder} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name / Business Name <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4b6bfb] transition-all"
                            placeholder="e.g. My Online Store"
                            required
                            value={orderForm.projectName}
                            onChange={(e) => setOrderForm({...orderForm, projectName: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number <span className="text-red-500">*</span></label>
                        <input 
                            type="tel" 
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4b6bfb] transition-all"
                            placeholder="+91 99999 00000"
                            required
                            value={orderForm.phone}
                            onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Specific Requirements / Notes</label>
                        <textarea 
                            rows={3}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4b6bfb] transition-all resize-none"
                            placeholder="Tell us about any specific features or design preferences..."
                            value={orderForm.requirements}
                            onChange={(e) => setOrderForm({...orderForm, requirements: e.target.value})}
                        />
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#4b6bfb] hover:bg-blue-600 text-white font-bold py-4 rounded-lg flex items-center justify-center transition-all hover:shadow-[0_0_20px_rgba(75,107,251,0.5)] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={20} className="mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Proceed to Payment <ArrowRight size={20} className="ml-2" />
                                </>
                            )}
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-3">
                            You will be redirected to the secure payment gateway next.
                        </p>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;
