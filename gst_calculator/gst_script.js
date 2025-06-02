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
	var rebateAmount = 0;
	var totals = purchasePrice;

	if (isnewhome === "yes") {
		GstCalcfullGst = purchasePrice * 0.05;

		if (isfirsttime === "yes") {
			if (purchasePrice <= 1000000) {
				rebateAmount = GstCalcfullGst;
				gst = 0;
			} else if (purchasePrice < 1500000) {
				const rebatePercent = (1500000 - purchasePrice) / 500000;
				rebateAmount = GstCalcfullGst * rebatePercent;
				gst = GstCalcfullGst - rebateAmount;
			} else {
				rebateAmount = 0;
				gst = GstCalcfullGst;
			}
		} else {
			// Not a first-time buyer: no rebate
			rebateAmount = 0;
			gst = GstCalcfullGst;
		}

		totals = purchasePrice + gst; // ✅ always add GST after rebate
	}

	return {
		gst: gst,
		GstCalcfullGst: GstCalcfullGst,
		totals: totals,
		rebateAmount: rebateAmount,
	};
}

var purchasePriceInput = document.getElementById("purchasePriceInput");
var gstResult = document.getElementById("gstAmount");
var totalResult = document.getElementById("totalAmount");
var rebateField = document.getElementById("gstAmount");
var gstAfterRebateField = document.getElementById("gstAfterRebate");
rebateField.value = formatCurrency(rebateAmount);
gstAfterRebateField.value = formatCurrency(gst);

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
	var rebateAmount = calculatedValues.rebateAmount;

	// Format the GST (before rebate)
	var GstCalcfullGstElement = document.getElementById("GstCalcfullGst");
	GstCalcfullGstElement.value = new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: "CAD",
	}).format(GstCalcfullGst);

	// Format the rebate amount
	gstResult.value = new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: "CAD",
	}).format(rebateAmount);

	// Format the GST after rebate (difference between full GST and rebate)
	var gstAfterRebateField = document.getElementById("gstAfterRebate");
	// Use the calculated gst value directly instead of calculating it again
	gstAfterRebateField.value = new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: "CAD",
	}).format(gst);

	// Format the total price
	totalResult.value = new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: "CAD",
	}).format(totals);
}

updateResult();
