import '../style.css';
import { createIcons, Menu, X, Phone, Mail, MapPin, CheckCircle, ArrowRight, Home, Info, Briefcase, MessageSquare, ChevronRight, ChevronDown, ChevronUp, Star } from 'lucide';
import { renderNavbar } from '../components/Navbar.js';
import { renderHero } from '../components/Hero.js';
import { renderTestimonials } from '../components/Testimonials.js';
import { renderAbout } from '../components/About.js';
import { renderServices } from '../components/Services.js';
import { renderWhyChooseUs } from '../components/WhyChooseUs.js';
import { renderContact } from '../components/Contact.js';
import { renderFooter } from '../components/Footer.js';
import { renderWhatsAppButton } from '../components/WhatsAppButton.js';

// Main App Container
const app = document.querySelector('#app');

function init() {
  app.innerHTML = `
    <nav id="navbar-container"></nav>
    <main>
      <section id="home"></section>
      <section id="testimonials"></section>
      <section id="about"></section>
      <section id="services"></section>
      <section id="why-choose-us"></section>
      <section id="contact"></section>
    </main>
    <footer id="footer-container"></footer>
    <div id="whatsapp-container"></div>
  `;

  renderNavbar();
  renderHero();
  renderTestimonials();
  renderAbout(true); // Preview mode
  renderServices(true); // Preview mode
  renderWhyChooseUs();
  renderContact(true); // Preview mode
  renderFooter();
  renderWhatsAppButton();

  createIcons({
    icons: { Menu, X, Phone, Mail, MapPin, CheckCircle, ArrowRight, Home, Info, Briefcase, MessageSquare, ChevronRight, ChevronDown, ChevronUp, Star }
  });

  // Initialize AOS after content is in DOM
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
}

document.addEventListener('DOMContentLoaded', init);
