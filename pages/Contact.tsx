import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    budget: '',
    details: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
    setFormState({ name: '', email: '', budget: '', details: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-6">Let's Build Something<br />Amazing Together.</h1>
            <p className="text-gray-400 text-lg mb-10">
              Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-[#4b6bfb]">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email Us</h3>
                  <a href="mailto:contact@prime5coders.com" className="text-gray-400 hover:text-[#4b6bfb] transition-colors">
                    contact@prime5coders.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                 <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-[#4b6bfb]">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Call Us</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                  <a href="#" className="text-sm text-[#4b6bfb] hover:underline mt-1 block">Chat on WhatsApp</a>
                </div>
              </div>

               <div className="flex items-start space-x-4">
                 <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-[#4b6bfb]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Visit Us</h3>
                  <p className="text-gray-400">123 Tech Avenue, Silicon Valley<br />San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#0a0f1e] p-8 rounded-2xl border border-white/5 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full bg-[#050816] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb] transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full bg-[#050816] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb] transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">Estimated Budget</label>
                <select
                  id="budget"
                  name="budget"
                  value={formState.budget}
                  onChange={handleChange}
                  className="w-full bg-[#050816] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb] transition-all"
                >
                  <option value="">Select a range</option>
                  <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                  <option value="1l-3l">₹1,00,000 - ₹3,00,000</option>
                  <option value="3l-5l">₹3,00,000 - ₹5,00,000</option>
                  <option value="5l+">₹5,00,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  required
                  value={formState.details}
                  onChange={handleChange}
                  className="w-full bg-[#050816] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4b6bfb] focus:ring-1 focus:ring-[#4b6bfb] transition-all"
                  placeholder="Tell us about your project goals and timeline..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4b6bfb] hover:bg-blue-600 text-white font-bold py-4 rounded-lg flex items-center justify-center transition-all hover:shadow-[0_0_20px_rgba(75,107,251,0.5)]"
              >
                {status === 'success' ? 'Message Sent!' : (
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