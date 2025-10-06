(function () {
  emailjs.init({
    publicKey: "TotUWmvY7d08ta5FS",
  });
})();

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi…";

    emailjs.sendForm("service_p0id78t", "template_uhr7ovl", this)
      .then(() => {
        alert("✅ Message envoyé avec succès !");
        form.reset();

        // Supprime l'état de soumission pour éviter l'alerte au refresh
        history.replaceState(null, null, location.href);

        submitBtn.disabled = false;
        submitBtn.textContent = "Envoyer";
      })
      .catch((error) => {
        console.error(error);
        alert("❌ Une erreur est survenue. Réessaie plus tard.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Envoyer";
      });
  });

});

