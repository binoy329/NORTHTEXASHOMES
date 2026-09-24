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
const formLoadedAt = Date.now();

function isReserved555Number(value) {
  const digits = String(value || '').replace(/\D/g, '');
  const tenDigits = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  return /^\d{3}55501\d{2}$/.test(tenDigits);
}

if (rentalForm) {
  rentalForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!rentalForm.reportValidity()) return;

    const honeypot = rentalForm.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value.trim() !== '') return;

    if (Date.now() - formLoadedAt < 3000) {
      if (formStatus) {
        formStatus.textContent = 'Please wait a moment and submit again.';
        formStatus.classList.remove('success');
        formStatus.classList.add('error');
      }
      return;
    }

    const phoneField = rentalForm.querySelector('input[name="phone"]');
    if (phoneField && isReserved555Number(phoneField.value)) {
      if (formStatus) {
        formStatus.textContent = 'Please enter a valid phone number.';
        formStatus.classList.remove('success');
        formStatus.classList.add('error');
      }
      phoneField.focus();
      return;
    }

    const captcha = rentalForm.querySelector('[name="g-recaptcha-response"]');
    if (!captcha || !captcha.value) {
      if (formStatus) {
        formStatus.textContent = 'Please complete the security check.';
        formStatus.classList.remove('success');
        formStatus.classList.add('error');
      }
      return;
    }

    const submitButton = rentalForm.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
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
        gtag('event', 'rental_lead', { form_name: 'Elegant Homes DFW Rental Lead Form' });
      }
      rentalForm.reset();
      if (window.grecaptcha) window.grecaptcha.reset();
      Object.entries(trackingFields).forEach(([id, value]) => {
        const field = document.getElementById(id);
        if (field) field.value = value;
      });
    } catch (error) {
      console.error('Rental form submission error:', error);
      if (formStatus) {
        formStatus.textContent = 'Your request was not sent. Please complete the security check again or call (469) 866-2644.';
        formStatus.classList.add('error');
      }
      if (window.grecaptcha) window.grecaptcha.reset();
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
