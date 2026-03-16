/* ============================================================
   PAULO VIEIRA IMÓVEIS — script.js
   ============================================================ */

/* ── PROGRESS BAR ── */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  progressBar.style.width = (p * 100) + '%';
}, { passive: true });

/* ── NAVBAR SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = open ? 'rotate(45deg) translate(5px,4.5px)' : '';
  spans[1].style.opacity   = open ? '0' : '1';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-4.5px)' : '';
});
document.querySelectorAll('.mob-link').forEach(l => {
  l.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
  });
});

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('on'), i * 90);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.rv').forEach(el => revealObs.observe(el));

/* ── PARALLAX GLOWS NO HERO ── */
const glows = document.querySelectorAll('.hero-glow');
let mx = 0, my = 0, gx = 0, gy = 0;
document.addEventListener('mousemove', e => {
  mx = (e.clientX / window.innerWidth  - 0.5) * 30;
  my = (e.clientY / window.innerHeight - 0.5) * 30;
});
(function animGlows() {
  gx += (mx - gx) * 0.04;
  gy += (my - gy) * 0.04;
  glows.forEach((g, i) => {
    const factor = i === 0 ? 0.5 : i === 1 ? -0.35 : 0.25;
    g.style.transform = `translate(calc(-50% + ${gx * factor}px), calc(-50% + ${gy * factor}px))`;
  });
  requestAnimationFrame(animGlows);
})();

/* ── SELECIONAR CONSTRUTORA → MOSTRAR BOOKS ── */
const constNames = {
  vivaz:    'Vivaz Residencial',
  vibra:    'Vibra Residencial',
  tenda:    'Construtora Tenda',
  plano:    'Plano & Plano',
  emccamp:  'EMCCAMP',
  cury:     'Cury Construtora',
  metrocasa:'Metrocasa',
  econ:     'Econ Construtora',
};

function selectConst(btn, constId) {
  // Atualiza botões
  document.querySelectorAll('.const-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Esconde todos os panels
  document.querySelectorAll('.book-panel').forEach(p => p.classList.remove('active'));

  // Mostra o panel correto
  const panel = document.getElementById('panel-' + constId);
  if (panel) {
    panel.classList.add('active');
    // Re-observa novos cards para reveal
    panel.querySelectorAll('.rv').forEach(el => {
      el.classList.remove('on');
      revealObs.observe(el);
    });
  }

  // Atualiza header dos books
  const name = constNames[constId] || constId;
  const tag = document.getElementById('books-tag');
  const title = document.getElementById('books-title');
  if (tag)   tag.textContent   = 'Books · ' + name;
  if (title) title.innerHTML   = 'Empreendimentos <em>disponíveis</em>';

  // Scroll suave para a seção de books
  const booksSection = document.getElementById('books');
  if (booksSection) {
    setTimeout(() => {
      booksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }
}
window.selectConst = selectConst;

/* ── PEDIR BOOK VIA WHATSAPP ── */
function pedirBook(nomeBook) {
  /* ── EDIT: número WhatsApp do corretor ── */
  const wa = '5511997966048';
  const msg = `Olá Paulo! Vim pelo seu portal e tenho interesse no book: *${nomeBook}*. Pode me enviar mais informações?`;
  window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank');
}
window.pedirBook = pedirBook;

/* ── TILT 3D NOS CARDS ── */
document.querySelectorAll('.vant-card, .selo, .book-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform .5s cubic-bezier(.23,1,.32,1)';
    card.style.transform  = '';
    setTimeout(() => card.style.transition = '', 500);
  });
});

/* ── SMOOTH ANCHOR SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        const active = a.getAttribute('href') === `#${id}`;
        a.style.color = active ? 'var(--gold)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe
// observar todas
sections.forEach(s => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe(s);
});

/* ── WA FLOAT: esconde no hero, mostra depois ── */
const waFloat = document.getElementById('wa-float');
window.addEventListener('scroll', () => {
  if (waFloat) waFloat.style.opacity = window.scrollY > 300 ? '1' : '0';
}, { passive: true });
if (waFloat) waFloat.style.opacity = '0';
if (waFloat) waFloat.style.transition = 'opacity .4s';
