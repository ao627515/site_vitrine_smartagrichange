// Animation Objective - Simplifiée by Az
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.objective');
  if (!section) return;

  // Accessibilité : animations désactivées si motion réduite
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    gsap.set('.objective .icon, .objective .title, .objective .item, .objective .number, .objective .label', { opacity: 1, y: 0, x: 0, scale: 1 });
    return;
  }

  // États initiaux
  gsap.set('.objective .icon', { scale: 0, rotation: -180, opacity: 0 });
  gsap.set('.objective .title', { y: 30, opacity: 0 });
  gsap.set('.objective .item', { scale: 0.9, opacity: 0 });
  gsap.set('.objective .number', { x: 40, opacity: 0 });
  gsap.set('.objective .label', { y: 20, opacity: 0 });

  // Timeline d'entrée
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out", duration: 0.7 } });
  tl.to('.objective .icon', { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
    .to('.objective .title', { y: 0, opacity: 1 }, 0.2)
    .to('.objective .item', { scale: 1, opacity: 1, stagger: 0.15 }, 0.4)
    .to('.objective .number', { x: 0, opacity: 1, stagger: 0.1 }, 0.8)
    .to('.objective .label', { y: 0, opacity: 1, stagger: 0.1 }, 0.9);

  // Observer pour déclencher l’animation à l’apparition
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tl.play();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(section);

  // Micro-interactions hover/focus sur chaque item
  document.querySelectorAll('.objective .item').forEach((item, index) => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Objectif ${index + 1}`);

    item.addEventListener('mouseenter', () => {
      gsap.to(item, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
    item.addEventListener('focus', () => {
      gsap.to(item, { scale: 1.05, boxShadow: '0 0 0 3px rgba(59,130,246,0.5)', duration: 0.3 });
    });
    item.addEventListener('blur', () => {
      gsap.to(item, { scale: 1, boxShadow: 'none', duration: 0.3 });
    });
  });
});
