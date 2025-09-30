document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    gsap.set('.plans-title, .plans-tabs, .plan-card', { opacity: 1 });
    return;
  }

  const plansSection = document.querySelector('.plans');
  const planCards = document.querySelectorAll('.plan-card');
  const tabButtons = document.querySelectorAll('.tab-btn');

  // États initiaux
  gsap.set('.plans-title', { y: 40, opacity: 0 });
  gsap.set('.plans-tabs', { y: 30, opacity: 0 });
  gsap.set(planCards, { y: 60, opacity: 0, scale: 0.95, rotationY: 5 });

  // Timeline principale
  const plansTL = gsap.timeline({ paused: true, defaults: { ease: "power2.out", duration: 0.8 } });

  plansTL
    .to('.plans-title', { y: 0, opacity: 1, duration: 0.7 })
    .to('.plans-tabs', { y: 0, opacity: 1, duration: 0.6 }, 0.2)
    .to(planCards, { y: 0, opacity: 1, scale: 1, rotationY: 0, stagger: 0.15, ease: "back.out(1.1)" }, 0.4);

  // IntersectionObserver responsive
  const isSmallScreen = window.innerWidth < 992;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting || isSmallScreen) {
        plansTL.play();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: isSmallScreen ? 0.1 : 0.2, rootMargin: '0px' });

  if (plansSection) observer.observe(plansSection);

  // Onglets interactifs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const period = btn.dataset.plan;
      tabButtons.forEach(b => {
        gsap.to(b, { scale: b === btn ? 1.05 : 1, duration: 0.3 });
        b.classList.remove('active');
      });
      btn.classList.add('active');
      updatePrices(period);
      updatePeriods(period);
    });

    // Hover
    btn.addEventListener('mouseenter', () => {
      if (!btn.classList.contains('active')) gsap.to(btn, { scale: 1.05, backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)', duration: 0.3 });
    });
    btn.addEventListener('mouseleave', () => {
      if (!btn.classList.contains('active')) gsap.to(btn, { scale: 1, backgroundColor: 'var(--color-bg)', duration: 0.3 });
    });
  });

  function updatePrices(period) {
    document.querySelectorAll('.plan-price').forEach(priceEl => {
      const price = priceEl.dataset[period + 'Price'] || priceEl.dataset.monthlyPrice;
      gsap.to(priceEl, {
        scale: 1.1, duration: 0.2, onComplete: () => {
          priceEl.textContent = price;
          gsap.to(priceEl, { scale: 1, duration: 0.2 });
        }
      });
    });
  }

  function updatePeriods(period) {
    const textMap = { weekly: '/ semaine', monthly: '/ mois', yearly: '/ an' };
    document.querySelectorAll('.plan-period').forEach(periodEl => {
      gsap.to(periodEl, {
        opacity: 0, duration: 0.2, onComplete: () => {
          periodEl.textContent = textMap[period] || '/ mois';
          gsap.to(periodEl, { opacity: 1, duration: 0.2 });
        }
      });
    });
  }

  // Hover micro-interactions sur les cartes
  planCards.forEach(card => {
    const planBtn = card.querySelector('.plan-btn');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');

    card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.03, y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)', duration: 0.4 }));
    card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1, y: 0, boxShadow: '0 10px 20px rgba(0,0,0,0.1)', duration: 0.4 }));

    if (planBtn) {
      planBtn.addEventListener('mouseenter', () => gsap.to(planBtn, { scale: 1.05, y: -2, duration: 0.3 }));
      planBtn.addEventListener('mouseleave', () => gsap.to(planBtn, { scale: 1, y: 0, duration: 0.3 }));
      planBtn.addEventListener('click', () => gsap.to(planBtn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }));
    }
  });

  // Animation de scroll simple (parallax léger et reveal features)
  let scrollRAF;
  window.addEventListener('scroll', () => {
    if (scrollRAF) return;
    scrollRAF = requestAnimationFrame(() => {
      const rect = plansSection.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      planCards.forEach((card, i) => gsap.to(card, { y: scrollProgress * (i - 1) * 3, duration: 0.3, ease: "none" }));
      scrollRAF = null;
    });
  }, { passive: true });
});
