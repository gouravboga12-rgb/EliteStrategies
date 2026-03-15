import { createIcons, Layout, Users, FileText, PieChart, LogOut, Search, Bell, CheckCircle, Clock, AlertCircle, Settings, Save, RefreshCw, PlusCircle, Trash2, CheckSquare } from 'lucide';
import '../style.css';
import { supabase } from '../lib/supabase.js';

// State management
let currentView = 'dashboard';
let inquiryFilter = 'all'; // 'all', 'paid', 'pending'
let inquiries = [];
let settings = [];
let isLoading = false;
let selectedInquiry = null;
let customFieldsTemp = []; // Temporary list for new service creation
let isSidebarOpen = false; // Mobile sidebar toggle state

const ALL_FIELDS = [
  { id: 'name', label: 'FullName' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'dob', label: 'DOB' },
  { id: 'pan', label: 'PAN' },
  { id: 'age', label: 'Age' },
  { id: 'income', label: 'Income' },
  { id: 'emi', label: 'EMI' },
  { id: 'loan_amount', label: 'Loan Amount' },
  { id: 'cibil_score', label: 'CIBIL Score' },
  { id: 'insurance_type', label: 'Insurance Type' },
  { id: 'account_type', label: 'Account Type' },
  { id: 'message', label: 'Message' },
  { id: 'booking', label: 'Date/Slot Booking' }
];

function renderAdmin() {
  const container = document.querySelector('#admin-app');
  if (!container) return;

  // Simple Login Check
  const isLoggedIn = sessionStorage.getItem('adminToken');
  if (!isLoggedIn) {
    renderLogin(container);
    return;
  }

  renderDashboard(container);
}

async function fetchData() {
  isLoading = true;
  renderAdmin();
  
  try {
    const { data: inquiryData, error: inquiryError } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (inquiryError) throw inquiryError;
    inquiries = inquiryData;

    const { data: settingsData, error: settingsError } = await supabase
      .from('settings')
      .select('*');
    
    if (settingsError) throw settingsError;
    settings = settingsData;
  } catch (err) {
    console.error('Error fetching data:', err.message);
  } finally {
    isLoading = false;
    renderAdmin();
  }
}

function renderLogin(container) {
  container.className = 'min-h-screen flex items-center justify-center bg-gray-900 px-6';
  container.innerHTML = `
    <div class="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 space-y-8 border border-gray-100">
      <div class="text-center">
        <div class="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-6">
          <i data-lucide="layout" class="w-10 h-10 text-primary"></i>
        </div>
        <h2 class="text-3xl font-bold text-gray-900">Admin Login</h2>
        <p class="text-gray-500 mt-2 text-sm">Elite Loan Strategies Management System</p>
      </div>
      
      <form id="login-form" class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Username</label>
          <input type="text" id="username" class="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" value="admin" required>
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Password</label>
          <input type="password" id="password" class="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" value="admin1122" required>
        </div>
        <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-xl">
          Sign In
        </button>
      </form>
      <p class="text-center text-xs text-gray-400">Demo Credentials: admin / admin1122</p>
    </div>
  `;

  createIcons({ icons: { Layout } });

  document.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.querySelector('#username').value;
    const pass = document.querySelector('#password').value;
    
    if (user === 'admin' && pass === 'admin1122') {
      sessionStorage.setItem('adminToken', 'demo');
      renderAdmin();
    } else {
      alert('Invalid credentials');
    }
  });
}

