# Real Estate Calculators #
A JavaScript-based tool for calculating real estate commissions, GST, and net amounts for real estate transactions. This calculator is tailored to the Vancouver real estate market, using specific commission rates for sellers' agents and buyers' agents.

# Where is it used? #
Since the client needed a standalone plugin for WordPress, I have built 4 different calculators where the client can use on the sites he needs.

# Features #
- Dynamic Input Handling: Real-time updates as users input the purchase price.
- Customizable Masking: Formats input values with IMask for a clean user interface.
- Accurate Commission Logic: Calculates:
  - Sellers' Agent Commission (7% on the first $100,000, 2.5% on the balance).
  - Buyers' Agent Commission (3.125% on the first $100,000, 1.1625% on the balance).
- GST Calculation: Includes 5% GST in the total calculation.
- User-Friendly Output: Displays results in a clean, formatted currency style.

# Technologies #
- JavaScript (Vanilla): Core logic and calculations.
- IMask: For input masking and formatting.
- HTML/CSS: Responsive and intuitive user interface.

# Usage #
- Input the purchase price into the calculator.
- View the calculated Sellers' Agent Commission (SAC), Buyers' Agent Commission (BAC), GST, and net totals in real-time.

# Customization #
This calculator is highly adaptable to other markets or commission structures. Modify the calculateCommission and calculateGST functions to suit specific requirements.
