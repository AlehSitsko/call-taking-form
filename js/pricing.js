// Price calculations
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
            console.warn("Invalid service type:", serviceType);
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
            setPriceResult(`The total price (fixed) is $${fixedPrice.toFixed(2)}`);
        } else {
            setPriceResult("Please enter a valid fixed price.");
        }
        return;
    }

    const miles = parseFloat(document.getElementById('miles').value);
    if (isNaN(miles) || miles < 0) {
        setPriceResult("Please enter valid mileage.");
        return;
    }

    const price = calculatePrice(serviceType, miles);

    if (price !== null) {
        setPriceResult(`The total price for ${serviceType} with ${miles} miles is $${price.toFixed(2)}`);
    } else {
        setPriceResult("Invalid service type.");
    }
}

// Helper to update price display
function setPriceResult(text) {
    document.getElementById('result').innerText = text;
}

// Bind event on load
function initPricing() {
    const priceForm = document.getElementById('priceCalculatorForm');
    if (priceForm) {
        priceForm.addEventListener('submit', function (event) {
            event.preventDefault();
            displayPrice();
        });
    }
}
