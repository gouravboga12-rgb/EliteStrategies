export function renderContact(isPreview = false) {
  const container = document.querySelector('#contact');
  if (!container) return;
  container.className = 'py-24 bg-white';

  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('service');

  // Time slots for booking
  const TIMESLOTS = [
    '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM',
    '11:00 AM - 11:30 AM', '11:30 AM - 12:00 PM',
    '12:00 PM - 12:30 PM', '12:30 PM - 01:00 PM',
    '01:00 PM - 01:30 PM', '01:30 PM - 02:00 PM',
    '02:00 PM - 02:30 PM', '02:30 PM - 03:00 PM',
    '03:00 PM - 03:30 PM', '03:30 PM - 04:00 PM',
    '04:00 PM - 04:30 PM', '04:30 PM - 05:00 PM',
    '05:00 PM - 05:30 PM', '05:30 PM - 06:00 PM',
    '06:00 PM - 06:30 PM', '06:30 PM - 07:00 PM'
  ];

  // Helper to get booking counts for a specific date
  const getSlotAvailability = (date) => {
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    const counts = {};
    inquiries.forEach(inq => {
      if (inq.bookingDate === date && inq.bookingSlot) {
        counts[inq.bookingSlot] = (counts[inq.bookingSlot] || 0) + 1;
      }
    });
    return counts;
  };

  // Determine which form to show
  let formContent = '';
  let formTitle = 'Get in Touch With Our Experts';

  const bookingFields = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Preferred Date</label>
        <input type="date" name="bookingDate" min="${new Date().toISOString().split('T')[0]}" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
      </div>
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Preferred Slot</label>
        <select name="bookingSlot" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required disabled>
          <option value="" disabled selected>Select Date First</option>
        </select>
      </div>
    </div>
  `;


  if (serviceId === 'cibil') {
    formTitle = 'Inquire for CIBIL Report';
    formContent = `
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input type="text" name="fullName" placeholder="John Doe" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
            <input type="date" name="dob" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
            <input type="tel" name="phone" placeholder="+91 00000 00000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">PAN Number</label>
            <input type="text" name="pan" placeholder="ABCDE1234F" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
          </div>
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Gmail Address</label>
          <input type="email" name="email" placeholder="john@gmail.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
        </div>
        ${bookingFields}
      </div>
    `;
  } else if (serviceId) {
    const serviceNames = {
      'personal': 'Personal Loan',
      'business': 'Business Loan',
      'mortgage': 'Mortgage Loan',
      'home-loan': 'Home Loan',
      'debt': 'Debt Consolidation',
      'insurance': 'Insurance',
      'account': 'Online Account Opening'
    };
    const currentServiceName = serviceNames[serviceId] || 'Financial Service';
    formTitle = `Inquire for ${currentServiceName}`;

    // Insurance-specific form
    if (serviceId === 'insurance') {
      formContent = `
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input type="text" name="name" placeholder="John Doe" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
              <input type="date" name="dob" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
              <input type="tel" name="phone" placeholder="+91 00000 00000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Gmail Address</label>
              <input type="email" name="email" placeholder="john@gmail.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Type of Insurance Required</label>
            <select name="insuranceType" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
              <option value="" disabled selected>Select Insurance Type</option>
              <option value="health">Health Insurance</option>
              <option value="life">Life Insurance</option>
              <option value="term">Term Insurance</option>
              <option value="vehicle">Vehicle Insurance</option>
              <option value="home">Home Insurance</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Annual Income (₹)</label>
            <input type="number" name="income" placeholder="600000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
          </div>
          ${bookingFields}
        </div>
      `;
    // Online Account Opening form
    } else if (serviceId === 'account') {
      formContent = `
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input type="text" name="name" placeholder="John Doe" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
              <input type="date" name="dob" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
              <input type="tel" name="phone" placeholder="+91 00000 00000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Gmail Address</label>
              <input type="email" name="email" placeholder="john@gmail.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">PAN Number</label>
              <input type="text" name="pan" placeholder="ABCDE1234F" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Account Type</label>
              <select name="accountType" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
                <option value="" disabled selected>Select Account Type</option>
                <option value="savings">Savings Account</option>
                <option value="current">Current Account</option>
                <option value="salary">Salary Account</option>
                <option value="business">Business Account</option>
              </select>
            </div>
          </div>
          ${bookingFields}
        </div>
      `;
    // Generic Loan form (Personal, Business, Mortgage, Home Loan, Debt Consolidation)
    } else {
      formContent = `
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Name</label>
              <input type="text" name="name" placeholder="John Doe" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Age</label>
              <input type="number" name="age" placeholder="25" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Monthly Income</label>
              <input type="number" name="income" placeholder="50000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Current EMI</label>
              <input type="number" name="emi" placeholder="5000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Loan Amount Requirement</label>
              <input type="number" name="amount" placeholder="500000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Current CIBIL Score</label>
              <input type="number" name="cibil" placeholder="750" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
              <input type="tel" name="phone" placeholder="+91 00000 00000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Gmail Address</label>
              <input type="email" name="email" placeholder="john@gmail.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
            </div>
          </div>
        </div>
      `;
    }
  } else {
    formContent = `
      <form id="contact-form" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Name</label>
            <input type="text" placeholder="John Doe" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
            <input type="tel" placeholder="+91 00000 00000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
          </div>
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
          <input type="email" placeholder="john@example.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Message</label>
          <textarea rows="4" placeholder="How can we help you?" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></textarea>
        </div>
      </form>
    `;
  }
  
  container.innerHTML = `
    <div class="container mx-auto px-6 md:px-12">
      <div class="text-center mb-16">
        <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">Contact Us</h2>
        <h3 class="text-3xl md:text-5xl font-bold text-gray-900 mb-6" data-aos="fade-up" data-aos-delay="100">${formTitle}</h3>
        <p class="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          ${serviceId ? `Please fill out the form below to inquire about our ${formTitle.replace('Inquire for ', '')} services.` : 'Have questions about our services or need financial advice? Our team is here to help you navigate your financial journey.'}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Contact Form -->
        <div class="glass p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100" data-aos="fade-right">
          ${serviceId ? `
            <form id="contact-form" class="space-y-6">
              ${formContent}
              
              <!-- Payment Breakdown Summary -->
              <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
                <div class="flex justify-between items-center text-sm text-gray-500">
                  <span>Service Professional Fee</span>
                  <span>₹${serviceId === 'cibil' ? '99' : '199'}</span>
                </div>
                <div class="flex justify-between items-center text-sm text-gray-500">
                  <span>Processing Fee</span>
                  <span class="text-green-600 font-medium">FREE</span>
                </div>
                <div class="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span class="font-bold text-gray-900">Total Amount</span>
                  <span class="text-xl font-bold text-primary">₹${serviceId === 'cibil' ? '99' : '199'}</span>
                </div>
              </div>

              <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center space-x-2 group">
                <span>Secure Payment & Send Inquiry</span>
                <i data-lucide="shield-check" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
              </button>
              
              <!-- Trust Badges -->
              <div class="pt-2 flex flex-col items-center space-y-4">
                <p class="text-xs text-gray-400 flex items-center justify-center space-x-1">
                  <i data-lucide="lock" class="w-3 h-3"></i>
                  <span>Secure 256-bit SSL Encrypted Payment</span>
                </p>
              </div>
            </form>
          ` : `
            ${formContent}
            <button type="submit" form="contact-form" class="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold transition-smooth shadow-lg flex items-center justify-center space-x-2 group">
              <span>Send Message</span>
              <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
            </button>
          `}
        </div>

        <!-- Contact Info & Map -->
        <div class="flex flex-col space-y-10" data-aos="fade-left">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex items-start space-x-4">
              <div class="bg-ash-light p-3 rounded-xl text-primary">
                <i data-lucide="phone" class="w-6 h-6"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 mb-1">Call Us</h4>
                <p class="text-gray-600">+91 866-062-7567</p>
                <p class="text-xs text-gray-400">Mon - Sat: 10am - 6pm</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="bg-ash-light p-3 rounded-xl text-primary">
                <i data-lucide="mail" class="w-6 h-6"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 mb-1">Email Us</h4>
                <p class="text-gray-600">eliteloanstrategies5@gmail.com</p>
                <p class="text-xs text-gray-400">24/7 Support</p>
              </div>
            </div>
          </div>
          
          <div class="flex items-start space-x-4">
            <div class="bg-ash-light p-3 rounded-xl text-primary">
              <i data-lucide="map-pin" class="w-6 h-6"></i>
            </div>
            <div>
              <h4 class="font-bold text-gray-900 mb-1">Office Location</h4>
              <p class="text-gray-600">No. 710, 1st Main Road, 4th Cross, near Govt School, Mathikere, Bangalore, 560054</p>
            </div>
          </div>

          <!-- Branded Experience Card -->
          <div class="bg-gradient-to-br from-primary to-primary-dark p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl">
            <img src="/logo.png" alt="Elite Loan Logo" class="w-32 h-32 opacity-20 absolute -right-4 -bottom-4 transform rotate-12">
            <div class="relative z-10">
              <div class="w-16 h-16 bg-white rounded-2xl p-3 mb-6 shadow-xl">
                <img src="/logo.png" alt="Elite Loan Logo" class="w-full h-full object-contain">
              </div>
              <h4 class="text-2xl font-bold mb-2">7+ Years of Trust</h4>
              <p class="text-white/80 text-sm leading-relaxed">
                Empowering customers with quick and secure financial solutions since 2017. Experience the expertise of professional loan strategies.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  // Handle Form Submission
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // If it's a service inquiry, trigger Razorpay
      const serviceNames = {
        'personal': 'Personal Loan',
        'business': 'Business Loan',
        'mortgage': 'Mortgage Loan',
        'home-loan': 'Home Loan',
        'debt': 'Debt Consolidation',
        'insurance': 'Insurance',
        'account': 'Online Account Opening'
      };

       if (serviceId) {
        const amountInRupees = serviceId === 'cibil' ? 99 : 199;
        const serviceName = serviceId === 'cibil' ? 'CIBIL Report' : (serviceNames[serviceId] || 'Financial Service');
        const keyId = "rzp_test_EliteLoan"; // IMPORTANT: Replace this with your actual Razorpay Key ID

        // Function to save inquiry to localStorage for Admin Panel
        const saveInquiry = (paymentId = "DEMO") => {
          const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
          const formData = new FormData(form);
          const newInquiry = {
            id: Date.now(),
            name: formData.get('name') || formData.get('fullName') || 'Anonymous',
            email: formData.get('email') || 'N/A',
            phone: formData.get('phone') || 'N/A',
            serviceName,
            amount: amountInRupees,
            paymentId,
            date: new Date().toISOString(),
            bookingDate: formData.get('bookingDate'),
            bookingSlot: formData.get('bookingSlot'),
            status: 'Paid'
          };
          inquiries.unshift(newInquiry);
          localStorage.setItem('inquiries', JSON.stringify(inquiries));
        };

        // UI: Show Success Modal
        const showSuccessModal = () => {
          const modal = document.createElement('div');
          modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-6';
          modal.innerHTML = `
            <div class="bg-white rounded-[2rem] shadow-2xl max-w-md w-full p-10 text-center space-y-8 animate-in fade-in zoom-in duration-300">
              <div class="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full">
                <i data-lucide="check-circle-2" class="w-12 h-12"></i>
              </div>
              <div class="space-y-3">
                <h3 class="text-3xl font-bold text-gray-900">Payment Successful</h3>
                <p class="text-gray-500 font-medium">Thank you! Your inquiry for <strong>${serviceName}</strong> has been received successfully.</p>
                <div class="mt-4 p-3 bg-ash-light rounded-xl border border-gray-200 flex flex-col items-center">
                  <span class="text-xs text-primary font-bold uppercase tracking-wider mb-1">Booked Consultation Slot</span>
                  <p class="text-gray-900 font-bold">${formData.get('bookingDate')} | ${formData.get('bookingSlot')}</p>
                </div>
              </div>
              <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-left space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500 font-medium">Amount Paid:</span>
                  <span class="text-gray-900 font-bold">₹${amountInRupees}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-500 font-medium">Ref ID:</span>
                  <span class="text-gray-900 font-mono text-xs">${Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                </div>
              </div>
              <button id="close-success" class="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-xl">
                Return to Home
              </button>
            </div>
          `;
          document.body.appendChild(modal);
          createIcons({ icons: { CheckCircle2: 'check-circle-2' } });
          
          modal.querySelector('#close-success').addEventListener('click', () => {
             modal.remove();
             window.location.href = '/';
          });
        };

        // DETECT DEMO MODE: If key is still the placeholder, simulate the flow
        if (keyId === "rzp_test_EliteLoan") {
          const btn = form.querySelector('button[type="submit"]');
          const btnText = btn.querySelector('span');
          const originalText = btnText.textContent;
          
          btn.disabled = true;
          btnText.textContent = "Processing Payment...";
          
          setTimeout(() => {
            saveInquiry();
            showSuccessModal();
            form.reset();
            btn.disabled = false;
            btnText.textContent = originalText;
          }, 1500);
          return;
        }

        // Options for Razorpay
        const options = {
          "key": keyId,
          "amount": amountInRupees * 100,
          "currency": "INR",
          "name": "Elite Loan Strategies",
          "description": `Payment for ${serviceName}`,
          "image": window.location.origin + "/vite.svg",
          "handler": function (response) {
            saveInquiry(response.razorpay_payment_id);
            showSuccessModal();
            form.reset();
          },
          "prefill": {
            "name": form.querySelector('[name="name"]')?.value || form.querySelector('[name="fullName"]')?.value || "",
            "email": form.querySelector('[name="email"]')?.value || "",
            "contact": form.querySelector('[name="phone"]')?.value || ""
          },
          "theme": { "color": "#D4AF37" },
          "modal": {
            "ondismiss": function() {
              alert("Payment cancelled. Please complete the payment to send your inquiry.");
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Default contact form behavior
        alert('Thank you! Your message has been sent successfully. Our experts will contact you soon.');
        form.reset();
      }
    });

    // Add interactivity for Slot Booking
    const dateInput = form.querySelector('input[name="bookingDate"]');
    const slotSelect = form.querySelector('select[name="bookingSlot"]');

    if (dateInput && slotSelect) {
      dateInput.addEventListener('change', (e) => {
        const selectedDate = e.target.value;
        const availability = getSlotAvailability(selectedDate);
        
        slotSelect.disabled = false;
        slotSelect.innerHTML = '<option value="" disabled selected>Select a Time Slot</option>';
        
        TIMESLOTS.forEach(slot => {
          const bookedCount = availability[slot] || 0;
          const isFull = bookedCount >= 2;
          
          const option = document.createElement('option');
          option.value = slot;
          option.textContent = `${slot} ${isFull ? '(Already Booked)' : `(${2 - bookedCount} Slots Left)`}`;
          option.disabled = isFull;
          slotSelect.appendChild(option);
        });
      });
    }
  }
}
