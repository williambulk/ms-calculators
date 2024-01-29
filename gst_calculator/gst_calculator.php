<?php
/*
Plugin Name: GST Calculator
Description: Standalone BC Goods & Services Tax (GST) Rebate Calculator. To use it, place the shortcode [gst_calculator].
Version: 1.0
Author: Line49
*/

// Enqueue script and style
add_action('wp_enqueue_scripts', 'gst_enqueue_scripts');
function gst_enqueue_scripts() {
    // Enqueue the JavaScript file
    wp_enqueue_script('gst_script', plugins_url('gst_script.js', __FILE__), array(), '1.0', true);

    // Enqueue the CSS file
    wp_enqueue_style('gst_styles', plugin_dir_url(__FILE__) . 'gst_styles.css', array(), '1.0');
}
// Enqueue external JS file
add_action('wp_enqueue_scripts', 'gst_enqueue_external_js');
function gst_enqueue_external_js() {
    // Check if imask.js is not already registered
    if (!wp_script_is('commission_external_js', 'registered')) {
        // Enqueue imask.js
        wp_enqueue_script('commission_external_js', plugins_url('vendor/imask.js', __FILE__), array(), '1.0', true);
    }
}

// Shortcode callback function
add_shortcode('gst_calculator', 'gst_calculator');
function gst_calculator() {
    ob_start(); ?>
    <div class="gst-calculator">
        <h1>GST Calculator</h1>
        <p>Use this form to find out the amount of Goods and Services Tax (GST) on Real Estate in British Columbia:</p>
        <form>
            <div class="gst-fields">
                <div id="propertyinfo">
                    <label><strong>Is this a new home?</strong></label>
                    <select id="newhome">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <label><strong>Are you a first-time buyer?</strong></label>
                    <select id="firsttime">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>
                <div id="purchasePrice">
                    <label><strong>Purchase Price:</strong></label>
                    <input id="purchasePriceInput" type="text" class="purchasePrice" placeholder="Enter Property Price Here">
                </div>
				<div id="fullGstDiv">
					<label><strong>GST to pay at the time of purchase:</strong></label>
					<input type="text" disabled="disabled" class="gst" id="GstCalcfullGst" placeholder="$CAD">
				</div>
				<div id="gst">
                    <label><strong>GST Rebate:</strong></label>
                    <input type="text" disabled="disabled" class="gst" id="gstAmount" placeholder="$CAD">
                </div>
                <div id="totals">
                    <label><strong>Final Purchase Price including GST after Rebate:</strong></label>
                    <input type="text" disabled="disabled" class="gst" id="totalAmount" placeholder="$CAD">
                </div>
                
            </div>
        </form>
    </div>
    <?php
    return ob_get_clean();
}