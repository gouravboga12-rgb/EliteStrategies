export function renderWhyChooseUs() {
  const container = document.querySelector('#why-choose-us');
  container.className = 'py-24 bg-primary relative overflow-hidden';
  
  const reasons = [
    { title: '7+ Years Experience', desc: 'Extensive knowledge in business and financial services.' },
    { title: 'Quick Processing', desc: 'Fast loan processing and reliable consultation.' },
    { title: 'Customer First', desc: 'Trusted financial guidance tailored to your needs.' },
    { title: 'Multiple Solutions', desc: 'All your financial services in one professional place.' }
  ];

  container.innerHTML = `
    <!-- Decor -->
    <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
       <div class="absolute top-0 right-0 w-96 h-96 border-[40px] border-white rounded-full -mr-48 -mt-48"></div>
       <div class="absolute bottom-0 left-0 w-64 h-64 border-[30px] border-white rounded-full -ml-32 -mb-32"></div>
    </div>

    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right">
          <h2 class="text-blue-200 font-bold tracking-widest uppercase text-sm mb-4">Why Partner With Us?</h2>
          <h3 class="text-3xl md:text-5xl font-bold text-white mb-8">Committed to Excellence in Financial Services</h3>
          <p class="text-blue-100 mb-12 text-lg leading-relaxed">
            We don't just provide loans; we provide strategies. Our team of experts ensures that every client receives personalized attention and the most competitive options available.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            ${reasons.map((reason, index) => `
              <div class="flex items-start space-x-4" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="bg-blue-400 bg-opacity-20 p-2 rounded-lg">
                  <i data-lucide="check-circle" class="w-6 h-6 text-blue-200"></i>
                </div>
                <div>
                  <h4 class="text-white font-bold text-lg mb-1">${reason.title}</h4>
                  <p class="text-blue-100 text-sm">${reason.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="relative" data-aos="zoom-in">
           <div class="glass bg-white bg-opacity-10 border-white border-opacity-20 p-12 rounded-3xl text-center shadow-2xl">
              <h4 class="text-2xl font-bold text-white mb-4">Ready to Grow?</h4>
              <p class="text-blue-100 mb-8 italic">"Your financial stability is our primary goal. Let's build a secure future together."</p>
              <a href="https://wa.me/918660627567?text=Hello,%20I%20am%20interested%20in%20your%20financial%20services." target="_blank" class="inline-flex items-center space-x-3 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-smooth shadow-xl">
                 <i data-lucide="message-square" class="w-6 h-6"></i>
                 <span>Connect via WhatsApp</span>
              </a>
           </div>
        </div>
      </div>
    </div>
  `;
}
