// Set up our canvas

var canvasWidth = 400;
var canvasHeight = 400;
var box = { w: 140, h: 60, d: 90, color: '#252d30', units: "imperial" };
var wheelSize = { w: 32, h: 32 };

var boxWidthInput, boxHeightInput, boxDepthInput, boxColorInput, boxWidthLabel, boxHeightLabel, boxDepthLabel;
var weightIcon = new Image();
var wheelImg = new Image();
var cornerImg = new Image();
var handleImg = new Image();
var catcheImg = new Image();

var lAngle = 0.146;//Math.PI/7;
var rAngle = 0.457;//Math.PI/7;
var lSin = Math.sin(lAngle);
var lCos = Math.cos(lAngle);
var rSin = Math.sin(rAngle);
var rCos = Math.cos(rAngle);
var delta =  12;

var colorsMap_1 = {'White':'#eceaeb',
'Silver':'#979b9e',
'Grey':'#474a48',
'Dark Grey':'#333333',
'Black':'#252d30',
'Wine':'#5b3a37',
'Desert Tan':'#d8bf93',
'Yellow':'#fdde24',
'Pink':'#e677a7',
'Orange':'#ea3a33'};

var colorsMap_2 = {'Red':'#b02735',
'Neon Lime Green':'#a9d037',
'Green':'#027352',
'Forest Green':'#26473a',
'Olive Drab':'#3c463b',
'Medium Blue':'#0169a2',
'Light Blue':'#51647c',
'Dark Blue':'#21406f',
'Navy':'#35475b',
'Purple':'#6b5680'
};


jQuery(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.

    loadAssets();
    initColorSection($);
    var ctx  = initCanvas($);
    initInputFields($, ctx);
    initValidation($);
    weightIcon.onload = function() {weightIcon.loaded = true;draw(ctx);};
  //  if (window.File && window.FileList && window.FileReader)
  //    initDragDrop($);

});

var loadAssets = function(ctx){
  console.log("pluginUrl", urls);
  weightIcon.src = urls.pluginUrl + "/custom-box/assets/weight-icon-dark.png";
  wheelImg.src = urls.pluginUrl + "/custom-box/assets/blue-wheel.png";
  wheelImg.onload = function() {wheelImg.loaded = true;};
  cornerImg.src = urls.pluginUrl + "/custom-box/assets/metal-corner.png";
  cornerImg.onload = function() {cornerImg.loaded = true;};
  handleImg.src = urls.pluginUrl + "/custom-box/assets/handle-metal.png";
  handleImg.onload = function() {handleImg.loaded = true; };
  catcheImg.src = urls.pluginUrl + "/custom-box/assets/surface-catch.png";
  catcheImg.onload = function() {catcheImg.loaded = true;};
};

var initColorSection = function($){
var inHTML = "";
$.each(colorsMap_1, function(name, value) {
    inHTML += '<div class="box-color-btn" href style="background-color:'+value+'" box-color-name="'+name+'" box-color-hex="'+value+'" title="'+name+'"></div>';
});
$("#field-element-colors-1").html(inHTML);
inHTML = "";
$.each(colorsMap_2, function(name, value) {
    inHTML += '<div class="box-color-btn" href style="background-color:'+value+'" box-color-name="'+name+'" box-color-hex="'+value+'" title="'+name+'"></div>';
});
$("#field-element-colors-2").html(inHTML);
};

