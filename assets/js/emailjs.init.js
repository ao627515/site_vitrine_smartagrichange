(function () {
  emailjs.init({
    publicKey: "TotUWmvY7d08ta5FS",
  });
})();

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm("service_p0id78t", "template_uhr7ovl", this)
      .then(() => {
        alert("✅ Message envoyé avec succès !");
        form.reset();
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi :", error);
        alert("❌ Une erreur est survenue. Réessaie plus tard.");
      });
  });
});