// Entry point for initializing core modules
// This file also handles actions like sending email and printing the page

document.addEventListener('DOMContentLoaded', function () {
  initUI();                // UI toggles and visibility
  initPricing();           // Calculator logic
  initPatientModule();     // Optional DB integration
  initTextAreaAutoResize(); // Expands textareas dynamically

  // Print button
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', printPage);
  }

  // Send Email button
  const emailBtn = document.getElementById('sendEmailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', sendEmail);
  }
});

// Triggers browser print dialog
function printPage() {
  window.print();
}

// Collects form data and triggers email client with .txt export
function sendEmail() {
  // Patient Info
  const name = document.getElementById('namePt')?.value || '';
  const lastName = document.getElementById('lastNamePt')?.value || '';
  const dob = document.getElementById('patientDob')?.value || '';
  const pickup = document.getElementById('patientAddress')?.value || '';
  const destination = document.getElementById('destinationAddress')?.value || '';
  const aptTime = document.getElementById('aptTime')?.value || '';
  const special = document.getElementById('specialInstructions')?.value || '';

  // Return Ride
  const hasReturn = document.getElementById('hasReturnRide')?.checked;
  const returnTime = document.getElementById('returnPickUpTime')?.value || '';
  const returnPickup = document.getElementById('returnRidePickUpAddress')?.value || '';
  const returnDest = document.getElementById('returnDestinationAddress')?.value || '';

  // Calculator
  const enableCalc = document.getElementById('enableCalculator')?.checked;
  const resultText = document.getElementById('result')?.textContent || '';

  // Compose body text
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

  // Create and download .txt file
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `trip-${lastName || 'patient'}.txt`;
  link.click();
  URL.revokeObjectURL(url);

  // Open prefilled email
  const subject = encodeURIComponent(`Trip for ${name} ${lastName}`);
  const body = encodeURIComponent(text);
  const mailto = `mailto:?subject=${subject}&body=${body}`;
  window.open(mailto, '_blank');
}