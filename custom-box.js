// Set up our canvas

var canvasWidth = 400;
var canvasHeight = 400;
var box = { w: 140, h: 60, d: 90, color: '#252d30', units: "imperial" };
var wheelSize = { w: 32, h: 32 };

var boxWidthInput, boxHeightInput, boxDepthInput, boxColorInput, boxWidthLabel, boxHeightLabel, boxDepthLabel,
  assetZoom;
var boxAssetHiddenInput = {};
var mainOffset;
var weightIcon = new Image();
var assetImgs = {};

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


var assetTypes = ['wheel','handle', 'catche', 'corner'];

var assetMaps = { 'wheel':
                  {
                    '511-6484854-Swivel-4in': '511-6484854 - Swivel - 4in',
                    '511-6484854-Swivel-lock-4in': '511-6484854 - Swivel lock 4in'
                  },
                  'handle':
                  { '500-149800-Surface-Handle': '500-149800 - Surface Handle' ,
                    '500-110800-Recessed-Handle': '500-110800 - Recessed Handle',
                    '500-310801-Strap-Handle': '500-310801 - Strap Handle',
                    '500-326801-Attache-Handle': '500-326801 - Attach&eacute; Handle'
                  },
                  'catche':
                  {
                    '501-570800-Recessed-Catch': '501-570800 - Recessed Catch' ,
                    '501-612801-Surface-Catch': '501-612801 - Surface Catch',
                    '505-1829800-Stop-Hinge': '505-1829800 - Stop - Hinge'
                  },
                  'corner':{
                    '502-1002800-Ball-Corner': '502-1002800 - Ball Corner' ,
                    '502-1036800-Large-Square-Corner': '502-1036800-  Large Square Corner' ,
                    '502-1204800-Medium-Ball-Corner': '502-1204800 - Medium -Ball Corner'
                  }
                };

var foamMap = {
  'carpet':'Carpet',
  'half-foam':'&frac12;&rsquo;&rsquo; Foam',
  'one-foam':'1&rsquo;&rsquo; Foam',
  'two-foam':'2&rsquo;&rsquo; Foam',
};

var laminateMap = {'one-quarter-dino':'&frac14;&rsquo;&rsquo; Dino-Lite',
'one-quarter-ply':'&frac14;&rsquo;&rsquo; Ply Laminate',
'one-half-ply':'&frac12;&rsquo;&rsquo; Ply Laminate'};

jQuery(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.

    loadAssets($);
    initColorSection($);
    //initHandleSection($);

    //initAssetSection($, 'catche', catcheMap);
    initLaminateSelect($);
    initFoamSelect($);
    var ctx  = initCanvas($);
    $.each(assetTypes, function( index, assetType ) {
      initAssetSection($, ctx, assetType);
      boxAssetHiddenInput[assetType] = $('#boxHidden-'+assetType);
    });
    initInputFields($, ctx);
    initValidation($);
    weightIcon.onload = function() {weightIcon.loaded = true;draw(ctx);};
  //  if (window.File && window.FileList && window.FileReader)
  //    initDragDrop($);

});

