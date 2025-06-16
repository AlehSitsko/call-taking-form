// Send Email Module
function sendEmail() {
  // Basic patient info
  const name = document.getElementById('namePt')?.value || '';
  const lastName = document.getElementById('lastNamePT')?.value || '';
  const dob = document.getElementById('patientDOB')?.value || '';
  const pickup = document.getElementById('patientAddress')?.value || '';
  const destination = document.getElementById('destinationAddress')?.value || '';
  const aptTime = document.getElementById('aptTime')?.value || '';
  const special = document.getElementById('specialInstructions')?.value || '';

  // Return ride (optional)
  const hasReturn = document.getElementById('HasAReturnRide')?.checked;
  const returnTime = document.getElementById('returnPickUpTime')?.value || '';
  const returnPickup = document.getElementById('returnRidePickUpAddress')?.value || '';
  const returnDest = document.getElementById('returnDestinationAddress')?.value || '';
  const waitingCharge = document.getElementById('waitingTimeChargeReturn')?.value || '';

  // Price (optional)
  const enableCalc = document.getElementById('enableCalculator')?.checked;
  const resultText = document.getElementById('result')?.textContent || '';

  // Compose body
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
Return Destination Address: ${returnDest}
Waiting Time Charge: $${waitingCharge}`;
  }

  if (enableCalc && resultText.trim() !== '') {
    text += `

Price Estimate:
${resultText}`;
  }

  // Create and download .txt file
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `trip-${lastName || 'patient'}.txt`;
  link.click();
  URL.revokeObjectURL(url);

  // Launch mail client
  const subject = encodeURIComponent(`Trip for ${name} ${lastName}`);
  const body = encodeURIComponent(text);
  const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
}

// Entry point: initialization logic
document.addEventListener('DOMContentLoaded', function () {
  initUI();
  initPricing();
  initPatientModule();
  initTextAreaAutoResize();

  // Attach email button handler
  const emailBtn = document.getElementById('sendEmailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', sendEmail);
  }
});