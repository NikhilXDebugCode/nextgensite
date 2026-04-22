// ===========================
// SCROLL PROGRESS BAR
// ===========================
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (window.scrollY / total * 100) + '%';
  }, { passive: true });
}

// ===========================
// STICKY NAVBAR ON SCROLL
// ===========================
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

// ===========================
// BACK TO TOP BUTTON
// ===========================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

// ===========================
// HAMBURGER MOBILE MENU
// ===========================
// ===========================
// HAMBURGER MOBILE MENU (Sidebar)
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
let mobileNavOverlay = document.getElementById('mobileNavOverlay');

if (hamburger && mobileNav) {
  if (!mobileNavOverlay) {
    mobileNavOverlay = document.createElement('div');
    mobileNavOverlay.className = 'mobile-nav-overlay';
    mobileNavOverlay.id = 'mobileNavOverlay';
    document.body.appendChild(mobileNavOverlay);
    
    mobileNavOverlay.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      mobileNavOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    mobileNavOverlay.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  
  // Close menu on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      mobileNavOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===========================
// SCROLL REVEAL
// ===========================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const cardClasses = ['service-card','client-card','insight-card','team-card',
                           'industry-card','job-card','why-card','testimonial-card'];
      const isCard = cardClasses.some(c => entry.target.classList.contains(c));
      const delay = isCard ? (parseInt(entry.target.dataset.delay) || 0) : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, index) => {
  const cardClasses = ['service-card','client-card','insight-card','team-card',
                       'industry-card','why-card','testimonial-card'];
  if (cardClasses.some(c => el.classList.contains(c))) {
    el.dataset.delay = (index % 3) * 100;
  }
  revealObserver.observe(el);
});

// ===========================
// ANIMATED COUNTER (STATS)
// ===========================
const counters = document.querySelectorAll('.stat-number[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '+';
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target + suffix;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current) + suffix;
        }
      }, 1800 / steps);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===========================
