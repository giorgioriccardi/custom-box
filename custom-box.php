<?php
/*
Plugin Name: Custom Box
Version: 1.0
Description: Custom Box Desc
Author: Alessandro Franceschetti / Giorgio Riccardi
Author URI: http://site.com
*/

function wptuts_scripts_basic(){
		wp_register_script( 'jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', array(), null, false );
		wp_register_script( 'jquery-validation', 'https://cdn.jsdelivr.net/jquery.validation/1.15.1/jquery.validate.min.js', array(), null, false );
		wp_enqueue_script('jquery');
		wp_enqueue_script('jquery-validation');
		wp_register_script('custom-box-js', plugins_url( 'custom-box.js', __FILE__ ), array( 'jquery' ), '1', true );
    wp_enqueue_script('custom-box-js');
		wp_register_style( 'custom-box-style', plugins_url( 'custom-box.css', __FILE__ ), array(), '1', 'all' );
    wp_enqueue_style( 'custom-box-style' );
		wp_register_style( 'custom-box-style-toggle', plugins_url( 'toggle.css', __FILE__ ), array(), '1', 'all' );
    wp_enqueue_style( 'custom-box-style-toggle' );
		wp_localize_script('custom-box-js', 'urls', array( 'pluginUrl' => plugins_url() ));
}

add_action( 'wp_enqueue_scripts', 'wptuts_scripts_basic' );

function html_custom_box_code() {
	echo '<div id="custom-box">'.
'	<h2>Place an order today</h2>'.
'	<form action="' . esc_url( $_SERVER['REQUEST_URI'] ) . '" name="custom-box-form" method="post" enctype="multipart/form-data">'.
'		<div id="custom-box-form">'.
'			<div id="custom-box-form-customize">'.
'				<div class="custom-box-form-section custom-box-form-section-inline">'.
'					<h4>Measurement</h4>'.
'					<div class="custom-box-form-section-inline-content">'.
'						<label></><input type="radio" name="custom-box-metric-radio" value="imperial" checked="checked" class="box-units-radio" />Imperial</label>'.
'						<label></><input type="radio" name="custom-box-metric-radio" value="metric" class="box-units-radio" />Metric</label>'.
'					</div>'.
'				</div>'.
'				<div class="custom-box-form-section">'.
'					<h4>Outside Dimensions</h4>'.
'					<div class="custom-box-form-section-content">'.
'						<div class="field">'.
'							<label>Width</label>'.
'							<div class="field-element">'.
'								<input id="boxWidth" type="range" value="20" min="8" max="100" name="custom-box-width" value=" . ( isset( $_POST["custom-box-width"] ) ? esc_attr( $_POST["custom-box-width"] ) : ) . ">'.
'							</div>'.
'							<div class="range-label"><span id="boxWidthLabel"></span> <span class="box-mesaure-unit">in</span></div>'.
'						</div>'.
'						<div class="field">'.
'							<label>Height</label>'.
'							<div class="field-element">'.
'								<input id="boxHeight" type="range" value="15" min="8" max="100" name="custom-box-height" value=" . ( isset( $_POST["custom-box-height"] ) ? esc_attr( $_POST["custom-box-height"] ) : ) . ">'.
'							</div>'.
'							<div class="range-label"><span id="boxHeightLabel"></span> <span class="box-mesaure-unit">in</span></div>'.
'						</div>'.
'						<div class="field">'.
'							<label>Depth</label>'.
'							<div class="field-element">'.
'								<input id="boxDepth" type="range" value="30" min="8" max="100" name="custom-box-depth">'.
'							</div>'.
'							<div class="range-label"><span id="boxDepthLabel"></span> <span class="box-mesaure-unit">in</span></div>'.
'						</div>'.
'					</div>'.
'				</div>'.
'				<div class="custom-box-form-section">'.
'					<h4>Colours</h4>'.
'					<div class="custom-box-form-section-content">'.
'						<div class="field">'.
'							<input type="hidden" id="boxHiddenColor" class="toggle" name="custom-box-color">'.
'							<div class="field-element" id="field-element-colors-1">'.
'							</div>'.
'						</div>'.
'						<div class="field">'.
'							<div class="field-element" id="field-element-colors-2">'.
'							</div>'.
'						</div>'.
'					</div>'.
'				</div>'.
'				<div class="custom-box-form-section custom-box-form-section-inline">'.
'					<h4>Wheel </h4>'.
'					<div class="custom-box-form-section-inline-content">'.
'						<input type="checkbox" id="boxToggleWheel" class="toggle" name="custom-box-wheel">'.
'						<label for="boxToggleWheel"></label>'.
'					</div>'.
'				</div>'.
'				<div class="custom-box-form-section custom-box-form-section-inline">'.
'					<h4>Corners </h4>'.
'					<div class="custom-box-form-section-inline-content">'.
'						<input type="checkbox" id="boxToggleCorner" class="toggle" name="custom-box-corner">'.
'						<label for="boxToggleCorner"></label>'.
'					</div>'.
'				</div>'.
'				<div class="custom-box-form-section custom-box-form-section-inline">'.
'					<h4>Handles </h4>'.
'					<div class="custom-box-form-section-inline-content">'.
'						<input type="checkbox" id="boxToggleHandle" class="toggle" name="custom-box-handle">'.
'						<label for="boxToggleHandle"></label>'.
'					</div>'.
'				</div>'.
'				<div class="custom-box-form-section custom-box-form-section-inline">'.
'					<h4>Catches </h4>'.
'					<div class="custom-box-form-section-inline-content">'.
'						<input type="checkbox" id="boxToggleCatche" class="toggle" name="custom-box-catche">'.
'						<label for="boxToggleCatche"></label>'.
'					</div>'.
'				</div>'.
'			</div>'.
'			<div id="custom-box-panel"></div>'.
'		</div>'.
'		<div id="custom-box-form-order">'.
'			<p><small>'.
'			Will attach the information from the case builder into your email to us.<br>'.
'			The case builder is a tool to give you an idea of a look an options your case will have, but is not a final design.<br>'.
'			When you contact us a one of our specilise will follow you 48 hours to clearify your case design.'.
'			</small></p>'.
'			<div class="custom-box-form-section">'.
'				<div class="custom-box-form-section-content">'.
'				<div class="field">'.
'         <label for="firstname">Firstname</label>'.
'					<div class="field-element">'.
'						<input id="firstname" type="text" name="firstname" placeholder="First Name">'.
'					</div>'.
'				</div>'.
'				<div class="field">'.
'         <label for="lastname">Lastname</label>'.
'					<div class="field-element">'.
'						<input id="lastname" type="text" name="lastname" placeholder="Last Name">'.
'					</div>'.
'				</div>'.
'				<div class="field">'.
'         <label for="email">Email</label>'.
'					<div class="field-element">'.
'						<input id="email" type="email" name="email" placeholder="Email">'.
'					</div>'.
'				</div>'.
'				<div class="field">'.
'         <label for="phone">Phone</label>'.
'					<div class="field-element">'.
'						<input id="phone" type="text" name="phone" placeholder="Phone">'.
'					</div>'.
'				</div>'.
'				<div class="field">'.
'					<div class="field-element">'.
'	  			  <p>Please briefly describe your case</p>'.
'						<textarea id="description" cols="3" name="description" placeholder="I would like..." ></textarea>'.
'					</div>'.
'				</div>'.
'				  <p>Having trouble describinig it? Fell free to attach a picture (4 mb limit)</p>'.
'				<div class="field">'.
'					<div class="field-element">'.
'						 <input type="file" name="box-image" accept="image/*">'.
//'            <div id="dragandrophandler">Drag & Drop Images Here</div>'.
'					</div>'.
'				</div>'.
'				<div class="field">'.
'					<div class="field-element">'.
'						<input type="submit" name="custom-box-submitted" value="Send"/>'.
'					</div>'.
'				</div>'.
'			</div>'.
'		</div>'.
'	</form>'.
'</div>';
}

