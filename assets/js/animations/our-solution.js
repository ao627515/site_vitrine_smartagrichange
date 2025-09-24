// Animation de la section Our Solution - By Az
// Section avec background parallax et features animées

document.addEventListener('DOMContentLoaded', () => {
  // Vérification accessibilité
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.our-solution .title, .our-solution .sup-title, .our-solution .feature', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.our-solution .overlay', { opacity: 0 });
  gsap.set('.our-solution .title', { y: 50, opacity: 0 });
  gsap.set('.our-solution .sup-title', { y: 40, opacity: 0 });
  gsap.set('.our-solution .feature', {
    y: 80,
    opacity: 0,
    scale: 0.9,
    rotationX: 15
  });
  gsap.set('.our-solution .icon', {
    scale: 0,
    rotation: -180,
    opacity: 0
  });
  gsap.set('.our-solution .feature .title', { x: -30, opacity: 0 });
  gsap.set('.our-solution .feature .sub-title', { x: 30, opacity: 0 });

  // Timeline principale
  const solutionTL = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  // Séquence d'animation
  solutionTL
    // Fade in de l'overlay
    .to('.our-solution .overlay', {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    })

    // Animation du titre principal
    .to('.our-solution .title', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.2)"
    }, 0.2)

    // Animation du sous-titre
    .to('.our-solution .sup-title', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out"
    }, 0.4)

    // Animation des features containers
    .to('.our-solution .feature', {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.2, // Décalage entre les 2 features
      ease: "back.out(1.1)"
    }, 0.6)

    // Animation des icônes avec rotation
    .to('.our-solution .icon', {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)"
    }, 0.8)

    // Animation des titres des features
    .to('.our-solution .feature .title', {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, 1)

    // Animation des descriptions
    .to('.our-solution .feature .sub-title', {
      x: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out"
    }, 1.1);

  // Intersection Observer
  const solutionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        solutionTL.play();
        solutionObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observer la section
  const solutionSection = document.querySelector('.our-solution');
  if (solutionSection) {
    solutionObserver.observe(solutionSection);
  }

  // Parallax du background
  let solutionParallaxTween;

  const handleSolutionParallax = () => {
    if (!solutionSection) return;

    const rect = solutionSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const bgParallax = (scrollProgress - 0.5) * 30; // Parallax plus subtil

      if (solutionParallaxTween) solutionParallaxTween.kill();

      solutionParallaxTween = gsap.to(solutionSection, {
        backgroundPositionY: `calc(50% + ${bgParallax}px)`,
        duration: 0.3,
        ease: "none"
      });
    }
  };

  // Micro-interactions sur les features
  const features = document.querySelectorAll('.our-solution .feature');

  features.forEach((feature, index) => {
    const icon = feature.querySelector('.icon');
    const title = feature.querySelector('.title');
    const subTitle = feature.querySelector('.sub-title');

    // Animation hover sophistiquée
    feature.addEventListener('mouseenter', () => {
      // Scale de la feature
      gsap.to(feature, {
        scale: 1.05,
        y: -10,
        duration: 0.4,
        ease: "power2.out"
      });

      // Animation de l'icône
      gsap.to(icon, {
        scale: 1.2,
        rotation: 10,
        duration: 0.3,
        ease: "back.out(1.2)"
      });

      // Highlight du titre
      gsap.to(title, {
        color: '#60a5fa', // Bleu clair
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });

      // Animation subtile du texte
      gsap.to(subTitle, {
        y: -2,
        opacity: 0.9,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    feature.addEventListener('mouseleave', () => {
      // Retour normal
      gsap.to(feature, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(title, {
        color: 'var(--color-white)',
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(subTitle, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    // Accessibilité
    feature.setAttribute('tabindex', '0');
    feature.setAttribute('role', 'article');
    feature.setAttribute('aria-label', `Feature: ${title?.textContent}`);

    feature.addEventListener('focus', () => {
      gsap.to(feature, {
        scale: 1.05,
        boxShadow: '0 0 0 3px rgba(96, 165, 250, 0.5)',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    feature.addEventListener('blur', () => {
      gsap.to(feature, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Animation de "floating" des icônes
  const createFloatingEffect = () => {
    const icons = document.querySelectorAll('.our-solution .icon');

    icons.forEach((icon, index) => {
      gsap.to(icon, {
        y: -8,
        duration: 2.5 + (index * 0.3),
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        delay: index * 0.4
      });

      // Rotation subtile
      gsap.to(icon, {
        rotation: 5,
        duration: 4 + (index * 0.5),
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        delay: index * 0.2
      });
    });
  };

  // Démarrer l'effet floating après l'animation principale
  solutionTL.call(createFloatingEffect, null, null, 2);

  // Animation de révélation progressive du contenu
  const handleContentReveal = () => {
    if (!solutionSection) return;

    const rect = solutionSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));

      // Effet de révélation sur l'overlay
      gsap.to('.our-solution .overlay', {
        clipPath: `polygon(0 ${(1 - progress) * 100}%, 100% ${(1 - progress) * 100}%, 100% 100%, 0 100%)`,
        duration: 0.1,
        ease: "none"
      });
    }
  };

  // Animation des features au scroll (effet de profondeur)
  const handleFeaturesDepth = () => {
    if (!solutionSection) return;

    const rect = solutionSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      features.forEach((feature, index) => {
        const offset = (index % 2 === 0 ? 1 : -1) * 5;
        const depthOffset = scrollProgress * offset;
        const scaleOffset = 1 + (scrollProgress * 0.02);

        gsap.to(feature, {
          x: depthOffset,
          scale: scaleOffset,
          duration: 0.3,
          ease: "none"
        });
      });
    }
  };

  // Animation de glow sur les icônes au scroll
  const handleIconGlow = () => {
    if (!solutionSection) return;

    const rect = solutionSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
      const progress = (windowHeight * 0.8 - rect.top) / (windowHeight * 0.6);
      const glowIntensity = Math.sin(progress * Math.PI) * 20;

      const icons = document.querySelectorAll('.our-solution .icon');
      icons.forEach(icon => {
        gsap.to(icon, {
          filter: `drop-shadow(0 0 ${glowIntensity}px rgba(96, 165, 250, 0.6))`,
          duration: 0.1,
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
      handleSolutionParallax();
      handleContentReveal();
      handleFeaturesDepth();
      handleIconGlow();
      scrollRAF = null;
    });
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Animation de "breathing" de l'overlay
  const createOverlayBreathing = () => {
    gsap.to('.our-solution .overlay', {
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
  };

  // Démarrer l'effet breathing
  solutionTL.call(createOverlayBreathing, null, null, 2.5);

  // Animation de typewriter sur les titres (optionnel)
  const createTypewriterEffect = (element, delay = 0) => {
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    gsap.to(element, {
      duration: text.length * 0.05,
      ease: "none",
      delay: delay,
      onUpdate: function () {
        const progress = this.progress();
        const currentLength = Math.round(progress * text.length);
        element.textContent = text.substring(0, currentLength);
      }
    });
  };

  // Appliquer l'effet typewriter après l'animation principale
  solutionTL.call(() => {
    const featureTitles = document.querySelectorAll('.our-solution .feature .title');
    featureTitles.forEach((title, index) => {
      createTypewriterEffect(title, index * 0.5);
    });
  }, null, null, 1.5);
});

// Fonction utilitaire pour rejouer l'animation
const replaySolutionAnimation = () => {
  const solutionTL = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  // Reset des états
  gsap.set('.our-solution .overlay', { opacity: 0 });
  gsap.set('.our-solution .title', { y: 50, opacity: 0 });
  gsap.set('.our-solution .sup-title', { y: 40, opacity: 0 });
  gsap.set('.our-solution .feature', { y: 80, opacity: 0, scale: 0.9, rotationX: 15 });
  gsap.set('.our-solution .icon', { scale: 0, rotation: -180, opacity: 0 });
  gsap.set('.our-solution .feature .title', { x: -30, opacity: 0 });
  gsap.set('.our-solution .feature .sub-title', { x: 30, opacity: 0 });

  // Rejouer la séquence
  solutionTL
    .to('.our-solution .overlay', { opacity: 1, duration: 0.6 })
    .to('.our-solution .title', { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }, 0.2)
    .to('.our-solution .sup-title', { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.4)
    .to('.our-solution .feature', { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.1)" }, 0.6)
    .to('.our-solution .icon', { scale: 1, rotation: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" }, 0.8)
    .to('.our-solution .feature .title', { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, 1)
    .to('.our-solution .feature .sub-title', { x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out" }, 1.1);
};