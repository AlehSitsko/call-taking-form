// Toggle fixed price input and disable miles based on service type
function ifFixedPrice() {
    const serviceTypeSelect = document.getElementById('serviceType');
    const fixedInput = document.getElementById('fixedPrice');
    const fixedLabel = document.getElementById('fixedPriceLabel');
    const milesInput = document.getElementById('miles');

    serviceTypeSelect.addEventListener('change', () => {
        const selectedType = serviceTypeSelect.value;

        const isFixed = selectedType === 'fixed';
        fixedInput.style.display = isFixed ? 'inline-block' : 'none';
        fixedLabel.style.display = isFixed ? 'inline-block' : 'none';
        milesInput.disabled = isFixed;
    });
}

// Sync run type with service type and apply it immediately
function syncRunTypeWithServiceType() {
    const runType = document.getElementById('runType');
    const serviceType = document.getElementById('serviceType');

    function updateServiceType() {
        const selectedValue = runType.value;
        const selectedText = runType.options[runType.selectedIndex].text;

        serviceType.innerHTML = '';

        const mainOption = document.createElement('option');
        mainOption.value = selectedValue;
        mainOption.text = selectedText;
        serviceType.appendChild(mainOption);

        const fixedOption = document.createElement('option');
        fixedOption.value = 'fixed';
        fixedOption.text = 'Fixed Price';
        serviceType.appendChild(fixedOption);

        serviceType.dispatchEvent(new Event('change'));
    }

    updateServiceType();
    runType.addEventListener('change', updateServiceType);
}

// Toggle return ride section based on checkbox state
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

            // Will Call logic (safe only if element exists now)
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


// Print the entire page
function printPage() {
    window.print();
}

// UI toggles and form behavior initialization
function initUI() {
    ifFixedPrice();
    syncRunTypeWithServiceType();
    toggleReturnRide();
}
