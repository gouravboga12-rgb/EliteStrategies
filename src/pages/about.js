import '../style.css';
import { createIcons, Menu, X, Phone, Mail, MapPin, CheckCircle, ArrowRight, Home, Info, Briefcase, MessageSquare, ChevronRight } from 'lucide';
import { renderNavbar } from '../components/Navbar.js';
import { renderAbout } from '../components/About.js';
import { renderWhyChooseUs } from '../components/WhyChooseUs.js';
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
      <section id="about"></section>
      <section id="why-choose-us"></section>
    </main>
    <footer id="footer-container"></footer>
    <div id="whatsapp-container"></div>
  `;

  renderNavbar();
  renderAbout();
  renderWhyChooseUs();
  renderFooter();
  renderWhatsAppButton();

  createIcons({
    icons: { Menu, X, Phone, Mail, MapPin, CheckCircle, ArrowRight, Home, Info, Briefcase, MessageSquare, ChevronRight }
  });
}

document.addEventListener('DOMContentLoaded', init);
