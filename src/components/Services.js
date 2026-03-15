import { supabase } from '../lib/supabase.js';
import { createIcons, ChevronRight, ChevronDown, ChevronUp, Info, Home, Briefcase, CheckCircle, ArrowRight } from 'lucide';

export function renderServices(isPreview = false) {
  const container = document.querySelector('#services');
  if (!container) return;
  container.className = 'py-24 bg-gray-50';
  
  const STATIC_SERVICES = [
    { id: 'cibil', name: 'CIBIL Report', points: ['Official credit score analysis', 'Detailed credit history report', 'Identify errors in your report', 'Personalized score improvement tips', 'Better loan approval chances'], icon: 'info' },
    { id: 'personal', name: 'Personal Loan', points: ['Quick processing & minimal docs', 'Competitive interest rates', 'Flexible repayment tenures', 'No collateral required', 'Funds available within hours'], icon: 'home' },
    { id: 'debt', name: 'Debt Consolidation', points: ['Combine high-interest debts', 'Single manageable payment', 'Reduced total financial burden', 'Simplified monthly tracking', 'Path to debt-free status faster'], icon: 'check-circle' },
    { id: 'mortgage', name: 'Mortgage Loan', points: ['High capital against property', 'Lower interest rates than personal', 'Retained property ownership', 'Longer repayment tenures', 'Use for business or education'], icon: 'home' },
    { id: 'business', name: 'Business Loan', points: ['Strategic funding for SME growth', 'Working capital & expansion funds', 'Secured & Unsecured options', 'Attractive interest rates', 'Seize new market opportunities'], icon: 'briefcase' },
    { id: 'home-loan', name: 'Home Loan', points: ['Long repayment up to 30 years', 'Easy legal & tech guidance', 'Floating & Fixed rate options', 'Simplified documentation', 'Step closer to your dream house'], icon: 'home' },
    { id: 'insurance', name: 'Insurance', points: ['Health, Life, & Security plans', 'Unbiased policy comparison', 'Affordable premium options', 'Total family protection', 'Expert guidance on fine print'], icon: 'check-circle' },
    { id: 'account', name: 'Online Account Opening', points: ['Zero-contact digital process', 'Instant document verification', 'Home-based banking setup', 'Quick savings & business accounts', 'Guidance on digital features'], icon: 'check-circle' }
  ];

  const fetchServices = async () => {
    const sortServices = (data) => {
      const priorityOrder = ['cibil', 'personal', 'debt', 'mortgage', 'business'];
      return [...data].sort((a, b) => {
        const indexA = priorityOrder.indexOf(a.id);
        const indexB = priorityOrder.indexOf(b.id);
        
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
      });
    };

    try {
      console.log('Elite Loan: Fetching services from Supabase...');
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('updated_at', { ascending: true });
      
      if (error) {
        console.error('Elite Loan: Supabase fetch error (Check if columns exist):', error.message, error.details, error.hint);
        return STATIC_SERVICES;
      }

      if (data && data.length > 0) {
        console.log('Elite Loan: Successfully loaded live services:', data.length);
        return data;
      }
      
      console.log('Elite Loan: No services found in database, using fallback.');
      return STATIC_SERVICES;
    } catch (err) {
      console.error('Elite Loan: Unexpected error in fetchServices:', err);
      return STATIC_SERVICES;
    }
  };

  const DEFAULT_POINTS = [
    'Expert financial guidance',
    'Customized loan solutions',
    'Quick & easy processing',
    'Competitive interest rates',
    'Dedicated support team'
  ];

  const ICONS_MAP = {
    'cibil': 'info',
    'personal': 'home',
    'business': 'briefcase',
    'mortgage': 'home',
    'home-loan': 'home',
    'debt': 'check-circle',
    'insurance': 'check-circle',
    'account': 'check-circle'
  };

  const buildUI = (servicesData) => {
    let displayServices = servicesData;
    if (isPreview) {
      displayServices = displayServices.slice(0, 5);
    }

    container.innerHTML = `
      <div class="container mx-auto px-6 md:px-12 text-center mb-16">
        <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">Our Services</h2>
        <h3 class="text-3xl md:text-5xl font-bold text-gray-900 mb-6" data-aos="fade-up" data-aos-delay="100">Tailored Financial Solutions</h3>
        <p class="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          We provide a wide range of financial services designed to meet your individual and business needs with efficiency and trust.
        </p>
      </div>

      <div class="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 ${isPreview ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-8 items-start mb-12">
        ${displayServices.map((service, index) => {
          const points = service.points || DEFAULT_POINTS;
          const icon = ICONS_MAP[service.id] || 'info';
          
          return `
            <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full" data-aos="fade-up" data-aos-delay="${index * 100}">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                <i data-lucide="${icon}" class="w-8 h-8"></i>
              </div>
              <h4 class="text-xl font-bold text-gray-900 mb-4 min-h-[3.5rem] flex items-start">${service.name}</h4>
              
              <div id="desc-${service.id}" class="hidden mb-6 transition-all duration-300">
                <ul class="space-y-3">
                  ${points.map(point => `
                    <li class="flex items-start space-x-2 text-sm text-gray-600">
                      <i data-lucide="check-circle" class="w-4 h-4 text-primary shrink-0 mt-0.5"></i>
                      <span>${point}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div class="flex flex-col space-y-4 mt-auto">
                <button id="btn-${service.id}" class="view-more-btn text-primary font-bold text-sm flex items-center space-x-2 group/btn cursor-pointer w-fit">
                  <span class="btn-text">View Details</span>
                  <i data-lucide="chevron-down" class="w-4 h-4 transition-transform duration-300"></i>
                </button>
                
                <a href="/contact.html?service=${service.id}" class="bg-primary hover:bg-primary-dark text-white text-center py-2 rounded-lg text-sm font-semibold transition-smooth shadow-md">
                  Inquire Now
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      ${isPreview ? `
        <div class="text-center" data-aos="fade-up">
          <a href="/services.html" class="inline-flex items-center space-x-2 bg-white text-primary border-2 border-primary px-10 py-4 rounded-xl font-bold hover:bg-primary/5 transition-smooth shadow-lg group">
            <span>View All Services</span>
            <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      ` : ''}
    `;

    // Attach event listeners
    displayServices.forEach(service => {
      const btn = document.querySelector(`#btn-${service.id}`);
      const desc = document.querySelector(`#desc-${service.id}`);
      
      if (btn && desc) {
        btn.addEventListener('click', () => {
          const isHidden = desc.classList.contains('hidden');
          
          if (isHidden) {
            desc.classList.remove('hidden');
            btn.querySelector('.btn-text').textContent = 'Show Less';
            btn.querySelector('i').style.transform = 'rotate(180deg)';
          } else {
            desc.classList.add('hidden');
            btn.querySelector('.btn-text').textContent = 'View Details';
            btn.querySelector('i').style.transform = 'rotate(0deg)';
          }
        });
      }
    });

    createIcons({
      icons: { ChevronRight, ChevronDown, ChevronUp, Info, Home, Briefcase, CheckCircle, ArrowRight }
    });
  };

  // Initial fetch and build
  console.log('Elite Loan: Initializing static view first...');
  buildUI(STATIC_SERVICES);
  
  fetchServices().then(data => {
    console.log('Elite Loan: Updating UI with fresh data from database');
    const sortedData = sortServices(data);
    buildUI(sortedData);
  });
}
