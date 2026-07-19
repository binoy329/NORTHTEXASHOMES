document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.desktop-nav');
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-interest]').forEach((link) => {
  link.addEventListener('click', () => {
    const select = document.getElementById('interest');
    if (select) select.value = link.dataset.interest;
  });
});

const leadForm = document.getElementById('lead-form');
const formStatus = document.getElementById('form-status');
const submitButton = leadForm?.querySelector('button[type="submit"]');
const googleFormTarget = document.getElementById('google-form-target');
let submissionInProgress = false;

leadForm?.addEventListener('submit', (event) => {
  if (!leadForm.reportValidity()) {
    event.preventDefault();
    return;
  }

  submissionInProgress = true;
  if (formStatus) formStatus.textContent = 'Sending…';
  if (submitButton) submitButton.disabled = true;
});

googleFormTarget?.addEventListener('load', () => {
  if (!submissionInProgress) return;

  submissionInProgress = false;
  leadForm?.reset();
  if (formStatus) {
    formStatus.textContent = 'Thank you! Your information was sent successfully. Binoy will follow up soon.';
  }
  if (submitButton) submitButton.disabled = false;
});
