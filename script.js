/**
 * AHMED SHEHAB — PORTFOLIO INTERACTIVITY, SIDE PATH & STAGGERED REVEAL ANIMATIONS
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initSkillFilter();
  initProjectFilters();
  initProjectModals();
  initClipboardButtons();
  initSmoothScroll();
  initSideDataPath();
  initStaggeredScrollReveal();
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
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <span>Dark Mode</span>`;
    toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  } else {
    toggleBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <span>Light Mode</span>`;
    toggleBtn.setAttribute('aria-label', 'Switch to light mode');
  }
}

/* 2. Left Side-Path Illuminated Line Filling on Scroll */
function initSideDataPath() {
  const sideFill = document.getElementById('side-path-fill');
  const sideTrack = document.querySelector('.side-path-track');
  if (!sideFill) return;

  function updatePathFill() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;

    const trackHeight = sideTrack ? sideTrack.clientHeight : 0;
    sideFill.style.height = `${progress * trackHeight}px`;
  }

  window.addEventListener('scroll', updatePathFill, { passive: true });
  window.addEventListener('resize', updatePathFill);
  window.addEventListener('load', updatePathFill);
  updatePathFill();
}

/* 3. Staggered Scroll-Triggered Reveal Animations ("Nice on the Eyes") */
function initStaggeredScrollReveal() {
  // Add staggered animation classes to grid children automatically
  const grids = document.querySelectorAll('.pillars-grid, .skills-categories, .projects-grid, .edu-cert-grid, .contact-grid');
  
  grids.forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, index) => {
      child.classList.add('reveal-on-scroll');
      const delayClass = `reveal-delay-${(index % 4) + 1}`;
      child.classList.add(delayClass);
    });
  });

  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
    
    // Check if element is already in initial viewport on page load
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-visible');
    }
  });
}

/* 4. Mobile Navigation Menu */
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

/* 5. Dynamic Skill Tag Search / Filter */
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

/* 6. Project Filter Tabs */
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

