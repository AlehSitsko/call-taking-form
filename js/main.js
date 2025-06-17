document.addEventListener('DOMContentLoaded', function () {
  initUI();                  // UI toggles and visibility
  initPricing();             // Calculator logic
  initPatientModule();       // Optional DB integration
  initTextAreaAutoResize();  // Expands textareas dynamically

  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', printPage);
  }

  const emailBtn = document.getElementById('sendEmailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', sendEmail);
  }
});

// Triggers browser print dialog after applying height to all textareas
function printPage() {
  applyTextareaHeights();
  setTimeout(() => window.print(), 50); // slight delay to ensure layout updates
}

// Ensure textareas auto-resize visually
function initTextAreaAutoResize() {
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    resize(textarea);
    textarea.addEventListener('input', () => resize(textarea));
  });

  function resize(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }
}

// Apply scrollHeight directly before print
function applyTextareaHeights() {
  document.querySelectorAll('textarea').forEach(textarea => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    textarea.setAttribute('style', `height: ${textarea.scrollHeight}px;`);
  });
}

// beforeprint fallback
window.addEventListener('beforeprint', applyTextareaHeights);

// Collects form data and triggers email client with .txt export
function sendEmail() {
  const name = document.getElementById('namePt')?.value || '';
  const lastName = document.getElementById('lastNamePt')?.value || '';
  const dob = document.getElementById('patientDob')?.value || '';
  const pickup = document.getElementById('patientAddress')?.value || '';
  const destination = document.getElementById('destinationAddress')?.value || '';
  const aptTime = document.getElementById('aptTime')?.value || '';
  const special = document.getElementById('specialInstructions')?.value || '';

  const hasReturn = document.getElementById('hasReturnRide')?.checked;
  const returnTime = document.getElementById('returnPickUpTime')?.value || '';
  const returnPickup = document.getElementById('returnRidePickUpAddress')?.value || '';
  const returnDest = document.getElementById('returnDestinationAddress')?.value || '';

  const enableCalc = document.getElementById('enableCalculator')?.checked;
  const resultText = document.getElementById('result')?.textContent || '';

  let text = `Patient Info:
Name: ${name} ${lastName}
DOB: ${dob}
Pick Up Address: ${pickup}
Destination Address: ${destination}
Appointment Time: ${aptTime}
Special Instructions: ${special}`;

  if (hasReturn) {
    text += `

Return Ride:
Return Pick Up Time: ${returnTime}
Return Pick Up Address: ${returnPickup}
Return Destination Address: ${returnDest}`;
  }

  if (enableCalc && resultText.trim() !== '') {
    text += `

Price Estimate:
${resultText}`;
  }

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `trip-${lastName || 'patient'}.txt`;
  link.click();
  URL.revokeObjectURL(url);

  const subject = encodeURIComponent(`Trip for ${name} ${lastName}`);
  const body = encodeURIComponent(text);
  const mailto = `mailto:?subject=${subject}&body=${body}`;
  window.open(mailto, '_blank');
}