function renderDashboard(container) {
  container.className = 'min-h-screen flex bg-gray-50';
  
  const activeClass = "bg-primary text-white shadow-lg shadow-primary/20";
  const inactiveClass = "text-gray-500 hover:bg-gray-100";

  container.innerHTML = `
    <!-- Sidebar Backdrop (Mobile) -->
    <div id="sidebar-backdrop" class="fixed inset-0 bg-gray-900/50 z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}"></div>

    <!-- Sidebar -->
    <aside id="admin-sidebar" class="w-72 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out h-full">
      <div class="p-8 border-b border-gray-100 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg overflow-hidden shrink-0">
            <img src="/logo.png" alt="Logo" class="w-full h-full object-contain">
          </div>
          <div>
            <h1 class="text-lg font-black text-gray-900 leading-none tracking-tighter">ELITE LOAN</h1>
            <p class="text-[10px] text-primary font-bold tracking-[0.1em] uppercase mt-0.5">Strategies</p>
          </div>
        </div>
        <button id="close-sidebar" class="lg:hidden p-2 text-gray-400 hover:text-primary">
          <i data-lucide="x" class="w-6 h-6"></i>
        </button>
      </div>
      
      <nav class="flex-1 p-6 space-y-2">
        <button id="view-dashboard" class="flex items-center space-x-3 px-4 py-3 w-full rounded-xl font-medium transition-all ${currentView === 'dashboard' ? activeClass : inactiveClass}">
          <i data-lucide="pie-chart" class="w-5 h-5"></i>
          <span>Dashboard</span>
        </button>
        <button id="view-inquiries" class="flex items-center space-x-3 px-4 py-3 w-full rounded-xl font-medium transition-all ${currentView === 'inquiries' ? activeClass : inactiveClass}">
          <i data-lucide="users" class="w-5 h-5"></i>
          <span>Inquiries</span>
        </button>
        <button id="view-settings" class="flex items-center space-x-3 px-4 py-3 w-full rounded-xl font-medium transition-all ${currentView === 'settings' ? activeClass : inactiveClass}">
          <i data-lucide="settings" class="w-5 h-5"></i>
          <span>Price Settings</span>
        </button>
      </nav>
      
      <div class="p-6 border-t border-gray-100">
        <button id="logout-btn" class="flex items-center space-x-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl font-medium transition-all">
          <i data-lucide="log-out" class="w-5 h-5"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 lg:ml-72 min-w-0">
      <!-- Navbar -->
      <header class="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30">
        <div class="flex items-center space-x-4">
          <button id="menu-toggle" class="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <i data-lucide="menu" class="w-6 h-6"></i>
          </button>
          <h2 class="text-lg md:text-xl font-bold text-gray-900 capitalize">${currentView}</h2>
          ${isLoading ? '<i data-lucide="refresh-cw" class="w-4 h-4 md:w-5 h-5 text-primary animate-spin"></i>' : ''}
        </div>
        
        <div class="flex items-center space-x-4 md:space-x-6">
          <button id="refresh-btn" class="p-2 text-gray-400 hover:text-primary transition-colors hidden md:block">
            <i data-lucide="refresh-cw" class="w-5 h-5"></i>
          </button>
          <div class="flex items-center space-x-3 border-l border-gray-200 pl-4 md:pl-6">
            <div class="text-right hidden sm:block">
              <p class="text-sm font-bold text-gray-900">Admin</p>
              <p class="text-[10px] text-gray-500">Super Admin</p>
            </div>
            <div class="w-8 h-8 md:w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">A</div>
          </div>
        </div>
      </header>

      <div class="p-4 md:p-10">
        ${renderContent()}
      </div>
    </main>

    <!-- Details Modal -->
    ${selectedInquiry ? renderDetailsModal() : ''}
  `;

  createIcons({ icons: { Layout, Users, FileText, PieChart, LogOut, Search, Bell, CheckCircle, Clock, AlertCircle, Settings, Save, RefreshCw, PlusCircle, Trash2, CheckSquare, Menu, X } });

  // Sidebar Toggle Logic
  document.querySelector('#menu-toggle')?.addEventListener('click', () => {
    isSidebarOpen = true;
    renderAdmin();
  });

  document.querySelector('#close-sidebar')?.addEventListener('click', () => {
    isSidebarOpen = false;
    renderAdmin();
  });

  document.querySelector('#sidebar-backdrop')?.addEventListener('click', () => {
    isSidebarOpen = false;
    renderAdmin();
  });

  // Navigation Event Listeners
  document.querySelector('#view-dashboard').addEventListener('click', () => { 
    currentView = 'dashboard'; 
    isSidebarOpen = false;
    renderAdmin(); 
  });
  document.querySelector('#view-inquiries').addEventListener('click', () => { 
    currentView = 'inquiries'; 
    isSidebarOpen = false;
    renderAdmin(); 
  });
  document.querySelector('#view-settings').addEventListener('click', () => { 
    currentView = 'settings'; 
    isSidebarOpen = false;
    renderAdmin(); 
  });
  document.querySelector('#refresh-btn').addEventListener('click', fetchData);
  
  const addForm = document.querySelector('#add-service-form');
  if (addForm) {
    addForm.addEventListener('submit', addNewService);
  }

  document.querySelector('#logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem('adminToken');
    renderAdmin();
  });

  if (selectedInquiry) {
    document.querySelector('#close-modal').addEventListener('click', () => {
      selectedInquiry = null;
      renderAdmin();
    });
    const closeBtn = document.querySelector('#close-modal-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        selectedInquiry = null;
        renderAdmin();
      });
    }
  }
}

