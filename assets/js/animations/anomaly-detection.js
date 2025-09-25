// Animation de la section Anomaly Detection - By Az
// Animation split simple et moderne pour section two-columns

document.addEventListener('DOMContentLoaded', () => {
  // Vérification accessibilité
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.anomaly-detection .title, .anomaly-detection .sub-title, .anomaly-detection .description, .anomaly-detection img', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.anomaly-detection .title', { y: 40, opacity: 0 });
  gsap.set('.anomaly-detection .sub-title', { y: 30, opacity: 0 });
  gsap.set('.anomaly-detection .description', { y: 25, opacity: 0 });
  gsap.set('.anomaly-detection img', {
    x: 50,
    opacity: 0,
    scale: 0.95,
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
  });

  // Timeline principale
  const anomalyTL = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  // Séquence d'animation
  anomalyTL
    // Animation du titre principal
    .to('.anomaly-detection .title', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out"
    })

    // Animation du sous-titre
    .to('.anomaly-detection .sub-title', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, 0.2)

    // Animation de la description
    .to('.anomaly-detection .description', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, 0.4)

    // Animation de l'image avec reveal effect
    .to('.anomaly-detection img', {
      x: 0,
      opacity: 1,
      scale: 1,
      clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
      duration: 1,
      ease: "power2.out"
    }, 0.3);

  // Intersection Observer
  const anomalyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anomalyTL.play();
        anomalyObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observer la section
  const anomalySection = document.querySelector('.anomaly-detection');
  if (anomalySection) {
    anomalyObserver.observe(anomalySection);
  }

  // Micro-interactions sur le contenu
  const contentContainer = document.querySelector('.anomaly-detection .content-container');
  const image = document.querySelector('.anomaly-detection img');
  const title = document.querySelector('.anomaly-detection .title');

  // Animation hover sur le container de contenu
  if (contentContainer) {
    contentContainer.addEventListener('mouseenter', () => {
      gsap.to(contentContainer, {
        x: 10,
        duration: 0.4,
        ease: "power2.out"
      });

      // Highlight du titre
      gsap.to(title, {
        textShadow: '0 2px 10px rgba(var(--color-primary-rgb), 0.2)',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    contentContainer.addEventListener('mouseleave', () => {
      gsap.to(contentContainer, {
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(title, {
        textShadow: '0 0 0px rgba(var(--color-primary-rgb), 0)',
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }

  // Animation hover sur l'image
  if (image) {
    image.addEventListener('mouseenter', () => {
      gsap.to(image, {
        scale: 1.05,
        filter: 'brightness(110%) saturate(110%)',
        duration: 0.4,
        ease: "power2.out"
      });
    });

    image.addEventListener('mouseleave', () => {
      gsap.to(image, {
        scale: 1,
        filter: 'brightness(100%) saturate(100%)',
        duration: 0.4,
        ease: "power2.out"
      });
    });
  }

  // Accessibilité
  if (contentContainer) {
    contentContainer.setAttribute('tabindex', '0');
    contentContainer.setAttribute('role', 'region');
    contentContainer.setAttribute('aria-label', 'Détection d\'anomalies en un clic');

    contentContainer.addEventListener('focus', () => {
      gsap.to(contentContainer, {
        outline: '3px solid rgba(59, 130, 246, 0.5)',
        outlineOffset: '4px',
        x: 10,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    contentContainer.addEventListener('blur', () => {
      gsap.to(contentContainer, {
        outline: 'none',
        outlineOffset: '0px',
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }

  // Parallax subtil entre contenu et image
  let anomalyParallaxTween;

  const handleAnomalyParallax = () => {
    if (!anomalySection) return;

    const rect = anomalySection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      // Parallax opposé entre contenu et image
      const contentOffset = (scrollProgress - 0.5) * -10;
      const imageOffset = (scrollProgress - 0.5) * 15;

      if (anomalyParallaxTween) anomalyParallaxTween.kill();

      // Animation du contenu
      gsap.to(contentContainer, {
        y: contentOffset,
        duration: 0.3,
        ease: "none"
      });

      // Animation de l'image
      gsap.to(image, {
        y: imageOffset,
        duration: 0.3,
        ease: "none"
      });
    }
  };

  // Animation de "breathing" subtile sur l'image
  const createImageBreathing = () => {
    if (!image) return;

    gsap.to(image, {
      scale: 1.002,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
  };

  // Démarrer l'effet breathing après l'animation principale
  anomalyTL.call(createImageBreathing, null, null, 1.5);

  // Animation de "typing" progressive sur la description
  const createProgressiveReveal = () => {
    const description = document.querySelector('.anomaly-detection .description');
    if (!description) return;

    const words = description.textContent.split(' ');
    description.innerHTML = '';

    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      description.appendChild(span);

      // Animer chaque mot avec un délai
      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        delay: index * 0.05
      });
    });
  };

  // Démarrer l'animation progressive après l'animation de la description
  anomalyTL.call(createProgressiveReveal, null, null, 0.8);

  // Animation de focus magnétique sur l'image
  const createMagneticEffect = () => {
    if (!image) return;

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    image.addEventListener('mousemove', (e) => {
      const rect = image.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseX = (e.clientX - centerX) / rect.width * 10; // Max 10px movement
      mouseY = (e.clientY - centerY) / rect.height * 10;

      if (isHovering) {
        gsap.to(image, {
          x: mouseX,
          y: mouseY,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    image.addEventListener('mouseenter', () => {
      isHovering = true;
    });

    image.addEventListener('mouseleave', () => {
      isHovering = false;
      gsap.to(image, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      });
    });
  };

  // Activer l'effet magnétique après l'animation principale
  anomalyTL.call(createMagneticEffect, null, null, 1.5);

  // Animation du texte au scroll (effet de révélation des lignes)
  const handleTextReveal = () => {
    if (!anomalySection) return;

    const rect = anomalySection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
      const progress = (windowHeight * 0.8 - rect.top) / (windowHeight * 0.6);

      // Effet de révélation progressive sur les textes
      const textElements = [
        document.querySelector('.anomaly-detection .title'),
        document.querySelector('.anomaly-detection .sub-title'),
        document.querySelector('.anomaly-detection .description')
      ];

      textElements.forEach((element, index) => {
        if (element && progress > index * 0.2) {
          const elementProgress = Math.min(1, (progress - index * 0.2) / 0.3);

          gsap.to(element, {
            clipPath: `polygon(0 0, ${elementProgress * 100}% 0, ${elementProgress * 100}% 100%, 0 100%)`,
            duration: 0.1,
            ease: "none"
          });
        }
      });
    }
  };

  // Throttle des animations de scroll
  let scrollRAF;
  const throttledScroll = () => {
    if (scrollRAF) return;

    scrollRAF = requestAnimationFrame(() => {
      handleAnomalyParallax();
      handleTextReveal();
      scrollRAF = null;
    });
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Animation de "pulse" sur le titre au scroll
  const handleTitlePulse = () => {
    if (!title || !anomalySection) return;

    const rect = anomalySection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2) {
      const intensity = Math.sin(Date.now() * 0.002) * 0.1 + 1;

      gsap.to(title, {
        textShadow: `0 2px ${intensity * 15}px rgba(var(--color-primary-rgb), ${intensity * 0.3})`,
        duration: 0.1,
        ease: "none"
      });
    }
  };

  // Ajouter l'animation de pulse title
  setInterval(handleTitlePulse, 100);
});

// Fonction utilitaire pour rejouer l'animation
const replayAnomalyDetectionAnimation = () => {
  // Reset des états
  gsap.set('.anomaly-detection .title', { y: 40, opacity: 0 });
  gsap.set('.anomaly-detection .sub-title', { y: 30, opacity: 0 });
  gsap.set('.anomaly-detection .description', { y: 25, opacity: 0 });
  gsap.set('.anomaly-detection img', {
    x: 50,
    opacity: 0,
    scale: 0.95,
    clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
  });

  // Rejouer la séquence
  const anomalyTL = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  anomalyTL
    .to('.anomaly-detection .title', { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
    .to('.anomaly-detection .sub-title', { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.2)
    .to('.anomaly-detection .description', { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.4)
    .to('.anomaly-detection img', {
      x: 0,
      opacity: 1,
      scale: 1,
      clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
      duration: 1,
      ease: "power2.out"
    }, 0.3);
};