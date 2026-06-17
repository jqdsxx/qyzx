/* ===== Global JS ===== */

// Mobile Menu
function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  if (drawer) drawer.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
  document.body.style.overflow = drawer?.classList.contains('open') ? 'hidden' : '';
}

// Carousel
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  const slides = carousel.querySelector('.carousel-slides');
  const dots = carousel.querySelectorAll('.carousel-dots .dot');
  const prevBtn = carousel.querySelector('.arrow-prev');
  const nextBtn = carousel.querySelector('.arrow-next');
  let current = 0;
  const total = dots.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    slides.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  setInterval(() => goTo(current + 1), 5000);
}

// Search
function handleSearch(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const keyword = input?.value.trim();
  if (keyword) {
    window.location.href = `search.html?q=${encodeURIComponent(keyword)}`;
  }
}

// Tabs
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const items = tabGroup.querySelectorAll('.tab-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(t => t.classList.remove('active'));
        item.classList.add('active');
        const target = item.dataset.tab;
        const panels = tabGroup.parentElement.querySelectorAll('.tab-panel');
        panels.forEach(p => p.classList.toggle('hidden', p.id !== target));
      });
    });
  });
}

// Like/Collect toggle
function toggleAction(btn) {
  btn.classList.toggle('liked');
  const icon = btn.querySelector('.count');
  if (icon) {
    let num = parseInt(icon.textContent) || 0;
    num = btn.classList.contains('liked') ? num + 1 : num - 1;
    icon.textContent = num;
  }
}

// Back to top
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('hidden', window.scrollY < 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Read URL params
function getUrlParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// Format date
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initTabs();
  initBackToTop();

  // Search form
  document.querySelectorAll('.search-form').forEach(form => {
    form.addEventListener('submit', handleSearch);
  });

  // Fill search input from URL
  const q = getUrlParam('q');
  if (q) {
    document.querySelectorAll('.search-input-from-url').forEach(input => {
      input.value = q;
    });
  }
});
