document.addEventListener('DOMContentLoaded', () => {
  // Vérification si l'utilisateur préfère les animations réduites (accessibilité)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Animation réduite pour l'accessibilité
    gsap.set(['.logo', '.navbar', '.hero-content'], { opacity: 1 });
    return;
  }

  // Timeline principale pour orchestrer les animations
  const heroTL = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.8
    }
  });

  // États initiaux (pour éviter le FOUC - Flash of Unstyled Content)
  gsap.set('.hero-container', { opacity: 0 });
  gsap.set('.bg-video', { scale: 1.1, opacity: 0 });
  gsap.set('.logo img', { y: -30, opacity: 0 });
  gsap.set('.burger', { x: 30, opacity: 0 });
  gsap.set('.navbar ul li', { y: -20, opacity: 0 });
  gsap.set('.cta.btn', { y: -20, opacity: 0 });
  gsap.set('.title', { y: 50, opacity: 0 });
  gsap.set('.sub-title', { y: 30, opacity: 0 });
  gsap.set('.hero-content .cta', { y: 40, opacity: 0, scale: 0.95 });

  // Séquence d'animation
  heroTL
    // 1. Fade in global du hero
    .to('.hero-container', {
      opacity: 1,
      duration: 0.1
    })

    // 2. Animation de la vidéo de fond (subtle zoom out effect)
    .to('.bg-video', {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    }, 0.2)

    // 3. Animation du header (logo et navigation)
    .to('.logo img', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.2)"
    }, 0.4)

    .to('.burger', {
      x: 0,
      opacity: 1,
      duration: 0.5
    }, 0.5)

    .to('.navbar ul li', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    }, 0.6)

    .to('.navbar .cta.btn', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.1)"
    }, 0.8)

    // 4. Animation du contenu principal
    .to('.title', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, 0.7)

    .to('.sub-title', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power2.out"
    }, 0.9)

    .to('.hero-content .cta', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.1)"
    }, 1.1);

  // Animation hover sur le CTA principal (micro-interaction)
  const mainCTA = document.querySelector('.hero-content .cta');

  if (mainCTA) {
    mainCTA.addEventListener('mouseenter', () => {
      gsap.to(mainCTA, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    mainCTA.addEventListener('mouseleave', () => {
      gsap.to(mainCTA, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }

  // Animation du logo au hover (micro-interaction subtile)
  const logo = document.querySelector('.logo img');

  if (logo) {
    logo.addEventListener('mouseenter', () => {
      gsap.to(logo, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    logo.addEventListener('mouseleave', () => {
      gsap.to(logo, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }

  // Parallax subtil sur le scroll (optionnel - performance friendly)
  // let scrollTween;

  // const handleScroll = () => {
  //   const scrollY = window.scrollY;
  //   const heroHeight = document.querySelector('.hero').offsetHeight;

  //   // Parallax seulement quand le hero est visible
  //   if (scrollY < heroHeight) {
  //     if (scrollTween) scrollTween.kill();

  //     scrollTween = gsap.to('.bg-video', {
  //       yPercent: scrollY * 0.5,
  //       duration: 0.3,
  //       ease: "none"
  //     });
  //   }
  // };

  // // Throttle du scroll pour les performances
  // let scrollTimeout;
  // window.addEventListener('scroll', () => {
  //   if (scrollTimeout) {
  //     clearTimeout(scrollTimeout);
  //   }
  //   scrollTimeout = setTimeout(handleScroll, 16); // ~60fps
  // });

  // Animation pour le menu burger (si tu veux l'animer aussi)
  const burger = document.getElementById('burgerBtn');
  const navbar = document.getElementById('navbarMenu');

  if (burger && navbar) {
    burger.addEventListener('click', () => {
      const isOpen = navbar.classList.contains('active');

      if (!isOpen) {
        // Ouvrir le menu
        navbar.classList.add('active');
        gsap.fromTo('.navbar ul li',
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out"
          }
        );
      } else {
        // Fermer le menu
        gsap.to('.navbar ul li', {
          x: -30,
          opacity: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            navbar.classList.remove('active');
          }
        });
      }
    });
  }
});

// Fonction utilitaire pour refresh l'animation (utile en dev)
const refreshHeroAnimation = () => {
  location.reload();
};