// SEARCH — REAL-TIME DROPDOWN
// ===========================
const SEARCH_INDEX = [
  { title: 'Home',                        url: 'index.html',       icon: 'HM',  desc: 'NextGen Forge Technologies homepage — AI, software engineering & cloud.' },
  { title: 'Our Services',                url: 'services.html',    icon: 'SV',  desc: 'AI & ML, Software Engineering, Web Dev, Cybersecurity, Cloud, DevOps.' },
  { title: 'AI & Machine Learning',       url: 'services.html',    icon: 'AI',  desc: 'Custom AI models, NLP, computer vision, predictive analytics.' },
  { title: 'Web Development',             url: 'services.html',    icon: 'WD',  desc: 'High-performance React, Next.js, Vue.js web and app development.' },
  { title: 'Cybersecurity',               url: 'services.html',    icon: 'CS',  desc: 'Zero-trust, penetration testing, VAPT, ISO 27001 compliance.' },
  { title: 'Cloud & DevOps',              url: 'services.html',    icon: 'CD',  desc: 'AWS, Azure, GCP migration, Kubernetes, CI/CD pipelines.' },
  { title: 'Software Engineering',        url: 'services.html',    icon: 'SE',  desc: 'Microservices, APIs, enterprise platforms in Java, .NET, Python, Node.js.' },
  { title: 'Dedicated Developers',        url: 'services.html',    icon: 'DV',  desc: 'Hire senior Java, Python, React, .NET, Flutter developers.' },
  { title: 'About Us',                    url: 'about.html',       icon: 'AB',  desc: 'Our story, mission, team, and startup journey. Founded 2024.' },
  { title: 'Our Team',                    url: 'about.html',       icon: 'TM',  desc: 'Nikhil P., Priya Sharma, Rahul Yadav, Neha Patel, Venkat, Sunita Bhor.' },
  { title: 'Careers',                     url: 'careeres.html',    icon: 'CR',  desc: 'Web Dev (5), Java Dev (2), MERN (4), AI Engineer, ML Engineer, Internship.' },
  { title: 'Java Developer',              url: 'careeres.html',    icon: 'JV',  desc: 'Java Developer — Spring Boot, J2EE. 2 openings available.' },
  { title: 'Python Developer',            url: 'careeres.html',    icon: 'PY',  desc: 'Python Developer — Django, FastAPI, Flask. Full-time remote.' },
  { title: 'MERN Stack Developer',        url: 'careeres.html',    icon: 'MN',  desc: 'MERN Stack Developer — MongoDB, Express, React, Node. 4 openings.' },
  { title: 'Full Stack Developer',        url: 'careeres.html',    icon: 'FS',  desc: 'Full Stack Developer — React, Node.js, PostgreSQL. Hybrid.' },
  { title: 'ML Engineer',                 url: 'careeres.html',    icon: 'ML',  desc: 'ML Engineer — TensorFlow, PyTorch, MLOps. Remote.' },
  { title: 'Internship Program',          url: 'careeres.html',    icon: 'IN',  desc: 'Internships for B.Tech, BCA, MCA, M.Tech, B.Sc. CS/IT students.' },
  { title: 'Apply for a Job',             url: 'application.html', icon: 'AP',  desc: 'Submit your job application form to join NextGen Forge Technologies.' },
  { title: 'Industries We Serve',         url: 'industries.html',  icon: 'ID',  desc: 'Banking, Healthcare, Retail, Manufacturing, Telecom, Education, Logistics.' },
  { title: 'Banking & Finance',           url: 'industries.html',  icon: 'BF',  desc: 'Fraud detection AI, compliance platforms, payment systems for BFSI.' },
  { title: 'Healthcare Technology',       url: 'industries.html',  icon: 'HC',  desc: 'EHR integration, telemedicine, AI diagnostics, HIPAA-compliant cloud.' },
  { title: 'Retail & E-commerce',         url: 'industries.html',  icon: 'RT',  desc: 'Personalization engines, inventory management, omnichannel platforms.' },
  { title: 'Insights & Articles',         url: 'insights.html',    icon: 'BL',  desc: 'AI, cloud, cybersecurity, and engineering thought leadership.' },
  { title: 'Generative AI in Enterprise', url: 'insights.html',    icon: 'AI',  desc: 'How generative AI is reshaping enterprise software development in 2026.' },
  { title: 'Zero Trust Security',         url: 'insights.html',    icon: 'SC',  desc: 'Zero trust architecture: the new security baseline for 2026.' },
  { title: 'Multi-Cloud Strategy',        url: 'insights.html',    icon: 'CL',  desc: 'Why Indian enterprises are going hybrid multi-cloud in 2026.' },
  { title: 'Contact Us',                  url: 'contact.html',     icon: 'CT',  desc: 'hr@nextgenforgetechnologies.com — Baner, Pune, Maharashtra.' },
  { title: 'Our Location',               url: 'contact.html',     icon: 'LC',  desc: 'Baner, Pune, Maharashtra, India.' },
];

function searchHighlight(text, q) {
  if (!q) return text;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp('(' + escaped + ')', 'gi'),
    '<mark style="background:rgba(59,130,246,0.28);color:#93c5fd;border-radius:3px;padding:0 2px;">$1</mark>');
}

