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
    const hasReturnRide = document.getElementById('hasReturnRide')?.checked;
    const returnWaitingCharge = parseFloat(document.getElementById('waitingTimeChargeReturn')?.value) || 0;

    let basePrice = 0;
    let mileageRate = 13.2;
    let multiplier = 1;

    if (serviceType === 'fixed') {
      const total = hasReturnRide ? fixedPrice * 2 : fixedPrice;
      resultBox.textContent = hasReturnRide
        ? `One-Way Price: $${fixedPrice.toFixed(2)}\nRound Trip Total: $${total.toFixed(2)}`
        : `Fixed Price: $${fixedPrice.toFixed(2)}`;
      return;
    }

    switch (serviceType) {
      case 'bls':
        basePrice = 351;
        break;
      case 'bls3':
        basePrice = 351;
        multiplier = 1.5;
        break;
      case 'bls4':
        basePrice = 351;
        multiplier = 2;
        break;
      case 'bls6':
        basePrice = 351;
        multiplier = 3;
        break;
      case 'als':
        basePrice = 421;
        break;
      case 'als3':
        basePrice = 421;
        multiplier = 1.5;
        break;
      case 'als4':
        basePrice = 421;
        multiplier = 2;
        break;
      case 'als6':
        basePrice = 421;
        multiplier = 3;
        break;
    }

    const mileageCost = excludeMiles ? 0 : miles * mileageRate;
    const totalOneWay = (basePrice + mileageCost + waitingCharge) * multiplier;
    const totalRoundTrip = hasReturnRide
      ? (basePrice + mileageCost + returnWaitingCharge) * multiplier + totalOneWay
      : totalOneWay;

    const breakdown = [];
    breakdown.push(`Base Price: $${basePrice.toFixed(2)}`);
    if (!excludeMiles) breakdown.push(`Miles: ${miles} × $${mileageRate.toFixed(2)} = $${mileageCost.toFixed(2)}`);
    if (waitingCharge > 0) breakdown.push(`Waiting Time Charge: $${waitingCharge.toFixed(2)}`);
    if (multiplier !== 1) breakdown.push(`Multiplier (${multiplier}×)`);

    breakdown.push(`One-Way Price: $${totalOneWay.toFixed(2)}`);

    if (hasReturnRide) {
      if (returnWaitingCharge > 0) breakdown.push(`Return Waiting Time Charge: $${returnWaitingCharge.toFixed(2)}`);
      breakdown.push(`Round Trip Total: $${totalRoundTrip.toFixed(2)}`);
    }

    resultBox.textContent = breakdown.join('\n');
  });
}
