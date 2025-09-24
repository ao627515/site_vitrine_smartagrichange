// Animation de la section Soil Analysis - By Az
// Animation séquentielle des étapes avec effets modernes et UX optimisée

document.addEventListener('DOMContentLoaded', () => {
  // Vérification accessibilité
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.soil-analysis .title, .soil-analysis .description, .soil-analysis .step', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.soil-analysis .title', { y: 40, opacity: 0 });
  gsap.set('.soil-analysis .description', { y: 30, opacity: 0 });
  gsap.set('.soil-analysis .step', { y: 60, opacity: 0 });
  gsap.set('.soil-analysis .number', { scale: 0, opacity: 0 });
  gsap.set('.soil-analysis .step .title', { x: -30, opacity: 0 });
  gsap.set('.soil-analysis .sub-title', { x: -20, opacity: 0 });
  gsap.set('.soil-analysis .illustration', {
    scale: 0.8,
    opacity: 0,
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
  });

  // Timeline principale
  const soilTL = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  // Séquence d'animation d'introduction
  soilTL
    // Animation du titre principal
    .to('.soil-analysis .title', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out"
    })

    // Animation de la description
    .to('.soil-analysis .description', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, 0.2);

  // Timeline pour chaque étape (sera déclenchée par intersection)
  const createStepTimeline = (stepElement, index) => {
    const number = stepElement.querySelector('.number');
    const title = stepElement.querySelector('.title');
    const subTitle = stepElement.querySelector('.sub-title');
    const illustration = stepElement.querySelector('.illustration');

    const stepTL = gsap.timeline({ paused: true });

    stepTL
      // Animation du conteneur step
      .to(stepElement, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      })

      // Animation du numéro avec effet bounce
      .to(number, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, 0.1)

      // Animation du titre
      .to(title, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, 0.2)

      // Animation du sous-titre
      .to(subTitle, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, 0.3)

      // Animation de l'illustration avec reveal effect
      .to(illustration, {
        scale: 1,
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
        duration: 0.8,
        ease: "power2.out"
      }, 0.1);

    return stepTL;
  };

  // Intersection Observer pour l'animation d'introduction
  const soilObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        soilTL.play();
        soilObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  const soilSection = document.querySelector('.soil-analysis');
  if (soilSection) {
    soilObserver.observe(soilSection);
  }

  // Observer pour chaque étape
  const steps = document.querySelectorAll('.soil-analysis .step');
  const stepTimelines = [];

  steps.forEach((step, index) => {
    const stepTL = createStepTimeline(step, index);
    stepTimelines.push(stepTL);

    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stepTL.play();
          stepObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });

    stepObserver.observe(step);
  });

  // Micro-interactions sur les étapes
  steps.forEach((step, index) => {
    const number = step.querySelector('.number');
    const illustration = step.querySelector('.illustration');
    const contentContainer = step.querySelector('.content-container');

    // Animation hover subtile
    step.addEventListener('mouseenter', () => {
      gsap.to(step, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });

      // Highlight du numéro
      gsap.to(number, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.2)"
      });

      // Effet sur l'illustration
      gsap.to(illustration, {
        scale: 1.05,
        filter: 'brightness(110%) contrast(105%)',
        duration: 0.4,
        ease: "power2.out"
      });

      // Animation du contenu
      gsap.to(contentContainer, {
        x: 10,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    step.addEventListener('mouseleave', () => {
      gsap.to(step, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(number, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(illustration, {
        scale: 1,
        filter: 'brightness(100%) contrast(100%)',
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(contentContainer, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    // Accessibilité
    step.setAttribute('tabindex', '0');
    step.setAttribute('role', 'article');
    const stepTitle = step.querySelector('.title')?.textContent || `Étape ${index + 1}`;
    step.setAttribute('aria-label', stepTitle);

    step.addEventListener('focus', () => {
      gsap.to(step, {
        scale: 1.02,
        outline: '3px solid rgba(59, 130, 246, 0.5)',
        outlineOffset: '4px',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    step.addEventListener('blur', () => {
      gsap.to(step, {
        scale: 1,
        outline: 'none',
        outlineOffset: '0px',
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Animation de progression visuelle (connexion entre les étapes)
  const createProgressLine = () => {
    steps.forEach((step, index) => {
      if (index < steps.length - 1) {
        // Créer une ligne de progression virtuelle
        const progressLine = document.createElement('div');
        progressLine.className = 'progress-line';
        progressLine.style.cssText = `
          position: absolute;
          left: 2rem;
          top: 100%;
          width: 2px;
          height: 2rem;
          background: linear-gradient(to bottom, var(--color-primary), transparent);
          opacity: 0;
          transform-origin: top;
          transform: scaleY(0);
        `;

        const number = step.querySelector('.number');
        if (number) {
          number.style.position = 'relative';
          number.appendChild(progressLine);
        }

        // Animer la ligne après l'animation de l'étape
        stepTimelines[index].to(progressLine, {
          opacity: 0.6,
          scaleY: 1,
          duration: 0.5,
          ease: "power2.out"
        }, 0.8);
      }
    });
  };

  // Créer les lignes de progression après un délai
  setTimeout(createProgressLine, 1000);

  // Animation de parallax subtil sur les illustrations
  let soilParallaxTween;

  const handleIllustrationsParallax = () => {
    if (!soilSection) return;

    const rect = soilSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      const illustrations = document.querySelectorAll('.soil-analysis .illustration');
      illustrations.forEach((img, index) => {
        const offset = (index % 2 === 0 ? 1 : -1) * 5;
        const parallaxAmount = scrollProgress * offset;

        if (soilParallaxTween) soilParallaxTween.kill();

        gsap.to(img, {
          y: parallaxAmount,
          duration: 0.3,
          ease: "none"
        });
      });
    }
  };

  // Animation des numéros au scroll (effet counter)
  const animateNumbersOnScroll = () => {
    const numbers = document.querySelectorAll('.soil-analysis .number');

    numbers.forEach((number, index) => {
      const rect = number.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2) {
        // Animation de pulsation subtile
        gsap.to(number, {
          textShadow: '0 0 20px rgba(var(--color-primary-rgb), 0.3)',
          duration: 2,
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
      handleIllustrationsParallax();
      animateNumbersOnScroll();
      scrollRAF = null;
    });
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Animation de "typing" sur la description (optionnel)
  const createTypingEffect = () => {
    const description = document.querySelector('.soil-analysis .description');
    if (!description) return;

    const text = description.textContent;
    description.textContent = '';

    let currentIndex = 0;
    const typingSpeed = 30; // millisecondes par caractère

    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        description.textContent += text[currentIndex];
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, typingSpeed);
  };

  // Démarrer l'effet typing après l'animation de la description
  soilTL.call(createTypingEffect, null, null, 0.8);
});

// Fonction utilitaire pour rejouer toutes les animations
const replaySoilAnalysisAnimation = () => {
  // Reset des états
  gsap.set('.soil-analysis .title', { y: 40, opacity: 0 });
  gsap.set('.soil-analysis .description', { y: 30, opacity: 0 });
  gsap.set('.soil-analysis .step', { y: 60, opacity: 0 });
  gsap.set('.soil-analysis .number', { scale: 0, opacity: 0 });
  gsap.set('.soil-analysis .step .title', { x: -30, opacity: 0 });
  gsap.set('.soil-analysis .sub-title', { x: -20, opacity: 0 });
  gsap.set('.soil-analysis .illustration', {
    scale: 0.8,
    opacity: 0,
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
  });

  // Rejouer l'animation principale
  const soilTL = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  soilTL
    .to('.soil-analysis .title', { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
    .to('.soil-analysis .description', { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.2);

  // Rejouer les animations des étapes avec délai
  const steps = document.querySelectorAll('.soil-analysis .step');
  steps.forEach((step, index) => {
    setTimeout(() => {
      const stepTL = gsap.timeline();
      const number = step.querySelector('.number');
      const title = step.querySelector('.title');
      const subTitle = step.querySelector('.sub-title');
      const illustration = step.querySelector('.illustration');

      stepTL
        .to(step, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
        .to(number, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, 0.1)
        .to(title, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.2)
        .to(subTitle, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.3)
        .to(illustration, {
          scale: 1,
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          duration: 0.8,
          ease: "power2.out"
        }, 0.1);
    }, index * 200);
  });
};