function renderContent() {
  if (currentView === 'dashboard') return renderStatsAndRecent();
  if (currentView === 'inquiries') return renderAllInquiries();
  if (currentView === 'settings') return renderSettingsView();
  return '';
}

function renderStatsAndRecent() {
  const paidInquiries = inquiries.filter(i => i.payment_status === 'Paid');
  const pendingInquiries = inquiries.filter(i => i.payment_status === 'Pending' || !i.payment_status);
  const totalRevenue = paidInquiries.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);

  return `
    <div class="space-y-10">
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div class="p-3 bg-green-50 text-green-600 rounded-2xl">
            <i data-lucide="check-circle" class="w-6 h-6"></i>
          </div>
          <div>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Paid</p>
            <h3 class="text-2xl font-bold mt-0.5">${paidInquiries.length}</h3>
          </div>
        </div>
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div class="p-3 bg-yellow-50 text-yellow-600 rounded-2xl">
            <i data-lucide="clock" class="w-6 h-6"></i>
          </div>
          <div>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Pending</p>
            <h3 class="text-2xl font-bold mt-0.5">${pendingInquiries.length}</h3>
          </div>
        </div>
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div class="p-3 bg-primary/10 text-primary rounded-2xl">
            <i data-lucide="pie-chart" class="w-6 h-6"></i>
          </div>
          <div>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Revenue</p>
            <h3 class="text-2xl font-bold mt-0.5">₹${totalRevenue.toLocaleString()}</h3>
          </div>
        </div>
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div class="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <i data-lucide="users" class="w-6 h-6"></i>
          </div>
          <div>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total</p>
            <h3 class="text-2xl font-bold mt-0.5">${inquiries.length}</h3>
          </div>
        </div>
      </div>

      <!-- Recent Inquiries -->
      <div class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
        <div class="p-8 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">Recent Service Inquiries</h3>
          <button onclick="currentView='inquiries'; renderAdmin();" class="text-primary font-bold text-sm hover:underline">View All</button>
        </div>
        ${renderInquiryTable(inquiries.slice(0, 5))}
      </div>
    </div>
  `;
}

function renderAllInquiries() {
  const filtered = inquiries.filter(i => {
    if (inquiryFilter === 'paid') return i.payment_status === 'Paid';
    if (inquiryFilter === 'pending') return i.payment_status === 'Pending' || !i.payment_status;
    return true;
  });

  const filterBtn = (type, label) => `
    <button onclick="window.setInquiryFilter('${type}')" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${inquiryFilter === type ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}">${label}</button>
  `;

  return `
    <div class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
      <div class="p-8 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
        <h3 class="text-xl font-bold text-gray-900">All Project Inquiries</h3>
        <div class="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          ${filterBtn('all', 'All View')}
          ${filterBtn('paid', 'Paid Only')}
          ${filterBtn('pending', 'Pending')}
        </div>
      </div>
      ${renderInquiryTable(filtered)}
    </div>
  `;
}

