// Animation de la section Objective - By Az
// Grid animation avec effets de morphing et révélation progressive

document.addEventListener('DOMContentLoaded', () => {
  // Vérification accessibilité
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.objective .icon, .objective .title, .objective .item', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.objective .icon', { scale: 0, rotation: -180, opacity: 0 });
  gsap.set('.objective .title', { y: 40, opacity: 0 });
  gsap.set('.objective .item', {
    scale: 0.8,
    opacity: 0,
    rotationY: 45,
    transformOrigin: "center center"
  });
  gsap.set('.objective .number', { x: 50, opacity: 0 });
  gsap.set('.objective .label', { y: 30, opacity: 0 });
  gsap.set('.objective .overlay', {
    background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)'
  });

  // Timeline principale
  const objectiveTL = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  // Séquence d'animation
  objectiveTL
    // Animation de l'icône avec effet de rotation
    .to('.objective .icon', {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)"
    })

    // Animation du titre
    .to('.objective .title', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out"
    }, 0.2)

    // Animation des items avec effet 3D
    .to('.objective .item', {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      duration: 0.8,
      stagger: 0.15, // Décalage entre chaque item
      ease: "back.out(1.2)"
    }, 0.5)

    // Animation des overlays (fade normal)
    .to('.objective .overlay', {
      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%)',
      duration: 0.6,
      stagger: 0.1
    }, 0.8)

    // Animation des numéros
    .to('.objective .number', {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, 1)

    // Animation des labels
    .to('.objective .label', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out"
    }, 1.1);

  // Intersection Observer
  const objectiveObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        objectiveTL.play();
        objectiveObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observer la section
  const objectiveSection = document.querySelector('.objective');
  if (objectiveSection) {
    objectiveObserver.observe(objectiveSection);
  }

  // Micro-interactions avancées sur les items
  const items = document.querySelectorAll('.objective .item');

  items.forEach((item, index) => {
    const overlay = item.querySelector('.overlay');
    const number = item.querySelector('.number');
    const label = item.querySelector('.label');

    // Animation hover sophistiquée
    item.addEventListener('mouseenter', () => {
      // Scale et élévation de l'item
      gsap.to(item, {
        scale: 1.05,
        z: 50,
        duration: 0.4,
        ease: "power2.out"
      });

      // Intensification de l'overlay
      gsap.to(overlay, {
        background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)',
        duration: 0.4,
        ease: "power2.out"
      });

      // Animation du numéro (plus visible)
      gsap.to(number, {
        opacity: 0.8,
        scale: 1.1,
        color: '#ffffff',
        duration: 0.3,
        ease: "power2.out"
      });

      // Animation du label (remontée)
      gsap.to(label, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    item.addEventListener('mouseleave', () => {
      // Retour normal
      gsap.to(item, {
        scale: 1,
        z: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(overlay, {
        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%)',
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(number, {
        opacity: 0.5,
        scale: 1,
        color: 'var(--color-white)',
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(label, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    // Animation de focus pour accessibilité
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Objectif ${index + 1}: ${label?.textContent}`);

    item.addEventListener('focus', () => {
      gsap.to(item, {
        scale: 1.05,
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    item.addEventListener('blur', () => {
      gsap.to(item, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    // Animation au click (feedback tactile)
    item.addEventListener('click', () => {
      gsap.to(item, {
        scale: 0.98,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    });
  });

  // Parallax subtil sur les items au scroll
  let objectiveParallaxTween;

  const handleObjectiveParallax = () => {
    if (!objectiveSection) return;

    const rect = objectiveSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      items.forEach((item, index) => {
        const offset = (index % 2 === 0 ? 1 : -1) * 10; // Alternance pour effet dynamique
        const parallaxAmount = (scrollProgress - 0.5) * offset;

        if (objectiveParallaxTween) objectiveParallaxTween.kill();

        gsap.to(item, {
          y: parallaxAmount,
          duration: 0.3,
          ease: "none"
        });
      });
    }
  };

  // Animation de "morphing" des backgrounds au scroll
  const handleBackgroundMorph = () => {
    if (!objectiveSection) return;

    const rect = objectiveSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));

      items.forEach((item, index) => {
        const scale = 1 + (scrollProgress * 0.1); // Zoom léger
        const brightness = 100 - (scrollProgress * 20); // Assombrissement

        gsap.to(item, {
          filter: `brightness(${brightness}%) contrast(110%)`,
          backgroundSize: `${scale * 100}% auto`,
          duration: 0.2,
          ease: "none"
        });
      });
    }
  };

  // Throttle des animations de scroll
  let scrollRAF;
  const throttledScroll = () => {
    if (scrollRAF) return;

    scrollRAF = requestAnimationFrame(() => {
      handleObjectiveParallax();
      handleBackgroundMorph();
      scrollRAF = null;
    });
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Animation de pulsation des numéros (très subtile)
  const createNumberPulse = () => {
    items.forEach((item, index) => {
      const number = item.querySelector('.number');
      if (number) {
        gsap.to(number, {
          opacity: 0.7,
          duration: 3 + (index * 0.5),
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
          delay: index * 0.3
        });
      }
    });
  };

  // Démarrer la pulsation après l'animation principale
  objectiveTL.call(createNumberPulse, null, null, 2);

  // Animation reveal sur l'icône au scroll
  const handleIconReveal = () => {
    const icon = document.querySelector('.objective .icon');
    if (!icon || !objectiveSection) return;

    const rect = objectiveSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2) {
      const progress = (window.innerHeight * 0.8 - rect.top) / (window.innerHeight * 0.6);
      const rotation = progress * 360;

      gsap.to(icon, {
        rotation: rotation,
        duration: 0.1,
        ease: "none"
      });
    }
  };

  // Ajouter l'effet icon reveal au scroll
  let iconRAF;
  window.addEventListener('scroll', () => {
    if (iconRAF) return;

    iconRAF = requestAnimationFrame(() => {
      handleIconReveal();
      iconRAF = null;
    });
  }, { passive: true });
});

// Fonction utilitaire pour rejouer l'animation
const replayObjectiveAnimation = () => {
  const objectiveTL = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  // Reset des états
  gsap.set('.objective .icon', { scale: 0, rotation: -180, opacity: 0 });
  gsap.set('.objective .title', { y: 40, opacity: 0 });
  gsap.set('.objective .item', { scale: 0.8, opacity: 0, rotationY: 45 });
  gsap.set('.objective .number', { x: 50, opacity: 0 });
  gsap.set('.objective .label', { y: 30, opacity: 0 });

  // Rejouer la séquence
  objectiveTL
    .to('.objective .icon', { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
    .to('.objective .title', { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.2)
    .to('.objective .item', { scale: 1, opacity: 1, rotationY: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }, 0.5)
    .to('.objective .number', { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 1)
    .to('.objective .label', { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out" }, 1.1);
};