function format_email_order() {
	// sanitize form values
	$boxMetric = sanitize_text_field( $_POST["custom-box-metric-radio"] ) == 'Imperial'?'in':'cm';
	$boxWidth  = sanitize_text_field( $_POST["custom-box-width"] );
	$boxHeight = sanitize_text_field( $_POST["custom-box-height"] );
	$boxDepth  = sanitize_text_field( $_POST["custom-box-depth"] );
	$boxColor  = sanitize_text_field( $_POST["custom-box-color"] );
	$boxWhell  = sanitize_text_field( $_POST["custom-box-wheel"] ) =='on'?'Yes':'No';
	$boxCorner  = sanitize_text_field( $_POST["custom-box-corner"] ) =='on'?'Yes':'No';
	$boxCatche  = sanitize_text_field( $_POST["custom-box-catche"] ) =='on'?'Yes':'No';
	$boxHandles  = sanitize_text_field( $_POST["custom-box-handle"] ) =='on'?'Yes':'No';

	$firstname  = sanitize_text_field( $_POST["firstname"] );
	$lastname  = sanitize_text_field( $_POST["lastname"] );
	$email = sanitize_text_field( $_POST["email"] );
	$phone = sanitize_text_field( $_POST["phone"] );
	$description  = sanitize_text_field( $_POST["description"] );
	$boxImagePath  = sanitize_text_field( $_POST["box-image"] );

	$message = '<style>td{padding: 2em;	}</style>'.
	'<h2>New case order</h2>'.
	'<h3>Customer</h3>'.
	'<table style="border-collapse: collapse; text-align: left;vertical-align:top;"><tbody>'.
	'<tr style="border-bottom: solid 1px #ccc; width: 1px; white-space: nowrap;"><td style="padding: .5em 2em .5em 0;"><strong>Name</strong></td><td style="padding: .5em 0;">'.$firstname.' '.$lastname.'</td></tr>'.
	'<tr style="border-bottom: solid 1px #ccc; width: 1px; white-space: nowrap;"><td style="padding: .5em 2em .5em 0;"><strong>Email</strong></td><td style="padding: .5em 0;">'.$email.'</td></tr>'.
	'<tr style="border-bottom: solid 1px #ccc; width: 1px; white-space: nowrap;"><td style="padding: .5em 2em .5em 0;"><strong>Phone</strong></td><td style="padding: .5em 0;">'.$phone.'</td></tr>'.
  '</tbody></table>'.
	'<h3>Box specification</h3>'.
	'<table style="border-collapse: collapse; text-align: left;vertical-align:top;"><tbody>'.
	'<tr style="border-bottom: solid 1px #ccc; width: 1px; white-space: nowrap;"><td style="padding: .5em 2em .5em 0;vertical-align: top;"><strong>Dimension</strong></td>'.
	'<td style="padding: .5em 0;">Width '.$boxWidth.' '.$boxMetric.'<br />Height '.$boxHeight.' '.$boxMetric.'<br />Depth '.$boxDepth.' '.$boxMetric.'</td></tr>'.
	'<tr style="border-bottom: solid 1px #ccc; width: 1px; white-space: nowrap;"><td style="padding: .5em 2em .5em 0;"><strong>Color</strong></td><td style="padding: .5em 0;">'.$boxColor.'</td></tr>'.
	'<tr style="border-bottom: solid 1px #ccc; width: 1px; white-space: nowrap;"><td style="padding: .5em 2em .5em 0;"><strong>Wheel</strong></td><td style="padding: .5em 0;">'.$boxWhell.'</td></tr>'.
	'<tr style="border-bottom: solid 1px #ccc; width: 1px; white-space: nowrap;"><td style="padding: .5em 2em .5em 0;"><strong>Corner</strong></td><td style="padding: .5em 0;">'.$boxCorner.'</td></tr>'.
	'<tr style="border-bottom: solid 1px #ccc; width: 1px; white-space: nowrap;"><td style="padding: .5em 2em .5em 0;"><strong>Catche</strong></td><td style="padding: .5em 0;">'.$boxCatche.'</td></tr>'.
	'<tr style="border-bottom: solid 1px #ccc; width: 1px; white-space: nowrap;"><td style="padding: .5em 2em .5em 0;"><strong>Handles</strong></td><td style="padding: .5em 0;">'.$boxHandles.'</td></tr>'.
	'<tr style="border-bottom: solid 1px #ccc; width: 1px; white-space: nowrap;"><td style="padding: .5em 2em .5em 0;"><strong>Customer description</strong></td><td style="padding: .5em 0;">'.$description.'</td></tr>'.
  '</tbody></table>';


	//$message = '<div> <b>new order</b> '.$firstname.' </div>';

	return $message;

}

