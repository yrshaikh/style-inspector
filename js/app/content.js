$("body").prepend("\
  <div class='wfit-wrap1'>\
    <div class='wfit-wrap2'>\
        <div class='wfit-head'>\
          <span class='wfit-logo'><img src=''></span>\
            <span class='wfit-title'>Style Inspector</span>\
            <a class='wfit-close'>×</a>\
        </div>\
        <div class='wfit-main'>\
	        <div class='box'>\
	          <div class='wfit-label wfit-big-label'>Live Inspector</div>\
	          <div class='row paddingtop10'>\
	            <span class='wfit-label wfit-small-label width50percent'>Family</span>\
	            <span class='wfit-label wfit-small-label width50percent'>Size</span>\
	            <span class='width50percent wfit-font14 yellow'>Arial</span>\
	            <span class='width50percent wfit-font14 yellow'>14px</span>\
	          </div>\
	          <div class='row paddingtop10'>\
	            <span class='wfit-label wfit-small-label width50percent'>Color</span>\
	            <span class='wfit-label wfit-small-label width50percent'>Background</span>\
	            <span class='width50percent'>\
	              <span class='colorbox wfit-boxes'>\
	                <span id='color-holder'>#</span>\
	              </span>\
	            </span>\
	            <span class='width50percent'>\
	              <span class='colorbox wfit-boxes'>\
	                <span id='background-color-holder'>#</span>\
	              </span>\
	            </span>\
	          </div>\
	        </div>\
	        <div class='box row'>\
	          <div class='wfit-label wfit-big-label'>Colors on this page</div>\
	          <div class='wfit-row wfit-color'>\
	            <span class='wfit-label wfit-small-label width50percent'>FONT COLORS</span>\
	            <span class='wfit-label wfit-small-label width50percent'>BG COLORS</span>\
	          </div>\
	          <div class='wfit-row wfit-row-scroll'>\
	            <div id='wfit-color-history'>\
	              <ul class='wfit-ul'></ul>\
	            </div>\
	          </div>\
	          <div class='wfit-row wfit-row-scroll'>\
	            <div id='wfit-background-history'>\
	              <ul class='wfit-ul'></ul>\
	            </div>\
	          </div>\
	        </div>\
	        <div class='box paddingtop10 row'>\
	          <div class='title wfit-label wfit-big-label'>Fonts on this page</div>\
	          <div id='wfit-font-history' class='wfit-row-scroll paddingtop10'>\
	            <ul class='wfit-ul yellow wfit-font14'></ul>\
	          </div>\
	        </div>\
	        <div class='footer'>\
	          <span class='wfit-credits'>Designed by <a href='#' target='_blank'>Omar Faizan</a></span>\
	          <span class='wfit-credits'>Developed by <a href='#' target='_blank'>Ali Rizvi & Yasser Shaikh</a></span>\
	        </div>\
        </div>\
      </div>\
  </div>\
  "); 

$('head').append('<link href="https://fonts.googleapis.com/css?family=Raleway|Titillium+Web" rel="stylesheet">')

var url = chrome.extension.getURL('icons/logo.png'); 
$(".wfit-logo img").attr("src", url); 
 
var fontHistory = []; 
var fontcolorHistory = []; 
var backgroundcolorHistory = []; 
 
$(".wfit-close").click(function(){ 
  $(".wfit-wrap1").remove(); 
  $(".wfit-history").remove(); 
});

$("#wfit-color-history ul, #wfit-background-history ul").on("click", "li span", function(e){
  copyToClipboard($(this));
  $(this).text("COPIED");
}); 

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(rgbToHex($(element).css( "background-color" ))).select();
    document.execCommand("copy");
    $temp.remove();
}


$("#wfit-color-history ul, #wfit-background-history ul").on("mouseover", "li span", function(e){
  var $this = $(this);
  $this.data('initialText', $this.text());
  $this.text("COPY");
}); 


$("#wfit-color-history ul, #wfit-background-history ul").on("mouseout", "li span", function(e){
  var $this = $(this);
  $this.text($this.data('initialText'));
}); 

 
$('*').hover(function(e) { 
    hoverElem = $(this); 
    var fonts = hoverElem.css("font-family"); 
    var currentFont = fonts.split(/,\s*/)[0]; 
     
    // top tab 
    $("#font-family-holder").html(currentFont); 
    $("#font-size-holder").html(hoverElem.css("font-size")); 
     
    var currentFontColor = hoverElem.css("color"); 
    currentFontColor = rgbToHex(currentFontColor); 
    $("#color-holder").html(currentFontColor); 
    $("#color-holder").css("color", fontColor(currentFontColor)); 
    $(".colorbox").css("background-color", currentFontColor); 
     
    var currentBackgroundColor = hoverElem.css("background-color"); 
    currentBackgroundColor = rgbToHex(currentBackgroundColor); 
    $("#background-color-holder").html(currentBackgroundColor); 
    $("#background-color-holder").css("color", fontColor(currentBackgroundColor)); 
    $(".wfit-background-color-box").css("background-color", currentBackgroundColor); 
 
    // bottom tab 
    if(fontHistory.indexOf(currentFont) == -1){ 
      fontHistory.push(currentFont); 
      $(".wfit-wrap2").find('#wfit-font-history ul').append("<li>" + currentFont + "</li>"); 
    } 
 
    if(fontcolorHistory.indexOf(currentFontColor) == -1){ 
      fontcolorHistory.push(currentFontColor); 
      $(".wfit-wrap2").find('#wfit-color-history ul').append("<li>" + "<span class='wfit-boxes' style='background-color:"  + currentFontColor + "; color:" + fontColor(currentFontColor) + ";'>" + currentFontColor + "</span></li>"); 
    } 
 
    if(backgroundcolorHistory.indexOf(currentBackgroundColor) == -1){ 
      backgroundcolorHistory.push(currentBackgroundColor); 
      $(".wfit-wrap2").find('#wfit-background-history ul').append("<li>" + "<span class='wfit-boxes' style='background-color:"  + currentBackgroundColor + "; color:" + fontColor(currentBackgroundColor) + ";'>"  +  currentBackgroundColor + "</span></li>"); 
    } 
     
}); 
 
function rgbToHex(input){ 
  var rgb = input; 
  try{ 
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i); 
     return (rgb && rgb.length === 4) ? "#" + 
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + 
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) + 
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : ''; 
  } 
  catch(exception){ 
    return input; 
  } 
}

function fontColor(hexColor){
  return hexColor.substring(1,2) < '7' ? 'white' : 'black';
}