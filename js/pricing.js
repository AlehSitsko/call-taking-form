// Constants
const blsPrice = 351;
const bls3Price = 527;
const bls4Price = 702;
const bls6Price = 1053;
const alsPrice = 421.54;
const milePrice = 13.2;

// Calculate base price
function calculateBase(serviceType) {
    switch (serviceType) {
        case 'bls': return blsPrice;
        case 'bls3': return bls3Price;
        case 'bls4': return bls4Price;
        case 'bls6': return bls6Price;
        case 'als': return alsPrice;
        default: return null;
    }
}

// Display price
function displayPrice() {
    const serviceType = document.getElementById('serviceType').value;
    const hasReturnRide = document.getElementById('HasAReturnRide')?.checked;
    const excludeMiles = document.getElementById('excludeMilesCheckbox').checked;
    const miles = parseFloat(document.getElementById('miles').value) || 0;
    const fixedPrice = parseFloat(document.getElementById('fixedPrice').value);
    const waitingCharge = parseFloat(document.getElementById('waitingTimeCharge')?.value) || 0;
    const resultElement = document.getElementById('result');

    if (serviceType === 'fixed') {
        if (!isNaN(fixedPrice)) {
            const oneWay = fixedPrice + waitingCharge;
            const total = hasReturnRide ? (fixedPrice * 2) + waitingCharge : oneWay;
            resultElement.innerHTML = hasReturnRide
                ? `One-way: $${oneWay.toFixed(2)}<br>Total: $${total.toFixed(2)}`
                : `Total: $${oneWay.toFixed(2)}`;
        } else {
            resultElement.innerText = "Enter a valid fixed price.";
        }
        return;
    }

    if (['emergency', 'privateTransfer'].includes(serviceType)) {
        resultElement.innerText = "Enter price manually or use fixed price.";
        return;
    }

    const base = calculateBase(serviceType);
    if (base === null) {
        resultElement.innerText = "Invalid service type.";
        return;
    }

    const mileageCost = excludeMiles ? 0 : miles * milePrice;
    const oneWay = base + mileageCost + waitingCharge;
    const total = hasReturnRide ? (base + mileageCost) * 2 + waitingCharge : oneWay;

    resultElement.innerHTML = hasReturnRide
        ? `One-way: $${oneWay.toFixed(2)}<br>Total: $${total.toFixed(2)}`
        : `Total: $${oneWay.toFixed(2)}`;
}

// Initialize
function initPricing() {
    const form = document.getElementById('priceCalculatorForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            displayPrice();
        });
    }
}
