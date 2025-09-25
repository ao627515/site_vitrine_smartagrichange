// Animation de la section Stores - By Az
// Animation split moderne avec CTA stores et preview app

document.addEventListener('DOMContentLoaded', () => {
  // Vérification accessibilité
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.stores p, .stores .stores-container img, .stores .app-image', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.stores p', { y: 30, opacity: 0 });
  gsap.set('.stores .stores-container img', {
    y: 40,
    opacity: 0,
    scale: 0.9
  });
  gsap.set('.stores .app-image', {
    x: 100,
    y: 50,
    opacity: 0,
    scale: 1.2
  });

  // Timeline principale
  const storesTL = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  // Séquence d'animation
  storesTL
    // Animation du texte d'intro
    .to('.stores p', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out"
    })

    // Animation des boutons stores
    .to('.stores .stores-container img', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.2)"
    }, 0.3)

    // Animation de l'app preview
    .to('.stores .app-image', {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1.5, // Garde le scale CSS original
      duration: 1,
      ease: "power2.out"
    }, 0.5);

  // Intersection Observer
  const storesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        storesTL.play();
        storesObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observer la section
  const storesSection = document.querySelector('.stores');
  if (storesSection) {
    storesObserver.observe(storesSection);
  }

  // Micro-interactions sur les boutons stores
  const storeButtons = document.querySelectorAll('.stores .stores-container img');

  storeButtons.forEach((button, index) => {
    // Animation hover sophistiquée
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.1,
        y: -5,
        filter: 'brightness(110%) saturate(110%)',
        duration: 0.3,
        ease: "back.out(1.2)"
      });

      // Animation des autres boutons (effet de groupe)
      storeButtons.forEach((otherButton, otherIndex) => {
        if (otherIndex !== index) {
          gsap.to(otherButton, {
            scale: 0.95,
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        y: 0,
        filter: 'brightness(100%) saturate(100%)',
        duration: 0.3,
        ease: "power2.out"
      });

      // Retour normal pour tous les boutons
      storeButtons.forEach((otherButton) => {
        gsap.to(otherButton, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Animation de click (feedback tactile)
    button.addEventListener('click', () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    });

    // Accessibilité
    button.setAttribute('tabindex', '0');
    button.setAttribute('role', 'button');
    const storeName = button.alt.includes('Apple') ? 'App Store' : 'Google Play Store';
    button.setAttribute('aria-label', `Télécharger sur ${storeName}`);

    button.addEventListener('focus', () => {
      gsap.to(button, {
        scale: 1.1,
        outline: '3px solid rgba(59, 130, 246, 0.5)',
        outlineOffset: '4px',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    button.addEventListener('blur', () => {
      gsap.to(button, {
        scale: 1,
        outline: 'none',
        outlineOffset: '0px',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    // Navigation clavier
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Animation sophistiquée de l'app preview
  const appImage = document.querySelector('.stores .app-image');

  if (appImage) {
    // Animation hover avec effet de profondeur
    appImage.addEventListener('mouseenter', () => {
      gsap.to(appImage, {
        scale: 1.55,
        rotationY: -2,
        rotationX: 1,
        filter: 'brightness(105%) contrast(105%)',
        duration: 0.4,
        ease: "power2.out"
      });
    });

    appImage.addEventListener('mouseleave', () => {
      gsap.to(appImage, {
        scale: 1.5,
        rotationY: 0,
        rotationX: 0,
        filter: 'brightness(100%) contrast(100%)',
        duration: 0.4,
        ease: "power2.out"
      });
    });

    // Effet de "floating" subtil
    const createAppFloating = () => {
      gsap.to(appImage, {
        y: -10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });

      gsap.to(appImage, {
        rotationZ: 1,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });
    };

    // Démarrer le floating après l'animation principale
    storesTL.call(createAppFloating, null, null, 1.5);
  }

  // Parallax subtil entre contenu et app
  let storesParallaxTween;

  const handleStoresParallax = () => {
    if (!storesSection) return;

    const rect = storesSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      // Parallax opposé
      const contentOffset = (scrollProgress - 0.5) * -15;
      const appOffset = (scrollProgress - 0.5) * 20;

      if (storesParallaxTween) storesParallaxTween.kill();

      const contentContainer = document.querySelector('.stores .content-container');

      gsap.to(contentContainer, {
        y: contentOffset,
        duration: 0.3,
        ease: "none"
      });

      gsap.to(appImage, {
        y: appOffset,
        duration: 0.3,
        ease: "none"
      });
    }
  };

  // Animation des stores buttons au scroll (effet wave)
  const handleStoresWave = () => {
    if (!storesSection) return;

    const rect = storesSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
      const progress = (windowHeight * 0.8 - rect.top) / (windowHeight * 0.6);
      const waveOffset = Math.sin(progress * Math.PI * 2) * 5;

      storeButtons.forEach((button, index) => {
        gsap.to(button, {
          y: waveOffset + (index * 2), // Décalage par bouton
          duration: 0.1,
          ease: "none"
        });
      });
    }
  };

  // Animation de "glow" sur les boutons stores
  const createStoresGlow = () => {
    storeButtons.forEach((button, index) => {
      gsap.to(button, {
        filter: 'drop-shadow(0 4px 15px rgba(59, 130, 246, 0.3))',
        duration: 2 + (index * 0.3),
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        delay: index * 0.5
      });
    });
  };

  // Démarrer l'effet glow après l'animation principale
  storesTL.call(createStoresGlow, null, null, 1.8);

  // Animation de "typing" sur le texte
  const createTypingEffect = () => {
    const textElement = document.querySelector('.stores p');
    if (!textElement) return;

    const text = textElement.textContent;
    textElement.textContent = '';
    textElement.style.opacity = '1';

    let currentIndex = 0;
    const typingSpeed = 50;

    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        textElement.textContent += text[currentIndex];
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, typingSpeed);
  };

  // Démarrer l'effet typing après l'animation du texte
  storesTL.call(createTypingEffect, null, null, 0.5);

  // Animation magnétique entre les boutons stores
  const createMagneticStores = () => {
    storeButtons.forEach((button) => {
      let mouseX = 0;
      let mouseY = 0;
      let isHovering = false;

      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX = (e.clientX - centerX) / rect.width * 8;
        mouseY = (e.clientY - centerY) / rect.height * 8;

        if (isHovering) {
          gsap.to(button, {
            x: mouseX,
            y: mouseY,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      button.addEventListener('mouseenter', () => {
        isHovering = true;
      });

      button.addEventListener('mouseleave', () => {
        isHovering = false;
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });
  };

  // Activer l'effet magnétique après l'animation principale
  storesTL.call(createMagneticStores, null, null, 1.2);

  // Throttle des animations de scroll
  let scrollRAF;
  const throttledScroll = () => {
    if (scrollRAF) return;

    scrollRAF = requestAnimationFrame(() => {
      handleStoresParallax();
      handleStoresWave();
      scrollRAF = null;
    });
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });
});

// Fonction utilitaire pour rejouer l'animation
const replayStoresAnimation = () => {
  // Reset des états
  gsap.set('.stores p', { y: 30, opacity: 0 });
  gsap.set('.stores .stores-container img', { y: 40, opacity: 0, scale: 0.9 });
  gsap.set('.stores .app-image', { x: 100, y: 50, opacity: 0, scale: 1.2 });

  // Rejouer la séquence
  const storesTL = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  storesTL
    .to('.stores p', { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
    .to('.stores .stores-container img', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.2)"
    }, 0.3)
    .to('.stores .app-image', {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1.5,
      duration: 1,
      ease: "power2.out"
    }, 0.5);
};