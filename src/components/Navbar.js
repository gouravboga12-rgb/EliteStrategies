export function renderNavbar() {
  const container = document.querySelector('#navbar-container');
  if (!container) return;
  container.className = 'fixed top-0 left-0 w-full z-50 transition-all duration-300 transform';
  
  const currentPath = window.location.pathname;
  
  const isActive = (path) => {
    if (path === '/' && (currentPath === '/' || currentPath === '/index.html' || currentPath === '')) return true;
    return currentPath.includes(path) && path !== '/';
  };

  container.innerHTML = `
    <div class="bg-white shadow-sm py-5 px-6 md:px-12 flex items-center justify-between border-b border-gray-100">
      <div class="flex items-center space-x-3">
        <div class="w-12 h-12 rounded-lg overflow-hidden shadow-sm border border-gray-100 bg-white p-1">
          <img src="/logo.jpeg" alt="Elite Loan Logo" class="w-full h-full object-contain">
        </div>
        <div>
          <h1 class="text-xl md:text-2xl font-black text-ash leading-none tracking-tighter">ELITE LOAN</h1>
          <p class="text-[10px] md:text-xs text-primary font-bold tracking-[0.2em] uppercase">Strategies</p>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-10">
        <a href="/" class="${isActive('/') ? 'text-primary' : 'text-ash'} hover:text-primary transition-smooth font-bold uppercase tracking-wider text-sm">Home</a>
        <a href="/about.html" class="${isActive('/about.html') ? 'text-primary' : 'text-ash'} hover:text-primary transition-smooth font-bold uppercase tracking-wider text-sm">About</a>
        <a href="/services.html" class="${isActive('/services.html') ? 'text-primary' : 'text-ash'} hover:text-primary transition-smooth font-bold uppercase tracking-wider text-sm">Services</a>
        <a href="/contact.html" class="${isActive('/contact.html') ? 'text-primary' : 'text-ash'} hover:text-primary transition-smooth font-bold uppercase tracking-wider text-sm">Contact</a>
      </div>

      <!-- Mobile Menu Button -->
      <button id="mobile-menu-btn" class="md:hidden text-primary focus:outline-none">
        <i data-lucide="menu" id="menu-icon" class="w-8 h-8"></i>
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    <div id="mobile-menu" class="hidden md:hidden glass border-t border-gray-100 py-6 px-6 flex flex-col space-y-4 absolute top-full left-0 w-full shadow-2xl animate-fade-in-down">
      <a href="/" class="mobile-nav-link ${isActive('/') ? 'text-primary font-bold' : 'text-gray-700'} font-medium">Home</a>
      <a href="/about.html" class="mobile-nav-link ${isActive('/about.html') ? 'text-primary font-bold' : 'text-gray-700'} font-medium">About</a>
      <a href="/services.html" class="mobile-nav-link ${isActive('/services.html') ? 'text-primary font-bold' : 'text-gray-700'} font-medium">Services</a>
      <a href="/contact.html" class="mobile-nav-link ${isActive('/contact.html') ? 'text-primary font-bold' : 'text-gray-700'} font-medium">Contact</a>
      <a href="https://wa.me/91XXXXXXXXXX?text=Hello,%20I%20am%20interested%20in%20your%20financial%20services." target="_blank" class="bg-primary text-white text-center py-3 rounded-lg font-bold shadow-lg">
        Chat with Us
      </a>
    </div>
  `;

  const mobileBtn = document.querySelector('#mobile-menu-btn');
  const mobileMenu = document.querySelector('#mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Handle Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      container.classList.add('py-2');
    } else {
      container.classList.remove('py-2');
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}
