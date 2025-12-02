
import React from 'react';
import { TEAM, PROCESS_STEPS } from '../constants';
import { Github, Linkedin, Twitter } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Prime5Coders started with a simple idea: to bridge the gap between complex engineering and beautiful design. 
            Founded by passionate developers, we've grown into a full-service digital agency that treats every project as a masterpiece.
            We don't just write code; we build digital ecosystems that help businesses thrive in the modern web.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 border-y border-gray-200 dark:border-white/5 py-12">
            <div className="text-center">
                <div className="text-4xl font-bold text-[#4b6bfb] mb-2">4+</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div className="text-center">
                <div className="text-4xl font-bold text-[#4b6bfb] mb-2">24/7</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">Support</div>
            </div>
            <div className="text-center">
                <div className="text-4xl font-bold text-[#4b6bfb] mb-2">100%</div>
                <div className="text-gray-500 text-sm uppercase tracking-wider">Client Satisfaction</div>
            </div>
        </div>

        {/* How We Work (Process Timeline) */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">How We Work</h2>
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 dark:bg-white/10 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {PROCESS_STEPS.map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-full bg-white dark:bg-[#0a0f1e] border-4 border-gray-100 dark:border-gray-800 flex items-center justify-center mb-6 shadow-lg group-hover:border-[#4b6bfb] group-hover:scale-110 transition-all duration-300">
                    <step.icon size={32} className="text-gray-400 group-hover:text-[#4b6bfb] transition-colors" />
                  </div>
                  <div className="bg-white dark:bg-[#0a0f1e] px-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Meet The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.id} className="glass-card p-6 rounded-2xl text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <img 
                        src={member.avatarUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover rounded-full border-2 border-white/20 dark:border-white/10 relative z-10"
                    />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-[#4b6bfb] text-sm font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  {member.socials.github && (
                    <a 
                      href={member.socials.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a 
                      href={member.socials.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-[#0077b5] dark:text-gray-500 dark:hover:text-white transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                   {member.socials.twitter && (
                    <a 
                      href={member.socials.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-500 hover:text-[#1da1f2] dark:text-gray-500 dark:hover:text-white transition-colors"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
