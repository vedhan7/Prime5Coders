
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle, Loader2 } from 'lucide-react';
import { db, analytics } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  details?: string;
  form?: string;
}

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    details: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Refs for animation
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove initial hidden state and add visible state
            entry.target.classList.remove('opacity-0', 'scale-0');
            entry.target.classList.add('opacity-100', 'scale-100');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    iconRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name Validation
    if (!formState.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    }

    // Email Validation
    if (!formState.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone Validation (Optional but recommended to be digits)
    if (formState.phone && !/^\+?[\d\s-]{10,}$/.test(formState.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    // Details Validation
    if (!formState.details.trim()) {
      newErrors.details = 'Project details are required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setStatus('submitting');
      
      try {
        await addDoc(collection(db, "contactMessages"), {
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          budget: formState.budget,
          message: formState.details, // Saving as 'message' to match your requested structure
          createdAt: serverTimestamp(),
        });

        // Track Lead Generation
        if (analytics) {
          logEvent(analytics, 'generate_lead', {
            currency: 'INR',
            value: formState.budget === 'under-2k' ? 1000 : 5000, // Approximate value estimation
            budget_range: formState.budget
          });
        }
        
        setStatus('success');
        setFormState({ name: '', email: '', phone: '', budget: '', details: '' });
        setErrors({});
        
        // Reset success message after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      } catch (error) {
        console.error("Error saving message:", error);
        setStatus('error');
        setErrors(prev => ({...prev, form: "Failed to send message. Please try again later."}));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Let's Build Something<br />Amazing Together.</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
              Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div 
                  ref={(el) => { if(el) iconRefs.current[0] = el; }}
                  className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-white/5 flex items-center justify-center text-[#4b6bfb] hover:text-blue-400 hover:scale-110 shadow-sm dark:shadow-none transition-all duration-700 hover:duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] opacity-0 scale-0 cursor-default"
                >
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-1">Email Us</h3>
                  <a href="mailto:contact@prime5coders.com" className="text-gray-600 hover:text-[#4b6bfb] dark:text-gray-400 dark:hover:text-[#4b6bfb] transition-colors">
                    contact@prime5coders.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                 <div 
                  ref={(el) => { if(el) iconRefs.current[1] = el; }}
                  className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-white/5 flex items-center justify-center text-[#4b6bfb] hover:text-blue-400 hover:scale-110 shadow-sm dark:shadow-none transition-all duration-700 hover:duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] opacity-0 scale-0 cursor-default delay-100"
                 >
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-1">Call Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  <a href="#" className="text-sm text-[#4b6bfb] hover:underline mt-1 block">Chat on WhatsApp</a>
                </div>
              </div>

               <div className="flex items-start space-x-4">
                 <div 
                  ref={(el) => { if(el) iconRefs.current[2] = el; }}
                  className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-white/5 flex items-center justify-center text-[#4b6bfb] hover:text-blue-400 hover:scale-110 shadow-sm dark:shadow-none transition-all duration-700 hover:duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] opacity-0 scale-0 cursor-default delay-200"
                 >
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-1">Visit Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">123 Tech Avenue, Silicon Valley<br />San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-[#0a0f1e] p-8 rounded-2xl border border-gray-200 dark:border-white/5 shadow-xl dark:shadow-2xl">
            {errors.form && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-start">
                <AlertCircle size={18} className="mt-0.5 mr-2 flex-shrink-0" />
                {errors.form}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 dark:bg-[#050816] border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none transition-all ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-white/10 focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb]'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 dark:bg-[#050816] border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none transition-all ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-white/10 focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb]'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 dark:bg-[#050816] border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none transition-all ${
                    errors.phone
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-white/10 focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb]'
                  }`}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1.5" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Budget</label>
                <select
                  id="budget"
                  name="budget"
                  value={formState.budget}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-[#050816] border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb] transition-all"
                >
                  <option value="">Select a range</option>
                  <option value="under-2k">Under ₹2,000</option>
                  <option value="2k-5k">₹2,000 - ₹5,000</option>
                  <option value="5k-10k">₹5,000 - ₹10,000</option>
                  <option value="10k+">₹10,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Details <span className="text-red-500">*</span></label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  value={formState.details}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 dark:bg-[#050816] border rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none transition-all ${
                    errors.details
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-white/10 focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb]'
                  }`}
                  placeholder="Tell us about your project goals and timeline..."
                ></textarea>
                {errors.details && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center">
                    <AlertCircle size={14} className="mr-1.5" />
                    {errors.details}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#4b6bfb] hover:bg-blue-600 text-white font-bold py-4 rounded-lg flex items-center justify-center transition-all hover:shadow-[0_0_20px_rgba(75,107,251,0.5)] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                disabled={status === 'submitting' || status === 'success'}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  'Message Sent!'
                ) : (
                  <>Send Message <Send size={18} className="ml-2" /></>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
