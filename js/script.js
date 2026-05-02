// Dark mode toggle (icon swap handled by CSS, but ensure class toggles)
const toggle = document.getElementById('darkModeToggle');
if (toggle) {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
}

// Scroll to top button
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) scrollBtn.style.display = 'flex';
  else scrollBtn.style.display = 'none';
});
if (scrollBtn) scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Toast notification
function showToast(message, duration = 4000) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// Intersection Observer for fade-up
const fadeElements = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });
fadeElements.forEach(el => observer.observe(el));
function observeNewFadeElements() {
  document.querySelectorAll('.fade-up:not(.observed)').forEach(el => { observer.observe(el); el.classList.add('observed'); });
}

// Project data (full, as before)
const projectsData = [
  { id: 0, tag: "INDUSTRIAL CONSTRUCTION", title: "PepsiCo Beverage Manufacturing Facility Expansion", preview: "Leading project planning and execution support for a major PepsiCo facility, achieving 98% milestone compliance.", context: "Delivering industrial works within a live production environment for PepsiCo India Holdings.", actions: "Developed L1-L3 schedules for 30+ work packages and coordinated daily lookaheads with 20+ subcontractor teams.", results: "Reduced reporting turnaround time by 40% using standardized dashboards, saved approximately 3 weeks of potential slippage.", skills: ["Primavera P6","3-Tier Scheduling","Progress Monitoring"], metrics: ["98% milestone compliance","±5% variance","40% faster reporting"] },
  { id: 1, tag: "CAPEX DELIVERY", title: "UK-Wide Sterilization Plant Rollout (Revolution-ZERO)", preview: "Directed the end-to-end CAPEX delivery of £3M+ sterilization plant projects across the UK.", context: "Managing large-scale technical infrastructure projects in a high-compliance environment.", actions: "Led scope management, budgeting, and resource planning. Used AutoCAD for 2D layout coordination.", results: "Successfully delivered multiple plant projects by aligning site execution with technical deliverables.", skills: ["AutoCAD","CAPEX Project Delivery","KPI Tracking"], metrics: ["£3M+ CAPEX delivered","2 plants commissioned","100% traceability"] },
  { id: 2, tag: "DIGITAL TRANSFORMATION", title: "ERP Implementation & Digital Transformation", preview: "Orchestrated an ERP implementation roadmap that improved operational efficiency by 10% and identified $100,000 in annual savings.", context: "Analyzing business processes for Gray Fox Consulting.", actions: "Conducted deep-dive risk analysis, developed mitigation strategies.", results: "Shortened projected project timelines by 15%, reduced identified project risks by 30%.", skills: ["ERP Systems","Business Process Analysis","Risk Mitigation"], metrics: ["$100k annual savings","30% risk reduction","15% faster timeline"] },
  { id: 3, tag: "IT SERVICE MANAGEMENT", title: "NHS Large-Scale Email Migration Support", preview: "Provided critical technical support during a high-pressure enterprise email migration for the NHS.", context: "Supporting a major digital transformation activity for NHS Business Services Authority.", actions: "Managed service desk tickets, performed complex troubleshooting.", results: "Contributed to seamless service continuity and reliability.", skills: ["Azure","Exchange","Microsoft 365"], metrics: ["95% issue resolution","Enterprise migration","0 downtime"] },
  { id: 4, tag: "DIVERSITY & INCLUSION", title: "Institutional Diversity & Inclusion Initiatives", preview: "Developed and implemented strategic D&I initiatives at Northumbria University, leading to a 20% increase in student satisfaction.", context: "Collaborating with university stakeholders.", actions: "Planned and delivered strategic student-focused events, including co-organizing a TED Talk.", results: "Directly contributed to institutional improvements in student engagement.", skills: ["Stakeholder Management","Strategic Event Planning"], metrics: ["20% student satisfaction","TED Talk co-organizer","RAISE 2022 speaker"] },
  { id: 5, tag: "APPLIED RESEARCH", title: "Research: AI in Project Risk Management (MSc Dissertation)", preview: "Quantitative research study investigating how Artificial Intelligence can be leveraged to identify and mitigate risks.", context: "Completed as part of an MSc in Project Management at Northumbria University.", actions: "Conducted a quantitative study focused on AI applications for risk identification.", results: "Graduated with a 2:1 Commendation and a dissertation score of 65.", skills: ["Quantitative Research","AI Risk Identification"], metrics: ["Score 65","2:1 Commendation","Mixed-methods study"] }
];

