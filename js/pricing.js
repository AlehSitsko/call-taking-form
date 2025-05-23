// Price calculations
// Constants for service prices and price per mile
const blsPrice = 351;
const bls3Price = 527;
const bls4Price = 702;
const bls6Price = 1053;
const alsPrice = 421.54;
const milePrice = 13.2;

// Calculate base price depending on service type
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
        case 'emergency':
        case 'privateTransfer':
            return null; // Will be manually entered
        default:
            console.warn("Invalid service type:", serviceType);
            return null;
    }

    return basePrice + (miles * milePrice);
}

// Display the calculated price
function displayPrice() {
    const serviceType = document.getElementById('serviceType').value;
    const hasReturnRide = document.getElementById('HasAReturnRide').checked;
    const milesInput = document.getElementById('miles');
    const fixedInput = document.getElementById('fixedPrice');
    const waitingChargeInput = document.getElementById('waitingTimeCharge');
    const waitingCharge = waitingChargeInput ? parseFloat(waitingChargeInput.value) || 0 : 0;
    const resultElement = document.getElementById('result');


    // Handle fixed price mode
    if (serviceType === 'fixed') {
        const fixedPrice = parseFloat(fixedInput.value);
        if (!isNaN(fixedPrice)) {
            const oneWay = fixedPrice + waitingCharge;
            const total = hasReturnRide ? (fixedPrice * 2) + waitingCharge : oneWay;
            resultElement.innerHTML =
                hasReturnRide
                    ? `One-way price: $${oneWay.toFixed(2)}<br>Round-trip total: $${total.toFixed(2)}`
                    : `Total price (fixed): $${oneWay.toFixed(2)}`;
        } else {
            resultElement.innerText = "Please enter a valid fixed price.";
        }
        return;
    }

    // Handle manually entered service types (emergency/privateTransfer)
    if (serviceType === 'emergency' || serviceType === 'privateTransfer') {
        const manualBase = parseFloat(milesInput.value) || 0;

        if (!manualBase && !waitingCharge) {
            resultElement.innerText = "Please enter price manually or include waiting time.";
            return;
        }

        const oneWay = manualBase + waitingCharge;
        const total = hasReturnRide ? (manualBase * 2) + waitingCharge : oneWay;
        resultElement.innerHTML =
            hasReturnRide
                ? `One-way price: $${oneWay.toFixed(2)}<br>Round-trip total: $${total.toFixed(2)}`
                : `Total price (manual): $${oneWay.toFixed(2)}`;
        return;
    }

    // Handle mileage-based services
    const miles = parseFloat(milesInput.value);
    if (isNaN(miles)) {
        resultElement.innerText = "Please enter a valid number of miles.";
        return;
    }

    const price = calculatePrice(serviceType, miles);
    if (price !== null) {
        const oneWay = price + waitingCharge;
        const total = hasReturnRide ? (price * 2) + waitingCharge : oneWay;
        resultElement.innerHTML =
            hasReturnRide
                ? `One-way price: $${oneWay.toFixed(2)}<br>Round-trip total: $${total.toFixed(2)}`
                : `Total price: $${oneWay.toFixed(2)}`;
    } else {
        resultElement.innerText = "Service type requires manual entry.";
    }
}

// Initialize pricing logic on form submit
function initPricing() {
    const priceForm = document.getElementById('priceCalculatorForm');
    if (priceForm) {
        priceForm.addEventListener('submit', function (event) {
            event.preventDefault();
            displayPrice();
        });
    }
}
