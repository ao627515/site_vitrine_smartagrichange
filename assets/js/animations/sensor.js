// Animation de la section Sensor - By Az
// Animation orchestrée pour product showcase avec features et pricing

document.addEventListener('DOMContentLoaded', () => {
  // Vérification accessibilité
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.sensor-title, .sensor-subtitle, .sensor-feature, .sensor-image, .price-label, .price-value, .price-action', { opacity: 1 });
    return;
  }

  // États initiaux - Header
  gsap.set('.sensor-title', { y: 40, opacity: 0 });
  gsap.set('.sensor-subtitle', { y: 30, opacity: 0 });

  // États initiaux - Body
  gsap.set('.left-features .sensor-feature', { x: -60, opacity: 0, scale: 0.9 });
  gsap.set('.right-features .sensor-feature', { x: 60, opacity: 0, scale: 0.9 });
  gsap.set('.sensor-image', {
    scale: 0.8,
    opacity: 0,
    rotationY: 10
  });

  // États initiaux - Price
  gsap.set('.price-label', { y: 30, opacity: 0 });
  gsap.set('.price-value', { scale: 0, opacity: 0 });
  gsap.set('.price-action', { y: 20, opacity: 0 });

  // Timeline pour le header
  const headerTL = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  headerTL
    .to('.sensor-title', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out"
    })
    .to('.sensor-subtitle', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, 0.2);

  // Timeline pour le body (sensor showcase)
  const bodyTL = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  bodyTL
    // Animation du capteur central
    .to('.sensor-image', {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      duration: 1,
      ease: "back.out(1.2)"
    })

    // Animation des features de gauche
    .to('.left-features .sensor-feature', {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.1)"
    }, 0.3)

    // Animation des features de droite
    .to('.right-features .sensor-feature', {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.1)"
    }, 0.4);

  // Timeline pour le pricing
  const priceTL = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  priceTL
    .to('.price-label', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })
    .to('.price-value', {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, 0.2)
    .to('.price-action', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, 0.4);

  // Intersection Observers pour chaque section
  const createObserver = (selector, timeline, threshold = 0.3) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timeline.play();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: threshold,
      rootMargin: '0px 0px -50px 0px'
    });

    const element = document.querySelector(selector);
    if (element) observer.observe(element);
  };

  // Créer les observers
  createObserver('.sensor-header', headerTL);
  createObserver('.sensor-body', bodyTL);
  createObserver('.sensor-price', priceTL);

  // Micro-interactions sur les features
  const features = document.querySelectorAll('.sensor-feature');

  features.forEach((feature, index) => {
    const icon = feature.querySelector('.feature-icon');
    const name = feature.querySelector('.feature-name');

    // Animation hover sophistiquée
    feature.addEventListener('mouseenter', () => {
      gsap.to(feature, {
        scale: 1.05,
        y: -5,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        duration: 0.3,
        ease: "power2.out"
      });

      // Animation de l'icône
      gsap.to(icon, {
        scale: 1.2,
        rotation: 5,
        duration: 0.3,
        ease: "back.out(1.2)"
      });

      // Animation du nom
      gsap.to(name, {
        color: 'var(--color-primary)',
        y: -2,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    feature.addEventListener('mouseleave', () => {
      gsap.to(feature, {
        scale: 1,
        y: 0,
        boxShadow: '0 0 0px rgba(0, 0, 0, 0)',
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(name, {
        color: 'var(--color-text)',
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    // Accessibilité
    feature.setAttribute('tabindex', '0');
    feature.setAttribute('role', 'article');
    feature.setAttribute('aria-label', `Fonctionnalité: ${name?.textContent}`);

    feature.addEventListener('focus', () => {
      gsap.to(feature, {
        scale: 1.05,
        outline: '3px solid rgba(59, 130, 246, 0.5)',
        outlineOffset: '4px',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    feature.addEventListener('blur', () => {
      gsap.to(feature, {
        scale: 1,
        outline: 'none',
        outlineOffset: '0px',
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Animation sophistiquée du capteur central
  const sensorImage = document.querySelector('.sensor-image');

  if (sensorImage) {
    // Animation hover avec effet 3D
    sensorImage.addEventListener('mouseenter', () => {
      gsap.to(sensorImage, {
        scale: 1.1,
        rotationY: -5,
        rotationX: 2,
        filter: 'brightness(110%) contrast(105%)',
        duration: 0.4,
        ease: "power2.out"
      });
    });

    sensorImage.addEventListener('mouseleave', () => {
      gsap.to(sensorImage, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        filter: 'brightness(100%) contrast(100%)',
        duration: 0.4,
        ease: "power2.out"
      });
    });

    // Animation de "floating" subtile
    const createSensorFloating = () => {
      gsap.to(sensorImage, {
        y: -8,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });

      gsap.to(sensorImage, {
        rotationZ: 1,
        duration: 4.5,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });
    };

    // Démarrer le floating après l'animation principale
    bodyTL.call(createSensorFloating, null, null, 1.5);
  }

  // Micro-interactions sur le pricing
  const priceAction = document.querySelector('.price-action');
  const priceValue = document.querySelector('.price-value');

  if (priceAction) {
    priceAction.addEventListener('mouseenter', () => {
      gsap.to(priceAction, {
        scale: 1.1,
        color: 'var(--color-primary)',
        textShadow: '0 2px 10px rgba(var(--color-primary-rgb), 0.3)',
        duration: 0.3,
        ease: "back.out(1.2)"
      });

      // Animation du prix
      gsap.to(priceValue, {
        scale: 1.05,
        color: 'var(--color-primary)',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    priceAction.addEventListener('mouseleave', () => {
      gsap.to(priceAction, {
        scale: 1,
        color: 'var(--color-text)',
        textShadow: '0 0 0px rgba(var(--color-primary-rgb), 0)',
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(priceValue, {
        scale: 1,
        color: 'var(--color-text)',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    // Animation de click
    priceAction.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to(priceAction, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    });
  }

  // Animation des connexions entre features et capteur
  const createConnectionLines = () => {
    features.forEach((feature, index) => {
      const isLeft = feature.closest('.left-features');
      const rect = feature.getBoundingClientRect();
      const sensorRect = sensorImage?.getBoundingClientRect();

      if (sensorRect) {
        // Créer une ligne de connexion virtuelle
        const line = document.createElement('div');
        line.className = 'connection-line';
        line.style.cssText = `
          position: absolute;
          background: linear-gradient(${isLeft ? '90deg' : '-90deg'}, var(--color-primary), transparent);
          height: 1px;
          opacity: 0;
          pointer-events: none;
          z-index: -1;
        `;

        feature.style.position = 'relative';
        feature.appendChild(line);

        // Animation des lignes après les features
        bodyTL.to(line, {
          opacity: 0.3,
          width: '50px',
          duration: 0.5,
          ease: "power2.out",
          delay: index * 0.1
        }, 1);
      }
    });
  };

  // Créer les lignes de connexion après un délai
  setTimeout(createConnectionLines, 2000);

  // Parallax subtil sur les différentes sections
  let sensorParallaxTween;

  const handleSensorParallax = () => {
    const sensorSection = document.querySelector('.sensor');
    if (!sensorSection) return;

    const rect = sensorSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      // Parallax différentiel
      const leftOffset = scrollProgress * -10;
      const rightOffset = scrollProgress * 10;
      const centerOffset = scrollProgress * -5;

      if (sensorParallaxTween) sensorParallaxTween.kill();

      gsap.to('.left-features', {
        x: leftOffset,
        duration: 0.3,
        ease: "none"
      });

      gsap.to('.right-features', {
        x: rightOffset,
        duration: 0.3,
        ease: "none"
      });

      gsap.to('.sensor-illustration', {
        y: centerOffset,
        duration: 0.3,
        ease: "none"
      });
    }
  };

  // Animation des icônes au scroll (effet de pulsation)
  const handleIconsPulse = () => {
    const icons = document.querySelectorAll('.feature-icon');

    icons.forEach((icon, index) => {
      const rect = icon.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2) {
        gsap.to(icon, {
          filter: `drop-shadow(0 0 15px rgba(var(--color-primary-rgb), 0.4))`,
          duration: 2 + (index * 0.2),
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut"
        });
      }
    });
  };

  // Throttle des animations de scroll
  let scrollRAF;
  const throttledScroll = () => {
    if (scrollRAF) return;

    scrollRAF = requestAnimationFrame(() => {
      handleSensorParallax();
      handleIconsPulse();
      scrollRAF = null;
    });
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Animation de compteur sur le prix
  const animatePrice = () => {
    const priceElement = document.querySelector('.price-value');
    if (!priceElement) return;

    const finalPrice = 20000;
    let currentPrice = 0;

    const counter = { value: 0 };
    gsap.to(counter, {
      value: finalPrice,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        priceElement.textContent = `${Math.round(counter.value).toLocaleString()} XOF`;
      }
    });
  };

  // Démarrer l'animation du prix après l'animation principale
  priceTL.call(animatePrice, null, null, 0.5);
});

// Fonction utilitaire pour rejouer toutes les animations
const replaySensorAnimation = () => {
  // Reset des états
  gsap.set('.sensor-title', { y: 40, opacity: 0 });
  gsap.set('.sensor-subtitle', { y: 30, opacity: 0 });
  gsap.set('.left-features .sensor-feature', { x: -60, opacity: 0, scale: 0.9 });
  gsap.set('.right-features .sensor-feature', { x: 60, opacity: 0, scale: 0.9 });
  gsap.set('.sensor-image', { scale: 0.8, opacity: 0, rotationY: 10 });
  gsap.set('.price-label', { y: 30, opacity: 0 });
  gsap.set('.price-value', { scale: 0, opacity: 0 });
  gsap.set('.price-action', { y: 20, opacity: 0 });

  // Rejouer toutes les animations avec délais appropriés
  const masterTL = gsap.timeline();

  // Header
  masterTL
    .to('.sensor-title', { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
    .to('.sensor-subtitle', { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.2);

  // Body (après 1s)
  masterTL
    .to('.sensor-image', { scale: 1, opacity: 1, rotationY: 0, duration: 1, ease: "back.out(1.2)" }, 1)
    .to('.left-features .sensor-feature', { x: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.1)" }, 1.3)
    .to('.right-features .sensor-feature', { x: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.1)" }, 1.4);

  // Price (après 2s)
  masterTL
    .to('.price-label', { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 2)
    .to('.price-value', { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, 2.2)
    .to('.price-action', { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 2.4);
};