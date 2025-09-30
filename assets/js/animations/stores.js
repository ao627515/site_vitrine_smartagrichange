// Animation Stores - Responsive & UX Optimisée - By Az
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.stores p, .stores .stores-container img, .stores .app-image', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.stores p', { y: 30, opacity: 0 });
  gsap.set('.stores .stores-container img', { y: 40, opacity: 0, scale: 0.9 });

  const appImage = document.querySelector('.stores .app-image');
  if (appImage) {
    // Déterminer scale initial selon largeur écran
    let initialScale = 1.5;
    const screenWidth = window.innerWidth;
    if (screenWidth <= 575.98) initialScale = 0.75;
    else if (screenWidth <= 991.98) initialScale = 1;

    gsap.set(appImage, { x: 50, opacity: 0, scale: initialScale });
  }

  // Timeline principale
  const storesTL = gsap.timeline({ paused: true, defaults: { ease: "power2.out", duration: 0.7 } });

  storesTL
    .to('.stores p', { y: 0, opacity: 1 })
    .to('.stores .stores-container img', { y: 0, opacity: 1, scale: 1, stagger: 0.15 }, 0.3)
    .to(appImage, {
      x: 0,
      opacity: 1,
      scale: (() => {
        if (window.innerWidth <= 575.98) return 0.75;
        if (window.innerWidth <= 991.98) return 1;
        return 1.5;
      })()
    }, 0.5);

  // Intersection Observer
  const storesSection = document.querySelector('.stores');
  if (storesSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          storesTL.play();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

    observer.observe(storesSection);
  }

  // Micro-interactions boutons stores
  const storeButtons = document.querySelectorAll('.stores .stores-container img');
  storeButtons.forEach(button => {
    if (!button) return;
    button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.1, y: -3, duration: 0.3 }));
    button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, y: 0, duration: 0.3 }));

    // Accessibilité
    button.setAttribute('tabindex', '0');
    button.setAttribute('role', 'button');
    button.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Micro-interaction app preview responsive
  if (appImage) {
    const hoverScale = (() => {
      if (window.innerWidth <= 575.98) return 0.85;
      if (window.innerWidth <= 991.98) return 1.1;
      return 1.55;
    })();

    appImage.addEventListener('mouseenter', () => gsap.to(appImage, { scale: hoverScale, duration: 0.3 }));
    appImage.addEventListener('mouseleave', () => {
      let baseScale = (() => {
        if (window.innerWidth <= 575.98) return 0.75;
        if (window.innerWidth <= 991.98) return 1;
        return 1.5;
      })();
      gsap.to(appImage, { scale: baseScale, duration: 0.3 });
    });
  }

  // Adapter au resize pour garder cohérence
  window.addEventListener('resize', () => {
    if (!appImage) return;
    let baseScale = (() => {
      if (window.innerWidth <= 575.98) return 0.75;
      if (window.innerWidth <= 991.98) return 1;
      return 1.5;
    })();
    gsap.set(appImage, { scale: baseScale });
  });
});
