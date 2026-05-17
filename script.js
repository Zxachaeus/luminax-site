/* ===== CURSOR: using CSS blue arrow cursor (no JS needed) ===== */

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== PARTICLE CANVAS ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

const PARTICLE_COUNT = 90;
const particles = [];

const colors = ['rgba(0,229,255,', 'rgba(57,255,20,', 'rgba(255,229,0,'];

function createParticle() {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: Math.random() * 0.5 + 0.1
  };
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(createParticle());
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);

  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > W) p.dx *= -1;
    if (p.y < 0 || p.y > H) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + p.alpha + ')';
    ctx.fill();

    // Draw faint connection lines
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dist = Math.hypot(p.x - q.x, p.y - q.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(0,229,255,${0.04 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

/* ===== STAT COUNTER ANIMATION ===== */
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      let current = 0;
      const increment = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 20);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

/* ===== SMOOTH NAV LINK CLICK ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== FEATURE CARD TILT EFFECT ===== */
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});

/* ===== PRODUCT IMAGE PARALLAX ===== */
const productImg = document.querySelector('.product-img');
window.addEventListener('mousemove', (e) => {
  if (!productImg) return;
  const xShift = ((e.clientX / window.innerWidth) - 0.5) * 14;
  const yShift = ((e.clientY / window.innerHeight) - 0.5) * 8;
  productImg.style.transform = `translateY(-18px) translate(${xShift}px, ${yShift}px)`;
});

/* ===== ENERGY PULSE ON SCROLL ===== */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const rings = document.querySelectorAll('.energy-ring');
  rings.forEach((ring, i) => {
    const offset = scrolled * 0.05 * (i + 1);
    ring.style.transform = `scale(${1 + offset * 0.002}) rotate(${offset}deg)`;
  });
});

/* ===== HERO TITLE GLITCH EFFECT ===== */
const heroTitle = document.querySelector('.hero-title');
let glitchInterval;

function startGlitch() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
  let count = 0;
  const originalHTML = heroTitle.innerHTML;

  glitchInterval = setInterval(() => {
    count++;
    if (count > 8) {
      clearInterval(glitchInterval);
      heroTitle.innerHTML = originalHTML;
      setTimeout(startGlitch, 8000);
      return;
    }
    heroTitle.style.textShadow = `
      ${Math.random() * 6 - 3}px 0 #ff0055,
      ${Math.random() * 6 - 3}px 0 #00e5ff
    `;
  }, 60);

  setTimeout(() => {
    heroTitle.style.textShadow = '';
  }, 500);
}

setTimeout(startGlitch, 3000);