import '../style.css';
import { createIcons, Menu, X, Phone, Mail, MapPin, CheckCircle, ArrowRight, Home, Info, Briefcase, MessageSquare, ChevronRight, ShieldCheck, Lock } from 'lucide';
import { renderNavbar } from '../components/Navbar.js';
import { renderFooter } from '../components/Footer.js';
import { renderWhatsAppButton } from '../components/WhatsAppButton.js';

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

const app = document.querySelector('#app');

function init() {
  app.innerHTML = `
    <nav id="navbar-container"></nav>
    <main class="pt-20">
      <section class="py-24 bg-gray-50">
        <div class="container mx-auto px-6 md:px-12">
          <div class="max-w-4xl mx-auto bg-white rounded-[2rem] p-8 md:p-16 shadow-xl border border-gray-100">
            <h1 class="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-4">
              <i data-lucide="lock" class="w-10 h-10 text-primary"></i>
              Privacy Policy
            </h1>
            
            <div class="prose prose-lg text-gray-600 space-y-8">
              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">1. Data Collection</h2>
                <p>We collect personal information that you provide to us directly through our website forms, including name, contact details, financial status, and documents required for loan applications.</p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">2. Use of Information</h2>
                <p>The information we collect is used to evaluate your eligibility for various financial products, facilitate application processes with banks, improve our services, and communicate with you about your inquiries.</p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">3. Data Sharing</h2>
                <p>We only share your information with trusted third-party financial institutions and service providers necessary to complete your requests. We do not sell your personal data to advertisers.</p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">4. Security</h2>
                <p>We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.</p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
                <p>You have the right to access, update, or request the deletion of your personal information at any time by contacting our support team.</p>
              </section>

              <section class="pt-8 border-t border-gray-100 italic text-sm text-gray-500">
                Last updated: March 17, 2026
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer id="footer-container"></footer>
    <div id="whatsapp-container"></div>
  `;

  renderNavbar();
  renderFooter();
  renderWhatsAppButton();

  createIcons({
    icons: { Menu, X, Phone, Mail, MapPin, CheckCircle, ArrowRight, Home, Info, Briefcase, MessageSquare, ChevronRight, ShieldCheck, Lock }
  });
}

document.addEventListener('DOMContentLoaded', init);
