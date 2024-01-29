document.querySelectorAll(".calculation").forEach(function (element) {
  element.addEventListener("keyup", function () {
    var currencyMask = IMask(document.getElementById("propertyPrice"), {
      mask: "CA$num",
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: ",",
          radix: ".",
        },
      },
    });

    var propertyprice = +currencyMask.unmaskedValue;
    var result = document.querySelector("#result");

    let tax = 0;

    if (propertyprice <= 200000) {
      tax = propertyprice * 0.01;
    } else if (propertyprice <= 2000000) {
      tax = 200000 * 0.01 + (propertyprice - 200000) * 0.02;
    } else if (propertyprice > 2000000) {
      tax = 200000 * 0.01 + 1800000 * 0.02 + (propertyprice - 2000000) * 0.03;
    }

    // Apply additional 2% tax for residential property value exceeding $3,000,000
    if (propertyprice > 3000000) {
      const residentialPropertyValue = propertyprice - 3000000;
      const additionalTax = residentialPropertyValue * 0.02;
      tax += additionalTax;
    }

    // Handle the case when property price is less than or equal to 0
    if (propertyprice <= 0) {
      tax = 0;
    }

    result.value = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'CAD',
    }).format(tax);
  });
});