var initInputFields = function($, ctx){
  boxWidthInput = $('#boxWidth');
  boxHeightInput = $('#boxHeight');
  boxDepthInput = $('#boxDepth');
  boxColorInput = $('#boxHiddenColor');
  boxWidthLabel = $('#boxWidthLabel');
  boxHeightLabel = $('#boxHeightLabel');
  boxDepthLabel = $('#boxDepthLabel');



  boxWidthInput.on("input change", function() { draw(ctx); });
  boxHeightInput.on("input change", function() { draw(ctx); });
  boxDepthInput.on("input change", function() { draw(ctx); });
  $('.box-color-btn').click(function(event) {
      event.preventDefault();
      box.color = $(this).attr('box-color-hex');
      boxColorInput.val($(this).attr('box-color-name'));
      draw(ctx);
  });
  $('#boxToggleWheel').change(function() {box.wheel = this.checked;draw(ctx);});
  $('#boxToggleCorner').change(function() {box.corner = this.checked;draw(ctx);});
  $('#boxToggleHandle').change(function() {box.handle = this.checked;draw(ctx);});
  $('#boxToggleCatche').change(function() {box.catche = this.checked;draw(ctx);});
  $('.box-units-radio').click(function(event) {
        //event.preventDefault();
        box.units = $(this).val();
        $('.box-mesaure-unit').text(MEASUREMENT_UNITS[box.units].lengthLabel);
        boxWidthInput.attr('min', MEASUREMENT_UNITS[box.units].minRange);
        boxWidthInput.attr('max', MEASUREMENT_UNITS[box.units].maxRange);
        boxHeightInput.attr('min', MEASUREMENT_UNITS[box.units].minRange);
        boxHeightInput.attr('max', MEASUREMENT_UNITS[box.units].maxRange);
        boxDepthInput.attr('min', MEASUREMENT_UNITS[box.units].minRange);
        boxDepthInput.attr('max', MEASUREMENT_UNITS[box.units].maxRange);
        draw(ctx);
  });

};

