// Animation Sensor - Simplifiée & Responsive - By Az
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    gsap.set('.sensor-title, .sensor-subtitle, .sensor-feature, .sensor-image, .price-label, .price-value, .price-action', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.sensor-title', { y: 40, opacity: 0 });
  gsap.set('.sensor-subtitle', { y: 30, opacity: 0 });
  gsap.set('.sensor-feature', { opacity: 0, y: 20, scale: 0.95 });
  gsap.set('.sensor-image', { opacity: 0, scale: 0.9 });
  gsap.set('.price-label', { y: 30, opacity: 0 });
  gsap.set('.price-value', { scale: 0.8, opacity: 0 });
  gsap.set('.price-action', { y: 20, opacity: 0 });

  // Timeline principale
  const masterTL = gsap.timeline({ paused: true, defaults: { duration: 0.7, ease: "power2.out" } });

  masterTL
    // Header
    .to('.sensor-title', { y: 0, opacity: 1 })
    .to('.sensor-subtitle', { y: 0, opacity: 1 }, "-=0.5")

    // Body
    .to('.sensor-image', { opacity: 1, scale: 1, duration: 1 }, "-=0.3")
    .to('.sensor-feature', { opacity: 1, y: 0, scale: 1, stagger: 0.15 }, "-=0.7")

    // Price
    .to('.price-label', { y: 0, opacity: 1 }, "-=0.4")
    .to('.price-value', { scale: 1, opacity: 1 }, "-=0.5")
    .to('.price-action', { y: 0, opacity: 1 }, "-=0.4");

  // Intersection Observer responsive-friendly
  const sensorSection = document.querySelector('.sensor');
  if (sensorSection) {
    const isSmallScreen = window.innerWidth < 992;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting || isSmallScreen) { // déclenchement direct sur petits écrans
          masterTL.play();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: isSmallScreen ? 0.1 : 0.3, // plus sensible sur petits écrans
      rootMargin: '0px'
    });

    observer.observe(sensorSection);
  }


  // Hover simple sur les features
  document.querySelectorAll('.sensor-feature').forEach(feature => {
    feature.addEventListener('mouseenter', () => gsap.to(feature, { scale: 1.05, y: -5, duration: 0.3 }));
    feature.addEventListener('mouseleave', () => gsap.to(feature, { scale: 1, y: 0, duration: 0.3 }));
  });

  // Hover simple sur l'image du sensor
  const sensorImage = document.querySelector('.sensor-image');
  if (sensorImage) {
    sensorImage.addEventListener('mouseenter', () => gsap.to(sensorImage, { scale: 1.05, duration: 0.3 }));
    sensorImage.addEventListener('mouseleave', () => gsap.to(sensorImage, { scale: 1, duration: 0.3 }));
  }

  // Hover simple sur l'action prix
  const priceAction = document.querySelector('.price-action');
  if (priceAction) {
    priceAction.addEventListener('mouseenter', () => gsap.to(priceAction, { scale: 1.05, duration: 0.3 }));
    priceAction.addEventListener('mouseleave', () => gsap.to(priceAction, { scale: 1, duration: 0.3 }));
  }

  // Animation compteur prix
  const priceValue = document.querySelector('.price-value');
  if (priceValue) {
    masterTL.call(() => {
      const finalPrice = 20000;
      const counter = { value: 0 };
      gsap.to(counter, {
        value: finalPrice,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => priceValue.textContent = `${Math.round(counter.value).toLocaleString()} XOF`
      });
    }, null, null, "-=0.5");
  }
});