function renderInquiryTable(data) {
  return `
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
            <th class="px-8 py-4">Client Name</th>
            <th class="px-8 py-4">Service</th>
            <th class="px-8 py-4">Amount</th>
            <th class="px-8 py-4">Status</th>
            <th class="px-8 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          ${data.length > 0 ? data.map(inq => `
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="px-8 py-6">
                <div class="font-bold text-gray-900">${inq.name}</div>
                <div class="text-xs text-gray-500 font-medium mt-0.5">${inq.email} | ${inq.phone}</div>
              </td>
              <td class="px-8 py-6">
                <span class="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600 uppercase">${inq.service_name}</span>
              </td>
              <td class="px-8 py-6 font-bold text-gray-900">₹${inq.amount || '0'}</td>
              <td class="px-8 py-6">
                <span class="inline-flex items-center px-3 py-1 ${inq.payment_status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} rounded-full text-xs font-bold uppercase tracking-wide">
                  ${inq.payment_status || 'Pending'}
                </span>
                <div class="text-[10px] text-gray-400 mt-1">${new Date(inq.created_at).toLocaleDateString()}</div>
              </td>
              <td class="px-8 py-6 text-right flex items-center justify-end space-x-3">
                <button onclick="viewDetails('${inq.id}')" class="text-primary hover:text-primary-dark font-bold text-sm bg-primary/10 px-4 py-2 rounded-lg transition-colors">Details</button>
                <button onclick="window.deleteInquiry('${inq.id}')" class="text-red-600 hover:text-red-700 font-bold text-sm bg-red-50 px-4 py-2 rounded-lg transition-colors inline-flex items-center space-x-2" title="Delete Inquiry">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="5" class="px-8 py-12 text-center text-gray-400 italic font-medium">
                ${isLoading ? '<div class="flex items-center justify-center space-x-2"><i data-lucide="refresh-cw" class="w-5 h-5 animate-spin"></i><span>Fetching data...</span></div>' : 'No inquiries found.'}
              </td>
            </tr>
          `}
        </tbody>
      </table>
    </div>
  `;
}

