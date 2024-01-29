var purchasePriceInput = document.getElementById("purchasePriceInput");
var gstResult = document.getElementById("gstAmount");
var totalResult = document.getElementById("totalAmount");

var purchasePriceMask = IMask(purchasePriceInput, {
  mask: "CA$ num",
  blocks: {
    num: {
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
    },
  },
});

purchasePriceInput.addEventListener("input", function () {
  updateResult();
});

function calculateGST() {
  var purchasePrice = +purchasePriceMask.unmaskedValue;
  var isnewhome = document.getElementById("newhome").value;
  var isfirsttime = document.getElementById("firsttime").value;

  var gst = 0;
  var GstCalcfullGst = 0;
  var totals = purchasePrice;

  if (isnewhome === "Yes" && isfirsttime === "Yes") {
    gst = purchasePrice * 0.05;
    GstCalcfullGst = gst;
    totals += gst;

    // Apply rebate rules
    if (purchasePrice <= 350000) {
      gst *= 0.36;
    } else if (purchasePrice > 350000 && purchasePrice < 450000) {
      var rebate = 6300 * (450000 - purchasePrice) / 100000;
      gst -= rebate;
    } else if (purchasePrice => 450000) {
      gst = 0;
    }
  }

  return {
    gst: gst,
    GstCalcfullGst: GstCalcfullGst,
    totals: (totals - gst),
  };
}

var purchasePriceInput = document.getElementById("purchasePriceInput");
var gstResult = document.getElementById("gstAmount");
var totalResult = document.getElementById("totalAmount");

var purchasePriceMask = IMask(purchasePriceInput, {
  mask: "CA$ num",
  blocks: {
    num: {
      mask: Number,
      thousandsSeparator: ",",
      radix: ".",
    },
  },
});

purchasePriceInput.addEventListener("input", function () {
  updateResult();
});

function updateResult() {
  var calculatedValues = calculateGST();
  var gst = calculatedValues.gst;
  var GstCalcfullGst = calculatedValues.GstCalcfullGst;
  var totals = calculatedValues.totals;

  gstResult.value = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CAD",
  }).format(gst);

  var GstCalcfullGstElement = document.getElementById("GstCalcfullGst");
  GstCalcfullGstElement.value = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CAD",
  }).format(GstCalcfullGst);

  totalResult.value = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "CAD",
  }).format(totals);
}

updateResult();