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

leadForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!leadForm.reportValidity()) return;

  if (formStatus) formStatus.textContent = 'Sending…';
  if (submitButton) submitButton.disabled = true;

  try {
    const response = await fetch(leadForm.action, {
      method: 'POST',
      body: new FormData(leadForm),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Submission failed');

    leadForm.reset();
    if (formStatus) {
      formStatus.textContent = 'Thank you! Your information was sent successfully. Binoy will follow up soon.';
    }
  } catch (error) {
    if (formStatus) {
      formStatus.textContent = 'Sorry, the form could not be sent. Please call or text Binoy at (469) 866-2644.';
    }
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});
