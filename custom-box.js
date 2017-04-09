// Set up our canvas

var canvasWidth = 400;
var canvasHeight = 400;
var box = { w: 140, h: 60, d: 90, color: '#ff0000', units: "metric" };
var wheelSize = { w: 32, h: 32 };

var boxWidthInput, boxHeightInput, boxDepthInput, boxColorInput, boxWidthLabel, boxHeightLabel, boxDepthLabel;
var weightIcon = new Image();
var wheelImg = new Image();
var cornerImg = new Image();
var handleImg = new Image();
var catcheImg = new Image();

var ninjaFormController;

var boxAngle = 0.22;

jQuery(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.

    loadAssets();
    var ctx  = initCanvas($);
    initInputFields($, ctx);
    weightIcon.onload = function() {weightIcon.loaded = true;draw(ctx);};
    if (window.File && window.FileList && window.FileReader)
      initDragDrop($);

});

var loadAssets = function(ctx){
  console.log("pluginUrl", urls);
  weightIcon.src = urls.pluginUrl + "/custom-box/assets/weight-icon.png";
  wheelImg.src = urls.pluginUrl + "/custom-box/assets/blue-wheel.png";
  wheelImg.onload = function() {wheelImg.loaded = true;};
  cornerImg.src = urls.pluginUrl + "/custom-box/assets/metal-corner.png";
  cornerImg.onload = function() {cornerImg.loaded = true;};
  handleImg.src = urls.pluginUrl + "/custom-box/assets/metal-handle.png";
  handleImg.onload = function() {handleImg.loaded = true; };
  catcheImg.src = urls.pluginUrl + "/custom-box/assets/metal-catche.png";
  catcheImg.onload = function() {catcheImg.loaded = true;};
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
      box.color = $(this).attr('box-color');
      boxColorInput.val(box.color);
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
        draw(ctx);
  });

};



var initCanvas = function($){
  var canvas = $('<canvas/>', { 'class': 'custom-box-canvas', id: 'custom-box-canvas' }).prop({ width: canvasWidth, height: canvasHeight });
  $('#custom-box-panel').append(canvas);
  return canvas[0].getContext('2d');
};

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
}
// Animation function
var draw = function(ctx) {
    // clear the canvas
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    box.w = Number(boxWidthInput.val());
    box.h = Number(boxHeightInput.val());
    box.d = Number(boxDepthInput.val());
    //box.color = boxColorInput.val();
    boxWidthLabel.text(box.w);
    boxHeightLabel.text(box.h);
    boxDepthLabel.text(box.d);

    //hiddenBoxSize.val("width: " + box.w);
    if(box.handle)
      drawHandle(ctx, canvasWidth / 2,canvasHeight / 2 + box.h / 2,box);
    if(box.catche)
      drawCatche(ctx, canvasWidth / 2,canvasHeight / 2 + box.h / 2,box);

    drawCube(ctx, canvasWidth / 2, canvasHeight / 2 + box.h / 2,box);

    if(box.wheel)
      drawWheel(ctx, canvasWidth / 2, canvasHeight / 2 + box.h / 2,box);



	doWeight(ctx,box);

}

var drawWheel = function(ctx, x, y, box) {
    if(wheelImg.loaded){
      ctx.drawImage(wheelImg, x - box.w, y - box.w * boxAngle);
      ctx.drawImage(wheelImg, x - wheelSize.w * boxAngle*3, y - wheelSize.h * boxAngle);
      ctx.drawImage(wheelImg, x + box.d - wheelSize.w, y - box.d * boxAngle);
    }
};

var drawHandle = function(ctx, x, y, box) {
  console.log("handleImg", box,box.h,  y,Math.trunc(box.h*0.5) );
    if(handleImg.loaded){
      ctx.drawImage(handleImg, x - box.w/2- handleImg.width/2, y -box.h/2 - handleImg.height);
    }
};

var drawCatche = function(ctx, x, y, box) {
    if(catcheImg.loaded){
      ctx.drawImage(catcheImg, x - box.w*0.9,  y - box.w * boxAngle -box.h*2/3 );
      ctx.drawImage(catcheImg, x - box.w*0.3 * boxAngle*3, y - box.w * boxAngle/3 -box.h*2/3 );
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

// Draw a cube to the specified specs
var drawCube = function(ctx, x, y, box) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - box.w, y - box.w * boxAngle);
    ctx.lineTo(x - box.w, y - box.h - box.w * boxAngle);
    ctx.lineTo(x, y - box.h * 1);
    ctx.closePath();
    ctx.fillStyle = shadeColor(box.color, -10);
    ctx.strokeStyle = box.color;
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + box.d, y - box.d * boxAngle);
    ctx.lineTo(x + box.d, y - box.h - box.d * boxAngle);
    ctx.lineTo(x, y - box.h * 1);
    ctx.closePath();
    ctx.fillStyle = shadeColor(box.color, 10);
    ctx.strokeStyle = shadeColor(box.color, 50);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, y - box.h);
    ctx.lineTo(x - box.w, y - box.h - box.w * boxAngle);
    ctx.lineTo(x - box.w + box.d, y - box.h - (box.w * boxAngle + box.d * boxAngle));
    ctx.lineTo(x + box.d, y - box.h - box.d * boxAngle);
    ctx.closePath();
    ctx.fillStyle = shadeColor(box.color, 20);
    ctx.strokeStyle = shadeColor(box.color, 60);
    ctx.stroke();
    ctx.fill();

}

// function showValue(newValue)
// {
// 	document.getElementById("range").innerHTML=newValue;
// }

var MEASUREMENT_UNITS = {"imperial":{"conversionFactor":138.4, "lengthLabel":"in", "weightLabel":"lb"},
						"metric":{"conversionFactor":5000, "lengthLabel":"cm", "weightLabel":"kg"}};


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
	ctx.fillStyle = "#fff";
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
