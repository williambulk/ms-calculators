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
    // Enqueue the CSS file
    wp_enqueue_style('gst_styles', plugin_dir_url(__FILE__) . 'gst_styles.css', array(), '1.0');
}

// Enqueue IMask library and main script
add_action('wp_enqueue_scripts', 'gst_enqueue_js');
function gst_enqueue_js() {
    // First try to load IMask from CDN with high priority
    wp_enqueue_script('imask_library', 'https://unpkg.com/imask@6.4.3/dist/imask.min.js', array(), '6.4.3', true);
    
    // Then load our script that depends on IMask
    wp_enqueue_script('gst_script', plugins_url('gst_script.js', __FILE__), array('imask_library'), '1.0', true);
    
    // Add inline script to check if IMask loaded and provide fallback
    wp_add_inline_script('gst_script', '
        document.addEventListener("DOMContentLoaded", function() {
            if (typeof IMask === "undefined") {
                console.log("IMask not loaded from CDN, trying fallback");
                var script = document.createElement("script");
                script.src = "' . plugins_url('vendor/imask.js', __FILE__) . '";
                script.onload = function() {
                    console.log("Local IMask loaded successfully");
                    // Reinitialize your script
                    if (typeof initGSTCalculator === "function") {
                        initGSTCalculator();
                    }
                };
                document.head.appendChild(script);
            } else {
                console.log("IMask loaded successfully from CDN");
            }
        });
    ', 'after');
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
                        <option value="yes">Yes</option>
                        <option value="no" selected>No</option>
                    </select>
                    <label><strong>Are you a first-time buyer?</strong></label>
                    <select id="firsttime">
                        <option value="yes">Yes</option>
                        <option value="no" selected>No</option>
                    </select>
                </div>
                <div id="purchasePrice">
                    <label><strong>Purchase Price:</strong></label>
                    <input id="purchasePriceInput" type="text" class="purchasePrice" placeholder="Enter Property Price Here">
                </div>
                <div id="fullGstDiv">
                    <label><strong>GST (Before Rebate):</strong></label>
                    <input type="text" disabled="disabled" class="gst" id="GstCalcfullGst" placeholder="$CAD">
                </div>
                <div id="rebateAmount">
                    <label><strong>First Time Home Buyer GST Rebate:</strong></label>
                    <input type="text" disabled="disabled" class="rebate" id="gstAmount" placeholder="$CAD">
                </div>
                <div id="gstAfter">
                    <label><strong>GST (After Rebate):</strong></label>
                    <input type="text" disabled="disabled" class="gst" id="gstAfterRebate" placeholder="$CAD">
                </div>
                <div id="totals">
                    <label><strong>Final Purchase Price including GST:</strong></label>
                    <input type="text" disabled="disabled" class="gst" id="totalAmount" placeholder="$CAD">
                </div>
                
            </div>
        </form>
    </div>
    <?php
    return ob_get_clean();
}
