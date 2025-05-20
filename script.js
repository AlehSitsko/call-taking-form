// Constants for service prices and price per mile
const blsPrice = 351;
const bls3Price = 527;
const bls4Price = 702;
const bls6Price = 1053;
const alsPrice = 421.54;
const milePrice = 13.2;

// Calculate price for mileage-based services
function calculatePrice(serviceType, miles) {
    let basePrice;

    switch (serviceType) {
        case 'bls':
            basePrice = blsPrice;
            break;
        case 'bls3':
            basePrice = bls3Price;
            break;
        case 'bls4':
            basePrice = bls4Price;
            break;
        case 'bls6':
            basePrice = bls6Price;
            break;
        case 'als':
            basePrice = alsPrice;
            break;
        default:
            console.log("Invalid service type");
            return null;
    }

    return basePrice + (miles * milePrice);
}

// Display the calculated price
function displayPrice() {
    const serviceType = document.getElementById('serviceType').value;

    if (serviceType === 'fixed') {
        const fixedPrice = parseFloat(document.getElementById('fixedPrice').value);
        if (!isNaN(fixedPrice)) {
            document.getElementById('result').innerText =
                `The total price (fixed) is $${fixedPrice.toFixed(2)}`;
        } else {
            document.getElementById('result').innerText =
                "Please enter a valid fixed price.";
        }
        return;
    }

    const miles = parseFloat(document.getElementById('miles').value);
    const price = calculatePrice(serviceType, miles);

    if (price !== null) {
        document.getElementById('result').innerText =
            `The total price for ${serviceType} with ${miles} miles is $${price.toFixed(2)}`;
    } else {
        document.getElementById('result').innerText = "Invalid service type.";
    }
}

// Show/hide fixed price field based on selection
function ifFixedPrice() {
    document.getElementById('serviceType').addEventListener('change', function () {
        const serviceType = this.value;
        const fixedInput = document.getElementById('fixedPrice');
        const fixedLabel = document.getElementById('fixedPriceLabel');
        const milesInput = document.getElementById('miles');

        if (serviceType === 'fixed') {
            fixedInput.style.display = 'inline-block';
            fixedLabel.style.display = 'inline-block';
            milesInput.disabled = true;
        } else {
            fixedInput.style.display = 'none';
            fixedLabel.style.display = 'none';
            milesInput.disabled = false;
        }
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

        // Trigger change manually to activate fixedPrice field if needed
        serviceType.dispatchEvent(new Event('change'));
    }

    updateServiceType();
    runType.addEventListener('change', updateServiceType);
}

// Toggle return ride section based on checkbox state
function toggleReturnRide() {
    const checkbox = document.getElementById('HasAReturnRide');
    const section = document.getElementById('returnRideSection');

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            section.style.display = 'block';

            //Auto-fill return ride fields
            const destination = document.getElementById('destinationAddress').value;
            const pickup = document.getElementById('patientAddress').value;

            document.getElementById('returnDestinationAddress').value = destination;
            document.getElementById('returnRidePickUpAddress').value = pickup;
            
        } else {
            section.style.display = 'none';
        }
    });
}



// Print page
function printPage() {
    window.print();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
    ifFixedPrice();
    syncRunTypeWithServiceType();
    toggleReturnRide();
});
