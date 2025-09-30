// Animation Our Solution - By Az (version simplifiée & élégante)
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    gsap.set('.our-solution .title, .our-solution .sup-title, .our-solution .feature', { opacity: 1, y: 0 });
    return;
  }

  // États initiaux
  gsap.set('.our-solution .overlay', { opacity: 0 });
  gsap.set('.our-solution .title, .our-solution .sup-title', { y: 40, opacity: 0 });
  gsap.set('.our-solution .feature', { y: 60, opacity: 0 });

  // Timeline principale
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.out", duration: 0.8 }
  });

  tl.to('.our-solution .overlay', { opacity: 1, duration: 0.5 })
    .to('.our-solution .title', { y: 0, opacity: 1 }, 0.2)
    .to('.our-solution .sup-title', { y: 0, opacity: 1 }, 0.4)
    .to('.our-solution .feature', { y: 0, opacity: 1, stagger: 0.2 }, 0.6);

  // Intersection Observer → joue l’anim quand visible
  const section = document.querySelector('.our-solution');
  if (section) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tl.play();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(section);
  }

  // Parallax discret
  let raf;
  const handleParallax = () => {
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      gsap.to(section, {
        backgroundPositionY: `calc(50% + ${(progress - 0.5) * 20}px)`,
        duration: 0.3,
        ease: "none"
      });
    }
  };

  window.addEventListener('scroll', () => {
    if (!raf) {
      raf = requestAnimationFrame(() => {
        handleParallax();
        raf = null;
      });
    }
  }, { passive: true });
});
