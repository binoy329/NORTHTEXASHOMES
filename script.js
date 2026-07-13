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
  const areaField = document.getElementById("preferredArea");
  const budgetField = document.getElementById("preferredBudget");

  [...areaField.options].some(option => {
    if (option.value === city || option.text === city) {
      areaField.value = option.value;
      return true;
    }
    return false;
  });
  budgetField.value = budget;
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("year").textContent = new Date().getFullYear();
