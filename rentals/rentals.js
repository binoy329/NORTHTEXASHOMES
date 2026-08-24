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

const rentalForm = document.getElementById('rental-lead-form');
const formStatus = document.getElementById('form-status');

if (rentalForm) {
  rentalForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!rentalForm.reportValidity()) return;

    const submitButton = rentalForm.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : 'Send Me Rental Options';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    if (formStatus) {
      formStatus.textContent = 'Sending your rental request...';
      formStatus.classList.remove('success', 'error');
    }

    try {
      const response = await fetch(rentalForm.action, {
        method: 'POST',
        body: new FormData(rentalForm),
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error(`Formspree returned ${response.status}`);

      if (formStatus) {
        formStatus.textContent = 'Thank you! Your rental request was sent successfully. Binoy will contact you soon.';
        formStatus.classList.add('success');
      }

      if (typeof gtag === 'function') {
        gtag('event', 'rental_lead', {
          form_name: 'Elegant Homes DFW Rental Lead Form'
        });
      }

      rentalForm.reset();
      Object.entries(trackingFields).forEach(([id, value]) => {
        const field = document.getElementById(id);
        if (field) field.value = value;
      });
    } catch (error) {
      console.error('Rental form submission error:', error);
      if (formStatus) {
        formStatus.textContent = 'Sorry, your request could not be sent. Please try again or call (469) 866-2644.';
        formStatus.classList.add('error');
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    }
  });
}
