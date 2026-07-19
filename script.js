document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = [...document.querySelectorAll(".service-card")];
  const interestRadios = [...document.querySelectorAll('input[name="Interest"]')];
  const form = document.getElementById("lead-form");
  const year = document.getElementById("year");
  const sourceField = document.getElementById("lead-source");

  year.textContent = new Date().getFullYear();

  const params = new URLSearchParams(window.location.search);
  const sourceParts = [];
  ["utm_source", "utm_medium", "utm_campaign", "gclid"].forEach((key) => {
    if (params.get(key)) sourceParts.push(`${key}: ${params.get(key)}`);
  });
  if (sourceParts.length) sourceField.value = sourceParts.join(" | ");

  function chooseService(service) {
    serviceCards.forEach((card) => {
      const selected = card.dataset.service === service;
      card.classList.toggle("selected", selected);
      card.setAttribute("aria-checked", selected ? "true" : "false");
    });

    const matchingRadio = interestRadios.find((radio) => radio.value === service);
    if (matchingRadio) matchingRadio.checked = true;

    form.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  serviceCards.forEach((card) => {
    card.addEventListener("click", () => chooseService(card.dataset.service));
  });

  interestRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      serviceCards.forEach((card) => {
        const selected = card.dataset.service === radio.value;
        card.classList.toggle("selected", selected);
        card.setAttribute("aria-checked", selected ? "true" : "false");
      });
    });
  });

  if (params.get("submitted") === "true") {
    const message = document.createElement("p");
    message.className = "success-message";
    message.textContent = "Thank you. Your message was submitted, and Binoy will follow up soon.";
    form.prepend(message);
  }

  // Ready for Google Ads conversion events after tracking IDs are added.
  document.querySelectorAll(".track-call").forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "phone_call_click", { event_category: "lead" });
      }
    });
  });

  document.querySelectorAll(".track-text").forEach((link) => {
    link.addEventListener("click", () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "text_message_click", { event_category: "lead" });
      }
    });
  });
});