var loadAssets = function($){
  console.log("pluginUrl", urls);
  weightIcon.src = urls.pluginUrl + "/custom-box/assets/weight-icon-dark.png";

  $.each(assetTypes, function( index, assetType ) {
    assetImgs[assetType] = {};
    $.each(assetMaps[assetType], function(name, value) {
      var img = new Image();
      img.src = urls.pluginUrl + "/custom-box/assets/"+name+"-small.png";
      img.onload = function() {assetImgs[assetType][name] = img; img.loaded = true; };
    });
  });



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

var initAssetSection = function($, ctx, assetType){
    var inHTML = "";
    var assetMap = assetMaps[assetType];
    $.each(assetMap, function(name, value) {
      inHTML += '<div class="cutsom-box-asset-image-button box-'+assetType+'-btn" box-'+assetType+'="'+name+'" id="'+name+'">'+
                '<img src="' +urls.pluginUrl + '/custom-box/assets/'+name+'-small.png" alt="'+value+'" title="'+value+'"  /></div>';
    });
    inHTML += '<div class="cutsom-box-asset-remove-link box-'+assetType+'-btn "  box-'+assetType+'="None"><a class="remove-asset">No '+assetType+'</a></div>';
    $("#field-element-"+assetType).html(inHTML);

    $(".box-"+assetType+"-btn").mouseover(function(event){
        var asset = $(this).attr('box-'+assetType);
        if(asset!='None'){
          assetZoom.css('top', event.pageY - mainOffset.top + 200);
          assetZoom.css('left', event.pageX - mainOffset.left);
          assetZoom.html("<img src='"+urls.pluginUrl + "/custom-box/assets/"+asset+".png' /><label>"+assetMaps[assetType][asset]+"</label>");
          assetZoom.show();
        }

    });

    $(".box-"+assetType+"-btn").mouseleave(function(event){
          assetZoom.hide();
    });

    $(".box-"+assetType+"-btn").click(function(event) {
        $(".box-"+assetType+"-btn").removeClass("active");
        $(this).addClass("active");
        event.preventDefault();
        box[assetType] = $(this).attr('box-'+assetType);
        if(box[assetType] != 'None')
          boxAssetHiddenInput[assetType].val(assetMap[box[assetType]]);
        else
          boxAssetHiddenInput[assetType].val(box[assetType]);
        draw(ctx);
    });

};


var initFoamSelect = function($){
  var inHTML = "";
  $.each(foamMap, function(name, value) {
      inHTML += '<option value="'+name+'">'+value+'</option>';
  });
  $("#boxFoamSelect").html(inHTML);

}
var initLaminateSelect = function($){
  var inHTML = "";
  $.each(laminateMap, function(name, value) {
      inHTML += '<option value="'+name+'">'+value+'</option>';
  });
  $("#boxLaminateSelect").html(inHTML);

}

var initInputFields = function($, ctx){
  mainOffset = $("#custom-box").offset();

  boxWidthInput = $('#boxWidth');
  boxHeightInput = $('#boxHeight');
  boxDepthInput = $('#boxDepth');
  boxColorInput = $('#boxHiddenColor');
  boxWidthLabel = $('#boxWidthLabel');
  boxHeightLabel = $('#boxHeightLabel');
  boxDepthLabel = $('#boxDepthLabel');

  assetZoom = $('#assetZoom');


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

    var x = canvasWidth / 2;
    var y =2* canvasHeight / 3 + box.h / 2;
    if(box.handle)
      drawHandle(ctx, x, y, box);
    if(box.catche)
      drawCatche(ctx, x, y, box);
    if(box.corner)
      drawCorner(ctx, x, y, box);

    drawCubeSides(ctx,  x, y, box);
    drawCube(ctx,  x, y, box);

    if(box.wheel)
      drawWheel(ctx,  x, y, box);



	doWeight(ctx,box);

}

var drawWheel = function(ctx, x, y, box) {
    var assetImg = assetImgs['wheel'][box.wheel] ;

    if(typeof assetImg != 'undefined' && assetImg != null && assetImg != 'None' && assetImg.loaded){
      var wheelXGap = 18;
      var wheelYGap = 8;
      ctx.drawImage(assetImg,x-wheelXGap, y-wheelYGap);
      ctx.drawImage(assetImg,x -box.w*lCos, y - box.w*lSin-wheelYGap);
      ctx.drawImage(assetImg,x +box.d*rCos-wheelXGap*2, y - box.d*rSin);
    }
    // wheel.src = "http://localhost/dropbox/grc-local/wordpress/DinosaursDemo/wp-content/plugins/custom-box/assets/" + box.wheel + ".svg";
    wheel.src = location.pathname + "wp-content/plugins/custom-box/assets/" + box.wheel + ".svg";
};

var drawHandle = function(ctx, x, y, box) {
    var assetImg = assetImgs['handle'][box.handle] ;
    if(typeof assetImg != 'undefined' && assetImg != null && assetImg != 'None' && assetImg.loaded){
      ctx.drawImage(assetImg, x - box.w/2- assetImg.width/2, y -box.h/2 - assetImg.height);
    }
};

var drawCatche = function(ctx, x, y, box) {
  var assetImg = assetImgs['catche'][box.catche] ;
  if(typeof assetImg != 'undefined' && assetImg != null && assetImg != 'None' && assetImg.loaded){
      var w = box.w-delta;
      var h = box.h-delta;
      var h1 = h*2/3+delta/4+16;

      ctx.drawImage(assetImg, x -w*lCos, y - w*lSin - h1);
      ctx.drawImage(assetImg, x-4*assetImg.width/3, y -h1-4);
    }
};

var drawCorner = function(ctx, x, y, box) {
    var assetImg = assetImgs['corner'][box.corner] ;
    if(typeof assetImg != 'undefined' && assetImg != null && assetImg != 'None' && assetImg.loaded){
      ctx.drawImage(assetImg, x - assetImg.width/2, y - box.h- assetImg.height/2);
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
