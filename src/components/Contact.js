import { supabase } from '../lib/supabase.js';
import { createIcons, CheckCircle, ArrowRight, ShieldCheck, Lock, CheckCircle2, Phone, Mail, MapPin, RefreshCw } from 'lucide';

export function renderContact(isPreview = false) {
  const container = document.querySelector('#contact');
  if (!container) return;
  container.className = 'py-24 bg-white';

  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('service');

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

  const getSlotAvailability = async (date) => {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('booking_slot')
        .eq('booking_date', date);
      
      if (error) throw error;
      const counts = {};
      (data || []).forEach(inq => {
        if (inq.booking_slot) {
          counts[inq.booking_slot] = (counts[inq.booking_slot] || 0) + 1;
        }
      });
      return counts;
    } catch (err) {
      console.error('Error fetching availability:', err);
      return {};
    }
  };


  const FIELD_TEMPLATES = {
    'name': `<div><label class="block text-sm font-bold text-gray-700 mb-2">Full Name</label><input type="text" name="name" placeholder="John Doe" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></div>`,
    'email': `<div><label class="block text-sm font-bold text-gray-700 mb-2">Gmail Address</label><input type="email" name="email" placeholder="john@gmail.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></div>`,
    'phone': `<div><label class="block text-sm font-bold text-gray-700 mb-2">Phone Number</label><input type="tel" name="phone" placeholder="+91 00000 00000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></div>`,
    'dob': `<div><label class="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label><input type="date" name="dob" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></div>`,
    'pan': `<div><label class="block text-sm font-bold text-gray-700 mb-2">PAN Number</label><input type="text" name="pan" placeholder="ABCDE1234F" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></div>`,
    'age': `<div><label class="block text-sm font-bold text-gray-700 mb-2">Age</label><input type="number" name="age" placeholder="25" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></div>`,
    'income': `<div><label class="block text-sm font-bold text-gray-700 mb-2">Monthly Income (₹)</label><input type="number" name="income" placeholder="50000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></div>`,
    'emi': `<div><label class="block text-sm font-bold text-gray-700 mb-2">Current EMI (₹)</label><input type="number" name="emi" placeholder="5000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></div>`,
    'loan_amount': `<div><label class="block text-sm font-bold text-gray-700 mb-2">Loan Amount Requirement (₹)</label><input type="number" name="loan_amount" placeholder="500000" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></div>`,
    'cibil_score': `<div><label class="block text-sm font-bold text-gray-700 mb-2">Current CIBIL Score</label><input type="number" name="cibil_score" placeholder="750" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></div>`,
    'insurance_type': `<div><label class="block text-sm font-bold text-gray-700 mb-2">Type of Insurance Required</label><select name="insurance_type" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required><option value="" disabled selected>Select Insurance Type</option><option value="health">Health Insurance</option><option value="life">Life Insurance</option><option value="term">Term Insurance</option><option value="vehicle">Vehicle Insurance</option><option value="home">Home Insurance</option></select></div>`,
    'account_type': `<div><label class="block text-sm font-bold text-gray-700 mb-2">Account Type</label><select name="account_type" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required><option value="" disabled selected>Select Account Type</option><option value="savings">Savings Account</option><option value="current">Current Account</option><option value="salary">Salary Account</option><option value="business">Business Account</option></select></div>`,
    'message': `<div class="md:col-span-2"><label class="block text-sm font-bold text-gray-700 mb-2">Message</label><textarea rows="4" name="message" placeholder="How can we help you?" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></textarea></div>`,
    'booking': `<div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100"><div><label class="block text-sm font-bold text-gray-700 mb-2">Preferred Date</label><input type="date" name="booking_date" min="${new Date().toISOString().split('T')[0]}" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required></div><div><label class="block text-sm font-bold text-gray-700 mb-2">Preferred Slot</label><select name="booking_slot" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required disabled><option value="" disabled selected>Select Date First</option></select></div></div>`
  };

  const initForm = async () => {
    let currentService = { name: 'Financial Service', price: 199, form_config: ['name', 'email', 'phone', 'message'] };
    
    try {
      const { data, error } = await supabase.from('settings').select('*').eq('id', serviceId || 'default').single();
      if (!error && data) {
        currentService = data;
      }
    } catch (err) {
      console.error('Error fetching service config:', err);
    }

    const amountInRupees = parseFloat(currentService.price) || 199;
    const formConfig = Array.isArray(currentService.form_config) ? currentService.form_config : ['name', 'email', 'phone', 'message'];

    // Generate Form Content
    const generatedFormContent = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${formConfig.map(field => {
          if (typeof field === 'string') {
            return FIELD_TEMPLATES[field] || '';
          } else if (typeof field === 'object' && field.custom) {
            return `
              <div class="md:col-span-1">
                <label class="block text-sm font-bold text-gray-700 mb-2">${field.label}</label>
                <input type="text" name="custom_${field.id}" placeholder="Enter ${field.label}" class="custom-field-form w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" required>
              </div>
            `;
          }
          return '';
        }).join('')}
      </div>
    `;

    container.innerHTML = `
      <div class="container mx-auto px-6 md:px-12">
        <div class="text-center mb-16">
          <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4" data-aos="fade-up">Contact Us</h2>
          <h3 class="text-3xl md:text-5xl font-bold text-gray-900 mb-6" data-aos="fade-up" data-aos-delay="100">Inquire for ${currentService.name}</h3>
          <p class="text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Please fill out the form below to inquire about our services. Our experts will get back to you shortly.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div class="glass p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100" data-aos="fade-right">
            <form id="contact-form" class="space-y-6">
              ${generatedFormContent}
              
              <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
                <div class="flex justify-between items-center text-sm text-gray-500">
                  <span>Professional Fee</span>
                  <span>₹${amountInRupees}</span>
                </div>
                <div class="flex justify-between items-center text-sm text-gray-500">
                  <span>Processing Fee</span>
                  <span class="text-green-600 font-medium">FREE</span>
                </div>
                <div class="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span class="font-bold text-gray-900">Total Amount</span>
                  <span class="text-xl font-bold text-primary">₹${amountInRupees}</span>
                </div>
              </div>

              <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center space-x-2 group">
                <span>Secure Payment & Send Inquiry</span>
                <i data-lucide="shield-check" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
              </button>
            </form>
          </div>

          <div class="flex flex-col space-y-10" data-aos="fade-left">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="flex items-start space-x-4">
                <div class="bg-ash-light p-3 rounded-xl text-primary"><i data-lucide="phone" class="w-6 h-6"></i></div>
                <div><h4 class="font-bold text-gray-900 mb-1">Call Us</h4><p class="text-gray-600">+91 866-062-7567</p></div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="bg-ash-light p-3 rounded-xl text-primary"><i data-lucide="mail" class="w-6 h-6"></i></div>
                <div><h4 class="font-bold text-gray-900 mb-1">Email Us</h4><p class="text-gray-600">eliteloanstrategies5@gmail.com</p></div>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <div class="bg-ash-light p-3 rounded-xl text-primary"><i data-lucide="map-pin" class="w-6 h-6"></i></div>
              <div><h4 class="font-bold text-gray-900 mb-1">Office Location</h4><p class="text-gray-600">No. 710, 1st Main Road, Mathikere, Bangalore</p></div>
            </div>
          </div>
        </div>
      </div>
    `;

    createIcons({ icons: { CheckCircle, ArrowRight, ShieldCheck, Lock, CheckCircle2, Phone, Mail, MapPin } });
    setupLogic(amountInRupees, currentService.name);
  };

  const setupLogic = (amountInRupees, serviceName) => {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const keyId = "rzp_test_EliteLoan"; 
      
      const saveInquiry = async (paymentId = "DEMO") => {
        const btn = form.querySelector('button[type="submit"]');
        try {
          const newInquiry = {
            name: formData.get('name') || 'Anonymous',
            email: formData.get('email') || 'N/A',
            phone: formData.get('phone') || 'N/A',
            service_name: serviceName,
            amount: amountInRupees,
            payment_id: paymentId,
            payment_status: 'Paid',
            booking_date: formData.get('booking_date'),
            booking_slot: formData.get('booking_slot'),
            dob: formData.get('dob'),
            pan: formData.get('pan'),
            age: formData.get('age') ? parseInt(formData.get('age')) : null,
            income: formData.get('income') ? parseFloat(formData.get('income')) : null,
            emi: formData.get('emi') ? parseFloat(formData.get('emi')) : null,
            loan_requirement: formData.get('loan_amount') ? parseFloat(formData.get('loan_amount')) : null,
            cibil_score: formData.get('cibil_score') ? parseInt(formData.get('cibil_score')) : null,
            insurance_type: formData.get('insurance_type'),
            account_type: formData.get('account_type'),
            message: formData.get('message'),
            created_at: new Date().toISOString()
          };

          const { error } = await supabase.from('inquiries').insert([newInquiry]);
          if (error) throw error;
          showSuccessModal();
        } catch (err) {
          console.error('SUPABASE INSERT ERROR:', err);
          alert(`Error: ${err.message || 'Failed to save inquiry'}.`);
        } finally {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>Secure Payment & Send Inquiry</span><i data-lucide="shield-check" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>';
            createIcons({ icons: { ShieldCheck } });
          }
        }
      };

      const showSuccessModal = () => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm p-6';
        modal.innerHTML = `<div class="bg-white rounded-[2rem] p-10 text-center space-y-8 animate-in fade-in zoom-in"><div class="text-green-600"><i data-lucide="check-circle" class="w-12 h-12 mx-auto"></i></div><h3 class="text-3xl font-bold">Inquiry Sent</h3><p>Your inquiry for ${serviceName} has been received.</p><button id="close-success" class="w-full bg-primary text-white py-4 rounded-xl font-bold">Return to Home</button></div>`;
        document.body.appendChild(modal);
        createIcons({ icons: { CheckCircle } });
        modal.querySelector('#close-success').addEventListener('click', () => { window.location.href = '/'; });
      };

      if (keyId === "rzp_test_EliteLoan") {
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="refresh-cw" class="w-5 h-5 animate-spin mr-2"></i>Processing...';
        createIcons({ icons: { RefreshCw } });
        setTimeout(async () => { await saveInquiry(); }, 1500);
        return;
      }

      const options = {
        "key": keyId, "amount": amountInRupees * 100, "currency": "INR", "name": "Elite Loan Strategies",
        "handler": async (res) => { await saveInquiry(res.razorpay_payment_id); }
      };
      new window.Razorpay(options).open();
    });

    const dateInput = form.querySelector('input[name="booking_date"]');
    const slotSelect = form.querySelector('select[name="booking_slot"]');
    if (dateInput && slotSelect) {
      dateInput.addEventListener('change', async (e) => {
        const val = e.target.value;
        if (!val) return;

        // Show loading state
        slotSelect.innerHTML = '<option value="" disabled selected>Loading availability...</option>';
        slotSelect.disabled = true;

        const availability = await getSlotAvailability(val);
        
        slotSelect.disabled = false;
        slotSelect.innerHTML = '<option value="" disabled selected>Select a Time Slot</option>';
        
        TIMESLOTS.forEach(timeRange => {
          // Generate two slots for each time range
          [1, 2].forEach(slotNum => {
            const slotName = `${timeRange} (Slot ${slotNum})`;
            const isFull = (availability[slotName] || 0) >= 1;
            
            const option = document.createElement('option');
            option.value = slotName; 
            option.textContent = `${slotName}${isFull ? ' - Full' : ''}`; 
            option.disabled = isFull;
            if (isFull) option.className = 'text-gray-400 bg-gray-50';
            slotSelect.appendChild(option);
          });
        });
      });
    }
  };

  initForm();
}
