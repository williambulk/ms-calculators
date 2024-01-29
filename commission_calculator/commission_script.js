var commissionPurchasePriceInput = document.getElementById("commissionPurchasePriceInput");
var commissionGST = document.getElementById("commissionGst");
var sellerReceives = document.getElementById("CommissionTotalAmount");
var sacResult = document.getElementById("sac");
var bacResult = document.getElementById("bac");

var commissionPurchasePriceMask = IMask(commissionPurchasePriceInput, {
  mask: "CA$ num",
  blocks: {
    num: {
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
    },
  },
});

commissionPurchasePriceInput.addEventListener("input", function () {
  updatedResult();
});

function calculateCommission(purchasePrice) {
  const firstTierRate = 0.03875;
  const remainingTierRate = 0.013375;
  const buyerAgentFirstTierRate = 0.03125;
  const buyerAgentRemainingTierRate = 0.011625;
  const firstTierLimit = 100000;

  var sac;
  var bac;

  if (purchasePrice <= firstTierLimit) {
    sac = firstTierRate * purchasePrice;
    bac = buyerAgentFirstTierRate * purchasePrice;
  } else {
    sac = firstTierRate * firstTierLimit + remainingTierRate * (purchasePrice - firstTierLimit);
    bac = buyerAgentFirstTierRate * firstTierLimit + buyerAgentRemainingTierRate * (purchasePrice - firstTierLimit);
  }

  return {
    sac: sac,
    bac: bac,
  };
}

function commissionCalculateGST() {
  var purchasePrice = +commissionPurchasePriceMask.unmaskedValue;

  var calculatedCommission = calculateCommission(purchasePrice);
  var sac = calculatedCommission.sac;
  var bac = calculatedCommission.bac;

  var totalCommission = sac + bac;

  var gst = totalCommission * 0.05;
  var fullGst = gst;
  var ccTotals = purchasePrice - gst - totalCommission;

  return {
    gst: gst,
    fullGst: fullGst,
    ccTotals: ccTotals,
  };
}

function updatedResult() {
  var calculatedGST = commissionCalculateGST();
  var gst = calculatedGST.gst;
  var fullGst = calculatedGST.fullGst;
  var ccTotals = calculatedGST.ccTotals;

  var calculatedCommission = calculateCommission(+commissionPurchasePriceMask.unmaskedValue);
  var sac = calculatedCommission.sac;
  var bac = calculatedCommission.bac;

  commissionGST.value = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CAD",
  }).format(fullGst);

  sacResult.value = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CAD",
  }).format(sac);

  bacResult.value = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CAD",
  }).format(bac);

  sellerReceives.value = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CAD",
  }).format(ccTotals);
}

updatedResult();