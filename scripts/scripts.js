const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('site-nav');

/* ---------- Theme (respects OS preference until the user picks one) ---------- */

const darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

const applyTheme = (theme) => {
  const dark = theme === 'dark';
  body.classList.toggle('dark-mode', dark);
  if (themeToggle) {
    themeToggle.textContent = dark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  const meta = document.querySelector('meta[name="theme-color"]:not([media])');
  if (meta) meta.setAttribute('content', dark ? '#100f12' : '#f5f1eb');
};

const storedTheme = localStorage.getItem('theme');
applyTheme(storedTheme || (darkQuery && darkQuery.matches ? 'dark' : 'light'));

if (darkQuery) {
  const onSystemChange = (event) => {
    if (!localStorage.getItem('theme')) applyTheme(event.matches ? 'dark' : 'light');
  };
  if (darkQuery.addEventListener) darkQuery.addEventListener('change', onSystemChange);
  else if (darkQuery.addListener) darkQuery.addListener(onSystemChange);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  });
}

/* ---------- Mobile menu ---------- */

const closeMenu = () => {
  if (!nav || !menuToggle) return;
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
};

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (event) => {
    if (nav.classList.contains('open') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
}

/* ---------- Analytics ---------- */

const trackContactClick = (channel, destination) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'contact_click', {
      event_category: 'engagement',
      event_label: channel,
      contact_destination: destination,
    });
  }

  if (typeof window.clarity === 'function') {
    window.clarity('event', `contact_${channel}_click`);
  }
};

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link) return;

  const href = link.getAttribute('href') || '';
  if (href.startsWith('tel:')) {
    trackContactClick('phone', href);
  } else if (href.startsWith('mailto:')) {
    trackContactClick('email', href);
  } else if (href.includes('wa.me/') || href.includes('whatsapp.com/')) {
    trackContactClick('whatsapp', href);
  }
});

/* ---------- Footer year ---------- */

document.getElementById('year')?.replaceChildren(document.createTextNode(new Date().getFullYear()));

/* ---------- Scroll reveal (safe fallback: content is always visible) ---------- */

const revealItems = document.querySelectorAll('.fade-up');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

/* ---------- Quote form (no backend: composes a WhatsApp / email message) ---------- */

const quoteForm = document.getElementById('quote-form');

if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(quoteForm);
    const value = (key) => String(data.get(key) || '').trim();

    const lines = [
      'Hi RR Interiors & Furniture! I would like a quote.',
      '',
      `Name: ${value('name')}`,
      `Phone: ${value('phone')}`,
      `City: ${value('city')}`,
      `Interested in: ${value('interest')}`,
    ];
    const details = value('details');
    if (details) lines.push('', `Details: ${details}`);

    const message = lines.join('\n');
    const channel = (event.submitter && event.submitter.value) || 'whatsapp';

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'form_submit', {
        event_category: 'lead',
        form_name: 'quote_request',
        form_channel: channel,
      });
    }

    const status = document.getElementById('form-status');

    if (channel === 'email') {
      const mailto = `mailto:deepaksuthar000@gmail.com?subject=${encodeURIComponent(
        'Quote request from rrfurniture.co.in'
      )}&body=${encodeURIComponent(message)}`;
      if (status) status.textContent = 'Opening your email app…';
      window.location.href = mailto;
    } else {
      const url = `https://wa.me/919610053048?text=${encodeURIComponent(message)}`;
      if (status) status.textContent = 'Opening WhatsApp with your details…';
      window.open(url, '_blank', 'noopener');
    }
  });
}