(function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  const bar = input.closest('.search-bar');
  if (!bar) return;

  bar.style.position = 'relative';

  // Build dropdown element
  const dd = document.createElement('div');
  dd.style.cssText =
    'position:absolute;top:calc(100% + 8px);right:0;left:-55px;min-width:360px;' +
    'background:rgba(8,15,32,0.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);' +
    'border:1px solid rgba(59,130,246,0.22);border-radius:14px;' +
    'box-shadow:0 20px 60px rgba(0,0,0,0.65);overflow:hidden;z-index:9500;display:none;' +
    "font-family:'Inter',sans-serif;";
  bar.appendChild(dd);

  function closeDD() { dd.style.display = 'none'; }
  function openDD()  { dd.style.display = 'block'; }

  function render(query) {
    const q = query.trim();
    if (!q) { closeDD(); return; }

    const matches = SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q.toLowerCase()) ||
      item.desc.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 7);

    let html = '<div style="padding:9px 14px 7px;font-size:10px;font-weight:700;letter-spacing:2px;' +
               'text-transform:uppercase;color:#475569;border-bottom:1px solid rgba(148,163,184,0.08);">' +
               (matches.length ? matches.length + ' result' + (matches.length > 1 ? 's' : '') + ' found'
                               : 'No results') + '</div>';

    if (matches.length === 0) {
      html += '<div style="padding:18px 16px;color:#64748b;font-size:13px;text-align:center;">' +
              'No results for <strong style="color:#94a3b8;">"' + q + '"</strong></div>';
    } else {
      matches.forEach(function(r) {
        html +=
          '<a href="' + r.url + '" style="display:flex;align-items:center;gap:12px;padding:11px 14px;' +
          'text-decoration:none;color:#f1f5f9;border-bottom:1px solid rgba(148,163,184,0.05);' +
          'transition:background 0.15s;" ' +
          'onmouseover="this.style.background=\'rgba(59,130,246,0.09)\'" ' +
          'onmouseout="this.style.background=\'transparent\'">' +
            '<div style="width:36px;height:36px;border-radius:8px;flex-shrink:0;' +
            'background:linear-gradient(135deg,rgba(59,130,246,0.18),rgba(124,58,237,0.12));' +
            'border:1px solid rgba(59,130,246,0.2);display:flex;align-items:center;justify-content:center;' +
            'font-size:8px;font-weight:800;color:#60a5fa;">' + r.icon + '</div>' +
            '<div style="overflow:hidden;flex:1;">' +
              '<div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
                searchHighlight(r.title, q) +
              '</div>' +
              '<div style="font-size:11.5px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px;">' +
                r.desc +
              '</div>' +
            '</div>' +
          '</a>';
      });
    }

    html += '<div style="padding:7px 14px;text-align:right;border-top:1px solid rgba(148,163,184,0.07);">' +
            '<span style="font-size:10px;color:#475569;">' +
            '<kbd style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);' +
            'border-radius:4px;padding:1px 5px;">Enter</kbd> first result &nbsp;' +
            '<kbd style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);' +
            'border-radius:4px;padding:1px 5px;">Esc</kbd> close</span></div>';

    dd.innerHTML = html;
    openDD();
  }

  input.addEventListener('input',  function() { render(input.value); });
  input.addEventListener('focus',  function() { if (input.value.trim()) render(input.value); });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeDD(); input.blur(); }
    if (e.key === 'Enter' && input.value.trim()) {
      const q = input.value.toLowerCase();
      const first = SEARCH_INDEX.find(r =>
        r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q)
      );
      if (first) window.location.href = first.url;
      closeDD();
    }
  });

  document.addEventListener('click', function(e) {
    if (!bar.contains(e.target)) closeDD();
  });
})();

// ===========================
// REGION / LANGUAGE SELECTOR
// ===========================
(function initRegionSelector() {
  var selector = document.querySelector('.region-selector');
  if (!selector) return;

  var activeBtn = selector.querySelector('.region-active');
  var dropdown  = selector.querySelector('.region-dropdown');
  var items     = selector.querySelectorAll('.region-item');
  var label     = activeBtn ? activeBtn.querySelector('span') : null;
  if (!dropdown || !label) return;

  // Region → display label mapping
  var labelMap = {
    'India (English)':         'India | EN',
    'Global (English)':        'Global | EN',
    'APAC (English)':          'APAC | EN',
    'EMEA (English)':          'EMEA | EN',
    'North America (English)': 'NA | EN'
  };

  // Restore from localStorage
  var saved = localStorage.getItem('ngt-region');
  if (saved) {
    items.forEach(function(item) {
      var text = item.textContent.trim();
      item.classList.toggle('active', text === saved);
      if (text === saved && labelMap[text]) label.textContent = labelMap[text];
    });
  }

  // Toggle dropdown on click/tap
  activeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    var isOpen = dropdown.classList.contains('region-open');
    dropdown.classList.toggle('region-open', !isOpen);
  });

  // Select a region item
  items.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      var text = this.textContent.trim();
      items.forEach(function(i) { i.classList.remove('active'); });
      this.classList.add('active');
      if (labelMap[text]) label.textContent = labelMap[text];
      localStorage.setItem('ngt-region', text);
      dropdown.classList.remove('region-open');
      if (typeof showToast === 'function') {
        showToast('Region set to ' + text, 'success', 2500);
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (!selector.contains(e.target)) dropdown.classList.remove('region-open');
  });

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') dropdown.classList.remove('region-open');
  });
})();

