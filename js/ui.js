// Toggle fixed price input and disable miles based on service type
function toggleFixedPriceDisplay() {
    const serviceType = document.getElementById('serviceType');
    const fixedLabel = document.getElementById('fixedPriceLabel');
    const fixedInput = document.getElementById('fixedPrice');
    const milesInput = document.getElementById('miles');

    serviceType.addEventListener('change', () => {
        const isFixed = serviceType.value === 'fixed';
        fixedLabel.style.display = isFixed ? 'inline-block' : 'none';
        fixedInput.style.display = isFixed ? 'inline-block' : 'none';
        milesInput.disabled = isFixed;
    });
}

// Enable/disable calculator section
function toggleCalculator() {
    const enableCheckbox = document.getElementById('enableCalculator');
    const calculatorSection = document.getElementById('calculatorFields');

    enableCheckbox.addEventListener('change', () => {
        calculatorSection.style.display = enableCheckbox.checked ? 'block' : 'none';
    });
}

// Exclude miles toggle
function toggleExcludeMiles() {
    const excludeCheckbox = document.getElementById('excludeMilesCheckbox');
    const milesInput = document.getElementById('miles');

    excludeCheckbox.addEventListener('change', () => {
        milesInput.disabled = excludeCheckbox.checked;
    });
}
// Toggle return ride option
function toggleReturnRide() {
    const checkbox = document.getElementById('HasAReturnRide');
    const section = document.getElementById('returnRideSection');

    checkbox.addEventListener('change', () => {
        const show = checkbox.checked;
        section.style.display = show ? 'block' : 'none';

        if (show) {
            const pickup = document.getElementById('patientAddress').value;
            const destination = document.getElementById('destinationAddress').value;

            document.getElementById('returnRidePickUpAddress').value = destination;
            document.getElementById('returnDestinationAddress').value = pickup;

            const willCallCheckbox = document.getElementById('isWillCall');
            const returnTimeField = document.getElementById('returnPickUpTime');

            if (willCallCheckbox && returnTimeField) {
                willCallCheckbox.addEventListener('change', function () {
                    returnTimeField.disabled = this.checked;
                    returnTimeField.style.opacity = this.checked ? '0.5' : '1';
                });
            }
        }
    });
}

// toggle the visibility of the "Other" field based on the selected caller type
function toggleOtherCallerType() {
    const callerType = document.getElementById('callerType');
    const otherCallerType = document.getElementById('otherCallerType');

    callerType.addEventListener('change', () => {
        otherCallerType.style.display = callerType.value === 'other' ? 'inline-block' : 'none';
    });
}
// Print the entire page
function printPage() {
    window.print();
}

// Initialize UI behaviors
function initUI() {
    toggleFixedPriceDisplay();
    toggleCalculator();
    toggleExcludeMiles();
    toggleReturnRide();
    toggleOtherCallerType();
}
