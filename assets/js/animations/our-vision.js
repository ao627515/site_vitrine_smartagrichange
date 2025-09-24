// Animation de la section Our Vision - By Az
// Section avec background parallax et animation épurée

document.addEventListener('DOMContentLoaded', () => {
  // Vérification accessibilité
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.our-vision .title, .our-vision .sub-title', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.our-vision .overlay', { opacity: 0 });
  gsap.set('.our-vision .title', { y: 30, opacity: 0 });
  gsap.set('.our-vision .sub-title', { y: 40, opacity: 0 });

  // Timeline pour la section vision
  const visionTL = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 1
    }
  });

  // Animation séquentielle
  visionTL
    // Fade in de l'overlay
    .to('.our-vision .overlay', {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })

    // Animation du titre principal
    .to('.our-vision .title', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, 0.3)

    // Animation du sous-titre
    .to('.our-vision .sub-title', {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, 0.5);

  // Intersection Observer pour déclencher l'animation
  const visionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visionTL.play();
        visionObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // Plus sensible pour cette section
    rootMargin: '0px 0px -80px 0px'
  });

  // Observer la section vision
  const visionSection = document.querySelector('.our-vision');
  if (visionSection) {
    visionObserver.observe(visionSection);
  }

  // Parallax du background au scroll (effet cinématique)
  let visionParallaxTween;

  const handleVisionParallax = () => {
    if (!visionSection) return;

    const rect = visionSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      // Calcul de progression du scroll
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      // Parallax du background (plus lent que le scroll)
      const bgParallax = (scrollProgress - 0.5) * 50;

      // Parallax du contenu (plus subtil)
      const contentParallax = (scrollProgress - 0.5) * -20;

      if (visionParallaxTween) visionParallaxTween.kill();

      // Animation du background via CSS transform
      visionParallaxTween = gsap.to(visionSection, {
        backgroundPositionY: `calc(50% + ${bgParallax}px)`,
        duration: 0.3,
        ease: "none"
      });

      // Parallax subtil du contenu
      gsap.to('.our-vision .overlay', {
        y: contentParallax,
        duration: 0.3,
        ease: "none"
      });
    }
  };

  // Throttle optimisé du parallax
  let parallaxRAF;
  const throttledParallax = () => {
    if (parallaxRAF) return;

    parallaxRAF = requestAnimationFrame(() => {
      handleVisionParallax();
      parallaxRAF = null;
    });
  };

  window.addEventListener('scroll', throttledParallax, { passive: true });

  // Animation de "breathing" subtile sur les textes (optionnel)
  const createBreathingEffect = () => {
    // Animation très subtile pour donner vie au contenu
    gsap.to('.our-vision .title', {
      scale: 1.005,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });

    gsap.to('.our-vision .sub-title', {
      scale: 1.003,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
      delay: 0.5
    });
  };

  // Démarrer l'effet breathing après l'animation principale
  visionTL.call(createBreathingEffect, null, null, 1.8);

  // Animation de l'overlay au hover/focus (interaction subtile)
  const overlay = document.querySelector('.our-vision .overlay');

  if (overlay) {
    // Rendre l'overlay focusable pour l'accessibilité
    overlay.setAttribute('tabindex', '0');
    overlay.setAttribute('role', 'region');
    overlay.setAttribute('aria-label', 'Notre Vision');

    const hoverAnimation = () => {
      gsap.to(overlay, {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        scale: 1.005,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    const resetAnimation = () => {
      gsap.to(overlay, {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    overlay.addEventListener('mouseenter', hoverAnimation);
    overlay.addEventListener('mouseleave', resetAnimation);
    overlay.addEventListener('focus', hoverAnimation);
    overlay.addEventListener('blur', resetAnimation);
  }

  // Optimisation des performances : pause des animations quand pas visible
  const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        // Pause les animations quand la section n'est pas visible
        gsap.globalTimeline.getChildren().forEach(timeline => {
          if (timeline.targets && timeline.targets().some(target =>
            visionSection.contains(target))) {
            timeline.pause();
          }
        });
      } else {
        // Reprend les animations
        gsap.globalTimeline.getChildren().forEach(timeline => {
          if (timeline.targets && timeline.targets().some(target =>
            visionSection.contains(target))) {
            timeline.resume();
          }
        });
      }
    });
  }, {
    threshold: 0,
    rootMargin: '100px 0px 100px 0px'
  });

  if (visionSection) {
    performanceObserver.observe(visionSection);
  }

  // Animation reveal progressive au scroll (effet cinéma)
  const handleRevealEffect = () => {
    if (!visionSection) return;

    const rect = visionSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));

      // Effet de révélation progressive
      gsap.to('.our-vision .overlay', {
        clipPath: `inset(${(1 - progress) * 100}% 0 0 0)`,
        duration: 0.1,
        ease: "none"
      });
    }
  };

  // Appel initial pour l'effet reveal
  handleRevealEffect();

  // Écouter le scroll pour l'effet reveal
  let revealRAF;
  window.addEventListener('scroll', () => {
    if (revealRAF) return;

    revealRAF = requestAnimationFrame(() => {
      handleRevealEffect();
      revealRAF = null;
    });
  }, { passive: true });
});

// Fonction utilitaire pour rejouer l'animation
const replayVisionAnimation = () => {
  const visionTL = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 1
    }
  });

  gsap.set('.our-vision .overlay', { opacity: 0 });
  gsap.set('.our-vision .title', { y: 30, opacity: 0 });
  gsap.set('.our-vision .sub-title', { y: 40, opacity: 0 });

  visionTL
    .to('.our-vision .overlay', { opacity: 1, duration: 0.8 })
    .to('.our-vision .title', { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.3)
    .to('.our-vision .sub-title', { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.5);
};