<?php
/*
Plugin Name: Mortgage Calculator
Description: Standalone 40 Year Mortgage Calculator. To use it, place the shortcode [mortgage_calculator].
Version: 1.0
Author: Line49
*/

// Enqueue script and style
add_action('wp_enqueue_scripts', 'mortgage_enqueue_scripts');
function mortgage_enqueue_scripts() {
    wp_enqueue_script('mortgage_script', plugins_url('mortgage.js', __FILE__), array('jquery'), '1.0', true);
    wp_enqueue_style('mortgage_styles', plugin_dir_url(__FILE__) . 'mortgage_styles.css', array(), '1.0');
    wp_enqueue_script('mortgage_external_js', plugins_url('vendor/imask.js', __FILE__), array(), '1.0', true);
}

// Shortcode callback function
add_shortcode('mortgage_calculator', 'mortgage_calculator');

function mortgage_calculator() {
    // Start output buffering
    ob_start();
    ?>

    <div class="mortgage-calculator">
        <h1>Mortgage Calculator</h1>
        <p>Use this form to calculate the mortgage amount in Canada:</p>

        <form id="mortgageForm">
            <div class="mortgageQuestion">
                <label for="loanAmount"><strong>Loan Amount ($):</strong></label>
                <input type="text" id="loanAmount" placeholder="$CAD" required>
            </div>
            <div class="mortgageQuestion">
                <label for="downPayment"><strong>Down Payment ($):</strong></label>
                <input type="text" id="downPayment" placeholder="$CAD" required>
            </div>
            <div class="mortgageQuestion">
                <label for="interestRate"><strong>Interest Rate (%):</strong></label>
                <input type="number" id="interestRate" step="0.01" placeholder="e.g. 3.5%" required>
            </div>
            <div class="mortgageQuestion">
                <label for="loanTerm"><strong>Loan Term (Years):</strong></label>
                <input type="number" id="loanTerm" value="40" placeholder="e.g. 25" required>
            </div>
            <div class="mortgageQuestion">
                <label for="interestType">Interest Type:</label>
                <select id="interestType">
                    <option value="fixed">Fixed</option>
                    <option value="adjustable">Adjustable</option>
                </select>
            </div>
            <div class="mortgageQuestion">
                <label for="lumpSumPayments"><strong>Do you plan on making any lump-sum payments?</strong></label>
                <select id="toggleLumpSumPayments">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>
            <div class="mortgageQuestion">
                <div id="lumpSumOptions" class="hidden">
                    <div class="mortgageQuestion">
                        <label for="lumpSumAmount"><strong>Lump-Sum Amount ($):</strong></label>
                        <input type="text" id="lumpSumAmount" placeholder="$CAD">
                    </div>
                    <div class="mortgageQuestion">
                        <label for="lumpSumFrequency"><strong>Frequency:</strong></label>
                        <select id="lumpSumFrequency">
                            <option value="monthly">Monthly</option>
                            <option value="annually">Annually</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="mortgageQuestion">
                <label for="paymentsPerYear"><strong>Payments per Year:</strong></label>
                <select id="paymentsPerYear">
                    <option value="12">Monthly (12)</option>
                    <option value="24">Semi-Monthly (24)</option>
                    <option value="26">Bi-Weekly (26)</option>
                    <option value="26">Accelerated Bi-Weekly (26)</option>
                    <option value="52">Weekly (52)</option>
                </select>
            </div>
            <div class="mortgageQuestion">
                <label for="customPayment"><strong>Custom Payment ($):</strong></label>
                <input type="text" id="customPayment" placeholder="$CAD">
            </div>
            <div class="mortgageQuestion">
                <input type="submit" value="Calculate">
            </div>
        </form>

        <div id="result" class="mortgageResult"></div>
    </div>

    <?php
    return ob_get_clean();
}