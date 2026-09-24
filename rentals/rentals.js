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
  rentalForm.addEventListener('submit', (event) => {
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

    // Formspree's hosted CAPTCHA requires a normal browser POST. A fetch request
    // cannot complete its verification page, so submit only after local checks.
    if (formStatus) {
      formStatus.textContent = 'Continuing to secure verification...';
      formStatus.classList.remove('success', 'error');
    }
    rentalForm.submit();
  });
}
