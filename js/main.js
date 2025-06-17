// Entry point for initializing core modules
document.addEventListener('DOMContentLoaded', function () {
  initUI();                  // Dynamic field toggles
  initPricing();             // Price calculator logic
  initPatientModule();       // Placeholder for future DB work
  initTextAreaAutoResize();  // Textarea auto-height

  // Print button
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  // Send Email button
  const emailBtn = document.getElementById('sendEmailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', sendEmail);
  }
});

// Email handler
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

  // Save to .txt
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `trip-${lastName || 'patient'}.txt`;
  link.click();
  URL.revokeObjectURL(url);

  // Open mailto link
  const subject = encodeURIComponent(`Trip for ${name} ${lastName}`);
  const body = encodeURIComponent(text);
  const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
}

// Auto-expand textareas
function initTextAreaAutoResize() {
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });

    // Initial resize
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  });
}