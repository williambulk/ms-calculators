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

	if (isnewhome === "Yes" && isfirsttime === "Yes") {
		GstCalcfullGst = purchasePrice * 0.05; // base GST before rebate

		if (purchasePrice <= 1000000) {
			// Full rebate
			rebateAmount = GstCalcfullGst;
			gst = 0;
		} else if (purchasePrice > 1000000 && purchasePrice < 1500000) {
			// Linear rebate phase-out
			var rebatePercent = (1500000 - purchasePrice) / 500000;
			rebateAmount = GstCalcfullGst * rebatePercent;
			gst = GstCalcfullGst - rebateAmount;
		} else {
			// No rebate
			gst = GstCalcfullGst;
		}

		totals += gst;
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
