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
const params = new URLSearchParams(location.search);
if (params.get('submitted') === 'true') {
  const card = document.querySelector('.contact-card');
  const message = document.createElement('p');
  message.className = 'submission-success';
  message.textContent = 'Thank you. Your message was submitted, and Binoy will follow up soon.';
  card?.prepend(message);
}
