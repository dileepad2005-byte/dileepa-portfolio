// app.js – Portfolio Interactivity
// This script handles navigation scrolling effects, mobile menu toggling, and contact form submission.

// Helper to add/remove class on scroll for navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const expanded = mobileMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', expanded);
  });
}

// Smooth scrolling for internal links (fallback for browsers without CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Contact form – simple client‑side handling (shows success message)
const contactForm = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success-msg');
if (contactForm && successMsg) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    // Here you could integrate a backend endpoint or email service.
    // For now, just show the success message.
    successMsg.style.display = 'block';
    // Reset form fields after a brief delay
    setTimeout(() => {
      contactForm.reset();
      successMsg.style.display = 'none';
    }, 3000);
  });
}

// Optional: Highlight active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
const setActiveLink = () => {
  let scrollPos = window.scrollY + 120; // offset for header height
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
};
window.addEventListener('scroll', setActiveLink);
setActiveLink();
