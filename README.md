# Ahmed Shehab — Data Analyst & Business Intelligence Portfolio

A clean, modern, executive portfolio website tailored for **Ahmed Shehab** (Data Analyst / Business Intelligence Specialist). Built with vanilla HTML5, modern CSS3 (custom design system, dark slate theme), and modular JavaScript.

## 🚀 Features
- **Executive Dark/Light Mode**: Smooth theme toggling with preferred system scheme persistence.
- **Dynamic Metrics & Case Studies**: Showcases key project achievements, business metrics (EGP 743K+ recoverable revenue, 100K+ orders), and technical stack details.
- **Interactive Competency Search**: Live search & filter across technical skills (Python, SQL, RAG, Power BI, Streamlit, etc.).
- **Categorized Project Filtering**: Filter projects by BI & Dashboards, Machine Learning & Analytics, or AI & Automation.
- **GitHub Pages Ready**: Zero build steps required; instant deployment via standard GitHub Pages or GitHub CLI.

## 📂 Project Structure
```text
portfol_anti_proj/
├── index.html        # Main HTML structure and content from CV
├── styles.css        # Custom CSS variables, dark slate design system & responsive layout
├── script.js        # Dynamic theme toggle, skill filter, project modals & clipboard support
├── assets/           # Media assets (hero_bg.jpg)
├── README.md         # Documentation
└── .gitignore        # Git ignore rules
```

## 🛠️ GitHub CLI Deployment Steps
1. Authenticate GitHub CLI: `gh auth login`
2. Create repository: `gh repo create portfol_anti_proj --public --source=. --remote=origin --push`
3. Deploy to GitHub Pages: `gh repo edit --enable-wiki=false` or enable Pages from repository settings!
