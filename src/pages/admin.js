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

function renderDashboard(container) {
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
        <a href="#" class="flex items-center space-x-3 px-4 py-3 bg-primary text-white rounded-xl font-medium transition-all shadow-lg shadow-primary/20">
          <i data-lucide="pie-chart" class="w-5 h-5"></i>
          <span>Dashboard</span>
        </a>
        <a href="#" class="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-xl font-medium transition-all">
          <i data-lucide="users" class="w-5 h-5"></i>
          <span>Inquiries</span>
        </a>
        <a href="#" class="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-gray-100 rounded-xl font-medium transition-all">
          <i data-lucide="file-text" class="w-5 h-5"></i>
          <span>Reports</span>
        </a>
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
          <input type="text" placeholder="Search inquiries..." class="w-full pl-12 pr-4 py-2 bg-gray-50 border border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all">
        </div>
        
        <div class="flex items-center space-x-6">
          <button class="p-2 text-gray-400 hover:text-gray-900 transition-colors relative">
            <i data-lucide="bell" class="w-6 h-6"></i>
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
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
              <p class="text-sm text-gray-500 font-medium">Successful Payments</p>
              <h3 class="text-3xl font-bold mt-1">24</h3>
            </div>
          </div>
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div class="p-4 bg-primary/10 text-primary rounded-2xl">
              <i data-lucide="clock" class="w-8 h-8"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">Pending Inquiries</p>
              <h3 class="text-3xl font-bold mt-1">12</h3>
            </div>
          </div>
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
            <div class="p-4 bg-red-50 text-red-600 rounded-2xl">
              <i data-lucide="alert-circle" class="w-8 h-8"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500 font-medium">Payment Failed</p>
              <h3 class="text-3xl font-bold mt-1">3</h3>
            </div>
          </div>
        </div>

        <!-- Recent Inquiries -->
        <div class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
          <div class="p-8 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900">Recent Service Inquiries</h3>
            <button class="text-primary font-bold text-sm hover:underline">View All</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <th class="px-8 py-4">Client Name</th>
                  <th class="px-8 py-4">Service</th>
                  <th class="px-8 py-4">Amount</th>
                  <th class="px-8 py-4">Status</th>
                  <th class="px-8 py-4">Date</th>
                  <th class="px-8 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                ${inquiries.length > 0 ? inquiries.map(inq => `
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-8 py-6">
                      <div class="font-bold text-gray-900 italic">${inq.name || inq.fullName}</div>
                      <div class="text-xs text-gray-500 font-medium mt-0.5">${inq.email}</div>
                    </td>
                    <td class="px-8 py-6 font-medium text-gray-600">${inq.serviceName}</td>
                    <td class="px-8 py-6 font-bold text-gray-900">₹${inq.amount}</td>
                    <td class="px-8 py-6">
                      <span class="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">Paid</span>
                    </td>
                    <td class="px-8 py-6 text-gray-500 text-sm font-medium">${new Date(inq.date).toLocaleDateString()}</td>
                    <td class="px-8 py-6 text-right">
                      <button class="p-2 text-gray-400 hover:text-primary transition-colors">
                        <i data-lucide="file-text" class="w-5 h-5"></i>
                      </button>
                    </td>
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="6" class="px-8 py-12 text-center text-gray-400 italic font-medium">No inquiries recorded yet.</td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  `;

  createIcons({ icons: { Layout, Users, FileText, PieChart, LogOut, Search, Bell, CheckCircle, Clock, AlertCircle } });

  document.querySelector('#logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem('adminToken');
    renderAdmin();
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', renderAdmin);
window.addEventListener('load', renderAdmin);
