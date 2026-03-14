export function renderHero() {
  const container = document.querySelector('#home');
  container.className = 'relative min-h-screen pt-24 flex items-center bg-gradient-to-br from-ash-light to-white overflow-hidden';
  
  container.innerHTML = `
    <!-- Decor Background -->
    <div class="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-ash-light rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

    <div class="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
      <div data-aos="fade-right">
        <span class="inline-block py-1 px-3 bg-primary/20 text-primary-dark text-sm font-semibold rounded-full mb-4">Empowering Your Financial Growth</span>
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Elite Loan <span class="text-primary italic">Strategies</span>
        </h1>
        <p class="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
          Your trusted partner in navigating the world of finance. From quick personal loans to strategic business funding, we simplify the path to your goals.
        </p>
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="/services.html" class="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-smooth shadow-xl flex items-center justify-center space-x-2 group">
            <span>Explore Services</span>
            <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
          </a>
          <a href="/contact.html" class="bg-white hover:bg-gray-50 text-primary border-2 border-primary px-8 py-4 rounded-xl font-bold transition-smooth flex items-center justify-center">
            Contact Expert
          </a>
        </div>
        
        <div class="mt-12 flex items-center space-x-6">
          <div class="flex -space-x-3">
            <div class="w-10 h-10 rounded-full border-2 border-white bg-ash"></div>
            <div class="w-10 h-10 rounded-full border-2 border-white bg-primary"></div>
            <div class="w-10 h-10 rounded-full border-2 border-white bg-primary-light"></div>
          </div>
          <div class="text-sm text-gray-500">
            <span class="font-bold text-gray-900">500+</span> Customers Served
          </div>
        </div>
      </div>

      <div class="relative" data-aos="zoom-in" data-aos-delay="200">
        <div class="glass p-4 rounded-2xl shadow-2xl relative z-10">
           <!-- Representational illustration or image -->
           <div class="aspect-square bg-gradient-to-tr from-primary to-primary-light rounded-xl flex items-center justify-center text-white overflow-hidden relative">
              <i data-lucide="briefcase" class="w-32 h-32 opacity-20 absolute -right-4 -bottom-4"></i>
              <div class="text-center p-8">
                <i data-lucide="check-circle" class="w-16 h-16 mx-auto mb-4 text-white"></i>
                <h3 class="text-2xl font-bold mb-2">Instant Loan Approval</h3>
                <p class="opacity-90">Experience seamless processing and transparent guidance.</p>
              </div>
           </div>
        </div>
        <!-- Decorative cards -->
        <div class="absolute -top-6 -right-6 glass p-6 rounded-xl shadow-xl z-20 hidden lg:block animate-bounce-slow">
          <div class="flex items-center space-x-3">
             <div class="bg-primary/10 p-2 rounded-lg">
                <i data-lucide="check-circle" class="w-5 h-5 text-primary"></i>
             </div>
             <div>
                <p class="text-xs text-gray-500 font-medium">CIBIL Score</p>
                <p class="text-sm font-bold text-ash">Excellent 750+</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