function custom_box_data() {

    // if the submit button is clicked, send the email
    if ( isset( $_POST['custom-box-submitted'] ) ) {


			  $firstname  = sanitize_text_field( $_POST["firstname"] );
			  $lastname  = sanitize_text_field( $_POST["lastname"] );
				$email = sanitize_text_field( $_POST["email"] );

				// get the blog administrator's email address
				$to = array('aleee.it@gmail.com','giorgio25b@gmail.com');//get_option( 'admin_email' );
				$headers = "From: $firstname $lastname <$email>" . "\r\n";
				$headers = array('Content-Type: text/html; charset=UTF-8',"From: $firstname $lastname <$email>" . "\r\n");

				$message = format_email_order();
				//echo $message;
				if ( ! function_exists( 'wp_handle_upload' ) )
					require_once( ABSPATH . 'wp-admin/includes/file.php' );
				$uploadedfile = $_FILES['box-image'];
				$upload_overrides = array( 'test_form' => false );
				$movefile = wp_handle_upload( $uploadedfile, $upload_overrides );
				if ( $movefile )
  				$attachments = $movefile[ 'file' ];


				// If email has been process for sending, display a success message
				if ( wp_mail( $to, "new order", $message, $headers , $attachments) ) {
					echo '<div>';
					echo '<p>Thanks for contacting me, expect a response soon.</p>';
					echo '</div>';
				} else {
					echo 'An unexpected error occurred';
				}

    }
}



function custom_box_shortcode() {
    ob_start();
    custom_box_data();
    html_custom_box_code();

    return ob_get_clean();
}

add_shortcode( 'custom_box', 'custom_box_shortcode' );

?>
