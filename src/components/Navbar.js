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
    <nav id="navbar-inner" class="transition-all duration-300 py-5 px-6 md:px-12 flex items-center justify-between border-b border-white/10 bg-black">
      <div class="flex items-center space-x-3 h-12">
        <div id="logo-box" class="w-10 h-10 rounded-lg overflow-hidden transition-all duration-300 flex items-center justify-center">
          <img src="/logo.png" alt="Elite Loan Logo" class="w-full h-full object-contain">
        </div>
        <div class="flex flex-col justify-center h-full">
          <h1 id="brand-name" class="text-xl md:text-2xl font-black text-white leading-none tracking-tighter transition-colors duration-300">ELITE LOAN</h1>
          <p class="text-[10px] md:text-xs text-primary font-bold tracking-[0.2em] uppercase mt-0.5">Strategies</p>
        </div>
      </div>

      <!-- Desktop Navigation -->
      <div id="nav-links" class="hidden md:flex items-center space-x-10">
        <a href="/" class="nav-link ${isActive('/') ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-smooth font-bold uppercase tracking-wider text-sm">Home</a>
        <a href="/about.html" class="nav-link ${isActive('/about.html') ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-smooth font-bold uppercase tracking-wider text-sm">About</a>
        <a href="/services.html" class="nav-link ${isActive('/services.html') ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-smooth font-bold uppercase tracking-wider text-sm">Services</a>
        <a href="/contact.html" class="nav-link ${isActive('/contact.html') ? 'text-primary' : 'text-gray-300'} hover:text-primary transition-smooth font-bold uppercase tracking-wider text-sm">Contact</a>
      </div>

      <!-- Mobile Menu Button -->
      <button id="mobile-menu-btn" class="md:hidden text-primary focus:outline-none">
        <i data-lucide="menu" id="menu-icon" class="w-8 h-8"></i>
      </button>

      <!-- Mobile Navigation Menu -->
      <div id="mobile-menu" class="hidden md:hidden bg-black border-t border-white/10 py-6 px-6 flex flex-col space-y-4 absolute top-full left-0 w-full shadow-2xl animate-fade-in-down">
        <a href="/" class="mobile-nav-link ${isActive('/') ? 'text-primary font-bold' : 'text-gray-300'} font-medium">Home</a>
        <a href="/about.html" class="mobile-nav-link ${isActive('/about.html') ? 'text-primary font-bold' : 'text-gray-300'} font-medium">About</a>
        <a href="/services.html" class="mobile-nav-link ${isActive('/services.html') ? 'text-primary font-bold' : 'text-gray-300'} font-medium">Services</a>
        <a href="/contact.html" class="mobile-nav-link ${isActive('/contact.html') ? 'text-primary font-bold' : 'text-gray-300'} font-medium">Contact</a>
        <a href="https://wa.me/918660627567?text=Hello,%20I%20am%20interested%20in%20your%20financial%20services." target="_blank" class="bg-primary text-white text-center py-3 rounded-lg font-bold shadow-lg">
          Chat with Us
        </a>
      </div>
    </nav>
  `;

  const innerNav = container.querySelector('#navbar-inner');
  const brandName = container.querySelector('#brand-name');
  const logoBox = container.querySelector('#logo-box');
  const navLinks = container.querySelectorAll('.nav-link');
  const mobileMenu = document.querySelector('#mobile-menu');

  const updateNavbar = () => {
    const isScrolled = window.scrollY > 20;
    
    if (isScrolled) {
      innerNav.className = 'transition-all duration-300 py-3 px-6 md:px-12 flex items-center justify-between bg-black shadow-2xl';
      logoBox.className = 'w-10 h-10 rounded-lg overflow-hidden transition-all duration-300';
    } else {
      innerNav.className = 'transition-all duration-300 py-5 px-6 md:px-12 flex items-center justify-between border-b border-white/10 bg-black';
      logoBox.className = 'w-12 h-12 rounded-lg overflow-hidden transition-all duration-300';
    }
    if (mobileMenu) mobileMenu.className = 'hidden md:hidden bg-black border-t border-white/10 py-6 px-6 flex flex-col space-y-4 absolute top-full left-0 w-full shadow-2xl';
  };

  window.addEventListener('scroll', updateNavbar);
  updateNavbar(); // Initial check

  const mobileBtn = document.querySelector('#mobile-menu-btn');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}
