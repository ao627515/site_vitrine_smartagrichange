// Animation Soil Analysis - Simplifiée & UX Optimisée - By Az

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.soil-analysis .title, .soil-analysis .description, .soil-analysis .step', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.soil-analysis .title', { y: 40, opacity: 0 });
  gsap.set('.soil-analysis .description', { y: 30, opacity: 0 });
  gsap.set('.soil-analysis .step', { y: 50, opacity: 0 });
  gsap.set('.soil-analysis .number', { scale: 0, opacity: 0 });
  gsap.set('.soil-analysis .illustration', { scale: 0.85, opacity: 0 });

  // Timeline principale
  const soilTL = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out", duration: 0.7 }
  });

  soilTL
    .to('.soil-analysis .title', { y: 0, opacity: 1 })
    .to('.soil-analysis .description', { y: 0, opacity: 1 }, 0.2)
    .to('.soil-analysis .step', {
      y: 0,
      opacity: 1,
      stagger: 0.25
    }, 0.4)
    .to('.soil-analysis .number', {
      scale: 1,
      opacity: 1,
      stagger: 0.25,
      ease: "back.out(1.7)"
    }, 0.6)
    .to('.soil-analysis .illustration', {
      scale: 1,
      opacity: 1,
      stagger: 0.25
    }, 0.6);

  // Observer pour déclencher l'animation
  const soilSection = document.querySelector('.soil-analysis');
  if (soilSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          soilTL.play();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    observer.observe(soilSection);
  }

  // Micro-interactions simples
  const steps = document.querySelectorAll('.soil-analysis .step');
  steps.forEach(step => {
    const number = step.querySelector('.number');
    const illustration = step.querySelector('.illustration');

    step.addEventListener('mouseenter', () => {
      gsap.to(step, { scale: 1.02, duration: 0.3 });
      gsap.to(number, { scale: 1.1, duration: 0.3 });
      gsap.to(illustration, { scale: 1.05, duration: 0.4 });
    });

    step.addEventListener('mouseleave', () => {
      gsap.to([step, number, illustration], { scale: 1, duration: 0.3 });
    });

    // Accessibilité
    step.setAttribute('tabindex', '0');
    step.setAttribute('role', 'article');
  });
});
