const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const params = new URLSearchParams(window.location.search);
const trackingFields = {
  'page-url': window.location.href,
  'utm-source': params.get('utm_source') || '',
  'utm-medium': params.get('utm_medium') || '',
  'utm-campaign': params.get('utm_campaign') || '',
  'gclid': params.get('gclid') || ''
};
Object.entries(trackingFields).forEach(([id, value]) => {
  const field = document.getElementById(id);
  if (field) field.value = value;
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

  formStatus?.classList.remove('success', 'error');
  if (formStatus) formStatus.textContent = 'Sending your request…';
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
  }

  try {
    const response = await fetch(leadForm.action, {
      method: 'POST',
      body: new FormData(leadForm),
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('Submission failed');

    const savedTracking = {...trackingFields};
    leadForm.reset();
    Object.entries(savedTracking).forEach(([id, value]) => {
      const field = document.getElementById(id);
      if (field) field.value = value;
    });
    if (formStatus) {
      formStatus.textContent = 'Thank you! Your request was sent successfully. Binoy will contact you soon.';
      formStatus.classList.add('success');
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event: 'generate_lead', form_name: 'Elegant Homes DFW Lead Form'});
  } catch (error) {
    if (formStatus) {
      formStatus.textContent = 'The form could not be sent. Please call or text Binoy at (469) 866-2644.';
      formStatus.classList.add('error');
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'Send My Request';
    }
  }
});
