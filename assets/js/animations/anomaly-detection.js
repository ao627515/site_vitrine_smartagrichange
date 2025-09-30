// Animation Anomaly Detection - Simplifiée & UX Optimisée - By Az

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.anomaly-detection .title, .anomaly-detection .sub-title, .anomaly-detection .description, .anomaly-detection img', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.anomaly-detection .title', { y: 40, opacity: 0 });
  gsap.set('.anomaly-detection .sub-title', { y: 30, opacity: 0 });
  gsap.set('.anomaly-detection .description', { y: 25, opacity: 0 });
  gsap.set('.anomaly-detection img', { x: 50, opacity: 0, scale: 0.95 });

  // Timeline principale
  const anomalyTL = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out", duration: 0.7 }
  });

  anomalyTL
    .to('.anomaly-detection .title', { y: 0, opacity: 1 })
    .to('.anomaly-detection .sub-title', { y: 0, opacity: 1 }, 0.2)
    .to('.anomaly-detection .description', { y: 0, opacity: 1 }, 0.4)
    .to('.anomaly-detection img', { x: 0, opacity: 1, scale: 1 }, 0.3);

  // Observer pour déclencher l'animation
  const anomalySection = document.querySelector('.anomaly-detection');
  if (anomalySection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anomalyTL.play();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

    observer.observe(anomalySection);
  }

  // Micro-interactions simples
  const contentContainer = document.querySelector('.anomaly-detection .content-container');
  const image = document.querySelector('.anomaly-detection img');

  [contentContainer, image].forEach(el => {
    if (!el) return;

    el.addEventListener('mouseenter', () => gsap.to(el, { scale: 1.03, duration: 0.3 }));
    el.addEventListener('mouseleave', () => gsap.to(el, { scale: 1, duration: 0.3 }));

    // Accessibilité
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'region');
  });
});
