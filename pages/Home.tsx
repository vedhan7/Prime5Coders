
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES, PROJECTS } from '../constants';
import { BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import ThreeBackground from '../components/ThreeBackground';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Mock data for the chart
  const chartData = [
    { name: 'Jan', value: 0 },
    { name: 'Feb', value: 0 },
    { name: 'Mar', value: 0 },
    { name: 'Apr', value: 0 },
    { name: 'May', value: 0 },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        
        {/* 3D Background */}
        <ThreeBackground />

        {/* Static Background Effects (Blur) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide backdrop-blur-sm">
            WE CODE THE FUTURE
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
            We code <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">prime solutions</span><br />
            for modern brands.
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            A premium agency specializing in 3D interactive web experiences, full-stack development, and data-driven dashboards.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={currentUser ? "/contact" : "/login"}
              className="px-8 py-4 rounded-full bg-[#4b6bfb] hover:bg-blue-600 text-white font-bold text-lg transition-all animate-glow shadow-lg"
            >
              Order Your First Site
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 rounded-full bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold text-lg transition-all backdrop-blur-sm"
            >
              View Our Work
            </Link>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 mx-auto max-w-4xl p-4 glass-card rounded-xl border-t border-gray-200 dark:border-white/10 shadow-2xl transform hover:scale-[1.01] transition-transform duration-500">
             <div className="flex items-center justify-start mb-4 border-b border-gray-200 dark:border-white/5 pb-4 px-4">
                <div className="text-xs text-gray-500">dashboard_analytics.tsx</div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 pb-4">
                <div className="space-y-4 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Performance</h3>
                    <div className="h-40 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <Bar dataKey="value" fill="#4b6bfb" radius={[4, 4, 0, 0]} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--tw-prose-invert-bg)', borderColor: 'transparent' }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="space-y-4 text-left flex flex-col justify-center">
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Active Users</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5">
                         <p className="text-gray-500 dark:text-gray-400 text-sm">Revenue Growth</p>
                        <p className="text-3xl font-bold text-gray-400 dark:text-gray-300">0%</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Snippet */}
      <section className="py-24 bg-gray-50 dark:bg-[#050816] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What We Do</h2>
                <p className="text-gray-600 dark:text-gray-400">Expertise spanning across the entire digital spectrum.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SERVICES.slice(0, 3).map((service) => (
                    <div key={service.id} className="p-8 glass-card rounded-2xl hover:border-blue-500/30 transition-colors group">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                            <service.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{service.description}</p>
                        <Link to="/services" className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center hover:gap-2 transition-all">
                            Learn More <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white dark:bg-[#02040a] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Work</h2>
                    <p className="text-gray-600 dark:text-gray-400">Highlights from our recent deployments.</p>
                </div>
                <Link to="/projects" className="hidden md:flex text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors items-center">
                    View All Projects <ArrowRight size={16} className="ml-2" />
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECTS.slice(0, 2).map((project) => (
                    <div key={project.id} className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 shadow-md dark:shadow-none">
                        <div className="aspect-video w-full overflow-hidden">
                            <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-gray-300 mb-4">{project.description}</p>
                            <div className="flex gap-2">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="text-xs font-mono bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center md:hidden">
                <Link to="/projects" className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center">
                    View All Projects <ArrowRight size={16} className="ml-2" />
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
