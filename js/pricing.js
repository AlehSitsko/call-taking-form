// Price calculation module logic

function initPricing() {
  const form = document.getElementById('priceCalculatorForm');
  const resultBox = document.getElementById('result');

  if (!form || !resultBox) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const serviceType = document.getElementById('serviceType').value;
    const miles = parseFloat(document.getElementById('miles').value) || 0;
    const waitingCharge = parseFloat(document.getElementById('waitingTimeChargePrice').value) || 0;
    const fixedPrice = parseFloat(document.getElementById('fixedPrice').value) || 0;
    const excludeMiles = document.getElementById('excludeMilesCheckbox').checked;

    let basePrice = 0;
    const mileageRate = 13.2;
    let multiplier = 1;
    const breakdown = [];

    if (serviceType === 'fixed') {
      resultBox.textContent = `Fixed Price: $${fixedPrice.toFixed(2)}`;
      return;
    }

    const baseBLS = 351;
    const baseALS = 421;

    // Determine base and multiplier
    if (serviceType.startsWith('bls')) {
      basePrice = baseBLS;
    } else if (serviceType.startsWith('als')) {
      basePrice = baseALS;
    }

    switch (serviceType) {
      case 'bls3':
      case 'als3':
        multiplier = 1.5;
        break;
      case 'bls4':
      case 'als4':
        multiplier = 2;
        break;
      case 'bls6':
      case 'als6':
        multiplier = 3;
        break;
    }

    const mileageCost = excludeMiles ? 0 : miles * mileageRate;
    const total = (basePrice + mileageCost + waitingCharge) * multiplier;

    breakdown.push(`Base Price: $${basePrice.toFixed(2)}`);
    if (!excludeMiles) {
      breakdown.push(`Miles: ${miles} × $${mileageRate.toFixed(2)} = $${(miles * mileageRate).toFixed(2)}`);
    }
    if (waitingCharge > 0) {
      breakdown.push(`Waiting Time Charge: $${waitingCharge.toFixed(2)}`);
    }
    if (multiplier !== 1) {
      breakdown.push(`Multiplier (${multiplier}×)`);
    }
    breakdown.push(`Total: $${total.toFixed(2)}`);

    resultBox.textContent = breakdown.join('\n');
  });
}