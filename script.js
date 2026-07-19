document.getElementById('year').textContent = new Date().getFullYear();
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.desktop-nav');
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.desktop-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
  const select = document.getElementById('interest');
  if (select) select.value = link.dataset.interest;
}));
const leadForm = document.getElementById('lead-form');
const formTarget = document.getElementById('google-form-target');
const formStatus = document.getElementById('form-status');
let formSubmitted = false;

leadForm?.addEventListener('submit', () => {
  formSubmitted = true;
  if (formStatus) formStatus.textContent = 'Sending…';
});

formTarget?.addEventListener('load', () => {
  if (!formSubmitted) return;
  if (formStatus) formStatus.textContent = 'Thank you! Your information was sent successfully. Binoy will follow up soon.';
  leadForm?.reset();
  formSubmitted = false;
});
