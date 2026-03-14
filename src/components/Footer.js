export function renderFooter() {
  const container = document.querySelector('#footer-container');
  container.className = 'bg-black text-gray-400 py-20 border-t border-white/5';
  
  container.innerHTML = `
    <div class="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <!-- Brand -->
      <div class="flex flex-col space-y-6">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 rounded-lg overflow-hidden transition-all duration-300">
            <img src="/logo.png" alt="Elite Loan Logo" class="w-full h-full object-contain">
          </div>
          <div>
            <h1 class="text-xl md:text-2xl font-black text-white leading-none tracking-tighter">ELITE LOAN</h1>
            <p class="text-[10px] md:text-xs text-primary font-bold tracking-[0.2em] uppercase">Strategies</p>
          </div>
        </div>
        <p class="text-gray-500 leading-relaxed">
          The ultimate strategy for your financial success. Providing expert guidance and customized loan solutions for your individual needs.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
        <ul class="space-y-4 text-sm">
          <li><a href="/" class="hover:text-primary transition-colors">Home</a></li>
          <li><a href="/about.html" class="hover:text-primary transition-colors">About Us</a></li>
          <li><a href="/services.html" class="hover:text-primary transition-colors">Our Services</a></li>
          <li><a href="/contact.html" class="hover:text-primary transition-colors">Contact Us</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div>
        <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Our Services</h4>
        <ul class="space-y-4 text-sm">
          <li><a href="/services.html" class="hover:text-primary transition-colors">CIBIL Report</a></li>
          <li><a href="/services.html" class="hover:text-primary transition-colors">Personal Loan</a></li>
          <li><a href="/services.html" class="hover:text-primary transition-colors">Debt Consolidation</a></li>
          <li><a href="/services.html" class="hover:text-primary transition-colors">Mortgage Loan</a></li>
          <li><a href="/services.html" class="hover:text-primary transition-colors">Business Loan</a></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
        <ul class="space-y-4 text-sm">
          <li class="flex items-start space-x-3">
            <i data-lucide="phone" class="w-5 h-5 text-primary"></i>
            <span>+91 866-062-7567</span>
          </li>
          <li class="flex items-start space-x-3">
            <i data-lucide="mail" class="w-5 h-5 text-primary"></i>
            <span class="text-xs">eliteloanstrategies5@gmail.com</span>
          </li>
          <li class="flex items-start space-x-3">
            <i data-lucide="map-pin" class="w-5 h-5 text-primary"></i>
            <span>No. 710, 1st Main Road, 4th Cross, near Govt School, Mathikere, Bangalore, 560054</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-600">
      <p>&copy; ${new Date().getFullYear()} Elite Loan Strategies. All Rights Reserved.</p>
    </div>
    </div>
  `;
}
