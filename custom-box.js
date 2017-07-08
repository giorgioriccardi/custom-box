// Set up our canvas

var canvasWidth = 400;
var canvasHeight = 400;
var box = { w: 140, h: 60, d: 90, color: '#ff0000' };
var wheelSize = { w: 22, h: 22 };

var boxWidthInput, boxHeightInput, boxDepthInput, boxColorInput, boxWidthLabel, boxHeightLabel, boxDepthLabel;

jQuery(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.

    var canvas = $('<canvas/>', { 'class': 'custom-box-canvas', id: 'custom-box-canvas' }).prop({ width: canvasWidth, height: canvasHeight });
    $('#custom-box-panel').append(canvas);
    var ctx = canvas[0].getContext('2d');
    // Pick out the form elements for easy access later
    console.log("box", box);
    boxWidthInput = $('#boxWidth');
    boxHeightInput = $('#boxHeight');
    boxDepthInput = $('#boxDepth');
    boxColorInput = $('#boxColor');
    boxWidthLabel = $('#boxWidthLabel');
    boxHeightLabel = $('#boxHeightLabel');
    boxDepthLabel = $('#boxDepthLabel');

    draw(ctx);
    boxWidthInput.on("input change", function() { draw(ctx); });
    boxHeightInput.on("input change", function() { draw(ctx); });
    boxDepthInput.on("input change", function() { draw(ctx); });
    //boxColorInput.change(function() {draw(ctx);});
    $('.box-color-btn').click(function(event) {
        event.preventDefault();
        box.color = $(this).attr('box-color');
        draw(ctx);
    });

    $('.box-wheel-btn').click(function(event) {
        event.preventDefault();
        box.wheel = $(this).attr('box-wheel');
        console.log("box", box);
        draw(ctx);
    });

});

// Animation function
var draw = function(ctx) {
    // clear the canvas
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    box.w = boxWidthInput.val();
    box.h = boxHeightInput.val();
    box.d = boxDepthInput.val();;
    //box.color = boxColorInput.val();
    boxWidthLabel.text(box.w);
    boxHeightLabel.text(box.h);
    boxDepthLabel.text(box.d);

    // draw the wheels
    if (typeof box.wheel != 'undefined') {
        drawWheel(ctx, canvasWidth / 2,
            canvasHeight / 2 + box.h / 2,
            Number(box.w),
            Number(box.d),
            Number(box.h));
    }

    // draw the cube
    drawCube(ctx,
        canvasWidth / 2,
        canvasHeight / 2 + box.h / 2,
        Number(box.w),
        Number(box.d),
        Number(box.h),
        box.color
    );

}

var drawWheel = function(ctx, x, y, wx, wy, h) {
    var wheel = new Image();
    wheel.onload = function() {
        console.log("wheel", wheel);
        ctx.drawImage(wheel, x - wx, y - wx * 0.5);
        ctx.drawImage(wheel, x - wheelSize.w * 1.5, y - wheelSize.h * 0.5);
        ctx.drawImage(wheel, x + wy - wheelSize.w, y - wy * 0.5);
    }
    // wheel.src = "http://localhost/dropbox/grc-local/wordpress/DinosaursDemo/wp-content/plugins/custom-box/assets/" + box.wheel + ".svg";
    wheel.src = location.pathname + "wp-content/plugins/custom-box/assets/" + box.wheel + ".svg";
};
// Colour adjustment function
// Nicked from http://stackoverflow.com/questions/5560248
function shadeColor(color, percent) {
    color = color.substr(1);
    var num = parseInt(color, 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Draw a cube to the specified specs
var drawCube = function(ctx, x, y, wx, wy, h, color) {

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - wx, y - wx * 0.5);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();
    ctx.fillStyle = shadeColor(color, -10);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + wy, y - wy * 0.5);
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.lineTo(x, y - h * 1);
    ctx.closePath();
    ctx.fillStyle = shadeColor(color, 10);
    ctx.strokeStyle = shadeColor(color, 50);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y - h);
    ctx.lineTo(x - wx, y - h - wx * 0.5);
    ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
    ctx.lineTo(x + wy, y - h - wy * 0.5);
    ctx.closePath();
    ctx.fillStyle = shadeColor(color, 20);
    ctx.strokeStyle = shadeColor(color, 60);
    ctx.stroke();
    ctx.fill();

}

function showValue(newValue)
{
	document.getElementById("range").innerHTML=newValue;
}
