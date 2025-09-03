document.addEventListener('DOMContentLoaded', () => {
  // Ton code ici

  // Sélection des boutons de période
  const tabButtons = document.querySelectorAll('.tab-btn');

  // Sélection de tous les éléments .plan-price et .plan-period
  const planPrices = document.querySelectorAll('.plan-price');
  const planPeriods = document.querySelectorAll('.plan-period');

  // Objet des périodes correspondantes
  const periods = {
    weekly: '/ semaine',
    monthly: '/ mois',
    yearly: '/ an'
  };

  // Fonction pour mettre à jour prix et période
  function updatePlans(periodKey) {
    planPrices.forEach(priceSpan => {
      // Récupérer le prix correspondant à la période depuis les data-*
      const price = priceSpan.dataset[`${periodKey}Price`];
      priceSpan.textContent = price;
    });

    planPeriods.forEach(periodSpan => {
      periodSpan.textContent = periods[periodKey];
    });
  }

  // Ajout des événements clic sur les onglets
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Retirer la classe active de tous les boutons
      tabButtons.forEach(b => b.classList.remove('active'));
      // Ajouter la classe active au bouton cliqué
      btn.classList.add('active');

      // Récupérer le plan sélectionné (weekly, monthly, yearly)
      const planKey = btn.dataset.plan;
      updatePlans(planKey);
    });
  });

});
