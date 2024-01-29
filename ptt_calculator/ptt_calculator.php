<?php
/*
Plugin Name: PTT Calculator
Description: Calculate the BC Property Tax Transfer amount based on the home purchase price. To use it, place the shortcode [ptt_calculator].
Version: 1.0
Author: Line49
*/

add_shortcode( 'ptt_calculator', 'ptt_calculator' );

// enqueue script file
add_action('wp_enqueue_scripts', 'ptt_enqueue_scripts');
function ptt_enqueue_scripts() {
    // Enqueue the JavaScript file
    wp_enqueue_script('ptt_script', plugins_url('ptt_script.js', __FILE__), array(), '1.0', true);

    // Enqueue the CSS file
    wp_enqueue_style('ptt_styles', plugin_dir_url(__FILE__) . 'ptt_styles.css', array(), '1.0');
}
// Enqueue external JS file
add_action('wp_enqueue_scripts', 'ptt_enqueue_external_js');
function ptt_enqueue_external_js() {
    // Check if imask.js is not already registered
    if (!wp_script_is('commission_external_js', 'registered')) {
        // Enqueue imask.js
        wp_enqueue_script('commission_external_js', plugins_url('vendor/imask.js', __FILE__), array(), '1.0', true);
    }
}

function ptt_calculator() { ?>

    <?php ob_start(); ?>

    <div class="calculator">
        <h1>
            PTT Calculator
        </h1>
        <p>
            Use this form to find out the amount of BC's Property Transfer Tax required for the home you are purchasing:
        </p>
        <form>
            <div class="fields">
                <div id="propertyprice">
                    <label><strong>Property Price:</strong></label>
                    <input id="propertyPrice" type="text" class="calculation propertyprice" placeholder="Enter Property Price Here">
                </div>
                <div id="ptt">
                    <label><strong>Amount of BC Property Transfer Tax:</strong></label>
                    <input type="text" disabled="disabled" class="ptt" id="result" placeholder="$CAD" />
                </div>
            </div>
        </form>
    </div>

    <?php return ob_get_clean();

} ?>