// Removed redundant contact-form listener. The AJAX one below handles submission.
// ===========================
// NEWSLETTER FORM
// ===========================
function handleNewsletter(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const input = e.target.querySelector('input');
  btn.textContent = 'Subscribed!';
  btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
}

// ===========================
// COOKIE BANNER
// ===========================
const cookieBanner = document.getElementById('cookieBanner');
if (cookieBanner) {
  if (!localStorage.getItem('cookieConsent')) {
    cookieBanner.classList.add('hidden');
    setTimeout(() => cookieBanner.classList.remove('hidden'), 1800);
  } else {
    cookieBanner.style.display = 'none';
  }
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  const b = document.getElementById('cookieBanner');
  if (b) { b.classList.add('hidden'); setTimeout(() => b.style.display = 'none', 400); }
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'declined');
  const b = document.getElementById('cookieBanner');
  if (b) { b.classList.add('hidden'); setTimeout(() => b.style.display = 'none', 400); }
}

// ===========================
// FILE UPLOAD DISPLAY
// ===========================
function handleFileSelect(input) {
  const file = input.files[0];
  const nameEl = document.getElementById('fileName');
  if (file && nameEl) {
    nameEl.textContent = 'Selected: ' + file.name;
    nameEl.style.display = 'block';
  }
}

// ===========================
// HERO VIDEO — PERFORMANCE (play only when visible)
// ===========================
(function () {
  const vid = document.querySelector('.hero-video');
  if (!vid) return;
  vid.setAttribute('preload', 'none');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) vid.play().catch(() => {});
      else vid.pause();
    });
  }, { threshold: 0.1 });
  obs.observe(vid);
})();

// ===========================
// INJECT PERSISTENT UI ELEMENTS
// (works on every page automatically)
// ===========================
(function injectUI() {
  // --- PRELOADER ---
  const pl = document.createElement('div');
  pl.id = 'preloader';
  pl.innerHTML = '<div class="preloader-inner"><img src="IMG_20260312_210306%20(1).png" alt="NextGen Forge" class="preloader-logo-img" loading="eager"><span class="preloader-name">NextGen <span>Forge</span></span><div class="preloader-bar"><div class="preloader-fill"></div></div></div>';
  document.body.insertAdjacentElement('afterbegin', pl);

  // --- WHATSAPP BUTTON REMOVED ---

  // --- STICKY FREE CONSULTATION CTA ---
  const cta = document.createElement('a');
  cta.id = 'stickyCta'; cta.href = 'contact.html';
  cta.setAttribute('aria-label', 'Get a free consultation');
  cta.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Free Consultation';
  document.body.appendChild(cta);

  // --- DARK/LIGHT TOGGLE BUTTON in navbar ---
  const nb = document.getElementById('navbar') || document.querySelector('.navbar');
  if (nb) {
    const rm = nb.querySelector('.right-menu');
    if (rm) {
      const btn = document.createElement('button');
      btn.id = 'themeToggle'; btn.setAttribute('aria-label', 'Toggle theme');
      btn.textContent = '\u2600';
      rm.insertBefore(btn, rm.firstChild);
      btn.addEventListener('click', toggleTheme);
    }
  }
})();

