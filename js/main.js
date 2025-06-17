// Entry point for initializing core modules
// This file also handles actions like sending email and printing the page

// Initialize UI modules when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  initUI(); // Toggles and dynamic UI logic
  initPricing(); // Calculator logic
  initPatientModule(); // Patient form logic (optional/future DB)
  initTextAreaAutoResize(); // Expands textareas to fit content

  // Attach Print button functionality
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', printPage);
  }

  // Attach Send Email button functionality
  const emailBtn = document.getElementById('sendEmailBtn');
  if (emailBtn) {
    emailBtn.addEventListener('click', sendEmail);
  }
});

// Trigger browser print dialog
function printPage() {
  window.print();
}

// Compose and send trip summary via email
function sendEmail() {
  // Collect basic patient information
  const name = document.getElementById('namePt')?.value || '';
  const lastName = document.getElementById('lastNamePT')?.value || '';
  const dob = document.getElementById('patientDOB')?.value || '';
  const pickup = document.getElementById('patientAddress')?.value || '';
  const destination = document.getElementById('destinationAddress')?.value || '';
  const aptTime = document.getElementById('aptTime')?.value || '';
  const special = document.getElementById('specialInstructions')?.value || '';

  // Return ride details if enabled
  const hasReturn = document.getElementById('HasAReturnRide')?.checked;
  const returnTime = document.getElementById('returnPickUpTime')?.value || '';
  const returnPickup = document.getElementById('returnRidePickUpAddress')?.value || '';
  const returnDest = document.getElementById('returnDestinationAddress')?.value || '';
  const waitingCharge = document.getElementById('waitingTimeChargeReturn')?.value || '';

  // Include pricing if calculator is enabled
  const enableCalc = document.getElementById('enableCalculator')?.checked;
  const resultText = document.getElementById('result')?.textContent || '';

  // Build the message text
  let text = `Patient Info:
Name: ${name} ${lastName}
DOB: ${dob}
Pick Up Address: ${pickup}
Destination Address: ${destination}
Appointment Time: ${aptTime}
Special Instructions: ${special}`;

  if (hasReturn) {
    text += `\n\nReturn Ride:\nReturn Pick Up Time: ${returnTime}\nReturn Pick Up Address: ${returnPickup}\nReturn Destination Address: ${returnDest}\nWaiting Time Charge: $${waitingCharge}`;
  }

  if (enableCalc && resultText.trim() !== '') {
    text += `\n\nPrice Estimate:\n${resultText}`;
  }

  // Export data as a text file
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `trip-${lastName || 'patient'}.txt`;
  link.click();
  URL.revokeObjectURL(url);

  // Prepare and open email draft
  const subject = encodeURIComponent(`Trip for ${name} ${lastName}`);
  const body = encodeURIComponent(text);
  const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
  window.open(mailtoLink, '_blank');
}