function renderFeaturedProjects() {
  const container = document.getElementById('featuredProjectsGrid');
  if (!container) return;
  container.innerHTML = '';
  projectsData.slice(0, 3).forEach(proj => {
    const card = document.createElement('div');
    card.className = 'project-card fade-up';
    card.innerHTML = `<div class="project-tag">${proj.tag}</div><h3>${proj.title}</h3><p>${proj.preview}</p><div class="project-metrics">${proj.metrics.map(m => `<span>${m}</span>`).join('')}</div><div class="project-links"><a href="#" class="preview-link" data-id="${proj.id}">Preview →</a><a href="#" class="case-link" data-id="${proj.id}">Case study →</a></div>`;
    container.appendChild(card);
  });
  attachProjectLinkListeners();
  observeNewFadeElements();
}

function renderAllProjects() {
  const container = document.getElementById('projectsFullGrid');
  if (!container) return;
  container.innerHTML = '';
  projectsData.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'project-full-card fade-up';
    card.innerHTML = `<div class="project-tag">${proj.tag}</div><h3>${proj.title}</h3><p>${proj.preview}</p><div class="project-metrics">${proj.metrics.map(m => `<span>${m}</span>`).join('')}</div><div class="project-links"><a href="#" class="preview-link" data-id="${proj.id}">Preview →</a><a href="#" class="case-link" data-id="${proj.id}">Case study →</a></div>`;
    container.appendChild(card);
  });
  attachProjectLinkListeners();
  observeNewFadeElements();
}

function attachProjectLinkListeners() {
  document.querySelectorAll('.preview-link, .case-link').forEach(link => {
    link.removeEventListener('click', handleProjectLink);
    link.addEventListener('click', handleProjectLink);
  });
}

function handleProjectLink(e) {
  e.preventDefault();
  const id = parseInt(e.currentTarget.getAttribute('data-id'));
  const project = projectsData.find(p => p.id === id);
  if (!project) return;
  const isPreview = e.currentTarget.classList.contains('preview-link');
  showProjectModal(project, isPreview ? 'preview' : 'case');
}

function showProjectModal(project, type) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  if (!modal || !modalBody) return;
  if (type === 'preview') {
    modalBody.innerHTML = `<h3>${project.title}</h3><p>${project.preview}</p><h4>Key Metrics</h4><ul>${project.metrics.map(m => `<li>${m}</li>`).join('')}</ul><h4>Technical Skills</h4><div style="display:flex;flex-wrap:wrap;gap:8px;">${project.skills.map(s => `<span style="background:var(--surface);padding:4px 12px;border-radius:40px;">${s}</span>`).join('')}</div>`;
  } else {
    modalBody.innerHTML = `<h3>${project.title} – Case Study</h3><h4>Context</h4><p>${project.context}</p><h4>Actions</h4><p>${project.actions}</p><h4>Results</h4><p>${project.results}</p><h4>Technical Skills</h4><div style="display:flex;flex-wrap:wrap;gap:8px;">${project.skills.map(s => `<span style="background:var(--surface);padding:4px 12px;border-radius:40px;">${s}</span>`).join('')}</div>`;
  }
  modal.style.display = 'block';
  const closeSpan = modal.querySelector('.modal-close');
  if (closeSpan) closeSpan.onclick = () => modal.style.display = 'none';
  window.onclick = (event) => { if (event.target === modal) modal.style.display = 'none'; };
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
    btn.disabled = true;
    const formData = new FormData(contactForm);
    const email = document.getElementById('email')?.value;
    if (email) document.getElementById('replyto-field').value = email;
    try {
      const res = await fetch(contactForm.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
      if (res.ok) { showToast('Thank you! I will reply within 48 hours.'); contactForm.reset(); }
      else showToast('Something went wrong. Try again later.', 5000);
    } catch (err) { showToast('Network error. Please check your connection.', 5000); }
    finally { btn.innerHTML = original; btn.disabled = false; }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProjects();
  renderAllProjects();
  observeNewFadeElements();
});