// ===========================
// PRELOADER — hide after page loads
// ===========================
window.addEventListener('load', () => {
  const pl = document.getElementById('preloader');
  if (pl) {
    setTimeout(() => {
      pl.classList.add('pl-hide');
      setTimeout(() => { pl.style.display = 'none'; }, 550);
    }, 300);
  }
});

// ===========================
// DARK / LIGHT MODE
// ===========================
const _THEME_KEY = 'ngt-theme';
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  const b = document.getElementById('themeToggle');
  if (b) b.textContent = t === 'dark' ? '\u2600' : '\uD83C\uDF19';
  localStorage.setItem(_THEME_KEY, t);
}
function toggleTheme() {
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}
applyTheme(localStorage.getItem(_THEME_KEY) || 'dark');

// ===========================
// TOAST NOTIFICATION SYSTEM
// ===========================
function showToast(message, type, duration) {
  type = type || 'success'; duration = duration || 4000;
  let cont = document.getElementById('toastContainer');
  if (!cont) { cont = document.createElement('div'); cont.id = 'toastContainer'; document.body.appendChild(cont); }
  const t = document.createElement('div');
  t.className = 'toast toast-' + type;
  const icons = { success: '&#10003;', error: '&#10005;', info: '&#8505;' };
  t.innerHTML = '<span class="toast-icon">' + (icons[type] || icons.info) + '</span><span>' + message + '</span><button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close">&times;</button>';
  cont.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => { if (t.parentElement) t.remove(); }, 350); }, duration);
}

// Override newsletter to use toast
function handleNewsletter(e) {
  e.preventDefault();
  var inp = e.target.querySelector('input'), btn = e.target.querySelector('button');
  inp.value = '';
  showToast('Subscribed! Insights delivered monthly. \uD83C\uDF89', 'success');
  if (btn) { var orig = btn.textContent; btn.textContent = 'Subscribed!'; setTimeout(() => { btn.textContent = orig; }, 3000); }
}

// ===========================
// KEYBOARD SHORTCUT: / → open search
// ===========================
document.addEventListener('keydown', function (e) {
  if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    var si = document.getElementById('search-input');
    if (si) { si.focus(); si.select(); }
  }
});

// ===========================
// AUTO-HIGHLIGHT ACTIVE NAV LINK
// ===========================
(function () {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('?')[0];
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });
})();

// ===========================
// COPY EMAIL TO CLIPBOARD
// ===========================
function copyEmail(email) {
  navigator.clipboard.writeText(email).then(function () {
    showToast('Email copied to clipboard! \uD83D\uDCCB', 'success', 2500);
  }).catch(function () {
    showToast('Copy: ' + email, 'info', 4000);
  });
}

// ===========================
// REAL-TIME FORM VALIDATION
// ===========================
(function () {
  function vField(inp) {
    var v = inp.value.trim(), err = '';
    if (inp.required && !v) err = 'This field is required.';
    else if (inp.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) err = 'Enter a valid email address.';
    else if (inp.type === 'tel' && v && !/^[\d\s\-+()]{7,15}$/.test(v)) err = 'Enter a valid phone number.';
    var errEl = inp.parentElement.querySelector('.field-error');
    if (err) {
      inp.classList.add('field-invalid'); inp.classList.remove('field-valid');
      if (!errEl) { errEl = document.createElement('span'); errEl.className = 'field-error'; inp.parentElement.appendChild(errEl); }
      errEl.textContent = err;
    } else if (v) {
      inp.classList.remove('field-invalid'); inp.classList.add('field-valid');
      if (errEl) errEl.remove();
    } else {
      inp.classList.remove('field-invalid', 'field-valid');
      if (errEl) errEl.remove();
    }
    return !err;
  }
  function initV(form) {
    if (!form) return;
    form.querySelectorAll('input,textarea,select').forEach(function (f) {
      f.addEventListener('blur', function () { vField(f); });
      f.addEventListener('input', function () { if (f.classList.contains('field-invalid')) vField(f); });
    });
    form.addEventListener('submit', function (e) {
      var ok = true;
      form.querySelectorAll('input,textarea,select').forEach(function (f) { if (!vField(f)) ok = false; });
      if (!ok) { e.preventDefault(); showToast('Please fix errors before submitting.', 'error'); return; }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Sending\u2026'; btn.disabled = true; btn.style.opacity = '0.7'; }
    });
  }
  initV(document.getElementById('contact-form'));
  initV(document.getElementById('application-form'));
})();

