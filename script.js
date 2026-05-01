// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = hamburger.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  '.about-grid, .menu-card, .feature-card, .testimonial, .contact-grid, .section-header'
);
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== CONTACT FORM (FORMSPREE) =====
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  formStatus.textContent = 'Sending...';
  formStatus.className = 'form-status';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formStatus.textContent = '☕ Thanks! Your message has been sent.';
      formStatus.classList.add('success');
      form.reset();
    } else {
      const result = await response.json();
      formStatus.textContent = result.errors
        ? result.errors.map(e => e.message).join(', ')
        : 'Oops! Something went wrong.';
      formStatus.classList.add('error');
    }
  } catch (error) {
    formStatus.textContent = '⚠️ Network error. Please try again.';
    formStatus.classList.add('error');
  }
});

// ===== SMOOTH ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--accent)';
    }
  });
});

console.log('☕ Brewed Awakening landing page loaded successfully!');