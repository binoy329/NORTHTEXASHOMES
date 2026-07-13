const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("quickSearchForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const budget = document.getElementById("budget").value;
  const subject = encodeURIComponent(`Home search request: ${city}`);
  const body = encodeURIComponent(
    `Hi Binoy,\n\nI am interested in homes in ${city} with a price range of ${budget}.\n\nPlease contact me to discuss available options.\n\nThank you.`
  );
  window.location.href = `mailto:srshomes329@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById("leadForm")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const area = document.getElementById("preferredArea").value;
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`New buyer inquiry from ${firstName} ${lastName}`);
  const body = encodeURIComponent(
`Hi Binoy,

I would like help with my home search.

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || "Not provided"}
Preferred area: ${area}

Message:
${message || "Please contact me to discuss my home search."}

Thank you.`
  );

  window.location.href = `mailto:srshomes329@gmail.com?subject=${subject}&body=${body}`;
});
