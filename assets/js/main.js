/* ═══════════════════════════════════════════════════════
   PRAJYOT FULSUNDAR — Portfolio JavaScript
   Terminal animation, scroll reveals, theme toggle, interactions
   ═══════════════════════════════════════════════════════ */

'use strict';

// ── THEME TOGGLE ─────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  body.classList.remove('dark-mode');
  body.classList.add('light-mode');
  themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  const isDark = body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ── HAMBURGER MENU ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

// ── TERMINAL ANIMATION ────────────────────────────────────
const terminalLines = [
  { text: 'Initializing SecureOps Terminal v3.1.0...', color: '#444' },
  { text: 'Loading profile: prajyot.fulsundar@devsecops', color: '#00cfff' },
  { text: 'Experience: 9+ years | SDET → DevSecOps: VERIFIED ✓', color: '#00ff88' },
  { text: 'Stack: Playwright · Semgrep · Snyk · Trivy · OWASP ZAP · K8s', color: '#00ff88' },
  { text: 'Coverage: 95% ↑ | Vulns: 3 (↓ from 28, −89%) | Pipeline: 96%', color: '#ffd60a' },
  { text: 'Zero Trust: ON | Shift-Left: ON | CI Security Gates: ACTIVE', color: '#00ff88' },
  { text: 'Status: TOP_1_PERCENT=true | RECRUITER_MAGNET=true', color: '#ff6b35' },
  { text: 'Ready. Awaiting your next security challenge.', color: '#e8e8f0' },
];

const terminalBody = document.getElementById('terminalBody');
let lineIndex = 0;

function addTerminalLine() {
  if (lineIndex >= terminalLines.length) {
    // Add blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    terminalBody.appendChild(cursor);
    return;
  }
  const line = terminalLines[lineIndex];
  const el = document.createElement('div');
  el.className = 'terminal-line';
  el.innerHTML = `<span class="t-prompt">❯ </span><span style="color:${line.color}">${line.text}</span>`;
  terminalBody.appendChild(el);
  lineIndex++;
  setTimeout(addTerminalLine, 380);
}

// Start after slight delay
setTimeout(addTerminalLine, 600);

// ── SCROLL REVEAL ─────────────────────────────────────────
const revealElements = document.querySelectorAll('[data-reveal], .timeline-item, .project-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// ── SKILL BARS ANIMATION ──────────────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ── ACTIVE NAV HIGHLIGHT ──────────────────────────────────
const sections = document.querySelectorAll('section[id], div[id="top"]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = '';
        a.style.background = '';
      });
      const active = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (active) {
        active.style.color = 'var(--accent)';
        active.style.background = 'rgba(0,255,136,0.08)';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ── INCIDENT TOGGLE ───────────────────────────────────────
function toggleIncident(row) {
  const detail = row.querySelector('.inc-detail');
  const toggle = row.querySelector('.inc-toggle');
  const isOpen = row.classList.contains('open');
  // Close all
  document.querySelectorAll('.incident-row.open').forEach(r => {
    r.classList.remove('open');
    r.querySelector('.inc-detail').style.display = 'none';
  });
  // Open clicked if was closed
  if (!isOpen) {
    row.classList.add('open');
    detail.style.display = 'flex';
  }
}

// ── COPY YAML ─────────────────────────────────────────────
const copyBtn = document.getElementById('copyYaml');
const yamlCode = document.getElementById('yamlCode');
if (copyBtn && yamlCode) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard?.writeText(yamlCode.textContent).then(() => {
      copyBtn.textContent = '✓ Copied!';
      copyBtn.style.color = '#00ff88';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.style.color = '';
      }, 2200);
    });
  });
}

// ── NAVBAR SCROLL SHADOW ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });

// ── SMOOTH ANCHOR SCROLL WITH OFFSET ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 64; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
