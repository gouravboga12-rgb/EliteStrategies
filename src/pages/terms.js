import '../style.css';
import { createIcons, Menu, X, Phone, Mail, MapPin, CheckCircle, ArrowRight, Home, Info, Briefcase, MessageSquare, ChevronRight, ShieldCheck, FileText } from 'lucide';
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
              <i data-lucide="file-text" class="w-10 h-10 text-primary"></i>
              Terms & Conditions
            </h1>
            
            <div class="prose prose-lg text-gray-600 space-y-8">
              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p>Welcome to Elite Loan Strategies. By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, please do not use our services.</p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">2. Services Provided</h2>
                <p>Elite Loan Strategies provides financial consultation and assistance in obtaining various types of loans from financial institutions. We do not provide loans directly but act as an intermediary to facilitate the loan process.</p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
                <p>Users must provide accurate, current, and complete information as requested in our application forms. Providing false or misleading information may result in the rejection of your application and termination of services.</p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">4. Fees & Payments</h2>
                <p>Some of our services, such as CIBIL Score Analysis and Business Loan Consultation, may require a professional fee. These fees are non-refundable unless otherwise specified in a separate agreement.</p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
                <p>Elite Loan Strategies shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or for the actions of third-party financial institutions.</p>
              </section>

              <section>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">6. Refund Policy</h2>
                <p>If a customer is not satisfied with our service or work, they may request a refund. Once the request is approved, the refund will be processed within 5 working days to the original payment method.</p>
              </section>

              <section class="pt-8 border-t border-gray-100 italic text-sm text-gray-500">
                Last updated: March 18, 2026
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
    icons: { Menu, X, Phone, Mail, MapPin, CheckCircle, ArrowRight, Home, Info, Briefcase, MessageSquare, ChevronRight, ShieldCheck, FileText }
  });
}

document.addEventListener('DOMContentLoaded', init);
