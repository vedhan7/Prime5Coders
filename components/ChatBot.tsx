
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { generateBotResponse } from '../services/ai';
import { SERVICES, PRICING, TEAM, FAQS } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi there! I\'m PrimeBot. How can I help you build your dream website today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const prepareContextData = () => {
    const servicesText = SERVICES.map(s => `${s.title}: ${s.description}`).join('\n');
    const pricingText = PRICING.map(p => `${p.name} Plan: ${p.price}. Features: ${p.features.join(', ')}`).join('\n');
    const teamText = TEAM.map(t => `${t.name} (${t.role})`).join('\n');
    const faqText = FAQS.map(f => `Q: ${f.question} A: ${f.answer}`).join('\n');
    
    return `
      SERVICES:
      ${servicesText}

      PRICING:
      ${pricingText}

      TEAM:
      ${teamText}

      FAQs:
      ${faqText}
      
      CONTACT:
      Email: vedhanmail@gmail.com
      Phone: +91 82486 56311
      Location: Madurai, India
    `;
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Format history for Gemini API
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const context = prepareContextData();
    const responseText = await generateBotResponse(userMessage, history, context);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 left-8 z-50 p-4 rounded-full bg-[#4b6bfb] text-white shadow-[0_0_20px_rgba(75,107,251,0.5)] transition-all hover:scale-110 hover:bg-blue-600 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-8 left-8 z-50 w-[90vw] sm:w-[380px] h-[500px] flex flex-col bg-white dark:bg-[#0a0f1e] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300 origin-bottom-left ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full text-white">
                    <Bot size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold">PrimeBot</h3>
                    <p className="text-blue-100 text-xs flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Online
                    </p>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#050816]">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'model' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0 mt-1">
                            AI
                        </div>
                    )}
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user' 
                        ? 'bg-[#4b6bfb] text-white rounded-tr-none' 
                        : 'bg-white dark:bg-white/10 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-white/5 rounded-tl-none'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0 mt-1">
                        AI
                    </div>
                    <div className="bg-white dark:bg-white/10 p-3 rounded-2xl rounded-tl-none border border-gray-200 dark:border-white/5">
                        <Loader2 size={16} className="animate-spin text-gray-500" />
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 bg-white dark:bg-[#0a0f1e] border-t border-gray-200 dark:border-white/10 flex gap-2">
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pricing, services..." 
                className="flex-grow bg-gray-100 dark:bg-white/5 border border-transparent focus:border-[#4b6bfb] rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4b6bfb] transition-all"
            />
            <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="p-2 bg-[#4b6bfb] text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Send size={18} />
            </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
