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



document.getElementById("year").textContent = new Date().getFullYear();
