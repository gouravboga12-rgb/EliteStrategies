export function renderFooter() {
  const container = document.querySelector('#footer-container');
  container.className = 'bg-gray-900 text-gray-400 py-16 border-t border-gray-800';
  
  container.innerHTML = `
    <div class="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <!-- Brand -->
      <div class="flex flex-col space-y-6">
        <div class="flex items-center space-x-2">
          <div class="bg-primary p-2 rounded-lg">
            <i data-lucide="briefcase" class="w-6 h-6 text-white"></i>
          </div>
          <h1 class="text-2xl font-bold text-white">ELITE LOAN</h1>
        </div>
        <p class="text-sm leading-relaxed">
          Simplifying access to financial services with transparency and trust. Your journey to financial stability starts here.
        </p>
        <div class="flex space-x-4">
           <!-- Social Placeholders -->
           <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors hover:text-white">
              <i data-lucide="chevron-right" class="w-5 h-5"></i>
           </a>
           <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors hover:text-white">
              <i data-lucide="chevron-right" class="w-5 h-5"></i>
           </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="text-white font-bold mb-6">Quick Links</h4>
        <ul class="space-y-4 text-sm">
          <li><a href="/" class="hover:text-white transition-colors">Home</a></li>
          <li><a href="/about.html" class="hover:text-white transition-colors">About Us</a></li>
          <li><a href="/services.html" class="hover:text-white transition-colors">Our Services</a></li>
          <li><a href="/contact.html" class="hover:text-white transition-colors">Contact Us</a></li>
        </ul>
      </div>

      <!-- Services -->
      <div>
        <h4 class="text-white font-bold mb-6">Our Services</h4>
        <ul class="space-y-4 text-sm">
          <li><a href="#services" class="hover:text-white transition-colors">Personal Loans</a></li>
          <li><a href="#services" class="hover:text-white transition-colors">Business Loans</a></li>
          <li><a href="#services" class="hover:text-white transition-colors">CIBIL Report</a></li>
          <li><a href="#services" class="hover:text-white transition-colors">Insurance</a></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h4 class="text-white font-bold mb-6">Contact Info</h4>
        <ul class="space-y-4 text-sm">
          <li class="flex items-start space-x-3">
            <i data-lucide="phone" class="w-5 h-5 text-primary"></i>
            <span>+91 866-062-7567</span>
          </li>
          <li class="flex items-start space-x-3">
            <i data-lucide="mail" class="w-5 h-5 text-primary"></i>
            <span>eliteloanstrategies5@gmail.com</span>
          </li>
          <li class="flex items-start space-x-3">
            <i data-lucide="map-pin" class="w-5 h-5 text-primary"></i>
            <span>No. 710, 1st Main Road, 4th Cross, near Govt School, Mathikere, Bangalore, 560054</span>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-gray-800 text-center text-xs">
      <p>&copy; ${new Date().getFullYear()} Elite Loan Strategies. All Rights Reserved.</p>
    </div>
  `;
}
