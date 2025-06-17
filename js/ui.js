// Initialize all UI-related listeners and visibility handlers
function initUI() {
  // Show/hide 'Other Caller Type' input
  const callerType = document.getElementById('callerType');
  const otherCaller = document.getElementById('otherCallerType');
  if (callerType && otherCaller) {
    callerType.addEventListener('change', function () {
      otherCaller.classList.toggle('hidden', this.value !== 'other');
    });
    otherCaller.classList.toggle('hidden', callerType.value !== 'other');
  }

  // Show/hide Return Ride section and autofill return addresses
  const returnRideCheckbox = document.getElementById('hasReturnRide');
  const returnRideSection = document.getElementById('returnRideSection');
  if (returnRideCheckbox && returnRideSection) {
    returnRideCheckbox.addEventListener('change', function () {
      const show = this.checked;
      returnRideSection.classList.toggle('hidden', !show);
      if (show) {
        const pickup = document.getElementById('patientAddress')?.value || '';
        const destination = document.getElementById('destinationAddress')?.value || '';
        document.getElementById('returnRidePickUpAddress').value = destination;
        document.getElementById('returnDestinationAddress').value = pickup;
      } else {
        document.getElementById('returnRidePickUpAddress').value = '';
        document.getElementById('returnDestinationAddress').value = '';
      }
    });
    returnRideSection.classList.toggle('hidden', !returnRideCheckbox.checked);
  }

  // Show/hide Price Calculator
  const enableCalcCheckbox = document.getElementById('enableCalculator');
  const calcFields = document.getElementById('calculatorFields');
  if (enableCalcCheckbox && calcFields) {
    calcFields.classList.toggle('hidden', !enableCalcCheckbox.checked);
    enableCalcCheckbox.addEventListener('change', function () {
      calcFields.classList.toggle('hidden', !this.checked);
    });
  }

  // Toggle Fixed Price input
  const serviceType = document.getElementById('serviceType');
  const fixedPriceField = document.getElementById('fixedPrice');
  const fixedPriceLabel = document.getElementById('fixedPriceLabel');
  if (serviceType && fixedPriceField && fixedPriceLabel) {
    const toggleFixed = () => {
      const isFixed = serviceType.value === 'fixed';
      fixedPriceField.classList.toggle('hidden', !isFixed);
      fixedPriceLabel.classList.toggle('hidden', !isFixed);
    };
    serviceType.addEventListener('change', toggleFixed);
    toggleFixed();
  }

  // Will Call logic (must be inside initUI!)
  const willCallCheckbox = document.getElementById('isWillCall');
  const returnTimeInput = document.getElementById('returnPickUpTime');
  if (willCallCheckbox && returnTimeInput) {
    willCallCheckbox.addEventListener('change', function () {
      returnTimeInput.disabled = this.checked;
      returnTimeInput.classList.toggle('hidden', this.checked);
    });
    returnTimeInput.disabled = willCallCheckbox.checked;
    returnTimeInput.classList.toggle('hidden', willCallCheckbox.checked);
  }
}