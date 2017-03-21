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
    wp_register_script('custom-box-js', plugins_url( 'custom-box.js', __FILE__ ),array( 'jquery' ), '1', true );
    wp_enqueue_script('custom-box-js');
    wp_register_style( 'custom-box-style', plugins_url( 'custom-box.css', __FILE__ ), array(), '1', 'all' );
    wp_enqueue_style( 'custom-box-style' );
}

add_action( 'wp_enqueue_scripts', 'wptuts_scripts_basic' );

function html_custom_box_code() {
	echo 	'<div id="custom-box">'.
				'   <div id="custom-box-panel"></div>'.
				'   <div id="custom-box-form">'.
				'      <h3>Measurement</h3>'.
				'      <form action="" method="post">'.
				'         <div class="field">'.
				'            <div class="field-element">.'.
				'               <label></><input type="radio" name="custom-box-metric-radio" selected/>Iperial</label>.'.
				'               <label></><input type="radio" name="custom-box-metric-radio" />Metric</label>.'.
				'            </div>'.
				'         </div>'.
				'         <div class="custom-box-form-section">'.
				'            <h4>Styles</h4>'.
				'         </div>'.
				'         <div class="custom-box-form-section">'.
				'            <h4>Outside Dimensions</h4>'.
				'            <div class="custom-box-form-section-content">'.
				'               <div class="field">'.
				'                  <label>Width</label>'.
				'                  <div class="field-element">'.
				'                     <input id="boxWidth" type="range" value="140" min="0" max="200" name="custom-box-width" value=" . ( isset( $_POST["custom-box-width"] ) ? esc_attr( $_POST["custom-box-width"] ) :  ) . ">'.
				'                  </div>'.
				'                  <div class="range-label"><span id="boxWidthLabel"></span> Inches</div>'.
				'               </div>'.
				'               <div class="field">'.
				'                  <label>Height</label>'.
				'                  <div class="field-element">'.
				'                     <input id="boxHeight" type="range" value="60" min="0" max="200" name="custom-box-height" value=" . ( isset( $_POST["custom-box-height"] ) ? esc_attr( $_POST["custom-box-height"] ) :  ) . ">'.
				'                  </div>'.
				'                  <div class="range-label"><span id="boxHeightLabel"></span> Inches</div>'.
				'               </div>'.
				'               <div class="field">'.
				'                  <label>Depth</label>'.
				'                  <div class="field-element">'.
				'                     <input id="boxDepth" type="range" value="90" min="0" max="200" name="custom-box-depth" value=" . ( isset( $_POST["custom-box-depth"] ) ? esc_attr( $_POST["custom-box-depth"] ) :  ) . ">'.
				'                  </div>'.
				'                  <div class="range-label"><span id="boxDepthLabel"></span> Inches</div>'.
				'               </div>'.
				'            </div>'.
				'         </div>'.
				'         <div class="custom-box-form-section">'.
				'            <h4>Colours</h4>'.
				'            <div class="custom-box-form-section-content">'.
				'               <div class="field">'.
				'                  <div class="field-element">'.
				'                     <div class="box-color-btn" href style="background-color:#fff" box-color="#fff"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#e9e9eb" box-color="#e9e9eb"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#a6a6ad" box-color="#a6a6ad"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#666768" box-color="#666768"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#494f55" box-color="#494f55"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#d5c4a0" box-color="#d5c4a0"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#785c5a" box-color="#785c5a"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#fdc8d2" box-color="#fdc8d2"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#eb5c54" box-color="#eb5c54"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#c04a5a" box-color="#c04a5a	"></div>'.
				'                  </div>'.
				'               </div>'.
				'               <div class="field">'.
				'                  <div class="field-element">'.
				'                     <div class="box-color-btn" href style="background-color:#b0d451" box-color="#b0d451"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#298770" box-color="#298770"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#49655e" box-color="#49655e"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#575f58" box-color="#575f58"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#2880af" box-color="#2880af"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#6c7c91" box-color="#6c7c91"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#546479" box-color="#546479"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#455d88" box-color="#455d88"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#7f6e94" box-color="#7f6e94"></div>'.
				'                     <div class="box-color-btn" href style="background-color:#000" box-color="#000"></div>'.
			//	'                     <input id="boxColor" type="color" value="#19aeff" name="custom-box-color" value=" . ( isset( $_POST["custom-box-color"] ) ? esc_attr( $_POST["custom-box-color"] ) :  ) . ">'.
				'                  </div>'.
				'               </div>'.
				'            </div>'.
				'         </div>'.
				'         <div class="field">'.
				'            <div class="field-element">'.
				'               <input type="submit" name="custom-box-submitted" value="Send"/>'.
				'            </div>'.
				'         </div>'.
				'      </form>'.
				'   </div>'.
				'</div>';
}


function custom_box_data() {

    // if the submit button is clicked, send the email
    if ( isset( $_POST['custom-box-submitted'] ) ) {

        // sanitize form values
        $boxWidth    = sanitize_text_field( $_POST["custom-box-width"] );
        $boxHeight    = sanitize_text_field( $_POST["custom-box-height"] );
        $boxDepth    = sanitize_text_field( $_POST["custom-box-depth"] );
        $boxColor    = sanitize_text_field( $_POST["custom-box-color"] );

        echo '<div>';
        echo '<p>Data</p>';
        echo '</div>';

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