var initValidation = function($){
  $("form[name='custom-box-form']").validate({
    rules: {
      firstname: "required",
      lastname: "required",
      email: {
        required: true,
        email: true
      },
      phone: {
        minlength: 5
      }
    },
    // Specify validation error messages
    messages: {
      firstname: "Please enter your firstname",
      lastname: "Please enter your lastname",
      phone: {
        minlength: "Your phone must be at least 5 characters long"
      },
      email: "Please enter a valid email address"
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
};


var initCanvas = function($){
  var canvas = $('<canvas/>', { 'class': 'custom-box-canvas', id: 'custom-box-canvas' }).prop({ width: canvasWidth, height: canvasHeight });
  $('#custom-box-panel').append(canvas);
  return canvas[0].getContext('2d');
};
/*
var FileDragHover = function(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

var initDragDrop = function($) {
  var obj = $("#dragandrophandler");
  obj.on('dragenter', function (e) {
     e.stopPropagation();
     e.preventDefault();
     $(this).css('border', '2px solid #0B85A1');
 });
 obj.on('dragover', function (e){
      e.stopPropagation();
      e.preventDefault();
 });
 obj.on('drop', function (e) {

      $(this).css('border', '2px dotted #0B85A1');
      e.preventDefault();
      var files = e.originalEvent.dataTransfer.files;
      console.log("files",files);

 });
} */
// Animation function
var draw = function(ctx) {
    // clear the canvas
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    box.w = Number(boxWidthInput.val()*MEASUREMENT_UNITS[box.units].renderConversion);
    box.h = Number(boxHeightInput.val()*MEASUREMENT_UNITS[box.units].renderConversion);
    box.d = Number(boxDepthInput.val()*MEASUREMENT_UNITS[box.units].renderConversion);
    //box.color = boxColorInput.val();
    boxWidthLabel.text(boxWidthInput.val());
    boxHeightLabel.text(boxHeightInput.val());
    boxDepthLabel.text(boxDepthInput.val());

    //hiddenBoxSize.val("width: " + box.w);
    var x = canvasWidth / 2;
    var y =2* canvasHeight / 3 + box.h / 2;
    if(box.handle)
      drawHandle(ctx, x, y, box);
    if(box.catche)
      drawCatche(ctx, x, y, box);

    drawCubeSides(ctx,  x, y, box);
    drawCube(ctx,  x, y, box);

    if(box.wheel)
      drawWheel(ctx,  x, y, box);



	doWeight(ctx,box);

}

var drawWheel = function(ctx, x, y, box) {
    if(wheelImg.loaded){
      var wheelXGap = 18;
      var wheelYGap = 8;
      ctx.drawImage(wheelImg,x-wheelXGap, y-wheelYGap);
      ctx.drawImage(wheelImg,x -box.w*lCos, y - box.w*lSin-wheelYGap);
      ctx.drawImage(wheelImg,x +box.d*rCos-wheelXGap*2, y - box.d*rSin);
    }
};

var drawHandle = function(ctx, x, y, box) {
    if(handleImg.loaded){
      ctx.drawImage(handleImg, x - box.w/2- handleImg.width/2, y -box.h/2 - handleImg.height);
    }
};

var drawCatche = function(ctx, x, y, box) {
    if(catcheImg.loaded){
      var w = box.w-delta;
      var h = box.h-delta;
      var h1 = h*2/3+delta/4+16;

      ctx.drawImage(catcheImg, x -w*lCos, y - w*lSin - h1);
      ctx.drawImage(catcheImg, x-28, y -h1-4);
      //ctx.drawImage(catcheImg, x - box.w*0.3 *3, y - box.w /3 -box.h*2/3 );
    }
};

var drawHandle = function(ctx, x, y, box) {
  console.log("handleImg", box,box.h,  y,Math.trunc(box.h*0.5) );
    if(handleImg.loaded){
      ctx.drawImage(handleImg, x - box.w/2- handleImg.width/2, y -box.h/2 - handleImg.height);
    }
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


function drawCube(ctx, x, y, box) {
  var color = "#bdcdd4";
	ctx.beginPath();
    ctx.moveTo(x, y - box.h);
    ctx.lineTo(x -box.w*lCos, y - box.h - box.w*lSin);
    ctx.lineTo(x -box.w*lCos, y - box.w*lSin);
    ctx.lineTo(x, y );
    ctx.closePath();
    ctx.fillStyle = shadeColor(color, -10);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fill();

	ctx.beginPath();
    ctx.moveTo(x, y - box.h);
    ctx.lineTo(x +box.d*rCos, y - box.h - box.d*rSin);
    ctx.lineTo(x +box.d*rCos, y - box.d*rSin);
    ctx.lineTo(x, y );
    ctx.closePath();
    ctx.fillStyle = shadeColor(color, 10);
    ctx.strokeStyle = shadeColor(color, 50);
    ctx.stroke();
    ctx.fill();

	ctx.beginPath();
    ctx.moveTo(x, y - box.h);
    ctx.lineTo(x -box.w*lCos, y - box.h - box.w*lSin);
    ctx.lineTo(x -box.w*lCos + box.d*rCos, y - box.h - box.w*lSin-box.d*rSin);
    ctx.lineTo(x +box.d*rCos, y - box.h - box.d*rSin);
    ctx.closePath();
    ctx.fillStyle = shadeColor(color, 20);
    ctx.strokeStyle = shadeColor(color, 60);
    ctx.stroke();
    ctx.fill();
  }


function drawCubeSides(ctx, x, y, box) {

  y = y-delta/2;
  x = x-delta/2;
  var w = box.w-delta;
  var h = box.h-delta;
  var h1 = h*2/3+delta/4;
  var h2 = h*1/3+delta/4;
  //left
  ctx.beginPath();
  ctx.moveTo(x, y - h);
  ctx.lineTo(x -w*lCos, y - h - w*lSin);
  ctx.lineTo(x -w*lCos, y - w*lSin - h1);
  ctx.lineTo(x, y -h1);
  ctx.closePath();
  ctx.fillStyle = shadeColor(box.color, -10);
  ctx.strokeStyle = box.color;
  ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y - h + h2);
  ctx.lineTo(x -w*lCos, y - h - w*lSin + h2);
  ctx.lineTo(x -w*lCos, y - w*lSin );
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fillStyle = shadeColor(box.color, -10);
  ctx.strokeStyle = box.color;
  ctx.stroke();
  ctx.fill();

	x = x+delta;
  h = box.h-delta;
  d = box.d-delta;
  // right

    ctx.beginPath();
      ctx.moveTo(x, y - h);
      ctx.lineTo(x +d*rCos, y - h - d*rSin);
      ctx.lineTo(x +d*rCos, y - d*rSin-h1);
      ctx.lineTo(x, y -h1);
      ctx.closePath();
      ctx.fillStyle = shadeColor(box.color, 10);
      ctx.strokeStyle = shadeColor(box.color, 50);
      ctx.stroke();
      ctx.fill();

      ctx.beginPath();
        ctx.moveTo(x, y - h +h2);
        ctx.lineTo(x +d*rCos, y - h - d*rSin +h2);
        ctx.lineTo(x +d*rCos, y - d*rSin);
        ctx.lineTo(x, y );
        ctx.closePath();
        ctx.fillStyle = shadeColor(box.color, 10);
        ctx.strokeStyle = shadeColor(box.color, 50);
        ctx.stroke();
        ctx.fill();

  x = x-delta/2;
  y = y-delta;
  w = box.w-delta;
  d = box.d-delta;
  // top
  ctx.beginPath();
    ctx.moveTo(x, y - h);
    ctx.lineTo(x -w*lCos, y - h - w*lSin);
    ctx.lineTo(x -w*lCos + d*rCos, y - h - w*lSin-d*rSin);
    ctx.lineTo(x +d*rCos, y - h - d*rSin);
    ctx.closePath();
    ctx.fillStyle = shadeColor(box.color, 20);
    ctx.strokeStyle = shadeColor(box.color, 60);
    ctx.stroke();
    ctx.fill();

  }

var MEASUREMENT_UNITS = {"imperial":{"conversionFactor":138.4, "lengthLabel":"in", "weightLabel":"lb", "minRange": 8, "maxRange":100, "renderConversion": 1.8},
						"metric":{"conversionFactor":5000, "lengthLabel":"cm", "weightLabel":"kg", "minRange": 20, "maxRange":254, "renderConversion": 0.7}};


var drawWeightIcon = function(ctx, x, y) {
    if(weightIcon.loaded)
      ctx.drawImage(weightIcon, x - weightIcon.width -10, y - weightIcon.height);

};

var doWeight = function(ctx, box) {
    var vol = box.w * box.h * box.d;
	var convfact = MEASUREMENT_UNITS[box.units].conversionFactor;

    volw = vol / convfact; //form.div.value;
    b = volw - parseInt(volw);
    if (b <= .5 && 0 < b && convfact == 5000) {
        c = .5;
    } else // if( (.5 < b) && (b < 1 ) )
    {
        c = 1;
    }
    if (b == 0) c = 0;
    fweight = volw - b + c;
    if (vol != 0 && (isNaN(fweight) || fweight < 1)) fweight = 1;
    //form.answer.value = parseFloat(fweight);

	var textPosition = {"x": 62, y: canvasHeight-10}
	drawWeightIcon(ctx, textPosition.x, textPosition.y);
	ctx.font = "32px Arial";
	ctx.fillStyle = "#000";
	ctx.fillText(""+parseFloat(fweight) + " " + MEASUREMENT_UNITS[box.units].weightLabel,textPosition.x,textPosition.y);
};

/*
function changeunits(element) {
    un = element.value;
    conv = 1;
    if ((un == "met" && convfact == 5000) || (un == "imp" && convfact == 138.4)) return;
    if (un == "imp") {
        lenunt = "in.gif";
        wgtunt = "lb.gif";
        convfact = 138.4;
    } else {
        lenunt = "cm.gif";
        wgtunt = "kg.gif";
        convfact = 5000;
    }
    document.images["LENIM"].src = "../art/" + lenunt;
    document.images["HIGIM"].src = "../art/" + lenunt;
    document.images["WIDIM"].src = "../art/" + lenunt;
    document.images["VOLIM"].src = "../art/" + wgtunt;
    form = element.form;
    form.div.value = convfact;
    doweight(form);
}*/