// ===========================
// TESTIMONIAL CAROUSEL (mobile auto-scroll)
// ===========================
(function () {
  var track = document.querySelector('.testimonials-track');
  if (!track) return;
  var cards = Array.from(track.querySelectorAll('.testimonial-card'));
  if (cards.length < 2) return;
  var cur = 0, tmr;
  function goTo(idx) {
    cards.forEach(function (c, i) {
      c.classList.toggle('testi-active', i === idx);
      c.classList.toggle('testi-fade', i !== idx);
    });
    cur = idx;
  }
  function setup() {
    clearInterval(tmr);
    if (window.innerWidth <= 768) {
      goTo(0);
      tmr = setInterval(function () { goTo((cur + 1) % cards.length); }, 4500);
    } else {
      cards.forEach(function (c) { c.classList.remove('testi-active', 'testi-fade'); });
    }
  }
  setup();
  window.addEventListener('resize', setup);
})();

// ===========================
// APPLICATION FORM — AJAX SUBMIT → redirect to thankyou.html
// Prevents FormSubmit from redirecting to their own homepage
// ===========================
(function () {
  var appForm = document.getElementById('application-form');
  if (!appForm) return;

  appForm.addEventListener('submit', function (e) {
    e.preventDefault();   // Stop native FormSubmit navigation

    // Validate required fields
    var ok = true;
    appForm.querySelectorAll('[required]').forEach(function (fi) {
      var v = fi.value ? fi.value.trim() : '';
      if (!v) { fi.classList.add('field-invalid'); ok = false; }
    });
    if (!ok) {
      if (typeof showToast === 'function') showToast('Please fill all required fields.', 'error');
      return;
    }

    // UI feedback
    var btn = appForm.querySelector('button[type="submit"]');
    if (btn) { btn.textContent = 'Submitting\u2026'; btn.disabled = true; btn.style.opacity = '0.7'; }

    // Send via FormData (supports file uploads)
    var fd = new FormData(appForm);

    fetch('https://formsubmit.co/ajax/careers@nextgenforgetechnologies.com', {
      method: 'POST',
      body: fd,
      headers: { Accept: 'application/json' }
    })
    .then(function () {
      window.location.href = 'thankyou.html';
    })
    .catch(function () {
      // Redirect regardless — FormSubmit may still deliver the email
      window.location.href = 'thankyou.html';
    });
  });
})();

// ===========================
// CONTACT FORM — AJAX SUBMIT → redirect to thankyou.html
// ===========================
(function () {
  var cForm = document.getElementById('contact-form');
  if (!cForm) return;

  cForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var ok = true;
    cForm.querySelectorAll('[required]').forEach(function (fi) {
      var v = fi.value ? fi.value.trim() : '';
      if (!v) { fi.classList.add('field-invalid'); ok = false; }
    });
    if (!ok) {
      if (typeof showToast === 'function') showToast('Please fill all required fields.', 'error');
      return;
    }

    var btn = cForm.querySelector('button[type="submit"]');
    if (btn) { btn.textContent = 'Sending\u2026'; btn.disabled = true; btn.style.opacity = '0.7'; }

    var fd = new FormData(cForm);

    fetch('https://formsubmit.co/ajax/hr@nextgenforgetechnologies.com', {
      method: 'POST',
      body: fd,
      headers: { Accept: 'application/json' }
    })
    .then(function () {
      window.location.href = 'thankyou.html';
    })
    .catch(function () {
      window.location.href = 'thankyou.html';
    });
  });
})();
