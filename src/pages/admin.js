import { createIcons, Layout, Users, FileText, PieChart, LogOut, Search, Bell, CheckCircle, Clock, AlertCircle } from 'lucide';
import '../style.css';

// Mock state management
let inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');

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

let selectedCategory = 'all';
let searchQuery = '';

function renderDashboard(container) {
  inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
  
  // Filter logic
  let filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = inq.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inq.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.serviceName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || inq.serviceName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Unique services for filter
  const services = [...new Set(inquiries.map(inq => inq.serviceName))];

  container.className = 'min-h-screen flex bg-gray-50';
  container.innerHTML = `
    <!-- Sidebar -->
    <aside class="w-72 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
      <div class="p-8 border-b border-gray-100 flex items-center space-x-3">
        <div class="bg-primary p-2 rounded-lg">
          <i data-lucide="layout" class="w-6 h-6 text-white"></i>
        </div>
        <span class="text-xl font-bold text-gray-900 tracking-tight">ELITE LOAN</span>
      </div>
      
      <nav class="flex-1 p-6 space-y-2">
        <button onclick="window.switchTab('dashboard')" class="w-full flex items-center space-x-3 px-4 py-3 ${selectedCategory === 'all' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-100'} rounded-xl font-medium transition-all">
          <i data-lucide="pie-chart" class="w-5 h-5"></i>
          <span>All Inquiries</span>
        </button>
        
        <div class="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Sub Services</div>
        ${services.map(service => `
          <button onclick="window.setFilter('${service}')" class="w-full flex items-center space-x-3 px-4 py-3 ${selectedCategory === service ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-100'} rounded-xl font-medium transition-all">
            <i data-lucide="file-text" class="w-4 h-4"></i>
            <span class="truncate">${service}</span>
          </button>
        `).join('')}
      </nav>
      
      <div class="p-6 border-t border-gray-100">
        <button id="logout-btn" class="flex items-center space-x-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl font-medium transition-all">
          <i data-lucide="log-out" class="w-5 h-5"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 ml-72">
      <!-- Navbar -->
      <header class="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-10 sticky top-0 z-0">
        <div class="relative w-96">
          <i data-lucide="search" class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"></i>
          <input type="text" id="admin-search" placeholder="Search inquiries..." value="${searchQuery}" class="w-full pl-12 pr-4 py-2 bg-gray-50 border border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all">
        </div>
        
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-3 border-l border-gray-200 pl-6">
            <div class="text-right">
              <p class="text-sm font-bold text-gray-900">Admin User</p>
              <p class="text-xs text-gray-500">Super Admin</p>
            </div>
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
          </div>
        </div>
      </header>

      <div class="p-10 space-y-10">
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div class="p-4 bg-green-50 text-green-600 rounded-2xl">
              <i data-lucide="check-circle" class="w-8 h-8"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">Filtered Inquiries</p>
              <h3 class="text-3xl font-bold mt-1">${filteredInquiries.length}</h3>
            </div>
          </div>
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div class="p-4 bg-blue-50 text-blue-600 rounded-2xl">
              <i data-lucide="clock" class="w-8 h-8"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">Total Revenue</p>
              <h3 class="text-3xl font-bold mt-1">₹${filteredInquiries.reduce((sum, inq) => sum + (inq.amount || 0), 0)}</h3>
            </div>
          </div>
           <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div class="p-4 bg-purple-50 text-purple-600 rounded-2xl">
              <i data-lucide="users" class="w-8 h-8"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">Distinct Clients</p>
              <h3 class="text-3xl font-bold mt-1">${new Set(filteredInquiries.map(inq => inq.email)).size}</h3>
            </div>
          </div>
        </div>

        <!-- Recent Inquiries -->
        <div class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
          <div class="p-8 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900">${selectedCategory === 'all' ? 'All Service Inquiries' : selectedCategory}</h3>
            <div class="flex items-center space-x-4">
               <span class="text-xs text-gray-400 font-medium">Showing ${filteredInquiries.length} records</span>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <th class="px-8 py-4">Client Name</th>
                  <th class="px-8 py-4">Service</th>
                  <th class="px-8 py-4">Assigned Slot</th>
                  <th class="px-8 py-4">Status</th>
                  <th class="px-8 py-4">Date</th>
                  <th class="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                ${filteredInquiries.length > 0 ? filteredInquiries.map(inq => `
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-8 py-6">
                      <div class="font-bold text-gray-900 italic">${inq.name || inq.fullName}</div>
                      <div class="text-xs text-gray-500 font-medium mt-0.5">${inq.email}</div>
                    </td>
                    <td class="px-8 py-6">
                       <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">${inq.serviceName}</span>
                    </td>
                    <td class="px-8 py-6">
                       <div class="flex items-center space-x-2">
                          <input type="text" value="${inq.slot || 'Not Assigned'}" 
                                 onchange="window.updateSlot(${inq.id}, this.value)"
                                 class="text-xs font-bold px-3 py-1.5 border border-gray-200 rounded-lg bg-white focus:border-primary outline-none transition-all w-32 ${inq.slot && inq.slot !== 'Not Assigned' ? 'text-primary' : 'text-gray-400'}">
                       </div>
                    </td>
                    <td class="px-8 py-6">
                      <span class="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">Paid</span>
                    </td>
                    <td class="px-8 py-6 text-gray-500 text-sm font-medium">${new Date(inq.date).toLocaleDateString()}</td>
                    <td class="px-8 py-6 text-right space-x-2">
                      <button onclick="window.viewDetails(${inq.id})" class="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-50 rounded-xl hover:bg-white hover:shadow-md">
                        <i data-lucide="eye" class="w-5 h-5"></i>
                      </button>
                    </td>
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="6" class="px-8 py-12 text-center text-gray-400 italic font-medium">No matches found for your search or filter.</td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Details Modal -->
    <div id="details-modal" class="fixed inset-0 z-[100] hidden flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-6">
       <div class="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col p-10 animate-in fade-in zoom-in duration-300">
          <div class="flex justify-between items-start mb-8">
             <div>
                <h3 class="text-3xl font-bold text-gray-900" id="modal-title">Inquiry Details</h3>
                <p class="text-gray-500 font-medium" id="modal-subtitle"></p>
             </div>
             <button onclick="window.closeModal()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <i data-lucide="x" class="w-6 h-6"></i>
             </button>
          </div>
          <div class="flex-1 overflow-y-auto pr-4 space-y-6" id="modal-content">
             <!-- Details go here -->
          </div>
       </div>
    </div>
  `;

  createIcons({ icons: { Layout, Users, FileText, PieChart, LogOut, Search, Bell, CheckCircle, Clock, AlertCircle, Eye, X } });

  // Event Listeners
  document.querySelector('#logout-btn')?.addEventListener('click', () => {
    sessionStorage.removeItem('adminToken');
    renderAdmin();
  });

  document.querySelector('#admin-search')?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderDashboard(container);
  });
}

// Global functions for event handling in templates
window.setFilter = (category) => {
  selectedCategory = category;
  renderAdmin();
};

window.switchTab = (tab) => {
  if (tab === 'dashboard') selectedCategory = 'all';
  renderAdmin();
};

window.updateSlot = (id, newSlot) => {
  const allInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
  const index = allInquiries.findIndex(i => i.id === id);
  if (index !== -1) {
    allInquiries[index].slot = newSlot;
    localStorage.setItem('inquiries', JSON.stringify(allInquiries));
    
    // Smooth feedback
    const activeInput = document.activeElement;
    if (activeInput && activeInput.tagName === 'INPUT') {
        activeInput.classList.add('border-green-500', 'text-green-600');
        setTimeout(() => {
            activeInput.classList.remove('border-green-500', 'text-green-600');
        }, 1000);
    }
  }
};

window.viewDetails = (id) => {
  const allInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
  const inq = allInquiries.find(i => i.id === id);
  if (!inq) return;

  const modal = document.querySelector('#details-modal');
  const modalSubtitle = document.querySelector('#modal-subtitle');
  const modalContent = document.querySelector('#modal-content');

  modalSubtitle.textContent = `${inq.serviceName} - Submitted on ${new Date(inq.date).toLocaleString()}`;
  
  let detailsHtml = `
    <div class="grid grid-cols-2 gap-8">
      <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Basic Information</h4>
        <div class="space-y-3">
           <p class="text-sm"><span class="text-gray-500">Name:</span> <strong class="text-gray-900">${inq.name || inq.fullName}</strong></p>
           <p class="text-sm"><span class="text-gray-500">Email:</span> <strong class="text-gray-900">${inq.email}</strong></p>
           <p class="text-sm"><span class="text-gray-500">Phone:</span> <strong class="text-gray-900">${inq.phone}</strong></p>
        </div>
      </div>
       <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Status</h4>
        <div class="space-y-3">
           <p class="text-sm"><span class="text-gray-500">Amount:</span> <strong class="text-gray-900">₹${inq.amount}</strong></p>
           <p class="text-sm"><span class="text-gray-500">Transaction ID:</span> <strong class="text-gray-900 text-xs font-mono">${inq.paymentId}</strong></p>
           <p class="text-sm"><span class="text-gray-500">Status:</span> <span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Paid</span></p>
        </div>
      </div>
    </div>
    <div class="pt-6 border-t border-gray-100">
       <h4 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Complete Form Details</h4>
       <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${inq.details ? Object.entries(inq.details).map(([key, value]) => `
            <div class="p-4 bg-gray-50/50 rounded-xl border border-gray-100">
               <label class="block text-[10px] font-bold text-gray-400 uppercase">${key.replace(/([A-Z])/g, ' $1').trim()}</label>
               <p class="text-sm font-bold text-gray-900 mt-1">${value || 'N/A'}</p>
            </div>
          `).join('') : '<p class="text-sm text-gray-400">No detailed breakdown available for this record.</p>'}
       </div>
    </div>
  `;

  modalContent.innerHTML = detailsHtml;
  modal.classList.remove('hidden');
};

window.closeModal = () => {
  document.querySelector('#details-modal').classList.add('hidden');
};

// Initialize
function initAdmin() {
  renderAdmin();
}

document.addEventListener('DOMContentLoaded', initAdmin);
window.addEventListener('load', initAdmin);
