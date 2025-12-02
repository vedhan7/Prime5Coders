
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Folder, 
  FileText, 
  MessageSquare, 
  Settings, 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  CreditCard,
  ExternalLink,
  ChevronRight,
  X,
  Plus,
  Send,
  Loader2
} from 'lucide-react';

// Mock Data
const MOCK_PROJECTS = [
  {
    id: 1,
    name: 'E-Commerce Platform Redesign',
    status: 'In Progress',
    progress: 75,
    deadline: 'Oct 25, 2024',
    tech: ['Next.js', 'Shopify'],
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Corporate Brand Identity',
    status: 'Completed',
    progress: 100,
    deadline: 'Sep 10, 2024',
    tech: ['Figma', 'React'],
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const MOCK_INVOICES = [
  { id: 'INV-2024-001', date: 'Sep 01, 2024', amount: '₹15,000', status: 'Paid' },
  { id: 'INV-2024-002', date: 'Oct 01, 2024', amount: '₹15,000', status: 'Pending' },
];

const INITIAL_TICKETS = [
  { id: 'TCK-102', subject: 'Payment Gateway Integration', status: 'Open', priority: 'High', date: '2 days ago' },
  { id: 'TCK-099', subject: 'Update Footer Links', status: 'Resolved', priority: 'Low', date: '1 week ago' },
];

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Ticket State
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    priority: 'Medium',
    description: ''
  });
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  useEffect(() => {
    // In a real app, we would check loading state first
    // For now, assuming if currentUser is null after render, redirect
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.description) return;

    setIsSubmittingTicket(true);

    // Simulate API call
    setTimeout(() => {
        const ticket = {
            id: `TCK-${Math.floor(Math.random() * 1000)}`,
            subject: newTicket.subject,
            status: 'Open',
            priority: newTicket.priority,
            date: 'Just now'
        };

        setTickets([ticket, ...tickets]);
        setNewTicket({ subject: '', priority: 'Medium', description: '' });
        setIsSubmittingTicket(false);
        setIsTicketModalOpen(false);
    }, 1000);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'projects':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_PROJECTS.map(project => (
                <div key={project.id} className="glass-card p-6 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-blue-500/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/5 overflow-hidden">
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                  <div className="flex gap-2 mb-4">
                    {project.tech.map(t => (
                        <span key={t} className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">{t}</span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-[#4b6bfb] h-2 rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'invoices':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices & Billing</h2>
                <button className="px-4 py-2 bg-[#4b6bfb] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                    Make Payment
                </button>
            </div>
            <div className="glass-card rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Invoice ID</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                  {MOCK_INVOICES.map(invoice => (
                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{invoice.id}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{invoice.date}</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">{invoice.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                            invoice.status === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                            {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-[#4b6bfb] transition-colors">
                            <Download size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'support':
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Support Tickets</h2>
                    <button 
                        onClick={() => setIsTicketModalOpen(true)}
                        className="px-4 py-2 bg-[#4b6bfb] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                        <Plus size={16} /> New Ticket
                    </button>
                </div>
                <div className="space-y-4">
                    {tickets.map(ticket => (
                        <div key={ticket.id} className="glass-card p-6 rounded-2xl border border-gray-200 dark:border-white/5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                                    {ticket.status === 'Resolved' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#4b6bfb] transition-colors">{ticket.subject}</h4>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span>ID: {ticket.id}</span>
                                        <span>•</span>
                                        <span>{ticket.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    ticket.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                                    ticket.priority === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                    {ticket.priority}
                                </span>
                                <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                    {tickets.length === 0 && (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            No tickets found. Need help? Create a new ticket.
                        </div>
                    )}
                </div>
            </div>
        );
      default: // overview
        return (
          <div className="space-y-8">
            {/* Welcome & Stats */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-[#4b6bfb]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-[#4b6bfb]">
                            <Folder size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">0</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Projects</div>
                </div>

                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-purple-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-500">
                            <CreditCard size={24} />
                        </div>
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded dark:bg-green-900/30 dark:text-green-400">All Paid</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">₹0</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Outstanding Invoice</div>
                </div>

                 <div className="glass-card p-6 rounded-2xl border-l-4 border-l-orange-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-500">
                            <MessageSquare size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{tickets.filter(t => t.status === 'Open').length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Open Tickets</div>
                </div>
              </div>
            </div>

            {/* Active Project Highlight - Empty State */}
            <div className="glass-card p-8 rounded-2xl border border-gray-200 dark:border-white/5 relative overflow-hidden text-center flex flex-col items-center justify-center min-h-[200px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Active Projects</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">You don't have any ongoing projects at the moment.</p>
                    <button 
                        onClick={() => navigate('/pricing')}
                        className="px-6 py-2.5 bg-[#4b6bfb] hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-lg"
                    >
                        Start New Project
                    </button>
                </div>
            </div>
            
            {/* Recent Activity */}
             <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="glass-card p-6 rounded-2xl border border-gray-200 dark:border-white/5">
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="mt-1 relative">
                                <div className="w-2 h-2 rounded-full bg-green-500 absolute top-2 left-[-5px] z-10 ring-4 ring-white dark:ring-[#0a0f1e]"></div>
                                <div className="h-full w-px bg-gray-200 dark:bg-white/10 absolute left-[-2px] top-2"></div>
                            </div>
                            <div>
                                <p className="text-gray-900 dark:text-white font-medium">Account Created</p>
                                <p className="text-sm text-gray-500">Just now</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="glass-card p-6 rounded-2xl sticky top-28">
              <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate max-w-[120px]">
                        {currentUser.displayName || currentUser.email?.split('@')[0]}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Client Account</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === 'overview' 
                      ? 'bg-[#4b6bfb] text-white shadow-lg shadow-blue-500/30' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <LayoutDashboard size={18} />
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('projects')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === 'projects' 
                      ? 'bg-[#4b6bfb] text-white shadow-lg shadow-blue-500/30' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <Folder size={18} />
                  Projects
                </button>
                <button 
                  onClick={() => setActiveTab('invoices')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === 'invoices' 
                      ? 'bg-[#4b6bfb] text-white shadow-lg shadow-blue-500/30' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <FileText size={18} />
                  Invoices
                </button>
                <button 
                  onClick={() => setActiveTab('support')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === 'support' 
                      ? 'bg-[#4b6bfb] text-white shadow-lg shadow-blue-500/30' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <MessageSquare size={18} />
                  Support
                </button>
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/5 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                    <Settings size={18} />
                    Settings
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
                    <Bell size={18} />
                    Notifications
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#0a0f1e] rounded-2xl w-full max-w-lg border border-gray-200 dark:border-white/10 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/5">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create New Ticket</h3>
                    <button 
                        onClick={() => setIsTicketModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4b6bfb] transition-all"
                            placeholder="Brief summary of the issue"
                            required
                            value={newTicket.subject}
                            onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                        <select 
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4b6bfb] transition-all"
                            value={newTicket.priority}
                            onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea 
                            rows={4}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4b6bfb] transition-all resize-none"
                            placeholder="Describe the issue in detail..."
                            required
                            value={newTicket.description}
                            onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button 
                            type="button"
                            onClick={() => setIsTicketModalOpen(false)}
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={isSubmittingTicket}
                            className="px-6 py-2 bg-[#4b6bfb] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-70"
                        >
                            {isSubmittingTicket ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Submit Ticket
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
