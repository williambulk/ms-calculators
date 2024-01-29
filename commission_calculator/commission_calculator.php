<?php
/*
Plugin Name: Commission Calculator
Description: Standalone real estate commission calculator for BC based on the the Real estate commission fees Mike Stewart charges. To use it, place the shortcode [commission_calculator].
Version: 1.0
Author: Line49
*/

// Enqueue script and style
add_action('wp_enqueue_scripts', 'commission_enqueue_scripts');
function commission_enqueue_scripts() {
    // Enqueue the JavaScript file
    wp_enqueue_script('commission_script', plugins_url('commission_script.js', __FILE__), array(), '1.0', true);

    // Enqueue the CSS file
    wp_enqueue_style('commission_style', plugin_dir_url(__FILE__) . 'commission_style.css', array(), '1.0');
}

// Enqueue external JS file
add_action('wp_enqueue_scripts', 'commission_enqueue_external_js');
function commission_enqueue_external_js() {
    wp_enqueue_script('commission_external_js', plugins_url('vendor/imask.js', __FILE__));
}

// Shortcode callback function
add_shortcode('commission_calculator', 'commission_calculator');
function commission_calculator() {
    ob_start(); ?>
    <div class="commission-calculator">
        <h1>British Columbia Realtor<br>Commission Calculator</h1>
        <p>Use this form to find out the commission fees amount for<br>Real Estate in British Columbia:</p>
        <form>
            <div class="commission-fields">
                <div id="commissionPurchasePrice">
                    <label><strong>Purchase Price:</strong></label>
                    <input id="commissionPurchasePriceInput" type="text" class="commissionPurchasePrice" placeholder="Enter Property Price Here">
                </div>
                <div id="cc-sellerCommission">
					<label><strong>Sellers Agent Commission:</strong></label>
					<input type="text" disabled="disabled" id="sac" placeholder="$CAD">
				</div>
                <div id="cc-buyerCommission">
					<label><strong>Buyer Agent Commission:</strong></label>
					<input type="text" disabled="disabled" id="bac" placeholder="$CAD">
				</div>
				<div id="cc-fullGst">
					<label><strong>GST to pay at the time of purchase:</strong></label>
					<input type="text" disabled="disabled" id="commissionGst" placeholder="$CAD">
				</div>
                <div id="cc-totals">
                    <label><strong>Seller Receives:</strong></label>
                    <input type="text" disabled="disabled" id="CommissionTotalAmount" placeholder="$CAD">
                </div>

                <div class="disclaimer">
                    <p>Assumptions: 7% fee charged to the first $100,000 of purchase price, remaining balance charged fee of 2.5%, GST charged 5%. Buyers agent receives 3.125% on the first $100,000 and 1.1625% on the balance.
                    <br>All results are calculated based on the input variables provided by the user, and assumptions that are believed to be reasonable.<br>
                    MikeStewart.ca does not make any express or implied warranties with respect to the information or results in connection to this, or any other calculator.
                    <br>MikeStewart.ca will not be held liable for any losses or damages resulting from any errors or omissions in any information or results, or any action or decision made by users in reliance on any information or results.
                    <br>Please consult a financial professional when making important financial decisions.</p>
                </div>
            </div>
        </form>
    </div>
    <?php
    return ob_get_clean();
}