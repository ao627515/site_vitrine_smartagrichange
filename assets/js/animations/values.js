// Animation de la section Values - By Az
// Animation au scroll avec intersection observer pour les performances

document.addEventListener('DOMContentLoaded', () => {
  // Vérification accessibilité
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.values .title, .values .sub-title, .values .item', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.values .title', { y: 40, opacity: 0 });
  gsap.set('.values .sub-title', { y: 30, opacity: 0 });
  gsap.set('.values .item', { y: 50, opacity: 0, scale: 0.9 });

  // Timeline pour la section values
  const valuesTL = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  // Séquence d'animation
  valuesTL
    .to('.values .title', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.2)"
    })

    .to('.values .sub-title', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power2.out"
    }, 0.2)

    .to('.values .item', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15, // Décalage entre chaque item
      ease: "back.out(1.1)"
    }, 0.4);

  // Intersection Observer pour déclencher l'animation au scroll
  const valuesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animation d'entrée
        valuesTL.play();
        valuesObserver.unobserve(entry.target); // Une seule fois
      }
    });
  }, {
    threshold: 0.2, // Déclenche quand 20% de la section est visible
    rootMargin: '0px 0px -50px 0px' // Déclenche un peu avant d'être complètement visible
  });

  // Observer la section values
  const valuesSection = document.querySelector('.values');
  if (valuesSection) {
    valuesObserver.observe(valuesSection);
  }

  // Micro-interactions sur les items au hover
  const items = document.querySelectorAll('.values .item');

  items.forEach(item => {
    // Animation hover
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });

      // Animation subtile de l'image
      const img = item.querySelector('img');
      if (img) {
        gsap.to(img, {
          scale: 1.1,
          rotation: 2,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      // Retour normal de l'image
      const img = item.querySelector('img');
      if (img) {
        gsap.to(img, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  });

  // Animation de "pulsation" subtile sur les icônes (optionnel)
  const createPulseAnimation = () => {
    items.forEach((item, index) => {
      const img = item.querySelector('img');
      if (img) {
        gsap.to(img, {
          scale: 1.02,
          duration: 2 + (index * 0.3), // Durées légèrement différentes
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
          delay: index * 0.5 // Décalage pour créer un effet de vague
        });
      }
    });
  };

  // Démarrer l'animation de pulsation après l'animation principale
  valuesTL.call(createPulseAnimation, null, null, 1.5);

  // Animation parallax légère sur les items au scroll
  let valuesParallaxTween;

  const handleValuesParallax = () => {
    if (!valuesSection) return;

    const rect = valuesSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const parallaxAmount = (scrollProgress - 0.5) * 20; // Mouvement subtil

      if (valuesParallaxTween) valuesParallaxTween.kill();

      valuesParallaxTween = gsap.to('.values .item', {
        y: parallaxAmount,
        duration: 0.3,
        ease: "none",
        stagger: 0.05
      });
    }
  };

  // Throttle du parallax
  let parallaxTimeout;
  window.addEventListener('scroll', () => {
    if (parallaxTimeout) clearTimeout(parallaxTimeout);
    parallaxTimeout = setTimeout(handleValuesParallax, 16);
  });

  // Animation de focus pour l'accessibilité (navigation au clavier)
  items.forEach(item => {
    item.setAttribute('tabindex', '0'); // Rend l'élément focusable

    item.addEventListener('focus', () => {
      gsap.to(item, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)" // Outline visible
      });
    });

    item.addEventListener('blur', () => {
      gsap.to(item, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        boxShadow: "none"
      });
    });
  });
});

// Fonction pour rejouer l'animation (utile pour les tests)
const replayValuesAnimation = () => {
  const valuesTL = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  gsap.set('.values .title', { y: 40, opacity: 0 });
  gsap.set('.values .sub-title', { y: 30, opacity: 0 });
  gsap.set('.values .item', { y: 50, opacity: 0, scale: 0.9 });

  valuesTL
    .to('.values .title', { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.2)" })
    .to('.values .sub-title', { y: 0, opacity: 1, duration: 0.7 }, 0.2)
    .to('.values .item', { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.1)" }, 0.4);
};