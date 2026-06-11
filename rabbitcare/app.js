/* ==========================================
   RabbitCare – JavaScript
   ========================================== */

// ── Scroll-triggered animations ──────────────────────
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => observer.observe(el));

// ── Sticky nav ───────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ── Active nav link highlight ────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--clr-primary)'
      : '';
  });
}, { passive: true });

// ── Mobile hamburger (simple toggle) ─────────────────
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinksEl   = document.querySelector('.nav-links');

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = navLinksEl.style.display === 'flex';
    navLinksEl.style.cssText = isOpen
      ? ''
      : 'display:flex;flex-direction:column;position:fixed;top:72px;left:0;right:0;background:rgba(253,248,242,.97);backdrop-filter:blur(12px);padding:2rem;gap:1.5rem;box-shadow:0 8px 32px rgba(0,0,0,.1);z-index:999;';
  });
}

// ── Contact form ─────────────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('form-submit-btn');
  const success = document.getElementById('form-success');

  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    btn.style.display  = 'none';
    success.style.display = 'block';
    e.target.reset();
  }, 1200);
}

// ── Smooth count-up for hero stats ───────────────────
function countUp(el, target, suffix = '') {
  let start = 0;
  const step = target / 50;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + suffix; clearInterval(timer); }
    else el.textContent = Math.floor(start) + suffix;
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stats = entry.target.querySelectorAll('.stat strong');
      const values = [50, 200, 4.9];
      const suffixes = ['K+', '+', '★'];
      stats.forEach((el, i) => countUp(el, values[i], suffixes[i]));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── Floating card parallax on hero ───────────────────
const heroSection = document.getElementById('hero');
const floatHealth = document.getElementById('float-health');
const floatMeal   = document.getElementById('float-meal');

window.addEventListener('mousemove', (e) => {
  if (!heroSection || !floatHealth) return;
  const rect = heroSection.getBoundingClientRect();
  if (e.clientY > rect.bottom) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 14;
  const y = (e.clientY / window.innerHeight - 0.5) * 14;
  floatHealth.style.transform = `translate(${-x}px, ${-y}px)`;
  floatMeal.style.transform   = `translate(${x}px, ${y}px)`;
});

// ── Pricing card hover tilt ───────────────────────────
document.querySelectorAll('.pricing-card:not(.featured)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