function renderSettingsView() {
  return `
    <div class="max-w-6xl mx-auto space-y-12">
      <!-- Add New Service Section -->
      <div class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">Create New Service</h3>
            <p class="text-gray-500 mt-1">Define a new service and its required inquiry fields.</p>
          </div>
          <div class="bg-primary/10 p-3 rounded-2xl text-primary">
            <i data-lucide="plus-circle" class="w-6 h-6"></i>
          </div>
        </div>

        <form id="add-service-form" class="space-y-10">
          <!-- Main Info Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Service ID (URL slug)</label>
              <input name="id" type="text" placeholder="e.g. gold-loan" required class="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-primary focus:bg-white transition-all font-medium text-gray-900">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Display Name</label>
              <input name="name" type="text" placeholder="e.g. Gold Loan Fee" required class="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-primary focus:bg-white transition-all font-medium text-gray-900">
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Initial Price (₹)</label>
              <input name="price" type="number" placeholder="199" required class="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 outline-none focus:border-primary focus:bg-white transition-all font-bold text-gray-900">
            </div>
          </div>

          <!-- Standard Fields Grid -->
          <div class="space-y-4">
            <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Form Fields to Enable</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
              ${ALL_FIELDS.map(f => `
                <label class="flex items-center space-x-3 p-4 bg-gray-50/50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all border border-transparent has-[:checked]:border-primary/20 has-[:checked]:border-primary/30 has-[:checked]:bg-primary/5 group/field">
                  <input type="checkbox" name="fields" value="${f.id}" class="w-5 h-5 rounded-lg text-primary focus:ring-primary border-gray-300 transition-all" 
                    ${['name', 'email', 'phone', 'message'].includes(f.id) ? 'checked' : ''}>
                  <span class="text-[11px] font-bold text-gray-600 uppercase tracking-tight group-has-[:checked]/field:text-primary transition-colors">${f.label}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Manual Fields Section -->
          <div class="space-y-4 pt-6 border-t border-gray-100">
            <div class="flex items-center justify-between">
              <div>
                <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Manual/Custom Fields</label>
                <p class="text-[10px] text-gray-400 ml-1">Add fields not listed above (e.g., Mother's Name)</p>
              </div>
              <button type="button" onclick="addManualFieldUI()" class="bg-primary/5 hover:bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-bold transition-all border border-primary/10 flex items-center space-x-2">
                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                <span>Add Custom Field</span>
              </button>
            </div>
            <div id="custom-fields-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Custom fields dynamically added here -->
            </div>
          </div>

          <div class="flex justify-end pt-8">
            <button type="submit" class="bg-primary hover:bg-primary-dark text-white px-12 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 flex items-center space-x-3 hover:-translate-y-1 active:translate-y-0">
              <i data-lucide="plus-circle" class="w-6 h-6"></i>
              <span class="text-lg">Create Service & Form</span>
            </button>
          </div>
        </form>
      </div>

      <div class="space-y-6">
        <div class="flex items-center justify-between px-2">
          <h3 class="text-2xl font-bold text-gray-900">Existing Services & Forms</h3>
          <p class="text-xs text-gray-500 font-medium">Manage prices, names, and inquiry fields for each service</p>
        </div>
        
        <div class="space-y-6" id="settings-list">
          ${settings.map(s => {
            const config = Array.isArray(s.form_config) ? s.form_config : ['name', 'email', 'phone'];
            return `
              <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:border-primary/20 transition-all">
                <div class="p-8 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6">
                  <div class="flex-1 min-w-[200px] flex items-center space-x-4">
                    <div class="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-primary transition-colors">
                      <i data-lucide="settings" class="w-6 h-6"></i>
                    </div>
                    <div>
                      <input type="text" value="${s.name}" data-name-id="${s.id}" class="text-lg font-bold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-primary outline-none px-1">
                      <p class="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-wider px-1">Service ID: ${s.id}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-6">
                    <div class="relative">
                      <span class="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₹</span>
                      <input type="number" value="${s.price}" data-price-id="${s.id}" class="w-32 pl-8 pr-4 py-3 rounded-xl border border-gray-100 group-hover:border-gray-200 focus:border-primary outline-none text-right font-bold text-gray-900">
                    </div>
                    
                    <div class="flex items-center space-x-2">
                      <button onclick="updateService('${s.id}')" class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center space-x-2">
                        <i data-lucide="save" class="w-4 h-4"></i>
                        <span>Save</span>
                      </button>
                      <button onclick="deleteService('${s.id}')" class="bg-red-50 hover:bg-red-100 text-red-500 p-3 rounded-xl transition-colors border border-red-100">
                        <i data-lucide="trash-2" class="w-5 h-5"></i>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="p-8 bg-gray-50/50">
                  <div class="flex items-center justify-between mb-4">
                    <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Active Inquiry Form Fields</label>
                    <span class="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">${config.length} Fields</span>
                  </div>
                  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    ${ALL_FIELDS.map(f => {
                      const isChecked = config.some(cf => (typeof cf === 'string' ? cf === f.id : cf.id === f.id));
                      return `
                        <label class="flex items-center space-x-2 p-2 bg-white rounded-lg cursor-pointer border ${isChecked ? 'border-primary/30 bg-primary/5' : 'border-gray-100'} hover:border-primary/20 transition-all">
                          <input type="checkbox" data-field-for="${s.id}" value="${f.id}" class="w-3 h-3 rounded text-primary focus:ring-primary border-gray-300" ${isChecked ? 'checked' : ''}>
                          <span class="text-[10px] font-bold ${isChecked ? 'text-primary' : 'text-gray-500'} uppercase tracking-tight">${f.label}</span>
                        </label>
                      `;
                    }).join('')}
                  </div>
                  
                  <!-- Custom Fields for Existing Service -->
                  <div class="mt-6 pt-6 border-t border-gray-100">
                    <div class="flex items-center justify-between mb-4">
                      <label class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custom/Manual Fields</label>
                      <button type="button" onclick="addCustomFieldToExisting('${s.id}')" class="text-[10px] font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/10 transition-colors">
                        Add Custom Field
                      </button>
                    </div>
                    <div id="custom-fields-list-${s.id}" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      ${config.filter(cf => typeof cf === 'object').map(cf => `
                        <div class="flex items-center space-x-2 p-3 bg-white border border-gray-100 rounded-xl group/field">
                          <input type="text" value="${cf.label}" data-custom-field-for="${s.id}" data-field-id="${cf.id}" class="flex-1 bg-transparent border-none outline-none text-xs font-bold text-gray-700">
                          <button onclick="this.parentElement.remove()" class="text-gray-300 hover:text-red-500 transition-colors">
                            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                          </button>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
      
      <div class="bg-ash-light p-6 rounded-2xl border border-gray-200">
        <div class="flex items-start space-x-4">
          <i data-lucide="alert-circle" class="w-6 h-6 text-primary mt-1"></i>
          <div>
            <h5 class="font-bold text-gray-900 italic underline">Administrator Note</h5>
            <p class="text-sm text-gray-600 leading-relaxed mt-1">Changes to "Service Names" and "Form Fields" will update the public website instantly. Be careful when removing required fields like Name or Phone.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

window.addNewService = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  
  const id = formData.get('id').toLowerCase().replace(/\s+/g, '-');
  const name = formData.get('name');
  const price = parseFloat(formData.get('price'));
  
  // Standard fields
  const standardFields = Array.from(formData.getAll('fields'));
  
  // Custom fields from DOM
  const customFieldEntries = Array.from(document.querySelectorAll('.custom-field-input')).map(input => ({
    id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    label: input.value,
    type: 'text',
    custom: true
  })).filter(f => f.label.trim() !== '');

  const fieldList = [...standardFields, ...customFieldEntries];

  if (!id || !name || isNaN(price)) {
    alert('Please fill all fields correctly.');
    return;
  }

  const btn = form.querySelector('button');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="refresh-cw" class="w-4 h-4 animate-spin"></i>';
  createIcons({ icons: { RefreshCw } });

  try {
    const { error } = await supabase
      .from('settings')
      .insert([{ 
        id, 
        name, 
        price, 
        form_config: fieldList,
        updated_at: new Date().toISOString() 
      }]);

    if (error) {
      if (error.code === '23505') throw new Error('A service with this ID already exists.');
      throw error;
    }

    form.reset();
    await fetchData();
  } catch (err) {
    console.error('Insert error:', err.message);
    alert(err.message || 'Failed to add service');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="plus-circle" class="w-5 h-5"></i><span>Create Service & Form</span>';
    createIcons({ icons: { PlusCircle } });
  }
};

function renderDetailsModal() {
  const fields = [
    { label: 'Client Name', value: selectedInquiry.name },
    { label: 'Email', value: selectedInquiry.email },
    { label: 'Phone', value: selectedInquiry.phone },
    { label: 'Service', value: selectedInquiry.service_name },
    { label: 'Amount', value: `₹${selectedInquiry.amount}` },
    { label: 'Payment ID', value: selectedInquiry.payment_id },
    { label: 'Status', value: selectedInquiry.payment_status },
    { label: 'Inquiry Date', value: new Date(selectedInquiry.created_at).toLocaleString() },
    { label: 'Booking Date', value: selectedInquiry.booking_date || 'N/A' },
    { label: 'Booking Slot', value: selectedInquiry.booking_slot || 'N/A' },
    { label: 'Date of Birth', value: selectedInquiry.dob || 'N/A' },
    { label: 'PAN', value: selectedInquiry.pan || 'N/A' },
    { label: 'Age', value: selectedInquiry.age || 'N/A' },
    { label: 'Monthly Income', value: selectedInquiry.income ? `₹${selectedInquiry.income}` : null },
    { label: 'Current EMI', value: selectedInquiry.emi ? `₹${selectedInquiry.emi}` : null },
    { label: 'Loan Requirement', value: selectedInquiry.loan_requirement ? `₹${selectedInquiry.loan_requirement}` : null },
    { label: 'CIBIL Score', value: selectedInquiry.cibil_score || null },
    { label: 'Insurance Type', value: selectedInquiry.insurance_type || null },
    { label: 'Account Type', value: selectedInquiry.account_type || null },
    { label: 'Message', value: selectedInquiry.message || null, full: true }
  ].filter(f => f.value !== null && f.value !== undefined && f.value !== '');

  return `
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-6 overflow-y-auto">
      <div class="bg-white rounded-[2.5rem] w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div class="bg-gray-50 px-10 py-8 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-bold text-gray-900">Inquiry Details</h3>
            <p class="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">ID: ${selectedInquiry.id}</p>
          </div>
          <button id="close-modal" class="p-2 hover:bg-white rounded-xl transition-colors text-gray-400 hover:text-gray-600">
            <i data-lucide="log-out" class="w-6 h-6 rotate-180"></i>
          </button>
        </div>
        <div class="p-10 overflow-y-auto max-h-[70vh]">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            ${fields.map(f => `
              <div class="${f.full ? 'md:col-span-2' : ''} space-y-1">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">${f.label}</p>
                <div class="text-gray-900 font-medium ${f.full ? 'bg-gray-50 p-4 rounded-2xl border border-gray-100' : 'text-lg'}">
                  ${f.value}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="px-10 py-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          ${(!selectedInquiry.payment_status || selectedInquiry.payment_status === 'Pending') ? `
            <button onclick="markAsPaid('${selectedInquiry.id}')" class="text-green-600 hover:text-green-700 font-bold flex items-center space-x-2 bg-green-50 px-6 py-3 rounded-xl border border-green-100 transition-colors">
              <i data-lucide="check-circle" class="w-5 h-5"></i>
              <span>Mark as Paid</span>
            </button>
          ` : '<div></div>'}
          <button id="close-modal-btn" class="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">Close View</button>
        </div>
      </div>
    </div>
  `;
}

window.viewDetails = (id) => {
  selectedInquiry = inquiries.find(i => i.id === id);
  renderAdmin();
};

window.updateService = async (id) => {
  const nameInput = document.querySelector(`input[data-name-id="${id}"]`);
  const priceInput = document.querySelector(`input[data-price-id="${id}"]`);
  const fieldCheckboxes = document.querySelectorAll(`input[data-field-for="${id}"]:checked`);
  
  const newName = nameInput.value;
  const newPrice = parseFloat(priceInput.value);
  
  // Collect Standard Fields
  const standardFields = Array.from(fieldCheckboxes).map(cb => cb.value);
  
  // Collect Custom Fields
  const customFieldInputs = document.querySelectorAll(`input[data-custom-field-for="${id}"]`);
  const customFields = Array.from(customFieldInputs).map(input => ({
    id: input.dataset.fieldId,
    label: input.value,
    type: 'text',
    custom: true
  })).filter(f => f.label.trim() !== '');

  const selectedFields = [...standardFields, ...customFields];
  
  if (!newName || isNaN(newPrice)) {
    alert('Please enter a valid name and price');
    return;
  }

  const btn = nameInput.closest('.bg-white').querySelector('button[onclick*="updateService"]');
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="refresh-cw" class="w-4 h-4 animate-spin"></i>';
  createIcons({ icons: { RefreshCw } });

  try {
    const { error } = await supabase
      .from('settings')
      .update({ 
        name: newName, 
        price: newPrice, 
        form_config: selectedFields,
        updated_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) throw error;
    alert('Service & Form updated successfully!');
    await fetchData();
  } catch (err) {
    console.error('Update error:', err.message);
    alert('Failed to update service');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="save" class="w-4 h-4"></i><span>Save</span>';
    createIcons({ icons: { Save } });
  }
};

window.deleteService = async (id) => {
  if (!confirm(`Are you sure you want to delete the service "${id}"? This cannot be undone.`)) return;

  try {
    const { error, count } = await supabase
      .from('settings')
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw error;
    
    if (count === 0) {
      alert('Delete failed: This service could not be removed. This usually happens if the "Delete Permission" (RLS Policy) is missing in Supabase.');
      return;
    }

    alert('Service deleted successfully!');
    await fetchData();
  } catch (err) {
    console.error('Delete error:', err.message);
    alert(`Failed to delete service: ${err.message}`);
  }
};

window.setInquiryFilter = (filter) => {
  inquiryFilter = filter;
  renderAdmin();
};

window.markAsPaid = async (id) => {
  if (!confirm('Mark this inquiry as Paid? This will update the status and transaction date.')) return;

  try {
    const { error } = await supabase
      .from('inquiries')
      .update({ 
        payment_status: 'Paid',
        payment_id: 'MANUAL_PAYMENT',
        amount: selectedInquiry.amount || 0 // Ensure amount is set
      })
      .eq('id', id);

    if (error) throw error;
    
    selectedInquiry = null; // Close modal
    await fetchData();
    alert('Inquiry marked as Paid successfully!');
  } catch (err) {
    console.error('Update error:', err.message);
    alert('Failed to update status');
  }
};

window.deleteInquiry = async (id) => {
  if (!confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) return;

  try {
    const { error, count } = await supabase
      .from('inquiries')
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw error;
    
    if (count === 0) {
      alert('Delete failed: This inquiry could not be removed. This usually happens if the "Delete Permission" (RLS Policy) is missing in Supabase.');
      return;
    }

    await fetchData();
    alert('Inquiry deleted successfully!');
  } catch (err) {
    console.error('Delete error:', err.message);
    alert(`Failed to delete inquiry: ${err.message}`);
  }
};

// Helper functions for Custom Fields
window.addManualFieldUI = () => {
  const container = document.querySelector('#custom-fields-container');
  const div = document.createElement('div');
  div.className = 'flex items-center space-x-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm group animate-in slide-in-from-bottom-4 duration-300';
  div.innerHTML = `
    <div class="p-2 bg-primary/5 rounded-lg text-primary">
      <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
    </div>
    <input type="text" placeholder="Field Label (e.g. Office ID)" class="custom-field-input flex-1 bg-transparent border-none outline-none text-sm font-bold text-gray-700" required>
    <button type="button" onclick="this.parentElement.remove()" class="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
      <i data-lucide="trash-2" class="w-4 h-4"></i>
    </button>
  `;
  container.appendChild(div);
  createIcons({ icons: { Trash2, Edit3: FileText } }); // Using FileText as proxy for Edit3 if not imported
};

window.addCustomFieldToExisting = (serviceId) => {
  const container = document.querySelector(`#custom-fields-list-${serviceId}`);
  const div = document.createElement('div');
  div.className = 'flex items-center space-x-3 p-4 bg-gray-50/50 border border-gray-100 rounded-2xl group animate-in zoom-in duration-300 shadow-inner';
  div.innerHTML = `
    <i data-lucide="type" class="w-4 h-4 text-gray-400"></i>
    <input type="text" placeholder="Field Label" data-custom-field-for="${serviceId}" data-field-id="custom_${Date.now()}" class="flex-1 bg-transparent border-none outline-none text-xs font-bold text-gray-700 placeholder:text-gray-300">
    <button type="button" onclick="this.parentElement.remove()" class="p-1.5 text-gray-300 hover:text-red-500 rounded-lg transition-colors">
      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
    </button>
  `;
  container.appendChild(div);
  createIcons({ icons: { Trash2, Type: FileText } });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderAdmin();
  const isLoggedIn = sessionStorage.getItem('adminToken');
  if (isLoggedIn) fetchData();
});
