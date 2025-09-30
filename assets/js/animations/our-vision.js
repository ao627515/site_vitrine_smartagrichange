// Animation Our Vision - Version simplifiée by Az
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.our-vision');
  if (!section) return;

  // Accessibilité : désactive les animations si l’utilisateur préfère réduire
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    gsap.set('.our-vision .title, .our-vision .sub-title, .our-vision .overlay', { opacity: 1, y: 0 });
    return;
  }

  // État initial
  gsap.set('.our-vision .overlay', { opacity: 0 });
  gsap.set('.our-vision .title', { y: 30, opacity: 0 });
  gsap.set('.our-vision .sub-title', { y: 40, opacity: 0 });

  // Timeline d’entrée
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out", duration: 0.8 } });
  tl.to('.our-vision .overlay', { opacity: 1 })
    .to('.our-vision .title', { y: 0, opacity: 1 }, 0.2)
    .to('.our-vision .sub-title', { y: 0, opacity: 1 }, 0.4);

  // Déclenchement à l’apparition
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tl.play();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(section);

  // Parallax léger sur le scroll
  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset = (progress - 0.5) * 40; // ajuster la force du parallax
      gsap.to(section, { backgroundPositionY: `calc(50% + ${offset}px)`, duration: 0.3, ease: "none" });
    }
  };

  window.addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
});
