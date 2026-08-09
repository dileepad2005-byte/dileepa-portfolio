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

// Certificate Modal Logic
const certCards = document.querySelectorAll('.cert-display-card[data-cert]');
const modal = document.getElementById('cert-modal');
const modalImg = document.getElementById('cert-modal-img');
const modalTitle = document.getElementById('cert-modal-title');
const modalOrg = document.getElementById('cert-modal-org');
const modalDownload = document.getElementById('cert-modal-download');
const modalClose = document.getElementById('cert-modal-close');
const modalBackdrop = document.getElementById('cert-modal-backdrop');
const modalLoading = document.getElementById('cert-modal-loading');

function openModal(card) {
  const imgSrc = card.getAttribute('data-cert');
  const title = card.getAttribute('data-cert-title');
  const org = card.getAttribute('data-cert-org');

  modalTitle.textContent = title;
  modalOrg.textContent = org;
  modalDownload.href = imgSrc;
  modalImg.style.display = 'none';
  modalLoading.style.display = 'block';

  // Load image
  const tempImg = new Image();
  tempImg.onload = function() {
    modalImg.src = imgSrc;
    modalImg.style.display = 'block';
    modalLoading.style.display = 'none';
  };
  tempImg.onerror = function() {
    modalLoading.textContent = 'Failed to load certificate image. Please make sure the image exists in the "certs" folder.';
  }
  tempImg.src = imgSrc;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    modalImg.src = ''; // Clear image src when closed
    modalLoading.textContent = 'Loading certificate…';
  }, 300);
}

// Add click and keyboard events to cards
certCards.forEach(card => {
  card.addEventListener('click', () => openModal(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(card);
    }
  });
});

// Close events
if(modalClose) modalClose.addEventListener('click', closeModal);
if(modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});
