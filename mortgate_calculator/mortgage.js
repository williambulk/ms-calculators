document.addEventListener("DOMContentLoaded", function () {
  if (!document.querySelectorAll('#mortgageForm').length) return;

  // Applying IMask to input fields
  var loanAmountMask = IMask(
    document.getElementById('loanAmount'),
    {
      mask: "CA$ num",
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: ",",
          radix: ".",
        },
      },
    }
  );

  var downPaymentMask = IMask(
    document.getElementById('downPayment'),
    {
      mask: "CA$ num",
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: ",",
          radix: ".",
        },
      },
    }
  );

  var lumpSumAmountMask = IMask(
    document.getElementById('lumpSumAmount'),
    {
      mask: "CA$ num",
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: ",",
          radix: ".",
        },
      },
    }
  );

  var customPaymentMask = IMask(
    document.getElementById('customPayment'),
    {
      mask: "CA$ num",
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: ",",
          radix: ".",
        },
      },
    }
  );
  
  function toggleLumpSumOptions() {
    var lumpSumPayments = document.getElementById("toggleLumpSumPayments").value;
    var lumpSumOptions = document.getElementById("lumpSumOptions");
    if (lumpSumPayments === "yes") {
      lumpSumOptions.classList.remove("hidden");
    } else {
      lumpSumOptions.classList.add("hidden");
    }
  }

  document.getElementById("toggleLumpSumPayments").addEventListener("change", toggleLumpSumOptions);

  document.getElementById("mortgageForm").addEventListener("submit", function (event) {
    event.preventDefault();
    calculateMortgage();
  });

  function calculateMortgage() {
    var loanAmount = parseFloat(loanAmountMask.unmaskedValue);
    var downPayment = parseFloat(downPaymentMask.unmaskedValue);
    var interestRate = parseFloat(document.getElementById("interestRate").value) / 100; // Annual interest rate
    var loanTermYears = parseFloat(document.getElementById("loanTerm").value); // Loan term in years

    var lumpSumPayments = document.getElementById("toggleLumpSumPayments").value;
    var lumpSumAmount = 0;
    var lumpSumFrequency = "monthly";
    if (lumpSumPayments === "yes") {
      lumpSumAmount = parseFloat(lumpSumAmountMask.unmaskedValue);
      lumpSumFrequency = document.getElementById("lumpSumFrequency").value;
    }

    var paymentsPerYear = parseInt(document.getElementById("paymentsPerYear").value);
    var loanTermMonths = loanTermYears * paymentsPerYear; // Loan term in months

    var monthlyInterestRate = interestRate / paymentsPerYear; // Monthly interest rate

    var monthlyPayment;
    if (document.getElementById("interestType").value === "fixed") {
      monthlyPayment = ((loanAmount - downPayment) * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));
    } else {
      // Adjustable rate calculation (placeholder)
      // For simplicity, assuming a fixed rate for adjustable rate calculation
      monthlyPayment = ((loanAmount - downPayment) * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));
    }
    monthlyPayment = monthlyPayment.toFixed(2);

    var totalPayment = (monthlyPayment * loanTermMonths).toFixed(2);
    var totalInterest = ((monthlyPayment * loanTermMonths) - (loanAmount - downPayment)).toFixed(2);

    if (lumpSumPayments === "yes") {
      if (lumpSumFrequency === "monthly") {
        // Add lump sum amount to each monthly payment
        totalPayment = (parseFloat(totalPayment) + lumpSumAmount).toFixed(2);
        totalInterest = ((monthlyPayment * loanTermMonths + lumpSumAmount) - (loanAmount - downPayment)).toFixed(2);
      } else if (lumpSumFrequency === "annually") {
        // Add lump sum amount once per year
        totalPayment = (parseFloat(totalPayment) + lumpSumAmount).toFixed(2);
        totalInterest = ((monthlyPayment * loanTermMonths + lumpSumAmount * (loanTermYears / paymentsPerYear)) - (loanAmount - downPayment)).toFixed(2);
      }
    }

    var customPayment = parseFloat(customPaymentMask.unmaskedValue);
    if (isNaN(customPayment)) {
      customPayment = 0;
    }
    var totalPaymentWithCustom = (parseFloat(totalPayment) - (downPayment + customPayment)).toFixed(2);

    let CAD = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    });

    var result = "Monthly Payment: " + CAD.format(monthlyPayment) + "<br>";
    result += "Total Payment: " + CAD.format(totalPaymentWithCustom) + "<br>";
    result += "Total Interest: " + CAD.format(totalInterest) + "<br>";
    result += "Mortgage Term: " + loanTermYears + " years<br>";
    result += "Payments per Year: " + paymentsPerYear + "<br>";
    result += "Custom Payment: " + CAD.format(customPayment) + "<br>";
    result += "<strong>Total Payment with Custom: " + CAD.format(totalPaymentWithCustom) + "</strong>";

    document.querySelector(".mortgageResult").innerHTML = result;
  }
});