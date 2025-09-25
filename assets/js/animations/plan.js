// Animation de la section Plans - By Az
// Pricing section avec tabs interactifs et animations de cartes

document.addEventListener('DOMContentLoaded', () => {
  // Vérification accessibilité
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.plans-title, .plans-tabs, .plan-card', { opacity: 1 });
    return;
  }

  // États initiaux
  gsap.set('.plans-title', { y: 40, opacity: 0 });
  gsap.set('.plans-tabs', { y: 30, opacity: 0 });
  gsap.set('.plan-card', {
    y: 60,
    opacity: 0,
    scale: 0.95,
    rotationY: 5
  });

  // Timeline principale
  const plansTL = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  // Séquence d'animation
  plansTL
    // Animation du titre
    .to('.plans-title', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out"
    })

    // Animation des tabs
    .to('.plans-tabs', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, 0.2)

    // Animation des cartes de pricing
    .to('.plan-card', {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 0.8,
      stagger: 0.15, // Décalage entre les cartes
      ease: "back.out(1.1)"
    }, 0.4);

  // Intersection Observer
  const plansObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        plansTL.play();
        plansObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observer la section
  const plansSection = document.querySelector('.plans');
  if (plansSection) {
    plansObserver.observe(plansSection);
  }

  // Gestion des onglets de période
  const tabButtons = document.querySelectorAll('.tab-btn');
  const planCards = document.querySelectorAll('.plan-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedPlan = button.dataset.plan;

      // Animation de changement d'onglet actif
      tabButtons.forEach(btn => {
        gsap.to(btn, {
          scale: btn === button ? 1.05 : 1,
          duration: 0.3,
          ease: "power2.out"
        });
        btn.classList.remove('active');
      });
      button.classList.add('active');

      // Animation des prix
      updatePrices(selectedPlan);

      // Animation des périodes
      updatePeriods(selectedPlan);
    });

    // Accessibilité et hover
    button.addEventListener('mouseenter', () => {
      if (!button.classList.contains('active')) {
        gsap.to(button, {
          scale: 1.05,
          backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    button.addEventListener('mouseleave', () => {
      if (!button.classList.contains('active')) {
        gsap.to(button, {
          scale: 1,
          backgroundColor: 'var(--color-bg)',
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  });

  // Fonction pour mettre à jour les prix avec animation
  const updatePrices = (period) => {
    const priceElements = document.querySelectorAll('.plan-price');

    priceElements.forEach(priceEl => {
      const weeklyPrice = priceEl.dataset.weeklyPrice;
      const monthlyPrice = priceEl.dataset.monthlyPrice;
      const yearlyPrice = priceEl.dataset.yearlyPrice;

      let newPrice;
      switch (period) {
        case 'weekly':
          newPrice = weeklyPrice;
          break;
        case 'monthly':
          newPrice = monthlyPrice;
          break;
        case 'yearly':
          newPrice = yearlyPrice;
          break;
        default:
          newPrice = monthlyPrice;
      }

      // Animation de changement de prix
      gsap.to(priceEl, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          priceEl.textContent = newPrice;
          gsap.to(priceEl, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
    });
  };

  // Fonction pour mettre à jour les périodes
  const updatePeriods = (period) => {
    const periodElements = document.querySelectorAll('.plan-period');

    let periodText;
    switch (period) {
      case 'weekly':
        periodText = '/ semaine';
        break;
      case 'monthly':
        periodText = '/ mois';
        break;
      case 'yearly':
        periodText = '/ an';
        break;
      default:
        periodText = '/ mois';
    }

    periodElements.forEach(periodEl => {
      gsap.to(periodEl, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          periodEl.textContent = periodText;
          gsap.to(periodEl, {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
    });
  };

  // Micro-interactions sur les cartes de pricing
  planCards.forEach((card, index) => {
    const planBtn = card.querySelector('.plan-btn');
    const planFeatures = card.querySelectorAll('.plan-feature');

    // Animation hover sophistiquée
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.03,
        y: -10,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        duration: 0.4,
        ease: "power2.out"
      });

      // Animation des features au hover
      gsap.to(planFeatures, {
        x: 5,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(planFeatures, {
        x: 0,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out"
      });
    });

    // Animation du bouton CTA
    if (planBtn) {
      planBtn.addEventListener('mouseenter', () => {
        gsap.to(planBtn, {
          scale: 1.05,
          y: -2,
          duration: 0.3,
          ease: "back.out(1.2)"
        });
      });

      planBtn.addEventListener('mouseleave', () => {
        gsap.to(planBtn, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      // Animation de click
      planBtn.addEventListener('click', () => {
        gsap.to(planBtn, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      });
    }

    // Accessibilité
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    const planName = card.querySelector('.plan-name')?.textContent || `Plan ${index + 1}`;
    card.setAttribute('aria-label', planName);

    card.addEventListener('focus', () => {
      gsap.to(card, {
        scale: 1.03,
        outline: '3px solid rgba(59, 130, 246, 0.5)',
        outlineOffset: '4px',
        duration: 0.3,
        ease: "power2.out"
      });
    });

    card.addEventListener('blur', () => {
      gsap.to(card, {
        scale: 1,
        outline: 'none',
        outlineOffset: '0px',
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Animation spéciale pour la carte "recommandée" (active)
  const activeCard = document.querySelector('.plan-card.active');
  if (activeCard) {
    // Animation de pulsation subtile
    const createActiveCardPulse = () => {
      gsap.to(activeCard, {
        boxShadow: '0 15px 35px rgba(var(--color-primary-rgb), 0.2)',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });
    };

    // Démarrer la pulsation après l'animation principale
    plansTL.call(createActiveCardPulse, null, null, 1.5);
  }

  // Animation des features individuelles au scroll
  const handleFeaturesAnimation = () => {
    const features = document.querySelectorAll('.plan-feature');

    features.forEach((feature, index) => {
      const rect = feature.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1) {
        const icon = feature.querySelector('i');
        const isIncluded = !feature.classList.contains('plan-feature-missing');

        // Animation des icônes selon leur type
        if (icon && isIncluded) {
          gsap.to(icon, {
            color: 'var(--color-primary)',
            scale: 1.2,
            duration: 0.3,
            ease: "back.out(1.2)",
            delay: index * 0.02
          });
        }
      }
    });
  };

  // Animation de comparaison entre les plans
  const createComparisonEffect = () => {
    planCards.forEach((card, index) => {
      // Animation décalée pour créer un effet de comparaison
      gsap.to(card, {
        y: Math.sin(index * Math.PI / 3) * 5,
        duration: 4 + (index * 0.5),
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });
    });
  };

  // Démarrer l'effet de comparaison après l'animation principale
  plansTL.call(createComparisonEffect, null, null, 2);

  // Animation des prix (effet de compteur)
  const animatePriceCounters = () => {
    const priceElements = document.querySelectorAll('.plan-price');

    priceElements.forEach((priceEl, index) => {
      const finalPrice = parseInt(priceEl.textContent);
      const counter = { value: 0 };

      gsap.to(counter, {
        value: finalPrice,
        duration: 1 + (index * 0.2),
        ease: "power2.out",
        delay: index * 0.3,
        onUpdate: () => {
          priceEl.textContent = Math.round(counter.value);
        },
        onComplete: () => {
          priceEl.textContent = finalPrice; // Assurer la valeur finale
        }
      });
    });
  };

  // Démarrer les compteurs de prix après l'animation des cartes
  plansTL.call(animatePriceCounters, null, null, 1);

  // Parallax subtil sur les cartes
  let plansParallaxTween;

  const handlePlansParallax = () => {
    if (!plansSection) return;

    const rect = plansSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      planCards.forEach((card, index) => {
        const offset = (index - 1) * 3; // Carte du milieu reste fixe
        const parallaxAmount = scrollProgress * offset;

        if (plansParallaxTween) plansParallaxTween.kill();

        gsap.to(card, {
          y: parallaxAmount,
          duration: 0.3,
          ease: "none"
        });
      });
    }
  };

  // Animation des bonus et tags spéciaux
  const animateSpecialTags = () => {
    const bonus = document.querySelector('.plan-bonus');

    if (bonus) {
      gsap.to(bonus, {
        scale: 1.05,
        color: 'var(--color-secondary)',
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });
    }
  };

  // Démarrer l'animation des tags spéciaux
  plansTL.call(animateSpecialTags, null, null, 2.5);

  // Throttle des animations de scroll
  let scrollRAF;
  const throttledScroll = () => {
    if (scrollRAF) return;

    scrollRAF = requestAnimationFrame(() => {
      handlePlansParallax();
      handleFeaturesAnimation();
      scrollRAF = null;
    });
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });

  // Animation de révélation progressive des features
  const handleFeaturesReveal = () => {
    const allFeatures = document.querySelectorAll('.plan-feature');

    allFeatures.forEach((feature, index) => {
      gsap.to(feature, {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        opacity: 1,
        duration: 0.3,
        delay: index * 0.02,
        ease: "power2.out"
      });
    });
  };

  // Démarrer la révélation des features après l'animation des cartes
  plansTL.call(handleFeaturesReveal, null, null, 1.2);
});

// Fonction utilitaire pour rejouer l'animation
const replayPlansAnimation = () => {
  // Reset des états
  gsap.set('.plans-title', { y: 40, opacity: 0 });
  gsap.set('.plans-tabs', { y: 30, opacity: 0 });
  gsap.set('.plan-card', { y: 60, opacity: 0, scale: 0.95, rotationY: 5 });

  // Rejouer la séquence
  const plansTL = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  plansTL
    .to('.plans-title', { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
    .to('.plans-tabs', { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 0.2)
    .to('.plan-card', {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.1)"
    }, 0.4);
};