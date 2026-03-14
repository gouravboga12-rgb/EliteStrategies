export function renderAbout(isPreview = false) {
  const container = document.querySelector('#about');
  if (!container) return;
  container.className = 'py-24 bg-white overflow-hidden';
  
  container.innerHTML = `
    <div class="container mx-auto px-6 md:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="relative" data-aos="fade-right">
          <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
             <div class="aspect-[4/3] bg-primary flex items-center justify-center text-white">
                <i data-lucide="info" class="w-32 h-32 opacity-10 absolute"></i>
                <div class="p-12 text-center">
                   <h3 class="text-3xl font-bold mb-4">7+ Years of Excellence</h3>
                   <p class="text-blue-100 italic">"Providing professional guidance for your financial freedom."</p>
                </div>
             </div>
          </div>
          <div class="absolute -bottom-10 -right-10 glass p-8 rounded-2xl shadow-2xl z-20 max-w-xs hidden md:block">
             <h4 class="font-bold text-primary mb-2">Our Vision</h4>
             <p class="text-sm text-gray-600">To become a trusted financial partner helping individuals and businesses achieve financial stability and growth.</p>
          </div>
        </div>

        <div data-aos="fade-left">
          <h2 class="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">About Elite Loan Strategies</h2>
          <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-sans">Empowering Your Financial Future with Expert Guidance</h3>
          <p class="text-gray-600 mb-8 leading-relaxed">
            Elite Loan Strategies is a financial services company helping individuals and businesses access loans, credit reports, insurance, and financial solutions with professional guidance. We simplify the complex world of banking to ensure you get the best deals.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div class="flex items-start space-x-3">
              <div class="mt-1 bg-blue-100 p-1 rounded-full text-primary">
                <i data-lucide="check-circle" class="w-5 h-5"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-900">Mission</h4>
                <p class="text-sm text-gray-600">To simplify access to financial services by providing reliable solutions.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="mt-1 bg-blue-100 p-1 rounded-full text-primary">
                <i data-lucide="check-circle" class="w-5 h-5"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-900">Values</h4>
                <p class="text-sm text-gray-600">Transparency, Customer Trust, and Professional Integrity.</p>
              </div>
            </div>
          </div>

          <!-- Founder Info -->
          <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-center space-x-6 mb-8" data-aos="zoom-in" data-aos-delay="300">
            <div class="w-20 h-20 rounded-full overflow-hidden border-2 border-primary shadow-md shrink-0">
               <img src="/mahendra_h.jpeg" alt="Mahendra H" class="w-full h-full object-cover">
            </div>
            <div>
              <h4 class="text-xl font-bold text-gray-900">Mahendra H</h4>
              <p class="text-primary font-medium">Founder | MBA</p>
              <p class="text-xs text-gray-500 mt-1">7+ Years of Industry Experience</p>
            </div>
          </div>

          ${isPreview ? `
            <a href="/about.html" class="inline-flex items-center space-x-2 text-primary font-bold group">
              <span>Learn More About Us</span>
              <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
            </a>
          ` : ''}
        </div>
      </div>

      ${!isPreview ? `
        <!-- Additional Content Section -->
        <div class="mt-32 pt-16 border-t border-gray-100">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div data-aos="fade-up">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Strategic Financial Planning</h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                We go beyond simple loan processing. Our team analyzes your financial health to provide strategies that help you secure the lowest interest rates and most flexible terms available in the market.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <h4 class="text-xl font-bold text-gray-900 mb-4">Unbiased Consultation</h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                As an independent firm, our priority is you. we provide unbiased advice on various financial products, ensuring you choose the solution that best fits your business or personal goals.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h4 class="text-xl font-bold text-gray-900 mb-4">End-to-End Support</h4>
              <p class="text-gray-600 text-sm leading-relaxed">
                From the initial CIBIL report analysis to final documentation and disbursement, we stand by you at every step, making the entire financial process stress-free and transparent.
              </p>
            </div>
          </div>
        </div>

        <!-- Commitment Section -->
        <div class="mt-24 p-8 md:p-12 bg-gray-50 rounded-3xl text-center shadow-inner" data-aos="zoom-in">
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our Commitment to You</h3>
          <p class="text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed italic">
            "At Elite Loan Strategies, we believe that every individual and business deserves a fair chance at growth. Our 7+ years of experience is dedicated to breaking down the barriers to financial services, providing the bridge between your dreams and the capital needed to realize them."
          </p>
          <div class="flex flex-wrap justify-center gap-6 md:gap-8">
             <div class="flex items-center space-x-2">
                <i data-lucide="check-circle" class="w-5 h-5 text-primary"></i>
                <span class="font-bold text-sm">Professional Integrity</span>
             </div>
             <div class="flex items-center space-x-2">
                <i data-lucide="check-circle" class="w-5 h-5 text-primary"></i>
                <span class="font-bold text-sm">Transparent Process</span>
             </div>
             <div class="flex items-center space-x-2">
                <i data-lucide="check-circle" class="w-5 h-5 text-primary"></i>
                <span class="font-bold text-sm">Fast Disbursements</span>
             </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}