/* 7. Project Details Modal */
function initProjectModals() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const triggers = document.querySelectorAll('.project-details-trigger');

  const projectDetails = {
    wesupport: `
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-blue);">WE Multilingual Support Ticket Automation Bot</h3>
      <p style="color: var(--accent-teal); font-weight: 600; margin-bottom: 1.25rem;">AI Engineering Repository (Telecom Egypt Internship) | MARBERTv2, mT5, PyTorch, Streamlit</p>
      
      <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <strong>Technical & Architectural Highlights:</strong>
        <ul style="list-style: disc; margin-left: 1.2rem; margin-top: 0.5rem; color: var(--text-secondary);">
          <li>Built a multilingual (English/Arabic/Franco-Arabic) customer support-ticket bot on a custom-generated dataset of ~3,000 synthetic tickets.</li>
          <li>Fine-tuned <strong>MARBERTv2</strong> to auto-route each ticket to the right department and flag customer sentiment.</li>
          <li>Fine-tuned <strong>mT5</strong> to generate a short summary for the customer support agent.</li>
          <li>Deployed as an interactive Streamlit dashboard supporting both single-ticket lookup and batch CSV file processing.</li>
        </ul>
      </div>
      <a href="https://github.com/Ahmed-Shehab-Source/Ai-Engineering-projects/tree/main/WE-support-ticket-bot" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 0.85rem;">View Repository Source →</a>
    `,
    wechatbot: `
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-blue);">Telecom Egypt RAG Customer Support Chatbot</h3>
      <p style="color: var(--accent-teal); font-weight: 600; margin-bottom: 1.25rem;">AI Engineering Repository (Telecom Egypt Internship) | RAG, Qdrant Vector DB, LLM Pipeline</p>
      
      <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <strong>Technical & Architectural Highlights:</strong>
        <ul style="list-style: disc; margin-left: 1.2rem; margin-top: 0.5rem; color: var(--text-secondary);">
          <li>Scraped and chunked official Telecom Egypt company web content.</li>
          <li>Embedded chunked vectors into a high-performance <strong>Qdrant vector store</strong>.</li>
          <li>Served bilingual (Arabic/English) answers grounded strictly in retrieved context via an LLM pipeline to eliminate hallucinations.</li>
          <li>Delivered real-time conversational assistance for customer queries with verified information grounding.</li>
        </ul>
      </div>
      <a href="https://github.com/Ahmed-Shehab-Source/Ai-Engineering-projects/tree/main/we-chatbot" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 0.85rem;">View Repository Source →</a>
    `,
    exology: `
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-blue);">Exology – AI Finance Recorder & Accounting Dashboard</h3>
      <p style="color: var(--accent-teal); font-weight: 600; margin-bottom: 1.25rem;">Competitive Hackathon Project | n8n, Gemini 2.5 Flash, Google Sheets, Telegram Bot API</p>
      
      <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <strong>Key Tech Highlights:</strong>
        <ul style="list-style: disc; margin-left: 1.2rem; margin-top: 0.5rem; color: var(--text-secondary);">
          <li>Designed and deployed a fully autonomous AI finance recording system for SMBs via Telegram, accepting text, voice, and photo inputs in Arabic and English — eliminating manual bookkeeping.</li>
          <li>Engineered three n8n workflows: real-time transaction recording with Gemini 2.5 Flash AI extraction, a nightly 30-day financial forecasting engine, and a weekly AI CFO health score report.</li>
          <li>Implemented multi-modal AI pipeline (text → JSON, voice .ogg → transcription, receipt photo → structured data) with data validation rules and confidence scoring before writing to Google Sheets.</li>
          <li>Built automated cash drought detection with proactive Telegram alerts when projected 30-day balance turns negative, using rolling 90-day averages for forecast projections.</li>
        </ul>
      </div>
      <a href="https://github.com/Ahmed-Shehab-Source" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 0.85rem;">View Project on GitHub →</a>
    `,
    olist: `
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-blue);">Olist Brazilian E-Commerce – BI Dashboard & Full Analytics Pipeline</h3>
      <p style="color: var(--accent-teal); font-weight: 600; margin-bottom: 1.25rem;">Academic Research Project | Python, Power BI, Scikit-learn, KMeans, Plotly, Pandas | 9 Datasets, 100K+ Orders</p>
      
      <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <strong>Key Tech Highlights:</strong>
        <ul style="list-style: disc; margin-left: 1.2rem; margin-top: 0.5rem; color: var(--text-secondary);">
          <li>Engineered an end-to-end preprocessing pipeline across 9 relational datasets (100K+ orders), resolving missing product dimensions via KNN imputation, deduplicating 1M+ geolocation records to a single ZIP-level median coordinate, and applying 99th-percentile winsorization to eliminate extreme price and freight outliers.</li>
          <li>Constructed a unified master analytical table by merging all 9 source tables on order and customer keys, engineering 10+ features including lead_time_days, delivery_delay_days, is_late flag, freight_ratio, and purchase hour/day-of-week signals to power both BI reporting and downstream segmentation.</li>
          <li>Segmented 96K+ customers into 4 value tiers (Champions, At-Risk, New, Dormant) using RFM and K-Means (k=4 selected via Elbow and Silhouette scoring), enabling targeted retention strategies estimated to recover 9% incremental revenue by shifting orders-per-customer from 1.01 to 1.10.</li>
          <li>Delivered a 4-page Power BI executive dashboard diagnosing a R$316K (26.76%) revenue shortfall across 5,673 orders, isolating a demand-side volume gap as the root cause despite 92.18% on-time delivery and 78.11% positive sentiment; backed by a 35-page strategic report with 9 prioritised recommendations including Boleto conversion optimisation projected to recover 2,000+ confirmed monthly orders.</li>
        </ul>
      </div>
      <a href="https://github.com/Ahmed-Shehab-Source" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 0.85rem;">View Project on GitHub →</a>
    `,
    fda: `
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-blue);">FDA Drug Adverse Event Reports (2015–2026) | Classification Modeling</h3>
      <p style="color: var(--accent-teal); font-weight: 600; margin-bottom: 1.25rem;">Academic Research Project | Python, Scikit-learn, XGBoost, LightGBM, SMOTE, FAERS Database</p>
      
      <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <strong>Key Tech Highlights:</strong>
        <ul style="list-style: disc; margin-left: 1.2rem; margin-top: 0.5rem; color: var(--text-secondary);">
          <li>Conducted a 14-step EDA audit on 528,000 pharmacovigilance records (FAERS 2015-2026), identifying and removing 7 target-leakage columns and 9,371 Death-flagged text entries that would have inflated model accuracy by ~10% while producing a clinically useless classifier.</li>
          <li>Developed 7 domain-specific clinical risk features capturing compounding fatality patterns absent from raw columns, including is_elderly_polypharmacy, is_high_risk_route (8 FDA IV/intraspinal/intracardiac codes), is_polypharmacy_high (6+ concurrent drugs), and reaction_drug_ratio as a systemic toxicity proxy.</li>
          <li>Built a production-grade preprocessing pipeline resolving 72% missing patient weight via strategic exclusion, reducing 10,446-category text columns via frequency encoding, and applying SMOTE to rebalance a 10.3% minority class, expanding the training set from ~475K to ~860K synthetic-augmented records.</li>
          <li>Benchmarked 5 classifiers (Logistic Regression baseline, Decision Tree, Random Forest, XGBoost, LightGBM); selected Random Forest as the production model for best Precision/Recall/F1 balance on fatality prediction, evaluated on an untouched real-distribution test set of ~105K records.</li>
        </ul>
      </div>
      <a href="https://github.com/Ahmed-Shehab-Source" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 0.85rem;">View Project on GitHub →</a>
    `,
    churn: `
      <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--accent-blue);">Customer Churn Analysis & Retention Strategy</h3>
      <p style="color: var(--accent-teal); font-weight: 600; margin-bottom: 1.25rem;">Self-Initiated Project | Python, Pandas, NumPy, Seaborn, Matplotlib, EDA, KPI Design</p>
      
      <div style="background: var(--bg-primary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 1.5rem;">
        <strong>Key Tech Highlights:</strong>
        <ul style="list-style: disc; margin-left: 1.2rem; margin-top: 0.5rem; color: var(--text-secondary);">
          <li>Cleaned, merged, and validated 3 multi-source datasets (customer records, support tickets, activity logs) across 1,000+ records, resolving inconsistent identifiers and missing engagement timestamps before any analysis.</li>
          <li>Identified an 18-point churn rate gap between free-tier (41%) and paid subscribers (23%) via EDA; engineered a custom 30-Day Zero-Activity Rate KPI that flagged at-risk users up to 30 days before cancellation, enabling proactive intervention windows.</li>
          <li>Translated findings into a strategic retention report recommending 3 high-impact initiatives including a free-to-paid conversion campaign targeting the 41% churning free-tier segment.</li>
        </ul>
      </div>
      <a href="https://github.com/Ahmed-Shehab-Source" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 0.85rem;">View Project on GitHub →</a>
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

/* 8. Copy to Clipboard Utility */
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

/* 9. Active Nav Scroll Indicator */
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
