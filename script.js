/**
 * AHMED SHEHAB — PORTFOLIO INTERACTIVITY & DYNAMIC CONTROLS
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initSkillFilter();
  initProjectFilters();
  initProjectModals();
  initClipboardButtons();
  initSmoothScroll();
});

/* 1. Theme Toggle (Dark/Light) */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'dark');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  if (theme === 'light') {
    toggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
    toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  } else {
    toggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
    toggleBtn.setAttribute('aria-label', 'Switch to light mode');
  }
}

/* 2. Mobile Navigation Menu */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* 3. Dynamic Skill Tag Search / Filter */
function initSkillFilter() {
  const searchInput = document.getElementById('skills-search');
  const skillTags = document.querySelectorAll('.skill-tag');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    skillTags.forEach(tag => {
      const text = tag.textContent.toLowerCase();
      if (text.includes(term)) {
        tag.style.display = 'inline-block';
        tag.style.opacity = '1';
      } else {
        tag.style.display = 'none';
        tag.style.opacity = '0';
      }
    });

    // Hide empty cards if all tags inside are hidden
    skillCards.forEach(card => {
      const visibleTags = card.querySelectorAll('.skill-tag[style*="display: inline-block"], .skill-tag:not([style*="display: none"])');
      if (term !== '' && visibleTags.length === 0) {
        card.style.opacity = '0.3';
      } else {
        card.style.opacity = '1';
      }
    });
  });
}

/* 4. Project Filter Tabs */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory.includes(category)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* 5. Project Details Modal */
function initProjectModals() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const triggers = document.querySelectorAll('.project-details-trigger');

  const projectDetails = {
    exology: `
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-blue);">Exology – AI Finance Recorder & Accounting Dashboard</h3>
      <p style="color: var(--accent-teal); font-weight: 600; margin-bottom: 1.25rem;">Competitive Hackathon Project | n8n, Gemini 2.5 Flash, Google Sheets, Telegram Bot API</p>
      
      <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <strong>Key Tech Highlights:</strong>
        <ul style="list-style: disc; margin-left: 1.2rem; margin-top: 0.5rem; color: var(--text-secondary);">
          <li>Autonomous AI finance recording system for SMBs via Telegram accepting text, voice (.ogg), and photo inputs in English & Arabic.</li>
          <li>Engineered 3 distinct n8n workflows: real-time transaction recording with Gemini 2.5 Flash, nightly 30-day financial forecasting, and a weekly AI CFO health score report.</li>
          <li>Multi-modal AI pipeline: text → JSON, voice → transcription, receipt photo → structured data with validation rules and confidence scoring.</li>
          <li>Automated cash drought detection with proactive Telegram alerts using rolling 90-day averages.</li>
        </ul>
      </div>
    `,
    olist: `
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-blue);">Olist Brazilian E-Commerce – BI Dashboard & Full Analytics Pipeline</h3>
      <p style="color: var(--accent-teal); font-weight: 600; margin-bottom: 1.25rem;">Academic Research Project | Python, Power BI, Scikit-learn, KMeans, Plotly, Pandas</p>
      
      <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <strong>Key Tech Highlights:</strong>
        <ul style="list-style: disc; margin-left: 1.2rem; margin-top: 0.5rem; color: var(--text-secondary);">
          <li>End-to-end preprocessing across 9 relational datasets (100K+ orders), applying KNN imputation, ZIP-level geolocation median deduplication, and 99th-percentile winsorization.</li>
          <li>Unified master analytical table with 10+ engineered features (lead_time_days, delivery_delay_days, is_late, freight_ratio).</li>
          <li>Segmented 96K+ customers into 4 value tiers (Champions, At-Risk, New, Dormant) using RFM & K-Means (k=4 via Elbow & Silhouette scoring).</li>
          <li>4-page Power BI executive dashboard diagnosing a R$316K (26.76%) revenue shortfall, backed by a 35-page strategic report with 9 prioritized recommendations.</li>
        </ul>
      </div>
    `,
    fda: `
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-blue);">FDA Drug Adverse Event Reports (2015–2026) | Classification Modeling</h3>
      <p style="color: var(--accent-teal); font-weight: 600; margin-bottom: 1.25rem;">Academic Research Project | Python, Scikit-learn, XGBoost, LightGBM, SMOTE, FAERS Database</p>
      
      <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <strong>Key Tech Highlights:</strong>
        <ul style="list-style: disc; margin-left: 1.2rem; margin-top: 0.5rem; color: var(--text-secondary);">
          <li>14-step EDA audit on 528,000 pharmacovigilance records, eliminating 7 target-leakage columns and 9,371 Death-flagged text entries.</li>
          <li>Developed 7 clinical risk features (is_elderly_polypharmacy, is_high_risk_route, reaction_drug_ratio).</li>
          <li>SMOTE preprocessing expanding training set from ~475K to ~860K synthetic-augmented records.</li>
          <li>Benchmarked 5 classifiers (Random Forest selected as production model for best Precision/Recall/F1 balance on ~105K untouched test records).</li>
        </ul>
      </div>
    `,
    churn: `
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-blue);">Customer Churn Analysis & Retention Strategy</h3>
      <p style="color: var(--accent-teal); font-weight: 600; margin-bottom: 1.25rem;">Self-Initiated Project | Python, Pandas, NumPy, Seaborn, Matplotlib, EDA, KPI Design</p>
      
      <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <strong>Key Tech Highlights:</strong>
        <ul style="list-style: disc; margin-left: 1.2rem; margin-top: 0.5rem; color: var(--text-secondary);">
          <li>Merged and validated 3 multi-source datasets (customer records, support tickets, activity logs) across 1,000+ records.</li>
          <li>Identified an 18-point churn rate gap between free-tier (41%) and paid subscribers (23%).</li>
          <li>Engineered a custom '30-Day Zero Activity Rate' KPI flagging at-risk users up to 30 days before cancellation.</li>
          <li>Strategic retention report with 3 high-impact initiatives targeting free-to-paid conversion.</li>
        </ul>
      </div>
    `
  };

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      if (projectDetails[key]) {
        modalBody.innerHTML = projectDetails[key];
        modalBackdrop.classList.add('open');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => modalBackdrop.classList.remove('open'));
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('open');
    });
  }
}

/* 6. Copy to Clipboard Utility */
function initClipboardButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span style="color: var(--accent-teal);">Copied!</span>`;
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
      });
    });
  });
}

/* 7. Active Nav Scroll Indicator */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
