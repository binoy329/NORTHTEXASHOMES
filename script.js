const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("quickSearchForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const budget = document.getElementById("budget").value;
  document.getElementById("preferredArea").value = city;
  document.getElementById("preferredBudget").value = budget;
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("leadForm")?.addEventListener("submit", event => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const area = document.getElementById("preferredArea").value;
  const budget = document.getElementById("preferredBudget").value;
  const message = document.getElementById("message").value.trim();

  const subject = `New buyer lead: ${firstName} ${lastName}`;
  const body = [
    "New buyer inquiry from the Elegant Homes website",
    "",
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Preferred area: ${area}`,
    `Price range: ${budget || "Not provided"}`,
    "",
    "Message:",
    message || "No additional message"
  ].join("\n");

  window.location.href = `mailto:srshomes329@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
