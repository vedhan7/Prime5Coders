
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { 
  LayoutDashboard, 
  Folder, 
  FileText, 
  MessageSquare, 
  Settings, 
  Bell, 
  CheckCircle, 
  AlertCircle,
  Download,
  CreditCard,
  ChevronRight,
  X,
  Plus,
  Send,
  Loader2
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Real Data State
  const [projects, setProjects] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    priority: 'Medium',
    description: ''
  });
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // 1. Fetch Projects
    const projectsQuery = query(
        collection(db, 'projects'), 
        where('userId', '==', currentUser.uid)
    );
    const unsubProjects = onSnapshot(projectsQuery, 
        (snapshot) => {
            const projData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(projData);
        },
        (error) => console.log("Projects listener:", error.code)
    );

    // 2. Fetch Invoices
    const invoicesQuery = query(
        collection(db, 'invoices'), 
        where('userId', '==', currentUser.uid)
    );
    const unsubInvoices = onSnapshot(invoicesQuery, 
        (snapshot) => {
            const invData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setInvoices(invData);
        },
        (error) => console.log("Invoices listener:", error.code)
    );

    // 3. Fetch Tickets
    const ticketsQuery = query(
        collection(db, 'tickets'), 
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
    );
    const unsubTickets = onSnapshot(ticketsQuery, 
        (snapshot) => {
            const tckData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTickets(tckData);
        },
        (error) => console.log("Tickets listener:", error.code)
    );

    return () => {
        unsubProjects();
        unsubInvoices();
        unsubTickets();
    };
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.description) return;

    setIsSubmittingTicket(true);

    try {
        await addDoc(collection(db, 'tickets'), {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            subject: newTicket.subject,
            description: newTicket.description,
            priority: newTicket.priority,
            status: 'Open',
            createdAt: serverTimestamp(),
            // Format a nice date for display fallback until serverTimestamp syncs
            displayDate: new Date().toLocaleDateString()
        });

        setNewTicket({ subject: '', priority: 'Medium', description: '' });
        setIsSubmittingTicket(false);
        setIsTicketModalOpen(false);
    } catch (error) {
        console.error("Error creating ticket", error);
        setIsSubmittingTicket(false);
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'projects':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(project => (
                <div key={project.id} className="glass-card p-6 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-blue-500/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                        <Folder className="text-[#4b6bfb]" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                  <div className="flex gap-2 mb-4">
                    {project.tech && project.tech.map((t: string) => (
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
              {projects.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400 glass-card rounded-2xl">
                    <Folder size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No projects found.</p>
                    <button 
                        onClick={() => navigate('/pricing')}
                        className="mt-4 text-[#4b6bfb] hover:underline"
                    >
                        Start a new project
                    </button>
                </div>
              )}
            </div>
          </div>
        );
      case 'invoices':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices & Billing</h2>
                <button className="px-4 py-2 bg-[#4b6bfb] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50" disabled={invoices.length === 0}>
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
                  {invoices.map(invoice => (
                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{invoice.displayId || invoice.id.substring(0,8)}</td>
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
                  {invoices.length === 0 && (
                     <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                            No invoices found.
                        </td>
                     </tr>
                  )}
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
                                        <span>ID: {ticket.id.substring(0,8)}</span>
                                        <span>•</span>
                                        <span>{ticket.displayDate || 'Recent'}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">{ticket.description}</p>
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
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400 glass-card rounded-2xl">
                            No tickets found. Need help? Create a new ticket.
                        </div>
                    )}
                </div>
            </div>
        );
      default: // overview
        const activeProjectsCount = projects.filter(p => p.status !== 'Completed').length;
        const openTicketsCount = tickets.filter(t => t.status === 'Open').length;
        // Basic calculation for outstanding - parsing currency strings would be better in a real app
        const outstandingAmount = 0; 

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
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{activeProjectsCount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Active Projects</div>
                </div>

                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-purple-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-500">
                            <CreditCard size={24} />
                        </div>
                        <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded dark:bg-green-900/30 dark:text-green-400">All Paid</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">₹{outstandingAmount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Outstanding Invoice</div>
                </div>

                 <div className="glass-card p-6 rounded-2xl border-l-4 border-l-orange-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-500">
                            <MessageSquare size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{openTicketsCount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Open Tickets</div>
                </div>
              </div>
            </div>

            {/* Active Project Highlight - Empty State */}
            {activeProjectsCount === 0 ? (
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
            ) : (
                <div className="glass-card p-6 rounded-2xl border border-gray-200 dark:border-white/5">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Current Projects</h3>
                    {projects.filter(p => p.status !== 'Completed').map(p => (
                        <div key={p.id} className="mb-4 last:mb-0">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{p.name}</span>
                                <span className="text-sm text-[#4b6bfb]">{p.progress}%</span>
                            </div>
                             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-[#4b6bfb] h-2 rounded-full transition-all duration-1000" style={{ width: `${p.progress}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
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
                                <p className="text-sm text-gray-500">Welcome to Prime5Coders!</p>
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
