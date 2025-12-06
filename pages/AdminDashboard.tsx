
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ADMIN_EMAILS } from '../constants';
import { db } from '../services/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Shield, 
  MessageSquare, 
  AlertCircle, 
  Folder, 
  FileText, 
  CheckCircle,
  Clock,
  Send,
  Plus,
  X
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inquiries');

  // Data States
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  // Modals
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({ userId: '', name: '', progress: 0, status: 'Active', tech: '' });

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ userId: '', amount: '', status: 'Pending', displayId: '' });

  useEffect(() => {
    if (loading) return;

    if (!currentUser || !currentUser.email || !ADMIN_EMAILS.includes(currentUser.email)) {
      navigate('/');
      return;
    }

    // 1. Fetch Contact Inquiries
    const qInquiries = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
    const unsubInquiries = onSnapshot(qInquiries, 
        (snapshot) => {
            setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        },
        (error) => console.log("Inquiries listener:", error.code)
    );

    // 2. Fetch Tickets
    const qTickets = query(collection(db, 'tickets'), orderBy('createdAt', 'desc'));
    const unsubTickets = onSnapshot(qTickets, 
        (snapshot) => {
            setTickets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        },
        (error) => console.log("Tickets listener:", error.code)
    );

    // 3. Fetch Projects
    const qProjects = query(collection(db, 'projects'));
    const unsubProjects = onSnapshot(qProjects, 
        (snapshot) => {
            setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        },
        (error) => console.log("Projects listener:", error.code)
    );

    // 4. Fetch Invoices
    const qInvoices = query(collection(db, 'invoices'));
    const unsubInvoices = onSnapshot(qInvoices, 
        (snapshot) => {
            setInvoices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        },
        (error) => console.log("Invoices listener:", error.code)
    );

    return () => {
        unsubInquiries();
        unsubTickets();
        unsubProjects();
        unsubInvoices();
    };
  }, [currentUser, loading, navigate]);

  const updateTicketStatus = async (id: string, newStatus: string) => {
    try {
        await updateDoc(doc(db, 'tickets', id), { status: newStatus });
    } catch(e) { console.error("Update failed", e); }
  };

  const updateProjectProgress = async (id: string, progress: number) => {
    try {
        await updateDoc(doc(db, 'projects', id), { progress });
    } catch(e) { console.error("Update failed", e); }
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!newProject.userId) return alert("User ID required");
    
    try {
        await addDoc(collection(db, 'projects'), {
            userId: newProject.userId,
            name: newProject.name,
            progress: Number(newProject.progress),
            status: newProject.status,
            tech: newProject.tech.split(',').map(t => t.trim())
        });
        setShowProjectModal(false);
        setNewProject({ userId: '', name: '', progress: 0, status: 'Active', tech: '' });
    } catch(e) { console.error("Create failed", e); }
  };

  const createInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!newInvoice.userId) return alert("User ID required");

    try {
        await addDoc(collection(db, 'invoices'), {
            userId: newInvoice.userId,
            amount: newInvoice.amount,
            status: newInvoice.status,
            displayId: newInvoice.displayId || `INV-${Math.floor(Math.random()*10000)}`,
            date: new Date().toLocaleDateString()
        });
        setShowInvoiceModal(false);
        setNewInvoice({ userId: '', amount: '', status: 'Pending', displayId: '' });
    } catch(e) { console.error("Create failed", e); }
  };

  if (!currentUser) return null;

  return (
    <div className="pt-24 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
            <Shield size={32} className="text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Portal</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0">
                <div className="glass-card p-4 rounded-2xl sticky top-28 space-y-2">
                    <button onClick={() => setActiveTab('inquiries')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'inquiries' ? 'bg-[#4b6bfb] text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                        <MessageSquare size={18} /> Inquiries
                    </button>
                    <button onClick={() => setActiveTab('tickets')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'tickets' ? 'bg-[#4b6bfb] text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                        <AlertCircle size={18} /> Support Tickets
                    </button>
                    <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'projects' ? 'bg-[#4b6bfb] text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                        <Folder size={18} /> Projects
                    </button>
                    <button onClick={() => setActiveTab('invoices')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'invoices' ? 'bg-[#4b6bfb] text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'}`}>
                        <FileText size={18} /> Invoices
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow">
                {activeTab === 'inquiries' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Inquiries</h2>
                        {inquiries.map((msg) => (
                            <div key={msg.id} className="glass-card p-6 rounded-2xl border border-gray-200 dark:border-white/5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg dark:text-white">{msg.name}</h3>
                                        <p className="text-sm text-gray-500">{msg.email} • {msg.phone}</p>
                                    </div>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{msg.budget}</span>
                                </div>
                                <p className="mt-4 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-3 rounded-lg">{msg.message}</p>
                                <div className="mt-4 flex gap-2">
                                    <a href={`mailto:${msg.email}`} className="px-4 py-2 bg-[#4b6bfb] text-white rounded-lg text-sm flex items-center gap-2">
                                        <Send size={16} /> Reply
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'tickets' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Support Tickets</h2>
                        {tickets.map((t) => (
                            <div key={t.id} className="glass-card p-6 rounded-2xl border border-gray-200 dark:border-white/5">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg dark:text-white">{t.subject}</h3>
                                            <span className={`px-2 py-0.5 rounded text-xs ${t.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>{t.priority}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{t.userEmail}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {t.status === 'Open' ? (
                                            <button onClick={() => updateTicketStatus(t.id, 'Resolved')} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200">Mark Resolved</button>
                                        ) : (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-sm flex items-center gap-1"><CheckCircle size={14}/> Resolved</span>
                                        )}
                                    </div>
                                </div>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">{t.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Projects</h2>
                            <button onClick={() => setShowProjectModal(true)} className="px-4 py-2 bg-[#4b6bfb] text-white rounded-lg text-sm flex items-center gap-2"><Plus size={16}/> Add Project</button>
                        </div>
                        {projects.map(p => (
                            <div key={p.id} className="glass-card p-6 rounded-2xl border border-gray-200 dark:border-white/5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg dark:text-white">{p.name} <span className="text-sm font-normal text-gray-500">({p.userId})</span></h3>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{p.status}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input 
                                        type="range" 
                                        min="0" max="100" 
                                        value={p.progress} 
                                        onChange={(e) => updateProjectProgress(p.id, Number(e.target.value))}
                                        className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-sm font-bold dark:text-white">{p.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'invoices' && (
                    <div className="space-y-6">
                         <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h2>
                            <button onClick={() => setShowInvoiceModal(true)} className="px-4 py-2 bg-[#4b6bfb] text-white rounded-lg text-sm flex items-center gap-2"><Plus size={16}/> Create Invoice</button>
                        </div>
                        {invoices.map(inv => (
                             <div key={inv.id} className="glass-card p-4 rounded-xl flex justify-between items-center border border-gray-200 dark:border-white/5">
                                <div>
                                    <p className="font-bold dark:text-white">{inv.displayId}</p>
                                    <p className="text-xs text-gray-500">{inv.userId}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold dark:text-white">{inv.amount}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded ${inv.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{inv.status}</span>
                                </div>
                             </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#0a0f1e] p-6 rounded-2xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Add New Project</h3>
                <form onSubmit={createProject} className="space-y-4">
                    <input type="text" placeholder="Client User UID (from Firebase Auth)" className="w-full p-2 border rounded dark:bg-white/5 dark:text-white" value={newProject.userId} onChange={e => setNewProject({...newProject, userId: e.target.value})} required />
                    <input type="text" placeholder="Project Name" className="w-full p-2 border rounded dark:bg-white/5 dark:text-white" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} required />
                    <input type="text" placeholder="Tech Stack (comma separated)" className="w-full p-2 border rounded dark:bg-white/5 dark:text-white" value={newProject.tech} onChange={e => setNewProject({...newProject, tech: e.target.value})} />
                    <div className="flex gap-2 justify-end mt-4">
                        <button type="button" onClick={() => setShowProjectModal(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#4b6bfb] text-white rounded">Create</button>
                    </div>
                </form>
            </div>
        </div>
      )}

       {/* Invoice Modal */}
       {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#0a0f1e] p-6 rounded-2xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Create Invoice</h3>
                <form onSubmit={createInvoice} className="space-y-4">
                    <input type="text" placeholder="Client User UID" className="w-full p-2 border rounded dark:bg-white/5 dark:text-white" value={newInvoice.userId} onChange={e => setNewInvoice({...newInvoice, userId: e.target.value})} required />
                    <input type="text" placeholder="Amount (e.g. ₹5,000)" className="w-full p-2 border rounded dark:bg-white/5 dark:text-white" value={newInvoice.amount} onChange={e => setNewInvoice({...newInvoice, amount: e.target.value})} required />
                    <input type="text" placeholder="Invoice ID (Optional)" className="w-full p-2 border rounded dark:bg-white/5 dark:text-white" value={newInvoice.displayId} onChange={e => setNewInvoice({...newInvoice, displayId: e.target.value})} />
                    <div className="flex gap-2 justify-end mt-4">
                        <button type="button" onClick={() => setShowInvoiceModal(false)} className="px-4 py-2 text-gray-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[#4b6bfb] text-white rounded">Issue</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
